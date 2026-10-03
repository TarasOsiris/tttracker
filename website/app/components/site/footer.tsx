import { useSyncExternalStore } from "react";
import { Link } from "react-router";
import { links, navLinks } from "~/content/site";
import { localeInfo } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { Logo, useLanguageLinks } from "./header";

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

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {children}
      </a>
    </li>
  );
}

export function SiteFooter() {
  const { t, href, locale } = useI18n();
  const languages = useLanguageLinks();
  const year = useSyncExternalStore(noopSubscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  return (
    <footer className="border-t bg-surface-low">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {t.footer.tagline}
          </p>
        </div>
        <Column title={t.footer.product}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link to={href(l.href)} className={linkClass}>
                {t.nav[l.key]}
              </Link>
            </li>
          ))}
        </Column>
        <Column title={t.footer.download}>
          <External href={links.appStore}>App Store</External>
          <External href={links.googlePlay}>Google Play</External>
        </Column>
        <Column title={t.footer.company}>
          <li>
            <a href={`mailto:${links.email}`} className={linkClass}>
              {t.footer.contact}
            </a>
          </li>
          <External href={links.support}>{t.footer.support}</External>
          <li>
            <Link to="/blog" className={linkClass}>
              Blog
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
          <External href={links.telegram}>{t.footer.telegram}</External>
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
        </Column>
        <Column title={t.footer.language}>
          {languages.map((l) => (
            <li key={l.locale}>
              <Link
                to={l.to}
                hrefLang={localeInfo[l.locale].hreflang}
                lang={l.locale}
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
