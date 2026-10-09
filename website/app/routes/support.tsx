import { Mail } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/support";
import { Faq, JsonLd } from "~/components/site/faq";
import { inline } from "~/components/site/legal-page";
import { buttonVariants } from "~/components/ui/button";
import { appNames, links } from "~/content/site";
import { format, localeFromPath } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { seo } from "~/lib/seo";
import { breadcrumbList } from "~/serves/utils/seo";

export const meta: Route.MetaFunction = ({ matches, location }) => {
  const t = rootT(matches);
  const locale = localeFromPath(location.pathname);
  return seo({ title: `${t.support.metaTitle} | ${appNames[locale].name}`, description: t.support.description, path: "/support", locale });
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border bg-card p-6 sm:p-7">
      <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function Support() {
  const { t, locale, href } = useI18n();
  const s = t.support;
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <JsonLd data={breadcrumbList(locale, appNames[locale].brand, [{ name: s.title, path: "/support" }])} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{s.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.intro}</p>
        <div className="mt-12 space-y-5">
          <Card title={s.emailTitle}>
            <p>{s.emailBody}</p>
            <a href={`mailto:${links.email}`} className={buttonVariants({ className: "rounded-full" })}>
              <Mail className="size-4" />
              {format(s.emailButton, { email: links.email })}
            </a>
          </Card>
          <Card title={s.restoreTitle}>
            <p>{s.restoreBody}</p>
          </Card>
          <Card title={s.refundTitle}>
            <p>{inline(s.refundBody, locale)}</p>
          </Card>
          <Card title={s.dataTitle}>
            <p>{inline(s.dataBody, locale)}</p>
          </Card>
        </div>
        <h2 className="mt-16 font-display text-2xl font-bold tracking-tight">{s.faqTitle}</h2>
        <div className="mt-6">
          <Faq items={t.faq.items} />
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          <Link to={href("/privacy")} className="hover:text-foreground">
            {t.footer.privacy}
          </Link>
          {" · "}
          <Link to={href("/terms")} className="hover:text-foreground">
            {t.footer.terms}
          </Link>
          {" · "}
          <Link to="/changelog" className="hover:text-foreground" hrefLang={locale === "en" ? undefined : "en"}>
            {t.footer.changelog}
          </Link>
        </p>
      </div>
    </section>
  );
}
