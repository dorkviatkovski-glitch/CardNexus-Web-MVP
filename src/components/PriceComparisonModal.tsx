'use client';

import { useState, useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Minus, DollarSign, Tag, Loader2 } from 'lucide-react';
import { getMarketComparison, getRecommendedPrice, type MarketComparison } from '@/lib/pricing/mockPriceService';

interface PriceComparisonModalProps {
  item: {
    id: string;
    card_name: string;
    card_set: string;
    condition: string | null;
    purchase_price: number | null;
    image_url: string | null;
  } | null;
  onClose: () => void;
  onSubmit: (itemId: string, askingPrice: number) => void;
}

export default function PriceComparisonModal({ item, onClose, onSubmit }: PriceComparisonModalProps) {
  const [marketData, setMarketData] = useState<MarketComparison | null>(null);
  const [askingPrice, setAskingPrice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (item) {
      const data = getMarketComparison(item.card_name, item.card_set, item.condition);
      setMarketData(data);
      setAskingPrice(getRecommendedPrice(data.avg).toString());
    }
  }, [item]);

  if (!item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(askingPrice);
    if (price <= 0) return;

    setIsSubmitting(true);
    await onSubmit(item.id, price);
    setIsSubmitting(false);
  };

  const trendIcon = marketData?.trend === 'up' ? <TrendingUp size={16} className="text-green-500" /> :
                   marketData?.trend === 'down' ? <TrendingDown size={16} className="text-red-500" /> :
                   <Minus size={16} className="text-slate-400" />;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Tag size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">List for Sale</h2>
              <p className="text-xs text-slate-400">Compare market prices before listing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Card Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-16 h-20 bg-slate-200 rounded-xl overflow-hidden">
              {item.image_url ? (
                <img src={item.image_url} alt={item.card_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
              )}
            </div>
            <div>
              <p className="font-bold text-slate-800">{item.card_name}</p>
              <p className="text-sm text-slate-500">{item.card_set}</p>
              {item.condition && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
                  {item.condition}
                </span>
              )}
            </div>
          </div>

          {/* Market Comparison */}
          {marketData && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Market Comparison</h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                  <p className="text-xs text-green-600 font-bold mb-1">Avg Price</p>
                  <p className="text-xl font-black text-green-700">${marketData.avg}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-bold mb-1">Lowest</p>
                  <p className="text-xl font-black text-slate-700">${marketData.min}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-500 font-bold mb-1">Highest</p>
                  <p className="text-xl font-black text-slate-700">${marketData.max}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl">
                {trendIcon}
                <span className="text-sm font-medium text-slate-700">
                  Market is {marketData.trend} {marketData.trendPercent}%
                </span>
                <span className="text-xs text-slate-400 ml-auto">
                  Source: {marketData.source}
                </span>
              </div>
            </div>
          )}

          {/* Your Investment */}
          {item.purchase_price && (
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
              <div>
                <p className="text-xs text-blue-600 font-bold">Your Purchase Price</p>
                <p className="text-lg font-black text-blue-700">${Number(item.purchase_price).toFixed(2)}</p>
              </div>
              {marketData && (
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-bold">Potential Profit</p>
                  <p className={`text-lg font-black ${getRecommendedPrice(marketData.avg) - Number(item.purchase_price) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${(getRecommendedPrice(marketData.avg) - Number(item.purchase_price)).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Listing Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Asking Price
              </label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-bold"
                  placeholder="0.00"
                  required
                />
              </div>
              {marketData && (
                <p className="text-xs text-slate-400 mt-2">
                  Recommended: <button type="button" onClick={() => setAskingPrice(getRecommendedPrice(marketData.avg).toString())} className="text-blue-600 font-bold hover:underline">${getRecommendedPrice(marketData.avg)}</button> (market avg + premium)
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Listing...
                </>
              ) : (
                <>
                  <Tag size={18} />
                  List for Sale
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
