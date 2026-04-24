import { createClient } from '@/lib/supabase';
import { Users, CreditCard, Share2, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch stats
  const { count: userCount } = await supabase
    .from('Profile')
    .select('*', { count: 'exact', head: true });

  const { count: collectionCount } = await supabase
    .from('Collection')
    .select('*', { count: 'exact', head: true });

  const { count: itemCount } = await supabase
    .from('CollectionItem')
    .select('*', { count: 'exact', head: true });

  const { count: sharedCount } = await supabase
    .from('SharedCollectionMember')
    .select('*', { count: 'exact', head: true });

  const stats = [
    { label: 'Total Users', value: userCount || 0, icon: Users, color: 'bg-blue-500' },
    { label: 'Collections', value: collectionCount || 0, icon: CreditCard, color: 'bg-purple-500' },
    { label: 'Total Cards', value: itemCount || 0, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Shared Access', value: sharedCount || 0, icon: Share2, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Real-time system metrics</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={20} className="text-white" />
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-slate-600">System operational</span>
              <span className="text-slate-400 ml-auto">Just now</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-slate-600">New users can register</span>
              <span className="text-slate-400 ml-auto">Active</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-slate-600">Database connected</span>
              <span className="text-slate-400 ml-auto">Healthy</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/users" className="block p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              Manage Users →
            </a>
            <a href="/admin/content" className="block p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
              Edit Content →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
