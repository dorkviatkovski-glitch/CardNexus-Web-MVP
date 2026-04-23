import { User, Settings, LogOut } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile</h1>
        <p className="text-slate-500 font-medium text-sm">Account settings</p>
      </header>

      <div className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
          <User size={28} className="text-slate-400" />
        </div>
        <div>
          <p className="font-bold text-slate-800">Collector</p>
          <p className="text-sm text-slate-400">collector@cardnexus.app</p>
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full p-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-3 hover:bg-slate-50 transition-colors text-left">
          <Settings size={20} className="text-slate-400" />
          <span className="font-semibold text-slate-700">Settings</span>
        </button>
        <button className="w-full p-4 bg-white rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-3 hover:bg-slate-50 transition-colors text-left">
          <LogOut size={20} className="text-slate-400" />
          <span className="font-semibold text-slate-700">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
