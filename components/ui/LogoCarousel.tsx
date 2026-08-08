"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapPlugins } from "@/lib/gsap";

type LogoCarouselProps = {
  items: readonly string[];
};

/**
 * Infinite marquee of wordmark logos. Duplicates the list once and animates
 * a continuous translateX loop via GSAP so the seam is invisible.
 */
export default function LogoCarousel({ items }: LogoCarouselProps) {
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
      duration: items.length * 3,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [items.length]);

  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden" role="list" aria-label="Enterprise partners">
      <div ref={trackRef} className="flex w-max items-center gap-16">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            role="listitem"
            className="font-display text-lg md:text-xl text-bone/55 hover:text-bone/80 transition-colors whitespace-nowrap shrink-0"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
