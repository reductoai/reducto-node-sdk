// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Classify extends APIResource {
  /**
   * Classify
   */
  run(body: ClassifyRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.ClassifyResponse> {
    return this._client.post('/classify', { body, ...options });
  }
}

export interface ClassifyRunParams {
  /**
   * The URL of the document to be classified. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  input: string | Array<string> | Shared.Upload;

  /**
   * A mapping of higher-level classify groups to the category labels that belong to
   * each group. When provided, the response includes `extra_metadata.grouping` with
   * the matched group name, or `ungrouped` if the selected category is not in any
   * group.
   */
  category_groups?: { [key: string]: Array<string> };

  /**
   * A list of classification categories and their matching criteria.
   */
  classification_schema?: Array<ClassifyRunParams.ClassificationSchema>;

  /**
   * Optional document-level metadata to include in classification prompts.
   */
  document_metadata?: string | null;

  /**
   * Force the endpoint result to be returned in URL form.
   */
  force_url_result?: boolean;

  /**
   * The classification model to use. Set to "accurate" to run Deep Classify for
   * higher accuracy on hard documents. Defaults to "default".
   */
  model?: 'default' | 'accurate';

  /**
   * The page range to process (1-indexed). By default, the first 5 pages are used.
   * At most 10 pages can be selected. Only applies to PDFs; ignored for other
   * document types.
   */
  page_range?: Shared.PageRange | Array<Shared.PageRange> | Array<number> | null;

  /**
   * Workers poll the priority queue ahead of the standard queue, so priority jobs
   * start sooner when there is queued work; sync jobs are prioritized above async
   * jobs by default.
   */
  priority?: boolean;
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
  export { type ClassifyRunParams as ClassifyRunParams };
}
