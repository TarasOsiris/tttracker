// Small shared pieces of the equipment pages.
import { ArrowLeftRight, ExternalLink, Info } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../labels";
import type { BrandRef, PlayerRef } from "../store.server";
import type { Fact, Image, ManufacturerRating, Source, Status } from "../models";
import { BrandLogo, Credit, PlayerAvatar } from "./Media";
import { cn } from "~/lib/utils";
import { inline } from "~/components/site/legal-page";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="max-w-3xl">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </header>
  );
}

export function Pill({ children, tone = "muted", className }: { children: React.ReactNode; tone?: "muted" | "primary" | "warn"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tone === "primary" && "bg-primary/10 text-primary",
        tone === "muted" && "bg-secondary text-secondary-foreground",
        tone === "warn" && "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusPill({ status }: { status: Status }) {
  return status === "discontinued" ? <Pill tone="warn">Discontinued</Pill> : null;
}

export type SpecRow = { label: string; value: React.ReactNode; hint?: string };

export function SpecTable({ rows, title }: { rows: SpecRow[]; title?: string }) {
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-6">
      {title && <h2 className="mb-3 text-lg font-bold tracking-tight">{title}</h2>}
      <dl className="divide-y">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-2.5 text-sm">
            <dt className="text-muted-foreground">
              {r.label}
              {r.hint && <span className="mt-0.5 block text-xs opacity-80">{r.hint}</span>}
            </dt>
            <dd className="font-medium text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Manufacturer ratings, always captioned with whose scale they are on and never charted against other brands. */
export function RatingsBlock({ ratings, brand }: { ratings: ManufacturerRating[]; brand: BrandRef }) {
  if (ratings.length === 0) return null;
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight">{brand.name}'s own ratings</h2>
      <dl className="mt-3 flex flex-wrap gap-3">
        {ratings.map((r) => (
          <div key={r.label} className="min-w-28 rounded-2xl bg-secondary px-4 py-3">
            <dt className="text-xs text-muted-foreground">{r.label}</dt>
            <dd className="font-display text-2xl font-extrabold text-foreground">
              {r.value}
              {r.max != null && <span className="text-sm font-medium text-muted-foreground"> / {r.max}</span>}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex gap-1.5 text-xs leading-snug text-muted-foreground">
        <Info className="mt-px size-3.5 shrink-0" />
        <span>
          Manufacturer rating on {brand.name}'s own scale. Brands rate differently, so these numbers can't be compared with
          another brand's.{brand.ratingNote ? ` ${brand.ratingNote}` : ""}
        </span>
      </p>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 leading-relaxed text-muted-foreground">
      {paragraphs.map((p, i) => (
        <p key={i}>{inline(p)}</p>
      ))}
    </div>
  );
}

export function Facts({ facts, sources }: { facts: Fact[]; sources: Source[] }) {
  if (facts.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight">Did you know?</h2>
      <ul className="mt-3 space-y-3">
        {facts.map((f) => {
          const s = sources.find((x) => x.url === f.source);
          return (
            <li key={f.text} className="rounded-2xl border bg-card p-4 text-sm leading-relaxed">
              {inline(f.text)}{" "}
              <a href={f.source} target="_blank" rel="noopener noreferrer" className="text-xs whitespace-nowrap text-primary underline-offset-2 hover:underline">
                Source{s ? `: ${s.label}` : ""}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Notes({ notes }: { notes?: string[] }) {
  if (!notes?.length) return null;
  return (
    <section className="rounded-3xl border border-amber-300/60 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-200">
      <h2 className="font-semibold">Spec notes</h2>
      <ul className="mt-2 list-disc space-y-1.5 ps-5">
        {notes.map((n) => (
          <li key={n}>{inline(n)}</li>
        ))}
      </ul>
    </section>
  );
}

const kindLabel: Record<Source["kind"], string> = {
  manufacturer: "Manufacturer",
  ittf: "ITTF",
  retailer: "Retailer",
  press: "Press",
  player: "Player",
  reference: "Reference",
};

export function Sources({ sources, lastVerified }: { sources: Source[]; lastVerified?: string }) {
  return (
    <section className="text-sm">
      <h2 className="text-lg font-bold tracking-tight">Sources</h2>
      {lastVerified && <p className="mt-1 text-muted-foreground">Specs last checked against these sources on {formatDate(lastVerified)}.</p>}
      <ul className="mt-3 space-y-1.5">
        {sources.map((s) => (
          <li key={s.url} className="flex items-baseline gap-2">
            <Pill className="shrink-0">{kindLabel[s.kind]}</Pill>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-1 text-primary underline-offset-2 hover:underline">
              {s.label}
              <ExternalLink className="size-3 shrink-0 translate-y-px" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Spotted a wrong value? Email <a href="mailto:info@ninevastudios.com" className="underline">info@ninevastudios.com</a> with a source and we'll fix it.
      </p>
    </section>
  );
}

const slotLabel = { blade: "Blade", forehand: "Forehand", backhand: "Backhand" } as const;

export function UsedBy({ players }: { players: PlayerRef[] }) {
  if (players.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight">Used by tracked pros</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {players.map((p) => (
          <li key={`${p.id}-${p.slot}`}>
            <Link to={`/equipment/pros/${p.id}`} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm hover:border-primary/40">
              <PlayerAvatar photo={p.photo} name={p.name} country={p.country} className="size-6 text-xs" />
              {p.name}
              <span className="text-xs text-muted-foreground">
                {slotLabel[p.slot]}
                {p.variant ? ` · ${p.variant}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">Pros often use custom or national-team versions; see each player's page for the details and source.</p>
    </section>
  );
}

/** The maker's product photo, or the spec-drawn illustration (labelled as such) when there is no photo. */
export function ProductFigure({ photo, alt, illustration, note }: { photo?: Image; alt: string; illustration: string; note: string }) {
  return (
    <figure className="rounded-3xl border bg-card p-5 sm:p-6">
      <div className="flex justify-center rounded-2xl bg-white p-3">
        <img
          src={photo?.src ?? illustration}
          alt={photo ? alt : `Illustration: ${alt}`}
          width={photo?.width ?? 240}
          height={photo?.height ?? 260}
          fetchPriority="high"
          className="h-64 w-auto max-w-full object-contain"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-snug text-muted-foreground">
        {photo ? (
          <>
            Photo: <Credit image={photo} />, from the maker's product page.
          </>
        ) : (
          <>Illustration drawn from the published specs ({note}). Not a product photo.</>
        )}
      </figcaption>
    </figure>
  );
}

/** Title block of a blade or rubber page: brand logo, name, summary and tags, with the product image beside it. */
export function ItemHero({
  brand,
  kind,
  title,
  summary,
  tags,
  compareHref,
  figure,
}: {
  brand: BrandRef;
  kind: "Blade" | "Rubber";
  title: string;
  summary: string;
  tags: React.ReactNode;
  compareHref: string;
  figure: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
      <header>
        <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-primary uppercase">
          <BrandLogo logo={brand.logo} name={brand.name} className="h-7" />
          {brand.logo ? kind : `${brand.name} ${kind.toLowerCase()}`}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">{tags}</div>
        <Link
          to={compareHref}
          className="mt-6 inline-flex h-10 items-center gap-1.5 rounded-full border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-secondary"
        >
          <ArrowLeftRight className="size-4" /> Compare with others
        </Link>
      </header>
      {figure}
    </div>
  );
}
