"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently most visible in the viewport.
 * Used to drive the navbar's active-link indicator without a scroll-position
 * math (IntersectionObserver is cheaper and avoids layout thrashing).
 */
export function useActiveSection(sectionIds: readonly string[], rootMargin = "-45% 0px -50% 0px") {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
