import { createClient } from "@/lib/supabase/server";
import { ClaimCard } from "@/components/ClaimCard";
import { FilterBar } from "@/components/FilterBar";

export const dynamic = "force-dynamic";

type SearchParams = {
  category?: string;
  platform?: string;
  sort?: string;
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  let query = supabase
    .from("submissions")
    .select("id, title, source_url, platform, image_url, vote_score, categories(name, slug)");

  if (params.category) {
    const cat = (categories ?? []).find((c) => c.slug === params.category);
    if (cat) query = query.eq("category_id", cat.id);
  }
  if (params.platform) query = query.eq("platform", params.platform);
  if (params.sort === "top") query = query.order("vote_score", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data: submissions } = await query.limit(50);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-bold">Browse claims</h1>
      <div className="mt-4">
        <FilterBar categories={categories ?? []} current={params} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(submissions ?? []).map((s) => (
          <ClaimCard key={s.id} s={s as never} />
        ))}
      </div>
      {(submissions ?? []).length === 0 && (
        <p className="mt-8 opacity-70">No claims yet. Be the first to bury one.</p>
      )}
    </main>
  );
}