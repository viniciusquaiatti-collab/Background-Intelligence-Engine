import type {
  BackgroundProvider,
  ProviderExecutionInput,
  ProviderExecutionResult,
} from "../../../domain/provider/provider.types";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockJudicialProvider implements BackgroundProvider {
  name = "MockJudicialProvider";
  category = "judicial" as const;

  async execute(input: ProviderExecutionInput): Promise<ProviderExecutionResult> {
    void input;

    const startedAt = Date.now();

    await wait(240);

    return {
      provider: this.name,
      category: this.category,
      status: "SUCCESS",
      latencyMs: Date.now() - startedAt,
      evidence: [
        {
          key: "relevant_lawsuits_found",
          value: 0,
          source: "Mock CNJ DataJud",
          provider: this.name,
          confidence: 92,
          retrievedAt: new Date().toISOString(),
        },
      ],
    };
  }
}
