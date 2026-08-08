"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, useGsapPlugins } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li";
};

/**
 * Fades + lifts children into view once they cross the viewport threshold.
 * Animates only once per element (ScrollTrigger `once: true`) per the spec.
 * Respects prefers-reduced-motion by skipping straight to the final state.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  useGsapPlugins();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [delay, y]);

  const Tag = as as any;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
