# BIE Provider Catalog Master v1

## Purpose

This catalog defines the provider ecosystem behind the Background Intelligence
Engine.

The goal is not to add many APIs. The goal is to build one intelligence engine
that can understand provider responses, compare sources, record evidence,
measure confidence, calculate risk and generate auditable reports.

## Intelligence Flow

```text
Input
  -> Protocol
  -> Providers
  -> Evidence
  -> Normalization
  -> Confidence Score
  -> Risk Score
  -> Report
  -> Audit
```

## Catalog

| Block                                             | Example sources                                                                                                                                                      | Provider families                                                                   |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Identity, CPF, CNPJ and base registration         | SERPRO CPF, SERPRO CNPJ, SERPRO Datavalid, Receita Federal CNPJ open data, BrasilAPI, CNPJa, Infosimples, BigDataCorp, Neoway, Cortex, Assertiva, Data Stone         | IdentityProvider, PersonProvider, CompanyProvider                                   |
| KYC, documents and identity antifraud             | SERPRO Datavalid, Unico, idwall, CAF, Legitimuz, Sumsub, Telesign, Twilio Lookup, Incognia, Fingerprint, Konduto, ClearSale                                          | KycProvider, DocumentValidationProvider, FaceMatchProvider, DeviceRiskProvider      |
| Credit, negative records and financial risk       | Serasa Experian, SPC Brasil, Boa Vista, Equifax, Quod, CENPROT, IEPTB, Open Finance Brasil, Pluggy, Belvo, Celcoin, Klavi                                            | CreditProvider, FinancialConsentProvider                                            |
| Judicial, criminal records and legal publications | CNJ DataJud, CNJ BNMP, Jusbrasil, Judit, Escavador, Digesto, Infosimples Juridico, TST, CNDT, TRT, TRF, TJ, STJ, STF, TSE, TRE, STM, official gazettes               | JudicialProvider, CriminalRecordProvider, LawsuitProvider, LegalPublicationProvider |
| Compliance, sanctions, PEP and AML                | Portal da Transparencia, CGU, CEIS, CNEP, CEPIM, PEP, OFAC, UN Sanctions, EU Sanctions, Interpol, World-Check, Dow Jones, LexisNexis, ComplyAdvantage                | ComplianceProvider, SanctionsProvider, PepProvider, AmlProvider                     |
| KYB, companies, ownership and corporate links     | SERPRO CNPJ, Receita Federal CNPJ open data, BrasilAPI CNPJ, Juntas Comerciais, REDESIM, Sintegra, SEFAZ, Simples Nacional, Neoway, BigDataCorp, Cortex, Data Stone  | CompanyIntelligenceProvider, OwnershipProvider, KybProvider                         |
| Vehicles, CNH, RENAVAM and claims                 | SERPRO SENATRAN, RENAVAM, RENACH, DETRANs, Sinesp Cidadao, FIPE, CheckTudo, Olho no Carro, Checkauto                                                                 | VehicleProvider                                                                     |
| Real estate, registries and patrimony             | ONR, Registro de Imoveis Brasil, ARISP, state real estate registries, notary integrators, Infosimples Cartorios                                                      | AssetProvider, RealEstateProvider                                                   |
| Professional, public service and inferred income  | Portal da Transparencia, state transparency portals, municipal transparency portals, Neoway, BigDataCorp, Cortex, permitted public search APIs                       | ProfessionalProvider                                                                |
| Address, CEP and territorial data                 | ViaCEP, BrasilAPI CEP, Correios APIs, IBGE Localidades, Mapbox, Google Maps, Here, TomTom, OpenStreetMap, Nominatim                                                  | AddressProvider, GeoProvider                                                        |
| Phone, email and contact validation               | Twilio Lookup, Telesign, Numverify, Abstract API, ZeroBounce, NeverBounce, Hunter.io, Clearout, MXToolbox, WhoisXML API                                              | ContactValidationProvider                                                           |
| Fiscal, invoices, debts and business certificates | SERPRO NFe, SEFAZ DFe, Receita Federal e-CAC, Integra Contador, PGFN, Receita/PGFN certificate, FGTS, TST CNDT, Sintegra, SEFAZ, Qive, NFE.io, PlugNotas, Tecnospeed | FiscalProvider                                                                      |
| International public compliance                   | OFAC SDN, UN Sanctions, EU Sanctions, UK HMT Sanctions, Interpol Red Notices, OpenCorporates, GLEIF LEI API                                                          | InternationalComplianceProvider                                                     |

## Sources Not Allowed As Free Lookup

| Source                                               | Decision                                                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ConecteSUS, vaccination data and medical records     | Do not query by CPF. Only validate a document or token presented by the holder in a consented flow. |
| Registrato Banco Central                             | Do not access third-party banking data. Use only holder-authorized flows.                           |
| Bank statements                                      | Only through Open Finance with explicit consent.                                                    |
| Income tax declarations                              | Do not access. Sensitive fiscal data.                                                               |
| Leaked data                                          | Forbidden.                                                                                          |
| Scraping that bypasses captcha, login or rate limits | Forbidden.                                                                                          |
| Data bought without clear origin                     | Forbidden.                                                                                          |
| Medical data                                         | Forbidden, except highly specific consented document validation flows.                              |

## MVP Order

### MVP 1: Prove the Engine

Use low-cost or mocked sources:

- BrasilAPI
- ViaCEP
- IBGE Localidades
- Portal da Transparencia / CGU
- Mock SERPRO
- Mock Serasa
- Mock Judicial
- Mock Compliance

Objective: validate the engine pipeline before paying for complex providers.

### MVP 2: First Real Paid Sources

- SERPRO CPF/CNPJ
- SERPRO Datavalid
- Serasa or Quod
- Jusbrasil, Judit or Escavador
- Infosimples

Objective: turn the engine into a real product.

### MVP 3: Advanced Intelligence

- Open Finance through Pluggy, Belvo or Celcoin
- ONR and notary integrations
- Vehicle intelligence
- International sanctions
- Device intelligence
- Transactional antifraud

Objective: evolve BIE into a full intelligence platform.

## Infrastructure Layout

Provider implementations should live under capability folders:

```text
src/infrastructure/providers/
  identity/
  kyc/
  credit/
  judicial/
  compliance/
  company/
  vehicle/
  real-estate/
  financial/
```

The provider flow must stay:

```text
ProviderRegistry
  -> ProviderOrchestrator
  -> EvidenceEngine
  -> RiskEngine
  -> ReportEngine
```
