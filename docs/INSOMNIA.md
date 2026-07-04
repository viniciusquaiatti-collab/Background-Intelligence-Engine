# Insomnia validation

Use this file as the manual validation checklist for HTTP endpoints.

## Environment

Create an Insomnia environment with:

```json
{
  "baseUrl": "http://localhost:8080"
}
```

## GET /health

Request:

```http
GET {{ _.baseUrl }}/health
x-correlation-id: insomnia-health-check
```

Expected status:

```text
200 OK
```

Expected response shape:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "service": "background-intelligence-engine",
    "uptime": 1,
    "timestamp": "2026-07-03T00:00:00.000Z"
  },
  "meta": {
    "requestId": "generated-request-id",
    "correlationId": "insomnia-health-check",
    "timestamp": "2026-07-03T00:00:00.000Z"
  }
}
```

## GET /missing-route

Request:

```http
GET {{ _.baseUrl }}/missing-route
```

Expected status:

```text
404 Not Found
```

Expected response shape:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Route not found"
  },
  "meta": {
    "requestId": "generated-request-id",
    "correlationId": "generated-or-forwarded-correlation-id",
    "timestamp": "2026-07-03T00:00:00.000Z"
  }
}
```
