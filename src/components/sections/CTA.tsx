import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/data/cta";

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 xl:py-30">
      <Container>
        <Reveal className="relative flex flex-col items-center gap-8 overflow-hidden rounded-4xl px-6 pt-10 md:px-12 xl:block xl:h-93 xl:overflow-visible xl:rounded-none xl:p-0">
          <div aria-hidden className="bg-cta-gradient absolute inset-0 xl:mask-cta-notch" />

          <div className="relative flex flex-col items-start gap-10 self-stretch xl:absolute xl:top-20.5 xl:left-24">
            <div className="flex flex-col gap-5 text-grey-700">
              <h2 id="cta-heading" className="font-display text-h4 font-medium md:text-h3 xl:whitespace-nowrap">
                {cta.heading}
              </h2>
              <p className="text-body-xl xl:w-115.25">{cta.text}</p>
            </div>
            <Button href={cta.button.href} iconSrc="/icons/arrow-up-right-20-cta.svg">
              {cta.button.label}
            </Button>
          </div>

          {/* Figma stacks two crops of the same cut-out (3:3112 under 3:3113). */}
          <div className="relative aspect-370/360 w-full max-w-92.5 xl:absolute xl:top-3 xl:left-183.75 xl:w-92.5">
            <div className="absolute top-[0.278%] left-0 h-[99.72%] w-full overflow-hidden">
              <Image
                src={cta.image.src}
                alt=""
                width={cta.image.width}
                height={cta.image.height}
                sizes="(min-width: 1280px) 505px, 136vw"
                className="absolute top-0 left-[-30.7%] h-[102.11%] w-[136.28%] max-w-none"
              />
            </div>
            <div className="absolute top-0 left-[1.351%] h-full w-[96.49%] overflow-hidden">
              <Image
                src={cta.image.src}
                alt={cta.image.alt}
                width={cta.image.width}
                height={cta.image.height}
                sizes="(min-width: 1280px) 504px, 136vw"
                className="absolute top-0 left-[-33.56%] h-[104.41%] w-[141.11%] max-w-none"
              />
            </div>
          </div>

          <div aria-hidden className="absolute top-78.5 left-276 hidden size-12.5 xl:block">
            <Image src="/decor/cta-star.svg" alt="" width={43.3013} height={50} className="mx-auto" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
