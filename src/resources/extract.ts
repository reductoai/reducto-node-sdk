// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
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
  runJob(body: ExtractRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ExtractRunJobResponse> {
    return this._client.post('/extract_async', { body, ...options });
  }
}

export type ExtractRunResponse = Shared.ExtractResponse | ExtractRunResponse.V3ExtractResponse;

export namespace ExtractRunResponse {
  export interface V3ExtractResponse {
    /**
     * The extracted response in your provided schema. This is a list of dictionaries.
     * If disable_chunking is True (default), then it will be a list of length one.
     */
    result: unknown | Array<unknown>;

    usage: V3ExtractResponse.Usage;

    job_id?: string | null;

    /**
     * The link to the studio pipeline for the document.
     */
    studio_link?: string | null;
  }

  export namespace V3ExtractResponse {
    export interface Usage {
      num_fields: number;

      num_pages: number;

      credits?: number | null;
    }
  }
}

export interface ExtractRunJobResponse {
  job_id: string;
}

export type ExtractRunParams =
  | ExtractRunParams.ExtractConfig
  | ExtractRunParams.ExtractConfig
  | ExtractRunParams.SyncExtractConfig;

export declare namespace ExtractRunParams {
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

  export interface ExtractConfig {
    document_url: string | Array<string>;

    /**
     * The JSON schema to use for extraction.
     */
    schema: unknown;

    /**
     * If agent extraction should be used for extraction.
     */
    agent_extract?: boolean;

    alpha_big_extraction_model?: boolean;

    alpha_deep_extract?: boolean;

    alpha_table_citations?: boolean;

    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    async?: ExtractConfig.Async;

    include_images?: boolean;

    /**
     * If True, the job will be processed with lower latency and higher priority. Uses
     * 2x the cost of a regular job. Defaults to False.
     */
    latency_sensitive?: boolean;

    /**
     * The normalized JSON schema to use for extraction.
     */
    normalized_schema?: unknown;

    /**
     * The configuration options for extraction.
     */
    options?: ExtractConfig.Options;

    /**
     * The configuration options for extraction.
     */
    parse_config?: ExtractConfig.ParseConfig;

    /**
     * If True, attempts to process the job with priority if the user has priority
     * processing budget available; by default, sync jobs are prioritized above async
     * jobs.
     */
    priority?: boolean;

    /**
     * A system prompt to use for the extraction. This is a general prompt that is
     * applied to the entire document before any other prompts.
     */
    system_prompt?: string;

    /**
     * User-specific configuration options.
     */
    user_config?: { [key: string]: unknown };
  }

  export namespace ExtractConfig {
    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    export interface Async {
      enabled?: boolean;

      priority?: boolean;

      webhook?: Async.Webhook;
    }

    export namespace Async {
      export interface Webhook {
        /**
         * A list of Svix channels the message will be delivered down, omit to send to all
         * channels.
         */
        channels?: Array<string>;

        metadata?: unknown;

        mode?: 'direct' | 'svix';

        url?: string | null;
      }
    }

    /**
     * The configuration options for extraction.
     */
    export interface Options {
      /**
       * Array extraction allows you to extract long lists of information from lengthy
       * documents. It makes parallel calls on overlapping sections of the document.
       */
      array_extract?: boolean;

      /**
       * Length of each segment, in pages, for parallel calls with array extraction.
       */
      array_extract_pages?: number;

      /**
       * If table citations should be generated for the extracted content.
       */
      experimental_table_citations?: boolean;

      /**
       * The array extraction version to use.
       */
      extract_algorithm?: 'auto' | 'legacy' | 'streaming' | 'no_overlap';

      /**
       * If citations should be generated for the extracted content.
       */
      generate_citations?: boolean;

      /**
       * If True, enable numeric citation confidence scores. Defaults to False.
       */
      numerical_confidence?: boolean;

      /**
       * If spreadsheet agent should be used for extraction.
       */
      spreadsheet_agent?: boolean;

      /**
       * Number of items to extract in each stream call.
       */
      streaming_extract_item_density?: number;
    }

    /**
     * The configuration options for extraction.
     */
    export interface ParseConfig {
      /**
       * If True, add page markers to the output. Defaults to False.
       */
      add_page_markers?: boolean;

