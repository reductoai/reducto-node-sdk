import { isRequestOptions } from './core';
import { type Agent, type RequestInit } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import { isMultipartBody } from './uploads';
import { WorkloadIdentityAuth, type WorkloadIdentity } from './lib/workload-identity';
import { identityTokenFile } from './lib/subject-token-providers';
import * as API from './resources/index';
import * as Shared from './resources/shared';
import * as TopLevelAPI from './resources/top-level';
import { APIVersionResponse, DeleteUploadResponse, UploadParams } from './resources/top-level';
import { Classify, ClassifyRunJobParams, ClassifyRunParams, PageRange } from './resources/classify';
import {
  BoundingBox,
  Edit,
  EditOptions,
  EditRunJobParams,
  EditRunParams,
  EditWidget,
} from './resources/edit';
import {
  AsyncExtractConfig,
  Extract,
  ExtractRunJobParams,
  ExtractRunParams,
  ExtractRunResponse,
  ExtractSettings,
  ExtractUsage,
  ExtractUsageBreakdown,
  Instructions,
  ParseOptions,
  V3Extract,
} from './resources/extract';
import {
  Job,
  JobCancelResponse,
  JobDeleteResponse,
  JobGetAllParams,
  JobGetAllResponse,
  JobGetResponse,
} from './resources/job';
import {
  AsyncConfigV3,
  AsyncParseConfig,
  Enhance,
  Formatting,
  HybridVpcSettings,
  Parse,
  ParseRunJobParams,
  ParseRunParams,
  ParseRunResponse,
  Retrieval,
  Settings,
  Spreadsheet,
  TenantThrottling,
} from './resources/parse';
import { Pipeline, PipelineRunJobParams, PipelineRunParams, PipelineSettings } from './resources/pipeline';
import {
  DeepSplitPageEvidence,
  EditUsageBreakdown,
  ParseUsage,
  ParseUsageBreakdown,
  Split,
  SplitCategory,
  SplitRunJobParams,
  SplitRunParams,
  SplitTableOptions,
  SplitUsageBreakdown,
} from './resources/split';
import { Webhook, WebhookRunResponse } from './resources/webhook';

