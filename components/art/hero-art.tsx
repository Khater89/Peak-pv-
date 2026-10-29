import { panelGrid, poly, quadPoint, type Pt } from "./geometry";

const ARRAY: [Pt, Pt, Pt, Pt] = [
  [150, 262],
  [520, 250],
  [585, 410],
  [40, 428],
];

/** Decorative hero illustration: a PV array at sunrise. Purely presentational (aria-hidden). */
export function HeroArt({ bleed = false, className = "h-auto w-full" }: { bleed?: boolean; className?: string }) {
  const panels = panelGrid(ARRAY, 6, 3);
  const legs = [0.06, 0.5, 0.94].map((u) => [quadPoint(ARRAY, u, 1), quadPoint(ARRAY, u, 0.55)] as const);

  return (
    <svg viewBox="0 0 620 520" className={className} preserveAspectRatio={bleed ? "xMidYMid slice" : undefined} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="h-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1b33" />
          <stop offset="0.55" stopColor="#1d3a66" />
          <stop offset="0.82" stopColor="#c98a2a" />
          <stop offset="1" stopColor="#f8cc6e" />
        </linearGradient>
        <radialGradient id="h-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe7a8" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#f5b942" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f5b942" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="h-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="1" stopColor="#f5b942" />
        </linearGradient>
        <linearGradient id="h-panel" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#2b4f86" />
          <stop offset="0.5" stopColor="#173462" />
          <stop offset="1" stopColor="#0d2148" />
        </linearGradient>
        <linearGradient id="h-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="h-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13294b" />
          <stop offset="1" stopColor="#061227" />
        </linearGradient>
        <clipPath id="h-frame">
          <rect width="620" height="520" rx="28" />
        </clipPath>
        <clipPath id="h-array">
          <polygon points={poly(ARRAY)} />
        </clipPath>
      </defs>

      <g clipPath={bleed ? undefined : "url(#h-frame)"}>
        <rect width="620" height="520" fill="url(#h-sky)" />
        <g fill="#fff" opacity="0.5">
          {[[60, 50], [140, 90], [250, 40], [420, 70], [560, 46], [520, 120], [90, 150], [330, 110]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />
          ))}
        </g>
        <circle className="anim-sun" cx="420" cy="232" r="150" fill="url(#h-glow)" />
        <circle cx="420" cy="232" r="54" fill="url(#h-sun)" />
        <g stroke="#ffe7a8" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={(420 + Math.cos(a) * 74).toFixed(1)}
                y1={(232 + Math.sin(a) * 74).toFixed(1)}
                x2={(420 + Math.cos(a) * 98).toFixed(1)}
                y2={(232 + Math.sin(a) * 98).toFixed(1)}
              />
            );
          })}
        </g>
        <path d="M0 330 C120 300 220 320 320 312 S520 290 620 318 V520 H0Z" fill="#1d3a66" opacity="0.7" />
        <path d="M0 372 C140 350 260 366 380 356 S560 344 620 360 V520 H0Z" fill="url(#h-ground)" />

        <g stroke="#7d8fae" strokeWidth="5" strokeLinecap="round">
          {legs.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1] + 46} x2={b[0]} y2={b[1] + 30} />
          ))}
        </g>
        <polygon points={poly(ARRAY.map(([x, y]) => [x + 6, y + 14] as Pt))} fill="#000" opacity="0.25" />
        <polygon points={poly(ARRAY)} fill="#c4d2e8" />
        {panels.map((p) => (
          <g key={p.key}>
            <polygon points={p.outline} fill="url(#h-panel)" />
            {p.cells.map(([a, b], i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#5b7fb8" strokeOpacity="0.45" strokeWidth="0.8" />
            ))}
          </g>
        ))}
        <g clipPath="url(#h-array)">
          <ellipse cx="400" cy="300" rx="120" ry="40" fill="#f8cc6e" opacity="0.18" />
          <rect className="anim-sheen" x="0" y="230" width="180" height="220" fill="url(#h-sheen)" transform="skewX(-20)" />
        </g>
      </g>
    </svg>
  );
}
