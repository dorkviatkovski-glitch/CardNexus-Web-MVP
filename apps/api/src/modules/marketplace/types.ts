import type { MarketplaceListing } from "@cardnexus/types";

export interface MarketplaceListingView extends MarketplaceListing {
  cardName: string;
}
