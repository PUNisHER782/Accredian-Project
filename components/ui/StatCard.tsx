"use client";

import { useCountUp } from "@/hooks/useCountUp";

type StatCardProps = {
  value: number;
  suffix?: string;
  label: string;
};

export default function StatCard({ value, suffix = "", label }: StatCardProps) {
  const ref = useCountUp(value, suffix);
  return (
    <div className="text-center px-2">
      <span
        ref={ref}
        className="font-display text-4xl md:text-6xl text-bone block tabular-nums"
        aria-label={`${value.toLocaleString("en-IN")}${suffix} ${label}`}
      >
        0{suffix}
      </span>
      <p className="mt-3 text-xs md:text-sm text-bone/65 uppercase tracking-wide font-mono">
        {label}
      </p>
    </div>
  );
}
