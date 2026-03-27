<<<<<<< HEAD
# Reducto

Types:

- <code><a href="./src/resources/top-level.ts">APIVersionResponse</a></code>

Methods:

- <code title="get /version">client.<a href="./src/index.ts">apiVersion</a>() -> string</code>
- <code title="post /upload">client.<a href="./src/index.ts">upload</a>({ ...params }) -> Upload</code>

# Shared

Types:

- <code><a href="./src/resources/shared.ts">AdvancedCitationsConfig</a></code>
- <code><a href="./src/resources/shared.ts">AdvancedProcessingOptions</a></code>
- <code><a href="./src/resources/shared.ts">ArrayExtractConfig</a></code>
- <code><a href="./src/resources/shared.ts">AsyncEditResponse</a></code>
- <code><a href="./src/resources/shared.ts">AsyncExtractResponse</a></code>
- <code><a href="./src/resources/shared.ts">AsyncParseResponse</a></code>
- <code><a href="./src/resources/shared.ts">AsyncPipelineResponse</a></code>
- <code><a href="./src/resources/shared.ts">AsyncSplitResponse</a></code>
- <code><a href="./src/resources/shared.ts">BaseProcessingOptions</a></code>
- <code><a href="./src/resources/shared.ts">Chunking</a></code>
- <code><a href="./src/resources/shared.ts">ChunkingConfig</a></code>
- <code><a href="./src/resources/shared.ts">ClassifyResponse</a></code>
- <code><a href="./src/resources/shared.ts">DirectWebhookConfig</a></code>
- <code><a href="./src/resources/shared.ts">EditResponse</a></code>
- <code><a href="./src/resources/shared.ts">EnrichConfig</a></code>
- <code><a href="./src/resources/shared.ts">ExperimentalProcessingOptions</a></code>
- <code><a href="./src/resources/shared.ts">ExtractResponse</a></code>
- <code><a href="./src/resources/shared.ts">FigureAgentic</a></code>
- <code><a href="./src/resources/shared.ts">FigureSummaryConfig</a></code>
- <code><a href="./src/resources/shared.ts">LargeTableChunkingConfig</a></code>
- <code><a href="./src/resources/shared.ts">ParseResponse</a></code>
- <code><a href="./src/resources/shared.ts">PipelineResponse</a></code>
- <code><a href="./src/resources/shared.ts">SplitLargeTables</a></code>
- <code><a href="./src/resources/shared.ts">SplitResponse</a></code>
- <code><a href="./src/resources/shared.ts">SvixWebhookConfig</a></code>
- <code><a href="./src/resources/shared.ts">TableAgentic</a></code>
- <code><a href="./src/resources/shared.ts">TableSummaryConfig</a></code>
- <code><a href="./src/resources/shared.ts">TextAgentic</a></code>
- <code><a href="./src/resources/shared.ts">Upload</a></code>
- <code><a href="./src/resources/shared.ts">WebhookConfigNew</a></code>

=======
>>>>>>> main
# Parse

Types:

<<<<<<< HEAD
- <code><a href="./src/resources/parse.ts">AsyncConfigV3</a></code>
- <code><a href="./src/resources/parse.ts">AsyncParseConfig</a></code>
- <code><a href="./src/resources/parse.ts">Enhance</a></code>
- <code><a href="./src/resources/parse.ts">Formatting</a></code>
- <code><a href="./src/resources/parse.ts">Retrieval</a></code>
- <code><a href="./src/resources/parse.ts">Settings</a></code>
- <code><a href="./src/resources/parse.ts">Spreadsheet</a></code>
- <code><a href="./src/resources/parse.ts">ParseRunResponse</a></code>

Methods:

- <code title="post /parse">client.parse.<a href="./src/resources/parse.ts">run</a>({ ...params }) -> ParseRunResponse</code>
- <code title="post /parse_async">client.parse.<a href="./src/resources/parse.ts">runJob</a>({ ...params }) -> AsyncParseResponse</code>
=======
- <code><a href="./src/resources/parse.ts">ParseResponse</a></code>
- <code><a href="./src/resources/parse.ts">ParseCreateResponse</a></code>

Methods:

- <code title="post /parse">client.parse.<a href="./src/resources/parse.ts">create</a>({ ...params }) -> ParseCreateResponse</code>

# ParseAsync

Types:

- <code><a href="./src/resources/parse-async.ts">AsyncConfigV3</a></code>
- <code><a href="./src/resources/parse-async.ts">AsyncParseConfig</a></code>
- <code><a href="./src/resources/parse-async.ts">AsyncParseResponse</a></code>
- <code><a href="./src/resources/parse-async.ts">Enhance</a></code>
- <code><a href="./src/resources/parse-async.ts">Formatting</a></code>
- <code><a href="./src/resources/parse-async.ts">Retrieval</a></code>
- <code><a href="./src/resources/parse-async.ts">Settings</a></code>
- <code><a href="./src/resources/parse-async.ts">Spreadsheet</a></code>

