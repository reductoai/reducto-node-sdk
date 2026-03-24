// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ExtractAsyncAPI from './extract-async';
import * as ParseAsyncAPI from './parse-async';
import * as UploadAPI from './upload';

export class Extract extends APIResource {
  /**
   * Extract
   */
  create(body: ExtractCreateParams, options?: Core.RequestOptions): Core.APIPromise<ExtractCreateResponse> {
    return this._client.post('/extract', { body, ...options });
  }
}

export interface ExtractUsage {
  num_fields: number;

  num_pages: number;

  credits?: number | null;

  extract_mode?: 'super_agent' | 'extract' | 'spreadsheet_agent' | null;
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

export type ExtractCreateResponse = V3Extract | ExtractAsyncAPI.AsyncExtractResponse;

export type ExtractCreateParams =
  | ExtractCreateParams.SyncExtractConfig
  | ExtractCreateParams.AsyncExtractConfig;

export declare namespace ExtractCreateParams {
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
    instructions?: ExtractAsyncAPI.Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: ExtractAsyncAPI.ParseOptions;

    /**
     * The settings to use for the extraction.
     */
    settings?: ExtractAsyncAPI.ExtractSettings;
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
    instructions?: ExtractAsyncAPI.Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: ExtractAsyncAPI.ParseOptions;

    /**
     * The settings to use for the extraction.
     */
    settings?: ExtractAsyncAPI.ExtractSettings;
  }
}

export declare namespace Extract {
  export {
    type ExtractUsage as ExtractUsage,
    type V3Extract as V3Extract,
    type ExtractCreateResponse as ExtractCreateResponse,
    type ExtractCreateParams as ExtractCreateParams,
  };
}
