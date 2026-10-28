"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function Tombstone({
  name,
  delay = 0,
}: {
  name: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(ref.current, {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 900,
      delay,
      ease: "outExpo",
    });
  }, [delay]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-28 text-center opacity-0"
      style={{ willChange: "transform, opacity" }}
    >
      <svg viewBox="0 0 112 160" className="w-full" aria-hidden="true">
        <path
          d="M16 160 L16 48 Q16 16 56 16 Q96 16 96 48 L96 160 Z"
          fill="var(--color-rule)"
          stroke="var(--color-ink)"
          strokeWidth="2"
        />
        <rect x="8" y="150" width="96" height="10" fill="var(--color-rule)" />
      </svg>
      <span
        className="absolute left-1/2 top-10 -translate-x-1/2 text-xs font-bold text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {name}
      </span>
    </div>
  );
}