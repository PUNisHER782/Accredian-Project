"use client";

import { useEffect, useRef } from "react";
import { gsap, useGsapPlugins } from "@/lib/gsap";

/**
 * Animates a number from 0 to `value` once the element scrolls into view.
 * Returns a ref to attach to the element whose textContent should update.
 */
export function useCountUp(value: number, suffix = "") {
  useGsapPlugins();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.textContent = `${value.toLocaleString("en-IN")}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.floor(counter.n).toLocaleString("en-IN")}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  return ref;
}
