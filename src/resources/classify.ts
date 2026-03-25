// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Classify extends APIResource {
  /**
   * Classify
   */
  run(body: ClassifyRunParams, options?: Core.RequestOptions): Core.APIPromise<ClassifyResponse> {
    return this._client.post('/classify', { body, ...options });
  }
}

/**
 * Response from classify job - returned when polling /job/{job_id}
 */
export interface ClassifyResponse {
  job_id: string;

  result: ClassifyResponse.Result;

  /**
   * The duration of the classify request in seconds.
   */
  duration?: number | null;

  /**
   * Overall confidence breakdown for classification response.
   */
  response_confidence?: ClassifyResponse.ResponseConfidence | null;
}

export namespace ClassifyResponse {
  export interface Result {
    category: string;
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

export interface ClassifyRunParams {
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
   * A list of classification categories and their matching criteria.
   */
  classification_schema?: Array<ClassifyRunParams.ClassificationSchema>;

  /**
   * Optional document-level metadata to include in classification prompts.
   */
  document_metadata?: string | null;

  /**
   * The page range to process (1-indexed). By default, the first 5 pages are used.
   * If more than 25 pages are selected, only the first 25 (after sorting) are used.
   * Only applies to PDFs; ignored for other document types.
   */
  page_range?: PageRange | Array<PageRange> | Array<number> | null;

  /**
   * If True, persist the results indefinitely. Defaults to False.
   */
  persist_results?: boolean;
}

export namespace ClassifyRunParams {
  /**
   * A single classification category with its matching criteria.
   */
  export interface ClassificationSchema {
    /**
     * The category name/label that documents will be classified into (e.g., 'invoice',
     * 'contract', 'receipt').
     */
    category: string;

    /**
     * A list of criteria, keywords, or descriptions that define what characteristics a
     * document must have to be classified into this category (e.g., ['contains billing
     * information', 'has itemized charges']).
     */
    criteria: Array<string>;
  }
}

export declare namespace Classify {
  export {
    type ClassifyResponse as ClassifyResponse,
    type PageRange as PageRange,
    type ClassifyRunParams as ClassifyRunParams,
  };
}
