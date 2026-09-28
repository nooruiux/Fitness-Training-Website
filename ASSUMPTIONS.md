# Assumptions & responsive decisions

Figma only has a 1440px desktop frame (`3:2630`). Everything below 1280px is an interpretation,
built mobile-first and checked at 375 / 768 / 1024 / 1440.

## Global

- **Breakpoint for the Figma composition = `xl` (1280px).** At ≥1280px the container is exactly the
  1200px Figma width, so the absolute / notched layouts are pixel-exact at 1440. Between 768px and
  1279px, layouts reflow instead of scaling, because scaling would shrink 12px copy below legibility.
- **Gutter:** 16px on each side below 1280px (`Container`); 0 at ≥1280px (120px margins at 1440).
- **Letter-spacing:** Figma's "0.5" letter-spacing is 0.5% of the font size (e.g. 0.08px at 16px),
  so it is implemented as `0.005em`, not a flat 0.5px.
- **Type scale:** the hero headline uses a 56/67 style and the feature/plan titles use 28/36. Neither
  is in the Figma variable list, but both are in the design, so they became `text-display` and
  `text-h4` tokens. Large headings step down one size below 768px.
- **Sticky navbar:** floats 16px from the top on mobile and 24px on desktop (Figma offset). Every
  section has `scroll-mt-28`, so the bar never covers a heading after an anchor jump.

## Navbar

- Links are shown inline from 1024px. Below that, a hamburger opens a right-side drawer (max 320px)
  with a backdrop, focus trap, Esc to close, and focus returned to the toggle.
- The scroll-spy highlights the section crossing the upper-middle of the viewport.

## Hero

- The notched image (CSS `mask-image` using the Figma Union path) is desktop-only. Below 1280px the
  image is a plain 32px-rounded rectangle (4:3 on mobile, 16:9 from 768px), and the
  "+10 Experience Trainers" badge sits under the image instead of in the notch. On narrow phones the
  label wraps to two lines.

## Why Choose Us

- The panel stacks: the feature card on top (1 column on mobile, 2 from 768px), then the trainer photo
  (400px tall, cropped from the top) with the bottom corners rounded.
- "Award Winners" text box widened from 277px to 290px, so the corrected spelling keeps Figma's
  3-line wrap.

## Shape Your Body

- Text column first, trainer composition below it (side by side only at ≥1280px).
- From 768px the full notched trainer card + floating "Book a class" card is shown at its natural
  604px size, centred. Below 768px it doesn't fit, so the trainer card becomes a plain rounded card
  (same gradient + border tokens), and the booking card stacks under it at full width.
- The curved connector line is desktop-only, because it points at the side-by-side card.
- "Book a class" options are a real radio group. Figma shows "Advanced classes" as selected (outlined),
  so that is the default. Only the selected row is padded and outlined, as in Figma.
- Toggle: `role="switch"`, on by default as in Figma. Figma has no "off" variant, so off only slides
  the knob left (colours unchanged). **Needs confirmation.**

## Membership

- Cards keep their fixed 282×472 Figma size (the notched SVG background can't stretch) and wrap in a
  centred row: 1 per row at 375, 2 at 768, 3 at 1024, 4 at 1280+.
- Plan features come from `data/plans.ts` with `included: boolean`. Not-included rows keep Figma's 28%
  grey. The visible text is `aria-hidden`, and a screen-reader-only "Not included: …" label replaces it.
  This avoids a duplicate announcement and keeps the decorative grey out of contrast audits.
- "Join Now" links to `#contact`. Figma gives no destination.

## Testimonial

- Embla carousel: one slide per view on mobile (photo stacked above the quote), fixed 520px slides
  from 768px (as many as fit), exactly two at 1440 (Figma).
- Figma has only two testimonials but five dots. The two are repeated to six slides, which gives five
  scroll positions at 1440. **Replace with real testimonials.**
- The prev/next arrows use Figma's two chevron states: full cyan when enabled, 24% cyan when
  disabled (start/end of the track).

## CTA

- Notch + star are desktop-only. Below 1280px the gradient card has four rounded corners, with the
  text first and the bodybuilder image underneath, scaled fluidly (max 370px).
- The gradient is the Figma linear gradient (#F28CDF → #32EFDF → #ECA0FF) at 108°, which matches its
  (8,9)→(1066,356) vector.

## Footer

- 1 column on mobile, 2×2 grid from 768px, 4 columns at ≥1280px.
- Phone → `tel:`, email → `mailto:`, address → Google Maps search (new tab).
- Social links point to the platform home pages. **Real profile URLs needed.**
