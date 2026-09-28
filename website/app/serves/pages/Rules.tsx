import { eToss } from "../utils/emoji";
import { useEnrichedServes, useDataStore } from "../context";
import { useLanguage } from "../context";
import { Seo } from "../components/Seo";
import { Tag } from "../components/Tag";
import { Link } from "../navigation";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { breadcrumbList, faqPage, FAQ_COUNT } from "../utils/seo";

export default function Rules() {
  const { language, t } = useLanguage();
  const enrichedServes = useEnrichedServes();
  const { tosses } = useDataStore();
  const illegalServes = enrichedServes.filter((s) => s.legalityNotes);
  const description = t("rules.description");
  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`rules.faq.q${i + 1}`),
    answer: t(`rules.faq.a${i + 1}`),
  }));
  const jsonLd = [
    breadcrumbList(language, t("nav.home"), [{ name: t("nav.rules"), path: "/rules" }]),
    faqPage(t),
  ];

  return (
    <div className="space-y-8">
      <Seo
        title={t("rules.pageTitle")}
        description={description}
        path="/rules"
        type="article"
        jsonLd={jsonLd}
      />
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{t("rules.title")}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Core rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">{t("rules.legalRequirements")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Rule title={t("rules.openPalm")} description={t("rules.openPalmDesc")} />
          <Rule title={t("rules.tossHeight")} description={t("rules.tossHeightDesc")} />
          <Rule title={t("rules.visibility")} description={t("rules.visibilityDesc")} />
          <Rule title={t("rules.behindEndLine")} description={t("rules.behindEndLineDesc")} />
          <Rule title={t("rules.freeArmRemoval")} description={t("rules.freeArmRemovalDesc")} />
          <Rule title={t("rules.strikeOnDescent")} description={t("rules.strikeOnDescentDesc")} />
        </CardContent>
      </Card>

      {/* Toss rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">{t("rules.tossTypes")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tosses.map((toss) => (
            <div key={toss.id} className={`rounded-lg border p-3 ${toss.legal ? "border-border bg-muted" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30"}`}>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{eToss(toss.height, language)}</span>
                <Tag label={toss.legal ? t("rules.legal") : t("rules.illegal")} color={toss.legal ? "green" : "red"} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{toss.position}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Illegal serves in database */}
      {illegalServes.length > 0 && (
        <Alert variant="destructive" className="p-6">
          <AlertTriangle className="size-4" />
          <AlertTitle className="text-lg font-bold">{t("rules.legalityConcerns")}</AlertTitle>
          <AlertDescription>
            <p className="mb-4">
              {t("rules.legalityConcernsBody")}
            </p>
            <div className="space-y-3">
              {illegalServes.map((serve) => (
                <div key={serve.id} className="rounded-lg border border-red-200 bg-card p-3 dark:border-red-800">
                  <Link to={`/serves/${serve.id}`} className="font-medium text-red-800 hover:text-red-900 dark:text-red-300 dark:hover:text-red-200">
                    {serve.name}
                  </Link>
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{serve.legalityNotes}</p>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* FAQ — the questions people search for, answered in plain text so they
          are eligible for FAQ rich results and quotable by AI answer engines. */}
      <section>
        <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">{t("rules.faqTitle")}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  <h3>{faq.question}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Common violations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">{t("rules.commonViolations")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p><strong className="text-foreground">{t("rules.hiddenServe")}</strong> {t("rules.hiddenServeDesc")}</p>
          <p><strong className="text-foreground">{t("rules.lowToss")}</strong> {t("rules.lowTossDesc")}</p>
          <p><strong className="text-foreground">{t("rules.fingerSpin")}</strong> {t("rules.fingerSpinDesc")}</p>
          <p><strong className="text-foreground">{t("rules.overTableContact")}</strong> {t("rules.overTableContactDesc")}</p>
          <p><strong className="text-foreground">{t("rules.nonVerticalToss")}</strong> {t("rules.nonVerticalTossDesc")}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Rule({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
        ✓
      </div>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
