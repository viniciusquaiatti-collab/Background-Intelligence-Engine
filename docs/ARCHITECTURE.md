# Background Intelligence Engine Architecture

## Vision

The Background Intelligence Engine is not a CPF lookup API.

BIE is an intelligence engine that transforms authorized data from multiple
sources into evidence, confidence, risk, reports and audit trails.

HTTP is only one interface. The product is the Engine.

## Core Pipeline

```text
Input
  -> Protocol
  -> Provider Orchestrator
  -> Providers
  -> Evidence Engine
  -> Normalization Engine
  -> Confidence Score
  -> Risk Score
  -> Report Engine
  -> Audit Engine
```

## Architectural Principles

- Architecture first, code second.
- Domain above framework.
- Fastify never owns business rules.
- `server.ts` only starts the application.
- `app.ts` only composes the application.
- The Engine must stay independent from HTTP.
- Providers only collect data.
- Providers never calculate risk.
- The Risk Engine interprets data.
- The Evidence Engine records source, confidence and retrieval time.
- The Audit Engine records important actions.
- PostgreSQL is the source of truth.
- Redis is introduced only when there is a proven need.
- Every critical operation must be traceable.

## Layers

```text
src/
  application/
  domain/
  infrastructure/
  interfaces/
  shared/
```

## Engine Components

- BackgroundCheckEngine
- ProviderRegistry
- ProviderOrchestrator
- NormalizationEngine
- EvidenceEngine
- RiskEngine
- ReportGenerator
- AuditEngine

## Provider Families

Providers are grouped by capability, not by vendor.

- IdentityProvider
- PersonProvider
- CompanyProvider
- KycProvider
- DocumentValidationProvider
- FaceMatchProvider
- DeviceRiskProvider
- CreditProvider
- JudicialProvider
- CriminalRecordProvider
- LawsuitProvider
- LegalPublicationProvider
- ComplianceProvider
- SanctionsProvider
- PepProvider
- AmlProvider
- KybProvider
- OwnershipProvider
- VehicleProvider
- AssetProvider
- RealEstateProvider
- FinancialConsentProvider
- AddressProvider
- GeoProvider
- ContactValidationProvider
- FiscalProvider
- InternationalComplianceProvider

## Compliance Boundaries

BIE must only use legitimate sources, contracts, public permitted data,
official APIs, licensed providers and consent-based flows when required.

The project must not use leaked data, bypass authentication, bypass captcha,
ignore rate limits, violate platform terms, or collect sensitive data without
legal basis, authorization or consent.
