export type ClassOption = {
  id: string;
  title: string;
  text: string;
  icon: string;
  /** Tailwind background token for the 24px icon disc. */
  tone: "bg-success" | "bg-violet" | "bg-blue";
};

export const shapeBody = {
  heading: { before: "Shape your ", highlight: "perfect body", after: " with us" },
  text: "Shape your perfect body amet consectetur. Convallis sodales in iaculis condimentum turpis phasellus amet. Platea feugiat lobortis vel dui quam ornare. Sed tortor adipiscing pulvinar amet dui. Fermentum sed adipiscing nunc ut cursus odio cursus. Aliquet sit non gravida eget nisi sapien vestibulum dolor suspendisse. Magna a in posuere dignissim convallis felis turpis cras cursus. Duis nibh maecenas vitae sit cursus.",
  cta: { label: "Start your Training", href: "#membership" },
  trainer: {
    name: "William Bell",
    role: "Fitness instructor",
    image: {
      src: "/images/william-bell.webp",
      alt: "Fitness instructor William Bell curling a dumbbell",
      width: 587,
      height: 425,
    },
  },
  stats: [
    { value: "01", label: "Sessions" },
    { value: "30", label: "Minutes" },
  ],
  toggleLabel: "Book a Class",
  booking: {
    title: "Book a class",
    text: "Track your workouts, get better results, and be Less thinking.",
    defaultOption: "advanced",
    options: [
      {
        id: "beginners",
        title: "For the beginners",
        text: "You never workout before, it’s now a good start.",
        icon: "/icons/class-user.svg",
        tone: "bg-success",
      },
      {
        id: "advanced",
        title: "Advanced classes",
        text: "You never workout before, it’s now a good start.",
        icon: "/icons/class-medal.svg",
        tone: "bg-violet",
      },
      {
        id: "premium",
        title: "Premium (limited)",
        text: "You never workout before, it’s now a good start.",
        icon: "/icons/class-lightning.svg",
        tone: "bg-blue",
      },
    ] satisfies ClassOption[],
  },
};
