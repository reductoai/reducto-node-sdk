export {
  WorkloadIdentityAuth,
  type WorkloadIdentity,
  type SubjectTokenProvider,
  type X509CertificateProvider,
  type ClientCertificate,
  type AccessToken,
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
  x509WorkloadIdentity,
} from './lib/subject-token-providers';
export { OAuthError, SubjectTokenProviderError } from './error';
