import { NextResponse } from "next/server";
import { ProfileController } from "../../../../apps/api/src/modules/profile/controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? "user-1";
  const profile = ProfileController.getProfile(userId);

  if (!profile) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
