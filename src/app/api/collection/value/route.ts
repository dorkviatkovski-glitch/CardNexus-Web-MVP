import { NextResponse } from "next/server";
import { CollectionController } from "../../../../../apps/api/src/modules/collection/controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get("collectionId") ?? "collection-1";
  const value = await CollectionController.getCollectionValue(collectionId);
  return NextResponse.json(value);
}
