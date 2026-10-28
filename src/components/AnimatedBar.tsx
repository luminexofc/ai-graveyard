"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function AnimatedBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current.style.width = `${value}%`;
      return;
    }
    const el = ref.current;
    el.style.width = "0%";
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(el, {
              width: `${value}%`,
              duration: 800,
              ease: "outExpo",
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="h-full bg-[var(--color-accent)]"
      style={{ width: "0%" }}
    />
  );
}