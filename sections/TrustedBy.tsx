import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import LogoCarousel from "@/components/ui/LogoCarousel";
import { CLIENTS } from "@/constants/clients";

export default function TrustedBy() {
  return (
    <section aria-label="Trusted by" className="py-16 md:py-20">
      <Container>
        <h2 className="sr-only">Trusted by enterprise learning teams</h2>
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-bone/60 uppercase text-center mb-10">
            Client Roster — Selected Entries
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <LogoCarousel items={CLIENTS} />
        </Reveal>
      </Container>
    </section>
  );
}
