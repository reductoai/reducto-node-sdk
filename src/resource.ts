// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Reducto } from './index';

export abstract class APIResource {
  protected _client: Reducto;

  constructor(client: Reducto) {
    this._client = client;
  }
}
