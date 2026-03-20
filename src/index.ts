// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import { Cancel, CancelCancelJobResponse } from './resources/cancel';
import { Classify, ClassifyClassifyParams, ClassifyResponse, PageRange } from './resources/classify';
import { ConfigureWebhook, ConfigureWebhookCreateResponse } from './resources/configure-webhook';
import { BoundingBox, Edit, EditOptions, EditResponse, EditSubmitParams, EditWidget } from './resources/edit';
import { EditAsync, EditAsyncCreateParams, EditAsyncCreateResponse } from './resources/edit-async';
import {
  Extract,
  ExtractCreateParams,
  ExtractCreateResponse,
  ExtractUsage,
  V3Extract,
} from './resources/extract';
import {
  AsyncExtractConfig,
  AsyncExtractResponse,
  ExtractAsync,
  ExtractAsyncCreateParams,
  ExtractSettings,
  Instructions,
  ParseOptions,
} from './resources/extract-async';
import { ExtractResponse, Job, JobListParams, JobListResponse, JobRetrieveResponse } from './resources/job';
import { Parse, ParseCreateParams, ParseCreateResponse, ParseResponse } from './resources/parse';
import {
  AsyncConfigV3,
  AsyncParseConfig,
  AsyncParseResponse,
  Enhance,
  Formatting,
  ParseAsync,
  ParseAsyncCreateParams,
  Retrieval,
  Settings,
  Spreadsheet,
} from './resources/parse-async';
import { Pipeline, PipelineCreateParams, PipelineResponse, PipelineSettings } from './resources/pipeline';
import {
  PipelineAsync,
  PipelineAsyncCreateParams,
  PipelineAsyncCreateResponse,
} from './resources/pipeline-async';
import {
  DeepSplitPageEvidence,
  ParseUsage,
  Split,
  SplitCategory,
  SplitCreateParams,
  SplitResponse,
  SplitTableOptions,
} from './resources/split';
import { SplitAsync, SplitAsyncCreateParams, SplitAsyncCreateResponse } from './resources/split-async';
import { Upload, UploadCreateParams, UploadResponse } from './resources/upload';
import { Version, VersionRetrieveResponse } from './resources/version';

const environments = {
  production: 'https://platform.reducto.ai',
  eu: 'https://eu.platform.reducto.ai',
  au: 'https://au.platform.reducto.ai',
};
type Environment = keyof typeof environments;

