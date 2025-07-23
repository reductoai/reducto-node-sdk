// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Edit extends APIResource {
  /**
   * Edit
   */
  run(body: EditRunParams, options?: Core.RequestOptions): Core.APIPromise<EditRunResponse> {
    return this._client.post('/edit', { body, ...options });
  }

  /**
   * Edit Async
   */
  runJob(body: EditRunJobParams, options?: Core.RequestOptions): Core.APIPromise<EditRunJobResponse> {
    return this._client.post('/edit_async', { body, ...options });
  }
}

export interface EditRunResponse {
  document_url: string;
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
  }
}

export declare namespace Edit {
  export {
    type EditRunResponse as EditRunResponse,
    type EditRunJobResponse as EditRunJobResponse,
    type EditRunParams as EditRunParams,
    type EditRunJobParams as EditRunJobParams,
  };
}
