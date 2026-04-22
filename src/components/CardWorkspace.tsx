"use client";

import { useState, useTransition } from "react";
import type { Card } from "@/domain/card";

interface Props {
  initialCards: Card[];
}

export function CardWorkspace({ initialCards }: Props) {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  async function refreshCards() {
    const response = await fetch("/api/cards", { cache: "no-store" });
    const payload = (await response.json()) as { data: Card[] };
    setCards(payload.data);
  }

  async function createCard() {
    if (!imageUrl) return;

    await fetch("/api/cards", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    setImageUrl("");
    await refreshCards();
  }

  async function processCard(id: string) {
    await fetch(`/api/cards/${id}/process`, { method: "POST" });
    await refreshCards();
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Add card image</h2>
        <p className="text-sm text-slate-600">
          Paste any image URL (try using names like “charizard” or “pikachu” in
          the URL to see mock recognition output).
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="https://cdn.example.com/cards/charizard-front.jpg"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />
          <button
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            disabled={isPending || !imageUrl}
            onClick={() => startTransition(() => void createCard())}
          >
            Add card
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Set</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Value (USD)</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No cards yet. Add one to start the recognition pipeline.
                </td>
              </tr>
            ) : (
              cards.map((card) => (
                <tr key={card.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{card.name}</td>
                  <td className="px-4 py-3 text-slate-700">{card.set}</td>
                  <td className="px-4 py-3 text-slate-700">{card.status}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {card.valueUsd === null ? "—" : `$${card.valueUsd}`}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 disabled:opacity-50"
                      disabled={isPending || card.status === "identified"}
                      onClick={() =>
                        startTransition(() => void processCard(card.id))
                      }
                    >
                      Process
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
