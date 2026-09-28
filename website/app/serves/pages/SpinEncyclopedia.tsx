import { useDataStore } from "../context";
import { useLanguage } from "../context";
import { Seo } from "../components/Seo";
import { SpinWheel } from "../components/SpinWheel";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Info } from "lucide-react";
import { absoluteUrl, breadcrumbList } from "../utils/seo";

export default function SpinEncyclopedia() {
  const { language, t } = useLanguage();
  const { spins } = useDataStore();
  const description = t("spinEncyclopedia.description");
  const jsonLd = [
    breadcrumbList(language, t("nav.home"), [{ name: t("nav.spins"), path: "/spins" }]),
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: t("spinEncyclopedia.title"),
      description,
      url: absoluteUrl("/spins", language),
      hasDefinedTerm: spins.map((spin) => ({
        "@type": "DefinedTerm",
        name: spin.name,
        description: spin.description,
      })),
    },
  ];

  return (
    <div className="space-y-6">
      <Seo
        title={t("spinEncyclopedia.pageTitle")}
        description={description}
        path="/spins"
        type="article"
        jsonLd={jsonLd}
      />
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("spinEncyclopedia.title")}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Alert variant="info">
        <Info className="size-4" />
        <AlertTitle>{t("spinEncyclopedia.howSpinWorks")}</AlertTitle>
        <AlertDescription>
          {t("spinEncyclopedia.howSpinWorksBody")}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spins.map((spin) => (
          <div
            key={spin.id}
            className="rounded-3xl border bg-card p-4"
          >
            <h3 className="mb-1 font-semibold text-foreground">{spin.name}</h3>
            <div className="my-3 flex justify-center">
              <SpinWheel spin={spin} size={130} />
            </div>
            <p className="text-sm text-muted-foreground">{spin.description}</p>

            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              {spin.topspin > 0 && <SpinBar label={`⬆️ ${t("spinEncyclopedia.topspin")}`} value={spin.topspin} color="bg-red-400" />}
              {spin.backspin > 0 && <SpinBar label={`⬇️ ${t("spinEncyclopedia.backspin")}`} value={spin.backspin} color="bg-serve" />}
              {spin.leftSidespin > 0 && <SpinBar label={`⬅️ ${t("spinEncyclopedia.leftSide")}`} value={spin.leftSidespin} color="bg-yellow-400" />}
              {spin.rightSidespin > 0 && <SpinBar label={`➡️ ${t("spinEncyclopedia.rightSide")}`} value={spin.rightSidespin} color="bg-green-400" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpinBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-24 shrink-0">{label}</span>
      <div className="flex-1 rounded-full bg-muted h-1.5">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right">{value}%</span>
    </div>
  );
}
