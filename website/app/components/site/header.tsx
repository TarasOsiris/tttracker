import { Check, Globe, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { APP_NAME, navLinks } from "~/content/site";
import { localeInfo, locales, localizePath, stripLocale } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { cn } from "~/lib/utils";
import { StoreButtons } from "./store-buttons";
import { ThemeToggle } from "./theme-toggle";

export function Logo() {
  const { href } = useI18n();
  return (
    <Link to={href("/")} className="flex shrink-0 items-center gap-2.5 font-display text-[17px] font-bold tracking-tight">
      <img src="/app-icon-512.png" alt="" width={32} height={32} className="size-8 rounded-[9px] shadow-sm" />
      <span>{APP_NAME}</span>
    </Link>
  );
}

/** Same page in each language, keeping the hash. */
export function useLanguageLinks() {
  const { pathname, hash } = useLocation();
  const neutral = stripLocale(pathname);
  return locales.map((l) => ({ locale: l, label: localeInfo[l].label, to: localizePath(l, neutral) + hash }));
}

function LanguageMenu() {
  const { t, locale } = useI18n();
  const languages = useLanguageLinks();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 gap-1.5 rounded-full px-3 text-muted-foreground" aria-label={t.nav.language}>
          <Globe className="size-4" />
          <span className="text-sm font-medium uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5">
        {languages.map((l) => (
          <DropdownMenuItem key={l.locale} asChild className="rounded-xl px-3 py-2">
            <Link to={l.to} hrefLang={localeInfo[l.locale].hreflang} lang={l.locale}>
              <span className="flex-1">{l.label}</span>
              {l.locale === locale && <Check className="size-4 text-primary" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const sectionIds = navLinks.filter((l) => l.href.startsWith("/#")).map((l) => l.href.slice(2));

// Which home-page section is under the header, so the nav can mark it.
function useActiveHref() {
  const neutral = stripLocale(useLocation().pathname);
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    if (neutral !== "/") return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        setSection(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [neutral]);

  if (neutral.startsWith("/drills")) return "/drills";
  if (/^\/(serves|motions|spins|rules|quiz|about)(\/|$)/.test(neutral)) return "/serves";
  return neutral === "/" && section ? `/#${section}` : null;
}

export function SiteHeader() {
  const { t, href } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-300",
        scrolled && "border-border bg-background/80 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={href(l.href)}
              aria-current={active === l.href ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                active === l.href && "bg-secondary text-foreground",
              )}
            >
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <LanguageMenu />
          </div>
          <ThemeToggle label={t.nav.toggleTheme} />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full px-3.5 font-semibold shadow-sm hover:-translate-y-0.5 min-[380px]:inline-flex sm:px-4"
          >
            <Link to={href("/#download")}>{t.nav.getApp}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="rounded-full lg:hidden" aria-label={t.nav.openMenu}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto p-6">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <Logo />
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <Link
                      to={href(l.href)}
                      aria-current={active === l.href ? "page" : undefined}
                      className={cn(
                        "rounded-2xl px-4 py-3 font-display text-lg font-semibold hover:bg-secondary",
                        active === l.href && "bg-secondary",
                      )}
                    >
                      {t.nav[l.key]}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <StoreButtons className="mt-8 max-w-none sm:flex-col [&>a]:w-full" />
              <MobileLanguages />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileLanguages() {
  const { t, locale } = useI18n();
  const languages = useLanguageLinks();
  return (
    <div className="mt-8">
      <p className="px-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t.nav.language}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {languages.map((l) => (
          <SheetClose asChild key={l.locale}>
            <Link
              to={l.to}
              hrefLang={localeInfo[l.locale].hreflang}
              lang={l.locale}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                l.locale === locale ? "border-primary bg-accent font-semibold text-accent-foreground" : "hover:bg-secondary",
              )}
            >
              {l.label}
            </Link>
          </SheetClose>
        ))}
      </div>
    </div>
  );
}
