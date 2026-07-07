import type { EvidenceItem, ProviderExecutionResult } from "../provider/provider.types";

export type BackgroundCheckStatus = "COMPLETED" | "PARTIAL" | "FAILED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface BackgroundCheckReport {
  protocol: string;
  document: string;
  status: BackgroundCheckStatus;

  confidence: {
    score: number;
    level: "LOW" | "MEDIUM" | "HIGH";
  };

  risk: {
    score: number;
    level: RiskLevel;
  };

  providers: ProviderExecutionResult[];

  evidence: Record<string, EvidenceItem>;

  createdAt: string;
  completedAt: string;
  executionTimeMs: number;
}
