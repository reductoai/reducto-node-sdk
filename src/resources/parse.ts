// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Parse extends APIResource {
  /**
   * Parse
   */
  run(body: ParseRunParams, options?: Core.RequestOptions): Core.APIPromise<ParseRunResponse> {
    return this._client.post('/parse', { body, ...options });
  }

  /**
   * Async Parse
   */
  runJob(body: ParseRunJobParams, options?: Core.RequestOptions): Core.APIPromise<Shared.AsyncParseResponse> {
    return this._client.post('/parse_async', { body, ...options });
  }
}

export interface AsyncConfigV3 {
  /**
   * JSON metadata included in webhook request body. Defaults to None.
   */
  metadata?: unknown;

  /**
   * Workers poll the priority queue ahead of the standard queue, so priority jobs
   * start sooner when there is queued work; sync jobs are prioritized above async
   * jobs by default.
   */
  priority?: boolean;

  /**
   * The webhook configuration for the asynchronous processing.
   */
  webhook?: Shared.SvixWebhookConfig | Shared.DirectWebhookConfig | null;
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
  input: string | Array<string> | Shared.Upload;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: AsyncConfigV3;

  enhance?: Enhance;

  formatting?: Formatting;

  /**
   * Queue priority. 'batch' places the job in a lower-priority queue for non-urgent
   * bulk work. 'auto' (alias: 'standard') uses the default queue.
   */
  queue_priority?: 'auto' | 'standard' | 'batch';

  retrieval?: Retrieval;

  settings?: Settings;

  spreadsheet?: Spreadsheet;
}

export interface Enhance {
  /**
   * If True, run advanced chart extraction on figures classified as charts, without
   * requiring a figure-scoped agentic entry. Returns full structured series data
   * (chart_data) plus a reconstruction image re-drawn from that data. Higher
   * latency. Defaults to False.
   */
  advanced_chart_agent?: boolean;

  /**
   * For legacy Parse, agentic processing uses vision language models to improve
   * text, table, or figure extraction. With r-1, use agentic processing for custom
   * prompts or advanced chart extraction. Agentic processing adds latency.
   */
  agentic?: Array<Shared.TableAgentic | Shared.FigureAgentic | Shared.TextAgentic>;

  /**
   * For legacy Parse, if True, use an advanced vision language model to improve
   * reading order accuracy, with a small increase in latency. r-1 handles reading
   * order natively and ignores this setting. Defaults to False.
   */
  intelligent_ordering?: boolean;

  /**
   * For legacy Parse, if True, summarize figures using a separate vision language
   * model. r-1 generates figure descriptions natively and ignores this setting.
   * Defaults to True.
   */
  summarize_figures?: boolean;
}

export interface Formatting {
  /**
   * If True, add page markers to the output. Defaults to False. Useful for
   * extracting data with page specific information.
   */
  add_page_markers?: boolean;

  /**
   * For legacy Parse, the formatting details to include in the output. r-1 handles
   * highlights, signatures, and watermarks natively and ignores those values. r-1
   * does not support hyperlinks.
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
   * The table output format. Defaults to dynamic, which returns md for simpler
   * tables and html for more complex tables. r-1 does not support jsonbbox.
   */
  table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv';
}

export interface Retrieval {
  chunking?: Shared.Chunking;

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
   * Render DPI used when rasterizing the source PDF before embedding the OCR text
   * layer (only applies when `embed_pdf_metadata` is True). Lower values produce
   * dramatically smaller output PDFs; higher values preserve more detail when zoomed
   * past 200%. Defaults to 100 (good for on-screen viewing); raise toward the source
   * scan DPI for crisper output. Min 50, max 250.
   */
  embed_pdf_metadata_dpi?: number;

  /**
   * If True, return properties embedded in the original document. Defaults to False.
   */
  extract_document_properties?: boolean;

  /**
   * The text extraction method for legacy Parse. OCR uses optical character
   * recognition only. Hybrid combines OCR with embedded PDF text. r-1 uses native
   * full-page processing and ignores this setting. Defaults to hybrid.
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
   * Hybrid VPC request-scoped settings.
   */
  hybrid_vpc?: Settings.HybridVpc;

  /**
   * The parse model to use. 'r-1' is the R-1 full-page parse model, which parses
   * each page in a single generation. 'legacy' is the previous parsing pipeline.
   * Defaults to 'legacy' unless your organization was created on the r-1 plan, in
   * which case it defaults to 'r-1'.
   */
  model?: 'r-1' | 'legacy' | null;

