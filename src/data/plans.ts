export type PlanFeature = { label: string; included: boolean };

export type Plan = {
  name: string;
  price: number;
  period: string;
  features: PlanFeature[];
  cta: { label: string; href: string };
};

export const membership = {
  heading: "Membership",
  text: "Gym session walk can help. Physical activity stimulates many brain chemicals that may leave you.",
};

const featureLabels = [
  "Gym without Trainers",
  "Unlimited Access",
  "Access to all Clubs",
  "Training for all Classes",
  "Exclusive Studio",
  "Additional Session",
] as const;

/** Builds the six-row list with the first `count` features included. */
const withIncluded = (count: number): PlanFeature[] =>
  featureLabels.map((label, i) => ({ label, included: i < count }));

const join = { label: "Join Now", href: "#contact" };

export const plans: Plan[] = [
  { name: "Basic", price: 20, period: "mo", features: withIncluded(3), cta: join },
  { name: "Standard", price: 35, period: "mo", features: withIncluded(4), cta: join },
  { name: "Professional", price: 50, period: "mo", features: withIncluded(5), cta: join },
  { name: "Family", price: 65, period: "mo", features: withIncluded(6), cta: join },
];
