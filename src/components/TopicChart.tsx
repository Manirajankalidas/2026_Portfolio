import type { ReactNode } from "react";

// Data Science illustrations, drawn as SVG at build time so they stay sharp and follow the theme.
// All data is synthetic (seeded below) and labelled as such: never present it as a real result.

export type ChartName = "bi" | "ml" | "eda" | "data" | "time" | "stats";

// Chart colours are scoped here; text uses the site's own tokens. Dark steps are chosen, not inverted.
const css = `
.dsc{--s1:#0071e3;--s2:#f47230;--s3:#00b894;--mid:#e4e4e9;--surf:var(--card)}
.dsc.bg-alt{--surf:var(--bg-alt)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .dsc{--s1:#338ced;--s2:#e76624;--s3:#00a888;--mid:#3a3a3d}}
:root[data-theme="dark"] .dsc{--s1:#338ced;--s2:#e76624;--s3:#00a888;--mid:#3a3a3d}
@media (prefers-reduced-motion:no-preference){@supports (animation-timeline:view()){
.dsc{animation:dsc-in linear both;animation-timeline:view();animation-range:entry 0% entry 60%}
@keyframes dsc-in{from{opacity:.2;transform:translateY(24px)}to{opacity:1;transform:none}}}}
`;

const W = 800;
const H = 450;
type Pt = [number, number];
const r1 = (n: number) => Math.round(n * 10) / 10;

// Small seeded generator, so every build draws the same picture.
function rng(seed: number) {
  let s = seed;
  const u = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return (s + 0.5) / 4294967296;
  };
  return { u, n: () => Math.sqrt(-2 * Math.log(u())) * Math.cos(2 * Math.PI * u()) };
}

