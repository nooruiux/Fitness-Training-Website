import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  /**
   * glass  — floating "Book a class" card (white 3% fill, 4% border, 12px backdrop blur)
   * raised — dark #202020 panel with the Figma 4% noise texture (Why Choose Us)
   */
  variant?: "glass" | "raised";
};

export function Card({ variant = "glass", className, children, ...props }: CardProps) {
  if (variant === "raised") {
    return (
      <div className={cn("relative isolate overflow-hidden bg-surface-raised", className)} {...props}>
        <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-4" />
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-glass border border-white/4 bg-white/3 backdrop-blur-glass",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
