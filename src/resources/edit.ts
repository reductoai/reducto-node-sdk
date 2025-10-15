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
  runJob(body: EditRunJobParams, options?: Core.RequestOptions): Core.APIPromise<EditRunJobResponse> {
    return this._client.post('/edit_async', { body, ...options });
  }
}

export interface EditRunJobResponse {
  job_id: string;
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

  edit_options?: EditRunParams.EditOptions;

  /**
   * Form schema for PDF forms. List of widgets with their types, descriptions, and
   * bounding boxes. Only works for PDFs.
   */
  form_schema?: Array<EditRunParams.FormSchema> | null;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;
}

export namespace EditRunParams {
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
     * The LLM provider to use for edit processing. If not specified, defaults to
     * 'google'
     */
    llm_provider_preference?: 'openai' | 'anthropic' | 'google' | null;
  }

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

  edit_options?: EditRunJobParams.EditOptions;

  /**
   * Form schema for PDF forms. List of widgets with their types, descriptions, and
   * bounding boxes. Only works for PDFs.
   */
  form_schema?: Array<EditRunJobParams.FormSchema> | null;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  webhook?: Shared.WebhookConfigNew;
}

export namespace EditRunJobParams {
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
     * The LLM provider to use for edit processing. If not specified, defaults to
     * 'google'
     */
    llm_provider_preference?: 'openai' | 'anthropic' | 'google' | null;
  }

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

export declare namespace Edit {
  export {
    type EditRunJobResponse as EditRunJobResponse,
    type EditRunParams as EditRunParams,
    type EditRunJobParams as EditRunJobParams,
  };
}
