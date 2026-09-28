import { useLanguage } from "../context";
import { Seo } from "../components/Seo";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { Info } from "lucide-react";
import tarasJpg from "~/assets/taras.jpg";
import { breadcrumbList } from "../utils/seo";

export default function About() {
  const { language, t } = useLanguage();
  const description = t("about.p1");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Seo
        title={t("about.pageTitle")}
        description={description}
        path="/about"
        jsonLd={[
          breadcrumbList(language, t("nav.home"), [{ name: t("nav.about"), path: "/about" }]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "Person",
              name: "Taras Leskiv",
              description: t("about.p1"),
            },
          },
        ]}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("about.title")}</h1>

      <div className="flex items-start gap-5">
        {/* Photo placeholder */}
        <div className="hidden shrink-0 sm:block">
          <img
            src={tarasJpg}
            alt="Taras Leskiv"
            loading="lazy"
            className="h-28 w-28 rounded-full object-cover shadow-md"
          />
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
          <p>{t("about.p3")}</p>
          <p>{t("about.p4")}</p>
        </div>
      </div>

      <Alert variant="info">
        <Info className="size-4" />
        <AlertTitle>{t("about.suggestionsTitle")}</AlertTitle>
        <AlertDescription>
          <p>{t("about.suggestionsBody")}</p>
          <a
            href="mailto:tleskiv@ninevastudios.com"
            className="mt-3 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("about.contactUs")}
          </a>
        </AlertDescription>
      </Alert>
    </div>
  );
}
