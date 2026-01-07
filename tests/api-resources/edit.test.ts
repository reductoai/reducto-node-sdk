// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource edit', () => {
  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.edit.run({
      document_url: 'string',
      edit_instructions: 'edit_instructions',
      edit_options: {
        color: '#e1cb97',
        enable_overflow_pages: true,
        llm_provider_preference: 'openai',
      },
      form_schema: [
        {
          bbox: {
            height: 0,
            left: 0,
            page: 0,
            top: 0,
            width: 0,
            original_page: 0,
          },
          description: 'description',
          type: 'text',
          fill: true,
          value: 'value',
        },
      ],
      priority: true,
    });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('runJob: required and optional params', async () => {
    const response = await client.edit.runJob({
      document_url: 'string',
      edit_instructions: 'edit_instructions',
      edit_options: {
        color: '#e1cb97',
        enable_overflow_pages: true,
        llm_provider_preference: 'openai',
      },
      form_schema: [
        {
          bbox: {
            height: 0,
            left: 0,
            page: 0,
            top: 0,
            width: 0,
            original_page: 0,
          },
          description: 'description',
          type: 'text',
          fill: true,
          value: 'value',
        },
      ],
      priority: true,
      webhook: {
        channels: ['string'],
        metadata: {},
        mode: 'disabled',
        url: 'url',
      },
    });
  });
});