const path = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${r1(x)} ${r1(y)}`).join("");
const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const corr = (a: number[], b: number[]) => {
  const ma = mean(a);
  const mb = mean(b);
  const cov = a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0);
  const sd = (c: number[], m: number) => Math.sqrt(c.reduce((s, v) => s + (v - m) ** 2, 0));
  return cov / (sd(a, ma) * sd(b, mb));
};
// Least-squares line through points.
function fit(pts: Pt[]) {
  const mx = mean(pts.map((p) => p[0]));
  const my = mean(pts.map((p) => p[1]));
  const sxx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0);
  const m = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0) / sxx;
  const se = Math.sqrt(
    pts.reduce((s, p) => s + (p[1] - my - m * (p[0] - mx)) ** 2, 0) / (pts.length - 2),
  );
  return {
    at: (x: number) => my + m * (x - mx),
    ci: (x: number) => 1.96 * se * Math.sqrt(1 / pts.length + (x - mx) ** 2 / sxx),
  };
}

function T({
  x,
  y,
  children,
  strong,
  anchor = "start",
  size = 19,
}: {
  x: number;
  y: number;
  children: ReactNode;
  strong?: boolean;
  anchor?: "start" | "middle" | "end";
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={strong ? 600 : 400}
      fill={strong ? "var(--fg)" : "var(--muted)"}
    >
      {children}
    </text>
  );
}

function Axes({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <path d={`M${x} ${y}V${y + h}H${x + w}`} fill="none" stroke="var(--mid)" />;
}

function Dots({ pts, color, square }: { pts: Pt[]; color: string; square?: boolean }) {
  return pts.map(([x, y], i) =>
    square ? (
      <rect key={i} x={r1(x - 5)} y={r1(y - 5)} width="10" height="10" rx="1.5" fill={color} stroke="var(--surf)" strokeWidth="2" />
    ) : (
      <circle key={i} cx={r1(x)} cy={r1(y)} r="6" fill={color} stroke="var(--surf)" strokeWidth="2" />
    ),
  );
}

function Line({ pts, color = "var(--s1)", width = 3 }: { pts: Pt[]; color?: string; width?: number }) {
  return <path d={path(pts)} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />;
}

// A column with a rounded top and a square baseline.
const column = (x: number, base: number, w: number, h: number) =>
  `M${x} ${base}V${r1(base - h + 4)}q0 -4 4 -4H${x + w - 4}q4 0 4 4V${base}Z`;

function Bi() {
  const g = rng(7);
  const line: Pt[] = Array.from({ length: 12 }, (_, i) => [
    60 + i * 34,
    190 - i * 7 - Math.sin(i / 1.6) * 16 + g.n() * 5,
  ]);
  const [lx, ly] = line[11];
  const regions: [string, number][] = [["North", 150], ["South", 118], ["East", 92], ["West", 64]];
  const cols = [58, 74, 66, 92, 84, 108, 98, 120];
  const panel = (x: number, y: number, w: number, h: number) => (
    <rect x={x} y={y} width={w} height={h} rx="16" fill="var(--bg)" stroke="var(--line)" />
  );
  return (
    <>
      {panel(24, 24, 440, 218)}
      <T x={48} y={60} strong>Trend by month</T>
      {[115, 160, 205].map((y) => <path key={y} d={`M48 ${y}H444`} stroke="var(--line)" />)}
      <path d={`${path(line)}L${lx} 216L60 216Z`} fill="var(--s1)" opacity=".1" />
      <Line pts={line} />
      <circle cx={r1(lx)} cy={r1(ly)} r="6" fill="var(--s1)" stroke="var(--bg)" strokeWidth="2" />
      {panel(480, 24, 296, 218)}
      <T x={504} y={60} strong>By region</T>
      {regions.map(([n, v], i) => (
        <g key={n}>
          <T x={504} y={100 + i * 37}>{n}</T>
          <path d={`M580 ${84 + i * 37}h${v - 4}q4 0 4 4v12q0 4 -4 4H580Z`} fill="var(--s1)" />
        </g>
      ))}
      {panel(24, 258, 440, 168)}
      <T x={48} y={294} strong>Volume by week</T>
      {cols.map((v, i) => <path key={i} d={column(56 + i * 48, 406, 24, v * 0.75)} fill="var(--s1)" />)}
      <path d="M48 406H444" stroke="var(--mid)" />
      {panel(480, 258, 296, 168)}
      <T x={504} y={294} strong>Share by channel</T>
      <rect x="504" y="314" width="120" height="24" rx="4" fill="var(--s1)" />
      <rect x="626" y="314" width="74" height="24" rx="4" fill="var(--s2)" />
      <rect x="702" y="314" width="50" height="24" rx="4" fill="var(--s3)" />
      {["Online", "Store", "Other"].map((n, i) => (
        <g key={n}>
          <rect x={504 + i * 92} y={366} width="12" height="12" rx="3" fill={`var(--s${i + 1})`} />
          <T x={522 + i * 92} y={379}>{n}</T>
        </g>
      ))}
    </>
  );
}

function Ml() {
  const g = rng(21);
  const blob = (cx: number, cy: number, n: number, s: number): Pt[] =>
    Array.from({ length: n }, () => [cx + g.n() * s, cy + g.n() * s]);
  const reg: Pt[] = Array.from({ length: 18 }, (_, i) => [306 + i * 11.2, 310 - i * 9.5 + g.n() * 16]);
  const f = fit(reg);
  return (
    <>
      <T x={30} y={62} strong size={22}>Classification</T>
      <T x={290} y={62} strong size={22}>Regression</T>
      <T x={550} y={62} strong size={22}>Clustering</T>
      {[30, 290, 550].map((x) => <Axes key={x} x={x} y={92} w={220} h={258} />)}
      <path d="M32 136C100 170 150 240 236 346" fill="none" stroke="var(--muted)" strokeWidth="2" />
      <Dots pts={blob(188, 165, 14, 19)} color="var(--s1)" />
      <Dots pts={blob(86, 280, 14, 19)} color="var(--s2)" square />
      <Dots pts={reg} color="var(--s1)" />
      <Line pts={[[300, f.at(300)], [504, f.at(504)]]} color="var(--s2)" />
      <Dots pts={blob(612, 160, 10, 14)} color="var(--s1)" />
      <Dots pts={blob(716, 208, 10, 14)} color="var(--s2)" />
      <Dots pts={blob(632, 296, 10, 14)} color="var(--s3)" />
      {[[612, 160], [716, 208], [632, 296]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="56" fill="none" stroke="var(--muted)" />
      ))}
      <T x={30} y={388}>● Class A   ■ Class B</T>
      <T x={290} y={388}>Points and fitted line</T>
      <T x={550} y={388}>Three groups found</T>
    </>
  );
}

function Eda() {
  const g = rng(5);
  const base = Array.from({ length: 80 }, () => g.n());
  const vars = [1, 0.85, 0.25, -0.6, -0.9].map((k) =>
    base.map((v) => v * k + g.n() * Math.sqrt(1 - Math.min(k * k, 0.9))),
  );
  const sample = Array.from({ length: 300 }, () => g.n());
  const bins = Array.from({ length: 11 }, (_, i) =>
    sample.filter((v) => v >= -2.75 + i * 0.5 && v < -2.25 + i * 0.5).length,
  );
  const top = Math.max(...bins);
  const scatter: Pt[] = base.slice(0, 34).map((v, i) => [585 + v * 62, 338 - vars[1][i] * 30]);
  return (
    <>
      <T x={30} y={46} strong>Correlation heatmap</T>
      {vars.map((a, i) =>
        vars.map((b, j) => {
          const c = corr(a, b);
          return (
            <g key={`${i}${j}`}>
              <rect x={30 + j * 44} y={62 + i * 30} width="42" height="28" rx="3" fill="var(--mid)" />
              <rect
                x={30 + j * 44}
                y={62 + i * 30}
                width="42"
                height="28"
                rx="3"
                fill={c > 0 ? "var(--s1)" : "var(--s2)"}
                opacity={r1(Math.abs(c) * 10) / 10}
              />
            </g>
          );
        }),
      )}
      <rect x="266" y="64" width="14" height="14" rx="3" fill="var(--s1)" />
      <T x={288} y={78}>Positive</T>
      <rect x="266" y="94" width="14" height="14" rx="3" fill="var(--mid)" />
      <T x={288} y={108}>None</T>
      <rect x="266" y="124" width="14" height="14" rx="3" fill="var(--s2)" />
      <T x={288} y={138}>Negative</T>
      <T x={430} y={46} strong>Histogram</T>
      {bins.map((n, i) => n > 0 && <path key={i} d={column(436 + i * 29, 212, 24, Math.max(6, (n / top) * 138))} fill="var(--s1)" />)}
      <path d="M430 212H760" stroke="var(--mid)" />
      <T x={30} y={262} strong>Box plots and outliers</T>
      {[[295, 130, 190, 70, 260], [345, 170, 250, 110, 300], [395, 110, 160, 60, 220]].map(([y, q1, q3, lo, hi], i) => (
        <g key={y}>
          <path d={`M${lo} ${y}H${hi}M${lo} ${y - 8}V${y + 8}M${hi} ${y - 8}V${y + 8}`} stroke="var(--muted)" strokeWidth="2" />
          <rect x={q1} y={y - 12} width={q3 - q1} height="24" rx="4" fill="var(--s1)" />
          <path d={`M${(q1 + q3) / 2 + 6} ${y - 12}V${y + 12}`} stroke="var(--surf)" strokeWidth="3" />
          {i !== 1 && <circle cx={hi + 70} cy={y} r="6" fill="var(--s2)" />}
        </g>
      ))}
      <T x={430} y={262} strong>Scatter plot</T>
      <Axes x={430} y={274} w={330} h={132} />
      <Dots pts={scatter.filter(([x, y]) => x > 438 && x < 756 && y > 278 && y < 400)} color="var(--s1)" />
    </>
  );
}

function DataFlow() {
  const box = (x: number, y: number, w: number, h: number, label: string) => (
    <g key={label}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="var(--bg)" stroke="var(--mid)" />
      <T x={x + w / 2} y={y + h / 2 + 7} anchor="middle">{label}</T>
    </g>
  );
  const wire = (d: string) => <path key={d} d={d} fill="none" stroke="var(--s1)" strokeWidth="2" />;
  return (
    <>
      <T x={88} y={72} strong anchor="middle">Collect</T>
      <T x={308} y={72} strong anchor="middle">Process in Python</T>
      <T x={528} y={72} strong anchor="middle">Organise</T>
      <T x={712} y={72} strong anchor="middle">Use</T>
      {["M152 141C185 141 180 225 220 225", "M152 225H220", "M152 309C185 309 180 225 220 225", "M396 225H440", "M616 225C640 225 630 169 648 169", "M616 225C640 225 630 281 648 281"].map(wire)}
      {["CSV files", "APIs", "Databases"].map((n, i) => box(24, 113 + i * 84, 128, 56, n))}
      <rect x="220" y="100" width="176" height="250" rx="18" fill="var(--s1)" opacity=".1" />
      {["Clean", "Transform", "Automate"].map((n, i) => box(240, 120 + i * 74, 136, 56, n))}
      <rect x="440" y="125" width="176" height="200" rx="14" fill="var(--bg)" stroke="var(--mid)" />
      <path d="M440 165V139q0 -14 14 -14H602q14 0 14 14V165Z" fill="var(--s1)" />
      {[205, 245, 285].map((y) => <path key={y} d={`M440 ${y}H616`} stroke="var(--line)" />)}
      {[498, 557].map((x) => <path key={x} d={`M${x} 165V325`} stroke="var(--line)" />)}
      {[185, 225, 265, 305].map((y, i) =>
        [452, 510, 569].map((x, j) => (
          <rect key={`${y}${x}`} x={x} y={y - 4} width={34 - ((i + j) % 3) * 7} height="8" rx="4" fill="var(--mid)" />
        )),
      )}
      {box(648, 141, 128, 56, "Analysis")}
      {box(648, 253, 128, 56, "ML models")}
      <T x={400} y={398} anchor="middle">Raw data in, structured data out</T>
    </>
  );
}

function Time() {
  const g = rng(11);
  const n = 60;
  const season = (i: number) => Math.sin((2 * Math.PI * i) / 12) * 26;
  const obs = Array.from({ length: n }, (_, i) => 1.5 * i + season(i) + g.n() * 8);
  const x = (i: number) => 40 + i * 10;
  const y = (v: number) => 235 - v * 1.15;
  // Trailing 12-period moving average, and a forecast that continues the trend plus season.
  const ma: Pt[] = obs.slice(11).map((_, i) => [x(i + 11), y(mean(obs.slice(i, i + 12)))]);
  const fut = Array.from({ length: 13 }, (_, k) => n - 1 + k);
  const fc = fut.map((i, k) => (k === 0 ? obs[n - 1] : 1.5 * i + season(i)));
  const band = fut.map((_, k) => (k === 0 ? 0 : 10 + k * 1.4));
  const upper: Pt[] = fut.map((i, k) => [x(i), y(fc[k] + band[k])]);
  const lower: Pt[] = fut.map((i, k) => [x(i), y(fc[k] - band[k])]);
  return (
    <>
      {[["Observed", "var(--s1)"], ["Moving average", "var(--s2)"], ["Forecast", "var(--s3)"]].map(([name, c], i) => (
        <g key={name}>
          <path d={`M${40 + [0, 140, 340][i]} 38h24`} stroke={c} strokeWidth="4" strokeLinecap="round" />
          <T x={72 + [0, 140, 340][i]} y={45}>{name}</T>
        </g>
      ))}
      {[110, 170, 230].map((v) => <path key={v} d={`M40 ${v}H770`} stroke="var(--line)" />)}
      <path d={`M40 280H770M${x(n - 1)} 64V280`} stroke="var(--mid)" />
      <path d={`${path(upper)}${path([...lower].reverse()).replace("M", "L")}Z`} fill="var(--s3)" opacity=".16" />
      <Line pts={obs.map((v, i) => [x(i), y(v)])} width={2.5} />
      <Line pts={ma} color="var(--s2)" />
      <Line pts={fut.map((i, k) => [x(i), y(fc[k])])} color="var(--s3)" />
      <T x={40} y={326} strong>Trend</T>
      <Axes x={40} y={338} w={340} h={76} />
      <Line pts={[[46, 404], [374, 348]]} />
      <T x={430} y={326} strong>Seasonal pattern</T>
      <Axes x={430} y={338} w={340} h={76} />
      <Line pts={Array.from({ length: 121 }, (_, i): Pt => [436 + i * 2.7, 376 - Math.sin((2 * Math.PI * i) / 30) * 28])} />
    </>
  );
}

function Stats() {
  const g = rng(3);
  const pdf = (z: number): Pt => [210 + z * 52, 320 - Math.exp((-z * z) / 2) * 200];
  const curve = (a: number, b: number) =>
    Array.from({ length: 61 }, (_, i) => pdf(a + ((b - a) * i) / 60));
  const area = (a: number, b: number) =>
    `${path(curve(a, b))}L${210 + b * 52} 320L${210 + a * 52} 320Z`;
  const pts: Pt[] = Array.from({ length: 26 }, (_, i) => [462 + i * 11.8, 290 - i * 6.4 + g.n() * 21]);
  const f = fit(pts);
  const xs = Array.from({ length: 33 }, (_, i) => 450 + i * 10);
  const up = xs.map((x): Pt => [x, f.at(x) - f.ci(x)]);
  const lo = xs.map((x): Pt => [x, f.at(x) + f.ci(x)]);
  return (
    <>
      <T x={30} y={62} strong size={22}>Hypothesis test</T>
      <path d={area(-1.96, 1.96)} fill="var(--s1)" opacity=".12" />
      <path d={area(-3.4, -1.96)} fill="var(--s2)" />
      <path d={area(1.96, 3.4)} fill="var(--s2)" />
      <Line pts={curve(-3.4, 3.4)} />
      <path d="M30 320H390" stroke="var(--mid)" />
      <T x={210} y={270} anchor="middle">95%</T>
      <T x={108} y={348} anchor="middle">−1.96</T>
      <T x={210} y={348} anchor="middle">0</T>
      <T x={312} y={348} anchor="middle">1.96</T>
      <rect x="30" y="374" width="14" height="14" rx="3" fill="var(--s2)" />
      <T x={54} y={388}>Reject the null hypothesis</T>
      <T x={440} y={62} strong size={22}>Regression</T>
      <Axes x={440} y={92} w={330} h={228} />
      <path d={`${path(up)}${path([...lo].reverse()).replace("M", "L")}Z`} fill="var(--s2)" opacity=".2" />
      <Dots pts={pts} color="var(--s1)" />
      <Line pts={xs.map((x): Pt => [x, f.at(x)])} color="var(--s2)" />
      <T x={440} y={388}>Fitted line with 95% interval</T>
    </>
  );
}

const charts: Record<ChartName, { draw: () => ReactNode; label: string; note?: string }> = {
  bi: { draw: Bi, label: "Example dashboard with a monthly trend line, bars by region, weekly columns and a channel share bar" },
  ml: { draw: Ml, label: "Three machine learning plots: a classification boundary, a regression line and three clusters" },
  eda: { draw: Eda, label: "Exploratory plots: a correlation heatmap, a histogram, box plots with outliers and a scatter plot" },
  data: {
    draw: DataFlow,
    label: "Data pipeline: files, APIs and databases are cleaned and transformed in Python into a structured table for analysis and machine learning",
    note: "Illustrative workflow",
  },
  time: { draw: Time, label: "Time series with a 12-period moving average, a forecast range, a trend and a seasonal pattern" },
  stats: { draw: Stats, label: "A normal distribution with two-sided rejection regions at 1.96, and a regression line with its 95 percent interval" },
};

export default function TopicChart({
  name,
  frame,
  className = "",
}: {
  name: ChartName;
  frame: string;
  className?: string;
}) {
  const { draw: Draw, label, note = "Illustrative, synthetic data" } = charts[name];
  return (
    <figure className={className}>
      <style href="topic-chart" precedence="default">
        {css}
      </style>
      <div className={`dsc overflow-hidden rounded-3xl ${frame}`}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full">
          <Draw />
        </svg>
      </div>
      <figcaption className="mt-2 text-xs text-muted">{note}</figcaption>
    </figure>
  );
}
