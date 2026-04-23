import { Store } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Market</h1>
        <p className="text-slate-500 font-medium text-sm">Browse listings</p>
      </header>

      <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Store className="text-blue-600" size={28} />
        </div>
        <div>
          <p className="font-bold text-slate-800">Marketplace coming soon</p>
          <p className="text-sm text-slate-400 mt-1">List and discover cards from the community</p>
        </div>
      </div>
    </div>
  );
}
