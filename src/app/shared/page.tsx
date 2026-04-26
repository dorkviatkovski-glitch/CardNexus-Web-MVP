"use client";

import { useEffect, useState } from "react";

interface SharedCollection {
  id: string;
  collectionName: string;
  ownerName: string;
  memberCount: number;
}

export default function SharedPage() {
  const [collections, setCollections] = useState<SharedCollection[]>([]);

  useEffect(() => {
    fetch("/api/shared/collections")
      .then((response) => response.json())
      .then((data) => setCollections(data));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Shared Collections</h1>
      <div className="space-y-3">
        {collections.map((collection) => (
          <article key={collection.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="font-medium">{collection.collectionName}</h2>
            <p className="text-sm text-slate-400">Owner: {collection.ownerName}</p>
            <p className="text-sm text-slate-500">Members: {collection.memberCount}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
