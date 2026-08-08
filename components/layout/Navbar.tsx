"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { NAV_LINKS } from "@/constants/nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { useGsapPlugins } from "@/lib/gsap";

const SECTION_IDS = NAV_LINKS.map((l) => l.id);
const NAV_HEIGHT = 64;

export default function Navbar() {
  const gsap = useGsapPlugins();
  const scrolled = useScrolled(12);
  const activeId = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: href, offsetY: NAV_HEIGHT },
      ease: "power3.inOut",
    });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-ink-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container as="header" className="h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center gap-2.5 group"
          aria-label="Accredian Enterprise — back to top"
        >
          <span className="brass-seal h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold text-ink">
            A
          </span>
          <span className="font-display text-lg tracking-tight text-bone">
            Accredian <span className="text-brass-bright italic">Enterprise</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              aria-current={activeId === l.id ? "true" : undefined}
              className={`relative text-sm font-medium transition-colors py-1 ${
                activeId === l.id ? "text-bone" : "text-bone/60 hover:text-bone"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-brass-bright transition-all duration-300 ${
                  activeId === l.id ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#brief"
            onClick={(e) => handleNavClick(e, "#brief")}
            className="inline-flex items-center gap-2 rounded-sm border border-brass/60 px-4 py-2 text-sm font-medium text-brass-bright hover:bg-brass hover:text-ink transition-colors"
          >
            Request a briefing
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-bone p-2 -mr-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`lg:hidden overflow-hidden bg-ink border-t border-ink-line transition-[max-height] duration-300 ease-out ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <Container className="py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`text-base font-medium ${
                activeId === l.id ? "text-brass-bright" : "text-bone/80"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#brief"
            onClick={(e) => handleNavClick(e, "#brief")}
            className="mt-2 inline-flex justify-center rounded-sm border border-brass/60 px-4 py-2.5 text-sm font-medium text-brass-bright"
          >
            Request a briefing
          </a>
        </Container>
      </nav>
    </header>
  );
}
