## Setting up the environment

This repository uses [bun](https://bun.sh) for everything: installing dependencies, running tests,
linting, and building.

```sh
$ bun install
$ bun run build
```

This will install all the required dependencies and build output files to `dist/`.

## Adding and running examples

All files in the `examples/` directory can be freely edited or added to.

```ts
// add an example to examples/<your-example>.ts
```

```sh
# run the example against your api
$ bun run examples/<your-example>.ts
```

## Using the repository from source

If you'd like to use the repository from source, you can either install from git or link to a cloned repository:

To install via git:

```sh
$ npm install git+ssh://git@github.com:reductoai/reducto-node-sdk.git
```

Alternatively, to link a local copy of the repo:

```sh
# Clone
$ git clone https://www.github.com/reductoai/reducto-node-sdk
$ cd reducto-node-sdk

$ bun link
$ cd ../my-package
$ bun link reductoai
```

## Running tests

Unit tests run against the SDK internals — retries, timeouts, header handling, multipart encoding
and query serialization. They need no API key and no network:

```sh
$ bun test
```

End-to-end tests hit the live Reducto API and require a valid key. They run automatically on pull
requests against `main` and `next`:

```sh
$ REDUCTO_API_KEY=... bun run test:e2e
```

## Linting and formatting

This repository uses [prettier](https://www.npmjs.com/package/prettier) and
[eslint](https://www.npmjs.com/package/eslint) to format the code in the repository.

To lint (eslint plus `tsc --noEmit`):

```sh
$ bun run lint
```

To format and fix all lint issues automatically:

```sh
$ bun run format
```

## Checking for API spec drift

`scripts/spec-drift.ts` compares the SDK request and response types against the
public OpenAPI spec. It does not match on schema names. It anchors each type to an
endpoint found in `src/resources/`, then walks both sides in parallel and compares
JSON property names, types, enum values, and required-ness. Types are erased at
runtime, so the SDK side is read statically with the TypeScript compiler API.

```sh
$ bun run spec-drift                        # committed snapshot
$ bun run spec-drift --live                 # https://reducto.ai/openapi.json
$ bun run spec-drift --spec other.json      # any URL or file
$ bun run spec-drift --update-snapshot      # refresh spec/openapi.json, then check
$ bun run spec-drift --json                 # machine-readable
$ bun run spec-drift --ignore extra         # hide one drift kind
```

Drift kinds: `endpoint`, `missing` (spec has it, SDK lacks it), `extra` (SDK has
it, spec lacks it), `type`, `enum`, `required`. The script exits 1 when it finds
drift, unless you pass `--warn-only`.

Known, intentional deviations go in `spec/drift-allowlist.json` with a reason.
Matching items are reported as allowed and do not fail the check; entries that
match nothing are flagged as stale.

### Spec snapshot

`spec/openapi.json` is a committed copy of the public spec. The `spec-drift`
workflow checks every PR against this snapshot, so the check is reproducible
and an upstream API change cannot turn an unrelated PR red.

Refreshing the snapshot is a manual step. Run `--update-snapshot`, sync the SDK
until the check is clean, then commit the new snapshot with the SDK changes.

## Publishing and releases

Releases are cut by hand. `CHANGELOG.md` is maintained manually.

1. Bump the version — this updates `package.json`, `src/version.ts`, and opens a `CHANGELOG.md`
   section for you to fill in:

   ```sh
   $ bun run bump-version 0.18.0
   ```

2. Commit the bump and merge it to `main`.

3. Tag the release commit and push the tag:

   ```sh
   $ git tag v0.18.0 && git push origin v0.18.0
   ```

4. Publish a GitHub release for that tag. That triggers
   [the `Publish NPM` workflow](https://www.github.com/reductoai/reducto-node-sdk/actions/workflows/publish-npm.yml),
   which builds and publishes to npm.

### Publish manually

If you need to release outside that flow, run the `bin/publish-npm` script with an `NPM_TOKEN` set on
the environment. You can also re-run the `Publish NPM` workflow manually if a publish failed.
