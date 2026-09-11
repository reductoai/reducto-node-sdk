#!/usr/bin/env bun
/**
 * Report drift between the SDK types and the Reducto OpenAPI spec.
 *
 * Schema names in the spec do not match SDK type names, so nothing is matched by
 * name. Each SDK request/response type is anchored to an endpoint discovered from
 * `src/resources/*.ts` and `src/index.ts`, then both sides are normalized into one
 * shape model and walked in parallel, comparing JSON property names, types, enum
 * values, and required-ness.
 *
 * `spec/drift-allowlist.json` lists known, intentional deviations with a reason.
 * Matching items are reported as allowed and do not fail the check. Entries that
 * match nothing are flagged as stale.
 *
 * The check runs against the committed snapshot `spec/openapi.json` by default, so
 * it is reproducible and needs no network. `--live` checks against the public URL.
 * `--update-snapshot` fetches the live spec, rewrites the snapshot, then checks.
 * Refreshing the snapshot is a manual step; commit it together with the SDK sync.
 *
 * Usage:
 *   bun run scripts/spec-drift.ts [--spec URL|PATH | --live] [--update-snapshot] [--json] [--warn-only]
 */
import ts from 'typescript';
import path from 'path';
import fs from 'fs';

const REPO = path.join(__dirname, '..');
const LIVE_SPEC = 'https://reducto.ai/openapi.json';
const SNAPSHOT = path.join(REPO, 'spec', 'openapi.json');
const ALLOWLIST = path.join(REPO, 'spec', 'drift-allowlist.json');
const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'] as const;
const SUCCESS_CODES = ['200', '201', '202'];
const SIMILARITY_DEPTH = 2;

type JsonDict = Record<string, any>;

// Shape model

type Kind = 'object' | 'enum' | 'primitive' | 'array' | 'map' | 'union' | 'any';

interface Shape {
  kind: Kind;
  type: string;
  props: Record<string, Shape>;
  required: Set<string>;
  values: Set<unknown>;
  items: Shape | null;
  members: Shape[];
  label: string;
  hasDefault: boolean;
}

const shape = (kind: Kind, over: Partial<Shape> = {}): Shape => ({
  kind,
  type: '',
  props: {},
  required: new Set(),
  values: new Set(),
  items: null,
  members: [],
  label: '',
  hasDefault: false,
  ...over,
});

const ANY = shape('any');
const prim = (type: string): Shape => shape('primitive', { type });

function union(members: Shape[]): Shape {
  const flat: Shape[] = [];
  for (const m of members) flat.push(...(m.kind === 'union' ? m.members : [m]));

  // A TypeScript string-literal union (`'a' | 'b'`) arrives as one member per
  // literal; the spec models the same thing as a single `enum`. Collapse them so
  // the two sides line up.
  const enums = flat.filter((m) => m.kind === 'enum');
  const rest = flat.filter((m) => m.kind !== 'enum');
  if (enums.length > 1) {
    const values = new Set(enums.flatMap((e) => [...e.values]));
    rest.unshift(shape('enum', { values, label: enums.find((e) => e.label)?.label ?? '' }));
  } else {
    rest.unshift(...enums);
  }

  const dedup: Shape[] = [];
  for (const m of rest) if (!dedup.some((d) => sameSignature(m, d))) dedup.push(m);
  return dedup.length === 1 ? dedup[0]! : shape('union', { members: dedup });
}

function sameSignature(a: Shape, b: Shape): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'primitive') return a.type === b.type;
  if (a.kind === 'object') {
    const ak = Object.keys(a.props);
    const bk = Object.keys(b.props);
    return ak.length === bk.length && ak.every((k) => b.props[k] && sameSignature(a.props[k]!, b.props[k]!));
  }
  if (a.kind === 'enum') return setEqual(a.values, b.values);
  if (a.kind === 'array' || a.kind === 'map')
    return !!a.items && !!b.items && sameSignature(a.items, b.items);
  if (a.kind === 'union') {
    return (
      a.members.length === b.members.length &&
      a.members.every((x) => b.members.some((y) => sameSignature(x, y)))
    );
  }
  return true;
}

const setEqual = <T>(a: Set<T>, b: Set<T>) => a.size === b.size && [...a].every((v) => b.has(v));
const difference = <T>(a: Set<T>, b: Set<T>) => new Set([...a].filter((v) => !b.has(v)));

