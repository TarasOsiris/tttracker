import appIcon from "~/assets/icon/app-icon-512.png";
import { links } from "~/content/site";
import { useI18n } from "~/i18n/use-i18n";
import { TelegramIcon } from "./icons";
import { StoreButtons } from "./store-buttons";

export function CtaSection({ title, subtitle }: { title: React.ReactNode; subtitle: string }) {
  const { t } = useI18n();
  return (
    <section id="download" className="px-4 py-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand-navy px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary opacity-60 blur-2xl dark:opacity-25" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-tertiary opacity-40 blur-3xl dark:opacity-20" />
        <img src={appIcon} alt="" width={72} height={72} className="relative mx-auto size-18 drop-shadow-xl" />
        <h2 className="relative mx-auto mt-8 max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl sm:leading-[1.08]">
          {title}
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/75">{subtitle}</p>
        <StoreButtons inverted placement="cta" className="relative mx-auto mt-9 justify-center" />
        <a
          href={links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white"
        >
          <TelegramIcon className="size-4" />
          {t.cta.telegram}
        </a>
      </div>
    </section>
  );
}
