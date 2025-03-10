// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Shared from './shared';

export class Config extends APIResource {}

export interface ExtractConfig {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   * 4. A job_id (jobid://) or a list of job_ids (jobid://)
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

export interface ParseConfig {
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

export declare namespace Config {
  export { type ExtractConfig as ExtractConfig, type ParseConfig as ParseConfig };
}
