import { SubjectTokenProviderError } from '../error';
import { readEnv, type Fetch } from '../core';
import { fetch as defaultFetch } from '../_shims/index';
import type { SubjectTokenProvider } from './workload-identity';

/** Recommended audience for subject tokens exchanged with Reducto. */
export const DEFAULT_AUDIENCE = 'https://platform.reducto.ai';

const K8S_TOKEN_PATH = '/var/run/secrets/kubernetes.io/serviceaccount/token';
const GCP_METADATA_URL =
  'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity';
const AZURE_IMDS_URL = 'http://169.254.169.254/metadata/identity/oauth2/token';
const AZURE_DEFAULT_RESOURCE = 'https://management.azure.com/';
const REQUEST_TIMEOUT_MS = 10_000;

interface HTTPOptions {
  /** Custom `fetch` implementation; defaults to the SDK's fetch. */
  fetch?: Fetch | undefined;
}

/**
 * Reads a subject token from a file. The file is re-read on every exchange, so
 * rotated tokens are picked up.
 */
export function identityTokenFile(path: string, tokenType: 'jwt' | 'id' = 'jwt'): SubjectTokenProvider {
  return { tokenType, getToken: () => readTokenFile(path, 'file') };
}

/** Reads a Kubernetes projected service account token. */
export function k8sServiceAccountTokenProvider(path: string = K8S_TOKEN_PATH): SubjectTokenProvider {
  return { tokenType: 'jwt', getToken: () => readTokenFile(path, 'kubernetes') };
}

/** Fetches an identity token for the default service account from the GCP metadata server. */
export function gcpIdTokenProvider({
  audience = DEFAULT_AUDIENCE,
  fetch,
}: { audience?: string } & HTTPOptions = {}): SubjectTokenProvider {
  return {
    tokenType: 'id',
    getToken: async () => {
      const url = new URL(GCP_METADATA_URL);
      url.searchParams.set('audience', audience);
      const response = await request('gcp', url, { 'Metadata-Flavor': 'Google' }, fetch);
      return nonEmpty('gcp', await response.text());
    },
  };
}

/**
 * Fetches a managed identity token from Azure IMDS. Pass `clientId`, `objectId` or
 * `msiResId` to select a user-assigned identity.
 */
export function azureManagedIdentityTokenProvider({
  resource = AZURE_DEFAULT_RESOURCE,
  clientId,
  objectId,
  msiResId,
  fetch,
}: {
  resource?: string;
  clientId?: string;
  objectId?: string;
  msiResId?: string;
} & HTTPOptions = {}): SubjectTokenProvider {
  return {
    tokenType: 'jwt',
    getToken: async () => {
      const url = new URL(AZURE_IMDS_URL);
      url.searchParams.set('api-version', '2018-02-01');
      url.searchParams.set('resource', resource);
      if (clientId) url.searchParams.set('client_id', clientId);
      if (objectId) url.searchParams.set('object_id', objectId);
      if (msiResId) url.searchParams.set('msi_res_id', msiResId);
      const response = await request('azure', url, { Metadata: 'true' }, fetch);
      return nonEmpty('azure', (await readJSON('azure', response))['access_token']);
    },
  };
}

/**
 * Requests a GitHub Actions OIDC token. The workflow needs `permissions: id-token: write`.
 */
export function githubActionsTokenProvider({
  audience = DEFAULT_AUDIENCE,
  fetch,
}: { audience?: string } & HTTPOptions = {}): SubjectTokenProvider {
  return {
    tokenType: 'jwt',
    getToken: async () => {
      const requestURL = readEnv('ACTIONS_ID_TOKEN_REQUEST_URL');
      const requestToken = readEnv('ACTIONS_ID_TOKEN_REQUEST_TOKEN');
      if (!requestURL || !requestToken) {
        throw new SubjectTokenProviderError(
          'ACTIONS_ID_TOKEN_REQUEST_URL and ACTIONS_ID_TOKEN_REQUEST_TOKEN are not set; add `permissions: id-token: write` to the workflow',
          'github-actions',
        );
      }
      const url = new URL(requestURL);
      url.searchParams.set('audience', audience);
      const response = await request(
        'github-actions',
        url,
        { Authorization: `Bearer ${requestToken}` },
        fetch,
      );
      return nonEmpty('github-actions', (await readJSON('github-actions', response))['value']);
    },
  };
}

