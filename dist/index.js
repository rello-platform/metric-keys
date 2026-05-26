// @rello-platform/metric-keys — canonical PlatformMetricSnapshot metricKey registry.
//
// THE MISSING SOT. The platform shipped a metricKey SHAPE validator
// (Rello src/lib/metrics/namespace.ts validateMetricKey — 2-4 dot-tokens,
// [a-z0-9-]) that gates the WRITE path, but NOTHING gated MEMBERSHIP and the
// READ path was entirely unchecked. This package is the producer-truth registry:
// the full EMITTED keyspace (exact literals + interpolated family prefixes) +
// listActiveMetricKeys() — the SOT primitive Platform-Admin consumes as the
// coverage denominator (mirrors @rello-platform/signals' listActiveSignalTypes()).
//
// SCOPE (v0.1.0 — KEYSPACE-SEED, step A): producer-side seed ONLY. The read-path
// assertion (step B), the check:metric-keys build-guard (C/D), and the phantom-read
// whittle (E) are later waves. This package adds membership; the shape validators stay.
//
// Modeled on the closed-enum precedent ALERT_RULE_METRIC_KEYS_BY_CATEGORY
// (Rello src/lib/admin/alert-categories.ts) — structural discipline, NOT its keys
// (that camelCase AlertRule namespace is a SEPARATE vocabulary, out of scope).
//
// COUNTS: 221 exact + 21 families. See README for provenance.
//
// v0.2.0 (RECONCILE verified-safe bundle): +12 EXACT from partnerships-compliance.ts
// (lead-share-audit.* 6 + referral-edge.* 6) — the v0.1.0 SEED omitted that calculator
// (factory-shorthand `return [{ metricKey, … }]` writes a naive grep missed). Registered
// as EXACT (NOT families) so the 3 sibling 5-token `lead-share-audit.by-actor-type.*`
// keys stayed flagged in shadow rather than masked by a `lead-share-audit.` family prefix.
//
// v0.3.0 (DRIFT-FIX 5-token collapse, step E): the 20 five-token write-rejected keys
// (the DISCOVERED prod bug — emitted, write-rejected at MAX_TOKENS=4, silently swallowed)
// were COLLAPSED to ≤4 tokens in their 3 calculators (hyphen-collapse, Milo cron precedent)
// and registered here as +20 EXACT. The OLD 5-token forms are now gone from the producers;
// the corrected 4-token forms write successfully. Collapse map (old → new):
//   lead-scoring.conversion.quadrant-distribution.<b>.30d → lead-scoring.conversion.quadrant-<b>.30d
//   lead-scoring.conversion.stage-distribution.<b>.30d    → lead-scoring.conversion.stage-<b>.30d
//   lead-scoring.hh-intent.temperature.<b>.30d            → lead-scoring.hh-intent.temperature-<b>.30d
//   lead-scoring.hh-intent.intent-type.<b>.30d            → lead-scoring.hh-intent.intent-<b>.30d
//   lead-share-audit.by-actor-type.<actor>.7d.count       → lead-share-audit.by-actor-<actor>.7d.count
// ── EXACT_REGISTRY — the 221 statically-known emitted literals ──────────────
// (169 Rello calculator single-line literals MINUS 17 five-token violators
//  PLUS 1 multi-line literal volume-anomalies-7d.count = 152;
//  + 6 mrr + 1 tenant-milo + 6 per-engine-alerts concretes + 23 engine-side cron
//  = 189; + 12 partnerships-compliance.ts v0.2.0 = 201;
//  + 20 v0.3.0 collapsed-from-5-token keys (9 conversion + 8 hh-intent + 3
//  lead-share-audit by-actor) = 221.)
//  Every key here passes validateMetricKey (2-4 tokens, [a-z0-9-]).
const EXACT_REGISTRY_RAW = {
    "alerts.active-rules.count": { lifecycle: "active" },
    "alerts.fired-today.count": { lifecycle: "active" },
    "alerts.heartbeat-age.minutes": { lifecycle: "active" },
    "alerts.mttr-24h.minutes": { lifecycle: "active" },
    "alerts.mttr-7d.minutes": { lifecycle: "active" },
    "alerts.open-critical.count": { lifecycle: "active" },
    "alerts.open-info.count": { lifecycle: "active" },
    "alerts.open-warning.count": { lifecycle: "active" },
    "api-errors.rate.24h": { lifecycle: "active" },
    "closing.active-deals.count": { lifecycle: "active" },
    "closing.at-risk.count": { lifecycle: "active" },
    "closing.avg-days-to-close": { lifecycle: "active" },
    "closing.avg-risk-score": { lifecycle: "active" },
    "closing.blocked-milestones.count": { lifecycle: "active" },
    "closing.closing-this-week.count": { lifecycle: "active" },
    "closing.completed.30d": { lifecycle: "active" },
    "closing.fallthrough-count.30d": { lifecycle: "active" },
    "closing.fallthrough-rate.30d": { lifecycle: "active" },
    "closing.risk-distribution.green": { lifecycle: "active" },
    "closing.risk-distribution.red": { lifecycle: "active" },
    "closing.risk-distribution.yellow": { lifecycle: "active" },
    "comms.bounce-rate.platform": { lifecycle: "active" },
    "comms.delivery-rate.platform": { lifecycle: "active" },
    "delivery-rate.24h": { lifecycle: "active" },
    "engine.content.alerts-open.count": { lifecycle: "active" },
    "engine.content.status": { lifecycle: "active" },
    "engine.dve.alerts-open.count": { lifecycle: "active" },
    "engine.dve.queue-counts.failed": { lifecycle: "active" },
    "engine.dve.queue-counts.processing": { lifecycle: "active" },
    "engine.dve.queue-counts.queued": { lifecycle: "active" },
    "engine.dve.r2-usage-mb": { lifecycle: "active" },
    "engine.dve.stuck-count": { lifecycle: "active" },
    "engine.journey.active-enrollments": { lifecycle: "active" },
    "engine.journey.alerts-open.count": { lifecycle: "active" },
    "engine.journey.failed-executions.1h": { lifecycle: "active" },
    "engine.journey.queue-depth": { lifecycle: "active" },
    "engine.milo.alerts-open.count": { lifecycle: "active" },
    "engine.milo.avg-latency-ms": { lifecycle: "active" },
    "engine.milo.budget.utilization": { lifecycle: "active" },
    "engine.milo.cache.hit-rate": { lifecycle: "active" },
    "engine.milo.cache.miss-rate": { lifecycle: "active" },
    "engine.milo.cost.tokens-24h": { lifecycle: "active" },
    "engine.milo.cost.usd-24h": { lifecycle: "active" },
    "engine.milo.decisions-failed.count-24h": { lifecycle: "active" },
    "engine.milo.decisions.count-24h": { lifecycle: "active" },
    "engine.milo.error-rate.24h": { lifecycle: "active" },
    "engine.milo.p95-latency-ms": { lifecycle: "active" },
    "engine.milo.queue.depth": { lifecycle: "active" },
    "engine.milo.status": { lifecycle: "active" },
    "engine.property.alerts-open.count": { lifecycle: "active" },
    "engine.property.mls-sync-lag-ms": { lifecycle: "active" },
    "engine.property.status": { lifecycle: "active" },
    "engine.report.alerts-open.count": { lifecycle: "active" },
    "engine.report.avg-generation-ms": { lifecycle: "active" },
    "engine.report.error-rate.24h": { lifecycle: "active" },
    "engine.report.pdfs-24h": { lifecycle: "active" },
    "failed-imports.24h.count": { lifecycle: "active" },
    "ghost-row.recovery-rate-24h": { lifecycle: "active" },
    "guest-mlos.active.count": { lifecycle: "active" },
    "journey-nurture.template-engagement.click-rate-avg": { lifecycle: "active" },
    "journey-nurture.template-engagement.open-rate-avg": { lifecycle: "active" },
    "journey-nurture.template-engagement.reply-rate-avg": { lifecycle: "active" },
    "journeys.active-enrollments.count": { lifecycle: "active" },
    "journeys.agent-overrides-active.count": { lifecycle: "active" },
    "journeys.completion-rate.30d": { lifecycle: "active" },
    "journeys.default-templates.count": { lifecycle: "active" },
    "journeys.exclusivity-groups.count": { lifecycle: "active" },
    "journeys.messaging-tenant-overrides.count": { lifecycle: "active" },
    "journeys.milo-decisions.7d-count": { lifecycle: "active" },
    "journeys.milo-managed.count": { lifecycle: "active" },
    "journeys.priority-high.count": { lifecycle: "active" },
    "journeys.priority-low.count": { lifecycle: "active" },
    "journeys.stalled.count": { lifecycle: "active" },
    "journeys.step-failure-rate.30d": { lifecycle: "active" },
    "journeys.template.count-active": { lifecycle: "active" },
    "journeys.template.count-default-for-new": { lifecycle: "active" },
    "journeys.template.count-stale": { lifecycle: "active" },
    "journeys.top-failing.journeys": { lifecycle: "active" },
    "journeys.top-stalled.tenants": { lifecycle: "active" },
    "journeys.top-template.completion-rate": { lifecycle: "active" },
    "journeys.worst-template.dropoff-rate": { lifecycle: "active" },
    "lead-funnel.captured.count": { lifecycle: "active" },
    "lead-funnel.converted.count": { lifecycle: "active" },
    "lead-funnel.engaged.count": { lifecycle: "active" },
    "lead-funnel.in-journey.count": { lifecycle: "active" },
    "lead-funnel.lost.count": { lifecycle: "active" },
    "lead-funnel.qualified.count": { lifecycle: "active" },
    "lead-funnel.scored.count": { lifecycle: "active" },
    "lead-funnel.time-to-conversion.median-days": { lifecycle: "active" },
    "lead-funnel.time-to-conversion.p90-days": { lifecycle: "active" },
    "lead-scoring.conversion.active-config.activated-at": { lifecycle: "active" },
    "lead-scoring.conversion.active-config.version": { lifecycle: "active" },
    "lead-scoring.conversion.avg-score.30d": { lifecycle: "active" },
    "lead-scoring.conversion.distribution.30d": { lifecycle: "active" },
    "lead-scoring.conversion.quadrant-accelerate.30d": { lifecycle: "active" },
    "lead-scoring.conversion.quadrant-educate.30d": { lifecycle: "active" },
    "lead-scoring.conversion.quadrant-nurture.30d": { lifecycle: "active" },
    "lead-scoring.conversion.quadrant-priority.30d": { lifecycle: "active" },
    "lead-scoring.conversion.scored-leads.total": { lifecycle: "active" },
    "lead-scoring.conversion.stage-cold.30d": { lifecycle: "active" },
    "lead-scoring.conversion.stage-engaged.30d": { lifecycle: "active" },
    "lead-scoring.conversion.stage-hot.30d": { lifecycle: "active" },
    "lead-scoring.conversion.stage-qualified.30d": { lifecycle: "active" },
    "lead-scoring.conversion.stage-warming.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.active-config.activated-at": { lifecycle: "active" },
    "lead-scoring.hh-intent.active-config.version": { lifecycle: "active" },
    "lead-scoring.hh-intent.active-configs.count": { lifecycle: "active" },
    "lead-scoring.hh-intent.avg-score.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.distribution.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.intent-equity-access.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.intent-rate-watch.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.intent-refi.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.intent-reverse-mortgage.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.intent-sell.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.per-tenant-override.count": { lifecycle: "active" },
    "lead-scoring.hh-intent.scored-leads.total": { lifecycle: "active" },
    "lead-scoring.hh-intent.temperature-cold.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.temperature-hot.30d": { lifecycle: "active" },
    "lead-scoring.hh-intent.temperature-warm.30d": { lifecycle: "active" },
    "lead-share-audit.by-actor-admin.7d.count": { lifecycle: "active" },
    "lead-share-audit.by-actor-agent.7d.count": { lifecycle: "active" },
    "lead-share-audit.by-actor-system.7d.count": { lifecycle: "active" },
    "lead-share-audit.created.30d.count": { lifecycle: "active" },
    "lead-share-audit.created.7d.count": { lifecycle: "active" },
    "lead-share-audit.permission-changed.7d.count": { lifecycle: "active" },
    "lead-share-audit.restored.7d.count": { lifecycle: "active" },
    "lead-share-audit.revoked.30d.count": { lifecycle: "active" },
    "lead-share-audit.revoked.7d.count": { lifecycle: "active" },
    "lead-shares.active.count": { lifecycle: "active" },
    "lead-shares.by-permission.full.count": { lifecycle: "active" },
    "lead-shares.by-permission.limited.count": { lifecycle: "active" },
    "lead-shares.by-permission.none.count": { lifecycle: "active" },
    "lead-shares.by-permission.notify.count": { lifecycle: "active" },
    "lead-shares.created.30d.count": { lifecycle: "active" },
    "lead-sharing-notification-templates.active.count": { lifecycle: "active" },
    "lead-volume.7d.count": { lifecycle: "active" },
    "leads.new.30d": { lifecycle: "active" },
    "milo-compose.fallback-rate.24h": { lifecycle: "active" },
    "milo-idempotency.dedup-rate.24h": { lifecycle: "active" },
    "milo.cache.hit-rate": { lifecycle: "active" },
    "mrr.bundled": { lifecycle: "active" },
    "mrr.internal-grant": { lifecycle: "active" },
    "mrr.partner": { lifecycle: "active" },
    "mrr.standalone": { lifecycle: "active" },
    "mrr.total": { lifecycle: "active" },
    "mrr.trial": { lifecycle: "active" },
    "nurture-guardrails.block-rate.24h": { lifecycle: "active" },
    "nurture-lab.accelerate-toggle.24h-count": { lifecycle: "active" },
    "nurture-lab.active-sessions.count": { lifecycle: "active" },
    "nurture-lab.events.24h-count": { lifecycle: "active" },
    "nurture-lab.force-decision.24h-count": { lifecycle: "active" },
    "nurture-lab.monitored-leads.count": { lifecycle: "active" },
    "nurture-lab.simulate.24h-count": { lifecycle: "active" },
    "nurture-send-retry.success-rate.24h": { lifecycle: "active" },
    "nurture-send.composition-p95-latency-1h": { lifecycle: "active" },
    "nurture-send.dispatch-outcomes.24h": { lifecycle: "active" },
    "nurture-send.execute-outcomes.24h": { lifecycle: "active" },
    "partnerships.active.count": { lifecycle: "active" },
    "partnerships.pending.count": { lifecycle: "active" },
    "pipeline-stage.compose.error-rate-24h": { lifecycle: "active" },
    "pipeline-stage.compose.p95-24h": { lifecycle: "active" },
    "pipeline-stage.error-rate-24h": { lifecycle: "active" },
    "pipeline-stage.evaluate.error-rate-24h": { lifecycle: "active" },
    "pipeline-stage.ghost-recovery-rate.24h": { lifecycle: "active" },
    "pipeline-stage.milo.error-rate-24h": { lifecycle: "active" },
    "pipeline-stage.next-action.p95-24h": { lifecycle: "active" },
    "pipeline-stage.nurture.error-rate-24h": { lifecycle: "active" },
    "pipeline-stage.p95-latency.24h": { lifecycle: "active" },
    "pipeline-stage.rello.error-rate-24h": { lifecycle: "active" },
    "pipeline-stage.throughput.24h": { lifecycle: "active" },
    "pipeline-stage.top-errors.24h": { lifecycle: "active" },
    "platform-settings.admin-role.count": { lifecycle: "active" },
    "platform-settings.blocked-ip.count": { lifecycle: "active" },
    "platform-settings.feature-flag.count": { lifecycle: "active" },
    "provisioning.failures-24h.count": { lifecycle: "active" },
    "referral-edge.confirmed.30d.count": { lifecycle: "active" },
    "referral-edge.confirmed.7d.count": { lifecycle: "active" },
    "referral-edge.detected.30d.count": { lifecycle: "active" },
    "referral-edge.detected.7d.count": { lifecycle: "active" },
    "referral-edge.outcome-converted.7d.count": { lifecycle: "active" },
    "referral-edge.outcome-lost.7d.count": { lifecycle: "active" },
    "referrals.confirmed.30d.count": { lifecycle: "active" },
    "referrals.created.30d.count": { lifecycle: "active" },
    "reply-autosend.outcomes.24h": { lifecycle: "active" },
    "reply-autosend.rollback-failed.24h": { lifecycle: "active" },
    "resource-utilization.api-requests-1h": { lifecycle: "active" },
    "resource-utilization.database-connections": { lifecycle: "active" },
    "resource-utilization.email-quota": { lifecycle: "active" },
    "resource-utilization.sms-quota": { lifecycle: "active" },
    "resource-utilization.storage-gb": { lifecycle: "active" },
    "security.abuse-alerts-24h.count": { lifecycle: "active" },
    "signals-intelligence.active-signals.24h": { lifecycle: "active" },
    "signals-intelligence.anomalies-detected.24h": { lifecycle: "active" },
    "signals-intelligence.cta-injections-active.count": { lifecycle: "active" },
    "signals-intelligence.data-health.dlq-backlog.count": { lifecycle: "active" },
    "signals-intelligence.data-health.missing-reports.count": { lifecycle: "active" },
    "signals-intelligence.data-health.volume-anomalies-7d.count": { lifecycle: "active" },
    "signals-intelligence.decisions-made.24h": { lifecycle: "active" },
    "signals-intelligence.decisions-override-rate.24h": { lifecycle: "active" },
    "signals-intelligence.heartbeat-status": { lifecycle: "active" },
    "signals-intelligence.heartbeat.live-sources.count": { lifecycle: "active" },
    "signals-intelligence.learning-active-profiles.count": { lifecycle: "active" },
    "signals-intelligence.signal-rules.active-count": { lifecycle: "active" },
    "signals-intelligence.signal-rules.executed-24h-count": { lifecycle: "active" },
    "signals-intelligence.signal-rules.unhandled-24h-count": { lifecycle: "active" },
    "signals-intelligence.stale-sources.count": { lifecycle: "active" },
    "signals-intelligence.unhandled-signal-types.count": { lifecycle: "active" },
    "system-email.edits.30d.count": { lifecycle: "active" },
    "system-email.promote-to-default.30d.count": { lifecycle: "active" },
    "system-email.restore-to-default.30d.count": { lifecycle: "active" },
    "templates.click-rate-avg": { lifecycle: "active" },
    "templates.open-rate-avg": { lifecycle: "active" },
    "templates.send-count.30d": { lifecycle: "active" },
    "tenant-health.milo.composite-engagement": { lifecycle: "active" },
    "tenant-health.score": { lifecycle: "active" },
    "tenants.at-risk.count": { lifecycle: "active" },
    "tenants.churn-30d.count": { lifecycle: "active" },
    "tenants.new-30d.count": { lifecycle: "active" },
    "tenants.new.count": { lifecycle: "active" },
    "users.active.30d": { lifecycle: "active" },
    "users.new.count": { lifecycle: "active" },
};
/** The canonical exact-key registry (key → metadata row). */
export const EXACT_REGISTRY = EXACT_REGISTRY_RAW;
/** Frozen membership set (runtime guard + future edit-distance hints). */
export const CANONICAL_METRIC_KEY_SET = new Set(Object.keys(EXACT_REGISTRY_RAW));
// ── FAMILY_REGISTRY — 21 interpolated families (dynamic trailing token(s)) ───
// Each is prefix-expressible: the interpolated segment is the LAST token(s), so
// `raw.startsWith(prefix)` is the membership test. Engine `engine.<slug>.alerts-
// open.count` is NOT here — its dynamic segment is in the MIDDLE, so the 6
// concretes are seeded as EXACT entries instead (ENGINE_SLUGS is a bounded set).
export const FAMILY_REGISTRY = [
    // lead-scoring correlation/outcome fan-outs
    { prefix: "lead-scoring.correlation.", description: "lead-scoring.correlation.${a}-x-${b}.30d — pairwise signal correlation (lead-scoring-correlations.ts:60,108)" },
    { prefix: "lead-scoring.outcome-correlation.", description: "lead-scoring.outcome-correlation.${system}.90d — per-system outcome correlation (lead-scoring-outcome-correlations.ts:57,102,121)" },
    // tenant-health distribution buckets
    { prefix: "tenant-health.distribution.", description: "tenant-health.distribution.${bucket}.count — health-score bucket histogram (tenant-health-distribution.ts:132)" },
    // alerts top-category rank (within-token templated, rank 1-3)
    { prefix: "alerts.open.top-category-", description: "alerts.open.top-category-${rank} — top open-alert category by rank 1-3 (alerts-summary.ts:188)" },
    // lead-funnel families
    { prefix: "lead-funnel.drop-off.", description: "lead-funnel.drop-off.${token} — stage drop-off counts (lead-funnel.ts:352)" },
    { prefix: "lead-funnel.score-effectiveness.", description: "lead-funnel.score-effectiveness.${bucket}.conversion-rate — score-bucket conversion (lead-funnel.ts:385)" },
    { prefix: "lead-funnel.nurture-status.", description: "lead-funnel.nurture-status.${token}.count — by nurture status (lead-funnel.ts:398)" },
    { prefix: "lead-funnel.nurture-disposition.", description: "lead-funnel.nurture-disposition.${token}.count — by nurture disposition (lead-funnel.ts:408)" },
    { prefix: "lead-funnel.by-source-app.", description: "lead-funnel.by-source-app.${slug}.{count,conversion-rate} — by source app (lead-funnel.ts:418,423)" },
    { prefix: "lead-funnel.by-acquisition-channel.", description: "lead-funnel.by-acquisition-channel.${token}.{count,conversion-rate} — by acquisition channel (lead-funnel.ts:434,440)" },
    // signals-intelligence data-health per-source families (interpolated by app slug)
    { prefix: "signals-intelligence.data-health.signal-age-minutes.", description: "signals-intelligence.data-health.signal-age-minutes.${appSlug} — per-source signal freshness (signals-intelligence-data-health.ts:134,137)" },
    { prefix: "signals-intelligence.data-health.signal-volume-7d.", description: "signals-intelligence.data-health.signal-volume-7d.${appSlug} — per-source 7d signal volume (signals-intelligence-data-health.ts:148,151)" },
    // journey-nurture facet families (interpolated by normalized token)
    { prefix: "journey-nurture.framework.", description: "journey-nurture.framework.${token}.count — by intent framework (journey-nurture.ts:145,148)" },
    { prefix: "journey-nurture.tier.", description: "journey-nurture.tier.${token}.count — by intensity level (journey-nurture.ts:176,179)" },
    { prefix: "journey-nurture.channel.", description: "journey-nurture.channel.${token}.count — by last-touch channel (journey-nurture.ts:207,210)" },
    // cost / revenue families (channel ∈ {email,sms} bounded; slug/token dynamic; .total also covered)
    { prefix: "cost.email.", description: "cost.email.{${slug},total} — per-app + total email send cost (costs.ts:263,276)" },
    { prefix: "cost.sms.", description: "cost.sms.{${slug},total} — per-app + total SMS send cost (costs.ts:263,276)" },
    { prefix: "cost.storage.", description: "cost.storage.{${slug},total} — per-app + total storage cost (costs.ts:289,311)" },
    { prefix: "cost.ai.", description: "cost.ai.{${slug},total} — per-app + total AI token cost (costs.ts:337,340)" },
    { prefix: "cost.user-metered.", description: "cost.user-metered.{${token},total} — per billable-metric + total user-metered cost (costs.ts:398,434, cap MAX_USER_METERED_METRIC_KEYS=8)" },
    { prefix: "revenue.user-metered.", description: "revenue.user-metered.{${token},total} — per billable-metric + total user-metered revenue (costs.ts:399,435)" },
];
// ── Membership primitives ───────────────────────────────────────────────────
/** Exact-membership guard. Narrows to the canonical MetricKey union. */
export function isCanonicalMetricKey(raw) {
    return CANONICAL_METRIC_KEY_SET.has(raw);
}
/**
 * Family-prefix resolution. Returns the first matching family (registry order)
 * or null. Used by the read-path assertion (step B) as the fallback after an
 * exact-membership miss — an interpolated key is canonical iff it matches a family.
 */
export function matchesMetricFamily(raw) {
    for (const family of FAMILY_REGISTRY) {
        if (raw.startsWith(family.prefix))
            return family;
    }
    return null;
}
/**
 * The SOT primitive — the canonical enumeration of all active exact metric keys.
 * Platform-Admin's coverage denominator (mirrors signals' listActiveSignalTypes()).
 * Families are intentionally excluded: they have unbounded membership and are not
 * a fixed denominator. Returns exact keys with lifecycle "active" (all, today).
 */
export function listActiveMetricKeys() {
    return Object.keys(EXACT_REGISTRY).filter((k) => EXACT_REGISTRY[k].lifecycle === "active");
}
