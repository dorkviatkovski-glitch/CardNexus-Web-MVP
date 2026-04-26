import { NextResponse } from "next/server";
import { SharedController } from "../../../../../../../apps/api/src/modules/shared/controller";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const body = await request.json();
  const { id } = await context.params;
  return NextResponse.json(SharedController.addMember(id, body), { status: 201 });
}
