"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import FAQItem from "@/components/ui/FAQItem";
import { FAQS } from "@/constants/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 md:py-32">
      <Container className="max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-brass-bright uppercase mb-4 text-center">
            Frequently Filed Questions
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="faq-heading" className="font-display text-4xl md:text-5xl text-bone text-center mb-14 text-balance">
            Questions HR &amp; L&amp;D ask first
          </h2>
        </Reveal>

        <div className="border-t border-ink-line">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <FAQItem
                q={f.q}
                a={f.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
