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
import { drills } from "~/content/drills";
import { APP_FULL_NAME, type Feature, faqs, features, links, SITE_URL, steps, trustPoints } from "~/content/site";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "TT Tracker: Ping Pong & Table Tennis Training Log",
    description:
      "Free table tennis training journal for iPhone and Android. Log sessions in seconds, record matches and opponents, and see your progress with heatmaps and win-rate stats.",
    path: "/",
  });

const featureIcons: Record<Feature["icon"], typeof Timer> = {
  sessions: Timer,
  matches: Swords,
  analytics: BarChart3,
  calendar: CalendarDays,
  widgets: LayoutGrid,
  simple: WifiOff,
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: APP_FULL_NAME,
  operatingSystem: "iOS, Android",
  applicationCategory: "SportsApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: SITE_URL,
  downloadUrl: [links.appStore, links.googlePlay],
};

export default function Home() {
  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <Features />
      <HowItWorks />
      <section className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Screenshots"
          title="Take a look inside"
          subtitle="A clean, Material-style app that feels at home on your phone, in light or dark."
          className="px-4"
        />
        <div className="mt-10">
          <ScreenshotGallery />
        </div>
      </section>
      <DrillsTeaser />
      <section id="faq" className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <CtaSection
        title="Stop guessing how much you train."
        subtitle="Free on iPhone, iPad and Android. No account, no setup, just open it and log your first session."
      />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pt-36">
      <div className="dot-grid absolute inset-0" />
      <div className="hero-glow" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="min-w-0 text-center lg:text-left">
          <span className="inline-flex animate-fade-up items-center gap-1.5 rounded-full border bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            Now with match tracking &amp; opponents
          </span>
          <h1 className="mt-6 animate-fade-up text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[3.3rem] xl:text-[3.7rem]">
            Log every session.{" "}
            <span className="relative text-primary sm:whitespace-nowrap">
              Watch your game grow.
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-technique" />
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
            The <span className="font-medium text-foreground">ping pong &amp; table tennis training journal</span>. Log
            practice in under 30 seconds, record matches against saved opponents, and see a year of progress at a glance.
          </p>
          <div className="mt-9 animate-fade-up">
            <StoreButtons className="mx-auto justify-center sm:mx-0 lg:justify-start" />
          </div>
          <ul className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {trustPoints.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-primary" />
                {t}
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
  return (
    <section id="features" className="bg-surface-low px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Features"
          title="Everything your training log needs"
          subtitle="Practice, matches and progress, from your first rally to league night. Built by a player, for players."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
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
  ["Technique", "bg-technique"],
  ["Match Play", "bg-match"],
  ["Tournament", "bg-tournament"],
  ["Serve Practice", "bg-serve"],
  ["Physical", "bg-physical"],
  ["Free Play", "bg-freeplay"],
  ["Other", "bg-other"],
] as const;

function SessionTypes() {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border bg-card px-6 py-6 sm:flex-row sm:justify-between">
      <p className="font-display font-semibold">7 session types, color-coded everywhere</p>
      <ul className="flex flex-wrap justify-center gap-2">
        {sessionTypes.map(([label, color]) => (
          <li key={label} className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
            <span className={`size-2.5 rounded-full ${color}`} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How it works" title="Three steps. Then it's a habit." />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
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

function DrillsTeaser() {
  return (
    <section className="bg-surface-low px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Free training plans"
          title="Not sure what to practise?"
          subtitle="Ready-made table tennis sessions with timings, tips and FAQs. Print one, take it to the club, then log it in the app."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {drills.map((d) => (
            <DrillCard key={d.slug} drill={d} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/drills"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40"
          >
            Browse all training plans <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