const environments = {
  production: 'https://platform.reducto.ai',
  eu: 'https://eu.platform.reducto.ai',
  au: 'https://au.platform.reducto.ai',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['REDUCTO_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Authenticate with workload identity federation instead of an API key: the SDK
   * exchanges a token from your platform (Kubernetes, GitHub Actions, AWS, GCP, Azure, ...)
   * for short-lived Reducto access tokens. Helpers live in `reductoai/auth`.
   *
   * Cannot be combined with `apiKey`. Without either option, `REDUCTO_API_KEY` is used,
   * then `REDUCTO_IDENTITY_PROVIDER_ID` with `REDUCTO_IDENTITY_TOKEN_FILE` or `REDUCTO_IDENTITY_TOKEN`.
   */
  workloadIdentity?: WorkloadIdentity | undefined;

  /**
   * Specifies the environment to use for the API.
   *
   * Each environment maps to a different base URL:
   * - `production` corresponds to `https://platform.reducto.ai`
   * - `eu` corresponds to `https://eu.platform.reducto.ai`
   * - `au` corresponds to `https://au.platform.reducto.ai`
   */
  environment?: Environment | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['REDUCTO_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

const TOKEN_EXCHANGE_PATH = '/oauth/token';

/**
 * API Client for interfacing with the Reducto API.
 */
export class Reducto extends Core.APIClient {
  /** The API key, or an empty string when the client uses workload identity federation. */
  apiKey: string;

  private _options: ClientOptions;
  private _workloadIdentityAuth: WorkloadIdentityAuth | undefined;
  private _workloadIdentityTokens = new WeakMap<Core.FinalRequestOptions, string>();
  private _workloadIdentityRetried = new WeakSet<Core.FinalRequestOptions>();

  /**
   * API Client for interfacing with the Reducto API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['REDUCTO_API_KEY'] ?? undefined]
   * @param {WorkloadIdentity | undefined} [opts.workloadIdentity] - Authenticate with workload identity federation instead of an API key.
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['REDUCTO_BASE_URL'] ?? https://platform.reducto.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 hour] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('REDUCTO_BASE_URL'),
    apiKey,
    workloadIdentity,
    ...opts
  }: ClientOptions = {}) {
    if (apiKey !== undefined && workloadIdentity) {
      throw new Errors.ReductoError('The `apiKey` and `workloadIdentity` options are mutually exclusive.');
    }
    if (apiKey === undefined && !workloadIdentity) {
      apiKey = Core.readEnv('REDUCTO_API_KEY');
      if (apiKey === undefined) workloadIdentity = workloadIdentityFromEnv();
    }
    if (apiKey === undefined && !workloadIdentity) {
      throw new Errors.ReductoError(
        "Missing credentials. Set the REDUCTO_API_KEY environment variable, or instantiate the Reducto client with an apiKey option, like new Reducto({ apiKey: 'My API Key' }), or configure workload identity federation with the workloadIdentity option or the REDUCTO_IDENTITY_PROVIDER_ID and REDUCTO_IDENTITY_TOKEN_FILE environment variables.",
      );
    }

    const options: ClientOptions = {
      apiKey,
      workloadIdentity,
      ...opts,
      baseURL,
      environment: opts.environment ?? 'production',
    };

    if (baseURL && opts.environment) {
      throw new Errors.ReductoError(
        'Ambiguous URL; The `baseURL` option (or REDUCTO_BASE_URL env var) and the `environment` option are given. If you want to use the environment you must pass baseURL: null',
      );
    }

    super({
      baseURL: options.baseURL || environments[options.environment || 'production'],
      baseURLOverridden: baseURL ? baseURL !== environments[options.environment || 'production'] : false,
      timeout: options.timeout ?? 3600000 /* 1 hour */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey ?? '';
    if (workloadIdentity) {
      this._workloadIdentityAuth = new WorkloadIdentityAuth(workloadIdentity, (body) =>
        this.post(TOKEN_EXCHANGE_PATH, { body, headers: { Authorization: null }, timeout: 60_000 }),
      );
    }
  }

  parse: API.Parse = new API.Parse(this);
  extract: API.Extract = new API.Extract(this);
  split: API.Split = new API.Split(this);
  edit: API.Edit = new API.Edit(this);
  pipeline: API.Pipeline = new API.Pipeline(this);
  classify: API.Classify = new API.Classify(this);
  webhook: API.Webhook = new API.Webhook(this);
  job: API.Job = new API.Job(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
  }

  /**
   * Get Version
   */
  apiVersion(options?: Core.RequestOptions): Core.APIPromise<string> {
    return this.get('/version', options);
  }

  /**
   * Delete a previously uploaded file.
   *
   * Removes the stored file for the given `reducto://` file ID. Deletion is
   * immediate and permanent, and returns 404 if the file does not exist or was not
   * uploaded by your organization. Jobs that already ran against the file are
   * unaffected; delete those separately with `client.job.delete()`.
   */
  deleteUpload(
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.DeleteUploadResponse> {
    return this.delete(`/upload/${fileId}`, options);
  }

  /**
   * Upload
   */
  upload(params?: TopLevelAPI.UploadParams, options?: Core.RequestOptions): Core.APIPromise<Shared.Upload>;
  upload(options?: Core.RequestOptions): Core.APIPromise<Shared.Upload>;
  upload(
    params: TopLevelAPI.UploadParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.Upload> {
    if (isRequestOptions(params)) {
      return this.upload({}, params);
    }
    const { extension, ...body } = params;
    return this.post(
      '/upload',
      Core.maybeMultipartFormRequestOptions({ query: { extension }, body, ...options }),
    );
  }

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return this._workloadIdentityAuth ? {} : { Authorization: `Bearer ${this.apiKey}` };
  }

  protected override async prepareRequest(
    request: RequestInit,
    { options }: { url: string; options: Core.FinalRequestOptions },
  ): Promise<void> {
    if (!this._workloadIdentityAuth) return;
    if (options.path === TOKEN_EXCHANGE_PATH) {
      request.redirect = 'manual';
      return;
    }
    const headers = request.headers as Record<string, string>;
    const overridden = Object.keys(options.headers ?? {}).some((k) => k.toLowerCase() === 'authorization');
    if (overridden || 'authorization' in headers) return;

    const token = await this._workloadIdentityAuth.getToken();
    headers['authorization'] = `Bearer ${token}`;
    this._workloadIdentityTokens.set(options, token);
  }

  protected override async shouldRetryUnauthorized(options: Core.FinalRequestOptions): Promise<boolean> {
    const token = this._workloadIdentityTokens.get(options);
    if (!this._workloadIdentityAuth || token === undefined) return false;
    this._workloadIdentityAuth.invalidate(token);

    // A stream body was consumed by the first attempt and cannot be sent again.
    const body = options.body as any;
    const streamed =
      isMultipartBody(body) || typeof body?.pipe === 'function' || typeof body?.getReader === 'function';
    if (streamed || this._workloadIdentityRetried.has(options)) return false;
    this._workloadIdentityRetried.add(options);
    return true;
  }

  static Reducto = this;
  static DEFAULT_TIMEOUT = 3600000; // 1 hour

  static ReductoError = Errors.ReductoError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
  static OAuthError = Errors.OAuthError;
  static SubjectTokenProviderError = Errors.SubjectTokenProviderError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Reducto.Parse = Parse;
Reducto.Extract = Extract;
Reducto.Split = Split;
Reducto.Edit = Edit;
Reducto.Pipeline = Pipeline;
Reducto.Classify = Classify;
Reducto.Webhook = Webhook;
Reducto.Job = Job;

export declare namespace Reducto {
  export type RequestOptions = Core.RequestOptions;

  export {
    type APIVersionResponse as APIVersionResponse,
    type DeleteUploadResponse as DeleteUploadResponse,
    type UploadParams as UploadParams,
  };

  export {
    Parse as Parse,
    type AsyncConfigV3 as AsyncConfigV3,
    type AsyncParseConfig as AsyncParseConfig,
    type Enhance as Enhance,
    type Formatting as Formatting,
    type HybridVpcSettings as HybridVpcSettings,
    type Retrieval as Retrieval,
    type Settings as Settings,
    type Spreadsheet as Spreadsheet,
    type TenantThrottling as TenantThrottling,
    type ParseRunResponse as ParseRunResponse,
    type ParseRunParams as ParseRunParams,
    type ParseRunJobParams as ParseRunJobParams,
  };

  export {
    Extract as Extract,
    type AsyncExtractConfig as AsyncExtractConfig,
    type ExtractSettings as ExtractSettings,
    type ExtractUsage as ExtractUsage,
    type ExtractUsageBreakdown as ExtractUsageBreakdown,
    type Instructions as Instructions,
    type ParseOptions as ParseOptions,
    type V3Extract as V3Extract,
    type ExtractRunResponse as ExtractRunResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };

  export {
    Split as Split,
    type DeepSplitPageEvidence as DeepSplitPageEvidence,
    type EditUsageBreakdown as EditUsageBreakdown,
    type ParseUsage as ParseUsage,
    type ParseUsageBreakdown as ParseUsageBreakdown,
    type SplitUsageBreakdown as SplitUsageBreakdown,
    type SplitCategory as SplitCategory,
    type SplitTableOptions as SplitTableOptions,
    type SplitRunParams as SplitRunParams,
    type SplitRunJobParams as SplitRunJobParams,
  };

  export {
    Edit as Edit,
    type BoundingBox as BoundingBox,
    type EditOptions as EditOptions,
    type EditWidget as EditWidget,
    type EditRunParams as EditRunParams,
    type EditRunJobParams as EditRunJobParams,
  };

  export {
    Pipeline as Pipeline,
    type PipelineSettings as PipelineSettings,
    type PipelineRunParams as PipelineRunParams,
    type PipelineRunJobParams as PipelineRunJobParams,
  };

  export {
    Classify as Classify,
    type PageRange as PageRange,
    type ClassifyRunParams as ClassifyRunParams,
    type ClassifyRunJobParams as ClassifyRunJobParams,
  };

  export { Webhook as Webhook, type WebhookRunResponse as WebhookRunResponse };

  export {
    Job as Job,
    type JobCancelResponse as JobCancelResponse,
    type JobDeleteResponse as JobDeleteResponse,
    type JobGetResponse as JobGetResponse,
    type JobGetAllResponse as JobGetAllResponse,
    type JobGetAllParams as JobGetAllParams,
  };

  export type AdvancedCitationsConfig = API.AdvancedCitationsConfig;
  export type AdvancedProcessingOptions = API.AdvancedProcessingOptions;
  export type ArrayExtractConfig = API.ArrayExtractConfig;
  export type AsyncClassifyResponse = API.AsyncClassifyResponse;
  export type AsyncEditResponse = API.AsyncEditResponse;
  export type AsyncExtractResponse = API.AsyncExtractResponse;
  export type AsyncParseResponse = API.AsyncParseResponse;
  export type AsyncPipelineResponse = API.AsyncPipelineResponse;
  export type AsyncSplitResponse = API.AsyncSplitResponse;
  export type BaseProcessingOptions = API.BaseProcessingOptions;
  export type Chunking = API.Chunking;
  export type ChartResponse = API.ChartResponse;
  export type ChunkingConfig = API.ChunkingConfig;
  export type ClassifyResponse = API.ClassifyResponse;
  export type ClassifyUsage = API.ClassifyUsage;
  export type ClassifyUsageBreakdown = API.ClassifyUsageBreakdown;
  export type DirectWebhookConfig = API.DirectWebhookConfig;
  export type DocumentProperties = API.DocumentProperties;
  export type EditResponse = API.EditResponse;
  export type EnrichConfig = API.EnrichConfig;
  export type ErrorDetail = API.ErrorDetail;
  export type ExperimentalProcessingOptions = API.ExperimentalProcessingOptions;
  export type ExtractResponse = API.ExtractResponse;
  export type FigureAgentic = API.FigureAgentic;
  export type FigureSummaryConfig = API.FigureSummaryConfig;
  export type LargeTableChunkingConfig = API.LargeTableChunkingConfig;
  export type ParseResponse = API.ParseResponse;
  export type PipelineResponse = API.PipelineResponse;
  export type SplitLargeTables = API.SplitLargeTables;
  export type SplitResponse = API.SplitResponse;
  export type SvixWebhookConfig = API.SvixWebhookConfig;
  export type TableAgentic = API.TableAgentic;
  export type TableSummaryConfig = API.TableSummaryConfig;
  export type TextAgentic = API.TextAgentic;
  export type URLResult = API.URLResult;
  export type Upload = API.Upload;
  export type WebhookConfigNew = API.WebhookConfigNew;
}

export { toFile, fileFromPath, type Uploadable } from './uploads';
export {
  ReductoError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

function workloadIdentityFromEnv(): WorkloadIdentity | undefined {
  const identityProviderId = Core.readEnv('REDUCTO_IDENTITY_PROVIDER_ID');
  if (!identityProviderId) return undefined;

  const tokenFile = Core.readEnv('REDUCTO_IDENTITY_TOKEN_FILE');
  if (tokenFile) return { identityProviderId, provider: identityTokenFile(tokenFile) };

  const token = Core.readEnv('REDUCTO_IDENTITY_TOKEN');
  if (token) return { identityProviderId, provider: { tokenType: 'jwt', getToken: async () => token } };

  throw new Errors.ReductoError(
    'REDUCTO_IDENTITY_PROVIDER_ID is set, but neither REDUCTO_IDENTITY_TOKEN_FILE nor REDUCTO_IDENTITY_TOKEN is.',
  );
}

export default Reducto;
