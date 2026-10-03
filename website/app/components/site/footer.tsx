import { useSyncExternalStore } from "react";
import { Link } from "react-router";
import { links, navLinks, socials, storeLinks } from "~/content/site";
import { localeInfo } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { Logo, useLanguageLinks } from "./header";
import { ThreadsIcon, XIcon } from "./icons";
import { trackStoreClick } from "./store-buttons";

const BUILD_YEAR = new Date().getFullYear();
const noopSubscribe = () => () => {};

const linkClass = "text-muted-foreground transition-colors hover:text-foreground";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function External({ href, onClick, children }: { href: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {children}
      </a>
    </li>
  );
}

export function SiteFooter() {
  const { t, href, locale } = useI18n();
  const languages = useLanguageLinks();
  const stores = storeLinks(locale, "footer");
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  return (
    <footer className="border-t bg-surface-low">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {(
              [
                [socials.x, "X (@soycastic)", XIcon],
                [socials.threads, "Threads (@soycastic)", ThreadsIcon],
              ] as const
            ).map(([url, label, Icon]) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener me"
                aria-label={label}
                title={label}
                className="flex size-9 items-center justify-center rounded-[0.7rem] border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <Column title={t.footer.product}>
          {navLinks.map((l) => (
            <li key={l.href}>
              {/* English-only pages (blog, equipment) exist once, at the root. */}
              <Link to={"englishOnly" in l ? l.href : href(l.href)} className={linkClass}>
                {t.nav[l.key]}
              </Link>
            </li>
          ))}
        </Column>
        <Column title={t.footer.download}>
          <External href={stores.appStore} onClick={() => trackStoreClick("app_store", "footer")}>
            App Store
          </External>
          <External href={stores.googlePlay} onClick={() => trackStoreClick("google_play", "footer")}>
            Google Play
          </External>
        </Column>
        <Column title={t.footer.company}>
          <li>
            <a href={`mailto:${links.email}`} className={linkClass}>
              {t.footer.contact}
            </a>
          </li>
          <li>
            <Link to="/blog" className={linkClass}>
              {t.nav.blog}
            </Link>
          </li>
          <li>
            <Link to="/privacy" className={linkClass}>
              {t.footer.privacy}
            </Link>
          </li>
          <li>
            <Link to="/terms" className={linkClass}>
              {t.footer.terms}
            </Link>
          </li>
        </Column>
        <Column title={t.footer.encyclopedia}>
          {(
            [
              ["/serves", t.footer.allServes],
              ["/motions", t.footer.motions],
              ["/spins", t.footer.spins],
              ["/rules", t.footer.rules],
              ["/quiz", t.footer.quiz],
              ["/about", t.footer.about],
            ] as const
          ).map(([path, label]) => (
            <li key={path}>
              <Link to={href(path)} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
          {/* English only, so every language links to the same page. */}
          <li>
            <Link to="/equipment" className={linkClass}>
              {t.nav.equipment}
            </Link>
          </li>
        </Column>
        <Column title={t.footer.language}>
          {languages.map((l) => (
            <li key={l.locale}>
              <Link
                to={l.to}
                hrefLang={localeInfo[l.locale].hreflang}
                lang={localeInfo[l.locale].hreflang}
                className={l.locale === locale ? "font-semibold text-foreground" : linkClass}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </Column>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {year}{" "}
          <a href={links.studio} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            Nineva Studios
          </a>
          . {t.footer.legal}
        </p>
      </div>
    </footer>
  );
}
