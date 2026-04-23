
export interface CardAsset {
  id: string;
  name: string;
  set: string;
  number?: string;
  rarity?: string;
  condition?: string;
  marketValue: number;
  imageUrl?: string;
}

export interface CollectionStats {
  totalValue: number;
  cardCount: number;
  monthlyGrowth: number;
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
}
