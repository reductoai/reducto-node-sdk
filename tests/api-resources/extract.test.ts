// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource extract', () => {
  // Prism tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.extract.run({ input: 'string' });
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
    const response = await client.extract.run({
      input: 'string',
      instructions: { schema: {}, system_prompt: 'system_prompt' },
      parsing: {
        enhance: { agentic: [{ scope: 'table', prompt: 'prompt' }], summarize_figures: true },
        formatting: {
          add_page_markers: true,
          include: ['change_tracking'],
          merge_tables: true,
          table_output_format: 'html',
        },
        retrieval: {
          chunking: { chunk_mode: 'variable', chunk_size: 0 },
          embedding_optimized: true,
          filter_blocks: ['Header'],
        },
        settings: {
          document_password: 'document_password',
          embed_pdf_metadata: true,
          force_file_extension: 'force_file_extension',
          force_url_result: true,
          ocr_system: 'standard',
          page_range: { end: 0, start: 0 },
          persist_results: true,
          return_images: ['figure'],
          return_ocr_data: true,
          timeout: 0,
        },
        spreadsheet: {
          clustering: 'accurate',
          exclude: ['hidden_sheets'],
          include: ['cell_colors'],
          split_large_tables: { enabled: true, size: 0 },
        },
      },
      settings: {
        array_extract: true,
        citations: { enabled: true, numerical_confidence: true },
        include_images: true,
        optimize_for_latency: true,
      },
    });
  });

  // Prism tests are disabled
  test.skip('runJob: only required params', async () => {
    const responsePromise = client.extract.runJob({ input: 'string' });
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
    const response = await client.extract.runJob({
      input: 'string',
      async: { metadata: {}, priority: true, webhook: { channels: ['string'], mode: 'svix' } },
      instructions: { schema: {}, system_prompt: 'system_prompt' },
      parsing: {
        enhance: { agentic: [{ scope: 'table', prompt: 'prompt' }], summarize_figures: true },
        formatting: {
          add_page_markers: true,
          include: ['change_tracking'],
          merge_tables: true,
          table_output_format: 'html',
        },
        retrieval: {
          chunking: { chunk_mode: 'variable', chunk_size: 0 },
          embedding_optimized: true,
          filter_blocks: ['Header'],
        },
        settings: {
          document_password: 'document_password',
          embed_pdf_metadata: true,
          force_file_extension: 'force_file_extension',
          force_url_result: true,
          ocr_system: 'standard',
          page_range: { end: 0, start: 0 },
          persist_results: true,
          return_images: ['figure'],
          return_ocr_data: true,
          timeout: 0,
        },
        spreadsheet: {
          clustering: 'accurate',
          exclude: ['hidden_sheets'],
          include: ['cell_colors'],
          split_large_tables: { enabled: true, size: 0 },
        },
      },
      settings: {
        array_extract: true,
        citations: { enabled: true, numerical_confidence: true },
        include_images: true,
        optimize_for_latency: true,
      },
    });
  });
});
