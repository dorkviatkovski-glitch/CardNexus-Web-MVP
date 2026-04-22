import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { CreateCardInput } from "@/domain/card";
import { AppError, ValidationError } from "@/domain/errors";
import { services } from "@/services/container";

function parseCreateCard(body: unknown): CreateCardInput {
  if (!body || typeof body !== "object") {
    throw new ValidationError("Request body must be a JSON object");
  }

  const payload = body as Record<string, unknown>;

  if (typeof payload.imageUrl !== "string" || payload.imageUrl.length < 8) {
    throw new ValidationError("imageUrl is required and must be a valid URL string");
  }

  return {
    imageUrl: payload.imageUrl,
    name: typeof payload.name === "string" ? payload.name : undefined,
    set: typeof payload.set === "string" ? payload.set : undefined,
  };
}

export async function GET() {
  const cards = await services.repository.list();
  return NextResponse.json({ data: cards });
}

export async function POST(request: Request) {
  try {
    const input = parseCreateCard(await request.json());
    const now = new Date().toISOString();

    const card = await services.repository.create({
      id: randomUUID(),
      imageUrl: input.imageUrl,
      name: input.name ?? "Pending identification",
      set: input.set ?? "Pending",
      status: "pending",
      valueUsd: null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ data: card }, { status: 201 });
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
