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
   * document 4. A jobid:// prefixed URL obtained from a previous /parse invocation
   */
  input: string | Shared.Upload;

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
   * document 4. A jobid:// prefixed URL obtained from a previous /parse invocation
   */
  input: string | Shared.Upload;

  /**
   * The ID of the pipeline to use for the document.
   */
  pipeline_id: string;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: PipelineRunJobParams.Async;
}

export namespace PipelineRunJobParams {
  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  export interface Async {
    /**
     * JSON metadata included in webhook request body. Defaults to None.
     */
    metadata?: unknown;

    /**
     * If True, attempts to process the job with priority if the user has priority
     * processing budget available; by default, sync jobs are prioritized above async
     * jobs.
     */
    priority?: boolean;

    /**
     * The webhook configuration for the asynchronous processing.
     */
    webhook?: Async.SvixWebhookConfig | Async.DirectWebhookConfig | null;
  }

  export namespace Async {
    export interface SvixWebhookConfig {
      /**
       * A list of Svix channels the message will be delivered down, omit to send to all
       * channels.
       */
      channels?: Array<string>;

      mode?: 'svix';
    }

    export interface DirectWebhookConfig {
      url: string;

      mode?: 'direct';
    }
  }
}

export declare namespace Pipeline {
  export {
    type PipelineRunJobResponse as PipelineRunJobResponse,
    type PipelineRunParams as PipelineRunParams,
    type PipelineRunJobParams as PipelineRunJobParams,
  };
}
