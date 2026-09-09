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
