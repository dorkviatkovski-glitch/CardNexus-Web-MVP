'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Store, Users, User } from 'lucide-react';

const navItems = [
  { label: 'Collection', path: '/collection', icon: LayoutGrid },
  { label: 'Market', path: '/marketplace', icon: Store },
  { label: 'Shared', path: '/shared', icon: Users },
  { label: 'Profile', path: '/profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center gap-1 min-w-[64px] transition-all ${
              isActive ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            {isActive && <div className="w-1 h-1 bg-blue-600 rounded-full mt-0.5" />}
          </Link>
        );
      })}
    </nav>
  );
}
