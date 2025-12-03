// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';

export interface AdvancedCitationsConfig {
  /**
   * If True, enable numeric citation confidence scores. Defaults to False.
   */
  numerical_confidence?: boolean;
}

export interface AdvancedProcessingOptions {
  /**
   * If True, add page markers to the output (e.g. [[PAGE 1 BEGINS HERE]] and
   * [[PAGE 1 ENDS HERE]] added as blocks to the content). Defaults to False.
   */
  add_page_markers?: boolean;

  /**
   * A flag to indicate if the hierarchy of the document should be continued from
   * chunk to chunk.
   */
  continue_hierarchy?: boolean;

  /**
   * Password to decrypt password-protected documents.
   */
  document_password?: string;

  /**
   * Enables model-based detection of underlines and strikethroughs, adding <u>/<s>
   * tags to OCR text. Works with any extraction mode. Defaults to False.
   */
  enable_change_tracking?: boolean;

  /**
   * If True, enable highlight detection. Highlighted text will be surrounded by
   * <mark> tags in the output. Defaults to False.
   */
  enable_highlight_detection?: boolean;

  /**
   * Skip hidden rows and cols in Excel files. Defaults to False.
   */
  exclude_hidden_rows_cols?: boolean;

  /**
   * Skip hidden sheets in Excel files. Defaults to False.
   */
  exclude_hidden_sheets?: boolean;

  /**
   * If True, filter out line numbers from the output. Defaults to False.
   */
  filter_line_numbers?: boolean;

  /**
   * Force the URL to be downloaded as a specific file extension (e.g. .png).
   */
  force_file_extension?: string;

  /**
   * If True, preserve Excel cell colours in the extracted spreadsheet text using
   * LaTeX colour commands.
   */
  include_color_information?: boolean;

  /**
   * If True, preserve formula information in spreadsheet cells by wrapping text with
   * LaTeX formula commands during parsing.
   */
  include_formula_information?: boolean;

  /**
   * If line breaks should be preserved in the text.
   */
  keep_line_breaks?: boolean;

  /**
   * The configuration options for large table chunking (currently only supported on
   * spreadsheet and CSV files).
   */
  large_table_chunking?: LargeTableChunkingConfig;

  /**
   * A flag to indicate if consecutive tables with the same number of columns should
   * be merged across breaks and spaces.
   */
  merge_tables?: boolean;

  /**
   * The OCR system to use. Highres is recommended for documents with English
   * characters. Legacy uses an alternative OCR backend.
   */
  ocr_system?: 'highres' | 'multilingual' | 'combined' | 'reducto' | 'legacy';

  /**
   * The page range to process (1-indexed). By default, the entire document is
   * processed.
   */
  page_range?: PageRange | Array<PageRange> | Array<number>;

  /**
   * If True, persist the results indefinitely. Defaults to False.
   */
  persist_results?: boolean;

  /**
   * If True, pull in PDF comments from the document. Defaults to False.
   */
  read_comments?: boolean;

  /**
   * If True, remove text formatting from the output (e.g. hyphens for list items).
   * Defaults to False.
   */
  remove_text_formatting?: boolean;

  /**
   * If True, return OCR data in the result. Defaults to False.
   */
  return_ocr_data?: boolean;

  /**
   * In a spreadsheet with different tables inside, we enable splitting up the tables
   * by default. Intelligent mode applies more powerful models for superior accuracy,
   * at 5× the default per-cell rate. Disabling will register as one large table.
   */
  spreadsheet_table_clustering?: 'default' | 'disabled' | 'intelligent';

  /**
   * The mode to use for table output. Dynamic returns md for simpler tables and html
   * for more complex tables.
   */
  table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'ai_json' | 'csv';
}

export interface ArrayExtractConfig {
  /**
   * Array extraction allows you to extract long lists of information from lengthy
   * documents. It makes parallel calls on overlapping sections of the document.
   */
  enabled?: boolean;

  /**
   * The array extraction version to use.
   */
  mode?: 'auto' | 'legacy' | 'streaming' | 'no_overlap';

  /**
   * Length of each segment, in pages, for parallel calls with array extraction.
   */
  pages_per_segment?: number;

  /**
   * Number of items to extract in each stream call. Lower numbers will increase
   * quality but be much slower. 50 works well for most documents with tables.
   */
  streaming_extract_item_density?: number;
}

export interface BaseProcessingOptions {
  /**
   * The configuration options for chunking. Chunking is commonly used for RAG
   * usecases.
   */
  chunking?: ChunkingConfig;

  /**
   * The mode to use for extraction. Metadata/hybrid are only recommended with high
   * quality metadata embeddings.
   */
  extraction_mode?: 'ocr' | 'metadata' | 'hybrid';

  /**
   * The configuration options for figure summarization.
   */
  figure_summary?: FigureSummaryConfig;

