import { NextResponse } from "next/server";
import { CollectionController } from "../../../../../apps/api/src/modules/collection/controller";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const card = CollectionController.addCard(body);
    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Unable to add card" },
      { status: 400 },
    );
  }
}
