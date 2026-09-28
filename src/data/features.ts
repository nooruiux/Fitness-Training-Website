export type Feature = {
  title: string;
  text: string;
  /** Figma icon group: its SVG plus where it sits inside the 64×64 icon frame. */
  icon: { src: string; width: number; height: number; className: string };
  /** Figma text-box width at desktop (drives the exact line breaks). */
  textClassName: string;
};

export const whyUs = {
  heading: "Why Choose Us",
  text: "When picking a gym, consider its amenities like guest access, hours, location, and extra benefits to enhance your experience.",
  image: {
    src: "/images/why-trainer.webp",
    alt: "Muscular athlete curling a dumbbell in a dark gym with kettlebells at his feet",
  },
};

/** Grid order follows Figma columns: left column top→bottom, then right column. */
export const featureColumns: Feature[][] = [
  [
    {
      title: "Best Training",
      text: "Best Training dolor sit amet consectetur. Cras eros molestie habitasse sed proin volutpat sollicitudin adipiscing.",
      textClassName: "xl:w-68.25",
      icon: { src: "/icons/feature-training.svg", width: 49.7778, height: 49.7778, className: "top-[11.11%] left-[11.11%]" },
    },
    {
      title: "Modern Equipment",
      text: "Modern Equipment dolor sit amet volutpat. Cras eros molestie habitasse sed proin volutpat sollicitudin adipiscing.",
      textClassName: "xl:w-71.5",
      icon: { src: "/icons/feature-equipment.svg", width: 49.7778, height: 51.5557, className: "top-[9.72%] left-[11.11%]" },
    },
  ],
  [
    {
      title: "Experience Trainers",
      text: "Experience Trainers dolor sit amet volutpat. Cras eros molestie habitasse sed proin volutpat sollicitudin adipiscing.",
      textClassName: "xl:w-72.75",
      icon: { src: "/icons/feature-trainers.svg", width: 49.7778, height: 47.1112, className: "top-[13.89%] left-[11.11%]" },
    },
    {
      title: "Award Winners",
      text: "Award Winners dolor sit amet consectetur. Cras eros molestie habitasse sed proin volutpat sollicitudin adipiscing.",
      // Figma box is 277px for "Award Winers"; widened so the corrected "Winners" keeps 3 lines.
      textClassName: "xl:w-72.5",
      icon: { src: "/icons/feature-award.svg", width: 49.6512, height: 56.0002, className: "top-[6.94%] left-[11.11%]" },
    },
  ],
];
