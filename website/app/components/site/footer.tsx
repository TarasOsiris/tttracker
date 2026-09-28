import { Link } from "react-router";
import { links, navLinks } from "~/content/site";
import { Logo } from "./header";

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
  return (
    <footer className="border-t bg-surface-low">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The training journal for ping pong and table tennis players. Log sessions, record matches, see your progress.
          </p>
        </div>
        <Column title="Product">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link to={l.href} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </Column>
        <Column title="Download">
          <External href={links.appStore}>App Store</External>
          <External href={links.googlePlay}>Google Play</External>
        </Column>
        <Column title="Company">
          <External href={links.support}>Support</External>
          <External href={links.privacy}>Privacy Policy</External>
          <External href={links.telegram}>Telegram community</External>
        </Column>
        <Column title="More from us">
          <External href={links.ttServes}>TT Serves: serve encyclopedia</External>
        </Column>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()}{" "}
          <a href={links.studio} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            Nineva Studios
          </a>
          . App Store is a service mark of Apple Inc. Google Play is a trademark of Google LLC.
        </p>
      </div>
    </footer>
  );
}
