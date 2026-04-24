import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { LayoutDashboard, Users, Share2, FileEdit, Settings } from 'lucide-react';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('Profile')
    .select('is_admin')
    .eq('user_id', user.id)
    .single();

  if (!profile?.is_admin) {
    redirect('/collection');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black tracking-tight">Admin Panel</h2>
          <p className="text-slate-400 text-xs mt-1">CardNexus Management</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium">
            <Users size={18} />
            Users
          </Link>
          <Link href="/admin/shared" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium">
            <Share2 size={18} />
            Shared Collections
          </Link>
          <Link href="/admin/content" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium">
            <FileEdit size={18} />
            Content Editor
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/collection" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm font-medium text-slate-400">
            <Settings size={18} />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-slate-800">Admin Console</h1>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">ONLINE</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
