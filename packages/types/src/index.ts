export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Card {
  id: string;
  name: string;
  set: string;
  rarity: string;
  condition: string;
  imageUrl?: string;
}

export interface Collection {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export interface CollectionCard {
  id: string;
  collectionId: string;
  cardId: string;
  quantity: number;
  notes?: string;
}

export interface MarketplaceListing {
  id: string;
  collectionCardId: string;
  sellerId: string;
  price: number;
  status: "ACTIVE" | "SOLD";
}

export interface SharedCollection {
  id: string;
  collectionId: string;
  collectionName: string;
  ownerName: string;
  memberCount: number;
}

export interface CollectionValueSummary {
  collectionId: string;
  totalValue: number;
  cardCount: number;
  currency: string;
  lastUpdated: string;
}
