import type { BackgroundCheckEngine } from "../../../domain/background-check/background-check.engine";
import type { BackgroundCheckReport } from "../../../domain/background-check/backgrounds-check.types";

interface CreateBackgroundCheckInput {
  document: string;
  correlationId: string;
}

export class CreateBackgroundCheckUseCase {
  constructor(private readonly engine: BackgroundCheckEngine) {}

  async execute(input: CreateBackgroundCheckInput): Promise<BackgroundCheckReport> {
    return this.engine.execute({
      document: input.document,
      correlationId: input.correlationId,
    });
  }
}
