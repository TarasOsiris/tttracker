import { Check, ChevronDown, CircleHelp, ClipboardList, Globe, Layers, Menu, Newspaper, RotateCw, Sparkles, Workflow, type LucideIcon } from "lucide-react";
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
import { appNames, navGroups, navLinks } from "~/content/site";
import { localeInfo, locales, localizePath, stripLocale } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { cn } from "~/lib/utils";
import { AppLogo } from "./app-logo";
import { StoreButtons } from "./store-buttons";
import { ThemeToggle } from "./theme-toggle";

export function Logo() {
  const { href, locale } = useI18n();
  return (
    <Link to={href("/")} className="flex min-w-0 items-center gap-2.5 font-display text-[17px] font-bold tracking-tight">
      <AppLogo className="size-8 shrink-0" />
      <span className="line-clamp-2 text-[15px] leading-tight sm:line-clamp-1 sm:text-[17px]">{appNames[locale].brand}</span>
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
            <Link to={l.to} hrefLang={localeInfo[l.locale].hreflang} lang={localeInfo[l.locale].hreflang}>
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
  if (neutral.startsWith("/blog")) return "/blog";
  if (neutral.startsWith("/equipment")) return "/equipment";
  if (/^\/(serves|motions|spins|rules|quiz|about)(\/|$)/.test(neutral)) return "/serves";
  return neutral === "/" && section ? `/#${section}` : null;
}

type NavLink = (typeof navLinks)[number];

const navIcons: Record<NavLink["key"], LucideIcon> = {
  features: Sparkles,
  howItWorks: Workflow,
  faq: CircleHelp,
  serves: RotateCw,
  drills: ClipboardList,
  equipment: Layers,
  blog: Newspaper,
};

function useLinkTo() {
  const { href } = useI18n();
  return (l: NavLink) => ("englishOnly" in l ? l.href : href(l.href));
}

/** A header dropdown for one group of links, highlighted when the current page or home section is in it. */
function NavMenu({ group, active }: { group: (typeof navGroups)[number]; active: string | null }) {
  const { t } = useI18n();
  const linkTo = useLinkTo();
  const links = navLinks.filter((l) => l.group === group);
  const current = links.some((l) => l.href === active);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 data-[state=open]:bg-secondary data-[state=open]:text-foreground",
            current && "bg-secondary text-foreground",
          )}
        >
          {t.nav[group]}
          <ChevronDown className="size-3.5 opacity-60 transition-transform in-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="w-80 rounded-2xl p-1.5">
        {links.map((l) => {
          const Icon = navIcons[l.key];
          return (
            <DropdownMenuItem key={l.href} asChild className="items-start gap-3 rounded-xl px-3 py-2.5">
              <Link to={linkTo(l)} aria-current={active === l.href ? "page" : undefined}>
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className={cn("block text-sm font-semibold", active === l.href && "text-primary")}>{t.nav[l.key]}</span>
                  <span className="block text-xs text-muted-foreground">{t.navHints[l.key]}</span>
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SiteHeader() {
  const { t, href, locale } = useI18n();
  // A long store name needs the room on small phones; the menu still has the store buttons.
  const longBrand = appNames[locale].brand.length > 16;
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveHref();
  const linkTo = useLinkTo();

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
          {navGroups.map((group) => (
            <NavMenu key={group} group={group} active={active} />
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1">
          <div className="hidden sm:block">
            <LanguageMenu />
          </div>
          <ThemeToggle label={t.nav.toggleTheme} />
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden rounded-full px-3.5 font-semibold shadow-sm hover:-translate-y-0.5 sm:px-4",
              longBrand ? "min-[440px]:inline-flex" : "min-[380px]:inline-flex",
            )}
          >
            <Link to={href("/#download")}>{t.nav.getApp}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="rounded-full lg:hidden" aria-label={t.nav.openMenu}>
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={localeInfo[locale].dir === "rtl" ? "left" : "right"} className="w-[85vw] max-w-sm overflow-y-auto p-6">
              <SheetTitle className="sr-only">{t.nav.menu}</SheetTitle>
              <Logo />
              <nav className="mt-6 flex flex-col gap-5" aria-label="Mobile">
                {navGroups.map((group) => (
                  <div key={group}>
                    <p className="px-4 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t.nav[group]}</p>
                    <div className="mt-1 flex flex-col">
                      {navLinks
                        .filter((l) => l.group === group)
                        .map((l) => {
                          const Icon = navIcons[l.key];
                          return (
                            <SheetClose asChild key={l.href}>
                              <Link
                                to={linkTo(l)}
                                aria-current={active === l.href ? "page" : undefined}
                                className={cn("flex items-center gap-3 rounded-2xl px-4 py-2.5 hover:bg-secondary", active === l.href && "bg-secondary")}
                              >
                                <Icon className="size-5 shrink-0 text-primary" />
                                <span>
                                  <span className="block font-display text-base font-semibold">{t.nav[l.key]}</span>
                                  <span className="block text-xs text-muted-foreground">{t.navHints[l.key]}</span>
                                </span>
                              </Link>
                            </SheetClose>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </nav>
              <StoreButtons placement="menu" className="mt-8 max-w-none sm:flex-col [&>a]:w-full" />
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
              lang={localeInfo[l.locale].hreflang}
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
