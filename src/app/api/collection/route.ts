import { NextResponse } from "next/server";
import { CollectionController } from "../../../../apps/api/src/modules/collection/controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get("collectionId") ?? "collection-1";

  const collection = CollectionController.getCollection(collectionId);
  if (!collection) {
    return NextResponse.json({ message: "Collection not found" }, { status: 404 });
  }

  return NextResponse.json(collection);
}
