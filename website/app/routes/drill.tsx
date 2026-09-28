import { ArrowLeft, Clock, Lightbulb, ListChecks, Printer } from "lucide-react";
import { data, Link } from "react-router";
import type { Route } from "./+types/drill";
import { CtaSection } from "~/components/site/cta-section";
import { DrillCard } from "~/components/site/drill-card";
import { DrillChecklist } from "~/components/site/drill-checklist";
import { Faq, faqJsonLd, JsonLd } from "~/components/site/faq";
import { Button } from "~/components/ui/button";
import { drillCount, drills, getDrill, sessionTypeLabel, totalMinutes } from "~/content/drills";
import { SITE_URL } from "~/content/site";
import { seo } from "~/lib/seo";

export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const drill = getDrill(params.slug);
  if (!drill) throw data(null, { status: 404 });
  return drill;
}

// Prerendering with ssr:false runs the loader at build time.
export const loader = clientLoader;

export const meta: Route.MetaFunction = ({ loaderData }) =>
  loaderData
    ? seo({ title: loaderData.metaTitle, description: loaderData.metaDescription, path: `/drills/${loaderData.slug}` })
    : [{ title: "Drill not found | TT Tracker" }];

export default function DrillPage({ loaderData: drill }: Route.ComponentProps) {
  const more = drills.filter((d) => d.slug !== drill.slug).slice(0, 3);
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: drill.title,
    description: drill.metaDescription,
    totalTime: `PT${totalMinutes(drill)}M`,
    url: `${SITE_URL}/drills/${drill.slug}`,
    step: drill.blocks.flatMap((b) =>
      b.items.map((it) => ({ "@type": "HowToStep", name: it.name, text: it.note ?? `${it.minutes} minutes` })),
    ),
  };

  return (
    <>
      <JsonLd data={howTo} />
      <JsonLd data={faqJsonLd(drill.faqs)} />
      <article className="px-4 pt-28 pb-12 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link to="/drills" className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All training plans
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-accent text-4xl">{drill.emoji}</span>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-secondary px-2.5 py-1">{drill.level}</span>
              <span className="rounded-full bg-secondary px-2.5 py-1">{sessionTypeLabel[drill.sessionType]}</span>
            </div>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{drill.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{drill.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-sm font-medium">
              <Clock className="size-4 text-primary" /> {totalMinutes(drill)} minutes
            </span>
            <span className="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-sm font-medium">
              <ListChecks className="size-4 text-primary" /> {drillCount(drill)} drills
            </span>
            <Button variant="outline" className="no-print rounded-full" onClick={() => window.print()}>
              <Printer /> Print
            </Button>
          </div>

          <DrillChecklist drill={drill} />

          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Tips to get more out of it</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {drill.tips.map((t) => (
                <div key={t.title} className="rounded-3xl border bg-card p-5">
                  <Lightbulb className="size-5 text-tertiary" />
                  <h3 className="mt-3 font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
            <div className="mt-6">
              <Faq items={drill.faqs} />
            </div>
          </section>
        </div>
      </article>

      <section className="no-print bg-surface-low px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight">More training plans</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((d) => (
              <DrillCard key={d.slug} drill={d} />
            ))}
          </div>
        </div>
      </section>

      <div className="no-print">
        <CtaSection
          title="Did the session? Log it in 30 seconds."
          subtitle={`Save it as a ${sessionTypeLabel[drill.sessionType]} session with its duration and effort, and watch your streak build.`}
        />
      </div>
    </>
  );
}
