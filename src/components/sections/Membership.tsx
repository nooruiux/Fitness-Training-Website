import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { membership, plans, type Plan, type PlanFeature } from "@/data/plans";

/** Figma uses a drop-shadowed check on the first row and plain checks below it. */
function checkIcon(feature: PlanFeature, index: number) {
  if (!feature.included) return "/icons/check-off.svg";
  return index === 0 ? "/icons/check-1.svg" : "/icons/check-2.svg";
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      aria-labelledby={`plan-${plan.name}`}
      className="relative isolate flex h-full w-full max-w-85 flex-col items-center pt-5 xl:block xl:h-118 xl:w-70.5 xl:max-w-none xl:pt-0"
    >
      {/* < 1280: fluid-width card body (exact Figma radius + fixed-size notch); the mask only
          shapes this background layer, so the button inside the notch stays visible. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl border border-white/4 bg-plan-card mask-plan-card xl:hidden"
      />
      {/* ≥ 1280: the original Figma SVG card at its exact 282×472 size. */}
      <Image
        src="/decor/plan-card.svg"
        alt=""
        width={282.483}
        height={472}
        className="absolute inset-0 hidden h-full w-full xl:block"
      />
      <div className="flex w-full flex-col items-center gap-5 xl:absolute xl:inset-x-0 xl:top-5">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2 whitespace-nowrap">
            <h3 id={`plan-${plan.name}`} className="font-display text-h4 font-medium text-white">
              {plan.name}
            </h3>
            <p className="font-display text-white">
              <span className="text-h5 font-medium text-primary">${plan.price}</span>
              <span className="font-sans text-body-lg">/{plan.period}</span>
            </p>
          </div>
          <Image src="/decor/plan-divider.svg" alt="" width={282} height={1} className="w-full" />
        </div>
        <ul className="flex flex-col items-start gap-4">
          {plan.features.map((feature, i) => (
            <li key={feature.label} className="flex items-center gap-3">
              <Image src={checkIcon(feature, i)} alt="" width={24} height={24} />
              {feature.included ? (
                <span className="text-body-lg whitespace-nowrap text-white">{feature.label}</span>
              ) : (
                <>
                  {/* Greyed text is visual only; assistive tech gets the explicit status. */}
                  <span aria-hidden className="text-body-lg whitespace-nowrap text-white/28">
                    {feature.label}
                  </span>
                  <span className="sr-only">Not included: {feature.label}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* The 72px notch row: 32px below the list, button centred in the notch (Figma 400→472). */}
      <div className="mt-auto flex h-18 w-full shrink-0 items-center justify-center pt-8 box-content xl:contents">
        <Button
          size="sm"
          href={plan.cta.href}
          className="xl:absolute xl:top-104 xl:left-18.75"
          aria-label={`${plan.cta.label} — ${plan.name} plan`}
        >
          {plan.cta.label}
        </Button>
      </div>
    </article>
  );
}

export function Membership() {
  return (
    <section id="membership" aria-labelledby="membership-heading" className="scroll-mt-28 pb-section">
      <Container className="flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            id="membership-heading"
            title={membership.heading}
            text={membership.text}
            textClassName="max-w-105.75"
          />
        </Reveal>
        {/* 1 column < 640, 2×2 from 640, 4 × 282px from 1280. */}
        <Reveal className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:w-auto xl:grid-cols-[repeat(4,17.625rem)]">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
