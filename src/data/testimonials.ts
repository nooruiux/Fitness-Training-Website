export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  image: { src: string; alt: string };
};

export const testimonialSection = {
  heading: "Testimonial",
  rating: { value: 4.5, count: 895, label: "4.5 (895) star reviews from our clients" },
};

const quote =
  "Lorem ipsum dolor sit amet Diam nisl in dui orci. Malesuada eget non aliquet mattis in maecenas. Sit eu nibh senectus sollicitudin molestie tincidunt. Pulvinar sed nec sed egestas penatibus art.";

const marvin = {
  name: "Marvin McKinney",
  quote,
  image: { src: "/images/testimonial-marvin.webp", alt: "Portrait of Marvin McKinney" },
};

const darrell = {
  name: "Darrell Steward",
  quote,
  image: { src: "/images/testimonial-darrell.webp", alt: "Darrell Steward running on a treadmill" },
};

// TODO: Figma only contains two testimonials but shows five pagination dots.
// The two are repeated to fill the carousel until real testimonials are supplied.
export const testimonials: Testimonial[] = [marvin, darrell, marvin, darrell, marvin, darrell].map(
  (t, i) => ({ ...t, id: `testimonial-${i + 1}` }),
);