// Spec side

class Spec {
  readonly schemas: JsonDict;
  readonly version: string;

  constructor(readonly doc: JsonDict) {
    this.schemas = doc.components?.schemas ?? {};
    this.version = String(doc.info?.version ?? 'unknown');
  }

  resolve(node: JsonDict): JsonDict {
    while (node.$ref) node = this.schemas[node.$ref.split('/').pop()!];
    return node;
  }

  shape(node: JsonDict, seen: ReadonlySet<string> = new Set()): Shape {
    const out = this.shapeOf(node, seen);
    return 'default' in node && !out.hasDefault ? { ...out, hasDefault: true } : out;
  }

  private shapeOf(node: JsonDict, seen: ReadonlySet<string>): Shape {
    let label = '';
    if (node.$ref) {
      label = node.$ref.split('/').pop()!;
      if (seen.has(label)) return shape('any', { label });
      seen = new Set([...seen, label]);
      node = this.resolve(node);
    }

    const variants = node.anyOf ?? node.oneOf;
    if (variants) return union(variants.map((v: JsonDict) => this.shape(v, seen)));
    if (node.allOf) {
      const merged: JsonDict = { type: 'object', properties: {}, required: [] };
      for (const part of node.allOf.map((p: JsonDict) => this.resolve(p))) {
        Object.assign(merged.properties, part.properties ?? {});
        merged.required.push(...(part.required ?? []));
      }
      node = merged;
    }

    if ('const' in node) return shape('enum', { values: new Set([node.const]), label });
    if (node.enum) return shape('enum', { values: new Set(node.enum), label });

    const t = node.type;
    if (Array.isArray(t)) return union(t.map((x: string) => this.shape({ ...node, type: x }, seen)));
    if (t === 'array') return shape('array', { items: this.shape(node.items ?? {}, seen), label });
    if (t === 'object' || node.properties) {
      if (node.properties) {
        const props: Record<string, Shape> = {};
        for (const [k, v] of Object.entries<JsonDict>(node.properties)) props[k] = this.shape(v, seen);
        return shape('object', { props, required: new Set<string>(node.required ?? []), label });
      }
      const extra = node.additionalProperties;
      return shape('map', {
        items: extra && typeof extra === 'object' ? this.shape(extra, seen) : ANY,
        label,
      });
    }
    if (t === 'string' && node.format === 'binary') return prim('file');
    if (['string', 'integer', 'number', 'boolean', 'null'].includes(t)) return prim(t);
    return shape('any', { label });
  }

  operation(method: string, specPath: string): JsonDict | null {
    return this.doc.paths?.[specPath]?.[method] ?? null;
  }

  requestBody(op: JsonDict): Shape | null {
    const content = op.requestBody?.content ?? {};
    for (const ct of ['application/json', 'multipart/form-data', 'application/x-www-form-urlencoded']) {
      if (content[ct]) return this.shape(content[ct].schema);
    }
    return null;
  }

  query(op: JsonDict): Shape | null {
    const params = (op.parameters ?? []).filter((p: JsonDict) => p.in === 'query');
    if (!params.length) return null;
    const props: Record<string, Shape> = {};
    for (const p of params) props[p.name] = this.shape(p.schema ?? {});
    return shape('object', {
      props,
      required: new Set<string>(params.filter((p: JsonDict) => p.required).map((p: JsonDict) => p.name)),
    });
  }

  response(op: JsonDict): Shape | null {
    for (const code of SUCCESS_CODES) {
      const content = op.responses?.[code]?.content ?? {};
      if (content['application/json']) return this.shape(content['application/json'].schema);
    }
    return null;
  }

  endpoints(): Set<string> {
    const out = new Set<string>();
    for (const [p, ops] of Object.entries<JsonDict>(this.doc.paths ?? {})) {
      for (const method of Object.keys(ops)) {
        if ((HTTP_VERBS as readonly string[]).includes(method)) out.add(`${method} ${p}`);
      }
    }
    return out;
  }
}

// SDK side
//
// Types are erased at runtime, so the SDK side is read statically with the
// TypeScript compiler API: endpoints come from the AST, shapes from the checker.

