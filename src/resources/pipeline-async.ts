// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ParseAsyncAPI from './parse-async';
import * as PipelineAPI from './pipeline';
import * as UploadAPI from './upload';

export class PipelineAsync extends APIResource {
  /**
   * Pipeline Async
   */
  create(
    body: PipelineAsyncCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PipelineAsyncCreateResponse> {
    return this._client.post('/pipeline_async', { body, ...options });
  }
}

export interface PipelineAsyncCreateResponse {
  job_id: string;
}

export interface PipelineAsyncCreateParams {
  /**
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation 5. A list of URLs (for multi-document pipelines, V3
   * API only)
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Array<string> | UploadAPI.UploadResponse;

  /**
   * The ID of the pipeline to use for the document.
   */
  pipeline_id: string;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: ParseAsyncAPI.AsyncConfigV3;

  /**
   * Settings for pipeline execution that override pipeline defaults.
   */
  settings?: PipelineAPI.PipelineSettings;
}

export declare namespace PipelineAsync {
  export {
    type PipelineAsyncCreateResponse as PipelineAsyncCreateResponse,
    type PipelineAsyncCreateParams as PipelineAsyncCreateParams,
  };
}
