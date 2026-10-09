import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type ShouldRevalidateFunctionArgs,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import appleTouchIcon from "~/assets/icon/apple-touch-icon.png";
import favicon16 from "~/assets/icon/favicon-16x16.png?no-inline";
import favicon32 from "~/assets/icon/favicon-32x32.png?no-inline";
import { CONSENT_KEY, ConsentBanner } from "~/components/site/consent-banner";
import { SiteFooter } from "~/components/site/footer";
import { SiteHeader } from "~/components/site/header";
import { buttonVariants } from "~/components/ui/button";
import { blogLocales } from "~/content/blog.server";
import { APP_STORE_ID } from "~/content/site";
import { localeFromPath, localeInfo, localizePath } from "~/i18n/config";
import { uiMessages } from "~/i18n/messages.server";
import "./app.css";

const GA_ID = "G-XPDY4TC15W";

// Runs before paint so a saved dark theme never flashes. Light is the default.
const themeScript = `(function(){try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")==="dark")}catch(e){}})()`;

const ICON_VERSION = 3;

// Google Consent Mode v2, before GA's config: analytics cookies wait for consent in the EEA, the UK and Switzerland
// (Google resolves the region from the IP), and are on elsewhere; the site has no ads, so ad signals stay off
// everywhere. A choice made in the consent banner is re-applied on every page load.
const CONSENT_REGIONS = [
  ...["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT"],
  ...["NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH"],
];
const deniedAds = "ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'";
const gaScript =
  `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}` +
  `gtag('consent','default',{analytics_storage:'granted',${deniedAds}});` +
  `gtag('consent','default',{analytics_storage:'denied',${deniedAds},region:${JSON.stringify(CONSENT_REGIONS)}});` +
  `try{var c=localStorage.getItem('${CONSENT_KEY}');if(c==='granted'||c==='denied')gtag('consent','update',{analytics_storage:c})}catch(e){}` +
  `gtag('js',new Date());gtag('config','${GA_ID}');`;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Poppins:wght@400;500;600&display=swap",
  },
  // The PNGs are imported so their URLs carry a content hash; files that must keep a fixed path take
  // ICON_VERSION instead. Bump it whenever public/favicon.ico or the manifest icons change.
  { rel: "icon", href: `/favicon.ico?v=${ICON_VERSION}`, sizes: "any" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32 },
  { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16 },
  { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon },
  { rel: "manifest", href: `/site.webmanifest?v=${ICON_VERSION}` },
];

// Runs at build time for every prerendered path; only that locale's UI strings reach the page.
export function loader({ request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  // Languages with a blog index of their own; the others link to the English blog.
  return { locale, t: uiMessages(locale), blogLocales };
}

// The root route has no URL params, so by default its strings would stay in the old language after a
// client-side switch from /es/... to /de/....
export function shouldRevalidate({ currentUrl, nextUrl, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) {
  return localeFromPath(currentUrl.pathname) !== localeFromPath(nextUrl.pathname) || defaultShouldRevalidate;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = localeFromPath(useLocation().pathname);
  const data = useRouteLoaderData<typeof loader>("root");
  return (
    <html lang={localeInfo[locale].hreflang} dir={localeInfo[locale].dir ?? "ltr"} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#415f91" />
        {/* Safari's Smart App Banner: a native "Get" bar for the App Store listing on iPhone and iPad. */}
        <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          {data?.t.nav.skipToContent ?? "Skip to content"}
        </a>
        {data && <SiteHeader />}
        <main id="main">{children}</main>
        {data && <SiteFooter />}
        {data && <ConsentBanner />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <div className="min-h-screen" />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const locale = localeFromPath(useLocation().pathname);
  const t = useRouteLoaderData<typeof loader>("root")?.t.errors;
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-6xl">🏓</p>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
        {notFound ? (t?.notFoundTitle ?? "That ball went off the table") : (t?.errorTitle ?? "Something went wrong")}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {notFound ? (t?.notFoundBody ?? "We couldn't find that page.") : (t?.errorBody ?? "Please try again in a moment.")}
      </p>
      <a href={localizePath(locale, "/")} className={buttonVariants({ className: "mt-8 rounded-full" })}>
        {t?.backHome ?? "Back to home"}
      </a>
    </section>
  );
}
