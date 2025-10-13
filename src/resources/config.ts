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
   * The configuration options for agent extract
   */
  agent_extract?: ExtractConfig.AgentExtract;

  /**
   * The configuration options for array extract
   */
  array_extract?: Shared.ArrayExtractConfig;

  /**
   * The configuration options for citations.
   */
  citations_options?: Shared.AdvancedCitationsConfig;

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

  /**
   * If True, the job will be processed with lower latency and higher priority. Uses
   * 2x the cost of a regular job. Defaults to False.
   */
  latency_sensitive?: boolean;

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

export namespace ExtractConfig {
  /**
   * The configuration options for agent extract
   */
  export interface AgentExtract {
    /**
     * If agent extraction should be used for extraction.
     */
    enabled?: boolean;
  }
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

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;
}

export declare namespace Config {
  export { type ExtractConfig as ExtractConfig, type ParseConfig as ParseConfig };
}
