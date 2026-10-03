// Explanatory drawings for the guides. Each one shows only what its guide states (ply orders, ITTF limits, our hardness
// bands from hardness.ts), and the schematic ones say so in their caption.
import { bandLabels, bandOrder, bandThresholds } from "../hardness";
import { bladeSvg } from "../illustrations";
import type { GuideDiagram, Handle } from "../models";
import { cn } from "~/lib/utils";

const FIBRE = /fibre/i;

function PlyStack({ title, plies }: { title: string; plies: string[] }) {
  const core = Math.floor(plies.length / 2);
  return (
    <div className="min-w-0 flex-1">
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <div className="space-y-0.5">
        {plies.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                "flex-1 rounded-sm ring-1 ring-black/10",
                i === core ? "h-7" : "h-4",
                FIBRE.test(p)
                  ? "bg-[repeating-linear-gradient(45deg,#1f2937_0,#1f2937_4px,#4b5563_4px,#4b5563_8px)]"
                  : i === core
                    ? "bg-amber-100"
                    : i === 0 || i === plies.length - 1
                      ? "bg-amber-300"
                      : "bg-amber-200",
              )}
            />
            <span className={cn("w-24 shrink-0 text-xs", FIBRE.test(p) ? "font-semibold text-foreground" : "text-muted-foreground")}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stacks({ stacks }: { stacks: { title: string; plies: string[] }[] }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
      {stacks.map((s) => (
        <PlyStack key={s.title} {...s} />
      ))}
    </div>
  );
}

const handleNames: [Handle, string][] = [
  ["FL", "Flared"],
  ["ST", "Straight"],
  ["AN", "Anatomic"],
  ["CS", "Chinese penhold"],
  ["JP", "Japanese penhold"],
];

function Handles() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {handleNames.map(([h, name]) => (
        <div key={h} className="text-center">
          <div
            className="mx-auto h-36 w-24 [&>svg]:h-full [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: bladeSvg({ id: `guide-${h}`, name, outerWood: null, handles: [h] }, `${name} (${h}) handle`) }}
          />
          <p className="mt-1 text-sm font-semibold">{h}</p>
          <p className="text-xs text-muted-foreground">{name}</p>
        </div>
      ))}
    </div>
  );
}

