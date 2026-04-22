import type { Card, CreateCardCommand, UpdateCardCommand } from "@/domain/card";

export interface CardRepository {
  list(): Promise<Card[]>;
  findById(id: string): Promise<Card | null>;
  create(command: CreateCardCommand): Promise<Card>;
  update(command: UpdateCardCommand): Promise<Card | null>;
}

class InMemoryCardRepository implements CardRepository {
  private readonly cards = new Map<string, Card>();

  async list() {
    return Array.from(this.cards.values()).sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1,
    );
  }

  async findById(id: string) {
    return this.cards.get(id) ?? null;
  }

  async create(command: CreateCardCommand) {
    const card: Card = {
      id: command.id,
      imageUrl: command.imageUrl,
      createdAt: command.createdAt,
      updatedAt: command.updatedAt,
      name: command.name,
      set: command.set,
      status: command.status,
      valueUsd: command.valueUsd,
    };

    this.cards.set(command.id, card);
    return card;
  }

  async update(command: UpdateCardCommand) {
    const existing = this.cards.get(command.id);
    if (!existing) {
      return null;
    }

    const updated: Card = {
      ...existing,
      ...command,
    };

    this.cards.set(command.id, updated);
    return updated;
  }
}

export const cardRepository: CardRepository = new InMemoryCardRepository();
