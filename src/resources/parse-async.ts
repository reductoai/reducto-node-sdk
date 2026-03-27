// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ClassifyAPI from './classify';
import * as UploadAPI from './upload';

export class ParseAsync extends APIResource {
  /**
   * Async Parse
   */
  create(body: ParseAsyncCreateParams, options?: Core.RequestOptions): Core.APIPromise<AsyncParseResponse> {
    return this._client.post('/parse_async', { body, ...options });
  }
}

export interface AsyncConfigV3 {
  /**
   * JSON metadata included in webhook request body. Defaults to None.
   */
  metadata?: unknown;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  /**
   * The webhook configuration for the asynchronous processing.
   */
  webhook?: AsyncConfigV3.SvixWebhookConfig | AsyncConfigV3.DirectWebhookConfig | null;
}

export namespace AsyncConfigV3 {
  export interface SvixWebhookConfig {
    /**
     * A list of Svix channels the message will be delivered down, omit to send to all
     * channels.
     */
    channels?: Array<string>;

    mode?: 'svix';
  }

  export interface DirectWebhookConfig {
    url: string;

    mode?: 'direct';
  }
}

export interface AsyncParseConfig {
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
  async?: AsyncConfigV3;

  enhance?: Enhance;

  formatting?: Formatting;

  /**
   * Queue priority. 'batch' for non-urgent work that processes when spare GPU
   * capacity is available.
   */
  queue_priority?: 'auto' | 'batch';

  retrieval?: Retrieval;

  settings?: Settings;

  spreadsheet?: Spreadsheet;
}

export interface AsyncParseResponse {
  job_id: string;
}

export interface Enhance {
  /**
   * Agentic uses vision language models to enhance the accuracy of the output of
   * different types of extraction. This will incur a cost and latency increase.
   */
  agentic?: Array<Enhance.TableAgentic | Enhance.FigureAgentic | Enhance.TextAgentic>;

  /**
   * If True, use an advanced vision language model to improve reading order
   * accuracy, with a small increase in latency. Defaults to False.
   */
  intelligent_ordering?: boolean;

  /**
   * If True, summarize figures using a small vision language model. Defaults to
   * True.
   */
  summarize_figures?: boolean;
}

export namespace Enhance {
  export interface TableAgentic {
    scope: 'table';

    /**
     * Custom prompt for table agentic.
     */
    prompt?: string | null;
  }

  export interface FigureAgentic {
    scope: 'figure';

    /**
     * If True, use the advanced chart agent. Defaults to False.
     */
    advanced_chart_agent?: boolean;

    /**
     * Custom prompt for figure agentic.
     */
    prompt?: string | null;

    /**
     * If True, return overlays for the figure. This is so you can use the overlays to
     * double check the quality of the extraction
     */
    return_overlays?: boolean;
  }

  export interface TextAgentic {
    scope: 'text';

    /**
     * Custom instructions for agentic text. Note: This only applies to form regions
     * (key-value).
     */
    prompt?: string | null;
  }
}

export interface Formatting {
  /**
   * If True, add page markers to the output. Defaults to False. Useful for
   * extracting data with page specific information.
   */
  add_page_markers?: boolean;

  /**
   * A list of formatting to include in the output.
   */
  include?: Array<
    'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'
  >;

  /**
   * A flag to indicate if consecutive tables with the same number of columns should
   * be merged. Defaults to False.
   */
  merge_tables?: boolean;

  /**
   * The mode to use for table output. Defaults to dynamic, which returns md for
   * simpler tables and html for more complex tables.
   */
  table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv';
}

export interface Retrieval {
  chunking?: Retrieval.Chunking;

  /**
   * If True, use embedding optimized mode. Defaults to False.
   */
  embedding_optimized?: boolean;

  /**
   * A list of block types to filter out from 'content' and 'embed' fields. By
   * default, no blocks are filtered.
   */
  filter_blocks?: Array<
    | 'Header'
    | 'Footer'
    | 'Title'
    | 'Section Header'
    | 'Page Number'
    | 'List Item'
    | 'Figure'
    | 'Table'
    | 'Key Value'
    | 'Text'
    | 'Comment'
    | 'Signature'
  >;
}

export namespace Retrieval {
  export interface Chunking {
    /**
     * Choose how to partition chunks. Variable mode chunks by character length and
     * visual context. Section mode chunks by section headers. Page mode chunks
     * according to pages. Page sections mode chunks first by page, then by sections
     * within each page. Disabled returns one single chunk.
     */
    chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections';

