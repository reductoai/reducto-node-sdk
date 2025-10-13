// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Reducto from 'reductoai';
import { Response } from 'node-fetch';

const client = new Reducto({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource parse', () => {
  // Prism tests are disabled
  test.skip('run: only required params', async () => {
    const responsePromise = client.parse.run({ document_url: 'string' });
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
    const response = await client.parse.run({
      document_url: 'string',
      advanced_options: {
        add_page_markers: true,
        continue_hierarchy: true,
        document_password: 'document_password',
        enable_change_tracking: true,
        enable_highlight_detection: true,
        exclude_hidden_rows_cols: true,
        exclude_hidden_sheets: true,
        filter_line_numbers: true,
        force_file_extension: 'force_file_extension',
        include_color_information: true,
        include_formula_information: true,
        keep_line_breaks: true,
        large_table_chunking: { enabled: true, size: 0 },
        merge_tables: true,
        ocr_system: 'highres',
        page_range: { end: 0, start: 0 },
        persist_results: true,
        read_comments: true,
        remove_text_formatting: true,
        return_ocr_data: true,
        spreadsheet_table_clustering: 'default',
        table_output_format: 'html',
      },
      experimental_options: {
        danger_filter_wide_boxes: true,
        detect_signatures: true,
        embed_text_metadata_pdf: true,
        enable_checkboxes: true,
        enable_equations: true,
        enable_scripts: true,
        enrich: { enabled: true, mode: 'standard', prompt: 'prompt' },
        layout_enrichment: true,
        layout_model: 'default',
        native_office_conversion: true,
        return_figure_images: true,
        return_table_images: true,
        rotate_figures: true,
        rotate_pages: true,
        user_specified_timeout_seconds: 0,
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
    });
  });

  // Prism tests are disabled
  test.skip('runJob: only required params', async () => {
    const responsePromise = client.parse.runJob({ document_url: 'string' });
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
    const response = await client.parse.runJob({
      document_url: 'string',
      advanced_options: {
        add_page_markers: true,
        continue_hierarchy: true,
        document_password: 'document_password',
        enable_change_tracking: true,
        enable_highlight_detection: true,
        exclude_hidden_rows_cols: true,
        exclude_hidden_sheets: true,
        filter_line_numbers: true,
        force_file_extension: 'force_file_extension',
        include_color_information: true,
        include_formula_information: true,
        keep_line_breaks: true,
        large_table_chunking: { enabled: true, size: 0 },
        merge_tables: true,
        ocr_system: 'highres',
        page_range: { end: 0, start: 0 },
        persist_results: true,
        read_comments: true,
        remove_text_formatting: true,
        return_ocr_data: true,
        spreadsheet_table_clustering: 'default',
        table_output_format: 'html',
      },
      experimental_options: {
        danger_filter_wide_boxes: true,
        detect_signatures: true,
        embed_text_metadata_pdf: true,
        enable_checkboxes: true,
        enable_equations: true,
        enable_scripts: true,
        enrich: { enabled: true, mode: 'standard', prompt: 'prompt' },
        layout_enrichment: true,
        layout_model: 'default',
        native_office_conversion: true,
        return_figure_images: true,
        return_table_images: true,
        rotate_figures: true,
        rotate_pages: true,
        user_specified_timeout_seconds: 0,
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
      webhook: { channels: ['string'], metadata: {}, mode: 'disabled', url: 'url' },
    });
  });
});
