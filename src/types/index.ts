export type CardStatus = 'pending' | 'identified' | 'failed';

export interface Card {
  id: string;
  name: string;
  set: string;
  value: number;
  status: CardStatus;
}

export interface CardIdentification {
  name: string;
  set: string;
}

export interface CardRecognizer {
  identify(url: string): Promise<CardIdentification>;
}

export interface PipelineResult {
  cardId: string;
  identifiedAt: string;
  identification: CardIdentification;
}
