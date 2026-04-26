"use client";

import { useEffect, useState } from "react";

interface Listing {
  id: string;
  cardName: string;
  price: number;
  status: string;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch("/api/marketplace/listings")
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Marketplace</h1>
      <div className="space-y-3">
        {listings.map((listing) => (
          <article key={listing.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{listing.cardName}</h2>
              <p className="text-lg font-semibold text-cyan-300">${listing.price.toFixed(2)}</p>
            </div>
            <p className="text-sm text-slate-500">{listing.status}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
