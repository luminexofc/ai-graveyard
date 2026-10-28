"use client";

import nextDynamic from "next/dynamic";

const Graveyard3D = nextDynamic(() => import("@/components/Graveyard3D").then((m) => m.Graveyard3D), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-[var(--color-rule)] opacity-60">
      Loading graveyard…
    </div>
  ),
});

export function Graveyard3DLoader({ categories }: { categories: { name: string; buried: boolean; votes: number; threshold: number }[] }) {
  return <Graveyard3D categories={categories} />;
}