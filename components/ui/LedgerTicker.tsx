"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapPlugins } from "@/lib/gsap";

const ENTRIES = [
  "42,018 learners certified",
  "94% cohort completion",
  "30 enterprise partners",
  "500+ practitioner mentors",
  "7 domain specialisations",
  "12-week average cohort length",
];

export default function LedgerTicker() {
  useGsapPlugins();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const distance = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -distance,
      duration: 26,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const loop = [...ENTRIES, ...ENTRIES];

  return (
    <div className="border-y border-brass/25 bg-ink-raised/60 py-3 overflow-hidden" aria-hidden="true">
      <div ref={trackRef} className="flex w-max">
        {loop.map((e, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-xs tracking-wider text-bone/60 uppercase px-8 whitespace-nowrap shrink-0"
          >
            <span className="text-brass-bright mr-3">◆</span>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
