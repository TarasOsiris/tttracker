import type { Route } from "./+types/changelog";
import { CtaSection } from "~/components/site/cta-section";
import { JsonLd } from "~/components/site/faq";
import { formatDate } from "~/content/blog";
import { CHANGELOG_DESCRIPTION, CHANGELOG_TITLE, releases } from "~/content/changelog";
import { appNames } from "~/content/site";
import type { PageHandle } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { seo } from "~/lib/seo";
import { breadcrumbList } from "~/serves/utils/seo";

// English only, like the equipment encyclopedia: one page at /changelog.
export const handle: PageHandle = { locales: ["en"] };

export const meta: Route.MetaFunction = () =>
  seo({ title: `${CHANGELOG_TITLE} | ${appNames.en.name}`, description: CHANGELOG_DESCRIPTION, path: "/changelog", locale: "en", localized: false });

export default function Changelog() {
  const { t } = useI18n();
  return (
    <div lang="en">
      <JsonLd data={breadcrumbList("en", appNames.en.brand, [{ name: CHANGELOG_TITLE, path: "/changelog" }])} />
      <section className="px-4 pt-32 pb-12 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{CHANGELOG_TITLE}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{CHANGELOG_DESCRIPTION}</p>
          <ol className="mt-12 space-y-10 border-s ps-6">
            {releases.map((r) => (
              <li key={`${r.date}-${r.versions}`} className="relative">
                <span className="absolute -start-[1.85rem] top-1.5 size-3 rounded-full border-2 border-background bg-primary" />
                <p className="text-sm text-muted-foreground">
                  <time dateTime={r.date}>{formatDate(r.date)}</time> · {r.versions}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">{r.title}</h2>
                <ul className="mt-3 list-disc space-y-2 ps-5 leading-relaxed text-muted-foreground marker:text-primary">
                  {r.changes.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaSection title={t.cta.homeTitle} subtitle={t.cta.homeSubtitle} />
    </div>
  );
}
