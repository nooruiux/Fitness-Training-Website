import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonSize = "lg" | "md" | "sm";

/** Figma button specs: padding, gap and the matching Figma arrow export. */
const sizes: Record<ButtonSize, { className: string; icon: { src: string; size: number } }> = {
  // "Be a Member" — 16px label, 32/18 padding, 20px arrow
  lg: { className: "gap-2.5 px-8 py-4.5 text-button-lg", icon: { src: "/icons/arrow-up-right-20.svg", size: 20 } },
  // "Start your Training" — 16px label, 24/14 padding, 16px arrow
  md: { className: "gap-2 px-6 py-3.5 text-button-lg", icon: { src: "/icons/arrow-up-right-16.svg", size: 16 } },
  // "Join Now" — 14px label, 40px tall, 16px arrow
  sm: { className: "h-10 gap-2 px-6 py-2.5 text-button-md", icon: { src: "/icons/arrow-up-right-16-join.svg", size: 16 } },
};

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  size?: ButtonSize;
  /** Override the arrow export (the CTA uses its own Figma copy). */
  iconSrc?: string;
};

export function Button({ size = "lg", iconSrc, className, children, ...props }: ButtonProps) {
  const spec = sizes[size];
  return (
    <a
      className={cn(
        "group inline-flex shrink-0 items-center justify-center rounded-full border-[1.4px] border-primary bg-primary font-label font-semibold whitespace-nowrap text-grey-700",
        "transition-[filter,transform] duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0",
        "focus-visible:outline-white",
        spec.className,
        className,
      )}
      {...props}
    >
      {children}
      <Image
        src={iconSrc ?? spec.icon.src}
        alt=""
        width={spec.icon.size}
        height={spec.icon.size}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
