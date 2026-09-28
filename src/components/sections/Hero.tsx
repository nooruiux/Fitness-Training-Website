import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/data/hero";

/** Avatar offsets from Figma (3:2665): 0, 34, 72, 108, then the count disc at 144. */
const avatarOffsets = ["left-0", "left-8.5", "left-18", "left-27"];

function TrainersBadge() {
  const { avatars, count, label } = hero.trainers;
  return (
    <div className="flex items-center gap-3">
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
    <section id="home" aria-labelledby="hero-heading" className="scroll-mt-28 pt-8 pb-20 xl:pt-16 xl:pb-29">
      <Container>
        <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:gap-21.75">
          <h1 id="hero-heading" className="font-display text-h3 font-medium text-white md:text-display xl:w-142.75">
            {hero.heading}
          </h1>
          <div className="flex flex-col items-start gap-6 xl:w-115.25 xl:pt-1.5">
            <p className="text-body-xl text-white">{hero.text}</p>
            <Button href={hero.cta.href}>{hero.cta.label}</Button>
          </div>
        </div>

        <div className="relative mt-8 xl:-mt-6.75 xl:h-153.5">
          <div className="relative aspect-4/3 overflow-hidden rounded-4xl md:aspect-video xl:absolute xl:inset-0 xl:aspect-auto xl:mask-hero-notch xl:rounded-none">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 1200px, calc(100vw - 32px)"
              className="object-cover object-[50%_8%]"
            />
          </div>
          <div className="mt-6 xl:absolute xl:top-137 xl:left-170.75 xl:mt-0">
            <TrainersBadge />
          </div>
        </div>
      </Container>
    </section>
  );
}
