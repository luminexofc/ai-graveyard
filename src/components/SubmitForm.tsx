"use client";

import { useActionState } from "react";
import { submitClaim } from "@/app/actions";

type Category = { id: string; name: string; slug: string };
type State = { ok: boolean; error?: string } | null;

const inputCls = "rounded border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2";

export function SubmitForm({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, fd) => submitClaim(fd),
    null,
  );

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Title</span>
        <input
          name="title"
          required
          minLength={3}
          maxLength={200}
          className={inputCls}
          placeholder="e.g. Graphics design is dead"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Category</span>
        <select name="categoryId" required className={inputCls}>
          <option value="">Pick a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Platform</span>
        <select name="platform" className={inputCls}>
          <option value="twitter">Twitter/X</option>
          <option value="reddit">Reddit</option>
          <option value="linkedin">LinkedIn</option>
          <option value="tiktok">TikTok</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Source URL (optional)</span>
        <input name="sourceUrl" type="url" className={inputCls} placeholder="https://..." />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Screenshot (optional)</span>
        <input name="image" type="file" accept="image/*" className="text-sm" />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-[var(--color-accent)] px-4 py-2 font-semibold text-black disabled:opacity-50"
      >
        {pending ? "Submitting..." : "Submit claim"}
      </button>
      {state?.ok && (
        <p className="text-[var(--color-accent)]">Submitted! It will appear in Browse.</p>
      )}
      {state && !state.ok && <p className="text-red-400">{state.error}</p>}
    </form>
  );
}