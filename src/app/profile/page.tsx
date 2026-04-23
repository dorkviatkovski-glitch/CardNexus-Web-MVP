import { User, Settings, LogOut } from 'lucide-react';
import { logout } from '@/lib/actions/auth';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

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
