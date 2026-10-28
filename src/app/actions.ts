"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getVoterToken } from "@/lib/voter";
import { submitClaimSchema, voteSchema } from "@/lib/validations";

export async function submitClaim(formData: FormData) {
  const parsed = submitClaimSchema.safeParse({
    title: formData.get("title"),
    sourceUrl: formData.get("sourceUrl") ?? "",
    platform: formData.get("platform") ?? "other",
    categoryId: formData.get("categoryId"),
  });
  if (!parsed.success) {
    return { ok: false, error: "Invalid input." };
  }
  const { title, sourceUrl, platform, categoryId } = parsed.data;

  const supabase = await createClient();

  let imageUrl: string | null = null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop() ?? "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("claim-images")
      .upload(path, file, { contentType: file.type });
    if (!upErr) {
      const { data } = supabase.storage.from("claim-images").getPublicUrl(path);
      imageUrl = data.publicUrl;
    }
  }

  const { error } = await supabase.from("submissions").insert({
    title,
    source_url: sourceUrl || null,
    platform,
    category_id: categoryId,
    image_url: imageUrl,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/browse");
  revalidatePath("/");
  return { ok: true };
}

export async function vote(formData: FormData) {
  const parsed = voteSchema.safeParse({
    submissionId: formData.get("submissionId"),
    value: Number(formData.get("value")),
  });
  if (!parsed.success) return { ok: false, error: "Invalid vote." };

  const { submissionId, value } = parsed.data;
  const token = await getVoterToken();
  const supabase = await createClient();

  // upsert vote
  const { error } = await supabase.from("votes").upsert(
    { submission_id: submissionId, voter_token: token, value },
    { onConflict: "submission_id,voter_token" },
  );
  if (error) return { ok: false, error: error.message };

  // Bury check: if this submission's category crosses the threshold, bury it.
  const { data: sub } = await supabase
    .from("submissions")
    .select("category_id")
    .eq("id", submissionId)
    .single();
  if (sub) {
    const { data: agg } = await supabase
      .from("submissions")
      .select("vote_score")
      .eq("category_id", sub.category_id);
    const total = (agg ?? []).reduce((s, r) => s + (r.vote_score ?? 0), 0);
    const threshold = Number(process.env.BURY_THRESHOLD ?? 10);
    if (total >= threshold) {
      await supabase
        .from("categories")
        .update({ is_buried: true, buried_at: new Date().toISOString() })
        .eq("id", sub.category_id)
        .eq("is_buried", false);
    }
  }

  revalidatePath("/browse");
  revalidatePath("/leaderboard");
  revalidatePath("/");
  return { ok: true };
}