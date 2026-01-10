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
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation 5. A list of URLs (for multi-document pipelines, V3
   * API only)
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Array<string> | Shared.Upload;

  /**
   * The ID of the pipeline to use for the document.
   */
  pipeline_id: string;

  /**
   * Settings for pipeline execution that override pipeline defaults.
   */
  settings?: PipelineRunParams.Settings;
}

export namespace PipelineRunParams {
  /**
   * Settings for pipeline execution that override pipeline defaults.
   */
  export interface Settings {
    /**
     * Password to decrypt password-protected documents.
     */
    document_password?: string | null;
  }
}

export interface PipelineRunJobParams {
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
  input: string | Array<string> | Shared.Upload;

  /**
   * The ID of the pipeline to use for the document.
   */
  pipeline_id: string;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: Shared.ConfigV3AsyncConfig;

  /**
   * Settings for pipeline execution that override pipeline defaults.
   */
  settings?: PipelineRunJobParams.Settings;
}

export namespace PipelineRunJobParams {
  /**
   * Settings for pipeline execution that override pipeline defaults.
   */
  export interface Settings {
    /**
     * Password to decrypt password-protected documents.
     */
    document_password?: string | null;
  }
}

export declare namespace Pipeline {
  export {
    type PipelineRunJobResponse as PipelineRunJobResponse,
    type PipelineRunParams as PipelineRunParams,
    type PipelineRunJobParams as PipelineRunJobParams,
  };
}