const FILE_TYPES = new Set([
  'Uploadable',
  'FileLike',
  'ResponseLike',
  'FsReadStream',
  'ReadStream',
  'File',
  'Blob',
]);

class Sdk {
  readonly checker: ts.TypeChecker;

  constructor(readonly program: ts.Program) {
    this.checker = program.getTypeChecker();
  }

  shape(type: ts.Type, seen: ReadonlySet<number> = new Set()): Shape {
    const c = this.checker;
    const label = type.aliasSymbol?.name ?? type.getSymbol()?.name ?? '';

    if (FILE_TYPES.has(label)) return prim('file');
    if (type.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown | ts.TypeFlags.Never)) return ANY;
    if (type.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.Void)) return prim('null');
    if (type.isStringLiteral() || type.isNumberLiteral())
      return shape('enum', { values: new Set([type.value]) });
    if (type.flags & ts.TypeFlags.BooleanLiteral) {
      return shape('enum', { values: new Set([c.typeToString(type) === 'true']) });
    }
    if (type.flags & ts.TypeFlags.String) return prim('string');
    if (type.flags & ts.TypeFlags.Number) return prim('number');
    if (type.flags & ts.TypeFlags.Boolean) return prim('boolean');
    if (type.isUnion()) return union(type.types.map((t) => this.shape(t, seen)));
    if (type.isIntersection()) return this.shape(type.types[0]!, seen);

    if (c.isArrayType(type) || c.isTupleType(type)) {
      const arg = c.getTypeArguments(type as ts.TypeReference)[0];
      return shape('array', { items: arg ? this.shape(arg, seen) : ANY, label });
    }

    const id = (type as unknown as { id?: number }).id;
    if (id !== undefined) {
      if (seen.has(id)) return shape('any', { label });
      seen = new Set([...seen, id]);
    }

    const index = c.getIndexTypeOfType(type, ts.IndexKind.String);
    const props = type.getProperties();
    if (index && !props.length) return shape('map', { items: this.shape(index, seen), label });

    if (props.length) {
      const out: Record<string, Shape> = {};
      const required = new Set<string>();
      for (const sym of props) {
        const decl = sym.valueDeclaration ?? sym.declarations?.[0];
        const propType = decl ? c.getTypeOfSymbolAtLocation(sym, decl) : c.getDeclaredTypeOfSymbol(sym);
        out[sym.name] = this.shape(propType, seen);
        if (!(sym.flags & ts.SymbolFlags.Optional)) required.add(sym.name);
      }
      return shape('object', { props: out, required, label });
    }

    if (type.flags & ts.TypeFlags.Object) return shape('map', { items: ANY, label });
    return shape('any', { label });
  }
}

// Endpoint discovery

interface Endpoint {
  method: string;
  path: string;
  source: string;
  body: ts.Type | null;
  query: ts.Type | null;
  response: ts.Type | null;
  merged: boolean;
}

/** `/cancel/${jobId}` and `/cancel/{job_id}` both normalize to `/cancel/{}`. */
const normalizePath = (p: string) => p.replace(/\{[^}]*\}/g, '{}');

function literalPath(node: ts.Expression): string | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) {
    return (
      node.head.text + node.templateSpans.map((s) => `{${s.expression.getText()}}` + s.literal.text).join('')
    );
  }
  return null;
}

/** Unwrap `Core.maybeMultipartFormRequestOptions({...})` and friends. */
function optionsObject(node: ts.Expression | undefined): ts.ObjectLiteralExpression | null {
  if (!node) return null;
  if (ts.isCallExpression(node)) return optionsObject(node.arguments[0]);
  return ts.isObjectLiteralExpression(node) ? node : null;
}

function propertyValue(obj: ts.ObjectLiteralExpression, name: string): ts.Expression | null {
  for (const p of obj.properties) {
    if (ts.isPropertyAssignment(p) && p.name.getText() === name) return p.initializer;
    if (ts.isShorthandPropertyAssignment(p) && p.name.text === name) return p.name;
  }
  return null;
}

/**
 * A `const { extension, ...body } = params` destructure means one params type
 * feeds both body and query, so the two are compared as a single request shape.
 */
