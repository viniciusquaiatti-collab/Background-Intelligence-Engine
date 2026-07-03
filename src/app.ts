import Fastify, { type FastifyInstance } from "fastify";
import { env } from "./shared/config/env";

import { healthRoutes } from "./interfaces/http/routes/health.route";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: env.nodeEnv === "development",
    disableRequestLogging: false,
  });

  app.register(healthRoutes);

  return app;
}