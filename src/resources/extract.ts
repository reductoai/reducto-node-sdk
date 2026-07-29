// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ParseAPI from './parse';
import * as Shared from './shared';

export class Extract extends APIResource {
  /**
   * Extract
   */
  run(body: ExtractRunParams, options?: Core.RequestOptions): Core.APIPromise<ExtractRunResponse> {
    return this._client.post('/extract', { body, ...options });
  }

  /**
   * Extract Async
   */
  runJob(
    body: ExtractRunJobParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Shared.AsyncExtractResponse> {
    return this._client.post('/extract_async', { body, ...options });
  }
}

export interface AsyncExtractConfig {
  /**
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation 5. A list of URLs (for multi-document pipelines, V3
   * API only)
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Array<string> | Shared.Upload;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: ParseAPI.AsyncConfigV3;

  /**
   * The instructions to use for the extraction.
   */
  instructions?: Instructions;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: ParseOptions;

  /**
   * The settings to use for the extraction.
   */
  settings?: ExtractSettings;
}

export interface ExtractSettings {
  /**
   * Deprecated: prefer deep_extract, which supersedes array extraction for complex
   * and long (array-heavy) extractions via an agentic loop (at higher cost and
   * latency). If True, use array extraction.
   */
  array_extract?: boolean;

  /**
   * The citations to use for the extraction.
   */
  citations?: ExtractSettings.Citations;

  /**
   * If True, use Deep Extract, an agentic extraction mode that iteratively refines
   * its output to achieve near-perfect accuracy. Best for complex documents where
   * accuracy is critical.
   */
  deep_extract?: boolean;

  /**
   * Force the endpoint result to be returned in URL form.
   */
  force_url_result?: boolean;

  /**
   * If True, include images in the extraction.
   */
  include_images?: boolean;

  /**
   * If True, jobs will be processed with a higher throughput and priority at a
   * higher cost. Defaults to False.
   */
  optimize_for_latency?: boolean;

  /**
   * The page range to extract from (1-indexed). By default, the entire document is
   * used. For spreadsheets, you can also provide a list of sheet names.
   */
  page_range?: Shared.PageRange | Array<Shared.PageRange> | Array<number> | Array<string> | null;
}

export namespace ExtractSettings {
  /**
   * The citations to use for the extraction.
   */
  export interface Citations {
    /**
     * If True, include citations in the extraction.
     */
    enabled?: boolean;

    /**
     * If True, enable numeric citation confidence scores. Defaults to True.
     */
    numerical_confidence?: boolean;

    /**
     * How much of the source parse block to embed on each citation's parentBlock.
     * 'full' (default) embeds the verbatim source-block HTML in parentBlock.content.
     * 'bbox_only' suppresses parentBlock.content (returned as an empty string) while
     * keeping parentBlock.bbox and all citation-level fields — this can drastically
     * shrink responses on table-heavy schemas where the same source block is cited
     * many times.
     */
    parent_block?: 'full' | 'bbox_only';
  }
}

export interface ExtractUsage {
  num_fields: number;

  num_pages: number;

  credits?: number | null;

  extract_mode?: 'super_agent' | 'extract' | 'spreadsheet_agent' | null;
}

export interface Instructions {
  /**
   * The JSON schema to use for the extraction.
   */
  schema?: unknown;

  /**
   * The system prompt to use for the extraction.
   */
  system_prompt?: string;
}

export interface ParseOptions {
  enhance?: ParseAPI.Enhance;

  formatting?: ParseAPI.Formatting;

  retrieval?: ParseAPI.Retrieval;

  settings?: ParseAPI.Settings;

  spreadsheet?: ParseAPI.Spreadsheet;
}

export interface V3Extract {
  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disable_chunking is True (default), then it will be a list of length one.
   */
  result: unknown | Array<unknown>;

  usage: ExtractUsage;

  /**
   * Optional document-level deep extract confidence label.
   */
  confidence?: 'high' | 'low' | null;

  /**
   * Optional explanation for the document-level confidence label.
   */
  confidence_reason?: string | null;

  job_id?: string | null;

  response_type?: 'v3_extract';

  /**
   * The link to the studio pipeline for the document.
   */
  studio_link?: string | null;
}

export type ExtractRunResponse = V3Extract | Shared.AsyncExtractResponse;

export type ExtractRunParams = ExtractRunParams.SyncExtractConfig | ExtractRunParams.AsyncExtractConfig;

export declare namespace ExtractRunParams {
  export interface SyncExtractConfig {
    /**
     * For parse/split/extract pipelines, the URL of the document to be processed. You
     * can provide one of the following: 1. A publicly available URL 2. A presigned S3
     * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
     * directly uploading a document 4. A jobid:// prefixed URL obtained from a
     * previous /parse invocation 5. A list of URLs (for multi-document pipelines, V3
     * API only)
     *
     *             For edit pipelines, this should be a string containing the edit instructions
     */
    input: string | Array<string> | Shared.Upload;

    /**
     * The instructions to use for the extraction.
     */
    instructions?: Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: ParseOptions;

    /**
     * The settings to use for the extraction.
     */
    settings?: ExtractSettings;
  }

  export interface AsyncExtractConfig {
    /**
     * For parse/split/extract pipelines, the URL of the document to be processed. You
     * can provide one of the following: 1. A publicly available URL 2. A presigned S3
     * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
     * directly uploading a document 4. A jobid:// prefixed URL obtained from a
     * previous /parse invocation 5. A list of URLs (for multi-document pipelines, V3
     * API only)
     *
     *             For edit pipelines, this should be a string containing the edit instructions
     */
    input: string | Array<string> | Shared.Upload;

    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    async?: ParseAPI.AsyncConfigV3;

    /**
     * The instructions to use for the extraction.
     */
    instructions?: Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: ParseOptions;

    /**
     * The settings to use for the extraction.
     */
    settings?: ExtractSettings;
  }
}

export interface ExtractRunJobParams {
  /**
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation 5. A list of URLs (for multi-document pipelines, V3
   * API only)
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Array<string> | Shared.Upload;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: ParseAPI.AsyncConfigV3;

  /**
   * The instructions to use for the extraction.
   */
  instructions?: Instructions;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: ParseOptions;

  /**
   * The settings to use for the extraction.
   */
  settings?: ExtractSettings;
}

export declare namespace Extract {
  export {
    type AsyncExtractConfig as AsyncExtractConfig,
    type ExtractSettings as ExtractSettings,
    type ExtractUsage as ExtractUsage,
    type Instructions as Instructions,
    type ParseOptions as ParseOptions,
    type V3Extract as V3Extract,
    type ExtractRunResponse as ExtractRunResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
