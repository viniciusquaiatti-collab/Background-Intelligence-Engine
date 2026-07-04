# ADR-011: Provider ecosystem over direct API integrations

## Decision

BIE will not expose one-off integrations as product features.

Every external source must enter the system through a provider family and a
common orchestration flow:

```text
ProviderRegistry
  -> ProviderOrchestrator
  -> EvidenceEngine
  -> RiskEngine
  -> ReportEngine
  -> AuditEngine
```

## Reason

The value of BIE is not having many APIs. The value is interpreting data across
sources, measuring confidence, calculating risk, recording evidence and
producing auditable reports.

Direct vendor coupling would make the system hard to test, hard to audit and
hard to evolve.

## Rules

- Providers collect data only.
- Providers do not calculate risk.
- Providers do not generate reports.
- Providers do not know each other.
- Provider output must become evidence before it influences risk.
- Restricted or sensitive data requires legal basis, contract or explicit
  consent.
- Forbidden sources must stay outside the product even if technically easy to
  access.
