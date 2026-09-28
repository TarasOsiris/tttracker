import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "../navigation";
import { useDataStore, useEnrichedServes } from "../context";
import { useLanguage } from "../context";
import { DifficultyMeter } from "../components/DifficultyMeter";
import { SpinWheel } from "../components/SpinWheel";
import { BounceDiagram } from "../components/BounceDiagram";
import { PlacementGrid } from "../components/PlacementGrid";
import { ServeCard } from "../components/ServeCard";
import { Seo } from "../components/Seo";
import { Tag } from "../components/Tag";
import { eSpeed, eCommonality, eBounce, eRisk, eTrajectory, eToss, eHand } from "../utils/emoji";
import { getSimilarServes } from "../utils/similarity";
import { absoluteUrl, breadcrumbList } from "../utils/seo";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { AlertTriangle, Share2, Check, ExternalLink } from "lucide-react";

export default function ServeDetail() {
  const { serveId } = useParams<{ serveId: string }>();
  const enrichedServes = useEnrichedServes();
  const { placements: allPlacements, enrichedServesMap } = useDataStore();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const serve = enrichedServesMap.get(serveId ?? "");
  const similarServes = useMemo(
    () => (serve ? getSimilarServes(serve, enrichedServes) : []),
    [serve, enrichedServes],
  );
  const title = serve ? t("serveDetail.pageTitle", { name: serve.name }) : t("serveDetail.notFoundTitle");
  // Front-loads the query terms ("how to play X in table tennis / ping pong")
  // and keeps the serve's own text as the unique tail.
  const description = serve
    ? t("serveDetail.metaDescription", { name: serve.name, description: serve.description })
    : t("serveExplorer.description", { count: enrichedServes.length });
  const breadcrumb = serve
    ? breadcrumbList(language, t("nav.home"), [
      { name: t("nav.serves"), path: "/serves" },
      { name: serve.name, path: `/serves/${serve.id}` },
    ])
    : undefined;
  const serveSchema = serve
    ? {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: serve.name,
      description: serve.description,
      url: absoluteUrl(`/serves/${serve.id}`, language),
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: t("serveExplorer.title"),
        url: absoluteUrl("/serves", language),
      },
    }
    : undefined;

  if (!serve) {
    return (
      <div className="py-12 text-center">
        <Seo
          title={title}
          description={description}
          path="/serves"
          noIndex
        />
        <p className="text-muted-foreground">{t("serveDetail.notFound")}</p>
        <Link to="/serves" className="mt-2 inline-block text-primary underline-offset-4 hover:underline">
          {t("serveDetail.backToServes")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Seo
        title={title}
        description={description}
        path={`/serves/${serve.id}`}
        jsonLd={serveSchema ? ([breadcrumb, serveSchema] as Record<string, unknown>[]) : breadcrumb}
      />
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.state?.idx > 0) {
                navigate(-1);
              } else {
                navigate("/serves");
              }
            }}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            &larr; {t("serveDetail.backToServes")}
          </button>
          <button
            onClick={() => {
              const url = absoluteUrl(`/serves/${serve.id}`, language);
              if (navigator.share) {
                navigator.share({ title: serve.name, text: serve.description, url });
              } else {
                navigator.clipboard.writeText(url).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }
            }}
            className="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {copied ? <Check className="size-4 text-green-600" /> : <Share2 className="size-4" />}
            {copied ? t("serveDetail.linkCopied") : t("serveDetail.share")}
          </button>
        </div>
        <div className="mt-2 flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{serve.name}</h1>
            <p className="mt-1 text-muted-foreground">{serve.description}</p>
            {serve.famousPlayer && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">⭐ {t("serveDetail.famousPlayer")}:</span>{" "}
                <a
                  href={serve.famousPlayer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                >
                  {serve.famousPlayer.name}
                  <ExternalLink className="size-3" />
                </a>
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Tag label={eCommonality(serve.commonality, language)} color={serve.commonality === "very common" ? "green" : serve.commonality === "common" ? "blue" : serve.commonality === "uncommon" ? "yellow" : "orange"} />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{t("serveDetail.difficulty")}</span>
              <DifficultyMeter level={serve.difficulty} />
            </div>
          </div>
        </div>
      </div>

      {/* Legality warning */}
      {serve.legalityNotes && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>{t("serveDetail.legalityWarning")}</AlertTitle>
          <AlertDescription>{serve.legalityNotes}</AlertDescription>
        </Alert>
      )}

      {/* Motion */}
      <Section title={`🔄 ${t("serveDetail.motion")}`}>
        <div className="flex items-center gap-2">
          <Link to={`/motions/${serve.motion.id}`} className="font-medium text-primary underline-offset-4 hover:underline">
            {serve.motion.name}
          </Link>
          <Tag label={eHand(serve.motion.hand, language)} color="blue" />
          <DifficultyMeter level={serve.motion.difficulty} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{serve.motion.description}</p>
      </Section>

      {/* Ball Contact */}
      {serve.contactPoint && (
        <Section title={`🎱 ${t("serveDetail.contactPoint")}`}>
          <p className="text-sm text-muted-foreground">{serve.contactPoint}</p>
        </Section>
      )}

      {/* Return Advice */}
      {serve.returnAdvice && (
        <Section title={`💡 ${t("serveDetail.returnAdvice")}`}>
          <p className="text-sm text-muted-foreground">{serve.returnAdvice}</p>
        </Section>
      )}

      {/* Visualizations */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Spin */}
        <Section title={`🌀 ${t("serveDetail.spinProfile")}`}>
          <p className="mb-2 text-sm font-medium text-muted-foreground">{serve.spinProfile.name}</p>
          <div className="flex justify-center">
            <SpinWheel spin={serve.spinProfile} size={220} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{serve.spinProfile.description}</p>
        </Section>

        {/* Bounce */}
        <Section title={`🏓 ${t("serveDetail.bounce")}`}>
          <div className="mb-2 flex items-center gap-2">
            <Tag
              label={eBounce(serve.bounce.category, language)}
              color={serve.bounce.risk === "high" ? "red" : serve.bounce.risk === "medium" ? "yellow" : "green"}
            />
            <span className="text-xs text-muted-foreground">{t("serveDetail.risk")} {eRisk(serve.bounce.risk, language)}</span>
          </div>
          <div className="flex justify-center">
            <BounceDiagram bounce={serve.bounce} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{serve.bounce.secondBouncePosition}</p>
        </Section>

        {/* Placement */}
        <Section title={`🎯 ${t("serveDetail.placement")}`}>
          <div className="flex justify-center">
            <PlacementGrid placements={serve.placements} allPlacements={allPlacements} />
          </div>
        </Section>
      </div>

      {/* Details grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Speed */}
        <Section title={`💨 ${t("serveDetail.speed")}`}>
          <Tag label={eSpeed(serve.speed.label, language)} color={serve.speed.label === "fast" ? "red" : serve.speed.label === "medium" ? "yellow" : "green"} />
          <p className="mt-1 text-sm text-muted-foreground">{serve.speed.kmh}</p>
          <p className="mt-1 text-xs text-muted-foreground">{serve.speed.tacticalNote}</p>
        </Section>

        {/* Trajectory */}
        <Section title={`📐 ${t("serveDetail.trajectory")}`}>
          <Tag label={eTrajectory(serve.trajectory.label, language)} color="blue" />
          <p className="mt-1 text-sm text-muted-foreground">{serve.trajectory.netClearance}</p>
        </Section>

        {/* Toss */}
        <Section title={`☝️ ${t("serveDetail.toss")}`}>
          <div className="flex items-center gap-2">
            <Tag label={eToss(serve.toss.height, language)} color={serve.toss.legal ? "green" : "red"} />
            {!serve.toss.legal && <Tag label={`🚫 ${t("serveDetail.illegal")}`} color="red" />}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{serve.toss.position}</p>
        </Section>
      </div>

      {/* Deception */}
      {serve.deceptions.length > 0 && (
        <Section title={`🎭 ${t("serveDetail.deception")}`}>
          <div className="space-y-3">
            {serve.deceptions.map((d) => (
              <div key={d.id} className="rounded-2xl bg-surface-low p-4">
                <h4 className="font-medium text-foreground">{d.name}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">{d.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium">{t("serveDetail.counterplay")}</span> {d.counterplay}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Tactical Purposes */}
      {serve.tacticalPurposes.length > 0 && (
        <Section title={`🎯 ${t("serveDetail.tacticalPurposes")}`}>
          <div className="space-y-2">
            {serve.tacticalPurposes.map((tp) => (
              <div key={tp.id} className="flex items-start gap-2">
                <Tag label={tp.type === "serve_only" ? `🏓 ${t("serveDetail.tacticalServe")}` : `🔄 ${t("serveDetail.tacticalSPlusOne")}`} color={tp.type === "serve_only" ? "blue" : "purple"} />
                <div>
                  <p className="text-sm font-medium text-foreground">{tp.name}</p>
                  <p className="text-xs text-muted-foreground">{tp.goal}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* References */}
      {serve.references && serve.references.length > 0 && (
        <Section title={`📹 ${t("serveDetail.references")}`}>
          <div className="grid gap-4 md:grid-cols-2">
            {serve.references.map((ref, i) => (
              <div key={i}>
                {ref.title && <p className="mb-2 text-sm font-medium text-muted-foreground">{ref.title}</p>}
                {ref.type === "youtube" ? (
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                      loading="lazy"
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${ref.videoId}`}
                      title={ref.title ?? "YouTube video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/7] w-full max-w-sm overflow-hidden rounded-lg">
                    <iframe
                      loading="lazy"
                      className="h-full w-full"
                      src={`${ref.url}embed/`}
                      title={ref.title ?? "Instagram video"}
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Similar Serves */}
      {similarServes.length > 0 && (
        <Section title={`🔗 ${t("serveDetail.similarServes")}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similarServes.map((s) => (
              <ServeCard key={s.id} serve={s} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="gap-3 py-4 shadow-none">
      <CardHeader className="px-4 pb-0">
        <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">{children}</CardContent>
    </Card>
  );
}
