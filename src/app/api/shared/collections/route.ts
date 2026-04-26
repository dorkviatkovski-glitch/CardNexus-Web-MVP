import { NextResponse } from "next/server";
import { SharedController } from "../../../../../apps/api/src/modules/shared/controller";

export async function GET() {
  return NextResponse.json(SharedController.listSharedCollections());
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(SharedController.createSharedCollection(body), { status: 201 });
}
