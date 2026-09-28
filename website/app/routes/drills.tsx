import type { Route } from "./+types/drills";
import { CtaSection } from "~/components/site/cta-section";
import { DrillCard } from "~/components/site/drill-card";
import { drills } from "~/content/drills";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({
    title: "Free Table Tennis Training Plans & Drills | TT Tracker",
    description:
      "Printable table tennis practice sessions: beginner fundamentals, footwork, serve & receive, multiball, consistency and match preparation. Each with timings, tips and FAQs.",
    path: "/drills",
  });

export default function Drills() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40">
        <div className="dot-grid absolute inset-0" />
        <div className="hero-glow" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="animate-fade-up text-sm font-semibold tracking-wide text-primary uppercase">Training plans</p>
          <h1 className="mt-4 animate-fade-up text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Table tennis drills for every session
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-muted-foreground">
            Structured practice plans with warm-up, main block and cool-down, timed to the minute. Print them for the club,
            then log the session in TT Tracker to see your progress.
          </p>
        </div>
      </section>
      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {drills.map((d) => (
            <DrillCard key={d.slug} drill={d} />
          ))}
        </div>
      </section>
      <CtaSection
        title="Track every drill you do."
        subtitle="Log each session with its type, duration and effort, and watch your training heatmap fill up."
      />
    </>
  );
}
