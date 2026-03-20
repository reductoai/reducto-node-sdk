// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class ConfigureWebhook extends APIResource {
  /**
   * Webhook Portal
   */
  create(options?: Core.RequestOptions): Core.APIPromise<string> {
    return this._client.post('/configure_webhook', options);
  }
}

export type ConfigureWebhookCreateResponse = string;

export declare namespace ConfigureWebhook {
  export { type ConfigureWebhookCreateResponse as ConfigureWebhookCreateResponse };
}
