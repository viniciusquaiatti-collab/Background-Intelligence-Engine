import type { FastifyInstance } from "fastify";

import { getCorrelationId } from "../../../shared/http/api-response";

export function observabilityPlugin(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    const correlationId = getCorrelationId(request);

    reply.header("x-request-id", request.id);
    reply.header("x-correlation-id", correlationId);

    request.log.info(
      {
        requestId: request.id,
        correlationId,
        method: request.method,
        url: request.url,
      },
      "[HTTP] Incoming request",
    );
  });

  app.addHook("onResponse", async (request, reply) => {
    request.log.info(
      {
        requestId: request.id,
        correlationId: getCorrelationId(request),
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
        responseTimeMs: Number(reply.elapsedTime.toFixed(2)),
      },
      "[HTTP] Request completed",
    );
  });
}
