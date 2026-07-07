import { randomUUID } from "node:crypto";
import Fastify, { type FastifyInstance } from "fastify";

import { healthRoutes } from "./interfaces/http/routes/health.route";
import { errorHandlerPlugin } from "./interfaces/http/plugins/error-handler.plugin";
import { observabilityPlugin } from "./interfaces/http/plugins/observability.plugin";
import { backgroundCheckRoutes } from "./interfaces/http/routes/background-check.route";
import { env } from "./shared/config/env";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    genReqId: () => randomUUID(),
    logger: {
      enabled: env.nodeEnv !== "test",
      level: env.nodeEnv === "development" ? "debug" : "info",
      transport:
        env.nodeEnv === "development"
          ? {
              target: "pino-pretty",
              options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
              },
            }
          : undefined,
    },
    disableRequestLogging: true,
  });

  observabilityPlugin(app);
  errorHandlerPlugin(app);
  app.register(healthRoutes);
  app.register(backgroundCheckRoutes);

  return app;
}
