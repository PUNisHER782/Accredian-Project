import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/sections/Hero";
import LedgerTicker from "@/components/ui/LedgerTicker";
import TrustedBy from "@/sections/TrustedBy";
import Features from "@/sections/Features";
import Programmes from "@/sections/Programmes";
import Process from "@/sections/Process";
import Statistics from "@/sections/Statistics";
import Testimonials from "@/sections/Testimonials";
import CTA from "@/sections/CTA";
import FAQ from "@/sections/FAQ";

export default function Home() {
  return (
    <main id="main-content" className="bg-ink">
      <Navbar />
      <Hero />
      <LedgerTicker />
      <TrustedBy />
      <Features />
      <Programmes />
      <Process />
      <Statistics />
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
