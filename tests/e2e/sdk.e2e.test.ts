/**
 * End-to-end tests for the Reducto Node SDK.
 *
 * These tests exercise the SDK against the live Reducto API to verify
 * that the SDK contract is working correctly. They are not testing the
 * actual parsing/extraction quality, just that the endpoints respond
 * with the expected structure.
 *
 * Required environment variable: REDUCTO_API_KEY
 */

import Reducto from 'reductoai';

const DOCUMENT_URL = 'https://ci.reducto.ai/onepager.pdf';

const TRIVIAL_SCHEMA = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'The title of the document.',
    },
  },
  required: ['title'],
};

const apiKey = process.env['REDUCTO_API_KEY'];

if (!apiKey) {
  throw new Error('REDUCTO_API_KEY environment variable is not set. E2E tests require a valid API key.');
}

const client = new Reducto({ apiKey });

// Increase Jest timeout for E2E tests that hit the live API
jest.setTimeout(180_000);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Parse', () => {
  test('parse sync returns response with chunks', async () => {
    const response = await client.parse.create({ input: DOCUMENT_URL });
    expect(response).toHaveProperty('job_id');
    expect(response).toHaveProperty('duration');
    expect(response).toHaveProperty('result');

    const result = (response as Reducto.ParseResponse).result;
    if ('type' in result && result.type === 'full') {
      expect(result.chunks.length).toBeGreaterThan(0);
    }
  });
});

describe('ParseAsync', () => {
  test('parse async returns job_id', async () => {
    const response = await client.parseAsync.create({ input: DOCUMENT_URL });
    expect(response).toHaveProperty('job_id');
    expect(typeof response.job_id).toBe('string');
  });

  test('parse async job completes', async () => {
    const response = await client.parseAsync.create({ input: DOCUMENT_URL });
    const jobId = response.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.retrieve(jobId);
      expect(['Pending', 'Completed', 'Failed', 'Idle']).toContain(job.status);

      if (job.status === 'Completed') {
        expect(job.result).not.toBeNull();
        return;
      }
      if (job.status === 'Failed') {
        throw new Error(`Parse async job failed: ${job.reason}`);
      }
      await sleep(2000);
    }

    throw new Error('Parse async job did not complete within timeout');
  });
});

describe('Extract', () => {
  test('extract sync returns result', async () => {
    const response = await client.extract.create({
      input: DOCUMENT_URL,
      instructions: { schema: TRIVIAL_SCHEMA },
    });
    expect(response).toHaveProperty('result');

    const result = (response as Reducto.V3Extract).result;
    expect(result).toBeDefined();
    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0);
    }
  });
});

describe('ExtractAsync', () => {
  test('extract async returns job_id', async () => {
    const response = await client.extractAsync.create({
      input: DOCUMENT_URL,
      instructions: { schema: TRIVIAL_SCHEMA },
    });
    expect(response).toHaveProperty('job_id');
    expect(typeof response.job_id).toBe('string');
  });

  test('extract async job completes', async () => {
    const response = await client.extractAsync.create({
      input: DOCUMENT_URL,
      instructions: { schema: TRIVIAL_SCHEMA },
    });
    const jobId = response.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.retrieve(jobId);
      expect(['Pending', 'Completed', 'Failed', 'Idle']).toContain(job.status);

      if (job.status === 'Completed') {
        expect(job.result).not.toBeNull();
        return;
      }
      if (job.status === 'Failed') {
        throw new Error(`Extract async job failed: ${job.reason}`);
      }
      await sleep(2000);
    }

    throw new Error('Extract async job did not complete within timeout');
  });
});

describe('Upload', () => {
  test('upload returns file_id and presigned_url', async () => {
    const response = await client.upload.create();
    expect(response).toHaveProperty('file_id');
    expect(response).toHaveProperty('presigned_url');
  });

  test('upload with extension returns reducto:// URI', async () => {
    const response = await client.upload.create({ extension: 'pdf' });
    expect(response).toHaveProperty('file_id');
    expect(response).toHaveProperty('presigned_url');
    expect(response.file_id.startsWith('reducto://')).toBe(true);
  });
});

describe('Job', () => {
  test('job retrieve returns status for async parse job', async () => {
    const asyncResponse = await client.parseAsync.create({ input: DOCUMENT_URL });
    const jobId = asyncResponse.job_id;

    const job = await client.job.retrieve(jobId);
    expect(['Pending', 'Completed', 'Failed', 'Idle']).toContain(job.status);
  });

  test('job retrieve returns completed result', async () => {
    const asyncResponse = await client.parseAsync.create({ input: DOCUMENT_URL });
    const jobId = asyncResponse.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.retrieve(jobId);
      expect(['Pending', 'Completed', 'Failed', 'Idle']).toContain(job.status);

      if (job.status === 'Completed') {
        expect(job.result).not.toBeNull();
        return;
      }
      if (job.status === 'Failed') {
        throw new Error(`Job failed: ${job.reason}`);
      }
      await sleep(2000);
    }

    throw new Error('Job did not complete within timeout');
  });
});
