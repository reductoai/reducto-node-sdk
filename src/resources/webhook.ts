import { APIResource } from '../resource';
import * as Core from '../core';

export class Webhook extends APIResource {
  /**
   * Webhook Portal
   */
  run(options?: Core.RequestOptions): Core.APIPromise<string> {
    return this._client.post('/configure_webhook', options);
  }
}

export type WebhookRunResponse = string;

export declare namespace Webhook {
  export { type WebhookRunResponse as WebhookRunResponse };
}
