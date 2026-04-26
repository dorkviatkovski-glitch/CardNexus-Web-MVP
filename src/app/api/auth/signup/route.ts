import { NextResponse } from "next/server";
import { AuthController } from "../../../../../apps/api/src/modules/auth/controller";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = AuthController.signup(body);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Failed to signup" },
      { status: 400 },
    );
  }
}
