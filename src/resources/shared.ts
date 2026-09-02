// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import * as EditAPI from './edit';
import * as ExtractAPI from './extract';
import * as SplitAPI from './split';

export interface AsyncEditResponse {
  job_id: string;
}

export interface AsyncExtractResponse {
  job_id: string;
}

export interface AsyncParseResponse {
  job_id: string;
}

export interface AsyncPipelineResponse {
  job_id: string;
}

export interface AsyncSplitResponse {
  job_id: string;
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

/**
 * Response from classify job - returned when polling /job/{job_id}
 */
export interface ClassifyResponse {
  job_id: string;

  result: ClassifyResponse.ClassifyResponseCategory | ClassifyResponse.URLResult;

  /**
   * The duration of the classify request in seconds.
   */
  duration?: number | null;

  /**
   * Additional metadata for the classify response. Contains `grouping` when the
   * request set `category_groups`. Omitted when empty.
   */
  extra_metadata?: { [key: string]: string };

  /**
   * Overall confidence breakdown for classification response.
   */
  response_confidence?: ClassifyResponse.ResponseConfidence | null;

  response_type?: 'classify';

  usage?: ClassifyResponse.Usage | null;
}

export namespace ClassifyResponse {
  export interface ClassifyResponseCategory {
    category: string;
  }

  export interface URLResult {
    result_id: string;

    /**
     * type = 'url'
     */
    type: 'url';

    url: string;
  }

  /**
   * Overall confidence breakdown for classification response.
   */
  export interface ResponseConfidence {
    categories: Array<ResponseConfidence.Category>;
  }

  export namespace ResponseConfidence {
    /**
     * Confidence result for a category.
     */
    export interface Category {
      category: string;

      confidence: number;

      criteria_confidence: Array<Category.CriteriaConfidence>;
    }

    export namespace Category {
      /**
       * Confidence result for a single criterion.
       */
      export interface CriteriaConfidence {
        confidence: 'high' | 'low';

        criterion: string;
      }
    }
  }

  export interface Usage {
    num_categories: number;

    num_pages: number;

    credits?: number | null;

    /**
     * Raw classify quantities for accounts on the new pricing model.
     *
     * `classify_pages` is capped at 5, the same cap that the classify credit
     * computation uses.
     */
    usage_breakdown?: Usage.UsageBreakdown | null;
  }

  export namespace Usage {
    /**
     * Raw classify quantities for accounts on the new pricing model.
     *
     * `classify_pages` is capped at 5, the same cap that the classify credit
     * computation uses.
     */
    export interface UsageBreakdown {
      classify_model: 'Classify' | 'Deep Classify';

      classify_pages?: number;
    }
  }
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
  form_schema?: Array<EditAPI.EditWidget> | null;

  /**
   * The unique identifier for the edit job.
   */
  job_id?: string | null;

  response_type?: 'edit';

  /**
   * Usage information for the edit operation, including number of pages and credits
   * charged.
   */
  usage?: SplitAPI.ParseUsage | null;
}

export interface ExtractResponse {
  /**
   * The citations corresponding to the extracted response. If force_url_result is
   * True and citations are present, this is returned as a URL result.
   */
  citations: Array<unknown> | ExtractResponse.URLResult | null;

  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disable_chunking is True (default), then it will be a list of length one. If
   * force_url_result is True, this is returned as a URL result.
   */
  result: Array<unknown> | ExtractResponse.URLResult;

  usage: ExtractAPI.ExtractUsage;

  job_id?: string | null;

  /**
   * Optional deep extract confidence metadata containing document-level confidence
   * plus a mirrored leaf-level confidence tree.
   */
  response_confidence?: { [key: string]: unknown } | null;

  response_type?: 'extract';

  /**
   * The link to the studio pipeline for the document.
   */
  studio_link?: string | null;
}

export namespace ExtractResponse {
  export interface URLResult {
    result_id: string;

    /**
     * type = 'url'
     */
    type: 'url';

    url: string;
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

export interface FigureAgentic {
  scope: 'figure';

  /**
   * If True, run advanced chart extraction on figures classified as charts: an
   * agentic extractor that returns full structured series data (chart_data) plus a
   * reconstruction image re-drawn from that data (extra.chart_reconstruction).
   * Higher latency. Defaults to False.
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

  usage: SplitAPI.ParseUsage;

  /**
   * Embedded properties read from the customer's original document.
   */
  document_properties?: ParseResponse.DocumentProperties | null;

