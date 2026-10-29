"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, phones, primaryCta } from "@/content/site";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [{ href: "/", label: "Home" }, ...nav];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow duration-200",
        scrolled || open ? "border-line shadow-[0_8px_30px_-20px_rgb(11_27_51/0.45)]" : "border-line/60",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 lg:h-24">
        <Link href="/" aria-label="Open Energy — home" className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-full px-4 py-2.5 text-[0.9375rem] font-semibold text-ink/80 transition-colors duration-150 hover:bg-surface hover:text-ink aria-[current=page]:bg-navy-900 aria-[current=page]:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-5">
          <a href={`tel:${phones[0].intl}`} className="hidden items-center gap-2 border-s border-line ps-5 font-semibold text-ink xl:inline-flex">
            <Phone aria-hidden className="size-4 text-sun-700" />
            <span dir="ltr">{phones[0].display}</span>
          </a>
          <ButtonLink href={primaryCta.href} variant="dark" size="sm" className="px-4 lg:h-12 lg:px-6 lg:text-base">
            <span className="min-[400px]:hidden">Quote</span>
            <span className="hidden min-[400px]:inline">Request a Quote</span>
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <ul className="container-x flex flex-col py-3">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex min-h-12 items-center rounded-lg px-3 text-base font-semibold text-ink aria-[current=page]:bg-surface"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 grid gap-2 pb-2">
            <a href={`tel:${phones[0].intl}`} className="flex h-12 items-center justify-center gap-2 rounded-full border border-line font-semibold">
              <Phone aria-hidden className="size-4" /> <span dir="ltr">{phones[0].display}</span>
            </a>
            <ButtonLink href={primaryCta.href} className="w-full">
              {primaryCta.label}
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
