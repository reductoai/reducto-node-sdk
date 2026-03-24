// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ParseAPI from './parse';
import * as UploadAPI from './upload';

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
  runJob(body: ExtractRunJobParams, options?: Core.RequestOptions): Core.APIPromise<AsyncExtractResponse> {
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
  input: string | Array<string> | UploadAPI.UploadResponse;

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

export interface AsyncExtractResponse {
  job_id: string;
}

export interface ExtractSettings {
  /**
   * If True, use array extraction.
   */
  array_extract?: boolean;

  /**
   * The citations to use for the extraction.
   */
  citations?: ExtractSettings.Citations;

  /**
   * If True, include images in the extraction.
   */
  include_images?: boolean;

  /**
   * If True, jobs will be processed with a higher throughput and priority at a
   * higher cost. Defaults to False.
   */
  optimize_for_latency?: boolean;
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

  job_id?: string | null;

  /**
   * The link to the studio pipeline for the document.
   */
  studio_link?: string | null;
}

export type ExtractRunResponse = V3Extract | AsyncExtractResponse;

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
    input: string | Array<string> | UploadAPI.UploadResponse;

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
    input: string | Array<string> | UploadAPI.UploadResponse;

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
  input: string | Array<string> | UploadAPI.UploadResponse;

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
    type AsyncExtractResponse as AsyncExtractResponse,
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
