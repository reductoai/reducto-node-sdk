// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Uploadable } from '../core';

export type APIVersionResponse = unknown;

export interface UploadResponse {
  file_id: string;

  presigned_url?: string | null;
}

export interface UploadParams {
  /**
   * Query param:
   */
  extension?: string | null;

  /**
   * Body param:
   */
  file?: Uploadable;
}

export declare namespace TopLevel {
  export {
    type APIVersionResponse as APIVersionResponse,
    type UploadResponse as UploadResponse,
    type UploadParams as UploadParams,
  };
}
