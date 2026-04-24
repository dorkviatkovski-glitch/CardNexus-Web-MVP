import { createClient } from '@/lib/supabase';
import { FileEdit, Save, Eye, Type } from 'lucide-react';

export default async function AdminContentPage() {
  const supabase = await createClient();

  // Get app stats for content context
  const { count: totalCards } = await supabase
    .from('CollectionItem')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Content Editor</h2>
        <p className="text-slate-500 text-sm mt-1">Manage app content and messages</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Type size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Welcome Message</h3>
              <p className="text-xs text-slate-400">Shown on empty collection</p>
            </div>
          </div>

          <textarea
            defaultValue="Your collection is empty. Add your first card to start tracking your portfolio."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm min-h-[100px] resize-none"
          />

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
              <Save size={16} />
              Save
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Eye size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">App Status</h3>
              <p className="text-xs text-slate-400">Current system state</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-600">Registration</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">OPEN</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-600">Google Auth</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">ENABLED</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <span className="text-sm text-slate-600">Total Cards in DB</span>
              <span className="text-sm font-bold text-slate-800">{totalCards || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">System Configuration</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Database</p>
            <p className="font-bold text-slate-800">PostgreSQL</p>
            <p className="text-xs text-green-600 mt-1">Connected</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Auth Provider</p>
            <p className="font-bold text-slate-800">Supabase</p>
            <p className="text-xs text-green-600 mt-1">Active</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Framework</p>
            <p className="font-bold text-slate-800">Next.js 16</p>
            <p className="text-xs text-green-600 mt-1">Running</p>
          </div>
        </div>
      </div>
    </div>
  );
}
