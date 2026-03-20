// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as EditAPI from './edit';
import * as ExtractAPI from './extract';
import * as JobAPI from './job';
import * as ParseAPI from './parse';
import * as SplitAPI from './split';
import * as UploadAPI from './upload';

export class Pipeline extends APIResource {
  /**
   * Pipeline
   */
  create(body: PipelineCreateParams, options?: Core.RequestOptions): Core.APIPromise<PipelineResponse> {
    return this._client.post('/pipeline', { body, ...options });
  }
}

export interface PipelineResponse {
  job_id: string;

  result: PipelineResponse.Result;

  usage: SplitAPI.ParseUsage;
}

export namespace PipelineResponse {
  export interface Result {
    extract: Array<Result.UnionMember0> | JobAPI.ExtractResponse | ExtractAPI.V3Extract | null;

    parse: ParseAPI.ParseResponse | Array<ParseAPI.ParseResponse> | null;

    split: SplitAPI.SplitResponse | null;

    edit?: EditAPI.EditResponse | null;
  }

  export namespace Result {
    /**
     * This is the response format for Extract -> Split Pipelines
     */
    export interface UnionMember0 {
      page_range: Array<number>;

      result: JobAPI.ExtractResponse | ExtractAPI.V3Extract;

      split_name: string;

      partition?: string | null;
    }
  }
}

/**
 * Settings for pipeline execution that override pipeline defaults.
 */
export interface PipelineSettings {
  /**
   * Password to decrypt password-protected documents.
   */
  document_password?: string | null;
}

export interface PipelineCreateParams {
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
   * Settings for pipeline execution that override pipeline defaults.
   */
  settings?: PipelineSettings;
}

export declare namespace Pipeline {
  export {
    type PipelineResponse as PipelineResponse,
    type PipelineSettings as PipelineSettings,
    type PipelineCreateParams as PipelineCreateParams,
  };
}
