// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
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

  /**
   * Get Jobs
   */
  getAll(query?: JobGetAllParams, options?: Core.RequestOptions): Core.APIPromise<JobGetAllResponse>;
  getAll(options?: Core.RequestOptions): Core.APIPromise<JobGetAllResponse>;
  getAll(
    query: JobGetAllParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<JobGetAllResponse> {
    if (isRequestOptions(query)) {
      return this.getAll({}, query);
    }
    return this._client.get('/jobs', { query, ...options });
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
      | Shared.PipelineResponse
      | Shared.V3ExtractResponse
      | null;
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
      | Shared.PipelineResponse
      | Shared.V3ExtractResponse
      | null;

    source?: unknown;

    total_pages?: number | null;

    type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | null;
  }
}

export interface JobGetAllResponse {
  /**
   * List of jobs with their job_id, status, type, raw_config, created_at, num_pages
   * and duration
   */
  jobs: Array<JobGetAllResponse.Job>;

  /**
   * Cursor to fetch the next page of results. If null, there are no more results.
   */
  next_cursor?: string | null;
}

export namespace JobGetAllResponse {
  export interface Job {
    created_at: string;

    duration: number | null;

    job_id: string;

    num_pages: number | null;

    raw_config: string;

    status: 'Pending' | 'Completed' | 'Failed' | 'Idle' | 'InProgress' | 'Completing' | 'Cancelled';

    total_pages: number | null;

    type: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline';

    bucket?: unknown;

    source?: unknown;
  }
}

export interface JobGetAllParams {
  /**
   * Cursor for pagination. Use the next_cursor from the previous response to fetch
   * the next page.
   */
  cursor?: string | null;

  /**
   * Exclude raw_config from response to reduce size
   */
  exclude_configs?: boolean;

  /**
   * Maximum number of jobs to return per page. Defaults to 100, max 500.
   */
  limit?: number;
}

export declare namespace Job {
  export {
    type JobCancelResponse as JobCancelResponse,
    type JobGetResponse as JobGetResponse,
    type JobGetAllResponse as JobGetAllResponse,
    type JobGetAllParams as JobGetAllParams,
  };
}
