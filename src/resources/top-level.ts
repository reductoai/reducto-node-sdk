// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Uploadable } from '../uploads';

export type APIVersionResponse = string;

export interface UploadParams {
  /**
   * Query param
   */
  extension?: string | null;

  /**
   * Body param: The file to upload. Accepts a file path string, a `File`/`Blob`
   * object, a `fetch` `Response`, or a Node.js `fs.createReadStream()`.
   */
  file?: Uploadable | string | null;
}

export declare namespace TopLevel {
  export { type APIVersionResponse as APIVersionResponse, type UploadParams as UploadParams };
}
