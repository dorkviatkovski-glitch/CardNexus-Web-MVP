import type {
  Card,
  Collection,
  CollectionCard,
  MarketplaceListing,
  User,
} from "@cardnexus/types";

export interface CollectionMember {
  id: string;
  collectionId: string;
  userId: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
}

export interface PricingSnapshot {
  id: string;
  cardId?: string;
  collectionCardId?: string;
  value: number;
  currency: string;
  capturedAt: string;
}

export const db: {
  users: User[];
  collections: Collection[];
  cards: Card[];
  collectionCards: CollectionCard[];
  collectionMembers: CollectionMember[];
  marketplaceListings: MarketplaceListing[];
  pricingSnapshots: PricingSnapshot[];
} = {
  users: [
    {
      id: "user-1",
      email: "collector@cardnexus.com",
      name: "Morgan Lee",
      createdAt: new Date("2026-01-05T10:00:00.000Z").toISOString(),
    },
  ],
  collections: [
    {
      id: "collection-1",
      name: "Primary Portfolio",
      ownerId: "user-1",
      createdAt: new Date("2026-01-06T10:00:00.000Z").toISOString(),
    },
  ],
  cards: [
    {
      id: "card-1",
      name: "Charizard EX",
      set: "Obsidian Flames",
      rarity: "Ultra Rare",
      condition: "Near Mint",
      imageUrl: "https://images.pokemontcg.io/sv3/125_hires.png",
    },
    {
      id: "card-2",
      name: "Pikachu VMAX",
      set: "Vivid Voltage",
      rarity: "Rare Holo VMAX",
      condition: "Mint",
      imageUrl: "https://images.pokemontcg.io/swsh4/44_hires.png",
    },
    {
      id: "card-3",
      name: "Mewtwo GX",
      set: "Shining Legends",
      rarity: "Rare Holo GX",
      condition: "Lightly Played",
      imageUrl: "https://images.pokemontcg.io/sm35/39_hires.png",
    },
  ],
  collectionCards: [
    {
      id: "collection-card-1",
      collectionId: "collection-1",
      cardId: "card-1",
      quantity: 1,
    },
    {
      id: "collection-card-2",
      collectionId: "collection-1",
      cardId: "card-2",
      quantity: 2,
    },
  ],
  collectionMembers: [
    {
      id: "member-1",
      collectionId: "collection-1",
      userId: "user-1",
      role: "OWNER",
    },
  ],
  marketplaceListings: [
    {
      id: "listing-1",
      collectionCardId: "collection-card-1",
      sellerId: "user-1",
      price: 215,
      status: "ACTIVE",
    },
    {
      id: "listing-2",
      collectionCardId: "collection-card-2",
      sellerId: "user-1",
      price: 96,
      status: "ACTIVE",
    },
  ],
  pricingSnapshots: [
    {
      id: "snapshot-1",
      cardId: "card-1",
      value: 215,
      currency: "USD",
      capturedAt: new Date().toISOString(),
    },
    {
      id: "snapshot-2",
      cardId: "card-2",
      value: 48,
      currency: "USD",
      capturedAt: new Date().toISOString(),
    },
    {
      id: "snapshot-3",
      cardId: "card-3",
      value: 62,
      currency: "USD",
      capturedAt: new Date().toISOString(),
    },
  ],
};
