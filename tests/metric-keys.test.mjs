import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  EXACT_REGISTRY,
  FAMILY_REGISTRY,
  CANONICAL_METRIC_KEY_SET,
  isCanonicalMetricKey,
  matchesMetricFamily,
  listActiveMetricKeys,
} from "../dist/index.js";

// Mirror of Rello src/lib/metrics/namespace.ts validateMetricKey (2-4 tokens,
// each [a-z0-9] hyphen-separated). The seed MUST stay inside the shape lock.
const TOKEN_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
function shapeOk(key) {
  if (typeof key !== "string" || key.length === 0) return false;
  const tokens = key.split(".");
  if (tokens.length < 2 || tokens.length > 4) return false;
  return tokens.every((t) => t.length > 0 && TOKEN_PATTERN.test(t));
}

describe("EXACT_REGISTRY — 224 canonical emitted literals", () => {
  it("has exactly 224 entries", () => {
    assert.equal(Object.keys(EXACT_REGISTRY).length, 224);
  });

  it("includes the 3 v0.4.0 closing tenant-grain trend keys (gci/units/volume.30d)", () => {
    const added = [
      "closing.gci.30d",
      "closing.units.30d",
      "closing.volume.30d",
    ];
    for (const k of added) {
      assert.equal(isCanonicalMetricKey(k), true, `${k} should be canonical (v0.4.0)`);
      assert.equal(shapeOk(k), true, `${k} must pass the 2-4-token shape rule`);
    }
  });

  it("includes the 12 v0.2.0 partnerships-compliance keys (lead-share-audit + referral-edge)", () => {
    const added = [
      "lead-share-audit.created.7d.count",
      "lead-share-audit.permission-changed.7d.count",
      "lead-share-audit.revoked.7d.count",
      "lead-share-audit.restored.7d.count",
      "lead-share-audit.created.30d.count",
      "lead-share-audit.revoked.30d.count",
      "referral-edge.detected.7d.count",
      "referral-edge.confirmed.7d.count",
      "referral-edge.outcome-converted.7d.count",
      "referral-edge.outcome-lost.7d.count",
      "referral-edge.detected.30d.count",
      "referral-edge.confirmed.30d.count",
    ];
    for (const k of added) {
      assert.equal(isCanonicalMetricKey(k), true, `${k} should be canonical (v0.2.0)`);
    }
  });

  it("every entry carries lifecycle: 'active' (required metadata present)", () => {
    for (const [key, entry] of Object.entries(EXACT_REGISTRY)) {
      assert.equal(entry.lifecycle, "active", `${key} missing/!active lifecycle`);
    }
  });

  it("every exact key PASSES the 2-4-token shape rule (no 5-token strays)", () => {
    const bad = Object.keys(EXACT_REGISTRY).filter((k) => !shapeOk(k));
    assert.deepEqual(bad, [], `shape-rule violations in EXACT_REGISTRY: ${bad.join(", ")}`);
  });

  it("CANONICAL_METRIC_KEY_SET == the EXACT_REGISTRY keyset", () => {
    const keys = Object.keys(EXACT_REGISTRY);
    assert.equal(CANONICAL_METRIC_KEY_SET.size, keys.length);
    for (const k of keys) assert.ok(CANONICAL_METRIC_KEY_SET.has(k), `set missing ${k}`);
  });

  it("still excludes the OLD 5-token forms (v0.3.0 collapsed the producers — old forms never canonical)", () => {
    // v0.3.0 (DRIFT-FIX) collapsed these 20 producers to ≤4 tokens. The OLD
    // 5-token strings remain non-members: nothing writes them anymore.
    const oldFiveToken = [
      "lead-scoring.conversion.quadrant-distribution.accelerate.30d",
      "lead-scoring.conversion.stage-distribution.hot.30d",
      "lead-scoring.hh-intent.intent-type.refi.30d",
      "lead-scoring.hh-intent.temperature.warm.30d",
      "lead-share-audit.by-actor-type.admin.7d.count",
      "lead-share-audit.by-actor-type.agent.7d.count",
      "lead-share-audit.by-actor-type.system.7d.count",
    ];
    for (const k of oldFiveToken) {
      assert.equal(isCanonicalMetricKey(k), false, `${k} should NOT be canonical (old 5-token form, collapsed in v0.3.0)`);
    }
  });

  it("includes the 20 v0.3.0 collapsed keys (5-token DISCOVERED bug fixed; writes now succeed)", () => {
    const collapsed = [
      "lead-scoring.conversion.quadrant-accelerate.30d",
      "lead-scoring.conversion.quadrant-educate.30d",
      "lead-scoring.conversion.quadrant-nurture.30d",
      "lead-scoring.conversion.quadrant-priority.30d",
      "lead-scoring.conversion.stage-cold.30d",
      "lead-scoring.conversion.stage-engaged.30d",
      "lead-scoring.conversion.stage-hot.30d",
      "lead-scoring.conversion.stage-qualified.30d",
      "lead-scoring.conversion.stage-warming.30d",
      "lead-scoring.hh-intent.temperature-cold.30d",
      "lead-scoring.hh-intent.temperature-hot.30d",
      "lead-scoring.hh-intent.temperature-warm.30d",
      "lead-scoring.hh-intent.intent-equity-access.30d",
      "lead-scoring.hh-intent.intent-rate-watch.30d",
      "lead-scoring.hh-intent.intent-refi.30d",
      "lead-scoring.hh-intent.intent-reverse-mortgage.30d",
      "lead-scoring.hh-intent.intent-sell.30d",
      "lead-share-audit.by-actor-admin.7d.count",
      "lead-share-audit.by-actor-agent.7d.count",
      "lead-share-audit.by-actor-system.7d.count",
    ];
    assert.equal(collapsed.length, 20);
    for (const k of collapsed) {
      assert.equal(isCanonicalMetricKey(k), true, `${k} should be canonical (v0.3.0 collapsed)`);
      assert.equal(shapeOk(k), true, `${k} must pass the 2-4-token shape rule`);
    }
  });
});

