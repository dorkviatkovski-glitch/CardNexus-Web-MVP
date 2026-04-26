import { MockPricingProvider, PricingService } from "./service";

const service = new PricingService(new MockPricingProvider());

export const PricingController = {
  getCardValue: (cardId: string) => service.getCardValue(cardId),
  getCollectionValue: (collectionId: string) => service.getCollectionValue(collectionId),
};