  /**
   * The storage URL of the converted PDF file.
   */
  pdf_url?: string | null;

  response_type?: 'parse';

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
        bbox: EditAPI.BoundingBox;

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
         * Extra metadata fields for the block. Fields like 'is_chart' will only appear
         * when set to True.
         */
        extra?: { [key: string]: unknown } | null;

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

        /**
         * Original table fragments that were combined into this table by merge_tables.
         */
        merged_tables?: Array<Block.MergedTable> | null;
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

        export interface MergedTable {
          /**
           * The original bounding box of a table before merge_tables merged it.
           */
          bbox: EditAPI.BoundingBox;

          /**
           * The original content of a table before merge_tables merged it.
           */
          content: string;

          /**
           * (Experimental) The URL of the image for this original table fragment. Only
           * populated when settings.return_images includes 'table'.
           */
          image_url?: string | null;
        }
      }
    }

    export interface Ocr {
      lines: Array<Ocr.Line>;

      words: Array<Ocr.Word>;
    }

    export namespace Ocr {
      export interface Line {
        bbox: EditAPI.BoundingBox;

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
        bbox: EditAPI.BoundingBox;

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

  /**
   * Embedded properties read from the customer's original document.
   */
  export interface DocumentProperties {
    /**
     * The document author.
     */
    author?: string | null;

    /**
     * The document creation time as a timezone-aware datetime. Dates without an offset
     * are interpreted as UTC.
     */
    created_at?: string | null;

    /**
     * The application or tool that authored the document.
     */
    creator?: string | null;

    /**
     * Keywords embedded in the document.
     */
    keywords?: string | null;

    /**
     * The user who last modified the document.
     */
    last_modified_by?: string | null;

    /**
     * The document modification time as a timezone-aware datetime. Dates without an
     * offset are interpreted as UTC.
     */
    modified_at?: string | null;

    /**
     * The application or library that produced the document.
     */
    producer?: string | null;

    /**
     * The document subject.
     */
    subject?: string | null;

    /**
     * The document title.
     */
    title?: string | null;
  }
}

export interface PipelineResponse {
  job_id: string;

  result: PipelineResponse.Result;

  usage: SplitAPI.ParseUsage;

  response_type?: 'pipeline';
}

export namespace PipelineResponse {
  export interface Result {
    extract: Array<Result.UnionMember0> | Shared.ExtractResponse | ExtractAPI.V3Extract | null;

    parse: Shared.ParseResponse | Array<Shared.ParseResponse> | null;

    split: Shared.SplitResponse | null;

    edit?: Shared.EditResponse | null;
  }

  export namespace Result {
    /**
     * This is the response format for Extract -> Split Pipelines
     */
    export interface UnionMember0 {
      page_range: Array<number>;

      result: Shared.ExtractResponse | ExtractAPI.V3Extract;

      split_name: string;

      partition?: string | null;
    }
  }
}

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

export interface SplitResponse {
  /**
   * The split result. If force_url_result is True, this is returned as a URL result.
   */
  result: SplitResponse.SplitResult | SplitResponse.DeepSplitResult | SplitResponse.URLResult;

  usage: SplitAPI.ParseUsage;

  /**
   * The duration of the split request in seconds.
   */
  duration?: number | null;

  /**
   * The unique identifier for the split job.
   */
  job_id?: string | null;

  response_type?: 'split';
}

export namespace SplitResponse {
  export interface SplitResult {
    section_mapping: { [key: string]: Array<number> } | null;

    splits: Array<SplitResult.Split>;
  }

  export namespace SplitResult {
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

  export interface DeepSplitResult {
    splits: Array<DeepSplitResult.Split>;
  }

  export namespace DeepSplitResult {
    export interface Split {
      name: string;

      pages: Array<SplitAPI.DeepSplitPageEvidence>;

      partitions?: Array<Split.Partition> | null;
    }

    export namespace Split {
      export interface Partition {
        name: string;

        pages: Array<SplitAPI.DeepSplitPageEvidence>;
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
   * Mode for table agentic: 'default' selectively applies enrichment only to tables
   * likely to benefit, and 'max' runs enrichment on all tables.
   */
  mode?: 'default' | 'auto' | 'max';

  /**
   * Custom prompt for table agentic.
   */
  prompt?: string | null;
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
