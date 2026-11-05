// Apple's paged and unpaged RSS feeds can disagree. Read both so an empty
// cached endpoint cannot hide a newer review. Quotes always keep their wording.
export const REVIEW_STOREFRONTS = [
  "us", "gb", "ca", "au", "de", "fr", "es", "it", "nl", "br", "mx", "jp",
  "kr", "cn", "in", "ua", "pl", "sa", "tr", "id", "vn", "th", "se", "dk",
  "fi", "no", "cz", "ro", "my", "pt", "tw",
];
const COUNTRY_LANG = { de: "de", fr: "fr", es: "es", it: "it", nl: "nl", br: "pt", pt: "pt", mx: "es", jp: "ja", kr: "ko", cn: "zh", tw: "zh", ua: "uk", pl: "pl", tr: "tr", id: "id" };

function guessLang(text, country) {
  if (/[Ѐ-ӿ]/.test(text)) return country === "ua" ? "uk" : "ru";
  if (/[぀-ヿ]/.test(text)) return "ja";
  if (/[가-힯]/.test(text)) return "ko";
  if (/[一-鿿]/.test(text)) return "zh";
  const words = text.toLowerCase().match(/\b(the|and|is|it|i|to|this|with|for|my|very|really|app)\b/g) ?? [];
  return words.length >= 2 ? "en" : COUNTRY_LANG[country] ?? "en";
}

async function readFeed(url, country) {
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const data = await response.json();
  if (!data.feed) throw new Error("Missing review feed");
  return [data.feed.entry ?? []].flat().filter(Boolean).flatMap((entry) => {
    const id = String(entry.id?.label ?? "").trim();
    const rating = Number(entry["im:rating"]?.label);
    const text = String(entry.content?.label ?? "").trim();
    const title = String(entry.title?.label ?? "").trim();
    const author = String(entry.author?.name?.label ?? "").trim();
    const date = String(entry.updated?.label ?? "").slice(0, 10);
    if (!id || !Number.isInteger(rating) || rating < 1 || rating > 5 || !text || !author || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
    return [{ id, rating, title, text, author, date, country, lang: guessLang(title + " " + text, country) }];
  });
}

export async function fetchAppStoreReviews(appId, previous = []) {
  const reviews = [];
  const cachedCountries = new Set();
  // At most eight feed requests at once, even on a multi-app catalog build.
  for (let offset = 0; offset < REVIEW_STOREFRONTS.length; offset += 4) {
    const batch = REVIEW_STOREFRONTS.slice(offset, offset + 4);
    const groups = await Promise.all(batch.map(async (country) => {
      const base = "https://itunes.apple.com/" + country + "/rss/customerreviews/";
      const tail = "id=" + appId + "/sortBy=mostRecent/json";
      const results = await Promise.allSettled([
        readFeed(base + "page=1/" + tail, country),
        readFeed(base + tail, country),
      ]);
      const answered = results.filter((result) => result.status === "fulfilled");
      const fresh = answered.flatMap((result) => result.value);
      const cached = previous.filter((review) => review.country === country);
      if (cached.length && (answered.length < 2 || !fresh.length)) {
        cachedCountries.add(country);
        return [...fresh, ...cached];
      }
      return fresh;
    }));
    reviews.push(...groups.flat());
  }
  if (cachedCountries.size) console.warn("App Store " + appId + ": retained cached reviews for " + [...cachedCountries].join(", "));
  const unique = new Map();
  for (const review of reviews) {
    const existing = unique.get(review.id);
    if (!existing || review.date > existing.date) unique.set(review.id, review);
  }
  return [...unique.values()]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id, undefined, { numeric: true }))
    .slice(0, 24);
}
