<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


<!-- Project rules -->

# Gymnastic — Fitness Training Website

Figma → Next.js build of the Home page.

- Figma file key: `2A6wIt86vMBPbb6MJJRDTi`, page frame `3:2630` (Home, 1440px desktop)
- GitHub: https://github.com/nooruiux/Fitness-Training-Website (branch `main`)

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + lucide-react + clsx +
tailwind-merge (+ embla-carousel-react for the testimonial carousel). Use `next/image` and `next/font`.

## Figma fidelity (non-negotiable)

- Before coding any section: call `get_design_context` AND `get_screenshot` for that node.
- Match exact spacing, font size, weight, line-height, letter-spacing, radius, shadows and colors.
- Use design tokens only (`src/app/globals.css` `@theme`). No hardcoded hex/px values inside
  components — use theme tokens and the Tailwind spacing scale (1 unit = 4px).
- Export every image, icon and SVG from Figma into `/public`. Never use placeholders or invented icons.
- After each section: run the dev server, compare against the Figma screenshot, fix every visible
  difference, then commit.
- If something is not specified in Figma, STOP and ask. Do not guess.

## Architecture

```
src/app/                  layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts
src/components/ui/        Button, Container, SectionHeading, Card, Toggle, Carousel
src/components/sections/  Navbar, Hero, WhyUs, ShapeBody, Membership, Testimonial, CTA, Footer
src/data/                 typed content files (nav, features, plans, testimonials, footer, …)
src/lib/utils.ts          cn() helper
```

Content lives in `/src/data` files, never hardcoded inside JSX.

## Quality

- Semantic HTML, a single h1, correct heading order, alt text on all images
- Visible focus states, WCAG AA contrast, keyboard accessible
- `prefers-reduced-motion` respected for all animations
- Lighthouse 95+ on all four categories
- Conventional commits, one commit per section

## Responsive

- No mobile frame in Figma. Mobile-first at 375 / 768 / 1024 / 1440; desktop pixel-exact at 1440.
- The absolute/notched desktop compositions switch on at `xl` (1280px), where the container is the
  full 1200px Figma width. Below that, layouts reflow. Every mobile decision goes in ASSUMPTIONS.md.
