"use client";

import type { CollectionValueSummary } from "@cardnexus/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CollectionResponse {
  id: string;
  name: string;
  cards: Array<{ id: string; quantity: number; card: { name: string; set: string; rarity: string; condition: string } }>;
}

export default function CollectionPage() {
  const [collection, setCollection] = useState<CollectionResponse | null>(null);
  const [summary, setSummary] = useState<CollectionValueSummary | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [collectionRes, valueRes] = await Promise.all([
        fetch("/api/collection"),
        fetch("/api/collection/value"),
      ]);
      setCollection(await collectionRes.json());
      const valuePayload = await valueRes.json();
      setSummary(valuePayload.summary);
    };

    void loadData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <header className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">Collection Value</p>
        <h1 className="text-4xl font-semibold">${summary?.totalValue.toFixed(2) ?? "0.00"}</h1>
        <p className="mt-2 text-sm text-slate-400">{summary?.cardCount ?? 0} cards tracked</p>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{collection?.name ?? "Collection"}</h2>
        <Link className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950" href="/collection/add-card">
          Add Card
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collection?.cards.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="font-medium">{item.card.name}</h3>
            <p className="text-sm text-slate-400">{item.card.set}</p>
            <p className="mt-3 text-xs text-slate-500">{item.card.rarity} · {item.card.condition}</p>
            <p className="mt-2 text-sm text-slate-300">Qty: {item.quantity}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
