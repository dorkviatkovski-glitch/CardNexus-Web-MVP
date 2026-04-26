import type { SharedCollection } from "@cardnexus/types";

export interface SharedCollectionMember {
  id: string;
  collectionId: string;
  userId: string;
  role: "OWNER" | "EDITOR" | "VIEWER";
}

export type SharedCollectionView = SharedCollection;
