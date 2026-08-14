// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ExtractAPI from './extract';
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

    /**
     * Structured error body returned to customers.
     *
     * Matches the format specified in `ERROR_POLICY.md`.
     */
    error?: AsyncJobResponse.Error | null;

    progress?: number | null;

    reason?: string | null;

    /**
     * Response from classify job - returned when polling /job/{job_id}
     */
    result?:
      | Shared.ParseResponse
      | Shared.ExtractResponse
      | Shared.SplitResponse
      | Shared.EditResponse
      | Shared.PipelineResponse
      | ExtractAPI.V3Extract
      | Shared.ClassifyResponse
      | null;
  }

  export namespace AsyncJobResponse {
    /**
     * Structured error body returned to customers.
     *
     * Matches the format specified in `ERROR_POLICY.md`.
     */
    export interface Error {
      code: number;

      message: string;

      /**
       * Machine-readable error names returned in API error responses.
       *
       * Each member maps to a category (Transient / Processing / Input) and a default
       * HTTP status code defined in `ERROR_CODE_DEFAULTS`. The enum value is the string
       * customers see in the `error.name` field.
       */
      name:
        | 'TIMEOUT'
        | 'CUSTOMER_TIMEOUT'
        | 'INTERNAL_ERROR'
        | 'SERVICE_UNAVAILABLE'
        | 'GPU_ALLOCATION_ERROR'
        | 'GPU_POOL_SATURATED'
        | 'BATCH_QUEUE_FULL'
        | 'JOB_STATE_ERROR'
        | 'DOCUMENT_CORRUPT'
        | 'DOCUMENT_EMPTY'
        | 'DOCUMENT_UNSUPPORTED'
        | 'DOCUMENT_TOO_LARGE'
        | 'OFFICE_CONVERSION_TOO_LARGE'
        | 'IMAGE_TOO_LARGE'
        | 'IMAGE_TOO_SMALL'
        | 'IMAGE_INVALID_ASPECT_RATIO'
        | 'DOCUMENT_PASSWORD_PROTECTED'
        | 'FORM_FILL_FAILED'
        | 'INTERNAL_INVARIANT_VIOLATION'
        | 'GPU_UNAVAILABLE'
        | 'CONTEXT_WINDOW_EXCEEDED'
        | 'PROCESSING_FAILED'
        | 'INFERENCE_METHOD_UNSUPPORTED'
        | 'SUBPROCESS_CRASHED'
        | 'BATCH_ORPHANED'
        | 'OVERSIZED_RESULT'
        | 'LLM_OUTPUT_PARSE_FAILED'
        | 'LLM_PROVIDER_ERROR'
        | 'INVALID_CONFIG'
        | 'INVALID_SCHEMA'
        | 'AUTH_ERROR'
        | 'NOT_APPLICABLE'
        | 'REGION_UNAVAILABLE'
        | 'NOT_FOUND'
        | 'JOB_DELETION_IN_PROGRESS'
        | 'JOB_DELETED'
        | 'JOB_NOT_COMPLETE'
        | 'JOB_CANCELLED'
        | 'RATE_LIMIT'
        | 'CELL_COUNT_EXCEEDED';

      job_id?: string | null;
    }
  }

  export interface EnhancedAsyncJobResponse {
    status: 'Pending' | 'Completed' | 'Failed' | 'Idle';

    bucket?: unknown;

    created_at?: string | null;

    duration?: number | null;

    /**
     * Structured error body returned to customers.
     *
     * Matches the format specified in `ERROR_POLICY.md`.
     */
    error?: EnhancedAsyncJobResponse.Error | null;

    num_pages?: number | null;

    progress?: number | null;

    raw_config?: string | null;

    reason?: string | null;

    /**
     * Response from classify job - returned when polling /job/{job_id}
     */
    result?:
      | Shared.ParseResponse
      | Shared.ExtractResponse
      | Shared.SplitResponse
      | Shared.EditResponse
      | Shared.PipelineResponse
      | ExtractAPI.V3Extract
      | Shared.ClassifyResponse
      | null;

    source?: unknown;

    total_pages?: number | null;

    type?: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify' | null;
  }

  export namespace EnhancedAsyncJobResponse {
    /**
     * Structured error body returned to customers.
     *
     * Matches the format specified in `ERROR_POLICY.md`.
     */
    export interface Error {
      code: number;

      message: string;

      /**
       * Machine-readable error names returned in API error responses.
       *
       * Each member maps to a category (Transient / Processing / Input) and a default
       * HTTP status code defined in `ERROR_CODE_DEFAULTS`. The enum value is the string
       * customers see in the `error.name` field.
       */
      name:
        | 'TIMEOUT'
        | 'CUSTOMER_TIMEOUT'
        | 'INTERNAL_ERROR'
        | 'SERVICE_UNAVAILABLE'
        | 'GPU_ALLOCATION_ERROR'
        | 'GPU_POOL_SATURATED'
        | 'BATCH_QUEUE_FULL'
        | 'JOB_STATE_ERROR'
        | 'DOCUMENT_CORRUPT'
        | 'DOCUMENT_EMPTY'
        | 'DOCUMENT_UNSUPPORTED'
        | 'DOCUMENT_TOO_LARGE'
        | 'OFFICE_CONVERSION_TOO_LARGE'
        | 'IMAGE_TOO_LARGE'
        | 'IMAGE_TOO_SMALL'
        | 'IMAGE_INVALID_ASPECT_RATIO'
        | 'DOCUMENT_PASSWORD_PROTECTED'
        | 'FORM_FILL_FAILED'
        | 'INTERNAL_INVARIANT_VIOLATION'
        | 'GPU_UNAVAILABLE'
        | 'CONTEXT_WINDOW_EXCEEDED'
        | 'PROCESSING_FAILED'
        | 'INFERENCE_METHOD_UNSUPPORTED'
        | 'SUBPROCESS_CRASHED'
        | 'BATCH_ORPHANED'
        | 'OVERSIZED_RESULT'
        | 'LLM_OUTPUT_PARSE_FAILED'
        | 'LLM_PROVIDER_ERROR'
        | 'INVALID_CONFIG'
        | 'INVALID_SCHEMA'
        | 'AUTH_ERROR'
        | 'NOT_APPLICABLE'
        | 'REGION_UNAVAILABLE'
        | 'NOT_FOUND'
        | 'JOB_DELETION_IN_PROGRESS'
        | 'JOB_DELETED'
        | 'JOB_NOT_COMPLETE'
        | 'JOB_CANCELLED'
        | 'RATE_LIMIT'
        | 'CELL_COUNT_EXCEEDED';

      job_id?: string | null;
    }
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

    type: 'Parse' | 'Extract' | 'Split' | 'Edit' | 'Pipeline' | 'Classify';

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
