import snapshot from "~/content/app-store-reviews.json";
import { useI18n } from "~/i18n/use-i18n";

const HEADINGS: Record<string, string> = {
  "en": "App Store reviews",
  "es": "Reseñas de la App Store",
  "de": "Rezensionen im App Store",
  "fr": "Avis de l’App Store",
  "pt": "Avaliações da App Store",
  "ja": "App Storeのレビュー",
  "it": "Recensioni sull’App Store",
  "ko": "App Store 리뷰",
  "zh": "App Store 用户评价",
  "ar": "تقييمات App Store",
  "hi": "App Store की समीक्षाएँ",
  "id": "Ulasan App Store",
  "tr": "App Store yorumları",
  "uk": "Відгуки в App Store",
  "pl": "Opinie w App Store",
  "nl": "App Store-recensies",
  "sv": "Recensioner i App Store",
  "da": "Anmeldelser i App Store",
  "fi": "App Store -arvostelut",
  "no": "Anmeldelser i App Store",
  "cs": "Recenze v App Storu",
  "ro": "Recenzii din App Store",
  "vi": "Đánh giá trên App Store",
  "th": "รีวิวบน App Store",
  "ms": "Ulasan App Store",
  "ru": "Отзывы в App Store"
};

export function AppStoreReviews() {
  const { locale } = useI18n();
  const reviews = snapshot.apps["table-tennis-tracker"].slice(0, 6);
  if (!reviews.length) return null;
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" });
  return (
    <section id="reviews" aria-labelledby="app-store-reviews-title" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 id="app-store-reviews-title" className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {HEADINGS[locale] ?? HEADINGS.en}
        </h2>
        <ul className={"mx-auto mt-10 grid gap-5 " + (reviews.length === 1 ? "max-w-2xl" : "md:grid-cols-2 lg:grid-cols-3")}>
          {reviews.map((review) => (
            <li key={review.id} className="rounded-2xl border bg-card p-6 sm:p-7">
              <figure lang={review.lang} className="flex h-full flex-col">
                <p role="img" aria-label={review.rating + "/5"} className="text-primary tracking-[0.12em]">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </p>
                <blockquote dir="auto" className="mt-4 flex-1">
                  {review.title && <p className="font-semibold">{review.title}</p>}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.text}</p>
                </blockquote>
                <figcaption className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  <bdi className="font-semibold text-foreground">{review.author}</bdi>
                  {" · "}
                  <time dateTime={review.date}>{dateFormat.format(new Date(review.date + "T00:00:00Z"))}</time>
                  <a
                    href={"https://apps.apple.com/" + review.country + "/app/id6758044383?see-all=reviews"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-primary underline underline-offset-4"
                  >
                    App Store {review.country.toUpperCase()} ↗
                  </a>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
