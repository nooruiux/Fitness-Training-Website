import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/hero";

/**
 * Avatar offsets from Figma (3:2665): 0, 34, 72, 108, then the count disc at 144.
 * Every badge size is "Figma px × --bu": --bu is 1px from lg (exact Figma badge) and scales with
 * the image below lg, so the badge always nests inside the mobile notch. Text never drops below 14px.
 */
const avatarOffsets = ["left-0", "left-[calc(34*var(--bu,1px))]", "left-[calc(72*var(--bu,1px))]", "left-[calc(108*var(--bu,1px))]"];
const badgeText = "text-[max(14px,calc(20*var(--bu,1px)))] leading-[max(1.25em,calc(28*var(--bu,1px)))] tracking-figma";

function TrainersBadge() {
  const { avatars, count, label } = hero.trainers;
  return (
    <div className="flex items-center gap-x-[calc(12*var(--bu,1px))]">
      <div className="relative h-[calc(56*var(--bu,1px))] w-[calc(200*var(--bu,1px))] shrink-0">
        {avatars.map((avatar, i) => (
          <Image
            key={avatar.src}
            src={avatar.src}
            alt={avatar.alt}
            width={56}
            height={56}
            className={`absolute top-0 size-[calc(56*var(--bu,1px))] rounded-full ${avatarOffsets[i]}`}
          />
        ))}
        <div className="absolute top-0 left-[calc(144*var(--bu,1px))] grid size-[calc(56*var(--bu,1px))] place-items-center">
          <Image src="/decor/avatar-count.svg" alt="" width={56} height={56} className="absolute inset-0 size-full" />
          <span className={`relative font-heading font-semibold text-grey-700 ${badgeText}`}>{count}</span>
        </div>
      </div>
      {/* Phones: two lines ("Experience / Trainers") so the badge fits the narrower cutout. */}
      <p className={`w-min font-heading font-semibold text-white sm:w-auto sm:whitespace-nowrap ${badgeText}`}>{label}</p>
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
        {/*
          < 1024: the same notched shape, redrawn for phones (343:360) and tablets (704:520). The
          container keeps that ratio, so the mask scales uniformly and the curves never stretch.
        */}
        <div className="relative mt-8 aspect-[343/360] max-lg:@container sm:aspect-[704/520] lg:mt-[calc(15.75*var(--spacing)-7.5%)] lg:aspect-[1200/614] xl:-mt-6.75 xl:h-153.5 xl:aspect-auto">
          <div className="absolute inset-0 overflow-hidden mask-hero-notch-mobile sm:mask-hero-notch-tablet lg:mask-hero-notch">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 1200px"
              // Phones/tablets crop the sides: keep both people (right of centre) in frame.
              className="object-cover object-[66%_30%] sm:object-[60%_35%] lg:object-[50%_8%]"
            />
          </div>
          {/*
            The badge nests in the bottom-right cutout. < 1024 it fills the cutout's inner box (design
            units --hu: 1/343 or 1/704 of the image width); ≥ 1024 at 683/1200 from the left and
            10/614 from the bottom (Figma).
          */}
          <div className="absolute right-[calc(12*var(--hu))] bottom-[calc(12*var(--hu))] flex h-[calc(44*var(--hu))] w-[calc(256*var(--hu))] items-center [--bu:calc(0.714*100cqw/343)] [--hu:calc(100cqw/343)] sm:right-[calc(24*var(--hu))] sm:bottom-[calc(16*var(--hu))] sm:h-[calc(56*var(--hu))] sm:w-[calc(409*var(--hu))] sm:[--bu:calc(100cqw/704)] sm:[--hu:calc(100cqw/704)] lg:right-auto lg:bottom-[1.63%] lg:left-[56.92%] lg:block lg:h-auto lg:w-auto lg:[--bu:1px] xl:top-137 xl:bottom-auto xl:left-170.75">
            <TrainersBadge />
          </div>
        </div>
      </Container>
    </section>
  );
}
