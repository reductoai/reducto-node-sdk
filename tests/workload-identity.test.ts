import { afterEach, beforeEach, describe, expect, mock, setSystemTime, test } from 'bun:test';
import { mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import Reducto, { AuthenticationError, toFile } from 'reductoai';
import {
  OAuthError,
  SubjectTokenProviderError,
  awsWebIdentityTokenProvider,
  azureManagedIdentityTokenProvider,
  gcpIdTokenProvider,
  githubActionsTokenProvider,
  identityTokenFile,
  k8sServiceAccountTokenProvider,
  type SubjectTokenProvider,
} from 'reductoai/auth';
import { Response, type RequestInit } from 'node-fetch';
import { settled } from './helpers';

const BASE_URL = 'http://localhost:5000';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const staticProvider = (token = 'subject-jwt', tokenType: 'jwt' | 'id' = 'jwt'): SubjectTokenProvider => ({
  tokenType,
  getToken: async () => token,
});

/** Fake server: `/oauth/token` mints `rdat_<n>`, every other path echoes the bearer token. */
function fakeServer({
  expiresIn = 3600,
  apiStatus = () => 200,
  exchangeResponse,
}: {
  expiresIn?: number;
  apiStatus?: (auth: string) => number;
  exchangeResponse?: () => Response;
} = {}) {
  const exchanges: { url: string; init: RequestInit; body: any }[] = [];
  const apiCalls: string[] = [];
  const fetch = async (url: any, init: any = {}) => {
    if (String(url).endsWith('/oauth/token')) {
      exchanges.push({ url: String(url), init, body: JSON.parse(init.body) });
      await new Promise((r) => setTimeout(r, 1));
      if (exchangeResponse) return exchangeResponse();
      return json({
        access_token: `rdat_${exchanges.length}`,
        issued_token_type: 'urn:ietf:params:oauth:token-type:access_token',
        token_type: 'Bearer',
        expires_in: expiresIn,
      });
    }
    const auth = init.headers['authorization'];
    apiCalls.push(auth);
    const status = apiStatus(auth);
    return json(status === 200 ? { auth } : { detail: 'unauthorized' }, status);
  };
  return { fetch: fetch as any, exchanges, apiCalls };
}

const makeClient = (server: ReturnType<typeof fakeServer>, provider = staticProvider()) =>
  new Reducto({
    baseURL: BASE_URL,
    fetch: server.fetch,
    maxRetries: 0,
    workloadIdentity: { identityProviderId: 'wip_test', provider },
  });

describe('workload identity token exchange', () => {
  afterEach(() => {
    setSystemTime();
  });

  test('posts an RFC 8693 exchange to <baseURL>/oauth/token and uses the access token', async () => {
    const server = fakeServer();
    const client = new Reducto({
      baseURL: `${BASE_URL}/`,
      fetch: server.fetch,
      workloadIdentity: { identityProviderId: 'wip_test', provider: staticProvider() },
    });

    expect(client.apiKey).toBe('');
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_1' });
    expect(server.exchanges).toHaveLength(1);
    const [exchange] = server.exchanges;
    expect(exchange!.url).toBe(`${BASE_URL}/oauth/token`);
    expect(exchange!.init.method).toBe('POST');
    expect(exchange!.init.redirect).toBe('manual');
    expect(exchange!.body).toEqual({
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      subject_token: 'subject-jwt',
      identity_provider_id: 'wip_test',
    });
  });

  test('maps tokenType "id" to the id_token URN', async () => {
    const server = fakeServer();
    await makeClient(server, staticProvider('id-token', 'id')).get<unknown, any>('/version');
    expect(server.exchanges[0]!.body.subject_token_type).toBe('urn:ietf:params:oauth:token-type:id_token');
  });

  test('uses the environment base URL', async () => {
    const server = fakeServer();
    const client = new Reducto({
      environment: 'eu',
      fetch: server.fetch,
      workloadIdentity: { identityProviderId: 'wip_test', provider: staticProvider() },
    });
    await client.get<unknown, any>('/version');
    expect(server.exchanges[0]!.url).toBe('https://eu.platform.reducto.ai/oauth/token');
  });

  test('caches the access token across requests', async () => {
    const server = fakeServer();
    const client = makeClient(server);
    await client.get<unknown, any>('/version');
    await client.get<unknown, any>('/version');
    await client.get<unknown, any>('/version');
    expect(server.exchanges).toHaveLength(1);
    expect(server.apiCalls).toEqual(['Bearer rdat_1', 'Bearer rdat_1', 'Bearer rdat_1']);
  });

  test('concurrent requests share one in-flight exchange', async () => {
    const server = fakeServer();
    const client = makeClient(server);
    await Promise.all(Array.from({ length: 10 }, () => client.get<unknown, any>('/version')));
    expect(server.exchanges).toHaveLength(1);
    expect(new Set(server.apiCalls)).toEqual(new Set(['Bearer rdat_1']));
  });

  test('refreshes in the background inside the buffer, and blocks once expired', async () => {
    const start = new Date('2026-10-30T00:00:00Z').getTime();
    setSystemTime(start);
    // lifetime 100 s caps the buffer at 50 s
    const server = fakeServer({ expiresIn: 100 });
    const client = makeClient(server);
    await client.get<unknown, any>('/version');

    setSystemTime(start + 40_000);
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_1' });
    expect(server.exchanges).toHaveLength(1);

    setSystemTime(start + 60_000);
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_1' });
    await new Promise((r) => setTimeout(r, 10));
    expect(server.exchanges).toHaveLength(2);
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_2' });

    setSystemTime(start + 60_000 + 101_000);
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_3' });
    expect(server.exchanges).toHaveLength(3);
  });

  test('respects refreshBufferSeconds', async () => {
    const start = new Date('2026-10-30T00:00:00Z').getTime();
    setSystemTime(start);
    const server = fakeServer({ expiresIn: 3600 });
    const client = new Reducto({
      baseURL: BASE_URL,
      fetch: server.fetch,
      workloadIdentity: {
        identityProviderId: 'wip_test',
        provider: staticProvider(),
        refreshBufferSeconds: 60,
      },
    });
    await client.get<unknown, any>('/version');
    setSystemTime(start + 3500_000);
    await client.get<unknown, any>('/version');
    expect(server.exchanges).toHaveLength(1);
    setSystemTime(start + 3545_000);
    await client.get<unknown, any>('/version');
    await new Promise((r) => setTimeout(r, 10));
    expect(server.exchanges).toHaveLength(2);
  });

  test('on a 401 it exchanges once more and retries once', async () => {
    const server = fakeServer({ apiStatus: (auth) => (auth === 'Bearer rdat_1' ? 401 : 200) });
    const client = makeClient(server);
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_2' });
    expect(server.exchanges).toHaveLength(2);
    expect(server.apiCalls).toEqual(['Bearer rdat_1', 'Bearer rdat_2']);
  });

  test('a second 401 is returned to the caller', async () => {
    const server = fakeServer({ apiStatus: () => 401 });
    const client = makeClient(server);
    const err = await settled(client.get<unknown, any>('/version')).catch((e) => e);
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(server.exchanges).toHaveLength(2);
    expect(server.apiCalls).toHaveLength(2);
  });

  test('concurrent 401s on the same token share one re-exchange', async () => {
    const server = fakeServer({ apiStatus: (auth) => (auth === 'Bearer rdat_1' ? 401 : 200) });
    const client = makeClient(server);
    const results = await Promise.all(Array.from({ length: 5 }, () => client.get<unknown, any>('/version')));
    expect(results).toEqual(Array(5).fill({ auth: 'Bearer rdat_2' }));
    expect(server.exchanges).toHaveLength(2);
  });

  test('a 401 on a multipart upload is not replayed, but the token is dropped', async () => {
    const server = fakeServer({ apiStatus: (auth) => (auth === 'Bearer rdat_1' ? 401 : 200) });
    const client = makeClient(server);
    const file = await toFile(Buffer.from('%PDF-1.4'), 'doc.pdf');
    const err = await settled(client.upload({ file })).catch((e) => e);
    expect(err).toBeInstanceOf(AuthenticationError);
    expect(server.apiCalls).toEqual(['Bearer rdat_1']);
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_2' });
  });

  test('an explicit Authorization header skips the exchange', async () => {
    const server = fakeServer();
    const client = makeClient(server);
    expect(
      await client.get<unknown, any>('/version', { headers: { Authorization: 'Bearer custom' } }),
    ).toEqual({
      auth: 'Bearer custom',
    });
    expect(server.exchanges).toHaveLength(0);
  });

  test('exchange errors raise OAuthError with the RFC 6749 body', async () => {
    const server = fakeServer({
      exchangeResponse: () =>
        json({ error: 'invalid_grant', error_description: 'mapping: no mapping matched' }, 400),
    });
    const err = await settled(makeClient(server).get<unknown, any>('/version')).catch((e) => e);
    expect(err).toBeInstanceOf(OAuthError);
    expect(err).toBeInstanceOf(Reducto.APIError);
    expect(err.status).toBe(400);
    expect(err.errorCode).toBe('invalid_grant');
    expect(err.errorDescription).toBe('mapping: no mapping matched');
    expect(err.message).toContain('invalid_grant: mapping: no mapping matched');
    expect(server.apiCalls).toHaveLength(0);
  });

  test('a failed exchange is not cached', async () => {
    let fail = true;
    const server = fakeServer({
      exchangeResponse: () =>
        fail ? json({ error: 'invalid_grant' }, 400) : json({ access_token: 'rdat_ok', expires_in: 3600 }),
    });
    const client = makeClient(server);
    await settled(client.get<unknown, any>('/version')).catch(() => {});
    fail = false;
    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_ok' });
  });

  test('a response without access_token is an error', async () => {
    const server = fakeServer({ exchangeResponse: () => json({ token_type: 'Bearer' }) });
    const err = await settled(makeClient(server).get<unknown, any>('/version')).catch((e) => e);
    expect(err).toBeInstanceOf(Reducto.ReductoError);
    expect(err.message).toContain('access_token');
  });

  test('provider failures raise SubjectTokenProviderError', async () => {
    const server = fakeServer();
    const provider: SubjectTokenProvider = {
      tokenType: 'jwt',
      getToken: async () => {
        throw new Error('boom');
      },
    };
    const err = await settled(makeClient(server, provider).get<unknown, any>('/version')).catch((e) => e);
    expect(err).toBeInstanceOf(SubjectTokenProviderError);
    expect(err.message).toContain('boom');
    expect(server.exchanges).toHaveLength(0);
  });
});

describe('credential resolution', () => {
  const env = process.env;
  let dir: string;

  beforeEach(() => {
    process.env = { ...env };
    delete process.env['REDUCTO_API_KEY'];
    delete process.env['REDUCTO_BASE_URL'];
    delete process.env['REDUCTO_IDENTITY_PROVIDER_ID'];
    delete process.env['REDUCTO_IDENTITY_TOKEN_FILE'];
    delete process.env['REDUCTO_IDENTITY_TOKEN'];
    dir = mkdtempSync(path.join(tmpdir(), 'reducto-wif-'));
  });

  afterEach(() => {
    process.env = env;
  });

  const wif = { identityProviderId: 'wip_arg', provider: staticProvider('arg-token') };

  test('apiKey and workloadIdentity together are rejected', () => {
    expect(() => new Reducto({ apiKey: 'key', workloadIdentity: wif })).toThrow(/mutually exclusive/);
  });

  test('missing credentials are rejected', () => {
    expect(() => new Reducto()).toThrow(/Missing credentials/);
  });

  test('REDUCTO_IDENTITY_PROVIDER_ID without a token is rejected', () => {
    process.env['REDUCTO_IDENTITY_PROVIDER_ID'] = 'wip_env';
    expect(() => new Reducto()).toThrow(/REDUCTO_IDENTITY_TOKEN_FILE/);
  });

  test('REDUCTO_IDENTITY_TOKEN_FILE is re-read on every exchange', async () => {
    const file = path.join(dir, 'token');
    writeFileSync(file, 'file-token-1\n');
    process.env['REDUCTO_IDENTITY_PROVIDER_ID'] = 'wip_env';
    process.env['REDUCTO_IDENTITY_TOKEN_FILE'] = file;
    // the token file rotates, then the API rejects the old access token
    const server = fakeServer({
      apiStatus: (auth) => {
        if (auth !== 'Bearer rdat_1') return 200;
        writeFileSync(file, 'file-token-2');
        return 401;
      },
    });
    const client = new Reducto({ baseURL: BASE_URL, fetch: server.fetch });

    expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_2' });
    expect(server.exchanges.map((e) => e.body.subject_token)).toEqual(['file-token-1', 'file-token-2']);
    expect(server.exchanges[0]!.body.identity_provider_id).toBe('wip_env');
  });

  test('REDUCTO_IDENTITY_TOKEN is used when there is no token file', async () => {
    process.env['REDUCTO_IDENTITY_PROVIDER_ID'] = 'wip_env';
    process.env['REDUCTO_IDENTITY_TOKEN'] = 'env-token';
    const server = fakeServer();
    await new Reducto({ baseURL: BASE_URL, fetch: server.fetch }).get<unknown, any>('/version');
    expect(server.exchanges[0]!.body).toMatchObject({
      subject_token: 'env-token',
      identity_provider_id: 'wip_env',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
    });
  });

  test('REDUCTO_IDENTITY_TOKEN_FILE wins over REDUCTO_IDENTITY_TOKEN', async () => {
    const file = path.join(dir, 'token');
    writeFileSync(file, 'file-token');
    process.env['REDUCTO_IDENTITY_PROVIDER_ID'] = 'wip_env';
    process.env['REDUCTO_IDENTITY_TOKEN_FILE'] = file;
    process.env['REDUCTO_IDENTITY_TOKEN'] = 'env-token';
    const server = fakeServer();
    await new Reducto({ baseURL: BASE_URL, fetch: server.fetch }).get<unknown, any>('/version');
    expect(server.exchanges[0]!.body.subject_token).toBe('file-token');
  });

  describe('precedence: apiKey arg, workloadIdentity arg, REDUCTO_API_KEY, WIF env', () => {
    beforeEach(() => {
      process.env['REDUCTO_API_KEY'] = 'env-key';
      process.env['REDUCTO_IDENTITY_PROVIDER_ID'] = 'wip_env';
      process.env['REDUCTO_IDENTITY_TOKEN'] = 'env-token';
    });

    test('apiKey argument wins', async () => {
      const server = fakeServer();
      const client = new Reducto({ baseURL: BASE_URL, fetch: server.fetch, apiKey: 'arg-key' });
      expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer arg-key' });
      expect(server.exchanges).toHaveLength(0);
    });

    test('workloadIdentity argument beats REDUCTO_API_KEY', async () => {
      const server = fakeServer();
      const client = new Reducto({ baseURL: BASE_URL, fetch: server.fetch, workloadIdentity: wif });
      expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_1' });
      expect(server.exchanges[0]!.body).toMatchObject({
        identity_provider_id: 'wip_arg',
        subject_token: 'arg-token',
      });
    });

    test('REDUCTO_API_KEY beats the WIF environment variables', async () => {
      const server = fakeServer();
      const client = new Reducto({ baseURL: BASE_URL, fetch: server.fetch });
      expect(client.apiKey).toBe('env-key');
      expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer env-key' });
      expect(server.exchanges).toHaveLength(0);
    });

    test('WIF environment variables are used last', async () => {
      delete process.env['REDUCTO_API_KEY'];
      const server = fakeServer();
      const client = new Reducto({ baseURL: BASE_URL, fetch: server.fetch });
      expect(await client.get<unknown, any>('/version')).toEqual({ auth: 'Bearer rdat_1' });
      expect(server.exchanges[0]!.body.identity_provider_id).toBe('wip_env');
    });
  });
});

describe('subject token providers', () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  const recordingFetch = (response: () => Response) => {
    const calls: { url: string; init: any }[] = [];
    const fetch = async (url: any, init: any) => {
      calls.push({ url: String(url), init });
      return response();
    };
    return { calls, fetch: fetch as any };
  };

  test('identityTokenFile and k8sServiceAccountTokenProvider read and trim the file', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'reducto-wif-'));
    const file = path.join(dir, 'token');
    writeFileSync(file, '  jwt-from-file\n');
    expect(await identityTokenFile(file).getToken()).toBe('jwt-from-file');
    expect(identityTokenFile(file, 'id').tokenType).toBe('id');
    const k8s = k8sServiceAccountTokenProvider(file);
    expect(k8s.tokenType).toBe('jwt');
    expect(await k8s.getToken()).toBe('jwt-from-file');

    writeFileSync(file, '');
    await expect(k8s.getToken()).rejects.toThrow(/empty/);
    const missing = await k8sServiceAccountTokenProvider(path.join(dir, 'missing'))
      .getToken()
      .catch((e) => e);
    expect(missing).toBeInstanceOf(SubjectTokenProviderError);
    expect(missing.provider).toBe('kubernetes');
  });

  test('gcpIdTokenProvider queries the metadata server', async () => {
    const { calls, fetch } = recordingFetch(() => new Response('gcp-id-token\n'));
    const provider = gcpIdTokenProvider({ audience: 'https://eu.platform.reducto.ai', fetch });
    expect(provider.tokenType).toBe('id');
    expect(await provider.getToken()).toBe('gcp-id-token');
    const url = new URL(calls[0]!.url);
    expect(url.origin + url.pathname).toBe(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity',
    );
    expect(url.searchParams.get('audience')).toBe('https://eu.platform.reducto.ai');
    expect(calls[0]!.init.headers).toEqual({ 'Metadata-Flavor': 'Google' });
  });

  test('gcpIdTokenProvider defaults the audience', async () => {
    const { calls, fetch } = recordingFetch(() => new Response('t'));
    await gcpIdTokenProvider({ fetch }).getToken();
    expect(new URL(calls[0]!.url).searchParams.get('audience')).toBe('https://platform.reducto.ai');
  });

  test('azureManagedIdentityTokenProvider queries IMDS', async () => {
    const { calls, fetch } = recordingFetch(() => json({ access_token: 'azure-jwt' }));
    const provider = azureManagedIdentityTokenProvider({
      resource: 'api://reducto',
      clientId: 'cid',
      objectId: 'oid',
      msiResId: 'rid',
      fetch,
    });
    expect(await provider.getToken()).toBe('azure-jwt');
    const url = new URL(calls[0]!.url);
    expect(url.origin + url.pathname).toBe('http://169.254.169.254/metadata/identity/oauth2/token');
    expect(Object.fromEntries(url.searchParams)).toEqual({
      'api-version': '2018-02-01',
      resource: 'api://reducto',
      client_id: 'cid',
      object_id: 'oid',
      msi_res_id: 'rid',
    });
    expect(calls[0]!.init.headers).toEqual({ Metadata: 'true' });
  });

  test('azureManagedIdentityTokenProvider reports HTTP errors', async () => {
    const { fetch } = recordingFetch(() => json({ error: 'nope' }, 400));
    const err = await azureManagedIdentityTokenProvider({ fetch })
      .getToken()
      .catch((e) => e);
    expect(err).toBeInstanceOf(SubjectTokenProviderError);
    expect(err.provider).toBe('azure');
    expect(err.message).toContain('400');
  });

  test('githubActionsTokenProvider requests an OIDC token', async () => {
    process.env['ACTIONS_ID_TOKEN_REQUEST_URL'] = 'https://gh.example/token?api-version=2.0';
    process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'] = 'request-token';
    const { calls, fetch } = recordingFetch(() => json({ value: 'gh-jwt' }));
    expect(await githubActionsTokenProvider({ fetch }).getToken()).toBe('gh-jwt');
    const url = new URL(calls[0]!.url);
    expect(url.searchParams.get('api-version')).toBe('2.0');
    expect(url.searchParams.get('audience')).toBe('https://platform.reducto.ai');
    expect(calls[0]!.init.headers).toEqual({ Authorization: 'Bearer request-token' });
  });

  test('githubActionsTokenProvider explains missing id-token permission', async () => {
    delete process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
    delete process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
    await expect(githubActionsTokenProvider().getToken()).rejects.toThrow(/id-token: write/);
  });

  test('awsWebIdentityTokenProvider calls STS GetWebIdentityToken', async () => {
    const sent: any[] = [];
    mock.module('@aws-sdk/client-sts', () => ({
      STSClient: class {
        async send(command: any) {
          sent.push(command.input);
          return { WebIdentityToken: 'aws-jwt' };
        }
      },
      GetWebIdentityTokenCommand: class {
        constructor(readonly input: any) {}
      },
    }));
    const provider = awsWebIdentityTokenProvider({ signingAlgorithm: 'ES384', durationSeconds: 900 });
    expect(provider.tokenType).toBe('jwt');
    expect(await provider.getToken()).toBe('aws-jwt');
    expect(sent).toEqual([
      { Audience: ['https://platform.reducto.ai'], SigningAlgorithm: 'ES384', DurationSeconds: 900 },
    ]);
  });

  test('awsWebIdentityTokenProvider reports a client-sts without GetWebIdentityTokenCommand', async () => {
    mock.module('@aws-sdk/client-sts', () => ({
      STSClient: class {},
      GetWebIdentityTokenCommand: undefined,
    }));
    const err = await awsWebIdentityTokenProvider()
      .getToken()
      .catch((e) => e);
    expect(err).toBeInstanceOf(SubjectTokenProviderError);
    expect(err.message).toContain('3.935.0 or later');
  });
});
