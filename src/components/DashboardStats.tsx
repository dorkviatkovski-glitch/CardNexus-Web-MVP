'use client';

import { TrendingUp, CreditCard, DollarSign } from 'lucide-react';

interface DashboardStatsProps {
  totalValue: number;
  cardCount: number;
  growth: number;
}

export default function DashboardStats({ totalValue, cardCount, growth }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-[2rem] border-none shadow-lg shadow-blue-200">
        <div className="flex items-center gap-2 mb-2 opacity-80">
          <CreditCard size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Total Cards</span>
        </div>
        <p className="text-3xl font-black">{cardCount}</p>
      </div>

      <div className="p-5 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-green-500">
          <TrendingUp size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Growth</span>
        </div>
        <p className="text-3xl font-black text-slate-800">+{growth}%</p>
      </div>

      <div className="p-5 bg-white rounded-[2rem] border border-slate-200 shadow-sm col-span-2">
        <div className="flex items-center gap-2 mb-2 text-slate-400">
          <DollarSign size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portfolio Value</span>
        </div>
        <p className="text-4xl font-black text-slate-900">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
}
