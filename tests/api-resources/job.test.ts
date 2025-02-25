// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reducto';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource job', () => {
  // skipped: tests are disabled for the time being
  test.skip('cancel', async () => {
    const responsePromise = client.job.cancel('job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('cancel: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.job.cancel('job_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Reducto.NotFoundError,
    );
  });

  // skipped: tests are disabled for the time being
  test.skip('get', async () => {
    const responsePromise = client.job.get('job_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('get: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.job.get('job_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      Reducto.NotFoundError,
    );
  });
});