interface STSModule {
  STSClient: new (config: object) => { send(command: unknown): Promise<{ WebIdentityToken?: string }> };
  GetWebIdentityTokenCommand: new (input: object) => unknown;
}

/**
 * Gets a JWT from AWS STS `GetWebIdentityToken` (outbound identity federation).
 * Requires the optional peer dependency `@aws-sdk/client-sts`. Region and
 * credentials come from the default AWS SDK configuration.
 */
export function awsWebIdentityTokenProvider({
  audience = DEFAULT_AUDIENCE,
  signingAlgorithm = 'RS256',
  durationSeconds,
}: {
  audience?: string;
  signingAlgorithm?: 'RS256' | 'ES384';
  durationSeconds?: number;
} = {}): SubjectTokenProvider {
  let client: InstanceType<STSModule['STSClient']> | undefined;
  let sts: STSModule | undefined;
  return {
    tokenType: 'jwt',
    getToken: async () => {
      if (!sts) {
        // A variable specifier keeps bundlers and TypeScript from requiring the optional dependency.
        const moduleName = '@aws-sdk/client-sts';
        try {
          sts = (await import(moduleName)) as STSModule;
        } catch (err) {
          throw new SubjectTokenProviderError(
            'awsWebIdentityTokenProvider requires @aws-sdk/client-sts; install it with `npm install @aws-sdk/client-sts`',
            'aws',
            err,
          );
        }
      }
      client ??= new sts.STSClient({});
      let token: string | undefined;
      try {
        const result = await client.send(
          new sts.GetWebIdentityTokenCommand({
            Audience: [audience],
            SigningAlgorithm: signingAlgorithm,
            ...(durationSeconds !== undefined && { DurationSeconds: durationSeconds }),
          }),
        );
        token = result.WebIdentityToken;
      } catch (err) {
        throw new SubjectTokenProviderError(
          `AWS STS GetWebIdentityToken failed: ${err instanceof Error ? err.message : String(err)}`,
          'aws',
          err,
        );
      }
      return nonEmpty('aws', token);
    },
  };
}

async function readTokenFile(path: string, provider: string): Promise<string> {
  let contents: string;
  try {
    const fs = await import('fs/promises');
    contents = await fs.readFile(path, 'utf-8');
  } catch (err) {
    throw new SubjectTokenProviderError(
      `Failed to read identity token from ${path}: ${err instanceof Error ? err.message : String(err)}`,
      provider,
      err,
    );
  }
  if (!contents.trim()) {
    throw new SubjectTokenProviderError(`Identity token file ${path} is empty`, provider);
  }
  return contents.trim();
}

async function request(
  provider: string,
  url: URL,
  headers: Record<string, string>,
  fetch: Fetch = defaultFetch,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch.call(undefined, url.toString(), {
      headers,
      signal: controller.signal as any,
    });
    if (!response.ok) {
      throw new SubjectTokenProviderError(
        `Identity token request to ${url.origin} failed with status ${response.status}`,
        provider,
      );
    }
    return response;
  } catch (err) {
    if (err instanceof SubjectTokenProviderError) throw err;
    throw new SubjectTokenProviderError(
      `Identity token request to ${url.origin} failed: ${err instanceof Error ? err.message : String(err)}`,
      provider,
      err,
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function readJSON(provider: string, response: { json(): Promise<unknown> }) {
  try {
    const body = await response.json();
    return (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  } catch (err) {
    throw new SubjectTokenProviderError('Identity token response is not valid JSON', provider, err);
  }
}

function nonEmpty(provider: string, token: unknown): string {
  if (typeof token !== 'string' || !token.trim()) {
    throw new SubjectTokenProviderError('Identity token response did not contain a token', provider);
  }
  return token.trim();
}
