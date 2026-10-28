import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClaimCard } from "@/components/ClaimCard";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug, is_buried, buried_at")
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  const { data: submissions } = await supabase
    .from("submissions")
    .select("id, title, source_url, platform, image_url, vote_score, categories(name, slug)")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  const claims = submissions?.length ?? 0;
  const votes = (submissions ?? []).reduce((s, x) => s + (x.vote_score ?? 0), 0);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{category.name}</h1>
        {category.is_buried && <span className="text-lg">🪦 buried</span>}
      </div>
      <p className="mt-2 text-sm opacity-70">
        {claims} claims · {votes} votes
        {category.is_buried && category.buried_at
          ? ` · buried ${new Date(category.buried_at).toLocaleDateString()}`
          : ""}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(submissions ?? []).map((s) => (
          <ClaimCard key={s.id} s={s as never} />
        ))}
      </div>
      {(submissions ?? []).length === 0 && (
        <p className="mt-8 opacity-70">No claims in this category yet.</p>
      )}
      <div className="mt-8">
        <Link href="/browse" className="text-sm text-blue-600 hover:underline">
          ← Back to browse
        </Link>
      </div>
    </main>
  );
}