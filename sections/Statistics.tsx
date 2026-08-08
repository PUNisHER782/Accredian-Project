import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import StatCard from "@/components/ui/StatCard";
import { STATS } from "@/constants/stats";

export default function Statistics() {
  return (
    <section id="outcomes" aria-labelledby="outcomes-heading" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <h2
            id="outcomes-heading"
            className="font-mono text-xs tracking-[0.25em] text-brass-bright uppercase mb-4 text-center font-normal"
          >
            The Numbers on Record
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-10">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="border-r last:border-r-0 border-ink-line"
            >
              <StatCard value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
