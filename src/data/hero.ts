export const hero = {
  heading: "Take care of your body and it’s the only place you have to live",
  text: "Gym session or brisk walk can help. Physical activity stimulates many brain chemicals that may leave you.",
  cta: { label: "Be a Member", href: "#membership" },
  image: {
    src: "/images/hero-couple-training.webp",
    alt: "A personal trainer spotting a woman lifting a barbell overhead in a modern gym",
  },
  trainers: {
    avatars: [
      { src: "/images/trainer-avatar-1.webp", alt: "Trainer portrait 1" },
      { src: "/images/trainer-avatar-2.webp", alt: "Trainer portrait 2" },
      { src: "/images/trainer-avatar-3.webp", alt: "Trainer portrait 3" },
      { src: "/images/trainer-avatar-4.webp", alt: "Trainer portrait 4" },
    ],
    count: "+10",
    label: "Experience Trainers",
  },
} as const;
