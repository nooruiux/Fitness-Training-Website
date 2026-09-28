import { Inter, Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import localFont from "next/font/local";

// Every family appears above the fold (navbar, hero h1, hero copy, CTA button),
// so all are preloaded; everything else relies on display: swap.
export const clashGrotesk = localFont({
  src: "../fonts/ClashGrotesk-Medium.otf",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-clash-grotesk",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-work-sans",
});
