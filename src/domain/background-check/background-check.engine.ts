import { randomUUID } from "node:crypto";

import type { BackgroundProvider } from "../provider/provider.types";
import type {
  BackgroundCheckReport,
  BackgroundCheckStatus,
  RiskLevel,
} from "./backgrounds-check.types";

type ProviderResults = BackgroundCheckReport["providers"];
type EvidenceMap = BackgroundCheckReport["evidence"];

interface ExecuteBackgroundCheckInput {
  document: string;
  correlationId: string;
}

export class BackgroundCheckEngine {
  constructor(private readonly providers: BackgroundProvider[]) {}

  async execute(input: ExecuteBackgroundCheckInput): Promise<BackgroundCheckReport> {
    const startedAt = Date.now();
    const createdAt = new Date().toISOString();
    const protocol = this.createProtocol();

    const results = await Promise.allSettled(
      this.providers.map((provider) =>
        provider.execute({
          protocol,
          document: input.document,
          correlationId: input.correlationId,
        }),
      ),
    );

    const providers: ProviderResults = results.map((result, index) => {
      const provider = this.providers[index];

      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        provider: provider.name,
        category: provider.category,
        status: "FAILED",
        latencyMs: 0,
        evidence: [],
        error: {
          code: "PROVIDER_EXECUTION_FAILED",
          message:
            result.reason instanceof Error ? result.reason.message : "Unknown provider error",
        },
      };
    });

    const evidence = providers
      .flatMap((provider) => provider.evidence)
      .reduce<EvidenceMap>((acc, item) => {
        acc[item.key] = item;
        return acc;
      }, {});

    const confidenceScore = this.calculateConfidenceScore(providers);
    const riskScore = this.calculateRiskScore(evidence);
    const completedAt = new Date().toISOString();

    return {
      protocol,
      document: input.document,
      status: this.resolveStatus(providers),
      confidence: {
        score: confidenceScore,
        level: this.resolveConfidenceLevel(confidenceScore),
      },
      risk: {
        score: riskScore,
        level: this.resolveRiskLevel(riskScore),
      },
      providers,
      evidence,
      createdAt,
      completedAt,
      executionTimeMs: Date.now() - startedAt,
    };
  }

  private createProtocol(): string {
    const year = new Date().getFullYear();
    const suffix = randomUUID().slice(0, 8).toUpperCase();

    return `BIE-${year}-${suffix}`;
  }

  private resolveStatus(providers: ProviderResults): BackgroundCheckStatus {
    const successCount = providers.filter((provider) => provider.status === "SUCCESS").length;

    if (successCount === 0) return "FAILED";

    if (successCount < providers.length) return "PARTIAL";

    return "COMPLETED";
  }

  private calculateConfidenceScore(providers: ProviderResults): number {
    const evidence = providers.flatMap((provider) => provider.evidence);

    if (evidence.length === 0) return 0;

    const total = evidence.reduce((sum, item) => sum + item.confidence, 0);

    return Number((total / evidence.length).toFixed(2));
  }

  private calculateRiskScore(evidence: EvidenceMap): number {
    let score = 0;

    if (evidence.document_status?.value !== "REGULAR") {
      score += 40;
    }

    if (evidence.pep?.value === true) {
      score += 25;
    }

    if (evidence.sanctions?.value === true) {
      score += 60;
    }

    if (Number(evidence.relevant_lawsuits_found?.value ?? 0) > 0) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  private resolveConfidenceLevel(score: number): "LOW" | "MEDIUM" | "HIGH" {
    if (score >= 90) return "HIGH";
    if (score >= 70) return "MEDIUM";

    return "LOW";
  }

  private resolveRiskLevel(score: number): RiskLevel {
    if (score >= 70) return "HIGH";
    if (score >= 30) return "MEDIUM";

    return "LOW";
  }
}