      /**
       * If enabled, a large language/vision model will be used to postprocess the layout
       * predictions. Defaults to False.
       */
      beta_layout_enrichment?: boolean;

      /**
       * The name of the bucket to use for the document.
       */
      bucket_name?: string;

      /**
       * A flag to indicate if bar chart extraction should be performed (requires
       * figure_summary=True). Defaults to False.
       */
      chart_extract?: boolean;

      /**
       * The mode to use for chunking. Defaults to 'variable'. Section chunks according
       * to sections in the document. Page chunks according to pages. Page sections
       * chunks according to both pages and sections. Disabled returns a single chunk.
       */
      chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections';

      /**
       * The approximate size of chunks (in characters) that the document will be split
       * into. Defaults to None, in which case the chunk size is variable between 250 -
       * 1500 characters.
       */
      chunk_size?: number;

      /**
       * A flag to indicate if the hierarchy of the document should be continued from
       * chunk to chunk. E.g. ## Prev Section (cont.)
       */
      continue_hierarchy?: boolean;

      custom_format?: 'aml' | 'ai_usage';

      /**
       * Override the customer ID for the request. Defaults to None.
       */
      customer_id?: string;

      /**
       * If True, filter out boxes with width greater than 50% of the document width.
       * Defaults to False. You probably don't want to use this.
       */
      danger_filter_wide_boxes?: boolean;

      /**
       * If True, detect signatures in the document. Defaults to False.
       */
      detect_signatures?: boolean;

      /**
       * DEPRECATED, use chunk_mode=disabled instead
       */
      disable_chunking?: boolean;

      /**
       * Password to decrypt password-protected documents.
       */
      document_password?: string;

      /**
       * The dots per inch (DPI) setting for image processing. Higher values increase
       * resolution but increase latency. The maximum recommended value is 300.
       */
      dpi?: number;

      /**
       * If True, embed text metadata into the returned PDF. Defaults to False.
       */
      embed_text_metadata_pdf?: boolean;

      /**
       * Add <u> tag around text that's underlined and surround strikethroughs and
       * underlines with <change> tags, defaults to False
       */
      enable_change_tracking?: boolean;

      /**
       * Pull PDF comments from the document, defaults to False
       */
      enable_comments?: boolean;

      /**
       * Add <mark> tags around highlighted text detected using the segmentation model,
       * defaults to False
       */
      enable_highlight_detection?: boolean;

      /**
       * Add <sub> tag around subscripts and <sup> tag around superscripts, defaults to
       * False
       */
      enable_scripts?: boolean;

      /**
       * Instead of using LibreOffice, when enabled, this flag uses a Windows VM to
       * convert docx files. This is slower but more accurate.
       */
      enhanced_docx_conversion?: boolean;

      /**
       * If True, use enhanced figure summarization pipeline for complex charts. Defaults
       * to False.
       */
      enhanced_figure_summary?: boolean;

      /**
       * If enabled, a large language/vision model will be used to postprocess the
       * extracted content. Defaults to False.
       */
      enrich?: boolean;

      /**
       * The mode to use for enrichment. Defaults to standard
       */
      enrich_mode?: 'standard' | 'page' | 'table';

      /**
       * Add information to the prompt for enrichment.
       */
      enrich_prompt?: string;

      /**
       * Skip hidden rows and cols in Excel files. Defaults to False.
       */
      exclude_hidden_rows_cols?: boolean;

      /**
       * Skip hidden sheets in Excel files. Defaults to False.
       */
      exclude_hidden_sheets?: boolean;

      /**
       * Note, this is an alpha feature subject to change at any time. If enabled, large
       * tables will be chunked into multiple tables. Defaults to False.
       */
      experimental_large_spreadsheet_table_chunking?: boolean;

      /**
       * Extra metadata to be added to logs.
       */
      extra_metadata?: { [key: string]: unknown };

      /**
       * A flag to indicate if figure summarization should be performed. Defaults to
       * False.
       */
      figure_summary?: boolean;

      /**
       * If the figure summary prompt should override our default prompt.
       */
      figure_summary_override?: boolean;

      /**
       * Add information to the prompt for figure summarization.
       */
      figure_summary_prompt?: string;

      /**
       * If True, filter out line numbers from the output. Defaults to False.
       */
      filter_line_numbers?: boolean;

