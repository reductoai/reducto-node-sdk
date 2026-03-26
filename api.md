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

# Parse

Types:

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

# Extract

Types:

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

# Split

Types:

- <code><a href="./src/resources/split.ts">DeepSplitPageEvidence</a></code>
- <code><a href="./src/resources/split.ts">ParseUsage</a></code>
- <code><a href="./src/resources/split.ts">SplitCategory</a></code>
- <code><a href="./src/resources/split.ts">SplitTableOptions</a></code>

Methods:

- <code title="post /split">client.split.<a href="./src/resources/split.ts">run</a>({ ...params }) -> SplitResponse</code>
- <code title="post /split_async">client.split.<a href="./src/resources/split.ts">runJob</a>({ ...params }) -> AsyncSplitResponse</code>

# Edit

Types:

- <code><a href="./src/resources/edit.ts">BoundingBox</a></code>
- <code><a href="./src/resources/edit.ts">EditOptions</a></code>
- <code><a href="./src/resources/edit.ts">EditWidget</a></code>

Methods:

- <code title="post /edit">client.edit.<a href="./src/resources/edit.ts">run</a>({ ...params }) -> EditResponse</code>
- <code title="post /edit_async">client.edit.<a href="./src/resources/edit.ts">runJob</a>({ ...params }) -> AsyncEditResponse</code>

# Pipeline

Types:

- <code><a href="./src/resources/pipeline.ts">PipelineSettings</a></code>

Methods:

- <code title="post /pipeline">client.pipeline.<a href="./src/resources/pipeline.ts">run</a>({ ...params }) -> PipelineResponse</code>
- <code title="post /pipeline_async">client.pipeline.<a href="./src/resources/pipeline.ts">runJob</a>({ ...params }) -> AsyncPipelineResponse</code>

# Classify

Types:

- <code><a href="./src/resources/classify.ts">PageRange</a></code>

Methods:

- <code title="post /classify">client.classify.<a href="./src/resources/classify.ts">run</a>({ ...params }) -> ClassifyResponse</code>

# Webhook

Types:

- <code><a href="./src/resources/webhook.ts">WebhookRunResponse</a></code>

Methods:

- <code title="post /configure_webhook">client.webhook.<a href="./src/resources/webhook.ts">run</a>() -> string</code>

# Job

Types:

- <code><a href="./src/resources/job.ts">JobCancelResponse</a></code>
- <code><a href="./src/resources/job.ts">JobGetResponse</a></code>
- <code><a href="./src/resources/job.ts">JobGetAllResponse</a></code>

Methods:

- <code title="post /cancel/{job_id}">client.job.<a href="./src/resources/job.ts">cancel</a>(jobId) -> unknown</code>
- <code title="get /job/{job_id}">client.job.<a href="./src/resources/job.ts">get</a>(jobId) -> JobGetResponse</code>
- <code title="get /jobs">client.job.<a href="./src/resources/job.ts">getAll</a>({ ...params }) -> JobGetAllResponse</code>
