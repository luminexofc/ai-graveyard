import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Reveal } from "@/components/Reveal";
import { Graveyard3DLoader } from "@/components/Graveyard3DLoader";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, is_buried")
    .order("name");

  const { data: submissions } = await supabase
    .from("submissions")
    .select("category_id, vote_score");

  const votesByCategory = new Map<string, number>();
  for (const s of submissions ?? []) {
    votesByCategory.set(
      s.category_id,
      (votesByCategory.get(s.category_id) ?? 0) + (s.vote_score ?? 0),
    );
  }

  const threshold = Number(process.env.BURY_THRESHOLD ?? 10);

  const { data: top } = await supabase
    .from("submissions")
    .select("id, title, vote_score, categories(name)")
    .order("vote_score", { ascending: false })
    .limit(5);

  const totalClaims = submissions?.length ?? 0;
  const totalVotes = (submissions ?? []).reduce((s, x) => s + (x.vote_score ?? 0), 0);
  const buriedCount = (categories ?? []).filter((c) => c.is_buried).length;

  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="fog-layer" />
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
            a cultural artifact, not research
          </p>
          <h1
            className="mt-4 text-5xl font-bold leading-tight sm:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Graveyard
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg opacity-80">
            Where careers go to be disputed. Track the social-media claims that a job sector is
            dead because of AI.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {totalClaims}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest opacity-60">claims</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {totalVotes}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest opacity-60">votes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {buriedCount}
            </div>
            <div className="mt-1 text-xs uppercase tracking-widest opacity-60">buried</div>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex justify-center gap-4">
          <Link
            href="/submit"
            className="btn-press rounded bg-[var(--color-accent)] px-6 py-3 font-semibold text-black transition hover:brightness-110"
          >
            Bury a claim
          </Link>
          <Link
            href="/browse"
            className="btn-press rounded border border-[var(--color-rule)] px-6 py-3 transition hover:border-[var(--color-accent)]"
          >
            Browse claims
          </Link>
        </Reveal>
      </section>

      {/* Graveyard */}
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-rule)] px-6 py-16">
        <div className="fog-layer" />
        <h2
          className="relative text-center text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Graveyard
        </h2>
        <p className="relative mt-2 text-center text-sm opacity-60">
          Solid tombstones are buried. Ghosted ones are still being voted on.
        </p>
        <div className="relative mt-10">
          <Graveyard3DLoader
            categories={(categories ?? []).map((c) => ({
              name: c.name,
              buried: c.is_buried,
              votes: votesByCategory.get(c.id) ?? 0,
              threshold,
            }))}
          />
        </div>
        <ul className="relative mt-6 flex flex-wrap justify-center gap-2">
          {(categories ?? []).map((c) => (
            <li key={c.id} className="rounded border border-[var(--color-rule)] px-3 py-1 text-sm">
              <Link href={`/category/${c.slug}`} className="hover:underline">
                {c.name} {c.is_buried ? "🪦" : ""}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Most killed */}
      <Reveal className="mx-auto mt-16 max-w-3xl px-6">
        <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Most killed
        </h2>
        <ul className="mt-4 space-y-2">
          {(top ?? []).map((t) => (
            <li
              key={t.id}
              className="card-lift flex justify-between rounded-lg border border-[var(--color-rule)] p-4"
            >
              <span>{t.title}</span>
              <span className="font-mono text-[var(--color-accent)]">{t.vote_score}</span>
            </li>
          ))}
          {(top ?? []).length === 0 && (
            <li className="opacity-60">No claims yet. Be the first to bury one.</li>
          )}
        </ul>
      </Reveal>

      <footer className="mx-auto mt-24 max-w-5xl border-t border-[var(--color-rule)] px-6 py-8 text-center text-sm opacity-50">
        A cultural artifact. Not research. Not truth.
      </footer>
    </main>
  );
}