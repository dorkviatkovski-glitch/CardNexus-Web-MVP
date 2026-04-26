import { SharedService } from "./service";
import type { AddMemberDto, CreateSharedCollectionDto } from "./dto";

const service = new SharedService();

export const SharedController = {
  listSharedCollections: () => service.listSharedCollections(),
  createSharedCollection: (input: CreateSharedCollectionDto) => service.createSharedCollection(input),
  addMember: (collectionId: string, input: AddMemberDto) => service.addMember(collectionId, input),
};
