import { ReductoError } from '../error';
import { kind, type Agent } from '../_shims/index';

/** A PEM client certificate chain (leaf first) and its PEM private key. */
export interface ClientCertificate {
  certChain: string;
  key: string;
}

/** The client certificate is sent through node-fetch's `agent` option, which only the Node.js shims use. */
export function assertNodeTransport(): void {
  if (kind !== 'node') {
    throw new ReductoError(
      'X.509 workload identity requires Node.js with the default node-fetch transport. It is not supported in browsers, edge runtimes, Bun, Deno or with `reductoai/shims/web`.',
    );
  }
}

/** Creates an HTTPS agent that presents the certificate in the TLS handshake. */
export async function createClientCertificateAgent({ certChain, key }: ClientCertificate): Promise<Agent> {
  // A variable specifier keeps web bundlers from resolving the Node.js-only module.
  const moduleName = 'agentkeepalive';
  const mod: any = await import(moduleName);
  const HttpsAgent = mod.HttpsAgent ?? mod.default.HttpsAgent;
  return new HttpsAgent({ keepAlive: true, timeout: 5 * 60 * 1000, cert: certChain, key });
}
