export const CARD_STATUSES = ["pending", "identified", "failed"] as const;

export type CardStatus = (typeof CARD_STATUSES)[number];

export interface Card {
  id: string;
  name: string;
  set: string;
  imageUrl: string;
  valueUsd: number | null;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CardRecognitionResult {
  name: string;
  set: string;
  confidence: number;
}

export interface CreateCardInput {
  imageUrl: string;
  name?: string;
  set?: string;
}

export interface CreateCardCommand {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  set: string;
  status: CardStatus;
  valueUsd: number | null;
}

export interface UpdateCardCommand {
  id: string;
  status?: CardStatus;
  name?: string;
  set?: string;
  valueUsd?: number | null;
  updatedAt: string;
}
