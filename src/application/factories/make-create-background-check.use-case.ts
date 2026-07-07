import { BackgroundCheckEngine } from "../../domain/background-check/background-check.engine";
import { MockComplianceProvider } from "../../infrastructure/providers/mock/mock-compliance.provider";
import { MockIdentityProvider } from "../../infrastructure/providers/mock/mock-identity.provider";
import { MockJudicialProvider } from "../../infrastructure/providers/mock/mock-judicial.provider";
import { CreateBackgroundCheckUseCase } from "../use-cases/create-background-check/create-background-check.use-case";

export function makeCreateBackgroundCheckUseCase(): CreateBackgroundCheckUseCase {
  const providers = [
    new MockIdentityProvider(),
    new MockComplianceProvider(),
    new MockJudicialProvider(),
  ];

  const engine = new BackgroundCheckEngine(providers);

  return new CreateBackgroundCheckUseCase(engine);
}
