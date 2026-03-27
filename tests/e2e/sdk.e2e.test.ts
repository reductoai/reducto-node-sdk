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
    const response = await client.parse.run({ input: DOCUMENT_URL });
    expect(response).toHaveProperty('job_id');
    expect(response).toHaveProperty('duration');
    expect(response).toHaveProperty('result');
  });

  test('parse async returns job_id', async () => {
    const response = await client.parse.runJob({ input: DOCUMENT_URL });
    expect(response).toHaveProperty('job_id');
    expect(typeof response.job_id).toBe('string');
  });

  test('parse async job completes', async () => {
    const response = await client.parse.runJob({ input: DOCUMENT_URL });
    const jobId = response.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.get(jobId);
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
    const response = await client.extract.run({
      input: DOCUMENT_URL,
      instructions: { schema: TRIVIAL_SCHEMA },
    });
    expect(response).toHaveProperty('result');
  });

  test('extract async returns job_id', async () => {
    const response = await client.extract.runJob({
      input: DOCUMENT_URL,
      instructions: { schema: TRIVIAL_SCHEMA },
    });
    expect(response).toHaveProperty('job_id');
    expect(typeof response.job_id).toBe('string');
  });

  test('extract async job completes', async () => {
    const response = await client.extract.runJob({
      input: DOCUMENT_URL,
      instructions: { schema: TRIVIAL_SCHEMA },
    });
    const jobId = response.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.get(jobId);
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

describe('Split', () => {
  test('split sync returns response with sections', async () => {
    const response = await client.split.run({
      input: DOCUMENT_URL,
      split_description: [
        { name: 'introduction', description: 'The introduction or overview section' },
        { name: 'other', description: 'Any other content' },
      ],
    });
    expect(response).toHaveProperty('result');
  });

  test('split async returns job_id', async () => {
    const response = await client.split.runJob({
      input: DOCUMENT_URL,
      split_description: [
        { name: 'introduction', description: 'The introduction or overview section' },
        { name: 'other', description: 'Any other content' },
      ],
    });
    expect(response).toHaveProperty('job_id');
    expect(typeof response.job_id).toBe('string');
  });

  test('split async job completes', async () => {
    const response = await client.split.runJob({
      input: DOCUMENT_URL,
      split_description: [
        { name: 'introduction', description: 'The introduction or overview section' },
        { name: 'other', description: 'Any other content' },
      ],
    });
    const jobId = response.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.get(jobId);
      expect(['Pending', 'Completed', 'Failed', 'Idle']).toContain(job.status);

      if (job.status === 'Completed') {
        expect(job.result).not.toBeNull();
        return;
      }
      if (job.status === 'Failed') {
        throw new Error(`Split async job failed: ${job.reason}`);
      }
      await sleep(2000);
    }

    throw new Error('Split async job did not complete within timeout');
  });
});

describe('Classify', () => {
  test('classify returns a category result', async () => {
    const response = await client.classify.run({
      input: DOCUMENT_URL,
      classification_schema: [
        {
          category: 'report',
          criteria: ['Contains structured sections', 'Has a title and summary'],
        },
        {
          category: 'invoice',
          criteria: ['Contains line items', 'Has totals and payment info'],
        },
      ],
    });
    expect(response).toHaveProperty('job_id');
    expect(response).toHaveProperty('result');
    expect(response.result).toHaveProperty('category');
    expect(typeof response.result.category).toBe('string');
  });
});

describe('Edit', () => {
  test('edit returns response with result', async () => {
    const response = await client.edit.run({
      document_url: DOCUMENT_URL,
      edit_instructions: 'Add a watermark that says DRAFT to every page',
    });
    expect(response).toHaveProperty('document_url');
  });
});

describe('Pipeline', () => {
  test('pipeline sync returns response', async () => {
    // Note: requires a valid pipeline_id configured in the account
    // This test verifies the method exists and accepts the correct params
    await expect(
      client.pipeline.run({
        input: DOCUMENT_URL,
        pipeline_id: 'test-pipeline',
      }),
    ).rejects.toThrow(); // Expected to fail with invalid pipeline_id
  });
});

describe('Job', () => {
  test('job get returns status for async parse job', async () => {
    const asyncResponse = await client.parse.runJob({ input: DOCUMENT_URL });
    const jobId = asyncResponse.job_id;

    const job = await client.job.get(jobId);
    expect(['Pending', 'Completed', 'Failed', 'Idle']).toContain(job.status);
  });

  test('job getAll returns jobs array', async () => {
    const response = await client.job.getAll();
    expect(response).toHaveProperty('jobs');
    expect(Array.isArray(response.jobs)).toBe(true);
  });

  test('job cancel with invalid ID returns error', async () => {
    await expect(client.job.cancel('nonexistent-job-id')).rejects.toThrow();
  });

  test('job get returns completed result', async () => {
    const asyncResponse = await client.parse.runJob({ input: DOCUMENT_URL });
    const jobId = asyncResponse.job_id;

    for (let i = 0; i < 60; i++) {
      const job = await client.job.get(jobId);
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
