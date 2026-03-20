// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as JobAPI from './job';
import * as ClassifyAPI from './classify';
import * as EditAPI from './edit';
import * as ExtractAPI from './extract';
import * as ParseAPI from './parse';
import * as PipelineAPI from './pipeline';
import * as SplitAPI from './split';

export class Job extends APIResource {
  /**
   * Retrieve Parse
   */
  retrieve(jobId: string, options?: Core.RequestOptions): Core.APIPromise<JobRetrieveResponse> {
    return this._client.get(`/job/${jobId}`, options);
  }

  /**
   * Get Jobs
   */
  list(query?: JobListParams, options?: Core.RequestOptions): Core.APIPromise<JobListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<JobListResponse>;
  list(
    query: JobListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<JobListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/jobs', { query, ...options });
  }
}

export interface ExtractResponse {
  /**
   * The citations corresponding to the extracted response.
   */
  citations: Array<unknown> | null;

  /**
   * The extracted response in your provided schema. This is a list of dictionaries.
   * If disable_chunking is True (default), then it will be a list of length one.
   */
  result: Array<unknown>;

  usage: ExtractAPI.ExtractUsage;

  job_id?: string | null;

  /**
   * The link to the studio pipeline for the document.
   */
  studio_link?: string | null;
}

export type JobRetrieveResponse =
  | JobRetrieveResponse.AsyncJobResponse
  | JobRetrieveResponse.EnhancedAsyncJobResponse;

export namespace JobRetrieveResponse {
  export interface AsyncJobResponse {
    status: 'Pending' | 'Completed' | 'Failed' | 'Idle';

    progress?: number | null;

    reason?: string | null;

    /**
     * Response from classify job - returned when polling /job/{job_id}
     */
    result?:
      | ParseAPI.ParseResponse
      | JobAPI.ExtractResponse
      | SplitAPI.SplitResponse
      | EditAPI.EditResponse
      | PipelineAPI.PipelineResponse
      | ExtractAPI.V3Extract
      | ClassifyAPI.ClassifyResponse
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

    /**
     * Response from classify job - returned when polling /job/{job_id}
     */
    result?:
      | ParseAPI.ParseResponse
      | JobAPI.ExtractResponse
      | SplitAPI.SplitResponse
      | EditAPI.EditResponse
      | PipelineAPI.PipelineResponse
      | ExtractAPI.V3Extract
      | ClassifyAPI.ClassifyResponse
      | null;

    source?: unknown;

    total_pages?: number | null;

    type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify' | null;
  }
}

export interface JobListResponse {
  /**
   * List of jobs with their job_id, status, type, raw_config, created_at, num_pages
   * and duration
   */
  jobs: Array<JobListResponse.Job>;

  /**
   * Cursor to fetch the next page of results. If null, there are no more results.
   */
  next_cursor?: string | null;
}

export namespace JobListResponse {
  export interface Job {
    created_at: string;

    duration: number | null;

    job_id: string;

    num_pages: number | null;

    raw_config: string;

    status: 'Pending' | 'Completed' | 'Failed' | 'Idle' | 'InProgress' | 'Completing' | 'Cancelled';

    total_pages: number | null;

    type: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify';

    bucket?: unknown;

    source?: unknown;
  }
}

export interface JobListParams {
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
    type ExtractResponse as ExtractResponse,
    type JobRetrieveResponse as JobRetrieveResponse,
    type JobListResponse as JobListResponse,
    type JobListParams as JobListParams,
  };
}
