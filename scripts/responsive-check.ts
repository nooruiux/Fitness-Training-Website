/**
 * Responsive device check — run against a production build, not dev.
 *
 *   npm run build && npm start                       # serves http://localhost:3000
 *   npm run check:responsive                         # or BASE_URL=https://… npm run check:responsive
 *
 * For every viewport: loads the page, waits for network idle + document.fonts.ready, scrolls the
 * full page slowly so scroll reveals fire, saves a full-page screenshot to
 * responsive-report/<device>.png and reports:
 *   - horizontal overflow (elements clipped inside the carousel viewport are ignored)
 *   - tap targets smaller than 44×44 (an absolutely positioned ::after hit area counts)
 *   - text smaller than 14px (phones, portrait and landscape)
 *   - upscaled / blurry images (rendered size × DPR larger than the chosen source)
 *   - cumulative layout shift
 * Results go to responsive-report/report.json and responsive-report/summary.md.
 *
 * ONLY=320,390,768 limits the run to devices whose name contains one of the values.
 */
import { chromium, devices, type BrowserContextOptions } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.join(process.cwd(), "responsive-report");

type Device = { name: string; group: string; options: BrowserContextOptions };

const androidUA = devices["Pixel 7"].userAgent;
const iosUA = devices["iPhone 13"].userAgent;
const ipadUA = devices["iPad (gen 7)"].userAgent;

const touch = (width: number, height: number, dpr: number, userAgent: string): BrowserContextOptions => ({
  viewport: { width, height },
  screen: { width, height },
  deviceScaleFactor: dpr,
  isMobile: true,
  hasTouch: true,
  userAgent,
});
const desktop = (width: number, height: number): BrowserContextOptions => ({
  viewport: { width, height },
  screen: { width, height },
  deviceScaleFactor: 1,
});

// Exact viewport sizes from the spec, with each class's real DPR, touch, isMobile and user agent
// (taken from the closest Playwright descriptor; the descriptors' own viewports subtract browser chrome).
const DEVICES: Device[] = [
  { name: "phone-320x568", group: "Phones", options: touch(320, 568, 2, iosUA) }, // iPhone SE (1st gen)
  { name: "phone-360x800", group: "Phones", options: touch(360, 800, 3, androidUA) }, // Galaxy S20-class
  { name: "phone-375x667", group: "Phones", options: touch(375, 667, 2, iosUA) }, // iPhone SE (2nd/3rd gen)
  { name: "phone-390x844", group: "Phones", options: touch(390, 844, 3, iosUA) }, // iPhone 12–14
  { name: "phone-412x915", group: "Phones", options: touch(412, 915, devices["Pixel 7"].deviceScaleFactor, androidUA) },
  { name: "phone-430x932", group: "Phones", options: touch(430, 932, 3, iosUA) }, // iPhone 14/15 Pro Max
  { name: "landscape-844x390", group: "Landscape", options: touch(844, 390, 3, iosUA) },
  { name: "landscape-915x412", group: "Landscape", options: touch(915, 412, devices["Pixel 7"].deviceScaleFactor, androidUA) },
  { name: "tablet-768x1024", group: "Tablets", options: touch(768, 1024, 2, ipadUA) }, // iPad Mini
  { name: "tablet-820x1180", group: "Tablets", options: touch(820, 1180, 2, ipadUA) }, // iPad Air
  { name: "tablet-1024x1366", group: "Tablets", options: touch(1024, 1366, 2, ipadUA) }, // iPad Pro 12.9"
  { name: "tablet-1024x768", group: "Tablets", options: touch(1024, 768, 2, ipadUA) }, // iPad Mini landscape
  { name: "tablet-1180x820", group: "Tablets", options: touch(1180, 820, 2, ipadUA) }, // iPad Air landscape
  { name: "laptop-1280x800", group: "Laptops", options: desktop(1280, 800) },
  { name: "laptop-1366x768", group: "Laptops", options: desktop(1366, 768) },
  { name: "laptop-1440x900", group: "Laptops", options: desktop(1440, 900) }, // Figma reference
  { name: "desktop-1920x1080", group: "Desktop", options: desktop(1920, 1080) },
  { name: "desktop-2560x1440", group: "Desktop", options: desktop(2560, 1440) },
];

