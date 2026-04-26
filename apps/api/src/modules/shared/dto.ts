export interface CreateSharedCollectionDto {
  collectionId: string;
}

export interface AddMemberDto {
  userId: string;
  role: "EDITOR" | "VIEWER";
}
