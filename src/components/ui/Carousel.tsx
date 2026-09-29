"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  label: string;
  slides: { id: string; content: ReactNode; label: string }[];
  className?: string;
  slideClassName?: string;
};

/** Figma arrow chevron exports: full cyan when enabled, 24% cyan when disabled. */
const chevron = { enabled: "/icons/chevron-next.svg", disabled: "/icons/chevron-prev.svg" };

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={cn(
        // Hidden below md: phones swipe and use the dots.
        "group hidden size-10 shrink-0 cursor-pointer place-items-center rounded-arrow disabled:cursor-not-allowed md:grid",
        direction === "next" && "rotate-180",
      )}
    >
      <span
        className={cn(
          "grid size-[83.33%] place-items-center rounded-arrow border-[0.833px] transition-colors",
          disabled ? "border-primary/24" : "border-primary group-hover:bg-primary/10",
        )}
      >
        <Image src={disabled ? chevron.disabled : chevron.enabled} alt="" width={20} height={20} />
      </span>
    </button>
  );
}

export function Carousel({ label, slides, className, slideClassName }: CarouselProps) {
  const [viewportRef, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!api) return;
    setSnaps(api.scrollSnapList());
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    // Embla is an external system; mirror its state into React on every change.
    // Deferred (not rAF) so it also runs in background tabs.
    const timer = setTimeout(sync, 0);
    api.on("select", sync).on("reInit", sync);
    return () => {
      clearTimeout(timer);
      api.off("select", sync).off("reInit", sync);
    };
  }, [api, sync]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  return (
    <section aria-roledescription="carousel" aria-label={label} className={cn("flex flex-col items-center gap-14", className)}>
      <div className="flex w-full items-center md:gap-5.75">
        <ArrowButton direction="prev" disabled={!canPrev} onClick={() => api?.scrollPrev()} />
        <div
          ref={viewportRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          aria-label={`${label} — use the left and right arrow keys to browse`}
          className="min-w-0 flex-1 overflow-hidden rounded-sm"
        >
          <ul className="flex touch-pan-y gap-10">
            {slides.map((slide, i) => (
              <li
                key={slide.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${slide.label}`}
                className={cn("min-w-0 shrink-0", slideClassName)}
              >
                {slide.content}
              </li>
            ))}
          </ul>
        </div>
        <ArrowButton direction="next" disabled={!canNext} onClick={() => api?.scrollNext()} />
      </div>

      {/* Dots are 44px apart below xl so their 44px tap areas never overlap; Figma's 8px gap at xl. */}
      <div className="flex gap-8 xl:gap-2" role="group" aria-label="Choose slide">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selected ? "true" : undefined}
            className={cn(
              "size-3 cursor-pointer rounded-full transition-colors",
              i === selected ? "bg-secondary" : "bg-grey-600 hover:bg-grey-200",
            )}
          />
        ))}
      </div>
    </section>
  );
}
