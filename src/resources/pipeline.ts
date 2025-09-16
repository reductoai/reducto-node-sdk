// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Pipeline extends APIResource {
  /**
   * Pipeline
   */
  run(body: PipelineRunParams, options?: Core.RequestOptions): Core.APIPromise<Shared.PipelineResponse> {
    return this._client.post('/pipeline', { body, ...options });
  }

  /**
   * Pipeline Async
   */
  runJob(body: PipelineRunJobParams, options?: Core.RequestOptions): Core.APIPromise<PipelineRunJobResponse> {
    return this._client.post('/pipeline_async', { body, ...options });
  }
}

export interface PipelineRunJobResponse {
  job_id: string;
}

export interface PipelineRunParams {
  /**
   * The URL of the document to be processed. You can provide one of the
   * following: 1. A publicly available URL 2. A presigned S3 URL 3. A reducto://
   * prefixed URL obtained from the /upload endpoint after directly uploading a
   * document
   */
  document_url: string | Shared.Upload;

  /**
   * The ID of the pipeline to use for the document.
   */
  pipeline_id: string;
}

export interface PipelineRunJobParams {
  /**
   * The URL of the document to be processed. You can provide one of the
   * following: 1. A publicly available URL 2. A presigned S3 URL 3. A reducto://
   * prefixed URL obtained from the /upload endpoint after directly uploading a
   * document
   */
  document_url: string | Shared.Upload;

  /**
   * The ID of the pipeline to use for the document.
   */
  pipeline_id: string;

  /**
   * If True, attempts to process the job with priority if the user has priority
   * processing budget available; by default, sync jobs are prioritized above async
   * jobs.
   */
  priority?: boolean;

  webhook?: Shared.WebhookConfigNew;
}

export declare namespace Pipeline {
  export {
    type PipelineRunJobResponse as PipelineRunJobResponse,
    type PipelineRunParams as PipelineRunParams,
    type PipelineRunJobParams as PipelineRunJobParams,
  };
}
