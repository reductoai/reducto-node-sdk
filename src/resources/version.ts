// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Version extends APIResource {
  /**
   * Get Version
   */
  retrieve(options?: Core.RequestOptions): Core.APIPromise<string> {
    return this._client.get('/version', options);
  }
}

export type VersionRetrieveResponse = string;

export declare namespace Version {
  export { type VersionRetrieveResponse as VersionRetrieveResponse };
}