      /**
       * Force the URL to be downloaded as a specific file extension (e.g. `.png`).
       */
      force_file_extension?: string | null;

      /**
       * Force the result to be returned in URL form.
       */
      force_url_result?: boolean;

      /**
       * A list of block types to ignore. Defaults to ['Page Number', 'Header', 'Footer',
       * 'Comment'].
       */
      ignore_blocks?: Array<
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

      /**
       * If True, preserve color information in spreadsheet cells by wrapping text with
       * LaTeX color commands during parsing.
       */
      include_color_information?: boolean;

      /**
       * If True, preserve formula information in spreadsheet cells by wrapping text with
       * LaTeX formula commands during parsing.
       */
      include_formula_information?: boolean;

      /**
       * If table cell colors should be used to determine table structure. Defaults to
       * False.
       */
      infer_table_color?: boolean;

      /**
       * If True, include bounding box information in JSON table output. Defaults to
       * False.
       */
      json_bbox?: boolean;

      /**
       * If line breaks should be preserved in the text. Defaults to False.
       */
      keep_line_breaks?: boolean;

      /**
       * The AWS KMS key to use for the document.
       */
      kms_arn?: string;

      /**
       * If large tables should be chunked into smaller tables, currently only supported
       * on spreadsheet and CSV files.
       */
      large_table_chunking?: boolean;

      /**
       * The max row/column size for a table to be chunked. Defaults to 50.
       */
      large_table_chunking_size?: number;

      /**
       * The layout model to use for the document. This will be deprecated in the future.
       */
      layout_model?: 'default' | 'beta';

      /**
       * The maximum number of pages to process in a single batch. Defaults to 10.
       */
      max_batch_size?: number;

      /**
       * A flag to indicate if consecutive tables with the same number of columns should
       * be merged. Defaults to False.
       */
      merge_tables?: boolean;

      /**
       * The type of document to be processed. Defaults to document. If auto is
       * specified, the orientation of the first page will be used to determine the
       * document type.
       */
      mode?: 'document' | 'deck' | 'auto';

      /**
       * The dimension of the OCR crops along each axis. num_ocr_crops^2 is the total
       * number of crops. Defaults to 2.
       */
      num_ocr_crops?: number;

      /**
       * If True, enable numeric parse confidence scores in granular_confidence field.
       * Defaults to False.
       */
      numerical_parse_confidence?: boolean;

      /**
       * The mode to use for OCR. If agentic is enabled, table OCR will be automatically
       * edited.
       */
      ocr_mode?: 'standard' | 'agentic';

      /**
       * The OCR system to use. Defaults to cloud (AWS Textract/Azure DocAI/etc).
       */
      ocr_system?: 'gcloud' | 'textract' | 'tesseract' | 'combined';

      /**
       * The threshold for box overlap. Defaults to 0.5.
       */
      overlap_threshold?: number;

      /**
       * The page number to stop processing at.
       */
      page_end?: number;

      /**
       * The page range to process.
       */
      page_range?: Shared.PageRange | Array<Shared.PageRange> | Array<number>;

      /**
       * The page number to start processing from.
       */
      page_start?: number;

      /**
       * The method to use for OCR. hybrid uses the PDF text first, then OCR. pdf only
       * uses the PDF text. ocr only uses OCR.
       */
      pdf_ocr?: 'hybrid' | 'pdf' | 'ocr';

      /**
       * If True, persist the results indefinitely. Defaults to False.
       */
      persist_results?: boolean;

      /**
       * Forces all external API calls to be routed to specified country/region.
       */
      region_preference?: 'us' | null;

      /**
       * If True, remove text formatting from the output (e.g. hyphens for list items).
       * Defaults to False.
       */
      remove_text_formatting?: boolean;

      /**
       * If figure images should be returned in the result. Defaults to False.
       */
      return_figure_images?: boolean;

      /**
       * If True, return OCR data in the result. Defaults to False.
       */
      return_ocr_data?: boolean;

      /**
       * If table images should be returned in the result. Defaults to False.
       */
      return_table_images?: boolean;

      /**
       * Use an orientation model to detect and rotate figures as needed, defaults to
       * False
       */
      rotate_figures?: boolean;

      /**
       * Use an orientation model to detect and rotate pages as needed, defaults to False
       */
      rotate_pages?: boolean;

