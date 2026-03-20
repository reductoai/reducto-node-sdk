// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ExtractAsyncAPI from './extract-async';
import * as ParseAsyncAPI from './parse-async';
import * as SplitAPI from './split';
import * as UploadAPI from './upload';

export class SplitAsync extends APIResource {
  /**
   * Split Async
   */
  create(
    body: SplitAsyncCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SplitAsyncCreateResponse> {
    return this._client.post('/split_async', { body, ...options });
  }
}

export interface SplitAsyncCreateResponse {
  job_id: string;
}

export interface SplitAsyncCreateParams {
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
   * The configuration options for processing the document.
   */
  split_description: Array<SplitAPI.SplitCategory>;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: ParseAsyncAPI.AsyncConfigV3;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: ExtractAsyncAPI.ParseOptions;

  /**
   * The settings for split processing.
   */
  settings?: SplitAPI.SplitTableOptions;

  /**
   * The prompt that describes rules for splitting the document.
   */
  split_rules?: string;
}

export declare namespace SplitAsync {
  export {
    type SplitAsyncCreateResponse as SplitAsyncCreateResponse,
    type SplitAsyncCreateParams as SplitAsyncCreateParams,
  };
}
