// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'api_version',
    endpoint: '/version',
    httpMethod: 'get',
    summary: 'Get Version',
    description: 'Get Version',
    stainlessPath: '(resource) $client > (method) api_version',
    qualified: 'client.apiVersion',
    response: 'string',
    markdown:
      "## api_version\n\n`client.apiVersion(): string`\n\n**get** `/version`\n\nGet Version\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst response = await client.apiVersion();\n\nconsole.log(response);\n```",
  },
  {
    name: 'upload',
    endpoint: '/upload',
    httpMethod: 'post',
    summary: 'Upload',
    description: 'Upload',
    stainlessPath: '(resource) $client > (method) upload',
    qualified: 'client.upload',
    params: ['extension?: string;', 'file?: string;'],
    response: '{ file_id: string; presigned_url?: string; }',
    markdown:
      "## upload\n\n`client.upload(extension?: string, file?: string): { file_id: string; presigned_url?: string; }`\n\n**post** `/upload`\n\nUpload\n\n### Parameters\n\n- `extension?: string`\n\n- `file?: string`\n\n### Returns\n\n- `{ file_id: string; presigned_url?: string; }`\n\n  - `file_id: string`\n  - `presigned_url?: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst upload = await client.upload();\n\nconsole.log(upload);\n```",
  },
  {
    name: 'run',
    endpoint: '/parse',
    httpMethod: 'post',
    summary: 'Parse',
    description: 'Parse',
    stainlessPath: '(resource) parse > (method) run',
    qualified: 'client.parse.run',
    params: [
      "{ input: string | string[] | { file_id: string; presigned_url?: string; }; enhance?: { agentic?: object | object | object[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: object; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: object | object[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: object; }; } | { input: string | string[] | { file_id: string; presigned_url?: string; }; async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }; enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; queue_priority?: 'auto' | 'batch'; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; };",
    ],
    response:
      "{ duration: number; job_id: string; result: { chunks: object[]; type: 'full'; custom?: object; ocr?: object; } | { result_id: string; type: 'url'; url: string; }; usage: object; pdf_url?: string; studio_link?: string; } | { job_id: string; }",
    markdown:
      "## run\n\n`client.parse.run(body: { input: string | string[] | object; enhance?: object; formatting?: object; retrieval?: object; settings?: object; spreadsheet?: object; } | { input: string | string[] | upload; async?: async_config_v3; enhance?: enhance; formatting?: formatting; queue_priority?: 'auto' | 'batch'; retrieval?: retrieval; settings?: settings; spreadsheet?: spreadsheet; }): object | object`\n\n**post** `/parse`\n\nParse\n\n### Parameters\n\n- `body: { input: string | string[] | { file_id: string; presigned_url?: string; }; enhance?: { agentic?: object | object | object[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: object; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: object | object[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: object; }; } | { input: string | string[] | { file_id: string; presigned_url?: string; }; async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }; enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; queue_priority?: 'auto' | 'batch'; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; }`\n\n### Returns\n\n- `{ duration: number; job_id: string; result: { chunks: object[]; type: 'full'; custom?: object; ocr?: object; } | { result_id: string; type: 'url'; url: string; }; usage: object; pdf_url?: string; studio_link?: string; } | { job_id: string; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst response = await client.parse.run({ input: 'string' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'run_job',
    endpoint: '/parse_async',
    httpMethod: 'post',
    summary: 'Async Parse',
    description: 'Async Parse',
    stainlessPath: '(resource) parse > (method) run_job',
    qualified: 'client.parse.runJob',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      "async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; };",
      "enhance?: { agentic?: { scope: 'table'; prompt?: string; } | { scope: 'figure'; advanced_chart_agent?: boolean; prompt?: string; return_overlays?: boolean; } | { scope: 'text'; prompt?: string; }[]; intelligent_ordering?: boolean; summarize_figures?: boolean; };",
      "formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; };",
      "queue_priority?: 'auto' | 'batch';",
      "retrieval?: { chunking?: { chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections'; chunk_overlap?: number; chunk_size?: number; }; embedding_optimized?: boolean; filter_blocks?: string[]; };",
      "settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; };",
      "spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: { enabled?: boolean; size?: number | object; }; };",
    ],
    response: '{ job_id: string; }',
    markdown:
      "## run_job\n\n`client.parse.runJob(input: string | string[] | { file_id: string; presigned_url?: string; }, async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }, enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }, formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }, queue_priority?: 'auto' | 'batch', retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }, settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }, spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }): { job_id: string; }`\n\n**post** `/parse_async`\n\nAsync Parse\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; }`\n  The configuration options for asynchronous processing (default synchronous).\n  - `metadata?: object`\n    JSON metadata included in webhook request body. Defaults to None.\n  - `priority?: boolean`\n    If True, attempts to process the job with priority if the user has priority processing budget available; by default, sync jobs are prioritized above async jobs.\n  - `webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }`\n    The webhook configuration for the asynchronous processing.\n\n- `enhance?: { agentic?: { scope: 'table'; prompt?: string; } | { scope: 'figure'; advanced_chart_agent?: boolean; prompt?: string; return_overlays?: boolean; } | { scope: 'text'; prompt?: string; }[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }`\n  - `agentic?: { scope: 'table'; prompt?: string; } | { scope: 'figure'; advanced_chart_agent?: boolean; prompt?: string; return_overlays?: boolean; } | { scope: 'text'; prompt?: string; }[]`\n    Agentic uses vision language models to enhance the accuracy of the output of different types of extraction. This will incur a cost and latency increase.\n  - `intelligent_ordering?: boolean`\n    If True, use an advanced vision language model to improve reading order accuracy, with a small increase in latency. Defaults to False.\n  - `summarize_figures?: boolean`\n    If True, summarize figures using a small vision language model. Defaults to True.\n\n- `formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }`\n  - `add_page_markers?: boolean`\n    If True, add page markers to the output. Defaults to False. Useful for extracting data with page specific information.\n  - `include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]`\n    A list of formatting to include in the output.\n  - `merge_tables?: boolean`\n    A flag to indicate if consecutive tables with the same number of columns should be merged. Defaults to False.\n  - `table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'`\n    The mode to use for table output. Defaults to dynamic, which returns md for simpler tables and html for more complex tables.\n\n- `queue_priority?: 'auto' | 'batch'`\n  Queue priority. 'batch' for non-urgent work that processes when spare GPU capacity is available.\n\n- `retrieval?: { chunking?: { chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections'; chunk_overlap?: number; chunk_size?: number; }; embedding_optimized?: boolean; filter_blocks?: string[]; }`\n  - `chunking?: { chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections'; chunk_overlap?: number; chunk_size?: number; }`\n  - `embedding_optimized?: boolean`\n    If True, use embedding optimized mode. Defaults to False.\n  - `filter_blocks?: string[]`\n    A list of block types to filter out from 'content' and 'embed' fields. By default, no blocks are filtered.\n\n- `settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }`\n  - `document_password?: string`\n    Password to decrypt password-protected documents.\n  - `embed_pdf_metadata?: boolean`\n    If True, embed OCR metadata into the returned PDF. Defaults to False.\n  - `extraction_mode?: 'ocr' | 'hybrid'`\n    The mode to use for text extraction from PDFs. OCR mode uses optical character recognition only. Hybrid mode combines OCR with embedded PDF text for best accuracy (default).\n  - `force_file_extension?: string`\n    Force the URL to be downloaded as a specific file extension (e.g. `.png`).\n  - `force_url_result?: boolean`\n    Force the result to be returned in URL form.\n  - `ocr_system?: 'standard' | 'legacy'`\n    Standard is our best multilingual OCR system. Legacy only supports germanic languages and is available for backwards compatibility.\n  - `page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[] | string[]`\n    The page range to process (1-indexed). By default, the entire document is processed. For spreadsheets, you can also provide a list of sheet names.\n  - `persist_results?: boolean`\n    If True, persist the results indefinitely. Defaults to False.\n  - `return_images?: 'figure' | 'table' | 'page'[]`\n    Whether to return images for the specified block types. 'page' returns full page images. By default, no images are returned.\n  - `return_ocr_data?: boolean`\n    If True, return OCR data in the result. Defaults to False.\n  - `timeout?: number`\n    The timeout for the job in seconds.\n\n- `spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: { enabled?: boolean; size?: number | object; }; }`\n  - `clustering?: 'accurate' | 'fast' | 'disabled'`\n    In a spreadsheet with different tables inside, we enable splitting up the tables by default. Accurate mode applies more powerful models for superior accuracy, at 5× the default per-cell rate. Disabling will register as one large table.\n  - `exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]`\n    Whether to exclude hidden sheets, rows, or columns in the output.\n  - `include?: 'cell_colors' | 'formula' | 'dropdowns'[]`\n    Whether to include cell color, formula, and dropdown information in the output.\n  - `split_large_tables?: { enabled?: boolean; size?: number | { column?: number; row?: number; }; }`\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst asyncParseResponse = await client.parse.runJob({ input: 'string' });\n\nconsole.log(asyncParseResponse);\n```",
  },
  {
    name: 'run',
    endpoint: '/extract',
    httpMethod: 'post',
    summary: 'Extract',
    description: 'Extract',
    stainlessPath: '(resource) extract > (method) run',
    qualified: 'client.extract.run',
    params: [
      '{ input: string | string[] | { file_id: string; presigned_url?: string; }; instructions?: { schema?: object; system_prompt?: string; }; parsing?: { enhance?: object; formatting?: object; retrieval?: object; settings?: object; spreadsheet?: object; }; settings?: { array_extract?: boolean; citations?: { enabled?: boolean; numerical_confidence?: boolean; }; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; }; } | { input: string | string[] | { file_id: string; presigned_url?: string; }; async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }; instructions?: { schema?: object; system_prompt?: string; }; parsing?: { enhance?: enhance; formatting?: formatting; retrieval?: retrieval; settings?: settings; spreadsheet?: spreadsheet; }; settings?: { array_extract?: boolean; citations?: object; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; }; };',
    ],
    response:
      '{ result: object | object[]; usage: object; job_id?: string; studio_link?: string; } | { job_id: string; }',
    markdown:
      "## run\n\n`client.extract.run(body: { input: string | string[] | object; instructions?: object; parsing?: object; settings?: object; } | { input: string | string[] | upload; async?: async_config_v3; instructions?: instructions; parsing?: parse_options; settings?: extract_settings; }): object | object`\n\n**post** `/extract`\n\nExtract\n\n### Parameters\n\n- `body: { input: string | string[] | { file_id: string; presigned_url?: string; }; instructions?: { schema?: object; system_prompt?: string; }; parsing?: { enhance?: object; formatting?: object; retrieval?: object; settings?: object; spreadsheet?: object; }; settings?: { array_extract?: boolean; citations?: { enabled?: boolean; numerical_confidence?: boolean; }; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; }; } | { input: string | string[] | { file_id: string; presigned_url?: string; }; async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }; instructions?: { schema?: object; system_prompt?: string; }; parsing?: { enhance?: enhance; formatting?: formatting; retrieval?: retrieval; settings?: settings; spreadsheet?: spreadsheet; }; settings?: { array_extract?: boolean; citations?: object; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; }; }`\n\n### Returns\n\n- `{ result: object | object[]; usage: object; job_id?: string; studio_link?: string; } | { job_id: string; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst response = await client.extract.run({ input: 'string' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'run_job',
    endpoint: '/extract_async',
    httpMethod: 'post',
    summary: 'Extract Async',
    description: 'Extract Async',
    stainlessPath: '(resource) extract > (method) run_job',
    qualified: 'client.extract.runJob',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      "async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; };",
      'instructions?: { schema?: object; system_prompt?: string; };',
      "parsing?: { enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; };",
      'settings?: { array_extract?: boolean; citations?: { enabled?: boolean; numerical_confidence?: boolean; }; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; };',
    ],
    response: '{ job_id: string; }',
    markdown:
      "## run_job\n\n`client.extract.runJob(input: string | string[] | { file_id: string; presigned_url?: string; }, async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }, instructions?: { schema?: object; system_prompt?: string; }, parsing?: { enhance?: enhance; formatting?: formatting; retrieval?: retrieval; settings?: settings; spreadsheet?: spreadsheet; }, settings?: { array_extract?: boolean; citations?: object; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; }): { job_id: string; }`\n\n**post** `/extract_async`\n\nExtract Async\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; }`\n  The configuration options for asynchronous processing (default synchronous).\n  - `metadata?: object`\n    JSON metadata included in webhook request body. Defaults to None.\n  - `priority?: boolean`\n    If True, attempts to process the job with priority if the user has priority processing budget available; by default, sync jobs are prioritized above async jobs.\n  - `webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }`\n    The webhook configuration for the asynchronous processing.\n\n- `instructions?: { schema?: object; system_prompt?: string; }`\n  The instructions to use for the extraction.\n  - `schema?: object`\n    The JSON schema to use for the extraction.\n  - `system_prompt?: string`\n    The system prompt to use for the extraction.\n\n- `parsing?: { enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; }`\n  The configuration options for parsing the document. If you are passing in a jobid:// URL for the file, then this configuration will be ignored.\n  - `enhance?: { agentic?: { scope: 'table'; prompt?: string; } | { scope: 'figure'; advanced_chart_agent?: boolean; prompt?: string; return_overlays?: boolean; } | { scope: 'text'; prompt?: string; }[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }`\n  - `formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }`\n  - `retrieval?: { chunking?: { chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections'; chunk_overlap?: number; chunk_size?: number; }; embedding_optimized?: boolean; filter_blocks?: string[]; }`\n  - `settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }`\n  - `spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: { enabled?: boolean; size?: number | object; }; }`\n\n- `settings?: { array_extract?: boolean; citations?: { enabled?: boolean; numerical_confidence?: boolean; }; deep_extract?: boolean; include_images?: boolean; optimize_for_latency?: boolean; }`\n  The settings to use for the extraction.\n  - `array_extract?: boolean`\n    If True, use array extraction.\n  - `citations?: { enabled?: boolean; numerical_confidence?: boolean; }`\n    The citations to use for the extraction.\n  - `deep_extract?: boolean`\n    If True, use Deep Extract, an agentic extraction mode that iteratively refines its output to achieve near-perfect accuracy. Best for complex documents where accuracy is critical.\n  - `include_images?: boolean`\n    If True, include images in the extraction.\n  - `optimize_for_latency?: boolean`\n    If True, jobs will be processed with a higher throughput and priority at a higher cost. Defaults to False.\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst asyncExtractResponse = await client.extract.runJob({ input: 'string' });\n\nconsole.log(asyncExtractResponse);\n```",
  },
  {
    name: 'run',
    endpoint: '/split',
    httpMethod: 'post',
    summary: 'Split',
    description: 'Split',
    stainlessPath: '(resource) split > (method) run',
    qualified: 'client.split.run',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      'split_description: { description: string; name: string; partition_key?: string; }[];',
      "parsing?: { enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; };",
      "settings?: { allow_page_overlap?: boolean; table_cutoff?: 'truncate' | 'preserve'; };",
      'split_rules?: string;',
    ],
    response:
      "{ result: { section_mapping: object; splits: { name: string; pages: number[]; conf?: 'high' | 'low'; partitions?: object[]; }[]; } | { splits: { name: string; pages: deep_split_page_evidence[]; partitions?: object[]; }[]; }; usage: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }; }",
    markdown:
      "## run\n\n`client.split.run(input: string | string[] | { file_id: string; presigned_url?: string; }, split_description: { description: string; name: string; partition_key?: string; }[], parsing?: { enhance?: enhance; formatting?: formatting; retrieval?: retrieval; settings?: settings; spreadsheet?: spreadsheet; }, settings?: { allow_page_overlap?: boolean; table_cutoff?: 'truncate' | 'preserve'; }, split_rules?: string): { result: object | object; usage: parse_usage; }`\n\n**post** `/split`\n\nSplit\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `split_description: { description: string; name: string; partition_key?: string; }[]`\n  The configuration options for processing the document.\n\n- `parsing?: { enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; }`\n  The configuration options for parsing the document. If you are passing in a jobid:// URL for the file, then this configuration will be ignored.\n  - `enhance?: { agentic?: { scope: 'table'; prompt?: string; } | { scope: 'figure'; advanced_chart_agent?: boolean; prompt?: string; return_overlays?: boolean; } | { scope: 'text'; prompt?: string; }[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }`\n  - `formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }`\n  - `retrieval?: { chunking?: { chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections'; chunk_overlap?: number; chunk_size?: number; }; embedding_optimized?: boolean; filter_blocks?: string[]; }`\n  - `settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }`\n  - `spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: { enabled?: boolean; size?: number | object; }; }`\n\n- `settings?: { allow_page_overlap?: boolean; table_cutoff?: 'truncate' | 'preserve'; }`\n  The settings for split processing.\n  - `allow_page_overlap?: boolean`\n    If True, a page can belong to multiple categories/partitions. If False, each page must belong to exactly one category. Defaults to True.\n  - `table_cutoff?: 'truncate' | 'preserve'`\n    If tables should be truncated to the first few rows or if all content should be preserved. truncate improves latency, preserve is recommended for cases where partition_key is being used and the partition_key may be included within the table. Defaults to truncate\n\n- `split_rules?: string`\n  The prompt that describes rules for splitting the document.\n\n### Returns\n\n- `{ result: { section_mapping: object; splits: { name: string; pages: number[]; conf?: 'high' | 'low'; partitions?: object[]; }[]; } | { splits: { name: string; pages: deep_split_page_evidence[]; partitions?: object[]; }[]; }; usage: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }; }`\n\n  - `result: { section_mapping: object; splits: { name: string; pages: number[]; conf?: 'high' | 'low'; partitions?: { name: string; pages: number[]; conf?: 'high' | 'low'; }[]; }[]; } | { splits: { name: string; pages: { evidence: string; page_number: number; confidence?: 'high' | 'medium' | 'low'; }[]; partitions?: { name: string; pages: object[]; }[]; }[]; }`\n  - `usage: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst splitResponse = await client.split.run({ input: 'string', split_description: [{ description: 'description', name: 'name' }] });\n\nconsole.log(splitResponse);\n```",
  },
  {
    name: 'run_job',
    endpoint: '/split_async',
    httpMethod: 'post',
    summary: 'Split Async',
    description: 'Split Async',
    stainlessPath: '(resource) split > (method) run_job',
    qualified: 'client.split.runJob',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      'split_description: { description: string; name: string; partition_key?: string; }[];',
      "async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; };",
      "parsing?: { enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; };",
      "settings?: { allow_page_overlap?: boolean; table_cutoff?: 'truncate' | 'preserve'; };",
      'split_rules?: string;',
    ],
    response: '{ job_id: string; }',
    markdown:
      "## run_job\n\n`client.split.runJob(input: string | string[] | { file_id: string; presigned_url?: string; }, split_description: { description: string; name: string; partition_key?: string; }[], async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }, parsing?: { enhance?: enhance; formatting?: formatting; retrieval?: retrieval; settings?: settings; spreadsheet?: spreadsheet; }, settings?: { allow_page_overlap?: boolean; table_cutoff?: 'truncate' | 'preserve'; }, split_rules?: string): { job_id: string; }`\n\n**post** `/split_async`\n\nSplit Async\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `split_description: { description: string; name: string; partition_key?: string; }[]`\n  The configuration options for processing the document.\n\n- `async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; }`\n  The configuration options for asynchronous processing (default synchronous).\n  - `metadata?: object`\n    JSON metadata included in webhook request body. Defaults to None.\n  - `priority?: boolean`\n    If True, attempts to process the job with priority if the user has priority processing budget available; by default, sync jobs are prioritized above async jobs.\n  - `webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }`\n    The webhook configuration for the asynchronous processing.\n\n- `parsing?: { enhance?: { agentic?: table_agentic | figure_agentic | text_agentic[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }; formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }; retrieval?: { chunking?: chunking; embedding_optimized?: boolean; filter_blocks?: string[]; }; settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: page_range | page_range[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }; spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: split_large_tables; }; }`\n  The configuration options for parsing the document. If you are passing in a jobid:// URL for the file, then this configuration will be ignored.\n  - `enhance?: { agentic?: { scope: 'table'; prompt?: string; } | { scope: 'figure'; advanced_chart_agent?: boolean; prompt?: string; return_overlays?: boolean; } | { scope: 'text'; prompt?: string; }[]; intelligent_ordering?: boolean; summarize_figures?: boolean; }`\n  - `formatting?: { add_page_markers?: boolean; include?: 'change_tracking' | 'highlight' | 'comments' | 'hyperlinks' | 'signatures' | 'ignore_watermarks'[]; merge_tables?: boolean; table_output_format?: 'html' | 'json' | 'md' | 'jsonbbox' | 'dynamic' | 'csv'; }`\n  - `retrieval?: { chunking?: { chunk_mode?: 'variable' | 'section' | 'page' | 'disabled' | 'block' | 'page_sections'; chunk_overlap?: number; chunk_size?: number; }; embedding_optimized?: boolean; filter_blocks?: string[]; }`\n  - `settings?: { document_password?: string; embed_pdf_metadata?: boolean; extraction_mode?: 'ocr' | 'hybrid'; force_file_extension?: string; force_url_result?: boolean; ocr_system?: 'standard' | 'legacy'; page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[] | string[]; persist_results?: boolean; return_images?: 'figure' | 'table' | 'page'[]; return_ocr_data?: boolean; timeout?: number; }`\n  - `spreadsheet?: { clustering?: 'accurate' | 'fast' | 'disabled'; exclude?: 'hidden_sheets' | 'hidden_rows' | 'hidden_cols' | 'styling' | 'spreadsheet_images'[]; include?: 'cell_colors' | 'formula' | 'dropdowns'[]; split_large_tables?: { enabled?: boolean; size?: number | object; }; }`\n\n- `settings?: { allow_page_overlap?: boolean; table_cutoff?: 'truncate' | 'preserve'; }`\n  The settings for split processing.\n  - `allow_page_overlap?: boolean`\n    If True, a page can belong to multiple categories/partitions. If False, each page must belong to exactly one category. Defaults to True.\n  - `table_cutoff?: 'truncate' | 'preserve'`\n    If tables should be truncated to the first few rows or if all content should be preserved. truncate improves latency, preserve is recommended for cases where partition_key is being used and the partition_key may be included within the table. Defaults to truncate\n\n- `split_rules?: string`\n  The prompt that describes rules for splitting the document.\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst asyncSplitResponse = await client.split.runJob({ input: 'string', split_description: [{ description: 'description', name: 'name' }] });\n\nconsole.log(asyncSplitResponse);\n```",
  },
  {
    name: 'run',
    endpoint: '/edit',
    httpMethod: 'post',
    summary: 'Edit',
    description: 'Edit',
    stainlessPath: '(resource) edit > (method) run',
    qualified: 'client.edit.run',
    params: [
      'document_url: string | { file_id: string; presigned_url?: string; };',
      'edit_instructions: string;',
      "edit_options?: { color?: string; enable_overflow_pages?: boolean; flatten?: boolean; font_size?: number; llm_provider_preference?: 'openai' | 'anthropic' | 'google'; };",
      "form_schema?: { bbox: { height: number; left: number; page: number; top: number; width: number; original_page?: number; }; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[];",
      'priority?: boolean;',
    ],
    response:
      "{ document_url: string; form_schema?: { bbox: bounding_box; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[]; usage?: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }; }",
    markdown:
      "## run\n\n`client.edit.run(document_url: string | { file_id: string; presigned_url?: string; }, edit_instructions: string, edit_options?: { color?: string; enable_overflow_pages?: boolean; flatten?: boolean; font_size?: number; llm_provider_preference?: 'openai' | 'anthropic' | 'google'; }, form_schema?: { bbox: bounding_box; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[], priority?: boolean): { document_url: string; form_schema?: edit_widget[]; usage?: parse_usage; }`\n\n**post** `/edit`\n\nEdit\n\n### Parameters\n\n- `document_url: string | { file_id: string; presigned_url?: string; }`\n  The URL of the document to be processed. You can provide one of the following:\n1. A publicly available URL\n2. A presigned S3 URL\n3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n\n\n- `edit_instructions: string`\n  The instructions for the edit.\n\n- `edit_options?: { color?: string; enable_overflow_pages?: boolean; flatten?: boolean; font_size?: number; llm_provider_preference?: 'openai' | 'anthropic' | 'google'; }`\n  - `color?: string`\n    The color to use for edits, in hex format.\n  - `enable_overflow_pages?: boolean`\n    If True, creates overflow pages for text that doesn't fit in form fields. Defaults to False.\n  - `flatten?: boolean`\n    If True, flattens form fields after filling, converting them to static content. Defaults to False.\n  - `font_size?: number`\n    The font size (in points) to use for filled text fields. If not specified, font size is automatically calculated based on field dimensions.\n  - `llm_provider_preference?: 'openai' | 'anthropic' | 'google'`\n    The LLM provider to use for edit processing. If not specified, defaults to 'google'\n\n- `form_schema?: { bbox: { height: number; left: number; page: number; top: number; width: number; original_page?: number; }; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[]`\n  Form schema for PDF forms. List of widgets with their types, descriptions, and bounding boxes. Only works for PDFs.\n\n- `priority?: boolean`\n  If True, attempts to process the job with priority if the user has priority processing budget available; by default, sync jobs are prioritized above async jobs.\n\n### Returns\n\n- `{ document_url: string; form_schema?: { bbox: bounding_box; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[]; usage?: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }; }`\n\n  - `document_url: string`\n  - `form_schema?: { bbox: { height: number; left: number; page: number; top: number; width: number; original_page?: number; }; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[]`\n  - `usage?: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst editResponse = await client.edit.run({ document_url: 'string', edit_instructions: 'edit_instructions' });\n\nconsole.log(editResponse);\n```",
  },
  {
    name: 'run_job',
    endpoint: '/edit_async',
    httpMethod: 'post',
    summary: 'Edit Async',
    description: 'Edit Async',
    stainlessPath: '(resource) edit > (method) run_job',
    qualified: 'client.edit.runJob',
    params: [
      'document_url: string | { file_id: string; presigned_url?: string; };',
      'edit_instructions: string;',
      "edit_options?: { color?: string; enable_overflow_pages?: boolean; flatten?: boolean; font_size?: number; llm_provider_preference?: 'openai' | 'anthropic' | 'google'; };",
      "form_schema?: { bbox: { height: number; left: number; page: number; top: number; width: number; original_page?: number; }; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[];",
      'priority?: boolean;',
      "webhook?: { channels?: string[]; metadata?: object; mode?: 'disabled' | 'svix' | 'direct'; url?: string; };",
    ],
    response: '{ job_id: string; }',
    markdown:
      "## run_job\n\n`client.edit.runJob(document_url: string | { file_id: string; presigned_url?: string; }, edit_instructions: string, edit_options?: { color?: string; enable_overflow_pages?: boolean; flatten?: boolean; font_size?: number; llm_provider_preference?: 'openai' | 'anthropic' | 'google'; }, form_schema?: { bbox: bounding_box; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[], priority?: boolean, webhook?: { channels?: string[]; metadata?: object; mode?: 'disabled' | 'svix' | 'direct'; url?: string; }): { job_id: string; }`\n\n**post** `/edit_async`\n\nEdit Async\n\n### Parameters\n\n- `document_url: string | { file_id: string; presigned_url?: string; }`\n  The URL of the document to be processed. You can provide one of the following:\n1. A publicly available URL\n2. A presigned S3 URL\n3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n\n\n- `edit_instructions: string`\n  The instructions for the edit.\n\n- `edit_options?: { color?: string; enable_overflow_pages?: boolean; flatten?: boolean; font_size?: number; llm_provider_preference?: 'openai' | 'anthropic' | 'google'; }`\n  - `color?: string`\n    The color to use for edits, in hex format.\n  - `enable_overflow_pages?: boolean`\n    If True, creates overflow pages for text that doesn't fit in form fields. Defaults to False.\n  - `flatten?: boolean`\n    If True, flattens form fields after filling, converting them to static content. Defaults to False.\n  - `font_size?: number`\n    The font size (in points) to use for filled text fields. If not specified, font size is automatically calculated based on field dimensions.\n  - `llm_provider_preference?: 'openai' | 'anthropic' | 'google'`\n    The LLM provider to use for edit processing. If not specified, defaults to 'google'\n\n- `form_schema?: { bbox: { height: number; left: number; page: number; top: number; width: number; original_page?: number; }; description: string; type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode'; fill?: boolean; font_size?: number; value?: string; }[]`\n  Form schema for PDF forms. List of widgets with their types, descriptions, and bounding boxes. Only works for PDFs.\n\n- `priority?: boolean`\n  If True, attempts to process the job with priority if the user has priority processing budget available; by default, sync jobs are prioritized above async jobs.\n\n- `webhook?: { channels?: string[]; metadata?: object; mode?: 'disabled' | 'svix' | 'direct'; url?: string; }`\n  - `channels?: string[]`\n    A list of Svix channels the message will be delivered down, omit to send to all channels.\n  - `metadata?: object`\n    JSON metadata included in webhook request body\n  - `mode?: 'disabled' | 'svix' | 'direct'`\n    The mode to use for webhook delivery. Defaults to 'disabled'. We recommend using 'svix' for production environments.\n  - `url?: string`\n    The URL to send the webhook to (if using direct webhoook).\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst asyncEditResponse = await client.edit.runJob({ document_url: 'string', edit_instructions: 'edit_instructions' });\n\nconsole.log(asyncEditResponse);\n```",
  },
  {
    name: 'run',
    endpoint: '/pipeline',
    httpMethod: 'post',
    summary: 'Pipeline',
    description: 'Pipeline',
    stainlessPath: '(resource) pipeline > (method) run',
    qualified: 'client.pipeline.run',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      'pipeline_id: string;',
      'settings?: { document_password?: string; };',
    ],
    response:
      '{ job_id: string; result: { extract: { page_range: number[]; result: extract_response | v3_extract; split_name: string; partition?: string; }[] | object | object; parse: object | object[]; split: object; edit?: object; }; usage: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }; }',
    markdown:
      "## run\n\n`client.pipeline.run(input: string | string[] | { file_id: string; presigned_url?: string; }, pipeline_id: string, settings?: { document_password?: string; }): { job_id: string; result: object; usage: parse_usage; }`\n\n**post** `/pipeline`\n\nPipeline\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `pipeline_id: string`\n  The ID of the pipeline to use for the document.\n\n- `settings?: { document_password?: string; }`\n  Settings for pipeline execution that override pipeline defaults.\n  - `document_password?: string`\n    Password to decrypt password-protected documents.\n\n### Returns\n\n- `{ job_id: string; result: { extract: { page_range: number[]; result: extract_response | v3_extract; split_name: string; partition?: string; }[] | object | object; parse: object | object[]; split: object; edit?: object; }; usage: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }; }`\n\n  - `job_id: string`\n  - `result: { extract: { page_range: number[]; result: { citations: object[]; result: object[]; usage: extract_usage; job_id?: string; studio_link?: string; } | { result: object | object[]; usage: extract_usage; job_id?: string; studio_link?: string; }; split_name: string; partition?: string; }[] | { citations: object[]; result: object[]; usage: object; job_id?: string; studio_link?: string; } | { result: object | object[]; usage: object; job_id?: string; studio_link?: string; }; parse: { duration: number; job_id: string; result: { chunks: object[]; type: 'full'; custom?: object; ocr?: object; } | { result_id: string; type: 'url'; url: string; }; usage: object; pdf_url?: string; studio_link?: string; } | { duration: number; job_id: string; result: { chunks: object[]; type: 'full'; custom?: object; ocr?: object; } | { result_id: string; type: 'url'; url: string; }; usage: object; pdf_url?: string; studio_link?: string; }[]; split: { result: { section_mapping: object; splits: object[]; } | { splits: object[]; }; usage: object; }; edit?: { document_url: string; form_schema?: object[]; usage?: object; }; }`\n  - `usage: { num_pages: number; credit_breakdown?: object; credits?: number; page_billing_breakdown?: object; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst pipelineResponse = await client.pipeline.run({ input: 'string', pipeline_id: 'pipeline_id' });\n\nconsole.log(pipelineResponse);\n```",
  },
  {
    name: 'run_job',
    endpoint: '/pipeline_async',
    httpMethod: 'post',
    summary: 'Pipeline Async',
    description: 'Pipeline Async',
    stainlessPath: '(resource) pipeline > (method) run_job',
    qualified: 'client.pipeline.runJob',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      'pipeline_id: string;',
      "async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; };",
      'settings?: { document_password?: string; };',
    ],
    response: '{ job_id: string; }',
    markdown:
      "## run_job\n\n`client.pipeline.runJob(input: string | string[] | { file_id: string; presigned_url?: string; }, pipeline_id: string, async?: { metadata?: object; priority?: boolean; webhook?: svix_webhook_config | direct_webhook_config; }, settings?: { document_password?: string; }): { job_id: string; }`\n\n**post** `/pipeline_async`\n\nPipeline Async\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `pipeline_id: string`\n  The ID of the pipeline to use for the document.\n\n- `async?: { metadata?: object; priority?: boolean; webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }; }`\n  The configuration options for asynchronous processing (default synchronous).\n  - `metadata?: object`\n    JSON metadata included in webhook request body. Defaults to None.\n  - `priority?: boolean`\n    If True, attempts to process the job with priority if the user has priority processing budget available; by default, sync jobs are prioritized above async jobs.\n  - `webhook?: { channels?: string[]; mode?: 'svix'; } | { url: string; mode?: 'direct'; }`\n    The webhook configuration for the asynchronous processing.\n\n- `settings?: { document_password?: string; }`\n  Settings for pipeline execution that override pipeline defaults.\n  - `document_password?: string`\n    Password to decrypt password-protected documents.\n\n### Returns\n\n- `{ job_id: string; }`\n\n  - `job_id: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst asyncPipelineResponse = await client.pipeline.runJob({ input: 'string', pipeline_id: 'pipeline_id' });\n\nconsole.log(asyncPipelineResponse);\n```",
  },
  {
    name: 'run',
    endpoint: '/classify',
    httpMethod: 'post',
    summary: 'Classify',
    description: 'Classify',
    stainlessPath: '(resource) classify > (method) run',
    qualified: 'client.classify.run',
    params: [
      'input: string | string[] | { file_id: string; presigned_url?: string; };',
      'classification_schema?: { category: string; criteria: string[]; }[];',
      'document_metadata?: string;',
      'page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[];',
      'persist_results?: boolean;',
    ],
    response:
      '{ job_id: string; result: { category: string; }; duration?: number; response_confidence?: { categories: { category: string; confidence: number; criteria_confidence: object[]; }[]; }; }',
    markdown:
      "## run\n\n`client.classify.run(input: string | string[] | { file_id: string; presigned_url?: string; }, classification_schema?: { category: string; criteria: string[]; }[], document_metadata?: string, page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[], persist_results?: boolean): { job_id: string; result: object; duration?: number; response_confidence?: object; }`\n\n**post** `/classify`\n\nClassify\n\n### Parameters\n\n- `input: string | string[] | { file_id: string; presigned_url?: string; }`\n  For parse/split/extract pipelines, the URL of the document to be processed. You can provide one of the following:\n            1. A publicly available URL\n            2. A presigned S3 URL\n            3. A reducto:// prefixed URL obtained from the /upload endpoint after directly uploading a document\n            4. A jobid:// prefixed URL obtained from a previous /parse invocation\n            5. A list of URLs (for multi-document pipelines, V3 API only)\n\n            For edit pipelines, this should be a string containing the edit instructions \n\n- `classification_schema?: { category: string; criteria: string[]; }[]`\n  A list of classification categories and their matching criteria.\n\n- `document_metadata?: string`\n  Optional document-level metadata to include in classification prompts.\n\n- `page_range?: { end?: number; start?: number; } | { end?: number; start?: number; }[] | number[]`\n  The page range to process (1-indexed). By default, the first 5 pages are used. If more than 25 pages are selected, only the first 25 (after sorting) are used. Only applies to PDFs; ignored for other document types.\n\n- `persist_results?: boolean`\n  If True, persist the results indefinitely. Defaults to False.\n\n### Returns\n\n- `{ job_id: string; result: { category: string; }; duration?: number; response_confidence?: { categories: { category: string; confidence: number; criteria_confidence: object[]; }[]; }; }`\n  Response from classify job - returned when polling /job/{job_id}\n\n  - `job_id: string`\n  - `result: { category: string; }`\n  - `duration?: number`\n  - `response_confidence?: { categories: { category: string; confidence: number; criteria_confidence: { confidence: 'high' | 'low'; criterion: string; }[]; }[]; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst classifyResponse = await client.classify.run({ input: 'string' });\n\nconsole.log(classifyResponse);\n```",
  },
  {
    name: 'run',
    endpoint: '/configure_webhook',
    httpMethod: 'post',
    summary: 'Webhook Portal',
    description: 'Webhook Portal',
    stainlessPath: '(resource) webhook > (method) run',
    qualified: 'client.webhook.run',
    response: 'string',
    markdown:
      "## run\n\n`client.webhook.run(): string`\n\n**post** `/configure_webhook`\n\nWebhook Portal\n\n### Returns\n\n- `string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst response = await client.webhook.run();\n\nconsole.log(response);\n```",
  },
  {
    name: 'cancel',
    endpoint: '/cancel/{job_id}',
    httpMethod: 'post',
    summary: 'Cancel Job',
    description: 'Cancel Job',
    stainlessPath: '(resource) job > (method) cancel',
    qualified: 'client.job.cancel',
    params: ['job_id: string;'],
    response: 'object',
    markdown:
      "## cancel\n\n`client.job.cancel(job_id: string): object`\n\n**post** `/cancel/{job_id}`\n\nCancel Job\n\n### Parameters\n\n- `job_id: string`\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst response = await client.job.cancel('job_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get',
    endpoint: '/job/{job_id}',
    httpMethod: 'get',
    summary: 'Retrieve Parse',
    description: 'Retrieve Parse',
    stainlessPath: '(resource) job > (method) get',
    qualified: 'client.job.get',
    params: ['job_id: string;'],
    response:
      "{ status: 'Pending' | 'Completed' | 'Failed' | 'Idle'; progress?: number; reason?: string; result?: object | object | object | object | object | object | object; } | { status: 'Pending' | 'Completed' | 'Failed' | 'Idle'; bucket?: object; created_at?: string; duration?: number; num_pages?: number; progress?: number; raw_config?: string; reason?: string; result?: object | object | object | object | object | object | object; source?: object; total_pages?: number; type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify'; }",
    markdown:
      "## get\n\n`client.job.get(job_id: string): { status: 'Pending' | 'Completed' | 'Failed' | 'Idle'; progress?: number; reason?: string; result?: parse_response | extract_response | split_response | edit_response | pipeline_response | v3_extract | classify_response; } | { status: 'Pending' | 'Completed' | 'Failed' | 'Idle'; bucket?: object; created_at?: string; duration?: number; num_pages?: number; progress?: number; raw_config?: string; reason?: string; result?: parse_response | extract_response | split_response | edit_response | pipeline_response | v3_extract | classify_response; source?: object; total_pages?: number; type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify'; }`\n\n**get** `/job/{job_id}`\n\nRetrieve Parse\n\n### Parameters\n\n- `job_id: string`\n\n### Returns\n\n- `{ status: 'Pending' | 'Completed' | 'Failed' | 'Idle'; progress?: number; reason?: string; result?: { duration: number; job_id: string; result: object | object; usage: parse_usage; pdf_url?: string; studio_link?: string; } | { citations: object[]; result: object[]; usage: extract_usage; job_id?: string; studio_link?: string; } | { result: object | object; usage: parse_usage; } | { document_url: string; form_schema?: edit_widget[]; usage?: parse_usage; } | { job_id: string; result: object; usage: parse_usage; } | { result: object | object[]; usage: extract_usage; job_id?: string; studio_link?: string; } | { job_id: string; result: object; duration?: number; response_confidence?: object; }; } | { status: 'Pending' | 'Completed' | 'Failed' | 'Idle'; bucket?: object; created_at?: string; duration?: number; num_pages?: number; progress?: number; raw_config?: string; reason?: string; result?: { duration: number; job_id: string; result: object | object; usage: parse_usage; pdf_url?: string; studio_link?: string; } | { citations: object[]; result: object[]; usage: extract_usage; job_id?: string; studio_link?: string; } | { result: object | object; usage: parse_usage; } | { document_url: string; form_schema?: edit_widget[]; usage?: parse_usage; } | { job_id: string; result: object; usage: parse_usage; } | { result: object | object[]; usage: extract_usage; job_id?: string; studio_link?: string; } | { job_id: string; result: object; duration?: number; response_confidence?: object; }; source?: object; total_pages?: number; type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify'; }`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst job = await client.job.get('job_id');\n\nconsole.log(job);\n```",
  },
  {
    name: 'get_all',
    endpoint: '/jobs',
    httpMethod: 'get',
    summary: 'Get Jobs',
    description: 'Get Jobs',
    stainlessPath: '(resource) job > (method) get_all',
    qualified: 'client.job.getAll',
    params: ['cursor?: string;', 'exclude_configs?: boolean;', 'limit?: number;'],
    response:
      "{ jobs: { created_at: string; duration: number; job_id: string; num_pages: number; raw_config: string; status: 'Pending' | 'Completed' | 'Failed' | 'Idle' | 'InProgress' | 'Completing' | 'Cancelled'; total_pages: number; type: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify'; bucket?: object; source?: object; }[]; next_cursor?: string; }",
    markdown:
      "## get_all\n\n`client.job.getAll(cursor?: string, exclude_configs?: boolean, limit?: number): { jobs: object[]; next_cursor?: string; }`\n\n**get** `/jobs`\n\nGet Jobs\n\n### Parameters\n\n- `cursor?: string`\n  Cursor for pagination. Use the next_cursor from the previous response to fetch the next page.\n\n- `exclude_configs?: boolean`\n  Exclude raw_config from response to reduce size\n\n- `limit?: number`\n  Maximum number of jobs to return per page. Defaults to 100, max 500.\n\n### Returns\n\n- `{ jobs: { created_at: string; duration: number; job_id: string; num_pages: number; raw_config: string; status: 'Pending' | 'Completed' | 'Failed' | 'Idle' | 'InProgress' | 'Completing' | 'Cancelled'; total_pages: number; type: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify'; bucket?: object; source?: object; }[]; next_cursor?: string; }`\n\n  - `jobs: { created_at: string; duration: number; job_id: string; num_pages: number; raw_config: string; status: 'Pending' | 'Completed' | 'Failed' | 'Idle' | 'InProgress' | 'Completing' | 'Cancelled'; total_pages: number; type: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify'; bucket?: object; source?: object; }[]`\n  - `next_cursor?: string`\n\n### Example\n\n```typescript\nimport Reducto from 'reductoai';\n\nconst client = new Reducto();\n\nconst response = await client.job.getAll();\n\nconsole.log(response);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
