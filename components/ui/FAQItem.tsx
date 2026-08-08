"use client";

import { Plus } from "lucide-react";

type FAQItemProps = {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
};

export default function FAQItem({ q, a, open, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-ink-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg md:text-xl text-bone">{q}</span>
        <Plus
          size={20}
          className={`shrink-0 text-brass-bright transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <p className="text-bone/60 leading-relaxed max-w-2xl pb-6">{a}</p>
        </div>
      </div>
    </div>
  );
}