function destructuredFrom(node: ts.Expression, checker: ts.TypeChecker): ts.Type | null {
  if (!ts.isIdentifier(node)) return null;
  // `{ body }` shorthand: the symbol at the name is the property, not the value.
  const symbol =
    ts.isShorthandPropertyAssignment(node.parent) ?
      checker.getShorthandAssignmentValueSymbol(node.parent)
    : checker.getSymbolAtLocation(node);
  const decl = symbol?.declarations?.[0];
  if (!decl || !ts.isBindingElement(decl)) return null;
  const root = decl.parent.parent;
  return ts.isVariableDeclaration(root) && root.initializer ?
      checker.getTypeAtLocation(root.initializer)
    : null;
}

/** The `T` of a `Core.APIPromise<T>` return type. */
function responseType(method: ts.MethodDeclaration, checker: ts.TypeChecker): ts.Type | null {
  const signature = checker.getSignatureFromDeclaration(method);
  if (!signature) return null;
  const args = checker.getTypeArguments(signature.getReturnType() as ts.TypeReference);
  return args[0] ?? null;
}

function discoverEndpoints(sdk: Sdk): Endpoint[] {
  const checker = sdk.checker;
  const found = new Map<string, Endpoint>();
  const files = sdk.program
    .getSourceFiles()
    .filter((f) => !f.isDeclarationFile && /src\/(resources\/[^/]+|index)\.ts$/.test(f.fileName))
    .sort((a, b) => a.fileName.localeCompare(b.fileName));

  for (const file of files) {
    const visit = (node: ts.Node): void => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        (HTTP_VERBS as readonly string[]).includes(node.expression.name.text) &&
        node.arguments.length
      ) {
        const target = node.expression.expression.getText();
        const method = node.expression.name.text;
        const p = literalPath(node.arguments[0]!);
        if (
          (target === 'this' || target === 'this._client') &&
          p &&
          !found.has(`${method} ${normalizePath(p)}`)
        ) {
          const obj = optionsObject(node.arguments[1]);
          const bodyNode = obj && propertyValue(obj, 'body');
          const queryNode = obj && propertyValue(obj, 'query');
          const mergedType = bodyNode ? destructuredFrom(bodyNode, checker) : null;
          const enclosing = ts.findAncestor(node, ts.isMethodDeclaration);
          found.set(`${method} ${normalizePath(p)}`, {
            method,
            path: p,
            source: `${path.relative(REPO, file.fileName)}:${
              file.getLineAndCharacterOfPosition(node.getStart()).line + 1
            }`,
            body: mergedType ?? (bodyNode ? checker.getTypeAtLocation(bodyNode) : null),
            query: mergedType ?? (queryNode ? checker.getTypeAtLocation(queryNode) : null),
            response: enclosing ? responseType(enclosing, checker) : null,
            merged: mergedType !== null,
          });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
  }
  return [...found.values()];
}

// Comparison

type DriftKind = 'endpoint' | 'missing' | 'extra' | 'type' | 'enum' | 'required';
const DRIFT_KINDS: DriftKind[] = ['endpoint', 'missing', 'extra', 'type', 'enum', 'required'];

interface Drift {
  endpoint: string;
  location: string;
  kind: DriftKind;
  detail: string;
}

class Comparator {
  readonly drifts: Drift[] = [];

  constructor(
    readonly endpoint: string,
    readonly ignoreNull: boolean,
    readonly seenPairs: Set<string>,
  ) {}

  private report(location: string, kind: DriftKind, detail: string): void {
    this.drifts.push({ endpoint: this.endpoint, location, kind, detail });
  }

  compare(specShape: Shape, sdkShape: Shape, loc: string): void {
    if (specShape.kind === 'any' || sdkShape.kind === 'any') return;
    if (this.ignoreNull) {
      specShape = stripNull(specShape);
      sdkShape = stripNull(sdkShape);
    }
    if (specShape.kind === 'union' || sdkShape.kind === 'union') {
      this.compareUnion(specShape, sdkShape, loc);
      return;
    }
    if (specShape.kind === 'object' && specShape.label && sdkShape.label) {
      const pair = `${specShape.label} ${sdkShape.label}`;
      if (this.seenPairs.has(pair)) return;
      this.seenPairs.add(pair);
    }
    if (specShape.kind !== sdkShape.kind) {
      this.report(loc, 'type', `spec ${describe(specShape)}, sdk ${describe(sdkShape)}`);
      return;
    }
    if (specShape.kind === 'primitive') {
      if (specShape.type !== sdkShape.type && !(numeric(specShape.type) && numeric(sdkShape.type))) {
        this.report(loc, 'type', `spec ${specShape.type}, sdk ${sdkShape.type}`);
      }
    } else if (specShape.kind === 'enum') {
      const missing = difference(specShape.values, sdkShape.values);
      const extra = difference(sdkShape.values, specShape.values);
      if (missing.size) this.report(loc, 'enum', `sdk lacks values ${sortedStrings(missing)}`);
      if (extra.size) this.report(loc, 'enum', `spec lacks values ${sortedStrings(extra)}`);
    } else if (specShape.kind === 'array' || specShape.kind === 'map') {
      this.compare(
        specShape.items ?? ANY,
        sdkShape.items ?? ANY,
        loc + (specShape.kind === 'array' ? '[]' : '{}'),
      );
    } else if (specShape.kind === 'object') {
      this.compareObject(specShape, sdkShape, loc);
    }
  }

  private compareObject(specShape: Shape, sdkShape: Shape, loc: string): void {
    const specKeys = Object.keys(specShape.props);
    const sdkKeys = Object.keys(sdkShape.props);
    for (const name of specKeys.filter((k) => !(k in sdkShape.props)).sort()) {
      this.report(
        `${loc}.${name}`,
        'missing',
        `spec has field, sdk lacks it (${describe(specShape.props[name]!)})`,
      );
    }
    for (const name of sdkKeys.filter((k) => !(k in specShape.props)).sort()) {
      this.report(
        `${loc}.${name}`,
        'extra',
        `sdk has field, spec lacks it (${describe(sdkShape.props[name]!)})`,
      );
    }
    for (const name of specKeys.filter((k) => k in sdkShape.props).sort()) {
      const child = `${loc}.${name}`;
      this.compareRequired(specShape, sdkShape, name, child);
      this.compare(specShape.props[name]!, sdkShape.props[name]!, child);
    }
  }

  private compareRequired(specShape: Shape, sdkShape: Shape, name: string, loc: string): void {
    const specReq = specShape.required.has(name);
    const sdkReq = sdkShape.required.has(name);
    if (specReq === sdkReq) return;
    // Response models express nullable fields as `field: T | null`, so "required
    // but nullable" in the spec is not drift there. A response field with a
    // server default is always present, so the sdk may require it.
    if (this.ignoreNull && specReq && isNullable(specShape.props[name]!)) return;
    if (this.ignoreNull && sdkReq && specShape.props[name]!.hasDefault) return;
    this.report(loc, 'required', `spec ${reqWord(specReq)}, sdk ${reqWord(sdkReq)}`);
  }

  private compareUnion(specShape: Shape, sdkShape: Shape, loc: string): void {
    const specMembers = specShape.kind === 'union' ? specShape.members : [specShape];
    const sdkMembers = sdkShape.kind === 'union' ? sdkShape.members : [sdkShape];
    const pairs = assignMembers(specMembers, sdkMembers);
    for (const [si, ki] of pairs) {
      const sm = specMembers[si]!;
      this.compare(sm, sdkMembers[ki]!, `${loc}<${sm.label || si}>`);
    }
    const matchedSpec = new Set(pairs.map(([si]) => si));
    const matchedSdk = new Set(pairs.map(([, ki]) => ki));
    specMembers.forEach((sm, i) => {
      if (!matchedSpec.has(i)) {
        this.report(loc, 'missing', `spec union member ${describe(sm)} has no sdk counterpart`);
      }
    });
    sdkMembers.forEach((km, i) => {
      if (!matchedSdk.has(i)) {
        this.report(loc, 'extra', `sdk union member ${describe(km)} has no spec counterpart`);
      }
    });
  }
}

const numeric = (t: string) => t === 'integer' || t === 'number';
const reqWord = (required: boolean) => (required ? 'required' : 'optional');
const sortedStrings = (values: Set<unknown>) => JSON.stringify([...values].map(String).sort());

function stripNull(s: Shape): Shape {
  if (s.kind !== 'union') return s;
  const rest = s.members.filter((m) => !(m.kind === 'primitive' && m.type === 'null'));
  return rest.length ? union(rest) : s;
}

function isNullable(s: Shape): boolean {
  if (s.kind === 'primitive' && s.type === 'null') return true;
  return s.kind === 'union' && s.members.some(isNullable);
}

/** Greedy one-to-one matching of union members by structural similarity. */
function assignMembers(specMembers: Shape[], sdkMembers: Shape[]): [number, number][] {
  const scored: [number, number, number][] = [];
  specMembers.forEach((sm, si) =>
    sdkMembers.forEach((km, ki) => {
      const score = similarity(sm, km, SIMILARITY_DEPTH);
      if (score > 0) scored.push([score, si, ki]);
    }),
  );
  scored.sort((a, b) => b[0] - a[0] || a[1] - b[1] || a[2] - b[2]);
  const usedSpec = new Set<number>();
  const usedSdk = new Set<number>();
  const pairs: [number, number][] = [];
  for (const [, si, ki] of scored) {
    if (usedSpec.has(si) || usedSdk.has(ki)) continue;
    usedSpec.add(si);
    usedSdk.add(ki);
    pairs.push([si, ki]);
  }
  return pairs.sort((a, b) => a[0] - b[0]);
}

function similarity(a: Shape, b: Shape, depth: number): number {
  if (a.kind === 'any' || b.kind === 'any') return 0.1;
  if (a.kind === 'union' || b.kind === 'union') {
    const am = a.kind === 'union' ? a.members : [a];
    const bm = b.kind === 'union' ? b.members : [b];
    return Math.max(...am.flatMap((x) => bm.map((y) => similarity(x, y, depth))));
  }
  if (a.kind !== b.kind) return 0;
  if (a.kind === 'primitive') {
    if (a.type === b.type) return 1;
    // TypeScript has no integer type, so spec `integer` pairs with sdk `number`.
    return numeric(a.type) && numeric(b.type) ? 0.9 : 0;
  }
  if (a.kind === 'enum') {
    if (!a.values.size || !b.values.size) return 0.5;
    const inter = [...a.values].filter((v) => b.values.has(v)).length;
    const unionSize = new Set([...a.values, ...b.values]).size;
    return inter ? 0.5 + (0.5 * inter) / unionSize : 0.2;
  }
  if (a.kind === 'object') {
    const ak = Object.keys(a.props);
    const bk = Object.keys(b.props);
    if (!ak.length && !bk.length) return 1;
    const shared = ak.filter((k) => k in b.props);
    const nameScore = shared.length / Math.max(new Set([...ak, ...bk]).size, 1);
    if (depth <= 0 || !shared.length) return 0.5 + 0.5 * nameScore;
    const childScore =
      shared.reduce((sum, k) => sum + similarity(a.props[k]!, b.props[k]!, depth - 1), 0) / shared.length;
    return 0.5 + 0.3 * nameScore + 0.2 * childScore;
  }
  if (a.kind === 'array' || a.kind === 'map') {
    return 0.5 + 0.5 * similarity(a.items ?? ANY, b.items ?? ANY, depth);
  }
  return 0.5;
}

function describe(s: Shape): string {
  if (s.kind === 'primitive') return s.type;
  if (s.kind === 'enum') return 'enum' + sortedStrings(s.values);
  if (s.kind === 'object') {
    const keys = Object.keys(s.props).sort();
    return keys.length <= 6 ? `object{${keys.join(', ')}}` : `object(${keys.length} fields)`;
  }
  if (s.kind === 'array') return `array<${s.items ? describe(s.items) : 'any'}>`;
  if (s.kind === 'map') return `map<${s.items ? describe(s.items) : 'any'}>`;
  if (s.kind === 'union') return s.members.map(describe).join(' | ');
  return 'any';
}

// Driver

async function loadDoc(source: string): Promise<JsonDict> {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    const res = await fetch(source, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`GET ${source} failed: ${res.status}`);
    return (await res.json()) as JsonDict;
  }
  return JSON.parse(fs.readFileSync(source, 'utf8'));
}