  /**
   * The OCR system for legacy Parse. Standard is the best multilingual OCR system.
   * Legacy supports Germanic languages and remains available for backwards
   * compatibility. r-1 uses native full-page processing and ignores this setting.
   * Defaults to standard.
   */
  ocr_system?: 'standard' | 'legacy';

  /**
   * The page range to process (1-indexed). By default, the entire document is
   * processed. For spreadsheets, you can also provide a list of sheet names.
   */
  page_range?: Shared.PageRange | Array<Shared.PageRange> | Array<number> | Array<string> | null;

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
   * Per-tenant throttling for multi-tenant applications. Tag each request with your
   * tenant's id to bound how much of your account's concurrency a single tenant can
   * consume. Account-level throttles still apply.
   */
  tenant_throttling?: Settings.TenantThrottling | null;

  /**
   * The timeout for the job in seconds.
   */
  timeout?: number | null;
}

export namespace Settings {
  /**
   * Hybrid VPC request-scoped settings.
   */
  export interface HybridVpc {
    /**
     * Named Hybrid VPC environment to use for this request. Only applies when your
     * organization has Hybrid VPC environments configured.
     */
    environment?: string | null;
  }

  /**
   * Per-tenant throttling for multi-tenant applications. Tag each request with your
   * tenant's id to bound how much of your account's concurrency a single tenant can
   * consume. Account-level throttles still apply.
   */
  export interface TenantThrottling {
    /**
     * Your identifier for the tenant (customer, workspace, organization) this request
     * belongs to. Used only for noisy-neighbor throttling inside your account.
     */
    tenant_id: string;

    /**
     * Maximum fraction of your account's concurrency ceiling this tenant may use,
     * between 0 (exclusive) and 1. Defaults to 0.5.
     */
    max_share?: number;
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
   * Whether to include cell color, formula, and dropdown information in the output.
   */
  include?: Array<'cell_colors' | 'formula' | 'dropdowns'>;

  /**
   * Maximum total non-empty cells allowed across all sheets. If exceeded, the
   * request is rejected with a 422 error. Set to null to disable the limit. Defaults
   * to null.
   */
  max_cell_count?: number | null;

  split_large_tables?: Shared.SplitLargeTables;
}

export type ParseRunResponse = Shared.ParseResponse | Shared.AsyncParseResponse;

export type ParseRunParams = ParseRunParams.SyncParseConfig | ParseRunParams.AsyncParseConfig;

export declare namespace ParseRunParams {
  export interface SyncParseConfig {
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

    enhance?: Enhance;

    formatting?: Formatting;

    retrieval?: Retrieval;

    settings?: Settings;

    spreadsheet?: Spreadsheet;
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
    input: string | Array<string> | Shared.Upload;

    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    async?: AsyncConfigV3;

    enhance?: Enhance;

    formatting?: Formatting;

    /**
     * Queue priority. 'batch' places the job in a lower-priority queue for non-urgent
     * bulk work. 'auto' (alias: 'standard') uses the default queue.
     */
    queue_priority?: 'auto' | 'standard' | 'batch';

    retrieval?: Retrieval;

    settings?: Settings;

    spreadsheet?: Spreadsheet;
  }
}

export interface ParseRunJobParams {
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
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: AsyncConfigV3;

  enhance?: Enhance;

  formatting?: Formatting;

  /**
   * Queue priority. 'batch' places the job in a lower-priority queue for non-urgent
   * bulk work. 'auto' (alias: 'standard') uses the default queue.
   */
  queue_priority?: 'auto' | 'standard' | 'batch';

  retrieval?: Retrieval;

  settings?: Settings;

  spreadsheet?: Spreadsheet;
}

export declare namespace Parse {
  export {
    type AsyncConfigV3 as AsyncConfigV3,
    type AsyncParseConfig as AsyncParseConfig,
    type Enhance as Enhance,
    type Formatting as Formatting,
    type Retrieval as Retrieval,
    type Settings as Settings,
    type Spreadsheet as Spreadsheet,
    type ParseRunResponse as ParseRunResponse,
    type ParseRunParams as ParseRunParams,
    type ParseRunJobParams as ParseRunJobParams,
  };
}
