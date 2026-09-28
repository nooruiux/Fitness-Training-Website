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
    <article className="relative h-118 w-70.5 shrink-0" aria-labelledby={`plan-${plan.name}`}>
      <Image
        src="/decor/plan-card.svg"
        alt=""
        width={282.483}
        height={472}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-x-0 top-5 flex flex-col items-center gap-5">
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
      <Button
        size="sm"
        href={plan.cta.href}
        className="absolute top-104 left-18.75"
        aria-label={`${plan.cta.label} — ${plan.name} plan`}
      >
        {plan.cta.label}
      </Button>
    </article>
  );
}

export function Membership() {
  return (
    <section id="membership" aria-labelledby="membership-heading" className="scroll-mt-28 pb-20 xl:pb-30">
      <Container className="flex flex-col items-center gap-14">
        <Reveal>
          <SectionHeading
            id="membership-heading"
            title={membership.heading}
            text={membership.text}
            textClassName="max-w-105.75"
          />
        </Reveal>
        <Reveal className="flex flex-wrap justify-center gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
