import type { Card } from "@/domain/card";
import { CardWorkspace } from "@/components/CardWorkspace";
import { services } from "@/services/container";

export default async function Home() {
  const cards: Card[] = await services.repository.list();

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <main className="mx-auto grid w-full max-w-6xl gap-8">
        <header className="space-y-4 rounded-2xl bg-slate-900 p-8 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
            CardNexus MVP Rebuild
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Scalable collection platform foundation
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-200 sm:text-base">
            This implementation turns the starter app into a modular MVP with
            API routes, a processing pipeline, domain contracts, and clear
            extension points for production providers (Supabase, CV services,
            pricing APIs, and background workers).
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "API-first modules",
              text: "Separated domain contracts, repository interfaces, and service pipelines to keep future backend extraction simple.",
            },
            {
              title: "Pipeline orchestration",
              text: "Card processing now runs as a dedicated orchestration flow with recognition + valuation stages and typed error handling.",
            },
            {
              title: "Scale-ready boundaries",
              text: "In-memory adapters can be swapped with Supabase/Postgres, message queues, and microservices without rewriting UI code.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <CardWorkspace initialCards={cards} />
      </main>
    </div>
  );
}
