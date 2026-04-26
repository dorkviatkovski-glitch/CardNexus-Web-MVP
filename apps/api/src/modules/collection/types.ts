import type { Card, CollectionCard } from "@cardnexus/types";

export interface CollectionCardView extends CollectionCard {
  card: Card;
}

export interface CollectionView {
  id: string;
  name: string;
  ownerId: string;
  cards: CollectionCardView[];
}
