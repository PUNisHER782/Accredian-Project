"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, TrendingUp, Activity } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { HERO } from "@/constants/hero";
import { gsap, useGsapPlugins } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Hero() {
  useGsapPlugins();
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  // Entrance: stagger text reveal + fade/translate on mount (above the fold,
  // so this runs immediately rather than waiting on ScrollTrigger).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const cards = stackRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? [];

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      gsap.set(cards, { opacity: 1, y: 0, rotate: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(targets, { opacity: 0, y: 32 })
      .set(cards, { opacity: 0, y: 44, rotate: (i) => [-6, 3, -2][i] ?? 0 })
      .to(targets, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 })
      .to(cards, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, "-=0.6");

    return () => {
      tl.kill();
    };
  }, []);

  // Floating illustration: gentle perpetual bob, independent of scroll.
  useEffect(() => {
    const cards = stackRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards || cards.length === 0) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tweens = Array.from(cards).map((card, i) =>
      gsap.to(card, {
        y: "+=10",
        duration: 2.6 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      })
    );
    return () => tweens.forEach((t) => t.kill());
  }, []);

  // Subtle parallax on the background grid as the hero scrolls out of view.
  useEffect(() => {
    const grid = gridRef.current;
    const root = rootRef.current;
    if (!grid || !root) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(grid, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden"
    >
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#8C6A30 1px, transparent 1px), linear-gradient(90deg, #8C6A30 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative">
        <div>
          <Badge data-reveal className="mb-6">
            {HERO.eyebrow}
          </Badge>

          <h1
            data-reveal
            className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem] lg:leading-[1.03] text-bone text-balance"
          >
            {HERO.heading[0]}{" "}
            <span className="italic text-brass-bright">{HERO.heading[1]}</span>
          </h1>

          <p data-reveal className="mt-7 max-w-xl text-lg text-bone/70 leading-relaxed">
            {HERO.subhead}
          </p>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={HERO.primaryCta.href} variant="solid">
              {HERO.primaryCta.label}
            </Button>
            <Button href={HERO.secondaryCta.href} variant="outline">
              {HERO.secondaryCta.label}
            </Button>
          </div>

          <div
            data-reveal
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-bone/65 text-xs font-mono uppercase tracking-wider"
          >
            <span>Co-certified with</span>
            {HERO.partners.map((p, i) => (
              <span key={p} className="flex items-center gap-6">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-bone/30" />}
                <span className="text-bone/80">{p}</span>
              </span>
            ))}
          </div>
        </div>

        <div ref={stackRef} className="relative h-[420px] hidden sm:block" aria-hidden="true">
          <div
            data-card
            className="absolute top-0 right-6 w-72 rounded-[2px] bg-parchment p-6 shadow-2xl"
          >
            <p className="font-mono text-[10px] tracking-widest text-charcoal/75 uppercase">
              Certificate of Completion
            </p>
            <p className="font-display text-2xl text-charcoal mt-3">Generative AI Mastery</p>
            <p className="text-sm text-charcoal/75 mt-2">Cohort GAI-501 · Batch 14</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="brass-seal h-10 w-10 rounded-full inline-flex items-center justify-center">
                <ShieldCheck size={16} className="text-ink/70" />
              </span>
              <span className="font-mono text-xs text-charcoal/75">Verified</span>
            </div>
          </div>

          <div
            data-card
            className="absolute top-20 left-2 w-64 rounded-[2px] bg-parchment p-5 shadow-2xl"
          >
            <p className="font-mono text-[10px] tracking-widest text-charcoal/75 uppercase flex items-center gap-1.5">
              <TrendingUp size={12} /> Skill Velocity
            </p>
            <p className="font-display text-3xl text-emerald mt-2">+38%</p>
            <p className="text-xs text-charcoal/75 mt-1">Assessed over 12 weeks</p>
          </div>

          <div
            data-card
            className="absolute bottom-0 right-16 w-60 rounded-[2px] bg-ink-raised border border-ink-line p-5 shadow-2xl"
          >
            <p className="font-mono text-[10px] tracking-widest text-brass-bright/70 uppercase flex items-center gap-1.5">
              <Activity size={12} /> Cohort Status
            </p>
            <p className="text-bone text-sm mt-2 leading-relaxed">
              214 learners active · 94% engagement this week
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
