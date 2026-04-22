interface PricingInput {
  name: string;
  set: string;
}

export interface PricingService {
  estimateValueUsd(input: PricingInput): Promise<number | null>;
}

export class MockPricingService implements PricingService {
  private readonly prices: Record<string, number> = {
    "Charizard|Base Set": 425,
    "Pikachu|Jungle": 42,
  };

  async estimateValueUsd(input: PricingInput): Promise<number | null> {
    return this.prices[`${input.name}|${input.set}`] ?? null;
  }
}
