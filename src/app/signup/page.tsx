"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("New Collector");
  const [email, setEmail] = useState("new.collector@cardnexus.com");
  const [password, setPassword] = useState("strong-password");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    localStorage.setItem("cardnexus_token", data.token);
    localStorage.setItem("cardnexus_user", JSON.stringify(data));
    router.push("/collection");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      <form className="w-full space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-8" onSubmit={handleSubmit}>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">CardNexus</p>
          <h1 className="mt-2 text-3xl font-semibold">Create account</h1>
        </div>
        <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-medium text-slate-950">Sign up</button>
        <p className="text-sm text-slate-400">Already have an account? <Link href="/login" className="text-cyan-300">Log in</Link></p>
      </form>
    </div>
  );
}
