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
      | Shared.EditResponse
      | AsyncJobResponse.PipelineResponse
      | null;
  }

  export namespace AsyncJobResponse {
    export interface PipelineResponse {
      job_id: string;

      result: PipelineResponse.Result;

      usage: Shared.ParseUsage;
    }

    export namespace PipelineResponse {
      export interface Result {
        extract: Array<Result.UnionMember0> | Shared.ExtractResponse | null;

        parse: Shared.ParseResponse | null;

        split: Shared.SplitResponse | null;
      }

      export namespace Result {
        /**
         * This is the response format for Extract -> Split Pipelines
         */
        export interface UnionMember0 {
          page_range: Array<number>;

          result: Shared.ExtractResponse;

          split_name: string;

          partition?: string | null;
        }
      }
    }
  }

  export interface EnhancedAsyncJobResponse {
    status: 'Pending' | 'Completed' | 'Failed' | 'Idle';

    bucket?: unknown;

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
      | Shared.EditResponse
      | EnhancedAsyncJobResponse.PipelineResponse
      | null;

    source?: unknown;

    total_pages?: number | null;

    type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | null;
  }

  export namespace EnhancedAsyncJobResponse {
    export interface PipelineResponse {
      job_id: string;

      result: PipelineResponse.Result;

      usage: Shared.ParseUsage;
    }

    export namespace PipelineResponse {
      export interface Result {
        extract: Array<Result.UnionMember0> | Shared.ExtractResponse | null;

        parse: Shared.ParseResponse | null;

        split: Shared.SplitResponse | null;
      }

      export namespace Result {
        /**
         * This is the response format for Extract -> Split Pipelines
         */
        export interface UnionMember0 {
          page_range: Array<number>;

          result: Shared.ExtractResponse;

          split_name: string;

          partition?: string | null;
        }
      }
    }
  }
}

export declare namespace Job {
  export { type JobCancelResponse as JobCancelResponse, type JobGetResponse as JobGetResponse };
}
