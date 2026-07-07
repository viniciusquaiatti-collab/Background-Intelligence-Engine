import type {
  BackgroundProvider,
  ProviderExecutionInput,
  ProviderExecutionResult,
} from "../../../domain/provider/provider.types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockComplianceProvider implements BackgroundProvider {
  name = "MockComplianceProvider";
  category = "compliance" as const;

  async execute(input: ProviderExecutionInput): Promise<ProviderExecutionResult> {
    void input;

    const startedAt = Date.now();

    await wait(180);

    return {
      provider: this.name,
      category: this.category,
      status: "SUCCESS",
      latencyMs: Date.now() - startedAt,
      evidence: [
        {
          key: "pep",
          value: false,
          source: "Mock Portal da Transparência",
          provider: this.name,
          confidence: 95,
          retrievedAt: new Date().toISOString(),
        },
        {
          key: "sanctions",
          value: false,
          source: "Mock Sanctions List",
          provider: this.name,
          confidence: 94,
          retrievedAt: new Date().toISOString(),
        },
      ],
    };
  }
}
