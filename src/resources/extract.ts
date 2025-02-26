// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Extract extends APIResource {
  /**
   * Extract
   */
  run(body: ExtractRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ExtractResponse> {
    return this._client.post('/extract', { body, ...options });
  }

  /**
   * Extract Async
   */
  runJob(body: ExtractRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ExtractRunJobResponse> {
    return this._client.post('/extract_async', { body, ...options });
  }
}

export interface ExtractRunJobResponse {
  job_id: string;
}

export interface ExtractRunParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  /**
   * The JSON schema to use for extraction.
   */
  schema: unknown;

  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * If citations should be generated for the extracted content.
   */
  generate_citations?: boolean;

  options?: Shared.BaseProcessingOptions;

  /**
   * A system prompt to use for the extraction. This is a general prompt that is
   * applied to the entire document before any other prompts.
   */
  system_prompt?: string;
}

export interface ExtractRunJobParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  /**
   * The JSON schema to use for extraction.
   */
  schema: unknown;

  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * If citations should be generated for the extracted content.
   */
  generate_citations?: boolean;

  options?: Shared.BaseProcessingOptions;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  /**
   * A system prompt to use for the extraction. This is a general prompt that is
   * applied to the entire document before any other prompts.
   */
  system_prompt?: string;

  webhook?: Shared.WebhookConfigNew;
}

export declare namespace Extract {
  export {
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
