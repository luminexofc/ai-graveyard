import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Tombstone } from "@/components/Tombstone";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, is_buried")
    .order("name");

  const { data: top } = await supabase
    .from("submissions")
    .select("id, title, vote_score, categories(name)")
    .order("vote_score", { ascending: false })
    .limit(5);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>AI Graveyard</h1>
        <p className="mt-3 opacity-70">
          Where careers go to be disputed. Track social-media claims that a job sector is dead
          because of AI.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Bury a claim
          </Link>
          <Link href="/browse" className="rounded border px-4 py-2">
            Browse claims
          </Link>
        </div>
      </section>

      <section className="relative mt-8 overflow-hidden rounded-lg border border-[var(--color-rule)] p-6">
        <div className="fog" />
        <h2 className="relative text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Graveyard
        </h2>
        <div className="relative mt-4 flex flex-wrap items-end justify-center gap-4">
          {(categories ?? [])
            .filter((c) => c.is_buried)
            .map((c, i) => (
              <Link key={c.id} href={`/category/${c.slug}`}>
                <Tombstone name={c.name} delay={i * 120} />
              </Link>
            ))}
          {(categories ?? []).filter((c) => c.is_buried).length === 0 && (
            <p className="opacity-70">No burials yet.</p>
          )}
        </div>
        <ul className="relative mt-6 flex flex-wrap gap-2">
          {(categories ?? [])
            .filter((c) => !c.is_buried)
            .map((c) => (
              <li key={c.id} className="rounded border border-[var(--color-rule)] px-3 py-1 text-sm">
                <Link href={`/category/${c.slug}`} className="hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <div className="mt-6">
        <Link href="/leaderboard" className="text-sm text-blue-600 hover:underline">
          View full leaderboard →
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Most killed</h2>
        <ul className="mt-3 space-y-2">
          {(top ?? []).map((t) => (
            <li key={t.id} className="flex justify-between rounded border p-3">
              <span>{t.title}</span>
              <span className="font-mono">{t.vote_score}</span>
            </li>
          ))}
          {(top ?? []).length === 0 && (
            <li className="text-gray-500">No claims yet.</li>
          )}
        </ul>
      </section>
    </main>
  );
}