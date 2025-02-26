// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Parse extends APIResource {
  /**
   * Parse
   */
  run(body: ParseRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ParseResponse> {
    return this._client.post('/parse', { body, ...options });
  }

  /**
   * Async Parse
   */
  runJob(body: ParseRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ParseRunJobResponse> {
    return this._client.post('/parse_async', { body, ...options });
  }
}

export interface ParseRunJobResponse {
  job_id: string;
}

export interface ParseRunParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  advanced_options?: Shared.AdvancedProcessingOptions;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  options?: Shared.BaseProcessingOptions;
}

export interface ParseRunJobParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  advanced_options?: Shared.AdvancedProcessingOptions;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  options?: Shared.BaseProcessingOptions;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  webhook?: Shared.WebhookConfigNew;
}

export declare namespace Parse {
  export {
    type ParseRunJobResponse as ParseRunJobResponse,
    type ParseRunParams as ParseRunParams,
    type ParseRunJobParams as ParseRunJobParams,
  };
}