type Findings = { overflow: string[]; tapTargets: string[]; smallText: string[]; blurryImages: string[] };
type Result = Findings & { group: string; viewport: string; cls: number; heroCtaAboveFold?: boolean };

/** Runs inside the page, so it must stay self-contained. */
async function audit(isPhone: boolean): Promise<Findings> {
  const vw = document.documentElement.clientWidth;
  const describe = (el: Element) => {
    const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
    const label = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 36);
    return `<${el.tagName.toLowerCase()}${cls ? "." + cls : ""}> "${label}"`;
  };
  const isHidden = (el: Element) => {
    if (el.closest("[inert], [aria-hidden='true']")) return true;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return true;
    const r = el.getBoundingClientRect();
    return r.width === 0 && r.height === 0;
  };
  const isSrOnly = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.width <= 1 && r.height <= 1;
  };
  const clippedByAncestor = (el: Element) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (getComputedStyle(p).overflowX !== "visible") return true;
    }
    return false;
  };

  const overflow: string[] = [];
  const scrollWidth = document.documentElement.scrollWidth;
  if (scrollWidth > vw) overflow.push(`document scrollWidth ${scrollWidth}px > viewport ${vw}px`);
  for (const el of Array.from(document.body.querySelectorAll("*"))) {
    if (el.closest("[aria-roledescription='carousel'] ul")) continue;
    if (isHidden(el) || isSrOnly(el) || getComputedStyle(el).position === "fixed") continue;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 0.5 || r.left < -0.5) && !clippedByAncestor(el)) {
      overflow.push(`${describe(el)} spans ${Math.round(r.left)}→${Math.round(r.right)}px`);
    }
  }

  const tapTargets: string[] = [];
  const selector =
    "a[href], button, [role='switch'], [role='button'], select, textarea, input:not([type='hidden']):not(.sr-only), label:has(> input.sr-only)";
  for (const el of Array.from(document.querySelectorAll(selector))) {
    if (isHidden(el)) continue;
    const r = el.getBoundingClientRect();
    let w = r.width;
    let h = r.height;
    const after = getComputedStyle(el, "::after");
    if (after.content !== "none" && after.position === "absolute") {
      w = Math.max(w, parseFloat(after.width) || 0);
      h = Math.max(h, parseFloat(after.height) || 0);
    }
    if (w < 43.5 || h < 43.5) tapTargets.push(`${describe(el)} ${Math.round(w)}×${Math.round(h)}`);
  }

  const smallText: string[] = [];
  if (isPhone) {
    const seen = new Set<Element>();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || seen.has(parent) || !node.textContent?.trim()) continue;
      seen.add(parent);
      if (parent.closest("script, style, noscript") || isHidden(parent) || isSrOnly(parent)) continue;
      const size = parseFloat(getComputedStyle(parent).fontSize);
      if (size < 14) smallText.push(`${size}px ${describe(parent)}`);
    }
  }

  // naturalWidth of a srcset image is density-corrected (CSS px), so decode the chosen
  // source on its own to get its real pixel size.
  const blurryImages: string[] = [];
  const dpr = window.devicePixelRatio;
  const intrinsic = (src: string) =>
    new Promise<{ w: number; h: number }>((resolve) => {
      const probe = new Image();
      probe.onload = () => resolve({ w: probe.naturalWidth, h: probe.naturalHeight });
      probe.onerror = () => resolve({ w: 0, h: 0 });
      probe.src = src;
    });
  for (const img of Array.from(document.images)) {
    if (isHidden(img) || !img.complete || !img.currentSrc || img.currentSrc.includes(".svg")) continue;
    const { w, h } = await intrinsic(img.currentSrc);
    if (!w) continue;
    const r = img.getBoundingClientRect();
    const scale = Math.max((r.width * dpr) / w, (r.height * dpr) / h);
    if (scale > 1.15) {
      const src = decodeURIComponent(img.currentSrc.replace(location.origin, "")).slice(0, 80);
      blurryImages.push(`${src} — source ${w}×${h}, needs ≈${Math.round(w * scale)}w (×${scale.toFixed(2)})`);
    }
  }

  return { overflow, tapTargets, smallText, blurryImages };
}

