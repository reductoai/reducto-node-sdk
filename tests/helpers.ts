/**
 * `APIPromise` is a `Promise` subclass whose underlying promise resolves to `null`
 * immediately — it overrides `then`/`catch`/`finally` to parse the response lazily.
 * bun's `expect().rejects` reads the promise's internal state rather than going
 * through `then`, so it sees those promises as already resolved. Awaiting inside a
 * plain async function hands `expect` a native promise that settles for real.
 */
export const settled = <T>(promise: PromiseLike<T>): Promise<T> => (async () => await promise)();