function writeSnapshot(doc: JsonDict, file: string): boolean {
  const text = JSON.stringify(doc, null, 2) + '\n';
  const changed = !fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text;
  if (changed) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
  }
  return changed;
}

function buildProgram(): Sdk {
  const config = ts.readConfigFile(path.join(REPO, 'tsconfig.json'), ts.sys.readFile).config;
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, REPO);
  return new Sdk(ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options }));
}

function specOrder(spec: Spec, endpoints: Endpoint[]): Endpoint[] {
  const rank = new Map(Object.keys(spec.doc.paths ?? {}).map((p, i) => [normalizePath(p), i]));
  const key = (e: Endpoint) => rank.get(normalizePath(e.path)) ?? rank.size;
  return [...endpoints].sort(
    (a, b) => key(a) - key(b) || a.path.localeCompare(b.path) || a.method.localeCompare(b.method),
  );
}

function mergeObjects(a: Shape | null, b: Shape | null): Shape | null {
  if (!a || !b) return a ?? b;
  if (a.kind !== 'object' || b.kind !== 'object') return a;
  return shape('object', {
    props: { ...a.props, ...b.props },
    required: new Set([...a.required, ...b.required]),
    label: a.label,
  });
}

function run(spec: Spec, sdk: Sdk, endpoints: Endpoint[]): Drift[] {
  const drifts: Drift[] = [];
  const covered = new Set<string>();
  const seenPairs = new Set<string>();
  const specPaths = new Map(Object.keys(spec.doc.paths ?? {}).map((p) => [normalizePath(p), p]));

  for (const ep of specOrder(spec, endpoints)) {
    const label = `${ep.method.toUpperCase()} ${ep.path}`;
    const specPath = specPaths.get(normalizePath(ep.path));
    const op = specPath ? spec.operation(ep.method, specPath) : null;
    if (!op || !specPath) {
      drifts.push({
        endpoint: label,
        location: '',
        kind: 'endpoint',
        detail: `sdk calls this endpoint (${ep.source}) but spec lacks it`,
      });
      continue;
    }
    covered.add(`${ep.method} ${specPath}`);

    const sections: [string, Shape | null, ts.Type | null, boolean][] =
      ep.merged ?
        // One params type feeds both body and query (e.g. /upload).
        [['request', mergeObjects(spec.requestBody(op), spec.query(op)), ep.body, false]]
      : [
          ['request', spec.requestBody(op), ep.body, false],
          ['query', spec.query(op), ep.query, false],
        ];
    sections.push(['response', spec.response(op), ep.response, true]);

    for (const [section, specShape, sdkType, ignoreNull] of sections) {
      if (!specShape && !sdkType) continue;
      if (!specShape) {
        drifts.push({
          endpoint: label,
          location: section,
          kind: 'extra',
          detail: `sdk sends ${section} but spec defines none`,
        });
        continue;
      }
      if (!sdkType) {
        if (
          !(specShape.kind === 'any' || (specShape.kind === 'object' && !Object.keys(specShape.props).length))
        ) {
          drifts.push({
            endpoint: label,
            location: section,
            kind: 'missing',
            detail: `spec defines ${section} (${describe(specShape)}) but sdk has none`,
          });
        }
        continue;
      }
      const cmp = new Comparator(label, ignoreNull, seenPairs);
      cmp.compare(specShape, sdk.shape(sdkType), section);
      drifts.push(...cmp.drifts);
    }
  }

  for (const endpoint of [...spec.endpoints()].filter((e) => !covered.has(e)).sort()) {
    const [method, p] = endpoint.split(' ');
    drifts.push({
      endpoint: `${method!.toUpperCase()} ${p}`,
      location: '',
      kind: 'endpoint',
      detail: 'spec defines this endpoint but sdk has no method for it',
    });
  }
  return drifts;
}

