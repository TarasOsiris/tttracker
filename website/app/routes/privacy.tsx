import type { Route } from "./+types/privacy";
import { LegalPage } from "~/components/site/legal-page";
import { privacyPolicy } from "~/content/legal";
import { APP_NAME } from "~/content/site";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: `${privacyPolicy.title} | ${APP_NAME}`, description: privacyPolicy.description, path: "/privacy", locale: "en", localized: false });

export default function Page() {
  return <LegalPage document={privacyPolicy} />;
}
