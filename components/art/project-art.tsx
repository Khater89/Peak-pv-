import { panelGrid, poly, type Pt } from "./geometry";

export type ArtVariant = "roof" | "flat" | "carport" | "ground";

export function artVariantFor(systemType: string): ArtVariant {
  const t = systemType.toLowerCase();
  if (t.includes("carport")) return "carport";
  if (t.includes("ground")) return "ground";
  if (t.includes("commercial") || t.includes("flat")) return "flat";
  return "roof";
}

function Panels({ quad, cols, rows }: { quad: [Pt, Pt, Pt, Pt]; cols: number; rows: number }) {
  return (
    <>
      <polygon points={poly(quad)} fill="#c4d2e8" />
      {panelGrid(quad, cols, rows, 0.01).map((p) => (
        <g key={p.key}>
          <polygon points={p.outline} fill="#173462" />
          {p.cells.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#5b7fb8" strokeOpacity="0.45" strokeWidth="0.6" />
          ))}
        </g>
      ))}
    </>
  );
}

/** Placeholder illustration used until real, authorised project photos are supplied. */
export function ProjectArt({ variant, label }: { variant: ArtVariant; label: string }) {
  return (
    <svg viewBox="0 0 400 250" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })} className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="250" fill="#e3ecf8" />
      <rect y="120" width="400" height="80" fill="#fff4dc" opacity="0.8" />
      <circle cx="330" cy="58" r="42" fill="#f5b942" opacity="0.18" />
      <circle cx="330" cy="58" r="26" fill="#f5b942" />
      <path d="M0 200 C100 188 220 196 400 186 V250 H0Z" fill="#cfd9c4" />

      {variant === "roof" && (
        <g>
          <rect x="95" y="128" width="210" height="82" fill="#f4f6f9" stroke="#b5c0d0" />
          <rect x="185" y="160" width="32" height="50" fill="#c4d2e8" />
          <rect x="120" y="150" width="40" height="28" fill="#dbe7f7" stroke="#b5c0d0" />
          <rect x="240" y="150" width="40" height="28" fill="#dbe7f7" stroke="#b5c0d0" />
          <polygon points="80,132 140,72 260,72 320,132" fill="#9c6a16" />
          <Panels quad={[[146, 80], [254, 80], [296, 124], [104, 124]]} cols={5} rows={2} />
        </g>
      )}

      {variant === "flat" && (
        <g>
          <rect x="40" y="120" width="320" height="90" fill="#e9edf3" stroke="#b5c0d0" />
          <rect x="70" y="160" width="60" height="50" fill="#c4d2e8" />
          <rect x="150" y="160" width="60" height="50" fill="#c4d2e8" />
          <polygon points="40,120 360,120 340,90 60,90" fill="#d8dfe9" />
          <Panels quad={[[74, 93], [326, 93], [344, 117], [56, 117]]} cols={10} rows={3} />
        </g>
      )}

      {variant === "carport" && (
        <g>
          {[110, 200, 290].map((x) => (
            <rect key={x} x={x - 3} y="128" width="6" height="74" fill="#7d8fae" />
          ))}
          <Panels quad={[[70, 104], [330, 104], [350, 132], [50, 132]]} cols={8} rows={2} />
          <rect x="88" y="178" width="58" height="22" rx="7" fill="#1d3a66" />
          <rect x="176" y="178" width="58" height="22" rx="7" fill="#9c6a16" />
          <rect x="264" y="178" width="58" height="22" rx="7" fill="#475569" />
        </g>
      )}

      {variant === "ground" && (
        <g>
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <line x1={90 + r * 10} y1={150 + r * 22} x2={90 + r * 10} y2={170 + r * 22} stroke="#7d8fae" strokeWidth="3" />
              <line x1={310 - r * 10} y1={150 + r * 22} x2={310 - r * 10} y2={170 + r * 22} stroke="#7d8fae" strokeWidth="3" />
              <Panels quad={[[70 + r * 10, 132 + r * 22], [330 - r * 10, 132 + r * 22], [340 - r * 10, 152 + r * 22], [60 + r * 10, 152 + r * 22]]} cols={7} rows={1} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
