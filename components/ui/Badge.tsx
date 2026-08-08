import { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

type BadgeProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className, ...rest }: BadgeProps) {
  return (
    <p
      className={clsx(
        "font-mono text-xs tracking-[0.25em] text-brass-bright uppercase",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
