import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

const COLUMNS = [
  {
    title: "Programmes",
    links: ["Generative AI Mastery", "Data Science & Analytics", "Leadership Elevation", "Fintech Fundamentals"],
  },
  {
    title: "Company",
    links: ["About", "Faculty network", "Careers", "Press"],
  },
  {
    title: "Resources",
    links: ["ROI calculator", "Case studies", "LMS integration guide", "FAQ"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-line pt-16 pb-10">
      <Container>
        <Reveal>
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
            <div>
              <a href="#top" className="flex items-center gap-2.5 mb-5">
                <span className="brass-seal h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold text-ink">
                  A
                </span>
                <span className="font-display text-lg text-bone">
                  Accredian <span className="text-brass-bright italic">Enterprise</span>
                </span>
              </a>
              <p className="text-bone/65 text-sm leading-relaxed max-w-xs">
                Enterprise upskilling, co-designed with premier institutes and industry faculty —
                mentored, measured, and tied to business outcomes.
              </p>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-xs tracking-widest text-bone/60 uppercase mb-4">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-bone/60 hover:text-bone transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="h-px bg-ink-line mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bone/60 font-mono">
          <p>© {new Date().getFullYear()} Accredian Enterprise — original build, not affiliated with Accredian.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-bone/70">Privacy</a>
            <a href="#" className="hover:text-bone/70">Terms</a>
            <a href="#" className="hover:text-bone/70">Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
