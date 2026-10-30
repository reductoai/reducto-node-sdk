import { ReductoError, OAuthError, SubjectTokenProviderError, APIError } from '../error';
import { type Agent } from '../_shims/index';
import { createClientCertificateAgent, type ClientCertificate } from './mtls';

export type { ClientCertificate } from './mtls';

/** Supplies the identity token (JWT) that the workload's platform issued to it. */
export interface SubjectTokenProvider {
  /** `jwt` for a signed JWT, `id` for an OpenID Connect ID token. */
  tokenType: 'jwt' | 'id';

  /** Returns a fresh subject token. Called on every token exchange. */
  getToken: () => Promise<string>;
}

/**
 * Supplies the TLS client certificate for X.509 workload identity federation.
 * The certificate is presented on the token exchange and on every API request.
 */
export interface X509CertificateProvider {
  tokenType: 'x509';

  /** Returns the current certificate and key. Called on every token exchange, so rotation is picked up. */
  getCertificate: () => Promise<ClientCertificate>;
}

/** Exchanges a platform identity token for short-lived Reducto access tokens. */
export interface WorkloadIdentity {
  /** ID of the Reducto workload identity provider, `wip_...`. */
  identityProviderId: string;

  /** Supplies the subject token, or the client certificate for X.509, for each exchange. */
  provider: SubjectTokenProvider | X509CertificateProvider;

  /**
   * Seconds before expiry at which the access token is refreshed.
   * Defaults to 1200 and is capped at half the token lifetime.
   */
  refreshBufferSeconds?: number | undefined;
}

/** Response of `POST /oauth/token`. */
export interface TokenExchangeResponse {
  access_token: string;
  issued_token_type: string;
  token_type: string;
  expires_in?: number;
  expires_at?: number;
}

const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:token-exchange';
const SUBJECT_TOKEN_TYPES = {
  jwt: 'urn:ietf:params:oauth:token-type:jwt',
  id: 'urn:ietf:params:oauth:token-type:id_token',
  x509: 'urn:reducto:params:oauth:token-type:x509',
} as const;
const DEFAULT_REFRESH_BUFFER_SECONDS = 1200;
const DEFAULT_LIFETIME_SECONDS = 3600;

/** A Reducto access token and, for X.509, the HTTPS agent that presents the certificate it is bound to. */
export interface AccessToken {
  token: string;
  agent?: Agent | undefined;
}

interface CachedToken extends AccessToken {
  expiresAt: number;
  refreshAt: number;
}

/**
 * Caches Reducto access tokens obtained through workload identity federation.
 *
 * Concurrent callers share one in-flight exchange. A token inside its refresh
 * buffer is still returned while a new one is fetched in the background.
 */
export class WorkloadIdentityAuth {
  private cached: CachedToken | null = null;
  private inflight: Promise<AccessToken> | null = null;
  private generation = 0;

  /**
   * @param post Sends the exchange body to `/oauth/token` and returns the parsed JSON response.
   *   The client passes its own request path, so the exchange gets the client's retries and backoff.
   *   For X.509, the request must go through `agent`.
   */
  constructor(
    private readonly config: WorkloadIdentity,
    private readonly post: (body: Record<string, string>, agent: Agent | undefined) => Promise<unknown>,
  ) {}

  async getToken(): Promise<string> {
    return (await this.getAccessToken()).token;
  }

  async getAccessToken(): Promise<AccessToken> {
    const cached = this.cached;
    if (cached && Date.now() < cached.expiresAt) {
      if (Date.now() >= cached.refreshAt) {
        this.refresh().catch(() => {});
      }
      return cached;
    }
    return this.refresh();
  }

  /** Drops the cached token if it is `token` (or any token, when omitted). */
  invalidate(token?: string): void {
    if (token !== undefined && this.cached?.token !== token) return;
    this.generation++;
    this.cached = null;
    this.inflight = null;
  }

  private refresh(): Promise<AccessToken> {
    if (!this.inflight) {
      const generation = this.generation;
      const promise = this.exchange(generation).finally(() => {
        if (this.inflight === promise) this.inflight = null;
      });
      this.inflight = promise;
    }
    return this.inflight;
  }

  private async exchange(generation: number): Promise<AccessToken> {
    const { provider, identityProviderId } = this.config;
    const request: Record<string, string> = {
      grant_type: GRANT_TYPE,
      subject_token_type: SUBJECT_TOKEN_TYPES[provider.tokenType],
      identity_provider_id: identityProviderId,
    };
    let agent: Agent | undefined;
    if (provider.tokenType === 'x509') {
      agent = await createClientCertificateAgent(await getCertificate(provider));
    } else {
      request['subject_token'] = await getSubjectToken(provider);
    }

    const startedAt = Date.now();
    let body: unknown;
    try {
      body = await this.post(request, agent);
    } catch (err) {
      if (err instanceof APIError && (err.status === 400 || err.status === 401 || err.status === 403)) {
        throw new OAuthError(err.status, err.error, err.headers!);
      }
      throw err;
    }

    const result = (body ?? {}) as Partial<TokenExchangeResponse>;
    if (typeof result.access_token !== 'string' || !result.access_token) {
      throw new ReductoError("Token exchange response is missing 'access_token'");
    }
    const lifetime =
      typeof result.expires_in === 'number' && result.expires_in > 0 ?
        result.expires_in
      : DEFAULT_LIFETIME_SECONDS;
    const buffer = Math.min(this.config.refreshBufferSeconds ?? DEFAULT_REFRESH_BUFFER_SECONDS, lifetime / 2);
    const expiresAt = startedAt + lifetime * 1000;

    const accessToken = { token: result.access_token, agent };
    if (generation === this.generation) {
      this.cached = { ...accessToken, expiresAt, refreshAt: expiresAt - buffer * 1000 };
    }
    return accessToken;
  }
}

async function getCertificate(provider: X509CertificateProvider): Promise<ClientCertificate> {
  let certificate: ClientCertificate;
  try {
    certificate = await provider.getCertificate();
  } catch (err) {
    if (err instanceof SubjectTokenProviderError) throw err;
    throw new SubjectTokenProviderError(
      `Failed to get client certificate: ${err instanceof Error ? err.message : String(err)}`,
      'custom',
      err,
    );
  }
  if (!certificate?.certChain?.trim() || !certificate?.key?.trim()) {
    throw new SubjectTokenProviderError(
      'Client certificate provider returned an empty certificate or key',
      'custom',
    );
  }
  return certificate;
}

async function getSubjectToken(provider: SubjectTokenProvider): Promise<string> {
  let token: string;
  try {
    token = await provider.getToken();
  } catch (err) {
    if (err instanceof SubjectTokenProviderError) throw err;
    throw new SubjectTokenProviderError(
      `Failed to get subject token: ${err instanceof Error ? err.message : String(err)}`,
      'custom',
      err,
    );
  }
  if (typeof token !== 'string' || !token.trim()) {
    throw new SubjectTokenProviderError('Subject token provider returned an empty token', 'custom');
  }
  return token.trim();
}
