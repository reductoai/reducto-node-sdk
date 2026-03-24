// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Upload extends APIResource {
  /**
   * Upload
   */
  create(params?: UploadCreateParams, options?: Core.RequestOptions): Core.APIPromise<UploadResponse>;
  create(options?: Core.RequestOptions): Core.APIPromise<UploadResponse>;
  create(
    params: UploadCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<UploadResponse> {
    if (isRequestOptions(params)) {
      return this.create({}, params);
    }
    const { extension, ...body } = params;
    return this._client.post(
      '/upload',
      Core.maybeMultipartFormRequestOptions({ query: { extension }, body, ...options }),
    );
  }
}

export interface UploadResponse {
  file_id: string;

  presigned_url?: string | null;
}

export interface UploadCreateParams {
  /**
   * Query param
   */
  extension?: string | null;

  /**
   * Body param
   */
  file?: string | null;
}

export declare namespace Upload {
  export { type UploadResponse as UploadResponse, type UploadCreateParams as UploadCreateParams };
}
