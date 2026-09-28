/**
 * Language-aware wrappers around React Router's navigation primitives, so serve pages
 * keep using language-neutral paths (`/serves/pendulum`).
 */
import { forwardRef, useCallback } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useNavigate as useRouterNavigate,
  type LinkProps,
  type NavLinkProps,
  type NavigateOptions,
  type To,
} from "react-router";
import { type Locale, localizePath } from "~/i18n/config";
import { useLocale } from "~/i18n/use-i18n";

function localizeTo(to: To, locale: Locale): To {
  if (typeof to === "string") return to.startsWith("/") ? localizePath(locale, to) : to;
  return to.pathname?.startsWith("/") ? { ...to, pathname: localizePath(locale, to.pathname) } : to;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...props }, ref) {
  return <RouterLink ref={ref} to={localizeTo(to, useLocale())} {...props} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ to, ...props }, ref) {
  return <RouterNavLink ref={ref} to={localizeTo(to, useLocale())} {...props} />;
});

export function useNavigate() {
  const navigate = useRouterNavigate();
  const locale = useLocale();
  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === "number") return navigate(to);
      return navigate(localizeTo(to, locale), options);
    },
    [navigate, locale],
  );
}
