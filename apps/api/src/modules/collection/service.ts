import { db } from "../../data/mockDb";
import { PricingController } from "../pricing/controller";
import type { AddCardDto } from "./dto";
import type { CollectionView } from "./types";

export class CollectionService {
  getCollection(collectionId = "collection-1"): CollectionView | undefined {
    const collection = db.collections.find((existingCollection) => existingCollection.id === collectionId);
    if (!collection) {
      return undefined;
    }

    const cards = db.collectionCards
      .filter((collectionCard) => collectionCard.collectionId === collection.id)
      .map((collectionCard) => ({
        ...collectionCard,
        card: db.cards.find((card) => card.id === collectionCard.cardId)!,
      }));

    return {
      ...collection,
      cards,
    };
  }

  addCard(input: AddCardDto) {
    const card = {
      id: `card-${db.cards.length + 1}`,
      name: input.name,
      set: input.set,
      rarity: input.rarity,
      condition: input.condition,
      imageUrl: input.imageUrl,
    };
    db.cards.push(card);

    const collectionCard = {
      id: `collection-card-${db.collectionCards.length + 1}`,
      collectionId: input.collectionId,
      cardId: card.id,
      quantity: 1,
    };

    db.collectionCards.push(collectionCard);
    db.pricingSnapshots.push({
      id: `snapshot-${db.pricingSnapshots.length + 1}`,
      cardId: card.id,
      value: 35,
      currency: "USD",
      capturedAt: new Date().toISOString(),
    });

    return {
      collectionCard,
      card,
    };
  }

  async getCollectionValue(collectionId = "collection-1") {
    return PricingController.getCollectionValue(collectionId);
  }
}
