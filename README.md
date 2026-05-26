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

## Scope (v0.4.0 — KEYSPACE-SEED + RECONCILE + 5-token DRIFT-FIX + Closing trend keys)

**Producer-side registry ONLY.** This package adds *membership*; the shape validators
stay. The read-path assertion (step B) is SHADOW-wired at all three read boundaries
(Rello `snapshot-reader.ts` + `drift-trend-fetcher.ts`, Milo `data-composer.ts`); the
`check:metric-keys` build-guard (steps C/D), the ARM hard-reject, and the remaining
phantom-read whittle (step E, the 98 no-writer reads) are later waves gated on Kelly's
D-K3 dispositions.

### v0.4.0 — +3 EXACT (Closing Co-Pilot Wave H Phase 4 — tenant-grain trend precompute)

The single warranted Wave-H precompute (H8 lock). `closingCalculator`
(`Rello/src/lib/metrics/calculators/closing.ts`) gained 3 brokerage-wide 30d trend
keys, dual-emit platform-wide (`tenantId=null`) + per-customer-tenant:

- `closing.gci.30d` — Σ `CommissionLedgerEntry` GROSS lines for 30d `CLOSING_COMPLETED` deals
- `closing.volume.30d` — Σ `ClosingTransaction.contractPrice` for those deals
- `closing.units.30d` — count of those deals

Deal-level sourced (not per-agent `ProductionRecord` rows) so they side-step the Phase-1
dual-in-house double-count. Per-agent/team/branch reporting stays **live** (Phase 2)
because the 4-token cap + the composite-unique `(metricKey, tenantId, capturedAt)` carry
**no agent/team/branch axis** — only tenant-grain keys are namespace-legal. The Phase-3
Brokerage P&L / trend chart reads these snapshot-first with a live Prisma fallback.

### v0.3.0 — +20 EXACT (5-token DRIFT-FIX, step E decision-free slice)

The DISCOVERED prod bug's 20 five-token write-rejected keys were **collapsed to ≤4
tokens in their 3 calculators** (hyphen-collapse per the Milo cron / `journey-nurture`
precedent) so their writes stop being rejected, and the corrected 4-token forms are now
registered as **EXACT entries**. The OLD 5-token forms are gone from the producers. The
unambiguous near-miss readers in Milo `scopes.ts` were also corrected to their real
registered targets in the same dispatch (reader-only, no new keys). The 98 genuinely
no-writer phantom reads + the ambiguous near-miss/window/rollup rows remain Kelly's D-K3.

### v0.2.0 — +12 EXACT (RECONCILE verified-safe subset)

The completeness reconcile (`METRIC-KEYS-REGISTRY-COMPLETENESS-RECONCILE-HALT-DK3-LIST.md`)
found the v0.1.0 SEED **omitted `partnerships-compliance.ts` entirely** — its calculators
emit via a factory shorthand (`return [{ metricKey, … }]`) a naive `grep 'metricKey: "'`
misses, but they are real ≤4-token writes (the 04:15 UTC dispatcher owns them). The 12
real 4-token keys are now registered as **EXACT entries**:
- `lead-share-audit.{created,permission-changed,revoked,restored}.7d.count` + `{created,revoked}.30d.count` (6)
- `referral-edge.{detected,confirmed}.{7d,30d}.count` + `{outcome-converted,outcome-lost}.7d.count` (6)

**EXACT, NOT a `lead-share-audit.`/`referral-edge.` family** — load-bearing: a family
prefix would *read-accept* the 3 five-token `lead-share-audit.by-actor-type.*` siblings
and mask them in shadow while their writes stay rejected. Exact entries keep those 3
flagged until the collapse fix. The 120 no-writer "phantom" reads in the triage are a
separate Kelly decision (D-K3) and are NOT registered here.

## Interface

```ts
import {
  EXACT_REGISTRY,            // Record<MetricKey, MetricKeyEntry> — 224 exact literals
  FAMILY_REGISTRY,           // readonly MetricKeyFamily[] — 21 interpolated prefixes
  CANONICAL_METRIC_KEY_SET,  // ReadonlySet<string> — frozen membership set
  isCanonicalMetricKey,      // (raw) => raw is MetricKey   — exact membership
  matchesMetricFamily,       // (raw) => MetricKeyFamily | null — family-prefix resolution
  listActiveMetricKeys,      // () => readonly MetricKey[]  — the SOT primitive
  type MetricKey,            // `as const` union of the 224 exact keys
} from "@rello-platform/metric-keys";
```

A metricKey is **canonical** iff `isCanonicalMetricKey(raw)` **OR**
`matchesMetricFamily(raw) !== null` (the completeness contract). Step B's read-path
assertion will combine the two.

