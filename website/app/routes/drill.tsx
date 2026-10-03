import { ArrowLeft, Clock, Lightbulb, ListChecks, Printer } from "lucide-react";
import { data, Link } from "react-router";
import type { Route } from "./+types/drill";
import { CtaSection } from "~/components/site/cta-section";
import { DrillCard } from "~/components/site/drill-card";
import { DrillChecklist } from "~/components/site/drill-checklist";
import { Faq, faqJsonLd, JsonLd } from "~/components/site/faq";
import { Button } from "~/components/ui/button";
import { drillCount, totalMinutes } from "~/content/drills";
import { appNames, SITE_URL } from "~/content/site";
import { format, localeFromPath, localeInfo, localizePath } from "~/i18n/config";
import { getMessages, summarize } from "~/i18n/messages.server";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { seo } from "~/lib/seo";
import { breadcrumbList } from "~/serves/utils/seo";

// Runs at build time for every prerendered locale/slug pair.
export function loader({ params, request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  const all = getMessages(locale).drills;
  const drill = all.find((d) => d.slug === params.slug);
  if (!drill) throw data(null, { status: 404 });
  return { drill, more: all.filter((d) => d.slug !== drill.slug).slice(0, 3).map(summarize) };
}

export const meta: Route.MetaFunction = ({ loaderData, matches, location }) => {
  if (!loaderData) return [{ title: rootT(matches).errors.drillNotFound }];
  const { drill } = loaderData;
  return seo({
    title: drill.metaTitle,
    description: drill.metaDescription,
    path: `/drills/${drill.slug}`,
    locale: localeFromPath(location.pathname),
  });
};

export default function DrillPage({ loaderData }: Route.ComponentProps) {
  const { drill, more } = loaderData;
  const { t, locale, href } = useI18n();
  const typeLabel = t.sessionTypes[drill.sessionType];
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: drill.title,
    description: drill.metaDescription,
    totalTime: `PT${totalMinutes(drill)}M`,
    inLanguage: localeInfo[locale].hreflang,
    url: `${SITE_URL}${localizePath(locale, `/drills/${drill.slug}`)}`,
    step: drill.blocks.flatMap((b) =>
      b.items.map((it) => ({ "@type": "HowToStep", name: it.name, text: it.note ?? format(t.drillsPage.minutesLong, { n: it.minutes }) })),
    ),
  };

  return (
    <>
      <JsonLd data={howTo} />
      <JsonLd
        data={breadcrumbList(locale, appNames[locale].brand, [
          { name: t.nav.drills, path: "/drills" },
          { name: drill.title, path: `/drills/${drill.slug}` },
        ])}
      />
      <JsonLd data={faqJsonLd(drill.faqs)} />
      <article className="px-4 pt-28 pb-12 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <Link to={href("/drills")} className="no-print inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4 rtl:rotate-180" /> {t.drillsPage.back}
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-accent text-4xl">{drill.emoji}</span>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="rounded-full bg-secondary px-2.5 py-1">{t.drillsPage.levels[drill.level]}</span>
              <span className="rounded-full bg-secondary px-2.5 py-1">{typeLabel}</span>
            </div>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{drill.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{drill.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-sm font-medium">
              <Clock className="size-4 text-primary" /> {format(t.drillsPage.minutesLong, { n: totalMinutes(drill) })}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-sm font-medium">
              <ListChecks className="size-4 text-primary" /> {format(t.drillsPage.drillCount, { n: drillCount(drill) })}
            </span>
            <Button variant="outline" className="no-print rounded-full" onClick={() => window.print()}>
              <Printer /> {t.drillsPage.print}
            </Button>
          </div>

          <DrillChecklist drill={drill} />

          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">{t.drillsPage.tipsTitle}</h2>
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
            <h2 className="text-2xl font-bold tracking-tight">{t.drillsPage.faqTitle}</h2>
            <div className="mt-6">
              <Faq items={drill.faqs} />
            </div>
          </section>
        </div>
      </article>

      <section className="no-print bg-surface-low px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight">{t.drillsPage.moreTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((d) => (
              <DrillCard key={d.slug} drill={d} />
            ))}
          </div>
        </div>
      </section>

      <div className="no-print">
        <CtaSection title={t.cta.drillTitle} subtitle={format(t.cta.drillSubtitle, { type: typeLabel })} />
      </div>
    </>
  );
}