  /**
   * A list of block types to filter from chunk content. Pass blocks to filter them
   * from content. By default, no blocks are filtered.
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

  /**
   * Force the result to be returned in URL form (by default only used for very large
   * responses).
   */
  force_url_result?: boolean;

  /**
   * The mode to use for OCR. Agentic mode adds an extra pass, correcting any
   * table/text mistakes at a small cost.
   */
  ocr_mode?: 'standard' | 'agentic';

  /**
   * The configuration options for table summarization.
   */
  table_summary?: TableSummaryConfig;
}

export interface BoundingBox {
  height: number;

  left: number;

  /**
   * The page number of the bounding box (1-indexed).
   */
  page: number;

  top: number;

  width: number;

  /**
   * The page number in the original document of the bounding box (1-indexed).
   */
  original_page?: number;
}

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

export interface ChunkingConfig {
  /**
   * Choose how to partition chunks. Variable mode chunks by character length and
   * visual context. Section mode chunks by section headers. Page mode chunks
   * according to pages. Page sections mode chunks first by page, then by sections
   * within each page. Disabled returns one single chunk.
   */
  chunk_mode?: 'variable' | 'section' | 'page' | 'block' | 'disabled' | 'page_sections';

  /**
   * The approximate size of chunks (in characters) that the document will be split
   * into. Defaults to None, in which case the chunk size is variable between 250 -
   * 1500 characters.
   */
  chunk_size?: number;
}

export interface ConfigV3AsyncConfig {
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
  webhook?: SvixWebhookConfig | DirectWebhookConfig | null;
}

export interface DirectWebhookConfig {
  url: string;

  mode?: 'direct';
}

export interface EditResponse {
  /**
   * Presigned URL to download the edited document.
   */
  document_url: string;

  /**
   * Form schema for PDF forms. List of widgets with their types, descriptions, and
   * bounding boxes.
   */
  form_schema?: Array<EditResponse.FormSchema> | null;

  /**
   * Usage information for the edit operation, including number of pages and credits
   * charged.
   */
  usage?: ParseUsage | null;
}

export namespace EditResponse {
  export interface FormSchema {
    /**
     * Bounding box coordinates of the widget
     */
    bbox: Shared.BoundingBox;

    /**
     * Description of the widget extracted from the document
     */
    description: string;

    /**
     * Type of the form widget
     */
    type: 'text' | 'checkbox' | 'dropdown' | 'barcode';

    /**
     * If True (default), the system will attempt to fill this widget. If False, the
     * widget will be created but intentionally left unfilled.
     */
    fill?: boolean;

    /**
     * If provided, this value will be used directly instead of attempting to
     * intelligently determine the field value.
     */
    value?: string | null;
  }
}

export interface Enhance {
  /**
   * Agentic uses vision language models to enhance the accuracy of the output of
   * different types of extraction. This will incur a cost and latency increase.
   */
  agentic?: Array<TableAgentic | FigureAgentic | TextAgentic>;

  /**
   * If True, summarize figures using a small vision language model. Defaults to
   * True.
   */
  summarize_figures?: boolean;
}

export interface EnrichConfig {
  /**
   * If enabled, a large language/vision model will be used to postprocess the
   * extracted content. Note: enabling enrich requires tables be outputted in
   * markdown format. Defaults to False.
   */
  enabled?: boolean;

  /**
   * The mode to use for enrichment. Defaults to standard
   */
  mode?: 'standard' | 'page' | 'table';

  /**
   * Add information to the prompt for enrichment.
   */
  prompt?: string;
}

export interface ExperimentalProcessingOptions {
  /**
   * If True, split table blocks into smaller chunks based on the specified chunk
   * size in the chunking option. Defaults to False.
   */
  chunk_table_blocks?: boolean;

  /**
   * You probably shouldn't use this. If True, filter out boxes with width greater
   * than 50% of the document width. Defaults to False. You probably don't want to
   * use this.
   */
  danger_filter_wide_boxes?: boolean;

  /**
   * If True, detect signatures in the document. Defaults to False.
   */
  detect_signatures?: boolean;

  /**
   * If extracted OCR text metadata should be embedded back into the returned PDF,
   * overwriting any existing text. Defaults to False.
   */
  embed_text_metadata_pdf?: boolean;

  /**
   * Use an experimental checkbox detection model to add checkboxes to the output,
   * defaults to False
   */
  enable_checkboxes?: boolean;

  /**
   * Use an experimental equation detection model to add equations to the output,
   * defaults to False
   */
  enable_equations?: boolean;

  /**
   * Add <sub> tag around subscripts and <sup> tag around superscripts, defaults to
   * False
   */
  enable_scripts?: boolean;

  /**
   * The configuration options for enrichment.
   */
  enrich?: EnrichConfig;

