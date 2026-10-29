export type Pt = [number, number];

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Bilinear point on a quad given back-left, back-right, front-right, front-left corners. */
export function quadPoint(q: [Pt, Pt, Pt, Pt], u: number, v: number): Pt {
  const [bl, br, fr, fl] = q;
  return lerp(lerp(bl, br, u), lerp(fl, fr, u), v);
}

export const poly = (pts: Pt[]) => pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");

/** Splits a quad into a cols×rows grid of panels with gaps, each with internal cell lines. */
export function panelGrid(q: [Pt, Pt, Pt, Pt], cols: number, rows: number, gap = 0.012) {
  const panels: { outline: string; cells: [Pt, Pt][]; key: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u0 = c / cols + gap, u1 = (c + 1) / cols - gap;
      const v0 = r / rows + gap * 2, v1 = (r + 1) / rows - gap * 2;
      const P = (u: number, v: number) => quadPoint(q, u0 + (u1 - u0) * u, v0 + (v1 - v0) * v);
      const cells: [Pt, Pt][] = [];
      for (let i = 1; i < 3; i++) cells.push([P(i / 3, 0), P(i / 3, 1)]);
      for (let j = 1; j < 4; j++) cells.push([P(0, j / 4), P(1, j / 4)]);
      panels.push({ key: `${r}-${c}`, outline: poly([P(0, 0), P(1, 0), P(1, 1), P(0, 1)]), cells });
    }
  }
  return panels;
}
