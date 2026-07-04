# Project Roadmap

## Phase 1: Foundation

Status: done

- TypeScript
- Fastify
- Environment loading
- `app.ts`
- `server.ts`
- `/health`
- Git
- Initial docs

## Phase 2: Engineering Quality

Status: done

- ESLint
- Prettier
- EditorConfig
- Husky
- lint-staged
- npm scripts
- Conventional Commits

## Phase 3: Tests

Status: done

- Vitest
- Supertest
- `/health` test
- HTTP error tests
- Test structure

## Phase 4: Observability

Status: done

- Structured logs
- Request ID
- Correlation ID
- Global error handler
- Not found handler
- Startup banner
- Standard API response envelope

## Phase 5: Database

Status: next

- Docker Compose
- PostgreSQL
- Prisma
- First migration
- Database health check

## Phase 6: Domain Model

Status: pending

- BackgroundCheck
- Protocol
- Provider
- Evidence
- Risk
- Report
- Audit

## Phase 7: Engine

Status: pending

- BackgroundCheckEngine
- ProviderRegistry
- ProviderOrchestrator
- NormalizationEngine
- EvidenceEngine
- RiskEngine
- ReportGenerator

## Phase 8: Mock Providers

Status: pending

- MockIdentityProvider
- MockJudicialProvider
- MockComplianceProvider
- MockCreditProvider

## Phase 9: Real API

Status: pending

- `POST /v1/background-check`
- `GET /v1/background-check/:protocol`
- Request validation
- Standard responses
- Standard errors

## Phase 10: Security

Status: pending

- API Key
- Rate limit
- Sensitive data masking
- Audit trail
- Future JWT
- Future RBAC

## Phase 11: Deploy

Status: pending

- Docker
- Runtime environment variables
- Build
- Start
- Health checks
- Logs
- Backup
