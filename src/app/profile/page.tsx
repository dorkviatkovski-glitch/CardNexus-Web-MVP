import { redirect } from 'next/navigation';
import { User, Settings, LogOut, Tag, X } from 'lucide-react';
import { logout } from '@/lib/actions/auth';
import { getMyListings, withdrawListing } from '@/lib/actions/marketplace';
import { createClient } from '@/lib/supabase';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const listings = await getMyListings();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile</h1>
        <p className="text-slate-500 font-medium text-sm">Account settings</p>
      </header>

      <div className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User size={28} className="text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-slate-800">{user.email?.split('@')[0] || 'Collector'}</p>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>
      </div>

      {/* My Listings */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800 px-1">My Listings</h2>
        {listings.length === 0 ? (
          <div className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center">
            <Tag size={24} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No active listings</p>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map((listing: any) => (
              <div key={listing.id} className="p-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  {listing.CollectionItem?.image_url ? (
                    <img src={listing.CollectionItem.image_url} alt={listing.CollectionItem.card_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{listing.CollectionItem?.card_name}</p>
                  <p className="text-xs text-slate-400">${Number(listing.asking_price).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    listing.status === 'active' ? 'bg-green-100 text-green-700' :
                    listing.status === 'sold' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {listing.status.toUpperCase()}
                  </span>
                  {listing.status === 'active' && (
                    <form action={async () => {
                      'use server';
                      await withdrawListing(listing.id);
                    }}>
                      <button type="submit" className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                        <X size={14} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button className="w-full p-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-3 hover:bg-slate-50 transition-colors text-left">
          <Settings size={20} className="text-slate-400" />
          <span className="font-semibold text-slate-700">Settings</span>
        </button>

        <form action={logout}>
          <button type="submit" className="w-full p-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-3 hover:bg-red-50 transition-colors text-left">
            <LogOut size={20} className="text-red-400" />
            <span className="font-semibold text-red-600">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
