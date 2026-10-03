// Cross-section of a blade drawn from the maker's published ply order. Only shown when that order is published, and
// labelled as a schematic: makers don't publish individual ply thicknesses.
const COMPOSITE = /carbon|alc|zlc|zlf|zylon|aramid|kevlar|texalium|fib|glass|basalt|tamca|composite|textreme/i;

function plyStyle(name: string): string {
  if (COMPOSITE.test(name)) return "bg-[repeating-linear-gradient(45deg,#1f2937_0,#1f2937_4px,#4b5563_4px,#4b5563_8px)]";
  if (/kiri|ayous|balsa|abachi/i.test(name)) return "bg-amber-100 dark:bg-amber-200";
  if (/limba|koto|hinoki|walnut|wenge|ebony/i.test(name)) return "bg-amber-300 dark:bg-amber-400";
  return "bg-amber-200 dark:bg-amber-300";
}

export function PlyDiagram({ plies }: { plies: string[] }) {
  const core = Math.floor(plies.length / 2);
  return (
    <figure className="rounded-3xl border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight">Construction</h2>
      <div className="mt-4 space-y-0.5" role="img" aria-label={`Ply order: ${plies.join(", ")}`}>
        {plies.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`${plyStyle(p)} ${plies.length % 2 === 1 && i === core ? "h-7" : "h-4"} flex-1 rounded-sm ring-1 ring-black/10`} />
            <span className="w-40 shrink-0 text-xs text-muted-foreground">{p}</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Ply order as published by the maker. Schematic, not to scale; composite layers are hatched.
      </figcaption>
    </figure>
  );
}
