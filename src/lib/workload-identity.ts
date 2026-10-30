import { ReductoError, OAuthError, SubjectTokenProviderError, APIError } from '../error';
import { createResponseHeaders, safeJSON, type Fetch } from '../core';
import { fetch as defaultFetch } from '../_shims/index';

/** Supplies the identity token (JWT) that the workload's platform issued to it. */
export interface SubjectTokenProvider {
  /** `jwt` for a signed JWT, `id` for an OpenID Connect ID token. */
  tokenType: 'jwt' | 'id';

  /** Returns a fresh subject token. Called on every token exchange. */
  getToken: () => Promise<string>;
}

/** Exchanges a platform identity token for short-lived Reducto access tokens. */
export interface WorkloadIdentity {
  /** ID of the Reducto workload identity provider, `wip_...`. */
  identityProviderId: string;

  /** Supplies the subject token for each exchange. */
  provider: SubjectTokenProvider;

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
} as const;
const DEFAULT_REFRESH_BUFFER_SECONDS = 1200;
const DEFAULT_LIFETIME_SECONDS = 3600;
const EXCHANGE_TIMEOUT_MS = 60_000;

interface CachedToken {
  token: string;
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
  private inflight: Promise<string> | null = null;
  private generation = 0;

  constructor(
    private readonly config: WorkloadIdentity,
    private readonly tokenURL: string,
    private readonly fetch: Fetch = defaultFetch,
  ) {}

  async getToken(): Promise<string> {
    const cached = this.cached;
    if (cached && Date.now() < cached.expiresAt) {
      if (Date.now() >= cached.refreshAt) {
        this.refresh().catch(() => {});
      }
      return cached.token;
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

  private refresh(): Promise<string> {
    if (!this.inflight) {
      const generation = this.generation;
      const promise = this.exchange(generation).finally(() => {
        if (this.inflight === promise) this.inflight = null;
      });
      this.inflight = promise;
    }
    return this.inflight;
  }

  private async exchange(generation: number): Promise<string> {
    const { provider, identityProviderId } = this.config;
    const subjectToken = await getSubjectToken(provider);

    const startedAt = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), EXCHANGE_TIMEOUT_MS);
    let response;
    try {
      response = await this.fetch.call(undefined, this.tokenURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          grant_type: GRANT_TYPE,
          subject_token_type: SUBJECT_TOKEN_TYPES[provider.tokenType],
          subject_token: subjectToken,
          identity_provider_id: identityProviderId,
        }),
        redirect: 'manual',
        signal: controller.signal as any,
      });
    } finally {
      clearTimeout(timeout);
    }

    const text = await response.text();
    const body = safeJSON(text);
    if (!response.ok) {
      const headers = createResponseHeaders(response.headers);
      if (response.status === 400 || response.status === 401 || response.status === 403) {
        throw new OAuthError(response.status, body, headers);
      }
      throw APIError.generate(response.status, body, body ? undefined : text, headers);
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

    if (generation === this.generation) {
      this.cached = { token: result.access_token, expiresAt, refreshAt: expiresAt - buffer * 1000 };
    }
    return result.access_token;
  }
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
