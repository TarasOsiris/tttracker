import { BookOpen, CirclePlay, Target, Trophy } from "lucide-react";
import { data, Link } from "react-router";
import type { Route } from "./+types/player-profile";
import { CtaSection } from "~/components/site/cta-section";
import { formatDate } from "~/content/blog";
import { SITE_URL } from "~/content/site";
import { Credit, ProductThumb } from "~/equipment/components/Media";
import { SetupCell, setupLabel } from "~/equipment/components/SetupCell";
import { flag } from "~/equipment/labels";
import type { PageHandle } from "~/i18n/config";
import { seo } from "~/lib/seo";
import { PlayerCard, RankingNote } from "~/players/components";
import { profileDetail } from "~/players/store.server";
import { breadcrumbList } from "~/serves/utils/seo";

export const handle: PageHandle = { locales: ["en"] };

export function loader({ params }: Route.LoaderArgs) {
  const profile = profileDetail(params.playerId);
  if (!profile) throw data("Player profile not found", { status: 404 });
  return profile;
}

export const meta: Route.MetaFunction = ({ data: page }) => {
  if (!page) return [];
  const { summary: p, profile, snapshot } = page;
  const path = `/players/${p.id}`;
  return [
    ...seo({ title: `${p.name}: Profile, Career, Playing Style & Equipment`, description: `${p.name} (${p.countryName}): biography, career milestones, playing style, sourced equipment and training ideas. World No. ${p.rank} on ${formatDate(snapshot.date)}.`, path, locale: "en", localized: false,
      ...(p.photo ? { image: { ...p.photo, alt: p.name } } : {}),
    }),
    { "script:ld+json": breadcrumbList("en", "Home", [{ name: "Player profiles", path: "/players" }, { name: p.name, path }]) },
    { "script:ld+json": {
      "@context": "https://schema.org", "@type": "ProfilePage", name: `${p.name} player profile`,
      url: `${SITE_URL}${path}`, dateModified: snapshot.checked,
      mainEntity: {
        "@type": "Person", "@id": `${SITE_URL}${path}#person`, name: p.name, jobTitle: "Table tennis player",
        memberOf: { "@type": "SportsOrganization", name: `${p.countryName} table tennis team` },
        ...(profile.birthDate ? { birthDate: profile.birthDate } : {}),
        ...(p.photo ? { image: `${SITE_URL}${p.photo.src}` } : {}),
        sameAs: profile.sources.map((s) => s.url),
      },
    } },
  ];
};

const sections = [
  ["story", "The story"], ["career", "Career"], ["game", "Playing style"],
  ["equipment", "Equipment"], ["practice", "Learn from them"], ["sources", "Sources"],
] as const;

function ageAt(birth: string, date: string) {
  return Number(date.slice(0, 4)) - Number(birth.slice(0, 4)) - (date.slice(5) < birth.slice(5) ? 1 : 0);
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return <div><p className="text-sm font-semibold tracking-wide text-primary uppercase">{label}</p><h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2></div>;
}

