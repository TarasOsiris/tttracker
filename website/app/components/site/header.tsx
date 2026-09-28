import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "~/components/ui/sheet";
import { APP_NAME, navLinks } from "~/content/site";
import { cn } from "~/lib/utils";
import { StoreButtons } from "./store-buttons";
import { ThemeToggle } from "./theme-toggle";

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5 font-display text-[17px] font-bold tracking-tight">
      <img src="/app-icon-512.png" alt="" width={32} height={32} className="size-8 rounded-[9px] shadow-sm" />
      <span>{APP_NAME}</span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

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
              to={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full px-4 font-semibold shadow-sm hover:-translate-y-0.5 sm:inline-flex">
            <Link to="/#download">Get the app</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="rounded-full lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.href}>
                    <Link to={l.href} className="rounded-2xl px-4 py-3 font-display text-lg font-semibold hover:bg-secondary">
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <StoreButtons className="mt-8 max-w-none sm:flex-col [&>a]:w-full" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
