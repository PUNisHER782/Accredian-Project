"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { PROCESS } from "@/constants/process";
import { gsap, useGsapPlugins } from "@/lib/gsap";

export default function Process() {
  useGsapPlugins();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cells = grid.querySelectorAll<HTMLElement>("[data-process-cell]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(cells, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cells, { opacity: 0, y: 30 });
    const ctx = gsap.context(() => {
      gsap.to(cells, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" aria-labelledby="approach-heading" className="py-24 md:py-32 bg-ink-raised/40">
      <Container>
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-brass-bright uppercase mb-4">
            How An Engagement Is Logged
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="approach-heading" className="font-display text-4xl md:text-5xl text-bone mb-16 max-w-2xl text-balance">
            Four stages. Every one measured.
          </h2>
        </Reveal>

        <div ref={gridRef} className="grid md:grid-cols-4 gap-px bg-ink-line rounded-[2px] overflow-hidden">
          {PROCESS.map((p) => (
            <div key={p.step} data-process-cell className="bg-ink-raised p-8 h-full">
              <span className="font-mono text-sm text-brass-bright/70">{p.step}</span>
              <h3 className="font-display text-2xl text-bone mt-4 mb-3">{p.title}</h3>
              <p className="text-bone/65 leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
