// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource split', () => {
  // Mock server tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.split.run({
      input: 'string',
      split_description: [{ description: 'description', name: 'name' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('run: required and optional params', async () => {
    const response = await client.split.run({
      input: 'string',
      split_description: [
        {
          description: 'description',
          name: 'name',
          partition_key: 'partition_key',
        },
      ],
      parsing: {
        enhance: {
          agentic: [
            {
              scope: 'table',
              mode: 'default',
              prompt: 'prompt',
            },
          ],
          intelligent_ordering: true,
          summarize_figures: true,
        },
        formatting: {
          add_page_markers: true,
          include: ['change_tracking'],
          merge_tables: true,
          table_output_format: 'html',
        },
        retrieval: {
          chunking: {
            chunk_mode: 'variable',
            chunk_overlap: 0,
            chunk_size: 0,
          },
          embedding_optimized: true,
          filter_blocks: ['Header'],
        },
        settings: {
          document_password: 'document_password',
          embed_pdf_metadata: true,
          embed_pdf_metadata_dpi: 50,
          extract_document_properties: true,
          extraction_mode: 'ocr',
          force_file_extension: 'force_file_extension',
          force_url_result: true,
          hybrid_vpc: { environment: 'environment' },
          ocr_system: 'standard',
          page_range: { end: 0, start: 0 },
          persist_results: true,
          return_images: ['figure'],
          return_ocr_data: true,
          tenant_throttling: { tenant_id: 'x', max_share: 1 },
          timeout: 0,
        },
        spreadsheet: {
          clustering: 'accurate',
          exclude: ['hidden_sheets'],
          include: ['cell_colors'],
          max_cell_count: 1,
          split_large_tables: { enabled: true, size: 0 },
        },
      },
      settings: {
        allow_page_overlap: true,
        auto_partition: true,
        deep_split: true,
        force_url_result: true,
        table_cutoff: 'truncate',
      },
      split_rules: 'split_rules',
    });
  });

  // Mock server tests are disabled
  test.skip('runJob: only required params', async () => {
    const responsePromise = client.split.runJob({
      input: 'string',
      split_description: [{ description: 'description', name: 'name' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('runJob: required and optional params', async () => {
    const response = await client.split.runJob({
      input: 'string',
      split_description: [
        {
          description: 'description',
          name: 'name',
          partition_key: 'partition_key',
        },
      ],
      async: {
        metadata: {},
        priority: true,
        webhook: { channels: ['string'], mode: 'svix' },
      },
      parsing: {
        enhance: {
          agentic: [
            {
              scope: 'table',
              mode: 'default',
              prompt: 'prompt',
            },
          ],
          intelligent_ordering: true,
          summarize_figures: true,
        },
        formatting: {
          add_page_markers: true,
          include: ['change_tracking'],
          merge_tables: true,
          table_output_format: 'html',
        },
        retrieval: {
          chunking: {
            chunk_mode: 'variable',
            chunk_overlap: 0,
            chunk_size: 0,
          },
          embedding_optimized: true,
          filter_blocks: ['Header'],
        },
        settings: {
          document_password: 'document_password',
          embed_pdf_metadata: true,
          embed_pdf_metadata_dpi: 50,
          extract_document_properties: true,
          extraction_mode: 'ocr',
          force_file_extension: 'force_file_extension',
          force_url_result: true,
          hybrid_vpc: { environment: 'environment' },
          ocr_system: 'standard',
          page_range: { end: 0, start: 0 },
          persist_results: true,
          return_images: ['figure'],
          return_ocr_data: true,
          tenant_throttling: { tenant_id: 'x', max_share: 1 },
          timeout: 0,
        },
        spreadsheet: {
          clustering: 'accurate',
          exclude: ['hidden_sheets'],
          include: ['cell_colors'],
          max_cell_count: 1,
          split_large_tables: { enabled: true, size: 0 },
        },
      },
      settings: {
        allow_page_overlap: true,
        auto_partition: true,
        deep_split: true,
        force_url_result: true,
        table_cutoff: 'truncate',
      },
      split_rules: 'split_rules',
    });
  });
});
