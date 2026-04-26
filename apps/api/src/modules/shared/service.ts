import { db } from "../../data/mockDb";
import type { AddMemberDto, CreateSharedCollectionDto } from "./dto";

export class SharedService {
  listSharedCollections() {
    return db.collections.map((collection) => {
      const owner = db.users.find((user) => user.id === collection.ownerId);
      const memberCount = db.collectionMembers.filter(
        (member) => member.collectionId === collection.id,
      ).length;

      return {
        id: `shared-${collection.id}`,
        collectionId: collection.id,
        collectionName: collection.name,
        ownerName: owner?.name ?? "Unknown",
        memberCount,
      };
    });
  }

  createSharedCollection(input: CreateSharedCollectionDto) {
    const collection = db.collections.find((item) => item.id === input.collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    return {
      id: `shared-${collection.id}`,
      collectionId: collection.id,
    };
  }

  addMember(collectionId: string, input: AddMemberDto) {
    const membership = {
      id: `member-${db.collectionMembers.length + 1}`,
      collectionId,
      userId: input.userId,
      role: input.role,
    };

    db.collectionMembers.push(membership);
    return membership;
  }
}