  /**
   * Layout enrichment is a beta feature that improves our layout and reading order
   * performance at the cost of increased latency. Defaults to False.
   */
  layout_enrichment?: boolean;

  /**
   * The layout model to use for the document. This will be deprecated in the future.
   */
  layout_model?: 'default' | 'beta';

  /**
   * Instead of using LibreOffice, when enabled, this flag uses a Windows VM to
   * convert files. This is slower but more accurate.
   */
  native_office_conversion?: boolean;

  /**
   * If figure images should be returned in the result. Defaults to False.
   */
  return_figure_images?: boolean;

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
   * Use an orientation model to detect and rotate pages as needed, defaults to True
   */
  rotate_pages?: boolean;

  /**
   * A user specified timeout, defaults to None
   */
  user_specified_timeout_seconds?: number | null;

  [k: string]: unknown;
}

export interface ExtractResponse {
  /**
   * The citations corresponding to the extracted response.
   */
  citations: Array<unknown> | null;

  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disable_chunking is True (default), then it will be a list of length one.
   */
  result: Array<unknown>;

  usage: ExtractUsage;

  job_id?: string | null;

  /**
   * The link to the studio pipeline for the document.
   */
  studio_link?: string | null;
}

export interface ExtractUsage {
  num_fields: number;

  num_pages: number;

  credits?: number | null;
}

export interface FigureAgentic {
  scope: 'figure';

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

export interface FigureSummaryConfig {
  /**
   * If figure summarization should be performed.
   */
  enabled?: boolean;

  /**
   * If the figure summary prompt should override our default prompt.
   */
  override?: boolean;

  /**
   * Add information to the prompt for figure summarization. Note any visual cues
   * that should be incorporated. Example: 'When provided a diagram, extract all of
   * the figure content verbatim.'
   */
  prompt?: string;
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
  include?: Array<'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures'>;

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

export interface LargeTableChunkingConfig {
  /**
   * If large tables should be chunked into smaller tables, currently only supported
   * on spreadsheet and CSV files.
   */
  enabled?: boolean;

  /**
   * The max row/column size for a table to be chunked. Defaults to 50. Header
   * rows/columns are persisted based on heuristics.
   */
  size?: number;
}

export interface PageRange {
  /**
   * The page number to stop processing at (1-indexed).
   */
  end?: number | null;

  /**
   * The page number to start processing from (1-indexed).
   */
  start?: number | null;
}

export interface ParseOptions {
  enhance?: Enhance;

  formatting?: Formatting;

  retrieval?: Retrieval;

  settings?: Settings;

  spreadsheet?: Spreadsheet;
}

export interface ParseResponse {
  /**
   * The duration of the parse request in seconds.
   */
  duration: number;

  job_id: string;

  /**
   * The response from the document processing service. Note that there can be two
   * types of responses, Full Result and URL Result. This is due to limitations on
   * the max return size on HTTPS. If the response is too large, it will be returned
   * as a presigned URL in the URL response. You should handle this in your
   * application.
   */
  result: ParseResponse.FullResult | ParseResponse.URLResult;

  usage: ParseUsage;

  /**
   * The storage URL of the converted PDF file.
   */
  pdf_url?: string | null;

  /**
   * The link to the studio pipeline for the document.
   */
  studio_link?: string | null;
}

export namespace ParseResponse {
  export interface FullResult {
    chunks: Array<FullResult.Chunk>;

    /**
     * type = 'full'
     */
    type: 'full';

    custom?: unknown;

    ocr?: FullResult.Ocr | null;
  }

  export namespace FullResult {
    export interface Chunk {
      blocks: Array<Chunk.Block>;

      /**
       * The content of the chunk extracted from the document.
       */
      content: string;

      /**
       * Chunk content optimized for embedding and retrieval.
       */
      embed: string;

      /**
       * The enriched content of the chunk extracted from the document.
       */
      enriched: string | null;

      /**
       * Whether the enrichment was successful.
       */
      enrichment_success?: boolean;
    }

    export namespace Chunk {
      export interface Block {
        /**
         * The bounding box of the block extracted from the document.
         */
        bbox: Shared.BoundingBox;

        /**
         * The content of the block extracted from the document.
         */
        content: string;

        /**
         * The type of block extracted from the document.
         */
        type:
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
          | 'Signature';

        /**
         * (Experimental) The URL/link to chart data JSON for figure blocks processed by
         * chart agent.
         */
        chart_data?: Array<string> | null;

        /**
         * The confidence for the block. It is either low or high and takes into account
         * factors like OCR and table structure
         */
        confidence?: string | null;

        /**
         * Granular confidence scores for the block. It is a dictionary of confidence
         * scores for the block. The confidence scores will not be None if the user has
         * enabled numeric confidence scores.
         */
        granular_confidence?: Block.GranularConfidence | null;

        /**
         * (Experimental) The URL of the image associated with the block.
         */
        image_url?: string | null;
      }

