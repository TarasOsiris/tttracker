import type { Route } from "./+types/privacy";
import { LegalPage } from "~/components/site/legal-page";
import { getPrivacyPolicy } from "~/content/legal";
import { appNames } from "~/content/site";
import { localeFromPath } from "~/i18n/config";
import { seo } from "~/lib/seo";

export function loader({ request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  return { document: getPrivacyPolicy(locale), locale };
}

export const meta: Route.MetaFunction = ({ data, location }) => {
  const locale = localeFromPath(location.pathname);
  const doc = data?.document ?? getPrivacyPolicy(locale);
  const appName = appNames[locale].name;
  return seo({
    title: `${doc.title} | ${appName}`,
    description: doc.description,
    path: "/privacy",
    locale,
  });
};

export default function Page({ loaderData }: Route.ComponentProps) {
  return <LegalPage document={loaderData.document} locale={loaderData.locale} />;
}

