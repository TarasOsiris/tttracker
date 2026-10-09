import type { Route } from "./+types/not-found";
import { buttonVariants } from "~/components/ui/button";
import { appNames } from "~/content/site";
import type { PageHandle } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";

// Prerendered at /404 only to become the static 404.html nginx serves for unknown URLs (react-router.config.ts
// strips its scripts, so it shows without JavaScript). In English, the language of the site's root.
export const handle: PageHandle = { locales: ["en"] };

export const meta: Route.MetaFunction = ({ matches }) => [
  { title: `${rootT(matches).errors.notFoundTitle} | ${appNames.en.name}` },
  { name: "robots", content: "noindex" },
];

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-6xl">🏓</p>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">{t.errors.notFoundTitle}</h1>
      <p className="mt-3 text-muted-foreground">{t.errors.notFoundBody}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={href("/")} className={buttonVariants({ className: "rounded-full" })}>
          {t.errors.backHome}
        </a>
        <a href={href("/drills")} className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
          {t.nav.drills}
        </a>
        <a href={href("/serves")} className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
          {t.nav.serves}
        </a>
      </div>
    </section>
  );
}
