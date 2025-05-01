// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Job extends APIResource {
  /**
   * Cancel Job
   */
  cancel(jobId: string, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this._client.post(`/cancel/${jobId}`, options);
  }

  /**
   * Retrieve Parse
   */
  get(jobId: string, options?: Core.RequestOptions): Core.APIPromise<JobGetResponse> {
    return this._client.get(`/job/${jobId}`, options);
  }
}

export type JobCancelResponse = unknown;

export interface JobGetResponse {
  status: 'Pending' | 'Completed' | 'Failed' | 'Idle';

  progress?: number | null;

  reason?: string | null;

  result?:
    | Shared.ParseResponse
    | Shared.ExtractResponse
    | Shared.SplitResponse
    | JobGetResponse.EditResponse
    | null;
}

export namespace JobGetResponse {
  export interface EditResponse {
    document_url: string;
  }
}

export declare namespace Job {
  export { type JobCancelResponse as JobCancelResponse, type JobGetResponse as JobGetResponse };
}
