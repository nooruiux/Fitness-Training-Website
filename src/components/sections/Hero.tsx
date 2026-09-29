import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/hero";

/** Avatar offsets from Figma (3:2665): 0, 34, 72, 108, then the count disc at 144. */
const avatarOffsets = ["left-0", "left-8.5", "left-18", "left-27"];

function TrainersBadge() {
  const { avatars, count, label } = hero.trainers;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <div className="relative h-14 w-50 shrink-0">
        {avatars.map((avatar, i) => (
          <Image
            key={avatar.src}
            src={avatar.src}
            alt={avatar.alt}
            width={56}
            height={56}
            className={`absolute top-0 size-14 rounded-full ${avatarOffsets[i]}`}
          />
        ))}
        <div className="absolute top-0 left-36 grid size-14 place-items-center">
          <Image src="/decor/avatar-count.svg" alt="" width={56} height={56} className="absolute inset-0" />
          <span className="relative font-heading text-h6 font-semibold text-grey-700">{count}</span>
        </div>
      </div>
      <p className="font-heading text-h6 font-semibold text-white sm:whitespace-nowrap">{label}</p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="scroll-mt-28 pt-8 pb-section-hero xl:pt-16">
      <Container>
        {/* ≥1024: Figma arrangement — headline 571/1200 wide, copy column starting at 658/1200 (461px wide at 1280+). */}
        <div className="relative z-10 flex flex-col gap-6 short:flex-row short:gap-8 lg:flex-row lg:gap-[7.25%] xl:gap-21.75">
          <h1
            id="hero-heading"
            className="font-display text-display font-medium text-white short:w-1/2 short:shrink-0 lg:w-[47.58%] lg:shrink-0 xl:w-142.75"
          >
            {hero.heading}
          </h1>
          <div className="flex flex-col items-start gap-6 short:min-w-0 short:flex-1 lg:min-w-0 lg:flex-1 lg:pt-1.5 xl:w-115.25 xl:flex-none">
            <p className="text-body-xl text-white">{hero.text}</p>
            <Button href={hero.cta.href} className="w-full sm:w-auto">
              {hero.cta.label}
            </Button>
          </div>
        </div>

        {/*
          ≥1024: only the image/notch area scales — it keeps Figma's 1200:614 ratio, so the notch
          mask scales uniformly. The image tucks under the headline by (63px − notch height), where
          the notch is 90/1200 = 7.5% of the width: −27px at 1200 (Figma) and less on smaller screens.
        */}
        <div className="relative mt-8 lg:mt-[calc(15.75*var(--spacing)-7.5%)] lg:aspect-[1200/614] xl:-mt-6.75 xl:h-153.5 xl:aspect-auto">
          <div className="relative aspect-4/3 overflow-hidden rounded-4xl md:aspect-video lg:absolute lg:inset-0 lg:aspect-auto lg:mask-hero-notch lg:rounded-none">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 1200px"
              // Phones/tablets crop the sides: keep both people (right of centre) in frame.
              className="object-cover object-[64%_40%] lg:object-[50%_8%]"
            />
          </div>
          {/* ≥1024 the badge sits in the bottom-right notch (683/1200 from the left, 10/614 from the bottom). */}
          <div className="mt-6 lg:absolute lg:bottom-[1.63%] lg:left-[56.92%] lg:mt-0 xl:top-137 xl:bottom-auto xl:left-170.75">
            <TrainersBadge />
          </div>
        </div>
      </Container>
    </section>
  );
}
