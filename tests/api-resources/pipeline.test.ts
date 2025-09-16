// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource pipeline', () => {
  // Prism tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.pipeline.run({ document_url: 'string', pipeline_id: 'pipeline_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.pipeline.run({ document_url: 'string', pipeline_id: 'pipeline_id' });
  });

  // Prism tests are disabled
  test.skip('runJob: only required params', async () => {
    const responsePromise = client.pipeline.runJob({ document_url: 'string', pipeline_id: 'pipeline_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('runJob: required and optional params', async () => {
    const response = await client.pipeline.runJob({
      document_url: 'string',
      pipeline_id: 'pipeline_id',
      priority: true,
      webhook: { channels: ['string'], metadata: {}, mode: 'disabled', url: 'url' },
    });
  });
});
