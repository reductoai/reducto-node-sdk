// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isRequestOptions } from './core';
import { type Agent } from './_shims/index';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import * as TopLevelAPI from './resources/top-level';
import { APIVersionResponse, UploadParams, UploadResponse } from './resources/top-level';
import { Extract, ExtractRunJobParams, ExtractRunJobResponse, ExtractRunParams } from './resources/extract';
import { Job, JobCancelResponse, JobGetResponse } from './resources/job';
import { Parse, ParseRunJobParams, ParseRunJobResponse, ParseRunParams } from './resources/parse';
import { Split, SplitRunJobParams, SplitRunJobResponse, SplitRunParams } from './resources/split';
import { Webhook, WebhookRunResponse } from './resources/webhook';

export interface ClientOptions {
  /**
   * Defaults to process.env['REDUCTO_API_KEY'].
   */
  apiKey?: string | undefined;

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
  apiKey: string;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Reducto API.
   *
   * @param {string | undefined} [opts.apiKey=process.env['REDUCTO_API_KEY'] ?? undefined]
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
    apiKey = Core.readEnv('REDUCTO_API_KEY'),
    ...opts
  }: ClientOptions = {}) {
    if (apiKey === undefined) {
      throw new Errors.ReductoError(
        "The REDUCTO_API_KEY environment variable is missing or empty; either provide it, or instantiate the Reducto client with an apiKey option, like new Reducto({ apiKey: 'My API Key' }).",
      );
    }

    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `https://platform.reducto.ai`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  job: API.Job = new API.Job(this);
  split: API.Split = new API.Split(this);
  parse: API.Parse = new API.Parse(this);
  extract: API.Extract = new API.Extract(this);
  webhook: API.Webhook = new API.Webhook(this);

  /**
   * Get Version
   */
  apiVersion(options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this.get('/version', options);
  }

  /**
   * Upload
   */
  upload(
    params?: TopLevelAPI.UploadParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.UploadResponse>;
  upload(options?: Core.RequestOptions): Core.APIPromise<TopLevelAPI.UploadResponse>;
  upload(
    params: TopLevelAPI.UploadParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<TopLevelAPI.UploadResponse> {
    if (isRequestOptions(params)) {
      return this.upload({}, params);
    }
    const { extension, ...body } = params;
    return this.post('/upload', Core.multipartFormRequestOptions({ query: { extension }, body, ...options }));
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
    return { Authorization: `Bearer ${this.apiKey}` };
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

Reducto.Job = Job;
Reducto.Split = Split;
Reducto.Parse = Parse;
Reducto.Extract = Extract;
Reducto.Webhook = Webhook;
export declare namespace Reducto {
  export type RequestOptions = Core.RequestOptions;

  export {
    type APIVersionResponse as APIVersionResponse,
    type UploadResponse as UploadResponse,
    type UploadParams as UploadParams,
  };

  export { Job as Job, type JobCancelResponse as JobCancelResponse, type JobGetResponse as JobGetResponse };

  export {
    Split as Split,
    type SplitRunJobResponse as SplitRunJobResponse,
    type SplitRunParams as SplitRunParams,
    type SplitRunJobParams as SplitRunJobParams,
  };

  export {
    Parse as Parse,
    type ParseRunJobResponse as ParseRunJobResponse,
    type ParseRunParams as ParseRunParams,
    type ParseRunJobParams as ParseRunJobParams,
  };

  export {
    Extract as Extract,
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };

  export { Webhook as Webhook, type WebhookRunResponse as WebhookRunResponse };

  export type AdvancedProcessingOptions = API.AdvancedProcessingOptions;
  export type ArrayExtractConfig = API.ArrayExtractConfig;
  export type BaseProcessingOptions = API.BaseProcessingOptions;
  export type BoundingBox = API.BoundingBox;
  export type ExperimentalProcessingOptions = API.ExperimentalProcessingOptions;
  export type ExtractResponse = API.ExtractResponse;
  export type PageRange = API.PageRange;
  export type ParseResponse = API.ParseResponse;
  export type ParseUsage = API.ParseUsage;
  export type SplitCategory = API.SplitCategory;
  export type SplitResponse = API.SplitResponse;
  export type WebhookConfigNew = API.WebhookConfigNew;
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
