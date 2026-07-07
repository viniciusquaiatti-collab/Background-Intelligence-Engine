export type ProviderCategory = "identity" | "judicial" | "compliance" | "credit";

export type ProviderStatus = "SUCCESS" | "FAILED";

export interface ProviderExecutionInput {
  protocol: string;
  document: string;
  correlationId: string;
}

export interface EvidenceItem {
  key: string;
  value: unknown;
  source: string;
  provider: string;
  confidence: number;
  retrievedAt: string;
}

export interface ProviderExecutionResult {
  provider: string;
  category: ProviderCategory;
  status: ProviderStatus;
  latencyMs: number;
  evidence: EvidenceItem[];
  error?: {
    code: string;
    message: string;
  };
}

export interface BackgroundProvider {
  name: string;
  category: ProviderCategory;

  execute(input: ProviderExecutionInput): Promise<ProviderExecutionResult>;
}
