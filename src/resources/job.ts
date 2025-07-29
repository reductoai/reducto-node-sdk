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

export type JobGetResponse = JobGetResponse.AsyncJobResponse | JobGetResponse.EnhancedAsyncJobResponse;

export namespace JobGetResponse {
  export interface AsyncJobResponse {
    status: 'Pending' | 'Completed' | 'Failed' | 'Idle';

    progress?: number | null;

    reason?: string | null;

    result?:
      | Shared.ParseResponse
      | Shared.ExtractResponse
      | Shared.SplitResponse
      | AsyncJobResponse.EditResponse
      | null;
  }

  export namespace AsyncJobResponse {
    export interface EditResponse {
      document_url: string;

      form_schema?: Array<EditResponse.FormSchema> | null;
    }

    export namespace EditResponse {
      export interface FormSchema {
        bbox: Shared.BoundingBox;

        description: string;

        type: 'text' | 'checkbox' | 'dropdown' | 'barcode';
      }
    }
  }

  export interface EnhancedAsyncJobResponse {
    status: 'Pending' | 'Completed' | 'Failed' | 'Idle';

    created_at?: string | null;

    duration?: number | null;

    num_pages?: number | null;

    progress?: number | null;

    raw_config?: string | null;

    reason?: string | null;

    result?:
      | Shared.ParseResponse
      | Shared.ExtractResponse
      | Shared.SplitResponse
      | EnhancedAsyncJobResponse.EditResponse
      | null;

    source?: unknown;

    type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | null;
  }

  export namespace EnhancedAsyncJobResponse {
    export interface EditResponse {
      document_url: string;

      form_schema?: Array<EditResponse.FormSchema> | null;
    }

    export namespace EditResponse {
      export interface FormSchema {
        bbox: Shared.BoundingBox;

        description: string;

        type: 'text' | 'checkbox' | 'dropdown' | 'barcode';
      }
    }
  }
}

export declare namespace Job {
  export { type JobCancelResponse as JobCancelResponse, type JobGetResponse as JobGetResponse };
}
