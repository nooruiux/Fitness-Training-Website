import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the custom type scale so `text-h3` and `text-primary`
// are treated as different groups (size vs. color) instead of overriding each other.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "card-title",
            "body-xl",
            "body-lg",
            "body-md",
            "label-md",
            "body-sm",
            "button-lg",
            "button-md",
            "footer-heading",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
