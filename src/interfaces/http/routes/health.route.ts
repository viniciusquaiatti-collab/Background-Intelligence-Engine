import type { FastifyInstance } from "fastify";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "background-intelligence-engine",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  });
}
