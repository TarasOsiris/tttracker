import { useParams } from "react-router";
import { Link, useNavigate } from "../navigation";
import { useDataStore, useEnrichedServes } from "../context";
import { useLanguage } from "../context";
import { DifficultyMeter } from "../components/DifficultyMeter";
import { Seo } from "../components/Seo";
import { Tag } from "../components/Tag";
import { eHand, eSpinCap } from "../utils/emoji";
import { ServeCard } from "../components/ServeCard";
import { absoluteUrl, breadcrumbList } from "../utils/seo";

export default function MotionDetail() {
  const { motionId } = useParams<{ motionId: string }>();
  const { store } = useDataStore();
  const enrichedServes = useEnrichedServes();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const motion = store.motions.get(motionId ?? "");
  const title = motion ? t("motionDetail.pageTitle", { name: motion.name }) : t("motionDetail.notFoundTitle");
  const description = motion
    ? t("motionDetail.metaDescription", { name: motion.name, description: motion.description })
    : t("motionList.description");
  const breadcrumb = motion
    ? breadcrumbList(language, t("nav.home"), [
      { name: t("nav.motions"), path: "/motions" },
      { name: motion.name, path: `/motions/${motion.id}` },
    ])
    : undefined;
  const motionSchema = motion
    ? {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: motion.name,
      description: motion.description,
      url: absoluteUrl(`/motions/${motion.id}`, language),
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: t("motionList.title"),
        url: absoluteUrl("/motions", language),
      },
    }
    : undefined;

  if (!motion) {
    return (
      <div className="py-12 text-center">
        <Seo
          title={title}
          description={description}
          path="/motions"
          noIndex
        />
        <p className="text-muted-foreground">{t("motionDetail.notFound")}</p>
        <Link to="/motions" className="mt-2 inline-block text-primary underline-offset-4 hover:underline">
          {t("motionDetail.backToMotions")}
        </Link>
      </div>
    );
  }

  const relatedServes = enrichedServes.filter((s) => s.motion.id === motion.id);

  return (
    <div className="space-y-8">
      <Seo
        title={title}
        description={description}
        path={`/motions/${motion.id}`}
        jsonLd={motionSchema ? ([breadcrumb, motionSchema] as Record<string, unknown>[]) : breadcrumb}
      />
      <div>
        <button
          onClick={() => {
            if (window.history.state?.idx > 0) {
              navigate(-1);
            } else {
              navigate("/motions");
            }
          }}
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          <span className="inline-block rtl:rotate-180">&larr;</span> {t("motionDetail.backToMotions")}
        </button>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{motion.name}</h1>
        <div className="mt-2 flex items-center gap-3">
          <Tag label={eHand(motion.hand, language)} color="blue" />
          <DifficultyMeter level={motion.difficulty} />
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">📝 {t("motionDetail.description")}</h2>
        <p className="text-muted-foreground">{motion.description}</p>
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">🌀 {t("motionDetail.spinCapabilities")}</h2>
        <div className="flex flex-wrap gap-2">
          {motion.spinCapabilities.map((cap) => (
            <Tag key={cap} label={eSpinCap(cap, language)} color="purple" />
          ))}
        </div>
      </div>

      {relatedServes.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            🏓 {t("motionDetail.servesUsing", { count: relatedServes.length })}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServes.map((serve) => (
              <ServeCard key={serve.id} serve={serve} />
            ))}
          </div>
        </div>
      )}

      {motion.references && motion.references.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">📹 {t("motionDetail.references")}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {motion.references.map((ref, i) => (
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
        </div>
      )}
    </div>
  );
}
