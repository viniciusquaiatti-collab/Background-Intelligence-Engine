import { randomUUID } from "node:crypto";

import type { FastifyInstance } from "fastify";
import { z } from "zod";

import { makeCreateBackgroundCheckUseCase } from "../../../application/factories/make-create-background-check.use-case";

const createBackgroundCheckBodySchema = z.object({
  document: z
    .string()
    .regex(/^\d{11}$|^\d{14}$/, "Document must be a valid CPF or CNPJ with only numbers"),
});

export async function backgroundCheckRoutes(app: FastifyInstance) {
  app.post("/v1/background-check", async (request, reply) => {
    const correlationId = request.headers["x-correlation-id"]?.toString() ?? randomUUID();

    const body = createBackgroundCheckBodySchema.parse(request.body);

    request.log.info({
      message: "🧠 [ENGINE] Starting background check flow",
      correlationId,
      document: body.document,
    });

    const useCase = makeCreateBackgroundCheckUseCase();

    const report = await useCase.execute({
      document: body.document,
      correlationId,
    });

    request.log.info({
      message: "✅ [ENGINE] Background check flow completed",
      correlationId,
      protocol: report.protocol,
      risk: report.risk,
      confidence: report.confidence,
      executionTimeMs: report.executionTimeMs,
    });

    return reply.status(201).send({
      success: true,
      data: report,
      meta: {
        requestId: request.id,
        correlationId,
        timestamp: new Date().toISOString(),
      },
    });
  });
}
