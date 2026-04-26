import { NextResponse } from "next/server";
import { AuthController } from "../../../../../apps/api/src/modules/auth/controller";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = AuthController.login(body);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "Failed to login" },
      { status: 401 },
    );
  }
}
