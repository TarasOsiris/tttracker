import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/root";
import { SiteFooter } from "~/components/site/footer";
import { SiteHeader } from "~/components/site/header";
import { buttonVariants } from "~/components/ui/button";
import { localeFromPath, localizePath } from "~/i18n/config";
import { uiMessages } from "~/i18n/messages.server";
import "./app.css";

const GA_ID = "G-XPDY4TC15W";

// Runs before paint so the saved/system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

const gaScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Poppins:wght@400;500;600&display=swap",
  },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

// Runs at build time for every prerendered path; only that locale's UI strings reach the page.
export function loader({ request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  return { locale, t: uiMessages(locale) };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const locale = localeFromPath(useLocation().pathname);
  const data = useRouteLoaderData<typeof loader>("root");
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#415f91" />
        <meta name="robots" content="index, follow" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
        >
          {data?.t.nav.skipToContent ?? "Skip to content"}
        </a>
        {data && <SiteHeader />}
        <main id="main">{children}</main>
        {data && <SiteFooter />}
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
