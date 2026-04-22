import type { CardRecognitionResult } from "@/domain/card";

export interface CardRecognitionService {
  identify(imageUrl: string): Promise<CardRecognitionResult>;
}

export class MockCardRecognitionService implements CardRecognitionService {
  async identify(imageUrl: string): Promise<CardRecognitionResult> {
    const seed = imageUrl.toLowerCase();

    if (seed.includes("charizard")) {
      return { name: "Charizard", set: "Base Set", confidence: 0.89 };
    }

    if (seed.includes("pikachu")) {
      return { name: "Pikachu", set: "Jungle", confidence: 0.92 };
    }

    return {
      name: "Unknown",
      set: "Unverified",
      confidence: 0.38,
    };
  }
}
