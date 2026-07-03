import { buildApp } from "./app";
import { env } from "./shared/config/env";

async function bootstrap() {
  const app = buildApp();

  try {
    await app.listen({
      port: env.port,
      host: "0.0.0.0",
    });

    app.log.info(`🚀 Background Intelligence Engine iniciado na porta ${env.port}`);
  } catch (error) {
    app.log.error(error);

    process.exit(1);
  }
}

bootstrap();