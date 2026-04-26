"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("collector@cardnexus.com");
  const [password, setPassword] = useState("demo-password");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("Unable to login. Please check your details.");
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
          <h1 className="mt-2 text-3xl font-semibold">Log in</h1>
          <p className="mt-2 text-sm text-slate-400">Access your card portfolio and marketplace activity.</p>
        </div>
        <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        <button className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-medium text-slate-950">Log in</button>
        <p className="text-sm text-slate-400">
          No account yet? <Link href="/signup" className="text-cyan-300">Create one</Link>
        </p>
      </form>
    </div>
  );
}
