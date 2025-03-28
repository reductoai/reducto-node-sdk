// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Parse extends APIResource {
  /**
   * Parse
   */
  run(params: ParseRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ParseResponse> {
    const { 'user-id': userId, ...body } = params;
    return this._client.post('/parse', {
      body,
      ...options,
      headers: { ...(userId != null ? { 'user-id': userId } : undefined), ...options?.headers },
    });
  }

  /**
   * Async Parse
   */
  runJob(params: ParseRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ParseRunJobResponse> {
    const { 'user-id': userId, ...body } = params;
    return this._client.post('/parse_async', {
      body,
      ...options,
      headers: { ...(userId != null ? { 'user-id': userId } : undefined), ...options?.headers },
    });
  }
}

export interface ParseRunJobResponse {
  job_id: string;
}

export interface ParseRunParams {
  /**
   * Body param: The URL of the document to be processed. You can provide one of the
   * following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  /**
   * Body param:
   */
  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * Body param:
   */
  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * Body param:
   */
  options?: Shared.BaseProcessingOptions;

  /**
   * Header param:
   */
  'user-id'?: string;
}

export interface ParseRunJobParams {
  /**
   * Body param: The URL of the document to be processed. You can provide one of the
   * following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  /**
   * Body param:
   */
  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * Body param:
   */
  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * Body param:
   */
  options?: Shared.BaseProcessingOptions;

  /**
   * Body param: If True, attempts to process the job with priority if the user has
   * priority processing budget available; by default, sync jobs are prioritized
   * above async jobs.
   */
  priority?: boolean;

  /**
   * Body param:
   */
  webhook?: Shared.WebhookConfigNew;

  /**
   * Header param:
   */
  'user-id'?: string;
}

export declare namespace Parse {
  export {
    type ParseRunJobResponse as ParseRunJobResponse,
    type ParseRunParams as ParseRunParams,
    type ParseRunJobParams as ParseRunJobParams,
  };
}
