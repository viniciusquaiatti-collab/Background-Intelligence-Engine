import type {
  BackgroundProvider,
  ProviderExecutionInput,
  ProviderExecutionResult,
} from "../../../domain/provider/provider.types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockIdentityProvider implements BackgroundProvider {
  name = "MockIdentityProvider";
  category = "identity" as const;

  async execute(input: ProviderExecutionInput): Promise<ProviderExecutionResult> {
    void input;

    const startedAt = Date.now();

    await wait(120);

    return {
      provider: this.name,
      category: this.category,
      status: "SUCCESS",
      latencyMs: Date.now() - startedAt,
      evidence: [
        {
          key: "document_status",
          value: "REGULAR",
          source: "Mock Receita Federal",
          provider: this.name,
          confidence: 98,
          retrievedAt: new Date().toISOString(),
        },
        {
          key: "identity_match",
          value: true,
          source: "Mock Identity Database",
          provider: this.name,
          confidence: 96,
          retrievedAt: new Date().toISOString(),
        },
      ],
    };
  }
}
