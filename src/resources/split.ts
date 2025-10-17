// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Split extends APIResource {
  /**
   * Split
   */
  run(body: SplitRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.SplitResponse> {
    return this._client.post('/split', { body, ...options });
  }

  /**
   * Split Async
   */
  runJob(body: SplitRunJobParams, options?: Core.RequestOptions): Core.APIPromise<SplitRunJobResponse> {
    return this._client.post('/split_async', { body, ...options });
  }
}

export interface SplitRunJobResponse {
  job_id: string;
}

export interface SplitRunParams {
  /**
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Shared.Upload;

  /**
   * The configuration options for processing the document.
   */
  split_description: Array<Shared.SplitCategory>;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: Shared.ParseOptions;

  /**
   * The settings for split processing.
   */
  settings?: SplitRunParams.Settings;

  /**
   * The prompt that describes rules for splitting the document.
   */
  split_rules?: string;
}

export namespace SplitRunParams {
  /**
   * The settings for split processing.
   */
  export interface Settings {
    /**
     * If tables should be truncated to the first few rows or if all content should be
     * preserved. truncate improves latency, preserve is recommended for cases where
     * partition_key is being used and the partition_key may be included within the
     * table. Defaults to truncate
     */
    table_cutoff?: 'truncate' | 'preserve';
  }
}

export interface SplitRunJobParams {
  /**
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Shared.Upload;

  /**
   * The configuration options for processing the document.
   */
  split_description: Array<Shared.SplitCategory>;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: Shared.ConfigV3AsyncConfig;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: Shared.ParseOptions;

  /**
   * The settings for split processing.
   */
  settings?: SplitRunJobParams.Settings;

  /**
   * The prompt that describes rules for splitting the document.
   */
  split_rules?: string;
}

export namespace SplitRunJobParams {
  /**
   * The settings for split processing.
   */
  export interface Settings {
    /**
     * If tables should be truncated to the first few rows or if all content should be
     * preserved. truncate improves latency, preserve is recommended for cases where
     * partition_key is being used and the partition_key may be included within the
     * table. Defaults to truncate
     */
    table_cutoff?: 'truncate' | 'preserve';
  }
}

export declare namespace Split {
  export {
    type SplitRunJobResponse as SplitRunJobResponse,
    type SplitRunParams as SplitRunParams,
    type SplitRunJobParams as SplitRunJobParams,
  };
}
