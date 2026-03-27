// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export type APIVersionResponse = string;

export interface UploadParams {
  /**
   * Query param
   */
  query_extension?: string | null;

  /**
   * Body param
   */
  body_extension?: string;
}

export declare namespace TopLevel {
  export { type APIVersionResponse as APIVersionResponse, type UploadParams as UploadParams };
}
