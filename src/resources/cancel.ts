// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Cancel extends APIResource {
  /**
   * Cancel Job
   */
  cancelJob(jobId: string, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this._client.post(`/cancel/${jobId}`, options);
  }
}

export type CancelCancelJobResponse = unknown;

export declare namespace Cancel {
  export { type CancelCancelJobResponse as CancelCancelJobResponse };
}
