#!/usr/bin/env bun
/**
 * Bumps the release version in the one place it is authored (package.json) and the
 * one place it is mirrored (src/version.ts), then opens a CHANGELOG section for it.
 *
 * Usage: bun run bump-version 0.18.0
 */
import { $ } from 'bun';
import path from 'path';

const root = path.join(import.meta.dir, '..');
const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
  console.error('Usage: bun run bump-version <version>   (e.g. 0.18.0, 0.18.0-beta.1)');
  process.exit(1);
}

const pkgPath = path.join(root, 'package.json');
const pkg = await Bun.file(pkgPath).json();
const previous = pkg.version;
pkg.version = version;
await Bun.write(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

const versionPath = path.join(root, 'src', 'version.ts');
const versionSrc = await Bun.file(versionPath).text();
await Bun.write(versionPath, versionSrc.replace(/(export const VERSION = ')(.*)(')/, `$1${version}$3`));

const changelogPath = path.join(root, 'CHANGELOG.md');
const changelog = await Bun.file(changelogPath).text();
const date = new Date().toISOString().slice(0, 10);
const repo = 'https://github.com/reductoai/reducto-node-sdk';
const heading = `## ${version} (${date})\n\nFull Changelog: [v${previous}...v${version}](${repo}/compare/v${previous}...v${version})\n\n`;
await Bun.write(changelogPath, changelog.replace(/^# Changelog\n\n/, `# Changelog\n\n${heading}`));

console.log(`Bumped ${previous} -> ${version}.`);
console.log('Next: fill in the CHANGELOG entry, commit, then:');
console.log(`  git tag v${version} && git push origin v${version}`);
console.log('  and publish a GitHub release for that tag to trigger the Publish NPM workflow.');

await $`true`;
