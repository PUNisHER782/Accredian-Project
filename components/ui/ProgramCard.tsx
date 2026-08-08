type ProgramCardProps = {
  code: string;
  name: string;
  desc: string;
};

export default function ProgramCard({ code, name, desc }: ProgramCardProps) {
  return (
    <div className="group grid md:grid-cols-[120px_1fr_2fr] gap-4 md:gap-8 items-start md:items-center py-6 border-b border-ink-line hover:bg-ink-raised/40 transition-colors px-2 -mx-2 rounded-sm">
      <span className="font-mono text-sm text-brass-bright/80">{code}</span>
      <h3 className="font-display text-xl md:text-2xl text-bone">{name}</h3>
      <p className="text-bone/65 leading-relaxed">{desc}</p>
    </div>
  );
}
