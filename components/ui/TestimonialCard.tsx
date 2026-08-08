type TestimonialCardProps = {
  org: string;
  quote: string;
  person: string;
  rotation?: string;
};

export default function TestimonialCard({ org, quote, person, rotation = "" }: TestimonialCardProps) {
  return (
    <div
      className={`${rotation} hover:rotate-0 transition-transform duration-300 bg-bone p-8 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.4)] h-full flex flex-col`}
    >
      <p className="font-mono text-[10px] tracking-widest text-charcoal/70 uppercase mb-6">
        Letter of Record — {org}
      </p>
      <p className="font-display text-lg leading-relaxed italic flex-1 text-charcoal">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 pt-6 border-t border-charcoal/10 flex items-center gap-3">
        <span className="brass-seal h-8 w-8 rounded-full inline-block shrink-0" aria-hidden="true" />
        <p className="text-sm text-charcoal/75">{person}</p>
      </div>
    </div>
  );
}
