"use client";

import { useEffect } from "react";

/**
 * Site-wide motion, in one small client island:
 *  - [data-reveal] elements fade/slide in the first time they scroll into view
 *  - .sun-glow elements get --mx/--my so their sunlight follows the pointer
 *  - [data-count] numbers count up once when they appear
 * Without JavaScript (or with reduced motion) everything is simply visible and still:
 * the hidden starting state only applies once <html> carries the "motion" class set here.
 */
export function Interactions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduce) return;
    root.classList.add("motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.dataset.shown = "1";
          if (el.dataset.count !== undefined) countUp(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]").forEach((el) => io.observe(el));

    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (ev: PointerEvent) => {
      const t = (ev.target as Element | null)?.closest?.<HTMLElement>(".sun-glow");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      t.style.setProperty("--my", `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
      root.classList.remove("motion");
    };
  }, []);
  return null;
}

/** Counts the first number inside the element up from 0, keeping the rest of the text. */
function countUp(el: HTMLElement) {
  const text = el.textContent ?? "";
  const m = text.match(/\d+(?:[.,]\d+)?/);
  if (!m) return;
  const target = parseFloat(m[0].replace(",", "."));
  const decimals = (m[0].split(/[.,]/)[1] ?? "").length;
  const before = text.slice(0, m.index);
  const after = text.slice((m.index ?? 0) + m[0].length);
  const start = performance.now();
  const dur = 1400;
  const step = (now: number) => {
    const k = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = before + (target * eased).toFixed(decimals) + after;
    if (k < 1) requestAnimationFrame(step);
    else el.textContent = text;
  };
  requestAnimationFrame(step);
}