      /**
       * On a spreadsheet, the algorithm that is used to split up sheets into multiple
       * tables.
       */
      spreadsheet_table_clustering?: 'default' | 'disabled' | 'intelligent';

      /**
       * If True, enable figure summaries for all figures regardless of size (onprem
       * only). Defaults to False.
       */
      summarize_all_figures?: boolean;

      /**
       * The mode to use for table output. Defaults to html.
       */
      table_output_format?: 'html' | 'json' | 'md' | 'dynamic' | 'ai_json' | 'csv';

      /**
       * If tables should be summarized for embedding. Defaults to True.
       */
      table_summary?: boolean;

      /**
       * Add information to the prompt for table summarization.
       */
      table_summary_prompt?: string;

      /**
       * LEGACY: For sync/on-prem only. The timeout for the job in seconds. Defaults
       * to 1800.
       */
      timeout?: number;

      /**
       * Add checkboxes to the output, defaults to False
       */
      use_checkboxes?: boolean;

      /**
       * Add equations to the output, defaults to False
       */
      use_equations?: boolean;

      /**
       * Use a faster inference model for parsing. Defaults to False.
       */
      use_fast_inference?: boolean;

      /**
       * Use GPU acceleration for OCR processing. Defaults to False.
       */
      use_gpu_ocr?: boolean;

      /**
       * A user specified timeout, defaults to None
       */
      user_specified_timeout_seconds?: number | null;

      /**
       * The version of the processing options.
       */
      version?: 'v1' | 'v2' | 'v3';
    }
  }

  export interface SyncExtractConfig {
    /**
     * The URL of the document to be processed. You can provide one of the
     * following: 1. A publicly available URL 2. A presigned S3 URL 3. A reducto://
     * prefixed URL obtained from the /upload endpoint after directly uploading a
     * document 4. A jobid:// prefixed URL obtained from a previous /parse invocation
     */
    input: string | Shared.Upload;

    /**
     * The instructions to use for the extraction.
     */
    instructions?: SyncExtractConfig.Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: SyncExtractConfig.Parsing;

    /**
     * The settings to use for the extraction.
     */
    settings?: SyncExtractConfig.Settings;
  }

  export namespace SyncExtractConfig {
    /**
     * The instructions to use for the extraction.
     */
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
     * The settings to use for the extraction.
     */
    export interface Settings {
      /**
       * If True, use array extraction.
       */
      array_extract?: boolean;

      /**
       * The citations to use for the extraction.
       */
      citations?: Settings.Citations;

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

    export namespace Settings {
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
  }
}

export type ExtractRunJobParams =
  | ExtractRunJobParams.AsyncExtractConfigNew
  | ExtractRunJobParams.AsyncExtractConfig;

export declare namespace ExtractRunJobParams {
  export interface AsyncExtractConfigNew {
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
    agent_extract?: AsyncExtractConfigNew.AgentExtract;

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

    webhook?: Shared.WebhookConfigNew;
  }

  export namespace AsyncExtractConfigNew {
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

  export interface AsyncExtractConfig {
    /**
     * The URL of the document to be processed. You can provide one of the
     * following: 1. A publicly available URL 2. A presigned S3 URL 3. A reducto://
     * prefixed URL obtained from the /upload endpoint after directly uploading a
     * document 4. A jobid:// prefixed URL obtained from a previous /parse invocation
     */
    input: string | Shared.Upload;

    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    async?: AsyncExtractConfig.Async;

    /**
     * The instructions to use for the extraction.
     */
    instructions?: AsyncExtractConfig.Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: AsyncExtractConfig.Parsing;

    /**
     * The settings to use for the extraction.
     */
    settings?: AsyncExtractConfig.Settings;
  }

  export namespace AsyncExtractConfig {
    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    export interface Async {
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
      webhook?: Async.SvixWebhookConfig | Async.DirectWebhookConfig | null;
    }

    export namespace Async {
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

    /**
     * The instructions to use for the extraction.
     */
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
     * The settings to use for the extraction.
     */
    export interface Settings {
      /**
       * If True, use array extraction.
       */
      array_extract?: boolean;

      /**
       * The citations to use for the extraction.
       */
      citations?: Settings.Citations;

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

    export namespace Settings {
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
  }
}

export declare namespace Extract {
  export {
    type ExtractRunResponse as ExtractRunResponse,
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
