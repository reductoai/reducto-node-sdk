// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Split extends APIResource {
  /**
   * Split
   */
  run(body: SplitRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.SplitResponse> {
    return this._client.post('/split', { body, ...options });
  }

  /**
   * Split Async
   */
  runJob(body: SplitRunJobParams, options?: Core.RequestOptions): Core.APIPromise<SplitRunJobResponse> {
    return this._client.post('/split_async', { body, ...options });
  }
}

export interface SplitRunJobResponse {
  job_id: string;
}

export interface SplitRunParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string;

  /**
   * The configuration options for processing the document.
   */
  split_description: Array<Shared.SplitCategory>;

  advanced_options?: Shared.AdvancedProcessingOptions;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  options?: Shared.BaseProcessingOptions;

  /**
   * The rules for splitting the document.
   */
  split_rules?: string;
}

export interface SplitRunJobParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string;

  /**
   * The configuration options for processing the document.
   */
  split_description: Array<Shared.SplitCategory>;

  advanced_options?: Shared.AdvancedProcessingOptions;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  options?: Shared.BaseProcessingOptions;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  /**
   * The rules for splitting the document.
   */
  split_rules?: string;

  webhook?: Shared.WebhookConfigNew;
}

export declare namespace Split {
  export {
    type SplitRunJobResponse as SplitRunJobResponse,
    type SplitRunParams as SplitRunParams,
    type SplitRunJobParams as SplitRunJobParams,
  };
}
