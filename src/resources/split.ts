// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ExtractAPI from './extract';
import * as ParseAPI from './parse';
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
  runJob(body: SplitRunJobParams, options?: Core.RequestOptions): Core.APIPromise<Shared.AsyncSplitResponse> {
    return this._client.post('/split_async', { body, ...options });
  }
}

export interface DeepSplitPageEvidence {
  evidence: string;

  page_number: number;

  confidence?: 'high' | 'medium' | 'low' | null;
}

export interface ParseUsage {
  num_pages: number;

  credit_breakdown?: { [key: string]: number } | null;

  credits?: number | null;

  /**
   * Per-page breakdown of features used. Maps 1-indexed page numbers (as strings) to
   * the list of billing features applied on that page (e.g. 'page', 'complex',
   * 'chart_agent').
   */
  page_billing_breakdown?: {
    [key: string]: Array<
      'page' | 'html_page' | 'docx_native_page' | 'agentic' | 'complex' | 'chart_agent' | 'spreadsheet_cells'
    >;
  } | null;
}

export interface SplitCategory {
  description: string;

  name: string;

  partition_key?: string | null;
}

export interface SplitTableOptions {
  /**
   * If True, a page can belong to multiple categories/partitions. If False, each
   * page must belong to exactly one category. Defaults to True.
   */
  allow_page_overlap?: boolean;

  /**
   * If tables should be truncated to the first few rows or if all content should be
   * preserved. truncate improves latency, preserve is recommended for cases where
   * partition_key is being used and the partition_key may be included within the
   * table. Defaults to truncate
   */
  table_cutoff?: 'truncate' | 'preserve';
}

export interface SplitRunParams {
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
   * The configuration options for processing the document.
   */
  split_description: Array<SplitCategory>;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: ExtractAPI.ParseOptions;

  /**
   * The settings for split processing.
   */
  settings?: SplitTableOptions;

  /**
   * The prompt that describes rules for splitting the document.
   */
  split_rules?: string;
}

export interface SplitRunJobParams {
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
   * The configuration options for processing the document.
   */
  split_description: Array<SplitCategory>;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: ParseAPI.AsyncConfigV3;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: ExtractAPI.ParseOptions;

  /**
   * The settings for split processing.
   */
  settings?: SplitTableOptions;

  /**
   * The prompt that describes rules for splitting the document.
   */
  split_rules?: string;
}

export declare namespace Split {
  export {
    type DeepSplitPageEvidence as DeepSplitPageEvidence,
    type ParseUsage as ParseUsage,
    type SplitCategory as SplitCategory,
    type SplitTableOptions as SplitTableOptions,
    type SplitRunParams as SplitRunParams,
    type SplitRunJobParams as SplitRunJobParams,
  };
}
