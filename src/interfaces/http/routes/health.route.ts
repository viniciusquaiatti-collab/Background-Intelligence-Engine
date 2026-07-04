import type { FastifyInstance } from "fastify";

import { apiSuccess } from "../../../shared/http/api-response";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async (request) => {
    request.log.info("[HEALTH] Service operational");

    return apiSuccess(request, {
      status: "ok",
      service: "background-intelligence-engine",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
}
