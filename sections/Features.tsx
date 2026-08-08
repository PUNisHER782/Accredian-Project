"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FeatureCard from "@/components/ui/FeatureCard";
import { FEATURES } from "@/constants/features";
import { gsap, useGsapPlugins } from "@/lib/gsap";

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];

export default function Features() {
  useGsapPlugins();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-feature-card]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cards, { opacity: 0, y: 36 });
    const ctx = gsap.context(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="features-heading" className="py-24 md:py-32 bg-parchment paper-texture text-charcoal">
      <Container>
        <div className="max-w-2xl mb-16">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] text-emerald uppercase mb-4">
              Why Enterprises File With Us
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="features-heading" className="font-display text-4xl md:text-5xl leading-tight text-balance">
              Off-the-shelf courses don&apos;t survive contact with a real org chart.
            </h2>
          </Reveal>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 gap-8">
          {FEATURES.map((f, i) => (
            <div key={f.id} data-feature-card>
              <FeatureCard {...f} rotation={ROTATIONS[i]} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
