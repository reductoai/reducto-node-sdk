import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import Reducto, { type ClientOptions } from 'reductoai';
import {
  SubjectTokenProviderError,
  x509WorkloadIdentity,
  type X509CertificateProvider,
} from 'reductoai/auth';
import { Response } from 'node-fetch';
import { settled } from './helpers';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/** Fake mTLS server: records each request with the certificate its agent presents. */
const agents = new Set<any>();

function fakeServer({ apiStatus = () => 200 }: { apiStatus?: () => number } = {}) {
  const exchanges: { url: string; body: any; cert: string | undefined }[] = [];
  const apiCalls: { url: string; auth: string; cert: string | undefined }[] = [];
  const fetch = async (url: any, init: any = {}) => {
    const cert: string | undefined = init.agent?.options.cert;
    agents.add(init.agent);
    if (String(url).endsWith('/oauth/token')) {
      exchanges.push({ url: String(url), body: JSON.parse(init.body), cert });
      return json({ access_token: `rdat_${exchanges.length}`, token_type: 'Bearer', expires_in: 3600 });
    }
    apiCalls.push({ url: String(url), auth: init.headers['authorization'], cert });
    const status = apiStatus();
    return json(status === 200 ? { ok: true } : { detail: 'unauthorized' }, status);
  };
  return { fetch: fetch as any, exchanges, apiCalls };
}

function certFiles(cert = 'chain-1', key = 'key-1') {
  const dir = mkdtempSync(path.join(tmpdir(), 'reducto-x509-'));
  const files = { certChain: path.join(dir, 'chain.pem'), key: path.join(dir, 'key.pem') };
  const write = (c: string, k: string) => {
    writeFileSync(files.certChain, `${c}\n`);
    writeFileSync(files.key, `${k}\n`);
  };
  write(cert, key);
  return { files, write };
}

const x509Client = (server: ReturnType<typeof fakeServer>, opts: ClientOptions = {}) =>
  new Reducto({
    fetch: server.fetch,
    maxRetries: 0,
    workloadIdentity: { identityProviderId: 'wip_x509', provider: x509WorkloadIdentity(certFiles().files) },
    ...opts,
  });

