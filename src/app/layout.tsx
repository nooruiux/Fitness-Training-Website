import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import { clashGrotesk, inter, plusJakarta, workSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/images/hero-couple-training.webp", width: 2400, height: 1602, alt: "Personal training session at Gymnastic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/hero-couple-training.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111212",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: site.name,
  url: site.url,
  description: site.description,
  image: `${site.url}/images/hero-couple-training.webp`,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: { "@type": "PostalAddress", ...site.contact.address },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${clashGrotesk.variable} ${inter.variable} ${plusJakarta.variable} ${workSans.variable} antialiased`}
    >
      <body className="overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
