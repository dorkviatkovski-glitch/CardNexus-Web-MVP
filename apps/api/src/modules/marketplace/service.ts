import { db } from "../../data/mockDb";
import type { CreateListingDto } from "./dto";
import type { MarketplaceListingView } from "./types";

export class MarketplaceService {
  listListings(): MarketplaceListingView[] {
    return db.marketplaceListings.map((listing) => {
      const collectionCard = db.collectionCards.find((item) => item.id === listing.collectionCardId);
      const card = db.cards.find((item) => item.id === collectionCard?.cardId);
      return {
        ...listing,
        cardName: card?.name ?? "Unknown Card",
      };
    });
  }

  createListing(input: CreateListingDto) {
    if (!input || typeof input.price !== "number" || !Number.isFinite(input.price) || input.price <= 0) {
      throw new Error("Price must be a positive finite number");
    }
    const collectionCard = db.collectionCards.find((item) => item.id === input.collectionCardId);
    const collection = db.collections.find((item) => item.id === collectionCard?.collectionId);
    const seller = db.users.find((item) => item.id === input.sellerId);
    if (!collectionCard || !collection || !seller || collection.ownerId !== seller.id) {
      throw new Error("Seller must own the listed collection card");
    }
    const listing = {
      id: `listing-${db.marketplaceListings.length + 1}`,
      collectionCardId: input.collectionCardId,
      sellerId: input.sellerId,
      price: input.price,
      status: "ACTIVE" as const,
    };
    db.marketplaceListings.push(listing);
    return listing;
  }
}
