export const site = {
  name: "Gymnastic",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://fitness-training-website-bay.vercel.app")),
  title: "Gymnastic — Fitness Training, Classes & Memberships",
  description:
    "Gymnastic is a top-tier fitness club with experienced trainers, modern equipment and flexible memberships. Book a class and start your training today.",
  logo: { src: "/icons/logo.svg", width: 32, height: 32 },
  contact: {
    phone: "+971 50 461 7277",
    phoneHref: "tel:+971504617277",
    email: "info@domain.com",
    emailHref: "mailto:info@domain.com",
    addressLines: ["Warehouse 4, 5th Street,", "Al Quoz, Al Quoz 3, Dubai"],
    address: {
      streetAddress: "Warehouse 4, 5th Street, Al Quoz 3",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=Warehouse+4%2C+5th+Street%2C+Al+Quoz+3%2C+Dubai",
  },
} as const;