      export namespace Block {
        /**
         * Granular confidence scores for the block. It is a dictionary of confidence
         * scores for the block. The confidence scores will not be None if the user has
         * enabled numeric confidence scores.
         */
        export interface GranularConfidence {
          extract_confidence?: number | null;

          parse_confidence?: number | null;
        }
      }
    }

    export interface Ocr {
      lines: Array<Ocr.Line>;

      words: Array<Ocr.Word>;
    }

    export namespace Ocr {
      export interface Line {
        bbox: Shared.BoundingBox;

        text: string;

        /**
         * The index of the chunk that the line belongs to.
         */
        chunk_index?: number | null;

        /**
         * OCR confidence score between 0 and 1, where 1 indicates highest confidence
         */
        confidence?: number | null;

        /**
         * The rotation angle in degrees, from 0 to 360, counterclockwise.
         */
        rotation?: number | null;
      }

      export interface Word {
        bbox: Shared.BoundingBox;

        text: string;

        /**
         * The index of the chunk that the word belongs to.
         */
        chunk_index?: number | null;

        /**
         * OCR confidence score between 0 and 1, where 1 indicates highest confidence
         */
        confidence?: number | null;

        /**
         * The rotation angle in degrees, from 0 to 360, counterclockwise.
         */
        rotation?: number | null;
      }
    }
  }

  export interface URLResult {
    result_id: string;

    /**
     * type = 'url'
     */
    type: 'url';

    url: string;
  }
}

export interface ParseUsage {
  num_pages: number;

  credits?: number | null;
}

export interface PipelineResponse {
  job_id: string;

  result: PipelineResponse.Result;

  usage: ParseUsage;
}

export namespace PipelineResponse {
  export interface Result {
    extract: Array<Result.UnionMember0> | Shared.ExtractResponse | Shared.V3ExtractResponse | null;

    parse: Shared.ParseResponse | null;

    split: Shared.SplitResponse | null;

    edit?: Shared.EditResponse | null;
  }

  export namespace Result {
    /**
     * This is the response format for Extract -> Split Pipelines
     */
    export interface UnionMember0 {
      page_range: Array<number>;

      result: Shared.ExtractResponse | Shared.V3ExtractResponse;

      split_name: string;

      partition?: string | null;
    }
  }
}

export interface Retrieval {
  chunking?: Chunking;

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
  page_range?: PageRange | Array<PageRange> | Array<number> | null;

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
   * The timeout for the job in seconds.
   */
  timeout?: number | null;
}

export interface SplitCategory {
  description: string;

  name: string;

  partition_key?: string | null;
}

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

export interface SplitResponse {
  /**
   * The split result.
   */
  result: SplitResponse.Result;

  usage: ParseUsage;
}

export namespace SplitResponse {
  /**
   * The split result.
   */
  export interface Result {
    section_mapping: { [key: string]: Array<number> } | null;

    splits: Array<Result.Split>;
  }

  export namespace Result {
    export interface Split {
      name: string;

      pages: Array<number>;

      conf?: 'high' | 'low';

      partitions?: Array<Split.Partition> | null;
    }

    export namespace Split {
      export interface Partition {
        name: string;

        pages: Array<number>;

        conf?: 'high' | 'low';
      }
    }
  }
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
   * Whether to include cell color and formula information in the output.
   */
  include?: Array<'cell_colors' | 'formula'>;

  split_large_tables?: SplitLargeTables;
}

export interface SvixWebhookConfig {
  /**
   * A list of Svix channels the message will be delivered down, omit to send to all
   * channels.
   */
  channels?: Array<string>;

  mode?: 'svix';
}

export interface TableAgentic {
  scope: 'table';

  /**
   * Custom prompt for table agentic.
   */
  prompt?: string | null;
}

export interface TableSummaryConfig {
  /**
   * If table summarization should be performed.
   */
  enabled?: boolean;

  /**
   * Add information to the prompt for table summarization.
   */
  prompt?: string;
}

export interface TextAgentic {
  scope: 'text';

  /**
   * Custom instructions for agentic text. Note: This only applies to form regions
   * (key-value).
   */
  prompt?: string | null;
}

export interface Upload {
  file_id: string;

  presigned_url?: string | null;
}

export interface V3ExtractResponse {
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

export interface WebhookConfigNew {
  /**
   * A list of Svix channels the message will be delivered down, omit to send to all
   * channels.
   */
  channels?: Array<string>;

  /**
   * JSON metadata included in webhook request body
   */
  metadata?: unknown;

  /**
   * The mode to use for webhook delivery. Defaults to 'disabled'. We recommend using
   * 'svix' for production environments.
   */
  mode?: 'disabled' | 'svix' | 'direct';

  /**
   * The URL to send the webhook to (if using direct webhoook).
   */
  url?: string;
}
