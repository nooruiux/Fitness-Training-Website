import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialSection, testimonials, type Testimonial as TestimonialItem } from "@/data/testimonials";

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure className="flex h-full flex-col sm:flex-row">
      {/* Photo 224/520 of the slide (Figma) from sm; stacked above the quote below sm. */}
      <div className="relative h-80 w-full shrink-0 overflow-hidden sm:h-auto sm:min-h-80 sm:w-[43.08%] xl:h-80 xl:w-56">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          // calc() (not a bare 100vw) keeps Next's small srcset candidates, so 1280+ still loads the 256w file.
          sizes="(min-width: 640px) 256px, calc(100vw - 32px)"
          className="object-cover object-top"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center bg-primary font-label text-body-xl font-semibold text-black">
          {item.name}
        </figcaption>
      </div>
      <div className="bg-surface-quote px-4 pt-10.5 pb-8 sm:min-h-80 sm:min-w-0 sm:flex-1 xl:h-80 xl:w-74 xl:flex-none xl:pb-0">
        <Image src="/icons/quote.svg" alt="" width={64} height={64} />
        <blockquote className="mt-1 ml-2 text-body-lg text-white xl:w-63">
          <p>{item.quote}</p>
        </blockquote>
      </div>
    </figure>
  );
}

export function Testimonial() {
  const { heading, rating } = testimonialSection;
  return (
    <section aria-labelledby="testimonial-heading" className="bg-surface py-14">
      <Container className="flex flex-col gap-14 xl:max-w-testimonial">
        <Reveal className="flex flex-col gap-4">
          <SectionHeading id="testimonial-heading" title={heading} align="left" />
          <div className="flex flex-wrap items-center gap-3">
            <Image
              src="/icons/rating-stars.svg"
              alt={`Rated ${rating.value} out of 5`}
              width={152.001}
              height={23.805}
            />
            <p className="font-label text-body-xl font-semibold text-white">{rating.label}</p>
          </div>
        </Reveal>
        <Reveal>
          <Carousel
            label="Client testimonials"
            // 1 slide < 768 · 1.15 slides (peek) 768–1023 · 2 slides ≥ 1024 (520px each at xl, Figma)
            slideClassName="basis-full md:basis-[86.96%] lg:basis-[calc(50%-1.25rem)] xl:basis-130"
            slides={testimonials.map((item) => ({
              id: item.id,
              label: item.name,
              content: <TestimonialCard item={item} />,
            }))}
          />
        </Reveal>
      </Container>
    </section>
  );
}
