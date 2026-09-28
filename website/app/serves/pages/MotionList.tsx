import { Link } from "../navigation";
import { useDataStore } from "../context";
import { useLanguage } from "../context";
import { DifficultyMeter } from "../components/DifficultyMeter";
import { Seo } from "../components/Seo";
import { Tag } from "../components/Tag";
import { eHand, eSpinCap } from "../utils/emoji";
import { absoluteUrl, breadcrumbList } from "../utils/seo";

export default function MotionList() {
  const { t, language } = useLanguage();
  const { motions } = useDataStore();
  const description = t("motionList.description");
  const jsonLd = [
    breadcrumbList(language, t("nav.home"), [{ name: t("nav.motions"), path: "/motions" }]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: t("motionList.title"),
      description,
      url: absoluteUrl("/motions", language),
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: motions.length,
        itemListElement: motions.map((motion, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: motion.name,
          url: absoluteUrl(`/motions/${motion.id}`, language),
        })),
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Seo
        title={t("motionList.pageTitle")}
        description={description}
        path="/motions"
        jsonLd={jsonLd}
      />
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("motionList.title")}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {motions.map((motion) => (
          <Link
            key={motion.id}
            to={`/motions/${motion.id}`}
            className="block rounded-3xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-semibold text-foreground">{motion.name}</h3>
              <DifficultyMeter level={motion.difficulty} />
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              <Tag label={eHand(motion.hand, language)} color="blue" />
              {motion.spinCapabilities.map((cap) => (
                <Tag key={cap} label={eSpinCap(cap, language)} color="purple" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">{motion.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
