// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as EditAPI from './edit';
import * as UploadAPI from './upload';

export class EditAsync extends APIResource {
  /**
   * Edit Async
   */
  create(
    body: EditAsyncCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EditAsyncCreateResponse> {
    return this._client.post('/edit_async', { body, ...options });
  }
}

export interface EditAsyncCreateResponse {
  job_id: string;
}

export interface EditAsyncCreateParams {
  /**
   * The URL of the document to be processed. You can provide one of the following:
   *
   * 1. A publicly available URL
   * 2. A presigned S3 URL
   * 3. A reducto:// prefixed URL obtained from the /upload endpoint after directly
   *    uploading a document
   */
  document_url: string | UploadAPI.UploadResponse;

  /**
   * The instructions for the edit.
   */
  edit_instructions: string;

  edit_options?: EditAPI.EditOptions;

  /**
   * Form schema for PDF forms. List of widgets with their types, descriptions, and
   * bounding boxes. Only works for PDFs.
   */
  form_schema?: Array<EditAPI.EditWidget> | null;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  webhook?: EditAsyncCreateParams.Webhook;
}

export namespace EditAsyncCreateParams {
  export interface Webhook {
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
}

export declare namespace EditAsync {
  export {
    type EditAsyncCreateResponse as EditAsyncCreateResponse,
    type EditAsyncCreateParams as EditAsyncCreateParams,
  };
}
