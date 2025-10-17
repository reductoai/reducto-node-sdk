// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Extract extends APIResource {
  /**
   * Extract
   */
  run(body: ExtractRunParams, options?: Core.RequestOptions): Core.APIPromise<ExtractRunResponse> {
    return this._client.post('/extract', { body, ...options });
  }

  /**
   * Extract Async
   */
  runJob(body: ExtractRunJobParams, options?: Core.RequestOptions): Core.APIPromise<ExtractRunJobResponse> {
    return this._client.post('/extract_async', { body, ...options });
  }
}

export type ExtractRunResponse = Shared.V3ExtractResponse | ExtractRunResponse.AsyncExtractResponse;

export namespace ExtractRunResponse {
  export interface AsyncExtractResponse {
    job_id: string;
  }
}

export interface ExtractRunJobResponse {
  job_id: string;
}

export type ExtractRunParams = ExtractRunParams.SyncExtractConfig | ExtractRunParams.AsyncExtractConfig;

export declare namespace ExtractRunParams {
  export interface SyncExtractConfig {
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
     * The instructions to use for the extraction.
     */
    instructions?: SyncExtractConfig.Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: Shared.ParseOptions;

    /**
     * The settings to use for the extraction.
     */
    settings?: SyncExtractConfig.Settings;
  }

  export namespace SyncExtractConfig {
    /**
     * The instructions to use for the extraction.
     */
    export interface Instructions {
      /**
       * The JSON schema to use for the extraction.
       */
      schema?: unknown;

      /**
       * The system prompt to use for the extraction.
       */
      system_prompt?: string;
    }

    /**
     * The settings to use for the extraction.
     */
    export interface Settings {
      /**
       * If True, use array extraction.
       */
      array_extract?: boolean;

      /**
       * The citations to use for the extraction.
       */
      citations?: Settings.Citations;

      /**
       * If True, include images in the extraction.
       */
      include_images?: boolean;

      /**
       * If True, jobs will be processed with a higher throughput and priority at a
       * higher cost. Defaults to False.
       */
      optimize_for_latency?: boolean;
    }

    export namespace Settings {
      /**
       * The citations to use for the extraction.
       */
      export interface Citations {
        /**
         * If True, include citations in the extraction.
         */
        enabled?: boolean;

        /**
         * If True, enable numeric citation confidence scores. Defaults to True.
         */
        numerical_confidence?: boolean;
      }
    }
  }

  export interface AsyncExtractConfig {
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

    /**
     * The instructions to use for the extraction.
     */
    instructions?: AsyncExtractConfig.Instructions;

    /**
     * The configuration options for parsing the document. If you are passing in a
     * jobid:// URL for the file, then this configuration will be ignored.
     */
    parsing?: Shared.ParseOptions;

    /**
     * The settings to use for the extraction.
     */
    settings?: AsyncExtractConfig.Settings;
  }

  export namespace AsyncExtractConfig {
    /**
     * The instructions to use for the extraction.
     */
    export interface Instructions {
      /**
       * The JSON schema to use for the extraction.
       */
      schema?: unknown;

      /**
       * The system prompt to use for the extraction.
       */
      system_prompt?: string;
    }

    /**
     * The settings to use for the extraction.
     */
    export interface Settings {
      /**
       * If True, use array extraction.
       */
      array_extract?: boolean;

      /**
       * The citations to use for the extraction.
       */
      citations?: Settings.Citations;

      /**
       * If True, include images in the extraction.
       */
      include_images?: boolean;

      /**
       * If True, jobs will be processed with a higher throughput and priority at a
       * higher cost. Defaults to False.
       */
      optimize_for_latency?: boolean;
    }

    export namespace Settings {
      /**
       * The citations to use for the extraction.
       */
      export interface Citations {
        /**
         * If True, include citations in the extraction.
         */
        enabled?: boolean;

        /**
         * If True, enable numeric citation confidence scores. Defaults to True.
         */
        numerical_confidence?: boolean;
      }
    }
  }
}

export interface ExtractRunJobParams {
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

  /**
   * The instructions to use for the extraction.
   */
  instructions?: ExtractRunJobParams.Instructions;

  /**
   * The configuration options for parsing the document. If you are passing in a
   * jobid:// URL for the file, then this configuration will be ignored.
   */
  parsing?: Shared.ParseOptions;

  /**
   * The settings to use for the extraction.
   */
  settings?: ExtractRunJobParams.Settings;
}

export namespace ExtractRunJobParams {
  /**
   * The instructions to use for the extraction.
   */
  export interface Instructions {
    /**
     * The JSON schema to use for the extraction.
     */
    schema?: unknown;

    /**
     * The system prompt to use for the extraction.
     */
    system_prompt?: string;
  }

  /**
   * The settings to use for the extraction.
   */
  export interface Settings {
    /**
     * If True, use array extraction.
     */
    array_extract?: boolean;

    /**
     * The citations to use for the extraction.
     */
    citations?: Settings.Citations;

    /**
     * If True, include images in the extraction.
     */
    include_images?: boolean;

    /**
     * If True, jobs will be processed with a higher throughput and priority at a
     * higher cost. Defaults to False.
     */
    optimize_for_latency?: boolean;
  }

  export namespace Settings {
    /**
     * The citations to use for the extraction.
     */
    export interface Citations {
      /**
       * If True, include citations in the extraction.
       */
      enabled?: boolean;

      /**
       * If True, enable numeric citation confidence scores. Defaults to True.
       */
      numerical_confidence?: boolean;
    }
  }
}

export declare namespace Extract {
  export {
    type ExtractRunResponse as ExtractRunResponse,
    type ExtractRunJobResponse as ExtractRunJobResponse,
    type ExtractRunParams as ExtractRunParams,
    type ExtractRunJobParams as ExtractRunJobParams,
  };
}
