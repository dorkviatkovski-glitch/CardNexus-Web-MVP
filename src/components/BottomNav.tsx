"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/shared", label: "Shared" },
  { href: "/profile", label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95">
      <ul className="mx-auto flex max-w-4xl justify-between px-6 py-4 text-sm">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={active ? "text-cyan-300" : "text-slate-300 hover:text-white"}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