    /**
     * Number of characters of overlap to include from adjacent chunks. Defaults to 0.
     */
    chunk_overlap?: number;

    /**
     * The approximate size of chunks (in characters) that the document will be split
     * into. Defaults to null, in which case the chunk size is variable between 250 -
     * 1500 characters.
     */
    chunk_size?: number | null;
  }
}

export interface Settings {
  /**
   * Password to decrypt password-protected documents.
   */
  document_password?: string | null;

  /**
   * If True, embed OCR metadata into the returned PDF. Defaults to False.
   */
  embed_pdf_metadata?: boolean;

  /**
   * The mode to use for text extraction from PDFs. OCR mode uses optical character
   * recognition only. Hybrid mode combines OCR with embedded PDF text for best
   * accuracy (default).
   */
  extraction_mode?: 'ocr' | 'hybrid';

  /**
   * Force the URL to be downloaded as a specific file extension (e.g. `.png`).
   */
  force_file_extension?: string | null;

  /**
   * Force the result to be returned in URL form.
   */
  force_url_result?: boolean;

  /**
   * Standard is our best multilingual OCR system. Legacy only supports germanic
   * languages and is available for backwards compatibility.
   */
  ocr_system?: 'standard' | 'legacy';

  /**
   * The page range to process (1-indexed). By default, the entire document is
   * processed. For spreadsheets, you can also provide a list of sheet names.
   */
  page_range?: ClassifyAPI.PageRange | Array<ClassifyAPI.PageRange> | Array<number> | Array<string> | null;

  /**
   * If True, persist the results indefinitely. Defaults to False.
   */
  persist_results?: boolean;

  /**
   * Whether to return images for the specified block types. 'page' returns full page
   * images. By default, no images are returned.
   */
  return_images?: Array<'figure' | 'table' | 'page'>;

  /**
   * If True, return OCR data in the result. Defaults to False.
   */
  return_ocr_data?: boolean;

  /**
   * The timeout for the job in seconds.
   */
  timeout?: number | null;
}

export interface Spreadsheet {
  /**
   * In a spreadsheet with different tables inside, we enable splitting up the tables
   * by default. Accurate mode applies more powerful models for superior accuracy, at
   * 5× the default per-cell rate. Disabling will register as one large table.
   */
  clustering?: 'accurate' | 'fast' | 'disabled';

  /**
   * Whether to exclude hidden sheets, rows, or columns in the output.
   */
  exclude?: Array<'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'>;

  /**
   * Whether to include cell color, formula, and dropdown information in the output.
   */
  include?: Array<'cell_colors' | 'formula' | 'dropdowns'>;

  split_large_tables?: Spreadsheet.SplitLargeTables;
}

export namespace Spreadsheet {
  export interface SplitLargeTables {
    /**
     * If True, split large tables into smaller tables. Defaults to True.
     */
    enabled?: boolean;

    /**
     * The size of the tables to split into. Defaults to 50. Use 'row' and 'column' to
     * independently specify the number of rows and columns to include when splitting.
     * If you only want to split by rows or columns, set the other value to None.
     */
    size?: number | SplitLargeTables.SplitLargeTableSizes;
  }

  export namespace SplitLargeTables {
    export interface SplitLargeTableSizes {
      /**
       * The number of columns to include in each chunk when splitting large tables. Does
       * not chunk columns if set to None.
       */
      column?: number | null;

      /**
       * The number of rows to include in each chunk when splitting large tables. Does
       * not chunk rows if set to None.
       */
      row?: number | null;
    }
  }
}

export interface ParseAsyncCreateParams {
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
  async?: AsyncConfigV3;

  enhance?: Enhance;

  formatting?: Formatting;

  /**
   * Queue priority. 'batch' for non-urgent work that processes when spare GPU
   * capacity is available.
   */
  queue_priority?: 'auto' | 'batch';

  retrieval?: Retrieval;

  settings?: Settings;

  spreadsheet?: Spreadsheet;
}

export declare namespace ParseAsync {
  export {
    type AsyncConfigV3 as AsyncConfigV3,
    type AsyncParseConfig as AsyncParseConfig,
    type AsyncParseResponse as AsyncParseResponse,
    type Enhance as Enhance,
    type Formatting as Formatting,
    type Retrieval as Retrieval,
    type Settings as Settings,
    type Spreadsheet as Spreadsheet,
    type ParseAsyncCreateParams as ParseAsyncCreateParams,
  };
}
