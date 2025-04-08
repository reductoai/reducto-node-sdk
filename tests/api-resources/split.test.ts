// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource split', () => {
  // skipped: tests are disabled for the time being
  test.skip('run: only required params', async () => {
    const responsePromise = client.split.run({
      document_url: 'string',
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

  // skipped: tests are disabled for the time being
  test.skip('run: required and optional params', async () => {
    const response = await client.split.run({
      document_url: 'string',
      split_description: [{ description: 'description', name: 'name', partition_key: 'partition_key' }],
      advanced_options: {
        add_page_markers: true,
        continue_hierarchy: true,
        document_password: 'document_password',
        filter_line_numbers: true,
        force_file_extension: 'force_file_extension',
        keep_line_breaks: true,
        large_table_chunking: { enabled: true, size: 0 },
        merge_tables: true,
        ocr_system: 'highres',
        page_range: { end: 0, start: 0 },
        remove_text_formatting: true,
        return_ocr_data: true,
        spreadsheet_table_clustering: 'default',
        table_output_format: 'html',
      },
      experimental_options: {
        danger_filter_wide_boxes: true,
        enable_checkboxes: true,
        enable_equations: true,
        enable_scripts: true,
        enable_underlines: true,
        enrich: { enabled: true, mode: 'standard', prompt: 'prompt' },
        native_office_conversion: true,
        return_figure_images: true,
        return_table_images: true,
        rotate_pages: true,
      },
      options: {
        chunking: { chunk_mode: 'variable', chunk_size: 0 },
        extraction_mode: 'ocr',
        figure_summary: { enabled: true, override: true, prompt: 'prompt' },
        filter_blocks: ['Header'],
        force_url_result: true,
        ocr_mode: 'standard',
        table_summary: { enabled: true, prompt: 'prompt' },
      },
      priority: true,
      split_rules: 'split_rules',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('runJob: only required params', async () => {
    const responsePromise = client.split.runJob({
      document_url: 'string',
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

  // skipped: tests are disabled for the time being
  test.skip('runJob: required and optional params', async () => {
    const response = await client.split.runJob({
      document_url: 'string',
      split_description: [{ description: 'description', name: 'name', partition_key: 'partition_key' }],
      advanced_options: {
        add_page_markers: true,
        continue_hierarchy: true,
        document_password: 'document_password',
        filter_line_numbers: true,
        force_file_extension: 'force_file_extension',
        keep_line_breaks: true,
        large_table_chunking: { enabled: true, size: 0 },
        merge_tables: true,
        ocr_system: 'highres',
        page_range: { end: 0, start: 0 },
        remove_text_formatting: true,
        return_ocr_data: true,
        spreadsheet_table_clustering: 'default',
        table_output_format: 'html',
      },
      experimental_options: {
        danger_filter_wide_boxes: true,
        enable_checkboxes: true,
        enable_equations: true,
        enable_scripts: true,
        enable_underlines: true,
        enrich: { enabled: true, mode: 'standard', prompt: 'prompt' },
        native_office_conversion: true,
        return_figure_images: true,
        return_table_images: true,
        rotate_pages: true,
      },
      options: {
        chunking: { chunk_mode: 'variable', chunk_size: 0 },
        extraction_mode: 'ocr',
        figure_summary: { enabled: true, override: true, prompt: 'prompt' },
        filter_blocks: ['Header'],
        force_url_result: true,
        ocr_mode: 'standard',
        table_summary: { enabled: true, prompt: 'prompt' },
      },
      priority: true,
      split_rules: 'split_rules',
      webhook: { channels: ['string'], metadata: {}, mode: 'disabled', url: 'url' },
    });
  });
});
