"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Toggle } from "@/components/ui/Toggle";
import { shapeBody } from "@/data/shape-body";
import { cn } from "@/lib/utils";

function TrainerCard() {
  const { trainer, stats, toggleLabel } = shapeBody;
  return (
    <div
      className={cn(
        // Below md the notched composition can't fit, so it reflows into a plain rounded card.
        "relative flex flex-col items-center overflow-hidden rounded-4xl border border-white/8 bg-linear-to-b from-transparent to-card-fade pb-6",
        "md:absolute md:top-0 md:left-31 md:block md:h-165.75 md:w-120 md:overflow-visible md:rounded-none md:border-0 md:bg-none md:pb-0",
      )}
    >
      <Image
        src="/decor/trainer-card.svg"
        alt=""
        width={480}
        height={620}
        className="absolute top-10.75 left-0 hidden md:block"
      />
      <div className="relative aspect-448/425 w-full overflow-hidden md:absolute md:top-0 md:left-4 md:h-106.25 md:w-112">
        <Image
          src={trainer.image.src}
          alt={trainer.image.alt}
          width={trainer.image.width}
          height={trainer.image.height}
          sizes="(min-width: 768px) 587px, 131vw"
          className="absolute top-0 left-[-1.79%] h-full w-[131.03%] max-w-none"
        />
      </div>

      <div className="relative -mt-12 flex items-center gap-6 rounded-full border border-white/12 bg-surface-raised px-6 py-2.5 md:absolute md:top-94.25 md:left-45 md:mt-0">
        <div className="flex flex-col whitespace-nowrap">
          <p className="font-display text-h6 font-medium text-white">{trainer.name}</p>
          <p className="text-body-sm text-white/72">{trainer.role}</p>
        </div>
        <Image src="/icons/target.svg" alt="" width={40} height={40} />
      </div>

      <ul className="relative mt-11.5 flex items-center justify-center gap-10 md:absolute md:top-123.75 md:left-45 md:mt-0">
        {stats.map((stat, i) => (
          <li key={stat.label} className="flex items-center gap-10">
            {i > 0 ? (
              <span aria-hidden className="relative h-13.75 w-0">
                <Image
                  src="/decor/stat-divider.svg"
                  alt=""
                  width={55}
                  height={1}
                  className="absolute top-1/2 left-1/2 max-w-none -translate-1/2 rotate-90"
                />
              </span>
            ) : null}
            <p className="flex flex-col items-center gap-1 whitespace-nowrap">
              <span className="font-heading text-h5 font-semibold text-white">{stat.value}</span>
              <span className="text-body-lg text-white/80">{stat.label}</span>
            </p>
          </li>
        ))}
      </ul>

      <Toggle label={toggleLabel} className="relative mt-8 md:absolute md:top-155.75 md:left-51.25 md:mt-0" />
    </div>
  );
}

function BookingCard() {
  const { booking } = shapeBody;
  const [selected, setSelected] = useState(booking.defaultOption);

  return (
    <Card className="relative mt-6 flex flex-col gap-4 p-4 md:absolute md:top-88.25 md:left-0 md:mt-0 md:w-60.25">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-card-title font-medium text-neutral-8">{booking.title}</h3>
        <p className="text-body-sm text-white/72 md:w-46.5">{booking.text}</p>
      </div>
      <fieldset className="flex flex-col gap-4">
        <legend className="sr-only">Choose a class level</legend>
        {booking.options.map((option) => {
          const isSelected = option.id === selected;
          return (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-option border-[0.632px] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary",
                // Figma: only the selected row is padded and outlined (3:2816).
                isSelected ? "border-white/12 px-2.5 py-1.75" : "border-transparent px-2.25 hover:border-white/6",
              )}
            >
              <input
                type="radio"
                name="class-level"
                value={option.id}
                checked={isSelected}
                onChange={() => setSelected(option.id)}
                className="sr-only"
              />
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-full p-1", option.tone)}>
                <Image src={option.icon} alt="" width={12.1365} height={12.1365} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-label-md font-medium whitespace-nowrap text-neutral-8">{option.title}</span>
                <span className="text-body-sm text-white/72 md:w-38.75">{option.text}</span>
              </span>
            </label>
          );
        })}
      </fieldset>
    </Card>
  );
}

export function ShapeBody() {
  const { heading, text, cta } = shapeBody;
  return (
    <section id="class" aria-labelledby="shape-heading" className="scroll-mt-28 pt-20 pb-20 xl:pb-30">
      <Container className="relative xl:h-177.5">
        <Reveal className="relative flex flex-col items-start gap-8 xl:absolute xl:top-37.25 xl:left-0 xl:w-167.75">
          <div className="flex flex-col gap-4">
            <h2 id="shape-heading" className="font-display text-h4 font-medium text-white md:text-h3 xl:w-87.5">
              {heading.before}
              <span className="text-primary">{heading.highlight}</span>
              {heading.after}
            </h2>
            <p className="text-body-md text-white/88 xl:w-118">{text}</p>
          </div>
          <Image
            src="/decor/connector.svg"
            alt=""
            width={229}
            height={123}
            className="absolute top-5.5 left-110.5 hidden xl:block"
          />
          <Button size="md" href={cta.href}>
            {cta.label}
          </Button>
        </Reveal>

        <Reveal className="relative mx-auto mt-16 max-w-120 md:h-177.5 md:w-151 md:max-w-none xl:absolute xl:top-0 xl:left-154.5 xl:mt-0">
          <TrainerCard />
          <BookingCard />
        </Reveal>
      </Container>
    </section>
  );
}
