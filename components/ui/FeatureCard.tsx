import { SearchCheck, FlaskConical, LayoutDashboard, Handshake, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  SearchCheck,
  FlaskConical,
  LayoutDashboard,
  Handshake,
};

type FeatureCardProps = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  rotation?: string;
};

export default function FeatureCard({ id, icon, title, desc, rotation = "" }: FeatureCardProps) {
  const Icon = ICONS[icon] ?? SearchCheck;
  return (
    <div
      className={`${rotation} hover:rotate-0 transition-transform duration-300 bg-bone border border-charcoal/10 rounded-[2px] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] h-full group`}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-4xl text-charcoal/55" aria-hidden="true">{id}</span>
        <span className="h-9 w-9 rounded-full bg-emerald/10 flex items-center justify-center text-emerald group-hover:bg-emerald group-hover:text-bone transition-colors">
          <Icon size={16} strokeWidth={2} />
        </span>
      </div>
      <h3 className="font-display text-2xl mb-3 text-charcoal">{title}</h3>
      <p className="text-charcoal/75 leading-relaxed">{desc}</p>
    </div>
  );
}
