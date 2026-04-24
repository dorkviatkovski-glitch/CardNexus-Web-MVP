'use client';

import { TrendingUp, TrendingDown, Tag } from 'lucide-react';

interface AssetCardProps {
  id: string;
  name: string;
  set: string;
  condition?: string;
  value: number;
  change: number;
  imageUrl?: string;
  onSellClick?: (id: string) => void;
}

export default function AssetCard({ id, name, set, condition, value, change, imageUrl, onSellClick }: AssetCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-slate-200">
      <div className="w-16 h-20 bg-slate-100 rounded-xl flex-shrink-0 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 truncate">{name}</p>
        <p className="text-xs text-slate-400 font-medium truncate">{set}{condition ? ` • ${condition}` : ''}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-black text-slate-900">${value.toFixed(2)}</p>
        <div className={`flex items-center justify-end gap-1 text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
        </div>
      </div>
      {onSellClick && (
        <button
          onClick={() => onSellClick(id)}
          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex-shrink-0"
          title="Sell this card"
        >
          <Tag size={16} />
        </button>
      )}
    </div>
  );
}
