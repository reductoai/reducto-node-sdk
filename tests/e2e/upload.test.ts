import Reducto, { toFile } from 'reductoai';
import fs from 'fs';
import path from 'path';

const client = new Reducto();

describe('upload e2e', () => {
  test('upload a local file via fs.createReadStream', async () => {
    const filePath = path.resolve(__dirname, 'fixtures', 'sample.txt');
    const response = await client.upload({
      file: fs.createReadStream(filePath),
    });

    expect(response.file_id).toBeTruthy();
    expect(typeof response.file_id).toBe('string');
  });

  test('upload a local file via toFile', async () => {
    const filePath = path.resolve(__dirname, 'fixtures', 'sample.txt');
    const file = await toFile(fs.createReadStream(filePath), 'sample.txt');
    const response = await client.upload({
      file: file,
    });

    expect(response.file_id).toBeTruthy();
    expect(typeof response.file_id).toBe('string');
  });
});