describe('X.509 workload identity', () => {
  const env = process.env;

  beforeEach(() => {
    agents.clear();
    process.env = { ...env };
    for (const name of [
      'REDUCTO_API_KEY',
      'REDUCTO_BASE_URL',
      'REDUCTO_IDENTITY_PROVIDER_ID',
      'REDUCTO_IDENTITY_TOKEN_FILE',
      'REDUCTO_IDENTITY_TOKEN',
      'REDUCTO_MTLS_CERT_CHAIN',
      'REDUCTO_MTLS_KEY',
    ]) {
      delete process.env[name];
    }
  });

  afterEach(() => {
    process.env = env;
  });

  test('exchanges with the client certificate on the mTLS host and no subject_token', async () => {
    const server = fakeServer();
    await x509Client(server).get('/version');

    expect(server.exchanges).toEqual([
      {
        url: 'https://mtls.platform.reducto.ai/oauth/token',
        body: {
          grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
          subject_token_type: 'urn:reducto:params:oauth:token-type:x509',
          identity_provider_id: 'wip_x509',
        },
        cert: 'chain-1',
      },
    ]);
    expect([...agents].map((a) => [a.options.cert, a.options.key])).toEqual([['chain-1', 'key-1']]);
    expect(server.apiCalls).toEqual([
      { url: 'https://mtls.platform.reducto.ai/version', auth: 'Bearer rdat_1', cert: 'chain-1' },
    ]);
  });

  test('uses the mTLS host of the environment, unless baseURL is set', async () => {
    const eu = fakeServer();
    await x509Client(eu, { environment: 'eu' }).get('/version');
    expect(eu.exchanges[0]!.url).toBe('https://mtls.eu.platform.reducto.ai/oauth/token');

    const au = fakeServer();
    await x509Client(au, { environment: 'au' }).get('/version');
    expect(au.apiCalls[0]!.url).toBe('https://mtls.au.platform.reducto.ai/version');

    const custom = fakeServer();
    await x509Client(custom, { baseURL: 'https://reducto.internal' }).get('/version');
    expect(custom.exchanges[0]!.url).toBe('https://reducto.internal/oauth/token');
    expect(custom.apiCalls[0]!.cert).toBe('chain-1');

    process.env['REDUCTO_BASE_URL'] = 'https://env.reducto.internal';
    const fromEnv = fakeServer();
    await x509Client(fromEnv).get('/version');
    expect(fromEnv.exchanges[0]!.url).toBe('https://env.reducto.internal/oauth/token');
  });

  test('re-reads the certificate files on each re-exchange', async () => {
    let status = 200;
    const server = fakeServer({ apiStatus: () => status });
    const { files, write } = certFiles();
    const client = new Reducto({
      fetch: server.fetch,
      maxRetries: 0,
      workloadIdentity: { identityProviderId: 'wip_x509', provider: x509WorkloadIdentity(files) },
    });
    await client.get('/version');
    await client.get('/version');
    expect(server.exchanges).toHaveLength(1);

    write('chain-2', 'key-2');
    status = 401;
    await expect(settled(client.get('/version'))).rejects.toThrow();
    status = 200;
    await client.get('/version');

    expect(server.exchanges.map((e) => e.cert)).toEqual(['chain-1', 'chain-2', 'chain-2']);
    expect(server.apiCalls.map((c) => [c.auth, c.cert])).toEqual([
      ['Bearer rdat_1', 'chain-1'],
      ['Bearer rdat_1', 'chain-1'],
      ['Bearer rdat_1', 'chain-1'],
      ['Bearer rdat_2', 'chain-2'],
      ['Bearer rdat_3', 'chain-2'],
    ]);
    expect(agents.size).toBe(3);
  });

  test('raises the agent socket timeout to the request timeout', async () => {
    const server = fakeServer();
    await x509Client(server, { timeout: 2 * 3600 * 1000 }).get('/version');
    expect([...agents][0].options.timeout).toBe(2 * 3600 * 1000 + 1000);
  });

  test('environment variables configure X.509', async () => {
    const { files } = certFiles('env-chain', 'env-key');
    process.env['REDUCTO_IDENTITY_PROVIDER_ID'] = 'wip_env';
    process.env['REDUCTO_MTLS_CERT_CHAIN'] = files.certChain;
    process.env['REDUCTO_MTLS_KEY'] = files.key;
    const server = fakeServer();
    await new Reducto({ fetch: server.fetch }).get('/version');
    expect(server.exchanges[0]!.body.identity_provider_id).toBe('wip_env');
    expect(server.apiCalls[0]).toEqual({
      url: 'https://mtls.platform.reducto.ai/version',
      auth: 'Bearer rdat_1',
      cert: 'env-chain',
    });

    delete process.env['REDUCTO_MTLS_KEY'];
    expect(() => new Reducto()).toThrow('REDUCTO_MTLS_CERT_CHAIN and REDUCTO_MTLS_KEY must be set together.');

    process.env['REDUCTO_MTLS_KEY'] = files.key;
    process.env['REDUCTO_IDENTITY_TOKEN'] = 'jwt';
    expect(() => new Reducto()).toThrow('not both');
  });

  test('certificate errors are SubjectTokenProviderErrors', async () => {
    const missing = x509WorkloadIdentity({
      certChain: '/nonexistent/chain.pem',
      key: '/nonexistent/key.pem',
    });
    const err = await missing.getCertificate().catch((e) => e);
    expect(err).toBeInstanceOf(SubjectTokenProviderError);
    expect(err.provider).toBe('x509');
    expect(err.message).toContain('Failed to read certificate chain from /nonexistent/chain.pem');

    const empty: X509CertificateProvider = {
      tokenType: 'x509',
      getCertificate: async () => ({ certChain: '', key: 'k' }),
    };
    const server = fakeServer();
    const client = x509Client(server, {
      workloadIdentity: { identityProviderId: 'wip_x509', provider: empty },
    });
    await expect(settled(client.get('/version'))).rejects.toThrow('empty certificate or key');
    expect(server.exchanges).toHaveLength(0);
  });
});
