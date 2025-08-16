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
   * 4. A job_id (jobid://) or a list of job_ids (jobid://) obtained from a previous
   *    /parse endpoint
   */
  document_url: string | Array<string> | Shared.Upload;

  /**
   * The JSON schema to use for extraction.
   */
  schema: unknown;

  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  /**
   * The configuration options for citations.
   */
  citations_options?: ExtractRunParams.CitationsOptions;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * If table citations should be generated for the extracted content.
   */
  experimental_table_citations?: boolean;

  /**
   * If citations should be generated for the extracted content.
   */
  generate_citations?: boolean;

  /**
   * If images should be passed directly for extractions. Can only be enabled for
   * documents with less than 10 pages. Defaults to False.
   */
  include_images?: boolean;

  options?: Shared.BaseProcessingOptions;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  /**
   * If spreadsheet agent should be used for extraction.
   */
  spreadsheet_agent?: boolean;

  /**
   * A system prompt to use for the extraction. This is a general prompt that is
   * applied to the entire document before any other prompts.
   */
  system_prompt?: string;

  /**
   * If chunking should be used for the extraction. Defaults to False.
   */
  use_chunking?: boolean;
}

export namespace ExtractRunParams {
  /**
   * The configuration options for citations.
   */
  export interface CitationsOptions {
    /**
     * If True, enable numeric citation confidence scores. Defaults to False.
     */
    numerical_confidence?: boolean;
  }
}

export interface ExtractRunJobParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   * 4. A job_id (jobid://) or a list of job_ids (jobid://) obtained from a previous
   *    /parse endpoint
   */
  document_url: string | Array<string> | Shared.Upload;

  /**
   * The JSON schema to use for extraction.
   */
  schema: unknown;

  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  /**
   * The configuration options for citations.
   */
  citations_options?: ExtractRunJobParams.CitationsOptions;

  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * If table citations should be generated for the extracted content.
   */
  experimental_table_citations?: boolean;

  /**
   * If citations should be generated for the extracted content.
   */
  generate_citations?: boolean;

  /**
   * If images should be passed directly for extractions. Can only be enabled for
   * documents with less than 10 pages. Defaults to False.
   */
  include_images?: boolean;

  options?: Shared.BaseProcessingOptions;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  /**
   * If spreadsheet agent should be used for extraction.
   */
  spreadsheet_agent?: boolean;

  /**
   * A system prompt to use for the extraction. This is a general prompt that is
   * applied to the entire document before any other prompts.
   */
  system_prompt?: string;

  /**
   * If chunking should be used for the extraction. Defaults to False.
   */
  use_chunking?: boolean;

  webhook?: Shared.WebhookConfigNew;
}

export namespace ExtractRunJobParams {
  /**
   * The configuration options for citations.
   */
  export interface CitationsOptions {
    /**
     * If True, enable numeric citation confidence scores. Defaults to False.
     */
    numerical_confidence?: boolean;
  }
}

export declare namespace Extract {
  export {
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
