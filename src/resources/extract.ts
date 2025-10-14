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

export type ExtractRunResponse =
  | ExtractRunResponse.V3ExtractResponse
  | ExtractRunResponse.AsyncExtractResponse;

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

  export interface AsyncExtractResponse {
    job_id: string;
  }
}

export interface ExtractRunJobResponse {
  job_id: string;
}

export type ExtractRunParams = ExtractRunParams.SyncExtractConfig | ExtractRunParams.AsyncExtractConfig;

export declare namespace ExtractRunParams {
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

export interface ExtractRunJobParams {
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
  async?: ExtractRunJobParams.Async;

  /**
   * The instructions to use for the extraction.
   */
  instructions?: ExtractRunJobParams.Instructions;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: ExtractRunJobParams.Parsing;

  /**
   * The settings to use for the extraction.
   */
  settings?: ExtractRunJobParams.Settings;
}

export namespace ExtractRunJobParams {
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

export declare namespace Extract {
  export {
    type ExtractRunResponse as ExtractRunResponse,
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