export default function PlayerProfile({ loaderData }: Route.ComponentProps) {
  const { summary: p, profile, equipment, snapshot, related, news } = loaderData;
  const videoUrl = `https://www.youtube.com/@WTT/search?query=${encodeURIComponent(p.name)}`;
  const facts = [
    ["Represents", p.countryName],
    ["Born", profile.birthDate ? formatDate(profile.birthDate) : String(profile.birthYear)],
    ...(profile.birthDate ? [[`Age on ${formatDate(snapshot.date)}`, `${ageAt(profile.birthDate, snapshot.date)} years`]] : []),
    ["Playing hand", p.hand ? `${p.hand === "left" ? "Left" : "Right"}-handed` : "Not verified"],
    ["Grip", p.grip === "penhold" ? "Penhold" : p.grip === "shakehand" ? "Shakehand" : "Not verified"],
    ["Game to study", p.specialty],
  ];

  return (
    <div lang="en">
      <article className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true">/</span>
          <Link to={`/players?tour=${p.gender}`} className="hover:text-primary">Player profiles</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{p.name}</span>
        </nav>

        <header className="overflow-hidden rounded-3xl bg-brand-navy text-white">
          <div className="grid md:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold tracking-widest text-blue-200 uppercase">{p.gender === "men" ? "Men’s" : "Women’s"} singles · Player profile</p>
              <h1 className="mt-5 font-display text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{p.name}</h1>
              <p className="mt-5 text-lg leading-relaxed text-blue-100">{p.headline}</p>
              <p className="mt-6 text-base"><span aria-hidden="true">{flag(p.country)} </span>{p.countryName} · {p.hand}-handed · {p.grip}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/20 pt-6">
                <div><p className="text-sm text-blue-200">World ranking</p><p className="mt-1 text-4xl font-bold">#{p.rank}</p></div>
                <div><p className="text-sm text-blue-200">Singles points</p><p className="mt-1 text-3xl font-bold">{p.points.toLocaleString("en-US")}</p></div>
                <p className="text-sm text-blue-100">ITTF week {snapshot.week}<br /><time dateTime={snapshot.date}>{formatDate(snapshot.date)}</time></p>
              </div>
            </div>
            {p.photo && <figure className="relative min-h-80 bg-white/10">
              <img src={p.photo.src} width={p.photo.width} height={p.photo.height} alt={`${p.name}, ${p.countryName} table tennis player`}
                fetchPriority="high" className="aspect-[4/5] h-full max-h-[38rem] w-full object-cover object-top" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-black/0 px-5 pt-12 pb-4 text-xs text-white">Photo: <Credit image={p.photo} /></figcaption>
            </figure>}
          </div>
        </header>

        <nav aria-label="On this profile" className="mt-6 flex flex-wrap gap-2 border-b pb-6">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary/60 hover:text-primary">{label}</a>)}
        </nav>

        <dl className="mt-8 grid gap-x-6 gap-y-5 rounded-2xl border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([label, value]) => <div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}
        </dl>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
          <section id="story" aria-label="The story" className="scroll-mt-24">
            <SectionTitle label="The story" title={`Get to know ${p.name}`} />
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">{profile.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <a href="#sources" className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">Biography and career sources</a>
          </section>
          <aside className="rounded-2xl border bg-surface-low p-6" aria-labelledby="watch-heading">
            <CirclePlay aria-hidden="true" className="size-6 text-primary" />
            <h2 id="watch-heading" className="mt-3 font-display text-xl font-bold">Watch with a purpose</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">Pick one question before watching a match. Follow the setup and recovery, as well as the winning shot.</p>
            <ul className="mt-4 list-disc space-y-3 ps-5 leading-relaxed marker:text-primary">{profile.watch.map((tip) => <li key={tip}>{tip}</li>)}</ul>
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Find matches on WTT’s YouTube</a>
          </aside>
        </div>

        <section id="career" className="mt-14 scroll-mt-24" aria-label="Career milestones">
          <SectionTitle label="Career milestones" title="The moments that shaped the player" />
          <p className="mt-3 text-muted-foreground">Selected milestones across singles, doubles and team competition; each links to its source.</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {profile.milestones.map((m) => <li key={`${m.year}-${m.title}`} className="rounded-2xl border bg-card p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary"><Trophy aria-hidden="true" className="size-4" />{m.year}</p>
              <h3 className="mt-3 font-display text-lg font-bold">{m.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{m.detail}</p>
              <a href={profile.sources[m.source].url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-primary underline underline-offset-4">{profile.sources[m.source].label}</a>
            </li>)}
          </ol>
        </section>

        <section id="game" className="mt-14 scroll-mt-24" aria-label="Playing style">
          <SectionTitle label="Playing style" title="A closer look at the game" />
          <p className="mt-3 text-muted-foreground">Our editorial study notes: patterns to look for in match footage, rather than measured performance ratings.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{profile.game.map((g) => <div key={g.title} className="rounded-2xl border-t-4 border-t-primary bg-surface-low p-6">
            <h3 className="font-display text-lg font-bold">{g.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{g.description}</p>
          </div>)}</div>
        </section>

        <section id="equipment" className="mt-14 scroll-mt-24" aria-label="Equipment">
          <SectionTitle label="Inside the racket" title={`${p.name}’s equipment`} />
          <p className="mt-3 leading-relaxed text-muted-foreground">From our equipment encyclopedia. Each component keeps its own source, date and confidence level. Custom versions are labelled; linked products may be the closest retail equivalent.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{([ ["blade", "Blade"], ["forehand", "Forehand rubber"], ["backhand", "Backhand rubber"] ] as const).map(([slot, label]) => {
            const visual = equipment.setupVisuals[slot];
            return <div key={slot} className="min-w-0 rounded-2xl border bg-card p-5">
              <p className="text-sm font-semibold text-muted-foreground">{label}</p>
              {visual && <Link to={visual.href} aria-label={`View ${setupLabel(equipment.setup[slot])}`} className="mt-4 block"><ProductThumb photo={visual.photo} fallback={visual.illustration} className="h-36 w-full" /></Link>}
              <div className="mt-4 [&_p]:text-sm"><SetupCell item={equipment.setup[slot]} slot={slot} detailed /></div>
            </div>;
          })}</div>
          <p className="mt-4 text-sm text-muted-foreground">Equipment last checked {formatDate(equipment.player.lastVerified)}. Professionals may change setups between events.</p>
          <Link to={`/equipment/pros/${p.id}`} className="mt-4 inline-block rounded-full border px-5 py-3 text-sm font-semibold text-primary hover:bg-secondary">View equipment history and documented changes</Link>
        </section>

        <section id="practice" className="mt-14 scroll-mt-24 rounded-3xl border bg-accent/40 p-6 sm:p-8" aria-labelledby="practice-heading">
          <Target aria-hidden="true" className="size-7 text-primary" />
          <p className="mt-4 text-sm font-semibold tracking-wide text-primary uppercase">Take it to the table</p>
          <h2 id="practice-heading" className="mt-2 font-display text-2xl font-bold">{profile.practice.title}</h2>
          <p className="mt-3 text-muted-foreground">A practice idea inspired by this profile, adaptable to your level.</p>
          <ol className="mt-5 list-decimal space-y-3 ps-6 leading-relaxed marker:font-semibold marker:text-primary">{profile.practice.steps.map((step) => <li key={step} className="ps-1">{step}</li>)}</ol>
          <p className="mt-5 font-medium">Focus: {profile.practice.goal}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/drills" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Explore training plans</Link>
            <Link to="/serves" className="rounded-full border border-primary/40 px-5 py-3 text-sm font-semibold text-primary hover:bg-accent">Study serves and receive</Link>
          </div>
        </section>

        {news.length > 0 && <section className="mt-14" aria-labelledby="news-heading">
          <h2 id="news-heading" className="font-display text-2xl font-bold">More on {p.name}</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">{news.map((post) => <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="block h-full rounded-2xl border bg-card p-5 hover:border-primary/60">
              <time dateTime={post.published} className="text-sm text-muted-foreground">{formatDate(post.published)}</time>
              <h3 className="mt-3 font-display text-lg font-bold">{post.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
            </Link>
          </li>)}</ul>
        </section>}

        <section id="sources" className="mt-14 scroll-mt-24 border-t pt-8" aria-labelledby="sources-heading">
          <div className="flex items-center gap-3"><BookOpen aria-hidden="true" className="size-5 text-primary" /><h2 id="sources-heading" className="font-display text-2xl font-bold">Sources & profile notes</h2></div>
          <p className="mt-4 leading-relaxed text-muted-foreground">Biography and career information reviewed {formatDate(snapshot.checked)}. Milestones are selected highlights, not a complete results archive. Playing-style notes and practice ideas are editorial analysis. Equipment has separate verification dates above.</p>
          {!profile.birthDate && <p className="mt-3 text-sm text-muted-foreground">Only the birth year is shown: a full date of birth has not been verified for this profile.</p>}
          <ul className="mt-5 list-disc space-y-3 ps-5 text-sm marker:text-primary">{profile.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="break-words text-primary underline underline-offset-4">{source.label}</a></li>)}</ul>
          <div className="mt-6"><RankingNote date={snapshot.date} week={snapshot.week} officialUrl={snapshot.officialUrl} /></div>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">{snapshot.sources.filter((s, i) => i === 0 || (p.gender === "men" ? i === 1 : i > 1)).map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{s.label}</a></li>)}</ul>
        </section>

        <section className="mt-14 border-t pt-8" aria-labelledby="related-heading">
          <div className="flex flex-wrap items-center justify-between gap-4"><h2 id="related-heading" className="font-display text-2xl font-bold">More players to study</h2><Link to={`/players?tour=${p.gender}`} className="text-sm font-medium text-primary underline underline-offset-4">All {p.gender === "men" ? "men’s" : "women’s"} top 10 profiles</Link></div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">{related.map((player) => <PlayerCard key={player.id} player={player} />)}</ul>
        </section>
      </article>
      <CtaSection title="Turn inspiration into progress" subtitle="Take one idea into your next session. Log your practice and matches to see what becomes part of your own game." />
    </div>
  );
}
