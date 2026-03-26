// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Edit extends APIResource {
  /**
   * Edit
   */
  run(body: EditRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.EditResponse> {
    return this._client.post('/edit', { body, ...options });
  }

  /**
   * Edit Async
   */
  runJob(body: EditRunJobParams, options?: Core.RequestOptions): Core.APIPromise<Shared.AsyncEditResponse> {
    return this._client.post('/edit_async', { body, ...options });
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
  original_page?: number;
}

export interface EditOptions {
  /**
   * The color to use for edits, in hex format.
   */
  color?: string;

  /**
   * If True, creates overflow pages for text that doesn't fit in form fields.
   * Defaults to False.
   */
  enable_overflow_pages?: boolean;

  /**
   * If True, flattens form fields after filling, converting them to static content.
   * Defaults to False.
   */
  flatten?: boolean;

  /**
   * The font size (in points) to use for filled text fields. If not specified, font
   * size is automatically calculated based on field dimensions.
   */
  font_size?: number | null;

  /**
   * The LLM provider to use for edit processing. If not specified, defaults to
   * 'google'
   */
  llm_provider_preference?: 'openai' | 'anthropic' | 'google' | null;
}

export interface EditWidget {
  /**
   * Bounding box coordinates of the widget
   */
  bbox: BoundingBox;

  /**
   * Description of the widget extracted from the document
   */
  description: string;

  /**
   * Type of the form widget
   */
  type: 'text' | 'checkbox' | 'radio' | 'dropdown' | 'barcode';

  /**
   * If True (default), the system will attempt to fill this widget. If False, the
   * widget will be created but intentionally left unfilled.
   */
  fill?: boolean;

  /**
   * Font size in points for this specific field. Takes priority over the global
   * font_size in EditOptions. If not set, falls back to the global font_size, then
   * to auto-calculated sizing.
   */
  font_size?: number | null;

  /**
   * If provided, this value will be used directly instead of attempting to
   * intelligently determine the field value.
   */
  value?: string | null;
}

export interface EditRunParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  /**
   * The instructions for the edit.
   */
  edit_instructions: string;

  edit_options?: EditOptions;

  /**
   * Form schema for PDF forms. List of widgets with their types, descriptions, and
   * bounding boxes. Only works for PDFs.
   */
  form_schema?: Array<EditWidget> | null;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;
}

export interface EditRunJobParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | Shared.Upload;

  /**
   * The instructions for the edit.
   */
  edit_instructions: string;

  edit_options?: EditOptions;

  /**
   * Form schema for PDF forms. List of widgets with their types, descriptions, and
   * bounding boxes. Only works for PDFs.
   */
  form_schema?: Array<EditWidget> | null;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  webhook?: Shared.WebhookConfigNew;
}

export declare namespace Edit {
  export {
    type BoundingBox as BoundingBox,
    type EditOptions as EditOptions,
    type EditWidget as EditWidget,
    type EditRunParams as EditRunParams,
    type EditRunJobParams as EditRunJobParams,
  };
}
