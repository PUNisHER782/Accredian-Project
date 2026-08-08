"use client";

import { ReactNode, useRef } from "react";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  magnetic?: boolean;
};

/**
 * Shared CTA button. `magnetic` enables a subtle cursor-follow lift,
 * inspired by the "Magnetic Button" pattern — kept restrained (max 8px
 * pull) to stay corporate rather than playful.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
  disabled = false,
  magnetic = true,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-sm font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    solid: "bg-brass text-ink hover:bg-brass-bright",
    outline: "border border-bone/25 text-bone hover:border-bone/60",
    ghost: "text-brass-bright hover:text-brass border border-brass/50 hover:bg-brass/10",
  };

  function onMouseMove(e: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * 0.25,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  function onMouseLeave() {
    if (!magnetic || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }

  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={classes}
    >
      {children}
    </button>
  );
}
