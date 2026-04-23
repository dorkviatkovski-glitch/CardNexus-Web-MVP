import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { addCollectionItem } from '@/lib/actions/collections';

export default function AddCardPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <Link href="/collection" className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Add Card</h1>
          <p className="text-slate-500 font-medium text-sm">Add to your collection</p>
        </div>
      </header>

      <form action={addCollectionItem} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Card Name *</label>
          <input
            name="card_name"
            type="text"
            placeholder="e.g. Charizard VMAX"
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Set *</label>
          <input
            name="card_set"
            type="text"
            placeholder="e.g. Shining Fates"
            required
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Card Number</label>
            <input
              name="card_number"
              type="text"
              placeholder="e.g. 107/072"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Rarity</label>
            <input
              name="rarity"
              type="text"
              placeholder="e.g. Secret Rare"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Condition</label>
            <select
              name="condition"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select...</option>
              <option value="PSA 10">PSA 10</option>
              <option value="PSA 9">PSA 9</option>
              <option value="NM">NM</option>
              <option value="LP">LP</option>
              <option value="MP">MP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Purchase Price ($)</label>
            <input
              name="purchase_price"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1.5">Image URL</label>
          <input
            name="image_url"
            type="url"
            placeholder="https://..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-all active:scale-95">
          Add Card
        </button>
      </form>
    </div>
  );
}
