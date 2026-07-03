import { FastifyInstance } from "fastify";
import { timeStamp } from "node:console";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "background-intelligence-engine",
      uptime: process.uptime(),
      timeStamp: new Date().toDateString(),
    };
  });
}