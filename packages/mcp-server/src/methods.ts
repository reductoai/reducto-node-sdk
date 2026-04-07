// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.apiVersion',
    fullyQualifiedName: 'apiVersion',
    httpMethod: 'get',
    httpPath: '/version',
  },
  {
    clientCallName: 'client.upload',
    fullyQualifiedName: 'upload',
    httpMethod: 'post',
    httpPath: '/upload',
  },
  {
    clientCallName: 'client.parse.run',
    fullyQualifiedName: 'parse.run',
    httpMethod: 'post',
    httpPath: '/parse',
  },
  {
    clientCallName: 'client.parse.runJob',
    fullyQualifiedName: 'parse.runJob',
    httpMethod: 'post',
    httpPath: '/parse_async',
  },
  {
    clientCallName: 'client.extract.run',
    fullyQualifiedName: 'extract.run',
    httpMethod: 'post',
    httpPath: '/extract',
  },
  {
    clientCallName: 'client.extract.runJob',
    fullyQualifiedName: 'extract.runJob',
    httpMethod: 'post',
    httpPath: '/extract_async',
  },
  {
    clientCallName: 'client.split.run',
    fullyQualifiedName: 'split.run',
    httpMethod: 'post',
    httpPath: '/split',
  },
  {
    clientCallName: 'client.split.runJob',
    fullyQualifiedName: 'split.runJob',
    httpMethod: 'post',
    httpPath: '/split_async',
  },
  {
    clientCallName: 'client.edit.run',
    fullyQualifiedName: 'edit.run',
    httpMethod: 'post',
    httpPath: '/edit',
  },
  {
    clientCallName: 'client.edit.runJob',
    fullyQualifiedName: 'edit.runJob',
    httpMethod: 'post',
    httpPath: '/edit_async',
  },
  {
    clientCallName: 'client.pipeline.run',
    fullyQualifiedName: 'pipeline.run',
    httpMethod: 'post',
    httpPath: '/pipeline',
  },
  {
    clientCallName: 'client.pipeline.runJob',
    fullyQualifiedName: 'pipeline.runJob',
    httpMethod: 'post',
    httpPath: '/pipeline_async',
  },
  {
    clientCallName: 'client.classify.run',
    fullyQualifiedName: 'classify.run',
    httpMethod: 'post',
    httpPath: '/classify',
  },
  {
    clientCallName: 'client.webhook.run',
    fullyQualifiedName: 'webhook.run',
    httpMethod: 'post',
    httpPath: '/configure_webhook',
  },
  {
    clientCallName: 'client.job.cancel',
    fullyQualifiedName: 'job.cancel',
    httpMethod: 'post',
    httpPath: '/cancel/{job_id}',
  },
  {
    clientCallName: 'client.job.get',
    fullyQualifiedName: 'job.get',
    httpMethod: 'get',
    httpPath: '/job/{job_id}',
  },
  {
    clientCallName: 'client.job.getAll',
    fullyQualifiedName: 'job.getAll',
    httpMethod: 'get',
    httpPath: '/jobs',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