export interface ClientOptions {
  /**
   * Defaults to process.env['REDUCTOAI_BEARER_TOKEN'].
   */
  bearerToken?: string | undefined;

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

/**
 * API Client for interfacing with the Reducto API.
 */
export class Reducto extends Core.APIClient {
  bearerToken: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Reducto API.
   *
   * @param {string | undefined} [opts.bearerToken=process.env['REDUCTOAI_BEARER_TOKEN'] ?? undefined]
   * @param {Environment} [opts.environment=production] - Specifies the environment URL to use for the API.
   * @param {string} [opts.baseURL=process.env['REDUCTO_BASE_URL'] ?? https://platform.reducto.ai] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('REDUCTO_BASE_URL'),
    bearerToken = Core.readEnv('REDUCTOAI_BEARER_TOKEN'),
    ...opts
  }: ClientOptions = {}) {
    if (bearerToken === undefined) {
      throw new Errors.ReductoError(
        "The REDUCTOAI_BEARER_TOKEN environment variable is missing or empty; either provide it, or instantiate the Reducto client with an bearerToken option, like new Reducto({ bearerToken: 'My Bearer Token' }).",
      );
    }

    const options: ClientOptions = {
      bearerToken,
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
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.bearerToken = bearerToken;
  }

  parse: API.Parse = new API.Parse(this);
  parseAsync: API.ParseAsync = new API.ParseAsync(this);
  extract: API.Extract = new API.Extract(this);
  extractAsync: API.ExtractAsync = new API.ExtractAsync(this);
  split: API.Split = new API.Split(this);
  splitAsync: API.SplitAsync = new API.SplitAsync(this);
  edit: API.Edit = new API.Edit(this);
  editAsync: API.EditAsync = new API.EditAsync(this);
  pipeline: API.Pipeline = new API.Pipeline(this);
  pipelineAsync: API.PipelineAsync = new API.PipelineAsync(this);
  classify: API.Classify = new API.Classify(this);
  cancel: API.Cancel = new API.Cancel(this);
  upload: API.Upload = new API.Upload(this);
  configureWebhook: API.ConfigureWebhook = new API.ConfigureWebhook(this);
  version: API.Version = new API.Version(this);
  job: API.Job = new API.Job(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== environments[this._options.environment || 'production'];
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
    return { Authorization: `Bearer ${this.bearerToken}` };
  }

  static Reducto = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

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

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

Reducto.Parse = Parse;
Reducto.ParseAsync = ParseAsync;
Reducto.Extract = Extract;
Reducto.ExtractAsync = ExtractAsync;
Reducto.Split = Split;
Reducto.SplitAsync = SplitAsync;
Reducto.Edit = Edit;
Reducto.EditAsync = EditAsync;
Reducto.Pipeline = Pipeline;
Reducto.PipelineAsync = PipelineAsync;
Reducto.Classify = Classify;
Reducto.Cancel = Cancel;
Reducto.Upload = Upload;
Reducto.ConfigureWebhook = ConfigureWebhook;
Reducto.Version = Version;
Reducto.Job = Job;

export declare namespace Reducto {
  export type RequestOptions = Core.RequestOptions;

  export {
    Parse as Parse,
    type ParseResponse as ParseResponse,
    type ParseCreateResponse as ParseCreateResponse,
    type ParseCreateParams as ParseCreateParams,
  };

  export {
    ParseAsync as ParseAsync,
    type AsyncConfigV3 as AsyncConfigV3,
    type AsyncParseConfig as AsyncParseConfig,
    type AsyncParseResponse as AsyncParseResponse,
    type Enhance as Enhance,
    type Formatting as Formatting,
    type Retrieval as Retrieval,
    type Settings as Settings,
    type Spreadsheet as Spreadsheet,
    type ParseAsyncCreateParams as ParseAsyncCreateParams,
  };

  export {
    Extract as Extract,
    type ExtractUsage as ExtractUsage,
    type V3Extract as V3Extract,
    type ExtractCreateResponse as ExtractCreateResponse,
    type ExtractCreateParams as ExtractCreateParams,
  };

  export {
    ExtractAsync as ExtractAsync,
    type AsyncExtractConfig as AsyncExtractConfig,
    type AsyncExtractResponse as AsyncExtractResponse,
    type ExtractSettings as ExtractSettings,
    type Instructions as Instructions,
    type ParseOptions as ParseOptions,
    type ExtractAsyncCreateParams as ExtractAsyncCreateParams,
  };

  export {
    Split as Split,
    type DeepSplitPageEvidence as DeepSplitPageEvidence,
    type ParseUsage as ParseUsage,
    type SplitCategory as SplitCategory,
    type SplitResponse as SplitResponse,
    type SplitTableOptions as SplitTableOptions,
    type SplitCreateParams as SplitCreateParams,
  };

  export {
    SplitAsync as SplitAsync,
    type SplitAsyncCreateResponse as SplitAsyncCreateResponse,
    type SplitAsyncCreateParams as SplitAsyncCreateParams,
  };

  export {
    Edit as Edit,
    type BoundingBox as BoundingBox,
    type EditOptions as EditOptions,
    type EditResponse as EditResponse,
    type EditWidget as EditWidget,
    type EditSubmitParams as EditSubmitParams,
  };

  export {
    EditAsync as EditAsync,
    type EditAsyncCreateResponse as EditAsyncCreateResponse,
    type EditAsyncCreateParams as EditAsyncCreateParams,
  };

  export {
    Pipeline as Pipeline,
    type PipelineResponse as PipelineResponse,
    type PipelineSettings as PipelineSettings,
    type PipelineCreateParams as PipelineCreateParams,
  };

  export {
    PipelineAsync as PipelineAsync,
    type PipelineAsyncCreateResponse as PipelineAsyncCreateResponse,
    type PipelineAsyncCreateParams as PipelineAsyncCreateParams,
  };

  export {
    Classify as Classify,
    type ClassifyResponse as ClassifyResponse,
    type PageRange as PageRange,
    type ClassifyClassifyParams as ClassifyClassifyParams,
  };

  export { Cancel as Cancel, type CancelCancelJobResponse as CancelCancelJobResponse };

  export {
    Upload as Upload,
    type UploadResponse as UploadResponse,
    type UploadCreateParams as UploadCreateParams,
  };

  export {
    ConfigureWebhook as ConfigureWebhook,
    type ConfigureWebhookCreateResponse as ConfigureWebhookCreateResponse,
  };

  export { Version as Version, type VersionRetrieveResponse as VersionRetrieveResponse };

  export {
    Job as Job,
    type ExtractResponse as ExtractResponse,
    type JobRetrieveResponse as JobRetrieveResponse,
    type JobListResponse as JobListResponse,
    type JobListParams as JobListParams,
  };
}

export { toFile, fileFromPath } from './uploads';
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

export default Reducto;
