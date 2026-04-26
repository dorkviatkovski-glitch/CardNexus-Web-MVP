import type { Card, CollectionValueSummary } from "@cardnexus/types";

export interface PricingProvider {
  getCardValue(card: Card): Promise<number>;
}

export interface CollectionValuationItem {
  cardId: string;
  value: number;
}

export interface CollectionValuationResult {
  summary: CollectionValueSummary;
  items: CollectionValuationItem[];
}
