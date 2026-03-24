// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as EditAPI from './edit';
import * as ParseAsyncAPI from './parse-async';
import * as SplitAPI from './split';
import * as UploadAPI from './upload';

export class Parse extends APIResource {
  /**
   * Parse
   */
  create(body: ParseCreateParams, options?: Core.RequestOptions): Core.APIPromise<ParseCreateResponse> {
    return this._client.post('/parse', { body, ...options });
  }
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
}

export type ParseCreateResponse = ParseResponse | ParseAsyncAPI.AsyncParseResponse;

export type ParseCreateParams = ParseCreateParams.SyncParseConfig | ParseCreateParams.AsyncParseConfig;

export declare namespace ParseCreateParams {
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
    input: string | Array<string> | UploadAPI.UploadResponse;

    enhance?: ParseAsyncAPI.Enhance;

    formatting?: ParseAsyncAPI.Formatting;

    retrieval?: ParseAsyncAPI.Retrieval;

    settings?: ParseAsyncAPI.Settings;

    spreadsheet?: ParseAsyncAPI.Spreadsheet;
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
    async?: ParseAsyncAPI.AsyncConfigV3;

    enhance?: ParseAsyncAPI.Enhance;

    formatting?: ParseAsyncAPI.Formatting;

    /**
     * Queue priority. 'batch' for non-urgent work that processes when spare GPU
     * capacity is available.
     */
    queue_priority?: 'auto' | 'batch';

    retrieval?: ParseAsyncAPI.Retrieval;

    settings?: ParseAsyncAPI.Settings;

    spreadsheet?: ParseAsyncAPI.Spreadsheet;
  }
}

export declare namespace Parse {
  export {
    type ParseResponse as ParseResponse,
    type ParseCreateResponse as ParseCreateResponse,
    type ParseCreateParams as ParseCreateParams,
  };
}
