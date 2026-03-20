# Parse

Types:

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

# Extract

Types:

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

# Split

Types:

- <code><a href="./src/resources/split.ts">DeepSplitPageEvidence</a></code>
- <code><a href="./src/resources/split.ts">ParseUsage</a></code>
- <code><a href="./src/resources/split.ts">SplitCategory</a></code>
- <code><a href="./src/resources/split.ts">SplitResponse</a></code>
- <code><a href="./src/resources/split.ts">SplitTableOptions</a></code>

Methods:

- <code title="post /split">client.split.<a href="./src/resources/split.ts">create</a>({ ...params }) -> SplitResponse</code>

# SplitAsync

Types:

- <code><a href="./src/resources/split-async.ts">SplitAsyncCreateResponse</a></code>

Methods:

- <code title="post /split_async">client.splitAsync.<a href="./src/resources/split-async.ts">create</a>({ ...params }) -> SplitAsyncCreateResponse</code>

# Edit

Types:

- <code><a href="./src/resources/edit.ts">BoundingBox</a></code>
- <code><a href="./src/resources/edit.ts">EditOptions</a></code>
- <code><a href="./src/resources/edit.ts">EditResponse</a></code>
- <code><a href="./src/resources/edit.ts">EditWidget</a></code>

Methods:

- <code title="post /edit">client.edit.<a href="./src/resources/edit.ts">submit</a>({ ...params }) -> EditResponse</code>

# EditAsync

Types:

- <code><a href="./src/resources/edit-async.ts">EditAsyncCreateResponse</a></code>

Methods:

- <code title="post /edit_async">client.editAsync.<a href="./src/resources/edit-async.ts">create</a>({ ...params }) -> EditAsyncCreateResponse</code>

# Pipeline

Types:

- <code><a href="./src/resources/pipeline.ts">PipelineResponse</a></code>
- <code><a href="./src/resources/pipeline.ts">PipelineSettings</a></code>

Methods:

- <code title="post /pipeline">client.pipeline.<a href="./src/resources/pipeline.ts">create</a>({ ...params }) -> PipelineResponse</code>

# PipelineAsync

Types:

- <code><a href="./src/resources/pipeline-async.ts">PipelineAsyncCreateResponse</a></code>

Methods:

- <code title="post /pipeline_async">client.pipelineAsync.<a href="./src/resources/pipeline-async.ts">create</a>({ ...params }) -> PipelineAsyncCreateResponse</code>

# Classify

Types:

- <code><a href="./src/resources/classify.ts">ClassifyResponse</a></code>
- <code><a href="./src/resources/classify.ts">PageRange</a></code>

Methods:

- <code title="post /classify">client.classify.<a href="./src/resources/classify.ts">classify</a>({ ...params }) -> ClassifyResponse</code>

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

# Job

Types:

- <code><a href="./src/resources/job.ts">ExtractResponse</a></code>
- <code><a href="./src/resources/job.ts">JobRetrieveResponse</a></code>
- <code><a href="./src/resources/job.ts">JobListResponse</a></code>

Methods:

- <code title="get /job/{job_id}">client.job.<a href="./src/resources/job.ts">retrieve</a>(jobId) -> JobRetrieveResponse</code>
- <code title="get /jobs">client.job.<a href="./src/resources/job.ts">list</a>({ ...params }) -> JobListResponse</code>
