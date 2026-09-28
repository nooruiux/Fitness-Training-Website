import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { ShapeBody } from "@/components/sections/ShapeBody";
import { Membership } from "@/components/sections/Membership";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <ShapeBody />
        <Membership />
        <Testimonial />
        <CTA />
      </main>
    </>
  );
}
