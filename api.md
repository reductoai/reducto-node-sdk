# Reducto

Types:

- <code><a href="./src/resources/top-level.ts">APIVersionResponse</a></code>

Methods:

- <code title="get /version">client.<a href="./src/index.ts">apiVersion</a>() -> unknown</code>
- <code title="post /upload">client.<a href="./src/index.ts">upload</a>({ ...params }) -> Upload</code>

# Shared

Types:

- <code><a href="./src/resources/shared.ts">AdvancedCitationsConfig</a></code>
- <code><a href="./src/resources/shared.ts">AdvancedProcessingOptions</a></code>
- <code><a href="./src/resources/shared.ts">ArrayExtractConfig</a></code>
- <code><a href="./src/resources/shared.ts">BaseProcessingOptions</a></code>
- <code><a href="./src/resources/shared.ts">BoundingBox</a></code>
- <code><a href="./src/resources/shared.ts">ChunkingConfig</a></code>
- <code><a href="./src/resources/shared.ts">EditResponse</a></code>
- <code><a href="./src/resources/shared.ts">EnrichConfig</a></code>
- <code><a href="./src/resources/shared.ts">ExperimentalProcessingOptions</a></code>
- <code><a href="./src/resources/shared.ts">ExtractResponse</a></code>
- <code><a href="./src/resources/shared.ts">FigureSummaryConfig</a></code>
- <code><a href="./src/resources/shared.ts">LargeTableChunkingConfig</a></code>
- <code><a href="./src/resources/shared.ts">PageRange</a></code>
- <code><a href="./src/resources/shared.ts">ParseResponse</a></code>
- <code><a href="./src/resources/shared.ts">ParseUsage</a></code>
- <code><a href="./src/resources/shared.ts">PipelineResponse</a></code>
- <code><a href="./src/resources/shared.ts">SplitCategory</a></code>
- <code><a href="./src/resources/shared.ts">SplitResponse</a></code>
- <code><a href="./src/resources/shared.ts">TableSummaryConfig</a></code>
- <code><a href="./src/resources/shared.ts">Upload</a></code>
- <code><a href="./src/resources/shared.ts">WebhookConfigNew</a></code>

# Job

Types:

- <code><a href="./src/resources/job.ts">JobCancelResponse</a></code>
- <code><a href="./src/resources/job.ts">JobGetResponse</a></code>
- <code><a href="./src/resources/job.ts">JobGetAllResponse</a></code>

Methods:

- <code title="post /cancel/{job_id}">client.job.<a href="./src/resources/job.ts">cancel</a>(jobId) -> unknown</code>
- <code title="get /job/{job_id}">client.job.<a href="./src/resources/job.ts">get</a>(jobId) -> JobGetResponse</code>
- <code title="get /jobs">client.job.<a href="./src/resources/job.ts">getAll</a>({ ...params }) -> JobGetAllResponse</code>

# Split

Types:

- <code><a href="./src/resources/split.ts">SplitRunJobResponse</a></code>

Methods:

- <code title="post /split">client.split.<a href="./src/resources/split.ts">run</a>({ ...params }) -> SplitResponse</code>
- <code title="post /split_async">client.split.<a href="./src/resources/split.ts">runJob</a>({ ...params }) -> SplitRunJobResponse</code>

# Parse

Types:

- <code><a href="./src/resources/parse.ts">ParseRunResponse</a></code>
- <code><a href="./src/resources/parse.ts">ParseRunJobResponse</a></code>

Methods:

- <code title="post /parse">client.parse.<a href="./src/resources/parse.ts">run</a>({ ...params }) -> ParseRunResponse</code>
- <code title="post /parse_async">client.parse.<a href="./src/resources/parse.ts">runJob</a>({ ...params }) -> ParseRunJobResponse</code>

# Extract

Types:

- <code><a href="./src/resources/extract.ts">ExtractRunResponse</a></code>
- <code><a href="./src/resources/extract.ts">ExtractRunJobResponse</a></code>

Methods:

- <code title="post /extract">client.extract.<a href="./src/resources/extract.ts">run</a>({ ...params }) -> ExtractRunResponse</code>
- <code title="post /extract_async">client.extract.<a href="./src/resources/extract.ts">runJob</a>({ ...params }) -> ExtractRunJobResponse</code>

# Edit

Types:

- <code><a href="./src/resources/edit.ts">EditRunJobResponse</a></code>

Methods:

- <code title="post /edit">client.edit.<a href="./src/resources/edit.ts">run</a>({ ...params }) -> EditResponse</code>
- <code title="post /edit_async">client.edit.<a href="./src/resources/edit.ts">runJob</a>({ ...params }) -> EditRunJobResponse</code>

# Pipeline

Types:

- <code><a href="./src/resources/pipeline.ts">PipelineRunJobResponse</a></code>

Methods:

- <code title="post /pipeline">client.pipeline.<a href="./src/resources/pipeline.ts">run</a>({ ...params }) -> PipelineResponse</code>
- <code title="post /pipeline_async">client.pipeline.<a href="./src/resources/pipeline.ts">runJob</a>({ ...params }) -> PipelineRunJobResponse</code>

# Webhook

Types:

- <code><a href="./src/resources/webhook.ts">WebhookRunResponse</a></code>

Methods:

- <code title="post /configure_webhook">client.webhook.<a href="./src/resources/webhook.ts">run</a>() -> string</code>

# Config

Types:

- <code><a href="./src/resources/config.ts">ExtractConfig</a></code>
- <code><a href="./src/resources/config.ts">ParseConfig</a></code>
