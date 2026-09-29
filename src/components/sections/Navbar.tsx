"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const trackedIds = navItems.flatMap((item) => (item.sectionId ? [item.sectionId] : []));

/** Scroll-spy: the active section is the one crossing the upper-middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(trackedIds[0]);

  useEffect(() => {
    const sections = trackedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Logo() {
  return (
    <a href="#home" className="flex shrink-0 items-center gap-2 rounded-full" aria-label={`${site.name} — home`}>
      <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} priority />
      <span className="font-heading text-h5 font-semibold text-white uppercase">{site.name}</span>
    </a>
  );
}

function NavLinks({
  active,
  onNavigate,
  className,
  linkClassName,
}: {
  active: string;
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul className={className}>
      {navItems.map((item) => {
        const isActive = item.sectionId === active;
        return (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "block rounded-full p-2 text-body-lg transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-white",
                linkClassName,
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Drawer: Esc closes, Tab is trapped inside, body scroll is locked.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const focusables = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 pt-[max(1rem,env(safe-area-inset-top))] xl:pt-6">
      <Container>
        <nav
          aria-label="Primary"
          className="flex items-center justify-between rounded-full bg-surface px-6 py-4"
        >
          <Logo />
          <NavLinks active={active} className="hidden items-center gap-5 lg:flex xl:-mr-2.5" />
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full text-white transition-colors hover:text-primary lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden className="size-6" />
          </button>
        </nav>
      </Container>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-grey-700/70 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
        onClick={close}
      />
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-80 flex-col gap-8 bg-surface p-6 transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-white transition-colors hover:text-primary"
            aria-label="Close menu"
            onClick={close}
          >
            <X aria-hidden className="size-6" />
          </button>
        </div>
        <NavLinks
          active={active}
          onNavigate={() => setOpen(false)}
          className="flex flex-col gap-2"
          linkClassName="px-2 py-3 text-body-xl"
        />
      </div>
    </header>
  );
}