interface Allowed {
  endpoint: string;
  location: string;
  kind: DriftKind;
  reason: string;
  detail?: string;
}

const matches = (a: Allowed, d: Drift) =>
  a.endpoint === d.endpoint &&
  a.location === d.location &&
  a.kind === d.kind &&
  (a.detail === undefined || a.detail === d.detail);

function loadAllowlist(file: string): Allowed[] {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
}

function splitAllowed(drifts: Drift[], allowlist: Allowed[]) {
  const active: Drift[] = [];
  const allowed: Drift[] = [];
  const used = new Set<number>();
  for (const d of drifts) {
    const hit = allowlist.findIndex((a) => matches(a, d));
    if (hit === -1) {
      active.push(d);
    } else {
      allowed.push(d);
      used.add(hit);
    }
  }
  return { active, allowed, stale: allowlist.filter((_, i) => !used.has(i)) };
}

const display = (source: string) => (source.startsWith(REPO) ? path.relative(REPO, source) : source);

function printReport(
  drifts: Drift[],
  allowed: Drift[],
  stale: Allowed[],
  endpoints: Endpoint[],
  spec: Spec,
  source: string,
): void {
  console.log(`Spec: ${display(source)} (version ${spec.version})`);
  console.log(`Checked ${endpoints.length} sdk endpoints.`);
  if (allowed.length) {
    console.log(`${allowed.length} allowed drift item(s), see ${path.relative(REPO, ALLOWLIST)}:`);
    for (const d of allowed) {
      console.log(`  ${d.endpoint} [${d.kind}]${d.location ? ' ' + d.location : ''}: ${d.detail}`);
    }
  }
  for (const a of stale) {
    console.error(`Stale allowlist entry matches nothing: ${a.endpoint} [${a.kind}] ${a.location}`);
  }
  if (!drifts.length) {
    console.log('No drift found.');
    return;
  }
  const byEndpoint = new Map<string, Drift[]>();
  for (const d of drifts) byEndpoint.set(d.endpoint, [...(byEndpoint.get(d.endpoint) ?? []), d]);
  for (const [endpoint, items] of byEndpoint) {
    console.log(`\n${endpoint}`);
    for (const d of items) console.log(`  [${d.kind}]${d.location ? ' ' + d.location : ''}: ${d.detail}`);
  }
  const counts = new Map<string, number>();
  for (const d of drifts) counts.set(d.kind, (counts.get(d.kind) ?? 0) + 1);
  const summary = [...counts]
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
  console.log(`\n${drifts.length} drift item(s): ${summary}`);
}

