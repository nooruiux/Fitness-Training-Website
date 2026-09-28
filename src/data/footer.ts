import { site } from "./site";

export type FooterLink = { label: string; href: string };

export const footer = {
  description:
    "This top-tier fitness club comes at a hefty monthly cost but offers the best of the best. You'll find state-of-the-art equipment.",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/", icon: "/icons/social-facebook.svg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "/icons/social-linkedin.svg" },
    { label: "Twitter", href: "https://twitter.com/", icon: "/icons/social-twitter.svg" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "/icons/social-instagram.svg" },
  ],
  columns: [
    {
      heading: "Company",
      links: [
        { label: "Home", href: "#home" },
        { label: "Class", href: "#class" },
        { label: "Membership", href: "#membership" },
        { label: "Trainers", href: "#trainers" },
        // TODO: point Blog at the real blog once it exists.
        { label: "Blog", href: "#" },
      ],
    },
    {
      heading: "Category",
      links: [
        { label: "Strength Training", href: "#class" },
        { label: "Body Building", href: "#class" },
        { label: "Weight Loss", href: "#class" },
        { label: "Basic Yoga", href: "#class" },
        { label: "Physical Fitness", href: "#class" },
      ],
    },
  ] satisfies { heading: string; links: FooterLink[] }[],
  contact: {
    heading: "Contact Us",
    items: [
      { kind: "phone", label: site.contact.phone, href: site.contact.phoneHref, icon: "/icons/contact-phone.svg" },
      { kind: "email", label: site.contact.email, href: site.contact.emailHref, icon: "/icons/contact-mail.svg" },
      {
        kind: "address",
        label: site.contact.addressLines.join(" "),
        lines: site.contact.addressLines,
        href: site.contact.mapsHref,
        icon: "/icons/contact-pin.svg",
      },
    ],
  },
  legal: [
    // TODO: link to real Terms of Use / Privacy Policy pages.
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};
