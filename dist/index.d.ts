export interface MetricKeyEntry {
    /** Lifecycle of the key in the canonical registry. Room for tier/owner later. */
    readonly lifecycle: "active";
}
export interface MetricKeyFamily {
    /**
     * Literal prefix an interpolated key must START WITH to be a family member.
     * Most are dot-terminated (`cost.storage.`); `alerts.open.top-category-` is a
     * within-token templated matcher (rank suffix), hence not dot-terminated.
     */
    readonly prefix: string;
    readonly description: string;
}
declare const EXACT_REGISTRY_RAW: {
    readonly "alerts.active-rules.count": {
        readonly lifecycle: "active";
    };
    readonly "alerts.fired-today.count": {
        readonly lifecycle: "active";
    };
    readonly "alerts.heartbeat-age.minutes": {
        readonly lifecycle: "active";
    };
    readonly "alerts.mttr-24h.minutes": {
        readonly lifecycle: "active";
    };
    readonly "alerts.mttr-7d.minutes": {
        readonly lifecycle: "active";
    };
    readonly "alerts.open-critical.count": {
        readonly lifecycle: "active";
    };
    readonly "alerts.open-info.count": {
        readonly lifecycle: "active";
    };
    readonly "alerts.open-warning.count": {
        readonly lifecycle: "active";
    };
    readonly "api-errors.rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "closing.active-deals.count": {
        readonly lifecycle: "active";
    };
    readonly "closing.at-risk.count": {
        readonly lifecycle: "active";
    };
    readonly "closing.avg-days-to-close": {
        readonly lifecycle: "active";
    };
    readonly "closing.avg-risk-score": {
        readonly lifecycle: "active";
    };
    readonly "closing.blocked-milestones.count": {
        readonly lifecycle: "active";
    };
    readonly "closing.closing-this-week.count": {
        readonly lifecycle: "active";
    };
    readonly "closing.completed.30d": {
        readonly lifecycle: "active";
    };
    readonly "closing.fallthrough-count.30d": {
        readonly lifecycle: "active";
    };
    readonly "closing.fallthrough-rate.30d": {
        readonly lifecycle: "active";
    };
    readonly "closing.gci.30d": {
        readonly lifecycle: "active";
    };
    readonly "closing.risk-distribution.green": {
        readonly lifecycle: "active";
    };
    readonly "closing.risk-distribution.red": {
        readonly lifecycle: "active";
    };
    readonly "closing.risk-distribution.yellow": {
        readonly lifecycle: "active";
    };
    readonly "closing.units.30d": {
        readonly lifecycle: "active";
    };
    readonly "closing.volume.30d": {
        readonly lifecycle: "active";
    };
    readonly "comms.bounce-rate.platform": {
        readonly lifecycle: "active";
    };
    readonly "comms.delivery-rate.platform": {
        readonly lifecycle: "active";
    };
    readonly "delivery-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.alerts-open.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.articles-ingested-24h.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.classification-queue-depth.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.engagement-events-24h.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.generation-completions-24h.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.status": {
        readonly lifecycle: "active";
    };
    readonly "engine.content.websites-failing.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.dve.alerts-open.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.dve.queue-counts.failed": {
        readonly lifecycle: "active";
    };
    readonly "engine.dve.queue-counts.processing": {
        readonly lifecycle: "active";
    };
    readonly "engine.dve.queue-counts.queued": {
        readonly lifecycle: "active";
    };
    readonly "engine.dve.r2-usage-mb": {
        readonly lifecycle: "active";
    };
    readonly "engine.dve.stuck-count": {
        readonly lifecycle: "active";
    };
    readonly "engine.journey.active-enrollments": {
        readonly lifecycle: "active";
    };
    readonly "engine.journey.alerts-open.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.journey.failed-executions.1h": {
        readonly lifecycle: "active";
    };
    readonly "engine.journey.queue-depth": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.alerts-open.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.avg-latency-ms": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.budget.utilization": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.cache.hit-rate": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.cache.miss-rate": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.cost.tokens-24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.cost.usd-24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.decisions-failed.count-24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.decisions.count-24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.error-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.p95-latency-ms": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.queue.depth": {
        readonly lifecycle: "active";
    };
    readonly "engine.milo.status": {
        readonly lifecycle: "active";
    };
    readonly "engine.property.alerts-open.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.property.mls-sync-lag-ms": {
        readonly lifecycle: "active";
    };
    readonly "engine.property.status": {
        readonly lifecycle: "active";
    };
    readonly "engine.report.alerts-open.count": {
        readonly lifecycle: "active";
    };
    readonly "engine.report.avg-generation-ms": {
        readonly lifecycle: "active";
    };
    readonly "engine.report.error-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "engine.report.pdfs-24h": {
        readonly lifecycle: "active";
    };
    readonly "failed-imports.24h.count": {
        readonly lifecycle: "active";
    };
    readonly "ghost-row.recovery-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "guest-mlos.active.count": {
        readonly lifecycle: "active";
    };
    readonly "journey-nurture.template-engagement.click-rate-avg": {
        readonly lifecycle: "active";
    };
    readonly "journey-nurture.template-engagement.open-rate-avg": {
        readonly lifecycle: "active";
    };
    readonly "journey-nurture.template-engagement.reply-rate-avg": {
        readonly lifecycle: "active";
    };
    readonly "journeys.active-enrollments.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.agent-overrides-active.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.completion-rate.30d": {
        readonly lifecycle: "active";
    };
    readonly "journeys.default-templates.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.exclusivity-groups.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.messaging-tenant-overrides.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.milo-decisions.7d-count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.milo-managed.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.priority-high.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.priority-low.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.stalled.count": {
        readonly lifecycle: "active";
    };
    readonly "journeys.step-failure-rate.30d": {
        readonly lifecycle: "active";
    };
    readonly "journeys.template.count-active": {
        readonly lifecycle: "active";
    };
    readonly "journeys.template.count-default-for-new": {
        readonly lifecycle: "active";
    };
    readonly "journeys.template.count-stale": {
        readonly lifecycle: "active";
    };
    readonly "journeys.top-failing.journeys": {
        readonly lifecycle: "active";
    };
    readonly "journeys.top-stalled.tenants": {
        readonly lifecycle: "active";
    };
    readonly "journeys.top-template.completion-rate": {
        readonly lifecycle: "active";
    };
    readonly "journeys.worst-template.dropoff-rate": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.captured.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.converted.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.engaged.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.in-journey.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.lost.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.qualified.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.scored.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.time-to-conversion.median-days": {
        readonly lifecycle: "active";
    };
    readonly "lead-funnel.time-to-conversion.p90-days": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.active-config.activated-at": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.active-config.version": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.avg-score.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.distribution.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.quadrant-accelerate.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.quadrant-educate.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.quadrant-nurture.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.quadrant-priority.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.scored-leads.total": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.stage-cold.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.stage-engaged.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.stage-hot.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.stage-qualified.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.conversion.stage-warming.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.active-config.activated-at": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.active-config.version": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.active-configs.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.avg-score.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.distribution.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.intent-equity-access.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.intent-rate-watch.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.intent-refi.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.intent-reverse-mortgage.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.intent-sell.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.per-tenant-override.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.scored-leads.total": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.temperature-cold.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.temperature-hot.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-scoring.hh-intent.temperature-warm.30d": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.by-actor-admin.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.by-actor-agent.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.by-actor-system.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.created.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.created.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.permission-changed.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.restored.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.revoked.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-share-audit.revoked.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-shares.active.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-shares.by-permission.full.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-shares.by-permission.limited.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-shares.by-permission.none.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-shares.by-permission.notify.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-shares.created.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-sharing-notification-templates.active.count": {
        readonly lifecycle: "active";
    };
    readonly "lead-volume.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "leads.new.30d": {
        readonly lifecycle: "active";
    };
    readonly "milo-compose.fallback-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "milo-idempotency.dedup-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "milo.cache.hit-rate": {
        readonly lifecycle: "active";
    };
    readonly "mrr.bundled": {
        readonly lifecycle: "active";
    };
    readonly "mrr.internal-grant": {
        readonly lifecycle: "active";
    };
    readonly "mrr.partner": {
        readonly lifecycle: "active";
    };
    readonly "mrr.standalone": {
        readonly lifecycle: "active";
    };
    readonly "mrr.total": {
        readonly lifecycle: "active";
    };
    readonly "mrr.trial": {
        readonly lifecycle: "active";
    };
    readonly "nurture-guardrails.block-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "nurture-lab.accelerate-toggle.24h-count": {
        readonly lifecycle: "active";
    };
    readonly "nurture-lab.active-sessions.count": {
        readonly lifecycle: "active";
    };
    readonly "nurture-lab.events.24h-count": {
        readonly lifecycle: "active";
    };
    readonly "nurture-lab.force-decision.24h-count": {
        readonly lifecycle: "active";
    };
    readonly "nurture-lab.monitored-leads.count": {
        readonly lifecycle: "active";
    };
    readonly "nurture-lab.simulate.24h-count": {
        readonly lifecycle: "active";
    };
    readonly "nurture-send-retry.success-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "nurture-send.composition-p95-latency-1h": {
        readonly lifecycle: "active";
    };
    readonly "nurture-send.dispatch-outcomes.24h": {
        readonly lifecycle: "active";
    };
    readonly "nurture-send.execute-outcomes.24h": {
        readonly lifecycle: "active";
    };
    readonly "partnerships.active.count": {
        readonly lifecycle: "active";
    };
    readonly "partnerships.pending.count": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.compose.error-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.compose.p95-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.error-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.evaluate.error-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.ghost-recovery-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.milo.error-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.next-action.p95-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.nurture.error-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.p95-latency.24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.rello.error-rate-24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.throughput.24h": {
        readonly lifecycle: "active";
    };
    readonly "pipeline-stage.top-errors.24h": {
        readonly lifecycle: "active";
    };
    readonly "platform-settings.admin-role.count": {
        readonly lifecycle: "active";
    };
    readonly "platform-settings.blocked-ip.count": {
        readonly lifecycle: "active";
    };
    readonly "platform-settings.feature-flag.count": {
        readonly lifecycle: "active";
    };
    readonly "platform.provisioning.boot-check-rello.count": {
        readonly lifecycle: "active";
    };
    readonly "platform.provisioning.boot-check-trigger.count": {
        readonly lifecycle: "active";
    };
    readonly "platform.provisioning.env-divergence.count": {
        readonly lifecycle: "active";
    };
    readonly "provisioning.failures-24h.count": {
        readonly lifecycle: "active";
    };
    readonly "referral-edge.confirmed.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "referral-edge.confirmed.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "referral-edge.detected.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "referral-edge.detected.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "referral-edge.outcome-converted.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "referral-edge.outcome-lost.7d.count": {
        readonly lifecycle: "active";
    };
    readonly "referrals.confirmed.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "referrals.created.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "reply-autosend.outcomes.24h": {
        readonly lifecycle: "active";
    };
    readonly "reply-autosend.rollback-failed.24h": {
        readonly lifecycle: "active";
    };
    readonly "resource-utilization.api-requests-1h": {
        readonly lifecycle: "active";
    };
    readonly "resource-utilization.database-connections": {
        readonly lifecycle: "active";
    };
    readonly "resource-utilization.email-quota": {
        readonly lifecycle: "active";
    };
    readonly "resource-utilization.sms-quota": {
        readonly lifecycle: "active";
    };
    readonly "resource-utilization.storage-gb": {
        readonly lifecycle: "active";
    };
    readonly "security.abuse-alerts-24h.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.active-signals.24h": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.anomalies-detected.24h": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.cta-injections-active.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.data-health.dlq-backlog.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.data-health.missing-reports.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.data-health.volume-anomalies-7d.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.decisions-made.24h": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.decisions-override-rate.24h": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.heartbeat-status": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.heartbeat.live-sources.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.learning-active-profiles.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.signal-rules.active-count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.signal-rules.executed-24h-count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.signal-rules.unhandled-24h-count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.stale-sources.count": {
        readonly lifecycle: "active";
    };
    readonly "signals-intelligence.unhandled-signal-types.count": {
        readonly lifecycle: "active";
    };
    readonly "system-email.edits.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "system-email.promote-to-default.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "system-email.restore-to-default.30d.count": {
        readonly lifecycle: "active";
    };
    readonly "templates.click-rate-avg": {
        readonly lifecycle: "active";
    };
    readonly "templates.open-rate-avg": {
        readonly lifecycle: "active";
    };
    readonly "templates.send-count.30d": {
        readonly lifecycle: "active";
    };
    readonly "tenant-health.milo.composite-engagement": {
        readonly lifecycle: "active";
    };
    readonly "tenant-health.score": {
        readonly lifecycle: "active";
    };
    readonly "tenants.at-risk.count": {
        readonly lifecycle: "active";
    };
    readonly "tenants.churn-30d.count": {
        readonly lifecycle: "active";
    };
    readonly "tenants.new-30d.count": {
        readonly lifecycle: "active";
    };
    readonly "tenants.new.count": {
        readonly lifecycle: "active";
    };
    readonly "users.active.30d": {
        readonly lifecycle: "active";
    };
    readonly "users.new.count": {
        readonly lifecycle: "active";
    };
};
/** `as const` union of the canonical exact keys — typed call sites get tsc errors. */
export type MetricKey = keyof typeof EXACT_REGISTRY_RAW;
/** The canonical exact-key registry (key → metadata row). */
export declare const EXACT_REGISTRY: Record<MetricKey, MetricKeyEntry>;
/** Frozen membership set (runtime guard + future edit-distance hints). */
export declare const CANONICAL_METRIC_KEY_SET: ReadonlySet<string>;
export declare const FAMILY_REGISTRY: readonly MetricKeyFamily[];
/** Exact-membership guard. Narrows to the canonical MetricKey union. */
export declare function isCanonicalMetricKey(raw: string): raw is MetricKey;
/**
 * Family-prefix resolution. Returns the first matching family (registry order)
 * or null. Used by the read-path assertion (step B) as the fallback after an
 * exact-membership miss — an interpolated key is canonical iff it matches a family.
 */
export declare function matchesMetricFamily(raw: string): MetricKeyFamily | null;
/**
 * The SOT primitive — the canonical enumeration of all active exact metric keys.
 * Platform-Admin's coverage denominator (mirrors signals' listActiveSignalTypes()).
 * Families are intentionally excluded: they have unbounded membership and are not
 * a fixed denominator. Returns exact keys with lifecycle "active" (all, today).
 */
export declare function listActiveMetricKeys(): readonly MetricKey[];
export {};
//# sourceMappingURL=index.d.ts.map