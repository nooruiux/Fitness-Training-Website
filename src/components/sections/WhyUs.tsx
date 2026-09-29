import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featureColumns, whyUs, type Feature } from "@/data/features";
import { cn } from "@/lib/utils";

function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <li className="flex items-start gap-4">
      <div className="relative size-16 shrink-0">
        <Image
          src={feature.icon.src}
          alt=""
          width={feature.icon.width}
          height={feature.icon.height}
          className={cn("absolute", feature.icon.className)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-h4 font-medium text-white xl:whitespace-nowrap">{feature.title}</h3>
        <p className={cn("text-body-md text-white/96", feature.textClassName)}>{feature.text}</p>
      </div>
    </li>
  );
}

export function WhyUs() {
  return (
    <section
      id="trainers"
      aria-labelledby="why-heading"
      className="relative scroll-mt-28 overflow-hidden bg-surface py-14"
    >
      <Image
        src="/decor/why-lines.svg"
        alt=""
        width={196}
        height={431}
        className="pointer-events-none absolute -top-21.75 right-0 h-107.75 w-49"
      />
      <Container className="relative flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            id="why-heading"
            size="h2"
            title={whyUs.heading}
            text={whyUs.text}
            textClassName="max-w-132.25 text-white/88"
          />
        </Reveal>

        {/* Features: 1 column < 640, 2 columns above. The photo sits under the grid < 1024 and beside it from 1024. */}
        <Reveal className="flex w-full flex-col lg:min-h-98 lg:flex-row xl:h-98">
          <Card
            variant="raised"
            className="rounded-t-4xl px-6 py-10 md:px-10 lg:flex-1 lg:rounded-tr-none lg:rounded-l-4xl lg:pt-12 lg:pb-12 xl:h-98.5 xl:w-220.25 xl:flex-none xl:shrink-0 xl:pb-0"
          >
            <div className="flex flex-col gap-10 sm:flex-row sm:gap-8 lg:gap-10 xl:items-end xl:gap-16">
              {featureColumns.map((column, i) => (
                <ul
                  key={i}
                  className={cn("flex flex-col gap-10 sm:min-w-0 sm:flex-1 xl:flex-none", i === 0 ? "xl:gap-16" : "xl:gap-16.5")}
                >
                  {column.map((feature) => (
                    <FeatureItem key={feature.title} feature={feature} />
                  ))}
                </ul>
              ))}
            </div>
          </Card>
          <div className="relative h-100 overflow-hidden rounded-b-4xl lg:h-auto lg:w-[26.58%] lg:shrink-0 lg:rounded-bl-none lg:rounded-r-4xl xl:h-98 xl:w-79.75">
            <Image
              src={whyUs.image.src}
              alt={whyUs.image.alt}
              fill
              sizes="(min-width: 1280px) 319px, (min-width: 1024px) 27vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
