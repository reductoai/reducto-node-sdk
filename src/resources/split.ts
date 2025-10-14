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
   * The URL of the document to be processed. You can provide one of the
   * following: 1. A publicly available URL 2. A presigned S3 URL 3. A reducto://
   * prefixed URL obtained from the /upload endpoint after directly uploading a
   * document 4. A jobid:// prefixed URL obtained from a previous /parse invocation
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
  parsing?: SplitRunParams.Parsing;

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
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  export interface Parsing {
    enhance?: Parsing.Enhance;

    formatting?: Parsing.Formatting;

    retrieval?: Parsing.Retrieval;

    settings?: Parsing.Settings;

    spreadsheet?: Parsing.Spreadsheet;
  }

  export namespace Parsing {
    export interface Enhance {
      /**
       * Agentic uses vision language models to enhance the accuracy of the output of
       * different types of extraction. This will incur a cost and latency increase.
       */
      agentic?: Array<Enhance.TableAgentic | Enhance.FigureAgentic | Enhance.TextAgentic>;

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
         * Custom prompt for figure agentic.
         */
        prompt?: string | null;
      }

      export interface TextAgentic {
        scope: 'text';
      }
    }

    export interface Formatting {
      /**
       * If True, add page markers to the output. Defaults to False. Useful for
       * extracting data with page specific information.
       */
      add_page_markers?: boolean;

      /**
       * A list of formatting to include in the output. [insert description of each
       * option here later]
       */
      include?: Array<'change_tracking' | 'highlight' | 'comments'>;

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
       * processed.
       */
      page_range?: Shared.PageRange | Array<Shared.PageRange> | Array<number> | null;

      /**
       * If True, persist the results indefinitely. Defaults to False.
       */
      persist_results?: boolean;

      /**
       * Whether to return images for the specified block types. By default, no images
       * are returned.
       */
      return_images?: Array<'figure' | 'table'>;

      /**
       * If True, return OCR data in the result. Defaults to False.
       */
      return_ocr_data?: boolean;

      /**
       * The timeout for the job in seconds. Defaults to 900.
       */
      timeout?: number;
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
      exclude?: Array<'hidden_sheets' | 'hidden_rows' | 'hidden_cols'>;

      /**
       * Whether to include cell color and formula information in the output.
       */
      include?: Array<'cell_colors' | 'formula'>;

      split_large_tables?: Spreadsheet.SplitLargeTables;
    }

    export namespace Spreadsheet {
      export interface SplitLargeTables {
        /**
         * If True, split large tables into smaller tables. Defaults to True.
         */
        enabled?: boolean;

        /**
         * The size of the tables to split into. Defaults to 50.
         */
        size?: number;
      }
    }
  }

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

export type SplitRunJobParams = unknown;

export declare namespace Split {
  export {
    type SplitRunJobResponse as SplitRunJobResponse,
    type SplitRunParams as SplitRunParams,
    type SplitRunJobParams as SplitRunJobParams,
  };
}
