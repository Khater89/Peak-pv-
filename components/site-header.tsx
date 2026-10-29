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
        "sticky top-0 z-50 border-b bg-[#ffffff]/92 backdrop-blur-md transition-shadow duration-200",
        scrolled || open ? "border-line shadow-[0_8px_30px_-20px_rgb(31_43_61/0.35)]" : "border-line/60",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-[2px] focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 lg:h-24">
        <Link href="/" aria-label="Peak PV — home" className="shrink-0 rounded-[2px]">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-ink/70 transition-colors duration-150 hover:text-ink aria-[current=page]:text-ink after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-sun-400 after:transition-transform after:duration-200 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-5">
          <a href={`tel:${phones[0].intl}`} className="hidden items-center gap-2 border-s border-line ps-5 text-sm font-medium tracking-[0.06em] text-ink xl:inline-flex">
            <Phone aria-hidden className="size-4 text-leaf-600" strokeWidth={1.5} />
            <span dir="ltr">{phones[0].display}</span>
          </a>
          <ButtonLink href={primaryCta.href} variant="dark" size="sm" className="px-4 lg:h-12 lg:px-6">
            <span className="min-[400px]:hidden">Quote</span>
            <span className="hidden min-[400px]:inline">Request a Quote</span>
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[2px] border border-line text-ink lg:hidden"
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
                className="flex min-h-12 items-center border-b border-line px-1 text-sm font-semibold uppercase tracking-[0.18em] text-ink aria-[current=page]:text-leaf-600"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 grid gap-2 pb-2">
            <a href={`tel:${phones[0].intl}`} className="flex h-12 items-center justify-center gap-2 rounded-[2px] border border-line font-semibold">
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