/** Edge-on views of the three covering builds the rubber guides describe. */
function RubberSection() {
  const W = 220;
  const pipRow = (y: number, h: number, w: number, up: boolean, cls: string) =>
    Array.from({ length: 9 }, (_, i) => {
      const x = 18 + i * 22;
      return <rect key={i} x={x} y={up ? y - h : y} width={w} height={h} rx={1} className={cls} />;
    });
  const panels = [
    {
      title: "Inverted (pips in)",
      body: (
        <>
          <rect x={10} y={30} width={200} height={6} className="fill-red-600" />
          {pipRow(36, 6, 8, false, "fill-red-600")}
          <rect x={10} y={36} width={200} height={34} className="fill-orange-200 dark:fill-orange-300" opacity={0.9} />
          {pipRow(36, 6, 8, false, "fill-red-600")}
        </>
      ),
      labels: [
        ["Topsheet, smooth side out", 33],
        ["Sponge", 55],
      ],
    },
    {
      title: "Pips out on sponge",
      body: (
        <>
          {pipRow(46, 8, 10, true, "fill-red-600")}
          <rect x={10} y={46} width={200} height={5} className="fill-red-600" />
          <rect x={10} y={51} width={200} height={19} className="fill-orange-200 dark:fill-orange-300" opacity={0.9} />
        </>
      ),
      labels: [
        ["Pimples face the ball", 40],
        ["Sponge", 62],
      ],
    },
    {
      title: "Pips out, no sponge (OX)",
      body: (
        <>
          {pipRow(64, 16, 7, true, "fill-red-600")}
          <rect x={10} y={64} width={200} height={6} className="fill-red-600" />
        </>
      ),
      labels: [
        ["Pimples straight on the blade", 52],
        ["", 0],
      ],
    },
  ];
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {panels.map((p) => (
        <div key={p.title}>
          <p className="mb-1 text-sm font-semibold">{p.title}</p>
          <svg viewBox={`0 0 ${W} 92`} role="img" aria-label={`${p.title}: cross-section`} className="w-full">
            {p.body}
            <rect x={10} y={70} width={200} height={14} className="fill-amber-300" />
            <text x={14} y={81} className="fill-amber-950 text-[9px]">
              Blade
            </text>
          </svg>
          <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            {p.labels.filter(([l]) => l).map(([l]) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Two pimples drawn to the T4 ratios the pips guide quotes: height ÷ top diameter, "Long" above 0.89, max 1.10. */
function PipsShapes() {
  const examples = [
    { label: "Out (short pips)", ratio: 0.6, note: "ratio 0.89 or less" },
    { label: "Long", ratio: 1.05, note: "ratio above 0.89, at most 1.10" },
  ];
  const D = 40; // top diameter in px
  return (
    <div className="flex flex-wrap items-end justify-center gap-12">
      {examples.map((e) => {
        const H = Math.round(D * e.ratio);
        return (
          <div key={e.label} className="text-center">
            <svg viewBox="0 0 120 80" className="w-40" role="img" aria-label={`${e.label} pimple, height ${e.ratio} times the top diameter`}>
              <rect x={10} y={66} width={100} height={6} className="fill-red-600" />
              <path d={`M${60 - D / 2 - 4} 66 L${60 - D / 2} ${66 - H} L${60 + D / 2} ${66 - H} L${60 + D / 2 + 4} 66 Z`} className="fill-red-600" />
              <line x1={60 - D / 2} x2={60 + D / 2} y1={66 - H - 6} y2={66 - H - 6} className="stroke-foreground" strokeWidth={1} />
              <line x1={60 + D / 2 + 10} x2={60 + D / 2 + 10} y1={66 - H} y2={66} className="stroke-foreground" strokeWidth={1} />
              <text x={60} y={66 - H - 9} textAnchor="middle" className="fill-muted-foreground text-[7px]">
                top diameter
              </text>
              <text x={60 + D / 2 + 13} y={66 - H / 2 + 2} className="fill-muted-foreground text-[7px]">
                height
              </text>
            </svg>
            <p className="text-sm font-semibold">{e.label}</p>
            <p className="text-xs text-muted-foreground">{e.note}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Example sponge sizes against the 4.0 mm covering limit (topsheet, sponge and glue together). */
function SpongeThickness() {
  const max = 4.4;
  const pct = (mm: number) => `${(mm / max) * 100}%`;
  const sizes = [1.5, 1.8, 2.0, 2.2];
  return (
    <div className="space-y-2 pe-2">
      {sizes.map((mm) => (
        <div key={mm} className="flex items-center gap-3 text-xs">
          <span className="w-14 shrink-0 text-end text-muted-foreground">{mm.toFixed(1)} mm</span>
          <div className="relative h-5 flex-1">
            <div className="absolute inset-y-0 start-0 rounded-e bg-orange-300" style={{ width: pct(mm) }} title={`${mm} mm sponge`} />
            <div className="absolute inset-y-0 border-s-2 border-dashed border-red-600" style={{ insetInlineStart: pct(4.0) }} />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 text-xs">
        <span className="w-14 shrink-0" />
        <div className="relative h-8 flex-1 text-muted-foreground">
          {[0, 1, 2, 3, 4].map((t) => (
            <span key={t} className="absolute top-0 -translate-x-1/2" style={{ insetInlineStart: pct(t) }}>
              {t} mm
            </span>
          ))}
          <span className="absolute top-4 -translate-x-full pe-1 font-semibold whitespace-nowrap text-red-700 dark:text-red-400" style={{ insetInlineStart: pct(4.0) }}>
            4.0 mm limit
          </span>
        </div>
      </div>
    </div>
  );
}

const bandFill: Record<(typeof bandOrder)[number], string> = {
  // Validated ordinal ramps (one hue, light to dark on light surfaces; reversed brightness on dark).
  soft: "bg-[#86b6ef] text-slate-900 dark:bg-[#184f95] dark:text-white",
  medium: "bg-[#5598e7] text-slate-900 dark:bg-[#256abf] dark:text-white",
  "medium-hard": "bg-[#2a78d6] text-white dark:bg-[#3987e5] dark:text-slate-900",
  hard: "bg-[#1c5cab] text-white dark:bg-[#6da7ec] dark:text-slate-900",
  "very-hard": "bg-[#104281] text-white dark:bg-[#9ec5f4] dark:text-slate-900",
};

/** Our five bands on each scale, from the same thresholds the filters use. Rows align by band, not by degree. */
function HardnessBands() {
  const scales = [
    ["esn", "European (ESN)"],
    ["japanese", "Japanese"],
    ["chinese", "Chinese"],
  ] as const;
  const range = (t: [number, number, number, number], i: number) =>
    i === 0 ? `under ${t[0]}°` : i === 4 ? `${t[3]}° +` : `${t[i - 1]}–${t[i] - 0.5}°`;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-separate border-spacing-0.5 text-xs">
        <caption className="sr-only">Hardness bands by scale</caption>
        <thead>
          <tr>
            <th className="w-28 p-1.5 text-start font-medium text-muted-foreground">Scale</th>
            {bandOrder.map((b) => (
              <th key={b} scope="col" className="p-1.5 text-center font-semibold">
                {bandLabels[b]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scales.map(([scale, name]) => (
            <tr key={scale}>
              <th scope="row" className="p-1.5 text-start font-medium">
                {name}
              </th>
              {bandOrder.map((b, i) => (
                <td key={b} title={`${name} scale, ${bandLabels[b].toLowerCase()}: ${range(bandThresholds[scale], i)}`} className={cn("rounded p-2 text-center font-semibold tabular-nums", bandFill[b])}>
                  {range(bandThresholds[scale], i)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The class names Paddle Palace's guide orders from OFF+ to DEF-. Brands use their own subsets and wording. */
function SpeedClasses() {
  const classes = ["OFF+", "OFF", "OFF-", "ALL+", "ALL", "ALL-", "DEF+", "DEF", "DEF-"];
  return (
    <div>
      <div className="grid grid-cols-9 gap-1">
        {classes.map((c, i) => (
          <div
            key={c}
            className={cn(
              "rounded-md py-2 text-center text-xs font-semibold sm:text-sm",
              i < 3 ? "bg-[#1c5cab] text-white" : i < 6 ? "bg-[#5598e7] text-slate-900" : "bg-[#b7d3f6] text-slate-900",
            )}
          >
            {c}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 text-center text-xs text-muted-foreground">
        <span>Offensive</span>
        <span>All-round</span>
        <span>Defensive</span>
      </div>
      <div className="mt-1 flex justify-between text-xs font-medium">
        <span>← Faster</span>
        <span>Slower →</span>
      </div>
    </div>
  );
}

/** andro's published ultramax build and Butterfly's published range for its 2.1 sponge, against the 4.0 mm limit. */
function MaxSponge() {
  const scale = 4.4;
  const pct = (mm: number) => `${(mm / scale) * 100}%`;
  return (
    <div className="space-y-4 text-xs">
      <div>
        <p className="mb-1 font-semibold">andro ultramax: 1.7 mm topsheet + 2.3 mm sponge</p>
        <div className="relative flex h-7 overflow-hidden rounded">
          <div className="flex items-center justify-center bg-red-600 font-semibold text-white" style={{ width: pct(1.7) }}>
            Topsheet 1.7
          </div>
          <div className="flex items-center justify-center bg-orange-300 font-semibold text-slate-900" style={{ width: pct(2.3) }}>
            Sponge 2.3
          </div>
          <div className="absolute inset-y-0 border-s-2 border-dashed border-foreground" style={{ insetInlineStart: pct(4.0) }} />
        </div>
      </div>
      <div>
        <p className="mb-1 font-semibold">Butterfly "2.1" sponge: 1.9 to 2.2 mm</p>
        <div className="relative h-7">
          <div className="absolute inset-y-1 rounded bg-orange-300/40" style={{ insetInlineStart: 0, width: pct(2.2) }} />
          <div className="absolute inset-y-0 flex items-center justify-center rounded bg-orange-300 font-semibold text-slate-900" style={{ insetInlineStart: pct(1.9), width: `calc(${pct(2.2)} - ${pct(1.9)})` }}>
            1.9–2.2
          </div>
          <div className="absolute inset-y-0 border-s-2 border-dashed border-foreground" style={{ insetInlineStart: pct(4.0) }} />
        </div>
      </div>
      <div className="relative h-5 text-muted-foreground">
        {[0, 1, 2, 3, 4].map((t) => (
          <span key={t} className="absolute -translate-x-1/2" style={{ insetInlineStart: pct(t) }}>
            {t} mm
          </span>
        ))}
      </div>
      <p className="text-muted-foreground">Dashed line: the ITTF's 4.0 mm limit for the whole covering.</p>
    </div>
  );
}

/** The colours Law 2.4.6 and the 2021 change allow: black on one side, one bright colour on the other. */
function ColourRules() {
  const bright = [
    ["Red", "#c8102e", "since 1986"],
    ["Blue", "#1f5fbf", "since 1 Oct 2021"],
    ["Green", "#2e8b57", "since 1 Oct 2021"],
    ["Pink", "#e0457b", "since 1 Oct 2021"],
    ["Violet", "#6b3fa0", "since 1 Oct 2021"],
  ];
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center">
      <div className="text-center">
        <div className="mx-auto size-16 rounded-full bg-[#1c1c1e] ring-1 ring-white/20" />
        <p className="mt-1 text-sm font-semibold">Black</p>
        <p className="text-xs text-muted-foreground">one side, always</p>
      </div>
      <span className="self-center text-2xl font-bold text-muted-foreground">+</span>
      <div className="grid grid-cols-5 gap-3">
        {bright.map(([name, hex, since]) => (
          <div key={name} className="text-center">
            <div className="mx-auto size-12 rounded-full" style={{ background: hex }} />
            <p className="mt-1 text-xs font-semibold">{name}</p>
            <p className="text-[10px] leading-tight text-muted-foreground">{since}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Anchor products from the hardness guide on their own scales, joined only where a maker publishes both figures. */
function ScaleAnchors() {
  const scales = [
    { name: "Japanese", lo: 25, hi: 50, marks: [["Tenergy 05", 36, 36], ["Dignics 05", 40, 40], ["Fastarc G-1 (Japan site)", 37.5, 37.5]] },
    { name: "European (ESN)", lo: 35, hi: 60, marks: [["Rasanter R47", 47, 47], ["Evolution MX-P", 47.5, 47.5], ["Fastarc G-1 (German figure)", 47.5, 47.5]] },
    { name: "Chinese", lo: 30, hi: 55, marks: [["Hurricane 3 options", 37, 41]] },
  ] as const;
  return (
    <div className="space-y-5">
      {scales.map((sc) => (
        <div key={sc.name}>
          <p className="text-xs font-semibold">{sc.name} scale</p>
          <div className="relative mx-2 my-3 h-4">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            {sc.marks.map(([label, a, b]) => {
              const left = ((a - sc.lo) / (sc.hi - sc.lo)) * 100;
              const width = ((b - a) / (sc.hi - sc.lo)) * 100;
              const colour = label.startsWith("Fastarc") ? "bg-[#eb6834] dark:bg-[#d95926]" : "bg-[#2a78d6] dark:bg-[#3987e5]";
              return a === b ? (
                <span
                  key={label}
                  title={`${label}: ${a}°`}
                  className={cn("absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card", colour)}
                  style={{ insetInlineStart: `${left}%` }}
                />
              ) : (
                <span
                  key={label}
                  title={`${label}: ${a}–${b}°`}
                  className={cn("absolute top-1/2 h-3 -translate-y-1/2 rounded-full ring-2 ring-card", colour)}
                  style={{ insetInlineStart: `${left}%`, width: `${width}%` }}
                />
              );
            })}
          </div>
          <div className="mx-2 flex justify-between text-[10px] text-muted-foreground">
            <span>{sc.lo}°</span>
            <span>{sc.hi}°</span>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {sc.marks.map(([label, a, b]) => (
              <li key={label}>
                <span className={cn("me-1 inline-block size-2 rounded-full", label.startsWith("Fastarc") ? "bg-[#eb6834]" : "bg-[#2a78d6]")} />
                {label}: <span className="font-semibold text-foreground tabular-nums">{a === b ? `${a}°` : `${a}–${b}°`}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        <span className="me-1 inline-block size-2 rounded-full bg-[#eb6834]" />
        Nittaku prints both figures for Fastarc G-1 (37.5 on its Japanese scale, 47.5 by the German standard): the only
        published bridge between two scales we found.
      </p>
    </div>
  );
}

export type BladePoint = { name: string; brandName: string; href: string; thickness: number; weight: number; group: "all-wood" | "outer" | "inner" | "unstated" };

const groupStyle: Record<BladePoint["group"], { label: string; fill: string; dot: string }> = {
  "all-wood": { label: "All-wood", fill: "fill-[#2a78d6] dark:fill-[#3987e5]", dot: "bg-[#2a78d6] dark:bg-[#3987e5]" },
  outer: { label: "Outer composite", fill: "fill-[#eb6834] dark:fill-[#d95926]", dot: "bg-[#eb6834] dark:bg-[#d95926]" },
  inner: { label: "Inner composite", fill: "fill-[#1baf7a] dark:fill-[#199e70]", dot: "bg-[#1baf7a] dark:bg-[#199e70]" },
  unstated: { label: "Composite, position not published", fill: "fill-none stroke-muted-foreground", dot: "border border-muted-foreground" },
};

/** Every catalogue blade with a published thickness and weight. Hover a dot for the blade; click to open it. */
function BladeThicknessWeight({ points }: { points: BladePoint[] }) {
  const W = 600, H = 300, L = 40, B = 34, T = 10, R = 10;
  const tx = [5, 5.5, 6, 6.5, 7, 7.5];
  const wy = [70, 80, 90, 100];
  const x = (v: number) => L + ((v - 5) / 2.6) * (W - L - R);
  const y = (v: number) => H - B - ((v - 65) / 40) * (H - B - T);
  const inRange = points.filter((p) => p.thickness >= 5 && p.thickness <= 7.6 && p.weight >= 65 && p.weight <= 105);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Thickness against weight for ${inRange.length} blades`}>
        {wy.map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="stroke-border" strokeWidth={1} />
            <text x={L - 6} y={y(v) + 4} textAnchor="end" className="fill-muted-foreground text-[11px]">
              {v} g
            </text>
          </g>
        ))}
        {tx.map((v) => (
          <text key={v} x={x(v)} y={H - B + 18} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            {v} mm
          </text>
        ))}
        <line x1={x(6)} x2={x(6)} y1={T} y2={H - B} className="stroke-foreground" strokeDasharray="4 4" strokeWidth={1} />
        <text x={x(6) + 4} y={T + 10} className="fill-muted-foreground text-[10px]">
          Megaspin's 6 mm divide
        </text>
        {inRange.map((p) => (
          <a key={p.href} href={p.href}>
            <circle cx={x(p.thickness)} cy={y(p.weight)} r={5} className={cn(groupStyle[p.group].fill, "stroke-card")} strokeWidth={p.group === "unstated" ? 1.5 : 2}>
              <title>{`${p.brandName} ${p.name}: ${p.thickness} mm, ${p.weight} g`}</title>
            </circle>
          </a>
        ))}
      </svg>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {(Object.keys(groupStyle) as BladePoint["group"][]).map((g) => (
          <li key={g} className="flex items-center gap-1.5">
            <span className={cn("inline-block size-2.5 rounded-full", groupStyle[g].dot)} />
            {groupStyle[g].label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GuideDiagramView({ diagram, bladePoints = [] }: { diagram: GuideDiagram; bladePoints?: BladePoint[] }) {
  switch (diagram) {
    case "speed-classes":
      return <SpeedClasses />;
    case "max-sponge":
      return <MaxSponge />;
    case "colour-rules":
      return <ColourRules />;
    case "scale-anchors":
      return <ScaleAnchors />;
    case "blade-thickness-weight":
      return <BladeThicknessWeight points={bladePoints} />;
    case "layup-outer-inner":
      return (
        <Stacks
          stacks={[
            { title: "Outer fibre (5+2)", plies: ["Outer veneer", "Fibre", "Inner ply", "Core", "Inner ply", "Fibre", "Outer veneer"] },
            { title: "Inner fibre (5+2)", plies: ["Outer veneer", "Inner ply", "Fibre", "Core", "Fibre", "Inner ply", "Outer veneer"] },
          ]}
        />
      );
    case "plies-5-7":
      return (
        <Stacks
          stacks={[
            { title: "5-ply all-wood", plies: ["Outer veneer", "Second ply", "Core", "Second ply", "Outer veneer"] },
            { title: "7-ply all-wood", plies: ["Outer veneer", "Second ply", "Third ply", "Core", "Third ply", "Second ply", "Outer veneer"] },
          ]}
        />
      );
    case "handles":
      return <Handles />;
    case "rubber-section":
      return <RubberSection />;
    case "pips-heights":
      return <PipsShapes />;
    case "sponge-thickness":
      return <SpongeThickness />;
    case "hardness-bands":
      return <HardnessBands />;
  }
}