describe("FAMILY_REGISTRY — 21 interpolated families", () => {
  it("has exactly 21 families", () => {
    assert.equal(FAMILY_REGISTRY.length, 21);
  });

  it("every family has a non-empty prefix and description", () => {
    for (const f of FAMILY_REGISTRY) {
      assert.ok(typeof f.prefix === "string" && f.prefix.length > 0, "bad prefix");
      assert.ok(typeof f.description === "string" && f.description.length > 0, "bad description");
    }
  });

  it("no family prefix is itself an exact key (disjoint namespaces)", () => {
    for (const f of FAMILY_REGISTRY) {
      assert.equal(CANONICAL_METRIC_KEY_SET.has(f.prefix), false, `${f.prefix} collides with exact key`);
    }
  });
});

describe("isCanonicalMetricKey — exact membership guard", () => {
  it("accepts a known exact key", () => {
    assert.equal(isCanonicalMetricKey("alerts.active-rules.count"), true);
    assert.equal(isCanonicalMetricKey("engine.milo.queue.depth"), true);
    assert.equal(isCanonicalMetricKey("mrr.total"), true);
  });
  it("rejects unknown / interpolated / non-string", () => {
    assert.equal(isCanonicalMetricKey("not.a.real.key"), false);
    assert.equal(isCanonicalMetricKey("cost.email.harvest-home"), false); // family, not exact
  });
});

describe("matchesMetricFamily — family-prefix resolution", () => {
  it("resolves interpolated keys to their family", () => {
    assert.equal(matchesMetricFamily("cost.email.harvest-home")?.prefix, "cost.email.");
    assert.equal(matchesMetricFamily("cost.email.total")?.prefix, "cost.email.");
    assert.equal(matchesMetricFamily("lead-funnel.drop-off.captured-to-scored")?.prefix, "lead-funnel.drop-off.");
    assert.equal(matchesMetricFamily("alerts.open.top-category-1")?.prefix, "alerts.open.top-category-");
    assert.equal(matchesMetricFamily("journey-nurture.framework.equity.count")?.prefix, "journey-nurture.framework.");
    assert.equal(
      matchesMetricFamily("signals-intelligence.data-health.signal-volume-7d.open-house-hub")?.prefix,
      "signals-intelligence.data-health.signal-volume-7d.",
    );
  });
  it("returns null for non-family keys", () => {
    assert.equal(matchesMetricFamily("alerts.active-rules.count"), null);
    assert.equal(matchesMetricFamily("totally.unknown.key"), null);
  });
  it("does NOT family-mask the 5-token by-actor-type keys (exact-not-family rationale)", () => {
    // The 12 v0.2.0 keys are EXACT, not lead-share-audit./referral-edge. families,
    // precisely so the write-rejected 5-token siblings keep failing the shadow check.
    assert.equal(matchesMetricFamily("lead-share-audit.by-actor-type.admin.7d.count"), null);
    assert.equal(matchesMetricFamily("lead-share-audit.created.7d.count"), null);
    assert.equal(matchesMetricFamily("referral-edge.detected.7d.count"), null);
  });
});

describe("listActiveMetricKeys — SOT primitive", () => {
  it("returns all 224 active exact keys (coverage denominator)", () => {
    const active = listActiveMetricKeys();
    assert.equal(active.length, 224);
    assert.ok(active.includes("tenant-health.score"));
    assert.ok(active.every((k) => isCanonicalMetricKey(k)));
  });
});
