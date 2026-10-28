"use client";

import { useState } from "react";
import { useActionState } from "react";
import { submitClaim } from "@/app/actions";

type Category = { id: string; name: string; slug: string };
type State = { ok: boolean; error?: string } | null;

const inputCls = "rounded border border-[var(--color-rule)] bg-[var(--color-paper)] px-3 py-2";

export function SubmitForm({ categories }: { categories: Category[] }) {
  const [mode, setMode] = useState<"existing" | "new">("existing");
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

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Category</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("existing")}
            className={`rounded border px-3 py-1 text-sm ${
              mode === "existing"
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "border-[var(--color-rule)]"
            }`}
          >
            Existing
          </button>
          <button
            type="button"
            onClick={() => setMode("new")}
            className={`rounded border px-3 py-1 text-sm ${
              mode === "new"
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "border-[var(--color-rule)]"
            }`}
          >
            Create new
          </button>
        </div>
        {mode === "existing" ? (
          <select name="categoryId" required className={inputCls}>
            <option value="">Pick a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              name="newCategory"
              required
              minLength={2}
              maxLength={60}
              className={inputCls}
              placeholder="e.g. 3D Modeling"
            />
            <input type="hidden" name="categoryId" value="" />
          </>
        )}
      </div>

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