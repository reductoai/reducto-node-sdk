// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Extract extends APIResource {
  /**
   * Extract
   */
  run(params: ExtractRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ExtractResponse> {
    const { 'user-id': userId, ...body } = params;
    return this._client.post('/extract', {
      body,
      ...options,
      headers: { ...(userId != null ? { 'user-id': userId } : undefined), ...options?.headers },
    });
  }

  /**
   * Extract Async
   */
  runJob(params: ExtractRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ExtractRunJobResponse> {
    const { 'user-id': userId, ...body } = params;
    return this._client.post('/extract_async', {
      body,
      ...options,
      headers: { ...(userId != null ? { 'user-id': userId } : undefined), ...options?.headers },
    });
  }
}

export interface ExtractRunJobResponse {
  job_id: string;
}

export interface ExtractRunParams {
  /**
   * Body param: The URL of the document to be processed. You can provide one of the
   * following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   * 4. A job_id (jobid://) or a list of job_ids (jobid://)
   */
  document_url: string | Array<string> | Shared.Upload;

  /**
   * Body param: The JSON schema to use for extraction.
   */
  schema: unknown;

  /**
   * Body param:
   */
  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * Body param: The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  /**
   * Body param:
   */
  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * Body param: If citations should be generated for the extracted content.
   */
  generate_citations?: boolean;

  /**
   * Body param:
   */
  options?: Shared.BaseProcessingOptions;

  /**
   * Body param: A system prompt to use for the extraction. This is a general prompt
   * that is applied to the entire document before any other prompts.
   */
  system_prompt?: string;

  /**
   * Body param: If chunking should be used for the extraction. Defaults to False.
   */
  use_chunking?: boolean;

  /**
   * Header param:
   */
  'user-id'?: string;
}

export interface ExtractRunJobParams {
  /**
   * Body param: The URL of the document to be processed. You can provide one of the
   * following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   * 4. A job_id (jobid://) or a list of job_ids (jobid://)
   */
  document_url: string | Array<string> | Shared.Upload;

  /**
   * Body param: The JSON schema to use for extraction.
   */
  schema: unknown;

  /**
   * Body param:
   */
  advanced_options?: Shared.AdvancedProcessingOptions;

  /**
   * Body param: The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  /**
   * Body param:
   */
  experimental_options?: Shared.ExperimentalProcessingOptions;

  /**
   * Body param: If citations should be generated for the extracted content.
   */
  generate_citations?: boolean;

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
   * Body param: A system prompt to use for the extraction. This is a general prompt
   * that is applied to the entire document before any other prompts.
   */
  system_prompt?: string;

  /**
   * Body param: If chunking should be used for the extraction. Defaults to False.
   */
  use_chunking?: boolean;

  /**
   * Body param:
   */
  webhook?: Shared.WebhookConfigNew;

  /**
   * Header param:
   */
  'user-id'?: string;
}

export declare namespace Extract {
  export {
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