Methods:

- <code title="post /parse_async">client.parseAsync.<a href="./src/resources/parse-async.ts">create</a>({ ...params }) -> AsyncParseResponse</code>
>>>>>>> main

# Extract

Types:

<<<<<<< HEAD
- <code><a href="./src/resources/extract.ts">AsyncExtractConfig</a></code>
- <code><a href="./src/resources/extract.ts">ExtractSettings</a></code>
- <code><a href="./src/resources/extract.ts">ExtractUsage</a></code>
- <code><a href="./src/resources/extract.ts">Instructions</a></code>
- <code><a href="./src/resources/extract.ts">ParseOptions</a></code>
- <code><a href="./src/resources/extract.ts">V3Extract</a></code>
- <code><a href="./src/resources/extract.ts">ExtractRunResponse</a></code>

Methods:

- <code title="post /extract">client.extract.<a href="./src/resources/extract.ts">run</a>({ ...params }) -> ExtractRunResponse</code>
- <code title="post /extract_async">client.extract.<a href="./src/resources/extract.ts">runJob</a>({ ...params }) -> AsyncExtractResponse</code>
=======
- <code><a href="./src/resources/extract.ts">ExtractUsage</a></code>
- <code><a href="./src/resources/extract.ts">V3Extract</a></code>
- <code><a href="./src/resources/extract.ts">ExtractCreateResponse</a></code>

Methods:

- <code title="post /extract">client.extract.<a href="./src/resources/extract.ts">create</a>({ ...params }) -> ExtractCreateResponse</code>

# ExtractAsync

Types:

- <code><a href="./src/resources/extract-async.ts">AsyncExtractConfig</a></code>
- <code><a href="./src/resources/extract-async.ts">AsyncExtractResponse</a></code>
- <code><a href="./src/resources/extract-async.ts">ExtractSettings</a></code>
- <code><a href="./src/resources/extract-async.ts">Instructions</a></code>
- <code><a href="./src/resources/extract-async.ts">ParseOptions</a></code>

Methods:

- <code title="post /extract_async">client.extractAsync.<a href="./src/resources/extract-async.ts">create</a>({ ...params }) -> AsyncExtractResponse</code>
>>>>>>> main

# Split

Types:

- <code><a href="./src/resources/split.ts">DeepSplitPageEvidence</a></code>
- <code><a href="./src/resources/split.ts">ParseUsage</a></code>
- <code><a href="./src/resources/split.ts">SplitCategory</a></code>
<<<<<<< HEAD
=======
- <code><a href="./src/resources/split.ts">SplitResponse</a></code>
>>>>>>> main
- <code><a href="./src/resources/split.ts">SplitTableOptions</a></code>

Methods:

<<<<<<< HEAD
- <code title="post /split">client.split.<a href="./src/resources/split.ts">run</a>({ ...params }) -> SplitResponse</code>
- <code title="post /split_async">client.split.<a href="./src/resources/split.ts">runJob</a>({ ...params }) -> AsyncSplitResponse</code>
=======
- <code title="post /split">client.split.<a href="./src/resources/split.ts">create</a>({ ...params }) -> SplitResponse</code>

# SplitAsync

Types:

- <code><a href="./src/resources/split-async.ts">SplitAsyncCreateResponse</a></code>

Methods:

- <code title="post /split_async">client.splitAsync.<a href="./src/resources/split-async.ts">create</a>({ ...params }) -> SplitAsyncCreateResponse</code>
>>>>>>> main

# Edit

Types:

- <code><a href="./src/resources/edit.ts">BoundingBox</a></code>
- <code><a href="./src/resources/edit.ts">EditOptions</a></code>
<<<<<<< HEAD
=======
- <code><a href="./src/resources/edit.ts">EditResponse</a></code>
>>>>>>> main
- <code><a href="./src/resources/edit.ts">EditWidget</a></code>

Methods:

<<<<<<< HEAD
- <code title="post /edit">client.edit.<a href="./src/resources/edit.ts">run</a>({ ...params }) -> EditResponse</code>
- <code title="post /edit_async">client.edit.<a href="./src/resources/edit.ts">runJob</a>({ ...params }) -> AsyncEditResponse</code>
=======
- <code title="post /edit">client.edit.<a href="./src/resources/edit.ts">submit</a>({ ...params }) -> EditResponse</code>

# EditAsync

Types:

