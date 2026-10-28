"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function Tombstone({
  name,
  buried = false,
  votes = 0,
  threshold = 10,
  delay = 0,
}: {
  name: string;
  buried?: boolean;
  votes?: number;
  threshold?: number;
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

  const fill = buried ? "var(--color-rule)" : "transparent";
  const stroke = buried ? "var(--color-ink)" : "var(--color-rule)";

  return (
    <div
      ref={ref}
      className="relative mx-auto w-28 text-center opacity-0"
      style={{ willChange: "transform, opacity" }}
      title={buried ? `${name} — buried` : `${name} — ${votes}/${threshold} votes`}
    >
      <svg viewBox="0 0 112 160" className="w-full" aria-hidden="true">
        <path
          d="M16 160 L16 48 Q16 16 56 16 Q96 16 96 48 L96 160 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
          strokeDasharray={buried ? undefined : "6 4"}
        />
        <rect x="8" y="150" width="96" height="10" fill={fill} stroke={stroke} strokeWidth="2" />
      </svg>
      <span
        className={`absolute left-1/2 top-10 -translate-x-1/2 text-xs font-bold ${
          buried ? "text-[var(--color-ink)]" : "opacity-60"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {name}
      </span>
      {!buried && (
        <span className="absolute left-1/2 top-[4.5rem] -translate-x-1/2 text-[10px] opacity-60">
          {votes}/{threshold}
        </span>
      )}
    </div>
  );
}