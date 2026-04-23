import DashboardStats from '@/components/DashboardStats';
import AssetCard from '@/components/AssetCard';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getCollectionItems, getPortfolioStats } from '@/lib/actions/collections';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function CollectionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const [stats, items] = await Promise.all([
    getPortfolioStats(),
    getCollectionItems(),
  ]);

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
          <h2 className="text-lg font-bold text-slate-800">
            {items.length > 0 ? 'Recent Assets' : 'No cards yet'}
          </h2>
          {items.length > 0 && (
            <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
          )}
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center space-y-3">
              <p className="text-slate-400 font-medium">Your collection is empty</p>
              <Link href="/collection/add" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-all">
                Add Your First Card
              </Link>
            </div>
          ) : (
            items.map((item: any) => (
              <AssetCard
                key={item.id}
                name={item.card_name}
                set={item.card_set}
                condition={item.condition || undefined}
                value={Number(item.purchase_price) || 0}
                change={0}
                imageUrl={item.image_url || undefined}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
