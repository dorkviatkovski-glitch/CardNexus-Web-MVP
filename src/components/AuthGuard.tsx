"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BottomNav } from "./BottomNav";

const publicPaths = ["/login", "/signup"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const token = typeof window !== "undefined" ? localStorage.getItem("cardnexus_token") : null;
  const isPublic = publicPaths.includes(pathname);

  useEffect(() => {
    if (!token && !isPublic) {
      router.replace("/login");
      return;
    }

    if (token && (pathname === "/login" || pathname === "/signup" || pathname === "/")) {
      router.replace("/collection");
    }
  }, [isPublic, pathname, router, token]);

  if (!token && !isPublic) {
    return <div className="flex min-h-screen items-center justify-center text-slate-400">Loading...</div>;
  }

  const showBottomNav = !isPublic;

  return (
    <>
      <main className={showBottomNav ? "pb-20" : ""}>{children}</main>
      {showBottomNav ? <BottomNav /> : null}
    </>
  );
}
