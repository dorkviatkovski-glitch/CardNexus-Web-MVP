import { NextResponse } from "next/server";
import { MarketplaceController } from "../../../../../apps/api/src/modules/marketplace/controller";

export async function GET() {
  return NextResponse.json(MarketplaceController.listListings());
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json(MarketplaceController.createListing(body), { status: 201 });
}