- <code><a href="./src/resources/edit-async.ts">EditAsyncCreateResponse</a></code>

Methods:

- <code title="post /edit_async">client.editAsync.<a href="./src/resources/edit-async.ts">create</a>({ ...params }) -> EditAsyncCreateResponse</code>
>>>>>>> main

# Pipeline

Types:

<<<<<<< HEAD
=======
- <code><a href="./src/resources/pipeline.ts">PipelineResponse</a></code>
>>>>>>> main
- <code><a href="./src/resources/pipeline.ts">PipelineSettings</a></code>

Methods:

<<<<<<< HEAD
- <code title="post /pipeline">client.pipeline.<a href="./src/resources/pipeline.ts">run</a>({ ...params }) -> PipelineResponse</code>
- <code title="post /pipeline_async">client.pipeline.<a href="./src/resources/pipeline.ts">runJob</a>({ ...params }) -> AsyncPipelineResponse</code>
=======
- <code title="post /pipeline">client.pipeline.<a href="./src/resources/pipeline.ts">create</a>({ ...params }) -> PipelineResponse</code>

# PipelineAsync

Types:

- <code><a href="./src/resources/pipeline-async.ts">PipelineAsyncCreateResponse</a></code>

Methods:

- <code title="post /pipeline_async">client.pipelineAsync.<a href="./src/resources/pipeline-async.ts">create</a>({ ...params }) -> PipelineAsyncCreateResponse</code>
>>>>>>> main

# Classify

Types:

<<<<<<< HEAD
=======
- <code><a href="./src/resources/classify.ts">ClassifyResponse</a></code>
>>>>>>> main
- <code><a href="./src/resources/classify.ts">PageRange</a></code>

Methods:

<<<<<<< HEAD
- <code title="post /classify">client.classify.<a href="./src/resources/classify.ts">run</a>({ ...params }) -> ClassifyResponse</code>

# Webhook

Types:

- <code><a href="./src/resources/webhook.ts">WebhookRunResponse</a></code>

Methods:

- <code title="post /configure_webhook">client.webhook.<a href="./src/resources/webhook.ts">run</a>() -> string</code>
=======
- <code title="post /classify">client.classify.<a href="./src/resources/classify.ts">create</a>({ ...params }) -> ClassifyResponse</code>

# Cancel

Types:

- <code><a href="./src/resources/cancel.ts">CancelCancelJobResponse</a></code>

Methods:

- <code title="post /cancel/{job_id}">client.cancel.<a href="./src/resources/cancel.ts">cancelJob</a>(jobId) -> unknown</code>

# Upload

Types:

- <code><a href="./src/resources/upload.ts">UploadResponse</a></code>

Methods:

- <code title="post /upload">client.upload.<a href="./src/resources/upload.ts">create</a>({ ...params }) -> UploadResponse</code>

# ConfigureWebhook

Types:

- <code><a href="./src/resources/configure-webhook.ts">ConfigureWebhookCreateResponse</a></code>

Methods:

- <code title="post /configure_webhook">client.configureWebhook.<a href="./src/resources/configure-webhook.ts">create</a>() -> string</code>

# Version

Types:

- <code><a href="./src/resources/version.ts">VersionRetrieveResponse</a></code>

Methods:

- <code title="get /version">client.version.<a href="./src/resources/version.ts">retrieve</a>() -> string</code>
>>>>>>> main

# Job

Types:

<<<<<<< HEAD
- <code><a href="./src/resources/job.ts">JobCancelResponse</a></code>
- <code><a href="./src/resources/job.ts">JobGetResponse</a></code>
- <code><a href="./src/resources/job.ts">JobGetAllResponse</a></code>

Methods:

- <code title="post /cancel/{job_id}">client.job.<a href="./src/resources/job.ts">cancel</a>(jobId) -> unknown</code>
- <code title="get /job/{job_id}">client.job.<a href="./src/resources/job.ts">get</a>(jobId) -> JobGetResponse</code>
- <code title="get /jobs">client.job.<a href="./src/resources/job.ts">getAll</a>({ ...params }) -> JobGetAllResponse</code>
=======
- <code><a href="./src/resources/job.ts">ExtractResponse</a></code>
- <code><a href="./src/resources/job.ts">JobRetrieveResponse</a></code>
- <code><a href="./src/resources/job.ts">JobListResponse</a></code>

Methods:

- <code title="get /job/{job_id}">client.job.<a href="./src/resources/job.ts">retrieve</a>(jobId) -> JobRetrieveResponse</code>
- <code title="get /jobs">client.job.<a href="./src/resources/job.ts">list</a>({ ...params }) -> JobListResponse</code>
>>>>>>> main
