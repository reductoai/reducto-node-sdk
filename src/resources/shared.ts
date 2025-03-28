// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';

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
   * Force the URL to be downloaded as a specific file extension (e.g. .png).
   */
  force_file_extension?: string;

  /**
   * If line breaks should be preserved in the text.
   */
  keep_line_breaks?: boolean;

  /**
   * The configuration options for large table chunking (currently only supported on
   * spreadsheet and CSV files).
   */
  large_table_chunking?: AdvancedProcessingOptions.LargeTableChunking;

  /**
   * A flag to indicate if consecutive tables with the same number of columns should
   * be merged.
   */
  merge_tables?: boolean;

  /**
   * The OCR system to use. Highres is recommended for documents with English
   * characters.
   */
  ocr_system?: 'highres' | 'multilingual' | 'combined';

  /**
   * The page range to process. By default, the entire document is processed.
   */
  page_range?: PageRange | Array<PageRange>;

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
   * On a spreadsheet, the algorithm that is used to split up sheets into multiple
   * tables.
   */
  spreadsheet_table_clustering?: 'default' | 'disabled';

  /**
   * The mode to use for table output. Dynamic returns md for simpler tables and html
   * for more complex tables.
   */
  table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'ai_json' | 'csv';
}

export namespace AdvancedProcessingOptions {
  /**
   * The configuration options for large table chunking (currently only supported on
   * spreadsheet and CSV files).
   */
  export interface LargeTableChunking {
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
   * The configuration options for chunking.
   */
  chunking?: BaseProcessingOptions.Chunking;

  /**
   * The mode to use for extraction.
   */
  extraction_mode?: 'ocr' | 'metadata' | 'hybrid';

  /**
   * The configuration options for figure summarization.
   */
  figure_summary?: BaseProcessingOptions.FigureSummary;

  /**
   * A list of block types to filter from chunk content.
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
    | 'Discard'
  >;

  /**
   * Force the result to be returned in URL form (by default only used for very large
   * responses).
   */
  force_url_result?: boolean;

  /**
   * The mode to use for OCR. If agentic is enabled, at a small cost table OCR will
   * be automatically edited.
   */
  ocr_mode?: 'standard' | 'agentic';

  /**
   * The configuration options for table summarization.
   */
  table_summary?: BaseProcessingOptions.TableSummary;
}

export namespace BaseProcessingOptions {
  /**
   * The configuration options for chunking.
   */
  export interface Chunking {
    /**
     * The mode to use for chunking. Section chunks according to sections in the
     * document. Page chunks according to pages. Page sections chunks according to both
     * pages and sections. Disabled returns a single chunk.
     */
    chunk_mode?: 'variable' | 'section' | 'page' | 'block' | 'disabled' | 'page_sections';

    /**
     * The approximate size of chunks (in characters) that the document will be split
     * into. Defaults to None, in which case the chunk size is variable between 250 -
     * 1500 characters.
     */
    chunk_size?: number;
  }

  /**
   * The configuration options for figure summarization.
   */
  export interface FigureSummary {
    /**
     * If figure summarization should be performed.
     */
    enabled?: boolean;

    /**
     * If the figure summary prompt should override our default prompt.
     */
    override?: boolean;

    /**
     * Add information to the prompt for figure summarization.
     */
    prompt?: string;
  }

  /**
   * The configuration options for table summarization.
   */
  export interface TableSummary {
    /**
     * If table summarization should be performed.
     */
    enabled?: boolean;

    /**
     * Add information to the prompt for table summarization.
     */
    prompt?: string;
  }
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
  original_page?: number | null;
}

export interface ExperimentalProcessingOptions {
  /**
   * You probably shouldn't use this. If True, filter out boxes with width greater
   * than 50% of the document width. Defaults to False. You probably don't want to
   * use this.
   */
  danger_filter_wide_boxes?: boolean;

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
   * Add <u> tag around text that's underlined and surround strikethroughs and
   * underlines with <change> tags, defaults to False
   */
  enable_underlines?: boolean;

  /**
   * The configuration options for enrichment.
   */
  enrich?: ExperimentalProcessingOptions.Enrich;

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
   * Use an orientation model to detect and rotate pages as needed, defaults to True
   */
  rotate_pages?: boolean;
}

export namespace ExperimentalProcessingOptions {
  /**
   * The configuration options for enrichment.
   */
  export interface Enrich {
    /**
     * If enabled, a large language/vision model will be used to postprocess the
     * extracted content. Note: enabling enrich requires tables be outputted in
     * markdown format. Defaults to False.
     */
    enabled?: boolean;

    /**
     * The mode to use for enrichment. Defaults to standard
     */
    mode?: 'standard' | 'page';

    /**
     * Add information to the prompt for enrichment.
     */
    prompt?: string;
  }
}

export interface ExtractResponse {
  /**
   * The citations corresponding to the extracted response.
   */
  citations: Array<unknown> | null;

  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disbale_chunking is True (default), then it will be a list of length one.
   */
  result: Array<unknown>;

  usage: ExtractResponse.Usage;
}

export namespace ExtractResponse {
  export interface Usage {
    num_fields: number;

    num_pages: number;
  }
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
          | 'Discard';

        /**
         * (Experimental) The URL of the image associated with the block.
         */
        image_url?: string | null;
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
      }

      export interface Word {
        bbox: Shared.BoundingBox;

        text: string;
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
}

export interface SplitCategory {
  description: string;

  name: string;

  partition_key?: string | null;
}

export interface SplitResponse {
  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disbale_chunking is True (default), then it will be a list of length one.
   */
  result: SplitResponse.Result;

  usage: ParseUsage;
}

export namespace SplitResponse {
  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disbale_chunking is True (default), then it will be a list of length one.
   */
  export interface Result {
    section_mapping: Record<string, Array<number>>;
  }
}

export interface Upload {
  file_id: string;

  presigned_url?: string | null;
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
