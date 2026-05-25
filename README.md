# @rello-platform/metric-keys

Canonical registry for `PlatformMetricSnapshot.metricKey` — the **missing source of
truth** for the platform metric keyspace.

The platform shipped a metricKey **shape validator**
(`Rello/src/lib/metrics/namespace.ts` `validateMetricKey` — 2–4 dot-tokens,
`[a-z0-9-]`) that gates the **write** path, but nothing gated **membership** and the
**read** path was entirely unchecked. The symptom: silently-empty admin tiles when a
calculator emits a key no tile reads, or a tile reads a key no calculator emits. This
package is the producer-truth registry — the full **emitted** keyspace — plus
`listActiveMetricKeys()`, the SOT primitive Platform-Admin consumes as the coverage
denominator (mirrors `@rello-platform/signals`' `listActiveSignalTypes()`).

## Scope (v0.1.0 — KEYSPACE-SEED, step A)

**Producer-side seed ONLY.** This package adds *membership*; the shape validators
stay. The read-path assertion (step B), the `check:metric-keys` build-guard (steps
C/D), and the phantom-read whittle (step E) are later waves.

## Interface

```ts
import {
  EXACT_REGISTRY,            // Record<MetricKey, MetricKeyEntry> — 189 exact literals
  FAMILY_REGISTRY,           // readonly MetricKeyFamily[] — 21 interpolated prefixes
  CANONICAL_METRIC_KEY_SET,  // ReadonlySet<string> — frozen membership set
  isCanonicalMetricKey,      // (raw) => raw is MetricKey   — exact membership
  matchesMetricFamily,       // (raw) => MetricKeyFamily | null — family-prefix resolution
  listActiveMetricKeys,      // () => readonly MetricKey[]  — the SOT primitive
  type MetricKey,            // `as const` union of the 189 exact keys
} from "@rello-platform/metric-keys";
```

A metricKey is **canonical** iff `isCanonicalMetricKey(raw)` **OR**
`matchesMetricFamily(raw) !== null` (the completeness contract). Step B's read-path
assertion will combine the two.

## Counts & provenance (KA-verified 2026-05-25)

**189 exact + 21 families.** Re-derived from producer truth at:
- Rello `origin/main` `61f7dfc4` (`src/lib/metrics/calculators/**`, `src/lib/billing/mrr.ts`, `src/lib/tenant-milo/calculator.ts`)
- Milo `17ae0f9c`, Property `bac752fd`, Content `3f7e424`, Drumbeat `257e87d`, Journey `e605f36` (engine-side snapshot crons)

Exact breakdown (189): 152 Rello calculator literals (169 single-line grep − 17 excluded five-token + 1 multi-line) + 6 `mrr.*` + 1 `tenant-health.milo.composite-engagement` + 6 `engine.<slug>.alerts-open.count` concretes + 23 engine-side cron concretes (Milo 12 · Property 2 · Content 1 · Drumbeat 5 · Journey 3).

`engine.<slug>.alerts-open.count` is seeded as **6 exact concretes** (not a family):
its dynamic segment is in the *middle*, so it isn't prefix-expressible; `ENGINE_SLUGS`
is a bounded set of 6.

### EXCLUDED — 17 five-token lead-scoring keys (DISCOVERED prod bug, NOT canonical)

`lead-scoring-conversion.ts` and `lead-scoring-hh-intent.ts` emit 17 **five-token**
literals (`lead-scoring.conversion.{quadrant,stage}-distribution.<bucket>.30d`,
`lead-scoring.hh-intent.{intent-type,temperature}.<bucket>.30d`). These violate
`MAX_TOKENS=4` → `snapshot-writer.ts:21 assertValidMetricKey` throws →
`platform-metric-snapshot-dispatcher.ts:63-70` per-record catch logs+continues → the
rows are **dropped every run** while the calculator still reports success → blank
tiles in prod. They are **write-rejected, therefore not canonical** and are excluded
here. The 4-token rule is a deliberate platform invariant (collapse, don't relax — see
Milo cron's hyphen-collapse and `journey-nurture`'s dimension-collapse to 4 tokens).
Fix path: collapse to ≤4 tokens (e.g. `lead-scoring.conversion.stage-cold.30d` or move
the bucket to a dimension), then the corrected keys join the registry in a follow-up.
Tracked: `DISCOVERED-METRIC-5TOKEN-KEYS-SILENTLY-DROPPED-conversion-hh-intent-CALCULATORS-260525`.

## Adding a key

One canonical list, one place to add a key. For an exact literal, add a
`"<key>": { lifecycle: "active" }` row to `EXACT_REGISTRY_RAW` in `src/index.ts`. For
an interpolated key, add a `{ prefix, description }` to `FAMILY_REGISTRY`. Then
`npm run build` (commit `dist/`) and `npm test`. Cut a new git tag and bump consumer
pins with forced re-resolution.

## Packaging discipline (load-bearing)

- **No `prepare`/`postinstall` hook** — a `prepare` forces npm's git+ssh
  clone-and-build on every consumer install and breaks Railway nixpacks. `dist/` is
  **committed** instead; smoke via `npm install git+file://…` (a tarball install skips
  the git-dep code path).
- **Single-format ESM** with `import`/`require`/`default` all pointing at
  `dist/index.js` — Node ≥22 `require(esm)` lets CJS consumers `require()` it without
  `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- **Publish via git tag** (not GitHub Releases). The `package.json` `version` field may
  lag the tag — the tag is the publish source.
