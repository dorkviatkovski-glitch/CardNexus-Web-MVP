import { MarketplaceService } from "./service";
import type { CreateListingDto } from "./dto";

const service = new MarketplaceService();

export const MarketplaceController = {
  listListings: () => service.listListings(),
  createListing: (input: CreateListingDto) => service.createListing(input),
};
