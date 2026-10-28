import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AnimatedBar } from "@/components/AnimatedBar";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, is_buried, buried_at");

  // aggregate submissions per category
  const { data: submissions } = await supabase
    .from("submissions")
    .select("category_id, vote_score");

  const stats = new Map<string, { claims: number; votes: number }>();
  for (const s of submissions ?? []) {
    const cur = stats.get(s.category_id) ?? { claims: 0, votes: 0 };
    cur.claims += 1;
    cur.votes += s.vote_score ?? 0;
    stats.set(s.category_id, cur);
  }

  const ranked = (categories ?? [])
    .map((c) => {
      const s = stats.get(c.id) ?? { claims: 0, votes: 0 };
      return { ...c, claims: s.claims, votes: s.votes, total: s.claims + s.votes };
    })
    .sort((a, b) => b.total - a.total);

  const max = Math.max(1, ...ranked.map((r) => r.total));

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Leaderboard</h1>
      <p className="mt-2 text-sm opacity-70">
        Categories ranked by claims + votes. Top ones get buried.
      </p>
      <ol className="mt-6 space-y-3">
        {ranked.map((c, i) => (
          <li key={c.id} className="rounded border border-[var(--color-rule)] p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm opacity-50">#{i + 1}</span>
                <Link href={`/category/${c.slug}`} className="font-semibold hover:underline">
                  {c.name}
                </Link>
                {c.is_buried && <span className="text-xs">🪦 buried</span>}
              </div>
              <span className="font-mono text-sm">
                {c.claims} claims · {c.votes} votes
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded bg-[var(--color-rule)]">
              <AnimatedBar value={(c.total / max) * 100} />
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}