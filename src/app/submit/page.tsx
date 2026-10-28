import { createClient } from "@/lib/supabase/server";
import { SubmitForm } from "@/components/SubmitForm";

export const dynamic = "force-dynamic";

export default async function SubmitPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Submit a claim</h1>
      <p className="mt-2 text-sm opacity-70">
        Share a post claiming a job sector is dead because of AI.
      </p>
      <SubmitForm categories={categories ?? []} />
    </main>
  );
}