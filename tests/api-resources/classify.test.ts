// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource classify', () => {
  // Mock server tests are disabled
  test.skip('classify: only required params', async () => {
    const responsePromise = client.classify.classify({ input: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('classify: required and optional params', async () => {
    const response = await client.classify.classify({
      input: 'string',
      classification_schema: [{ category: 'category', criteria: ['string'] }],
      document_metadata: 'document_metadata',
      page_range: { end: 0, start: 0 },
      persist_results: true,
    });
  });
});
