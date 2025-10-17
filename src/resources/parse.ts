// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Parse extends APIResource {
  /**
   * Parse
   */
  run(body: ParseRunParams, options?: Core.RequestOptions): Core.APIPromise<ParseRunResponse> {
    return this._client.post('/parse', { body, ...options });
  }

  /**
   * Async Parse
   */
  runJob(body: ParseRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ParseRunJobResponse> {
    return this._client.post('/parse_async', { body, ...options });
  }
}

export type ParseRunResponse = Shared.ParseResponse | ParseRunResponse.AsyncParseResponse;

export namespace ParseRunResponse {
  export interface AsyncParseResponse {
    job_id: string;
  }
}

export interface ParseRunJobResponse {
  job_id: string;
}

export type ParseRunParams = ParseRunParams.SyncParseConfig | ParseRunParams.AsyncParseConfig;

export declare namespace ParseRunParams {
  export interface SyncParseConfig {
    /**
     * For parse/split/extract pipelines, the URL of the document to be processed. You
     * can provide one of the following: 1. A publicly available URL 2. A presigned S3
     * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
     * directly uploading a document 4. A jobid:// prefixed URL obtained from a
     * previous /parse invocation
     *
     *             For edit pipelines, this should be a string containing the edit instructions
     */
    input: string | Shared.Upload;

    enhance?: Shared.Enhance;

    formatting?: Shared.Formatting;

    retrieval?: Shared.Retrieval;

    settings?: Shared.Settings;

    spreadsheet?: Shared.Spreadsheet;
  }

  export interface AsyncParseConfig {
    /**
     * For parse/split/extract pipelines, the URL of the document to be processed. You
     * can provide one of the following: 1. A publicly available URL 2. A presigned S3
     * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
     * directly uploading a document 4. A jobid:// prefixed URL obtained from a
     * previous /parse invocation
     *
     *             For edit pipelines, this should be a string containing the edit instructions
     */
    input: string | Shared.Upload;

    /**
     * The configuration options for asynchronous processing (default synchronous).
     */
    async?: Shared.ConfigV3AsyncConfig;

    enhance?: Shared.Enhance;

    formatting?: Shared.Formatting;

    retrieval?: Shared.Retrieval;

    settings?: Shared.Settings;

    spreadsheet?: Shared.Spreadsheet;
  }
}

export interface ParseRunJobParams {
  /**
   * For parse/split/extract pipelines, the URL of the document to be processed. You
   * can provide one of the following: 1. A publicly available URL 2. A presigned S3
   * URL 3. A reducto:// prefixed URL obtained from the /upload endpoint after
   * directly uploading a document 4. A jobid:// prefixed URL obtained from a
   * previous /parse invocation
   *
   *             For edit pipelines, this should be a string containing the edit instructions
   */
  input: string | Shared.Upload;

  /**
   * The configuration options for asynchronous processing (default synchronous).
   */
  async?: Shared.ConfigV3AsyncConfig;

  enhance?: Shared.Enhance;

  formatting?: Shared.Formatting;

  retrieval?: Shared.Retrieval;

  settings?: Shared.Settings;

  spreadsheet?: Shared.Spreadsheet;
}

export declare namespace Parse {
  export {
    type ParseRunResponse as ParseRunResponse,
    type ParseRunJobResponse as ParseRunJobResponse,
    type ParseRunParams as ParseRunParams,
    type ParseRunJobParams as ParseRunJobParams,
  };
}
