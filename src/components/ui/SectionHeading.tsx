import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  text?: string;
  /** Figma uses H2 (48/56) for "Why Choose Us" and H3 (40/48) elsewhere. */
  size?: "h2" | "h3";
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  textClassName?: string;
};

export function SectionHeading({
  id,
  title,
  text,
  size = "h3",
  align = "center",
  className,
  titleClassName,
  textClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <h2
        id={id}
        className={cn(
          "font-display font-medium text-white",
          size === "h2" ? "text-h3 md:text-h2" : "text-h4 md:text-h3",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {text ? <p className={cn("text-body-lg text-white", textClassName)}>{text}</p> : null}
    </div>
  );
}
