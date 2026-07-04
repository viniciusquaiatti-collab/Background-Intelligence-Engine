import { buildApp } from "./app";
import { buildStartupBanner } from "./infrastructure/logger/startup-banner";
import { env } from "./shared/config/env";

async function bootstrap() {
  const app = buildApp();

  try {
    app.log.info("[BOOT] Inicializando Background Intelligence Engine...");
    app.log.info("[CONFIG] Ambiente carregado com sucesso.");

    await app.listen({
      port: env.port,
      host: "0.0.0.0",
    });

    app.log.info(`[HTTP] Servidor iniciado na porta ${env.port}.`);
    console.info(buildStartupBanner({ providerCount: 0 }));
  } catch (error) {
    app.log.error(error);

    process.exit(1);
  }
}

bootstrap();
