import * as http from 'http';
import Reducto from 'reductoai';

function listen(server: http.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, () => resolve((server.address() as import('net').AddressInfo).port));
  });
}

describe('response body draining', () => {
  let server: http.Server;
  let port: number;

  beforeEach(async () => {
    server = http.createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    port = await listen(server);
  });

  afterEach(() => {
    server.close();
  });

  test('an unconsumed APIPromise still frees its socket for reuse', async () => {
    // A small pool, like a real caller sharing one Agent across many
    // concurrent calls. Without eager draining, request #1 below (never
    // awaited/`.then()`d) permanently occupies its socket, and request #2
    // queues forever waiting for one to free up.
    const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
    const client = new Reducto({
      apiKey: 'My API Key',
      baseURL: `http://localhost:${port}/`,
      httpAgent: agent,
    });

    // Fire-and-forget: intentionally never awaited, never `.then()`'d,
    // mirroring an application that drops the promise (or only inspects
    // `.asResponse()` without reading it) instead of awaiting the parsed
    // result.
    client.request({ path: '/foo', method: 'get' });

    // If request #1's socket was never returned to the pool, this hangs
    // forever. jest's default test timeout bounds that for us.
    const result = await client.request({ path: '/foo', method: 'get' });
    expect(result).toEqual({ ok: true });
  });

  test('.asResponse() still returns a fully readable, independent Response', async () => {
    const client = new Reducto({ apiKey: 'My API Key', baseURL: `http://localhost:${port}/` });

    const promise = client.request({ path: '/foo', method: 'get' });
    const response = await promise.asResponse();
    expect(await response.text()).toEqual(JSON.stringify({ ok: true }));

    // The parsed-data path still works independently of the asResponse() read above.
    expect(await promise).toEqual({ ok: true });
  });
});
