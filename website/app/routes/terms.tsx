import type { Route } from "./+types/terms";
import { LegalPage } from "~/components/site/legal-page";
import { termsOfUse } from "~/content/legal";
import { APP_NAME } from "~/content/site";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: `${termsOfUse.title} | ${APP_NAME}`, description: termsOfUse.description, path: "/terms", locale: "en", localized: false });

export default function Page() {
  return <LegalPage document={termsOfUse} />;
}
