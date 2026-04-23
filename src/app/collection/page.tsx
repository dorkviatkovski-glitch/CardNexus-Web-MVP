import DashboardStats from '@/components/DashboardStats';
import AssetCard from '@/components/AssetCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CollectionPage() {
  const stats = {
    totalValue: 14230.50,
    cardCount: 214,
    growth: 8.2,
  };

  const recentAssets = [
    { name: 'Charizard VMAX', set: 'Shining Fates', condition: 'PSA 10', value: 240.00, change: 12.50 },
    { name: 'Pikachu Illustrator', set: 'CoroCoro Promo', condition: 'NM', value: 890.00, change: -5.20 },
    { name: 'Blastoise EX', set: 'Evolutions', condition: 'PSA 9', value: 145.00, change: 3.40 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portfolio</h1>
          <p className="text-slate-500 font-medium text-sm">Active Assets</p>
        </div>
        <Link href="/collection/add" className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl font-semibold hover:bg-blue-700 transition-all active:scale-95 text-sm flex items-center gap-2">
          <Plus size={18} />
          Add
        </Link>
      </header>

      <DashboardStats
        totalValue={stats.totalValue}
        cardCount={stats.cardCount}
        growth={stats.growth}
      />

      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-lg font-bold text-slate-800">Recent Assets</h2>
          <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
        </div>

        <div className="space-y-3">
          {recentAssets.map((asset, i) => (
            <AssetCard
              key={i}
              name={asset.name}
              set={asset.set}
              condition={asset.condition}
              value={asset.value}
              change={asset.change}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
