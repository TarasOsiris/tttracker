import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  LayoutGrid,
  Sparkles,
  Swords,
  Timer,
  WifiOff,
} from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { CtaSection } from "~/components/site/cta-section";
import { DrillCard } from "~/components/site/drill-card";
import { Faq, faqJsonLd, JsonLd } from "~/components/site/faq";
import { Squiggle } from "~/components/site/icons";
import { Heatmap, PhoneMockup } from "~/components/site/phone-mockup";
import { ScreenshotGallery } from "~/components/site/screenshot-gallery";
import { SectionHeading } from "~/components/site/section-heading";
import { StoreButtons } from "~/components/site/store-buttons";
import { APP_FULL_NAME, links, SITE_URL } from "~/content/site";
import { localeFromPath, localizePath } from "~/i18n/config";
import { drillSummaries } from "~/i18n/messages.server";
import { featuredServes } from "~/serves/store.server";
import type { DrillSummary, FeatureIcon } from "~/i18n/types";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { seo } from "~/lib/seo";

export function loader({ request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  return { drills: drillSummaries(locale), serves: featuredServes(locale) };
}

export const meta: Route.MetaFunction = ({ matches, location }) => {
  const t = rootT(matches);
  const locale = localeFromPath(location.pathname);
  return seo({ title: t.meta.homeTitle, description: t.meta.homeDescription, path: "/", locale });
};

const featureIcons: Record<FeatureIcon, typeof Timer> = {
  sessions: Timer,
  matches: Swords,
  analytics: BarChart3,
  calendar: CalendarDays,
  widgets: LayoutGrid,
  simple: WifiOff,
};

const appJsonLd = (url: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: APP_FULL_NAME,
  description,
  operatingSystem: "iOS, Android",
  applicationCategory: "SportsApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url,
  downloadUrl: [links.appStore, links.googlePlay],
});

export default function Home({ loaderData }: Route.ComponentProps) {
  const { t, locale } = useI18n();
  return (
    <>
      <JsonLd data={appJsonLd(`${SITE_URL}${localizePath(locale, "/")}`, t.meta.homeDescription)} />
      <JsonLd data={faqJsonLd(t.faq.items)} />
      <Hero />
      <Features />
      <HowItWorks />
      <section className="py-20 sm:py-24">
        <SectionHeading
          eyebrow={t.screenshots.eyebrow}
          title={t.screenshots.title}
          subtitle={t.screenshots.subtitle}
          className="px-4"
        />
        <div className="mt-10">
          <ScreenshotGallery />
        </div>
      </section>
      <DrillsTeaser drills={loaderData.drills} />
      <ServesTeaser serves={loaderData.serves} />
      <section id="faq" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="mt-12">
            <Faq items={t.faq.items} />
          </div>
        </div>
      </section>
      <CtaSection title={t.cta.homeTitle} subtitle={t.cta.homeSubtitle} />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div className="dot-grid absolute inset-0" />
      <div className="hero-glow" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="min-w-0 text-center lg:text-left">
          <span className="inline-flex animate-fade-up items-center gap-1.5 rounded-full border bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            {t.hero.badge}
          </span>
          <h1 className="mt-6 animate-fade-up text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[3.3rem] xl:text-[3.7rem]">
            {t.hero.titleLead}{" "}
            <span className="relative text-primary sm:whitespace-nowrap">
              {t.hero.titleHighlight}
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-technique" />
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
            {t.hero.subtitleBefore}
            <span className="font-medium text-foreground">{t.hero.subtitleStrong}</span>
            {t.hero.subtitleAfter}
          </p>
          <div className="mt-9 animate-fade-up">
            <StoreButtons className="mx-auto justify-center sm:mx-0 lg:justify-start" />
          </div>
          <ul className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {t.hero.trustPoints.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-fade-up [animation-delay:200ms]">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { t } = useI18n();
  return (
    <section id="features" className="bg-surface-low px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.features.eyebrow} title={t.features.title} subtitle={t.features.subtitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f) => {
            const Icon = featureIcons[f.icon];
            return (
              <article
                key={f.title}
                className="flex flex-col rounded-3xl border bg-card p-7 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{f.body}</p>
                {f.icon === "analytics" && <Heatmap weeks={18} cell="size-2.5" className="mt-5 w-fit" />}
                <ul className="mt-5 space-y-1.5 text-sm">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <SessionTypes />
      </div>
    </section>
  );
}

const sessionTypes = [
  ["technique", "bg-technique"],
  ["match", "bg-match"],
  ["tournament", "bg-tournament"],
  ["serve", "bg-serve"],
  ["physical", "bg-physical"],
  ["freeplay", "bg-freeplay"],
  ["other", "bg-other"],
] as const;

function SessionTypes() {
  const { t } = useI18n();
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border bg-card px-6 py-6 sm:flex-row sm:justify-between">
      <p className="font-display font-semibold">{t.features.sessionTypesTitle}</p>
      <ul className="flex flex-wrap justify-center gap-2">
        {sessionTypes.map(([key, color]) => (
          <li key={key} className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
            <span className={`size-2.5 rounded-full ${color}`} />
            {t.sessionTypes[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.steps.eyebrow} title={t.steps.title} />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {t.steps.items.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl border bg-card p-7">
              <span className="font-display text-5xl font-extrabold text-primary/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DrillsTeaser({ drills }: { drills: DrillSummary[] }) {
  const { t, href } = useI18n();
  return (
    <section className="bg-surface-low px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.drillsTeaser.eyebrow} title={t.drillsTeaser.title} subtitle={t.drillsTeaser.subtitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {drills.map((d) => (
            <DrillCard key={d.slug} drill={d} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to={href("/drills")}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
          >
            {t.drillsTeaser.browseAll} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServesTeaser({ serves }: { serves: Route.ComponentProps["loaderData"]["serves"] }) {
  const { t, href } = useI18n();
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow={t.servesTeaser.eyebrow} title={t.servesTeaser.title} subtitle={t.servesTeaser.subtitle} />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {serves.map((s) => (
            <Link
              key={s.id}
              to={href(`/serves/${s.id}`)}
              className="group flex flex-col rounded-3xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-2xl">🏓</span>
                <span className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`size-2 rounded-full ${i < s.difficulty ? "bg-primary" : "bg-heat-0"}`} />
                  ))}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight">{s.name}</h3>
              <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <ArrowRight className="mt-5 size-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to={href("/serves")}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            {t.servesTeaser.cta} <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
