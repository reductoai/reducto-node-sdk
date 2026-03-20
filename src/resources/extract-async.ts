// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ParseAsyncAPI from './parse-async';
import * as UploadAPI from './upload';

export class ExtractAsync extends APIResource {
  /**
   * Extract Async
   */
  create(
    body: ExtractAsyncCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<AsyncExtractResponse> {
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
  async?: ParseAsyncAPI.AsyncConfigV3;

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
  enhance?: ParseAsyncAPI.Enhance;

  formatting?: ParseAsyncAPI.Formatting;

  retrieval?: ParseAsyncAPI.Retrieval;

  settings?: ParseAsyncAPI.Settings;

  spreadsheet?: ParseAsyncAPI.Spreadsheet;
}

export interface ExtractAsyncCreateParams {
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
  async?: ParseAsyncAPI.AsyncConfigV3;

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

export declare namespace ExtractAsync {
  export {
    type AsyncExtractConfig as AsyncExtractConfig,
    type AsyncExtractResponse as AsyncExtractResponse,
    type ExtractSettings as ExtractSettings,
    type Instructions as Instructions,
    type ParseOptions as ParseOptions,
    type ExtractAsyncCreateParams as ExtractAsyncCreateParams,
  };
}
