// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Uploadable } from '../core';

export type APIVersionResponse = unknown;

export interface UploadParams {
  /**
   * Query param:
   */
  extension?: string | null;

  /**
   * Body param:
   */
  file?: Uploadable | null;
}

export declare namespace TopLevel {
  export { type APIVersionResponse as APIVersionResponse, type UploadParams as UploadParams };
}