function usage(): void {
  console.log(
    [
      'Usage: bun run scripts/spec-drift.ts [options]',
      '',
      `  --spec URL|PATH    OpenAPI spec to check against (default: ${path.relative(REPO, SNAPSHOT)})`,
      `  --live             check against ${LIVE_SPEC}`,
      '  --update-snapshot  fetch the live spec, rewrite the snapshot, then check',
      '  --json             emit JSON instead of text',
      '  --warn-only        exit 0 even when drift is found',
      `  --ignore KIND      drift kind to ignore (${DRIFT_KINDS.join(', ')}); repeatable`,
    ].join('\n'),
  );
}

function parseArgs(argv: string[]) {
  const args = {
    spec: SNAPSHOT,
    live: false,
    updateSnapshot: false,
    json: false,
    warnOnly: false,
    ignore: [] as DriftKind[],
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg === '--live') args.live = true;
    else if (arg === '--update-snapshot') args.updateSnapshot = true;
    else if (arg === '--json') args.json = true;
    else if (arg === '--warn-only') args.warnOnly = true;
    else if (arg === '--spec') args.spec = path.resolve(argv[++i]!);
    else if (arg === '--ignore') {
      const kind = argv[++i] as DriftKind;
      if (!DRIFT_KINDS.includes(kind)) throw new Error(`--ignore expects one of ${DRIFT_KINDS.join(', ')}`);
      args.ignore.push(kind);
    } else if (arg === '--help' || arg === '-h') {
      usage();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

async function main(): Promise<number> {
  const args = parseArgs(process.argv.slice(2));
  let source = args.live ? LIVE_SPEC : args.spec;
  if (args.updateSnapshot) {
    const doc = await loadDoc(LIVE_SPEC);
    const state = writeSnapshot(doc, SNAPSHOT) ? 'updated' : 'unchanged';
    console.error(`Snapshot ${display(SNAPSHOT)} ${state} (version ${new Spec(doc).version})`);
    source = SNAPSHOT;
  }

  const spec = new Spec(await loadDoc(source));
  const sdk = buildProgram();
  const endpoints = discoverEndpoints(sdk);
  const found = run(spec, sdk, endpoints).filter((d) => !args.ignore.includes(d.kind));
  const { active, allowed, stale } = splitAllowed(found, loadAllowlist(ALLOWLIST));

  if (args.json) {
    console.log(
      JSON.stringify({ spec: display(source), spec_version: spec.version, drifts: active, allowed }, null, 2),
    );
  } else {
    printReport(active, allowed, stale, endpoints, spec, source);
  }
  return !active.length || args.warnOnly ? 0 : 1;
}

process.exit(await main());
