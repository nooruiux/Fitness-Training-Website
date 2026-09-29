import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/data/cta";

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="py-section">
      <Container>
        {/*
          < 1024: stacked (text → image), gradient covers the whole rounded card.
          ≥ 1024: Figma side-by-side layout. The card and image area keep the 1200:372 ratio so the
          notch mask scales uniformly; the text keeps its own fluid type sizes.
        */}
        <Reveal className="relative flex flex-col items-center gap-8 overflow-hidden rounded-4xl px-6 pt-10 md:px-12 lg:block lg:aspect-[1200/372] lg:overflow-visible lg:rounded-none lg:p-0 xl:h-93 xl:aspect-auto">
          <div aria-hidden className="bg-cta-gradient absolute inset-0 mask-cta-notch-mobile lg:mask-cta-notch" />

          <div className="relative flex flex-col items-start gap-10 self-stretch lg:absolute lg:top-1/2 lg:left-[8%] lg:w-1/2 lg:-translate-y-1/2 xl:top-20.5 xl:left-24 xl:w-auto xl:translate-y-0">
            <div className="flex flex-col gap-5 text-grey-700">
              <h2 id="cta-heading" className="font-display text-h3 font-medium xl:whitespace-nowrap">
                {cta.heading}
              </h2>
              <p className="text-body-xl xl:w-115.25">{cta.text}</p>
            </div>
            <Button href={cta.button.href} iconSrc="/icons/arrow-up-right-20-cta.svg">
              {cta.button.label}
            </Button>
          </div>

          {/* Figma stacks two crops of the same cut-out (3:3112 under 3:3113). */}
          {/* < 1024 at most 288px wide = 280px tall; ≥ 1024 at 735/1200 from the left, 12/372 from the top. */}
          <div className="relative aspect-370/360 w-full max-w-72 lg:absolute lg:top-[3.23%] lg:left-[61.25%] lg:h-[96.77%] lg:w-[30.83%] lg:max-w-none xl:top-3 xl:left-183.75 xl:h-90 xl:w-92.5">
            <div className="absolute top-[0.278%] left-0 h-[99.72%] w-full overflow-hidden">
              <Image
                src={cta.image.src}
                alt=""
                width={cta.image.width}
                height={cta.image.height}
                sizes="(min-width: 1280px) 505px, (min-width: 1024px) 42vw, 392px"
                className="absolute top-0 left-[-30.7%] h-[102.11%] w-[136.28%] max-w-none"
              />
            </div>
            <div className="absolute top-0 left-[1.351%] h-full w-[96.49%] overflow-hidden">
              <Image
                src={cta.image.src}
                alt={cta.image.alt}
                width={cta.image.width}
                height={cta.image.height}
                sizes="(min-width: 1280px) 504px, (min-width: 1024px) 42vw, 392px"
                className="absolute top-0 left-[-33.56%] h-[104.41%] w-[141.11%] max-w-none"
              />
            </div>
          </div>

          {/* Star in the bottom-right notch: centred in the 96 × 64 notch below lg; 1104/1200, 314/372 from lg. */}
          <div aria-hidden className="absolute right-7 bottom-3 size-10 lg:top-[84.41%] lg:right-auto lg:bottom-auto lg:left-[92%] lg:aspect-square lg:size-auto lg:w-[4.1667%] xl:top-78.5 xl:left-276 xl:size-12.5">
            <Image src="/decor/cta-star.svg" alt="" width={43.3013} height={50} className="mx-auto h-full w-auto" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