## Counts & provenance (KA-verified 2026-05-25)

**224 exact + 21 families** (189 seeded in v0.1.0 + 12 in v0.2.0 + 20 in v0.3.0 + 3 in v0.4.0). Re-derived from producer truth at:
- Rello `origin/main` `61f7dfc4` (`src/lib/metrics/calculators/**`, `src/lib/billing/mrr.ts`, `src/lib/tenant-milo/calculator.ts`)
- Milo `17ae0f9c`, Property `bac752fd`, Content `3f7e424`, Drumbeat `257e87d`, Journey `e605f36` (engine-side snapshot crons)

Exact breakdown (189 v0.1.0): 152 Rello calculator literals (169 single-line grep − 17 excluded five-token + 1 multi-line) + 6 `mrr.*` + 1 `tenant-health.milo.composite-engagement` + 6 `engine.<slug>.alerts-open.count` concretes + 23 engine-side cron concretes (Milo 12 · Property 2 · Content 1 · Drumbeat 5 · Journey 3).
**+12 (v0.2.0):** the `partnerships-compliance.ts` factory writers the SEED's `grep 'metricKey: "'` missed — 6 `lead-share-audit.*` + 6 `referral-edge.*` (all 4-token). See "v0.2.0" above.
**+20 (v0.3.0):** the 20 collapsed-from-5-token keys — 9 `lead-scoring.conversion.{quadrant,stage}-<bucket>.30d` + 8 `lead-scoring.hh-intent.{temperature,intent}-<bucket>.30d` + 3 `lead-share-audit.by-actor-<actor>.7d.count`. See "v0.3.0" above + the FIXED section below.
**+3 (v0.4.0):** the 3 Closing Co-Pilot Wave H Phase 4 tenant-grain trend keys — `closing.{gci,units,volume}.30d` (all 3-token, `closing.*` family — consistent with `closing.completed.30d` / `closing.fallthrough-rate.30d`). Emitted by `closingCalculator`, dual-emit platform-wide + per-customer-tenant. See "v0.4.0" above.

`engine.<slug>.alerts-open.count` is seeded as **6 exact concretes** (not a family):
its dynamic segment is in the *middle*, so it isn't prefix-expressible; `ENGINE_SLUGS`
is a bounded set of 6.

### FIXED in v0.3.0 — 20 five-token keys collapsed (DISCOVERED prod bug closed)

`lead-scoring-conversion.ts` + `lead-scoring-hh-intent.ts` emitted 17 **five-token**
literals (`lead-scoring.conversion.{quadrant,stage}-distribution.<bucket>.30d`,
`lead-scoring.hh-intent.{intent-type,temperature}.<bucket>.30d`); the v0.2.0 reconcile
found 3 more in `partnerships-compliance.ts` —
`lead-share-audit.by-actor-type.{admin,agent,system}.7d.count` (`:102/109/116`). All 20
violated `MAX_TOKENS=4` → `snapshot-writer.ts:21 assertValidMetricKey` threw →
`platform-metric-snapshot-dispatcher.ts:63-70` per-record catch logged+continued → the
rows were **dropped every run** while the calculator still reported success → blank
tiles in prod.

**v0.3.0 collapsed all 20 to ≤4 tokens at the producer** (hyphen-collapse — the 4-token
rule is a deliberate invariant: collapse, don't relax, per Milo cron's hyphen-collapse
and `journey-nurture`'s dimension-collapse) and registered the corrected forms as EXACT.
Collapse map (old → new):

| Old (5-token, write-rejected) | New (4-token, writable) |
|---|---|
| `lead-scoring.conversion.quadrant-distribution.<b>.30d` | `lead-scoring.conversion.quadrant-<b>.30d` |
| `lead-scoring.conversion.stage-distribution.<b>.30d` | `lead-scoring.conversion.stage-<b>.30d` |
| `lead-scoring.hh-intent.temperature.<b>.30d` | `lead-scoring.hh-intent.temperature-<b>.30d` |
| `lead-scoring.hh-intent.intent-type.<b>.30d` | `lead-scoring.hh-intent.intent-<b>.30d` |
| `lead-share-audit.by-actor-type.<actor>.7d.count` | `lead-share-audit.by-actor-<actor>.7d.count` |

The Milo `scopes.ts` readers of the old forms were updated to the collapsed names in the
same dispatch. The OLD 5-token strings are no longer emitted by any producer and remain
non-canonical (a `node --test` assertion locks both directions). The dispatcher per-record
silent-swallow hardening recommendation is tracked separately (still owed).
Tracked: `DISCOVERED-METRIC-5TOKEN-KEYS-SILENTLY-DROPPED-conversion-hh-intent-CALCULATORS-260525` (extended 17→20).

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
