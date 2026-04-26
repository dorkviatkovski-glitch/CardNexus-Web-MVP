import { db } from "../../data/mockDb";
import type { PricingProvider, CollectionValuationResult } from "./types";

export class MockPricingProvider implements PricingProvider {
  async getCardValue(card: { id: string }): Promise<number> {
    const latestSnapshot = [...db.pricingSnapshots]
      .reverse()
      .find((snapshot) => snapshot.cardId === card.id);

    return latestSnapshot?.value ?? 15;
  }
}

export class PricingService {
  constructor(private readonly provider: PricingProvider) {}

  async getCardValue(cardId: string): Promise<number> {
    const card = db.cards.find((existingCard) => existingCard.id === cardId);
    if (!card) {
      return 0;
    }

    return this.provider.getCardValue(card);
  }

  async getCollectionValue(collectionId: string): Promise<CollectionValuationResult> {
    const collectionCards = db.collectionCards.filter(
      (collectionCard) => collectionCard.collectionId === collectionId,
    );

    const items = await Promise.all(
      collectionCards.map(async (collectionCard) => ({
        cardId: collectionCard.cardId,
        value: (await this.getCardValue(collectionCard.cardId)) * collectionCard.quantity,
      })),
    );

    const totalValue = items.reduce((acc, item) => acc + item.value, 0);

    return {
      summary: {
        collectionId,
        totalValue,
        cardCount: collectionCards.reduce((acc, item) => acc + item.quantity, 0),
        currency: "USD",
        lastUpdated: new Date().toISOString(),
      },
      items,
    };
  }
}
