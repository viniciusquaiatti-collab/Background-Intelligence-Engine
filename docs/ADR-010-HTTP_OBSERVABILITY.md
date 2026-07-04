# ADR-010: HTTP observability and response envelope

## Decision

All HTTP responses must use a standard envelope with `success`, `data` or
`error`, and `meta`.

The `meta` object must include:

- `requestId`
- `correlationId`
- `timestamp`

## Reason

The HTTP API is only an interface for the Background Intelligence Engine.
Standard responses make the product easier to debug, audit, test and consume.

The engine remains independent from HTTP. Fastify is responsible only for
transport concerns such as request tracking, response formatting and global
error handling.
