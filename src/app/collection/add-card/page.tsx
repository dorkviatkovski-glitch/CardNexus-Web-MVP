"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddCardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    set: "",
    rarity: "",
    condition: "",
    imageUrl: "",
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/collection/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collectionId: "collection-1", ...formData }),
    });

    if (response.ok) {
      router.push("/collection");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Add Card</h1>
      <form className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6" onSubmit={onSubmit}>
        {[
          ["name", "Card Name"],
          ["set", "Set"],
          ["rarity", "Rarity"],
          ["condition", "Condition"],
          ["imageUrl", "Image URL (optional)"],
        ].map(([key, label]) => (
          <input
            key={key}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            placeholder={label}
            value={formData[key as keyof typeof formData]}
            onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
          />
        ))}
        <button className="rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950">Save Card</button>
      </form>
    </div>
  );
}
