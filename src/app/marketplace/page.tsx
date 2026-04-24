import { createClient } from '@/lib/supabase';
import { getActiveListings } from '@/lib/actions/marketplace';
import { Store, Tag, User } from 'lucide-react';

export default async function MarketplacePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const listings = await getActiveListings();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Market</h1>
        <p className="text-slate-500 font-medium text-sm">{listings.length} active listings</p>
      </header>

      {listings.length === 0 ? (
        <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Store className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="font-bold text-slate-800">No active listings yet</p>
            <p className="text-sm text-slate-400 mt-1">Be the first to list a card for sale!</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing: any) => (
            <div key={listing.id} className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  {listing.CollectionItem?.image_url ? (
                    <img src={listing.CollectionItem.image_url} alt={listing.CollectionItem.card_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-slate-800 truncate">{listing.CollectionItem?.card_name}</p>
                    {listing.CollectionItem?.condition && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold flex-shrink-0">
                        {listing.CollectionItem.condition}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{listing.CollectionItem?.card_set}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <User size={12} />
                    <span className="truncate">{listing.seller_id.slice(0, 8)}...</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-black text-slate-900">${Number(listing.asking_price).toFixed(2)}</p>
                  {listing.market_avg_price && (
                    <p className="text-xs text-slate-400">
                      Market avg: ${Number(listing.market_avg_price).toFixed(0)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
