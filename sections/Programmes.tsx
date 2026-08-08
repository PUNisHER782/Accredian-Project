"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ProgramCard from "@/components/ui/ProgramCard";
import { PROGRAMMES } from "@/constants/programmes";
import { gsap, useGsapPlugins } from "@/lib/gsap";

export default function Programmes() {
  useGsapPlugins();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const rows = list.querySelectorAll<HTMLElement>("[data-program-row]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(rows, { opacity: 1, x: 0 });
      return;
    }

    gsap.set(rows, { opacity: 0, x: -20 });
    const ctx = gsap.context(() => {
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: list, start: "top 80%", once: true },
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section id="programmes" aria-labelledby="programmes-heading" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.25em] text-brass-bright uppercase mb-4">
                The Programme Ledger
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="programmes-heading" className="font-display text-4xl md:text-5xl text-bone text-balance">
                Seven domains, one accountable curriculum.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-bone/60 leading-relaxed">
              Each track is co-designed with practitioner faculty and issued a course code —
              tracked from kickoff to certification.
            </p>
          </Reveal>
        </div>

        <div ref={listRef} className="border-t border-ink-line">
          {PROGRAMMES.map((p) => (
            <div key={p.code} data-program-row>
              <ProgramCard {...p} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
