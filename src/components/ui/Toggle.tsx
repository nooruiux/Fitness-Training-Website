"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type ToggleProps = {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

/** Figma Toggle (3:2794): 44×24 track, 24px cyan knob. Accessible switch. */
export function Toggle({ label, defaultChecked = true, onChange, className }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const labelId = useId();

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span id={labelId} className="font-label text-button-md font-semibold text-white">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={toggle}
        className="tap-target relative h-6 w-11 shrink-0 cursor-pointer rounded-full bg-toggle-track transition-colors hover:bg-grey-600"
      >
        {/* The track clips the knob here, so the button itself can carry an unclipped 44px hit area. */}
        <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
          <span
            className={cn(
              "absolute top-0 left-0 size-6 rounded-full border-2 border-primary bg-primary transition-transform duration-200",
              checked ? "translate-x-5" : "translate-x-0",
            )}
          />
        </span>
      </button>
    </div>
  );
}
