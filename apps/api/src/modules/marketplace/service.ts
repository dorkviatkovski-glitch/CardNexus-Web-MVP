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
