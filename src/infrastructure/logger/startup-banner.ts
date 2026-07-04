import { env } from "../../shared/config/env";

type StartupBannerInput = {
  providerCount: number;
};

export function buildStartupBanner({ providerCount }: StartupBannerInput) {
  const line = "======================================================";

  return [
    line,
    "🚀 Background Intelligence Engine",
    line,
    `📦 Environment............. ${env.nodeEnv}`,
    `🌐 HTTP.................... http://localhost:${env.port}`,
    "🧠 Engine.................. Ready",
    "🛢 Database................ Pending",
    "⚡ Redis................... Disabled",
    `📚 Providers............... ${providerCount} registered`,
    "🔐 Security................ Basic mode",
    "📄 Version................. 0.1.0",
    line,
    "✅ BIE iniciado com sucesso.",
    line,
  ].join("\n");
}
