import { db } from "../../data/mockDb";
import type { ProfileSummary } from "./types";

export class ProfileService {
  getProfile(userId = "user-1"): ProfileSummary | undefined {
    const user = db.users.find((existingUser) => existingUser.id === userId);
    if (!user) {
      return undefined;
    }

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      collectionCount: db.collections.filter((collection) => collection.ownerId === user.id).length,
      activeListings: db.marketplaceListings.filter(
        (listing) => listing.sellerId === user.id && listing.status === "ACTIVE",
      ).length,
    };
  }
}
