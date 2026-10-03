import type { Route } from "./+types/drills";
import { CtaSection } from "~/components/site/cta-section";
import { DrillCard } from "~/components/site/drill-card";
import { JsonLd } from "~/components/site/faq";
import { appNames, SITE_URL } from "~/content/site";
import { localeFromPath, localizePath } from "~/i18n/config";
import { drillSummaries } from "~/i18n/messages.server";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { seo } from "~/lib/seo";
import { breadcrumbList } from "~/serves/utils/seo";

export function loader({ request }: Route.LoaderArgs) {
  return { drills: drillSummaries(localeFromPath(new URL(request.url).pathname)) };
}

export const meta: Route.MetaFunction = ({ matches, location }) => {
  const t = rootT(matches);
  return seo({
    title: t.meta.drillsTitle,
    description: t.meta.drillsDescription,
    path: "/drills",
    locale: localeFromPath(location.pathname),
  });
};

export default function Drills({ loaderData }: Route.ComponentProps) {
  const { t, locale } = useI18n();
  return (
    <>
      <JsonLd data={breadcrumbList(locale, appNames[locale].brand, [{ name: t.nav.drills, path: "/drills" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: loaderData.drills.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.title,
            url: `${SITE_URL}${localizePath(locale, `/drills/${d.slug}`)}`,
          })),
        }}
      />
      <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40">
        <div className="dot-grid absolute inset-0" />
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="animate-fade-up text-sm font-semibold tracking-wide text-primary uppercase">{t.drillsPage.eyebrow}</p>
          <h1 className="mt-4 animate-fade-up text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            {t.drillsPage.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-muted-foreground">
            {t.drillsPage.intro}
          </p>
        </div>
      </section>
      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loaderData.drills.map((d) => (
            <DrillCard key={d.slug} drill={d} />
          ))}
        </div>
      </section>
      <CtaSection title={t.cta.drillsTitle} subtitle={t.cta.drillsSubtitle} />
    </>
  );
}
