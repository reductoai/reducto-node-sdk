// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource edit', () => {
  // skipped: tests are disabled for the time being
  test.skip('run: only required params', async () => {
    const responsePromise = client.edit.run({
      document_url: 'string',
      edit_instructions: 'edit_instructions',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('run: required and optional params', async () => {
    const response = await client.edit.run({
      document_url: 'string',
      edit_instructions: 'edit_instructions',
      edit_options: { color: '#e1cb97' },
      priority: true,
      snippets: ['string'],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('runJob: only required params', async () => {
    const responsePromise = client.edit.runJob({
      document_url: 'string',
      edit_instructions: 'edit_instructions',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('runJob: required and optional params', async () => {
    const response = await client.edit.runJob({
      document_url: 'string',
      edit_instructions: 'edit_instructions',
      edit_options: { color: '#e1cb97' },
      priority: true,
      snippets: ['string'],
      webhook: { channels: ['string'], metadata: {}, mode: 'disabled', url: 'url' },
    });
  });
});
