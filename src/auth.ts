export {
  WorkloadIdentityAuth,
  type WorkloadIdentity,
  type SubjectTokenProvider,
  type TokenExchangeResponse,
} from './lib/workload-identity';
export {
  DEFAULT_AUDIENCE,
  identityTokenFile,
  k8sServiceAccountTokenProvider,
  gcpIdTokenProvider,
  azureManagedIdentityTokenProvider,
  githubActionsTokenProvider,
  awsWebIdentityTokenProvider,
} from './lib/subject-token-providers';
export { OAuthError, SubjectTokenProviderError } from './error';
