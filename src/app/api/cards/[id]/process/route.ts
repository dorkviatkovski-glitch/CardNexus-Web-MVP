import { NextResponse } from "next/server";
import { AppError } from "@/domain/errors";
import { services } from "@/services/container";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(_: Request, { params }: Params) {
  try {
    const { id } = await params;
    const card = await services.processingPipeline.run(id);

    return NextResponse.json({ data: card });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message, context: error.context },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
