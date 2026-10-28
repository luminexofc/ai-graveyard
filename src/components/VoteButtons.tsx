"use client";

import { useRef, useTransition } from "react";
import { animate } from "animejs";
import { vote } from "@/app/actions";

export function VoteButtons({
  submissionId,
  score,
}: {
  submissionId: string;
  score: number;
}) {
  const scoreRef = useRef<HTMLSpanElement>(null);
  const [pending, startTransition] = useTransition();

  function cast(value: 1 | -1) {
    const fd = new FormData();
    fd.set("submissionId", submissionId);
    fd.set("value", String(value));
    startTransition(() => {
      vote(fd);
    });
    if (scoreRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animate(scoreRef.current, {
        scale: [1, 1.4, 1],
        duration: 400,
        ease: "outExpo",
      });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => cast(1)}
        className="rounded border border-[var(--color-rule)] px-2 py-1 text-sm hover:bg-[var(--color-rule)] disabled:opacity-50"
        aria-label="Upvote"
      >
        ▲
      </button>
      <span ref={scoreRef} className="min-w-[2ch] text-center font-mono">{score}</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => cast(-1)}
        className="rounded border border-[var(--color-rule)] px-2 py-1 text-sm hover:bg-[var(--color-rule)] disabled:opacity-50"
        aria-label="Downvote"
      >
        ▼
      </button>
    </div>
  );
}