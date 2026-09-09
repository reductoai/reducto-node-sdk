import { plugin } from 'bun';
import path from 'path';

/**
 * `reductoai/_shims/index` resolves to the hand-written `src/_shims/index.mjs`, which imports
 * `./registry.mjs` — a file that only exists in `dist/` after a build. Point it at the source
 * instead so the shims work when running tests straight off `src/`.
 */
plugin({
  name: 'reductoai-shims',
  setup(build) {
    build.onResolve({ filter: /^\.\/registry\.mjs$/ }, () => ({
      path: path.join(__dirname, '..', 'src', '_shims', 'registry.ts'),
    }));
  },
});
