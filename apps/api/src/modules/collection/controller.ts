import { CollectionService } from "./service";
import type { AddCardDto } from "./dto";

const service = new CollectionService();

export const CollectionController = {
  getCollection: (collectionId?: string) => service.getCollection(collectionId),
  addCard: (input: AddCardDto) => service.addCard(input),
  getCollectionValue: (collectionId?: string) => service.getCollectionValue(collectionId),
};