const ONLY = process.env.ONLY?.split(",").map((v) => v.trim()).filter(Boolean);

async function run() {
  mkdirSync(OUT, { recursive: true });
  const devicesToRun = ONLY ? DEVICES.filter((d) => ONLY.some((v) => d.name.includes(v))) : DEVICES;
  const browser = await chromium.launch();
  const results: Record<string, Result> = {};

  for (const device of devicesToRun) {
    const context = await browser.newContext(device.options);
    const page = await context.newPage();
    // tsx (esbuild keepNames) wraps functions in __name(); give serialized page functions a no-op.
    await page.addInitScript({ content: "window.__name = (fn) => fn;" });
    await page.addInitScript(() => {
      const w = window as unknown as { __cls: number };
      w.__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
          if (!entry.hadRecentInput) w.__cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const heroCtaAboveFold = await page.evaluate(() => {
      const cta = document.querySelector("#home a[href='#membership']");
      return cta ? cta.getBoundingClientRect().bottom <= window.innerHeight : undefined;
    });

    await page.evaluate(async () => {
      // The page uses scroll-behavior: smooth; force instant jumps so captures aren't mid-scroll.
      document.documentElement.style.scrollBehavior = "auto";
      const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const step = Math.max(200, Math.round(window.innerHeight * 0.4));
      for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await pause(150);
      }
      await pause(800);
      window.scrollTo(0, 0);
      await pause(500);
    });
    await page.waitForLoadState("networkidle");

    const isPhone = device.group === "Phones" || device.group === "Landscape";
    const findings = await page.evaluate(audit, isPhone);
    const cls = await page.evaluate(() => (window as unknown as { __cls: number }).__cls);
    await page.screenshot({ path: path.join(OUT, `${device.name}.png`), fullPage: true });

    const viewport = page.viewportSize()!;
    const result: Result = {
      group: device.group,
      viewport: `${viewport.width}×${viewport.height}`,
      ...findings,
      cls: Math.round(cls * 1000) / 1000,
      ...(device.group === "Landscape" ? { heroCtaAboveFold } : {}),
    };
    results[device.name] = result;
    console.log(
      [
        device.name.padEnd(19),
        `overflow ${String(result.overflow.length).padStart(3)}`,
        `tap<44 ${String(result.tapTargets.length).padStart(3)}`,
        `text<14 ${String(result.smallText.length).padStart(3)}`,
        `blurry ${String(result.blurryImages.length).padStart(2)}`,
        `CLS ${result.cls}`,
        ...(result.heroCtaAboveFold === undefined ? [] : [`hero CTA above fold: ${result.heroCtaAboveFold}`]),
      ].join(" | "),
    );
    await context.close();
  }

  await browser.close();
  const suffix = ONLY ? "-partial" : "";
  writeFileSync(path.join(OUT, `report${suffix}.json`), JSON.stringify(results, null, 2));
  const rows = Object.entries(results).map(
    ([name, r]) =>
      `| ${name} | ${r.viewport} | ${r.overflow.length} | ${r.tapTargets.length} | ${r.smallText.length} | ${r.blurryImages.length} | ${r.cls} |`,
  );
  writeFileSync(
    path.join(OUT, `summary${suffix}.md`),
    [
      `# Responsive report — ${BASE_URL}`,
      "",
      "| Device | Viewport | Overflow | Tap < 44 | Text < 14 (mobile) | Blurry images | CLS |",
      "| --- | --- | ---: | ---: | ---: | ---: | ---: |",
      ...rows,
      "",
    ].join("\n"),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
