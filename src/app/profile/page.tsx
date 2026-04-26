"use client";

import { useEffect, useState } from "react";

interface Profile {
  name: string;
  email: string;
  collectionCount: number;
  activeListings: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, []);

  const logout = () => {
    localStorage.removeItem("cardnexus_token");
    localStorage.removeItem("cardnexus_user");
    window.location.href = "/login";
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-semibold">Profile</h1>
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-xl font-medium">{profile?.name}</p>
        <p className="text-sm text-slate-400">{profile?.email}</p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg border border-slate-800 p-4">
            <p className="text-slate-400">Collections</p>
            <p className="text-2xl font-semibold">{profile?.collectionCount ?? 0}</p>
          </div>
          <div className="rounded-lg border border-slate-800 p-4">
            <p className="text-slate-400">Active Listings</p>
            <p className="text-2xl font-semibold">{profile?.activeListings ?? 0}</p>
          </div>
        </div>
        <button className="mt-6 rounded-lg border border-slate-600 px-4 py-2 text-sm" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
