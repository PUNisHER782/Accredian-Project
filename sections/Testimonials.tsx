"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { TESTIMONIALS } from "@/constants/testimonials";
import { gsap, useGsapPlugins } from "@/lib/gsap";

const ROTATIONS = ["-rotate-2", "rotate-1", "-rotate-1"];

export default function Testimonials() {
  useGsapPlugins();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(cards, { opacity: 0, y: 34 });
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
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="py-24 md:py-32 bg-parchment paper-texture text-charcoal"
    >
      <Container>
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-emerald uppercase mb-4">
            Correspondence on File
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="stories-heading" className="font-display text-4xl md:text-5xl mb-16 max-w-2xl text-balance">
            What lands on our desk after a cohort wraps.
          </h2>
        </Reveal>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.org} data-testimonial-card>
              <TestimonialCard {...t} rotation={ROTATIONS[i]} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
