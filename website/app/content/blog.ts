// Blog posts, in English only (news and commentary are not translated). Newest first. Inline links use
// [label](url) and **bold**, same as the legal pages. Adding a post here adds its page to the prerender
// list and sitemap.xml automatically.
import type { LegalBlock } from "./legal";

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description / card summary, aim for 140-160 characters. */
  description: string;
  /** ISO date. */
  published: string;
  readMinutes: number;
  keywords: string[];
  intro: string;
  sections: { heading: string; blocks: LegalBlock[] }[];
  sources: { label: string; url: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "asian-games-2026-table-tennis-recap",
    title: "Table Tennis News: Japan Stuns China, Lin Shidong Wins Three Golds at the 2026 Asian Games",
    description:
      "Asian Games 2026 table tennis recap: Japan's men end China's gold streak, Lin Shidong and Wang Manyu take singles titles, plus the WTT events to watch in October.",
    published: "2026-10-03",
    readMinutes: 4,
    keywords: [
      "table tennis news",
      "Asian Games 2026 table tennis",
      "Aichi-Nagoya Asian Games",
      "Lin Shidong",
      "Wang Manyu",
      "WTT Champions Montpellier",
      "ping pong news",
    ],
    intro:
      "The table tennis world spent the last week in Nagoya, where the Aichi-Nagoya Asian Games delivered one of the biggest team upsets in years. Here is what happened, who won, and which tournaments to follow next.",
    sections: [
      {
        heading: "Japan's men beat China for team gold",
        blocks: [
          "The headline result came in the men's team event on September 24 at Sky Hall Toyota. **Japan beat China**, with Sora Matsushima winning the deciding match 3-1 against Wen Ruibo.",
          "It was Japan's first Asian Games men's team title since Bangkok 1966, and it ended China's run of eight straight titles in the event. China did win the women's team gold.",
        ],
      },
      {
        heading: "China still took six of seven golds",
        blocks: [
          "The men's team final was the only gold China missed. Across the individual events the results were:",
          {
            list: [
              "**Men's singles:** Lin Shidong beat defending champion Wang Chuqin in an all-Chinese final.",
              "**Women's singles:** Wang Manyu beat Sun Yingsha 4-2, again an all-Chinese final.",
              "**Mixed doubles:** Lin Shidong and Kuai Man beat Wang Chuqin and Sun Yingsha 4-0 (11-9, 13-11, 11-9, 11-9).",
              "**Women's doubles:** Kuai Man and Wang Manyu beat Japan's Miwa Harimoto and Hina Hayata 4-0.",
            ],
          },
          "Lin Shidong won three titles on his Asian Games debut, and Kuai Man collected three of her own.",
        ],
      },
      {
        heading: "The upset of the week: Alamiyan beats Harimoto",
        blocks: [
          "In the men's singles quarterfinals, Iran's **Noshad Alamiyan**, ranked 344th in the world, beat Japan's Tomokazu Harimoto, ranked fourth, 4-3. Harimoto's exit came a few days after Japan's team triumph, and it is a reminder of how small the margin is at this level in a best-of-seven.",
        ],
      },
      {
        heading: "What to watch in October",
        blocks: [
          {
            list: [
              "**WTT Champions Montpellier:** October 27 to November 1.",
              "**WTT Feeder Chennai:** October 28 to November 1.",
              "**WTT Youth Contenders:** Houston (October 18-21), Lignano and Senec (October 21-27), Chennai (October 23-26) and Szombathely (October 29 to November 1).",
            ],
          },
          "Dates come from the ITTF and WTT calendars and can change, so check the official schedule before you plan to watch.",
        ],
      },
      {
        heading: "Learn from the pros: what you can copy this week",
        blocks: [
          "Alamiyan's win is a good case study in match preparation: a lower-ranked player who knows an opponent's habits can take the match to a seventh game. You do not need a coach to do that. Log your matches and opponents in [Ping Pong & Table Tennis Log](/), and you will see which serves, spins and patterns decide your own results.",
          "If you want to add a serve to your game, browse the [serve encyclopedia](/serves) or try one of the free [training drills](/drills).",
        ],
      },
    ],
    sources: [
      { label: "Xinhua: Asian Games table tennis, September 26", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
      { label: "China Daily: Wang beats Sun to win women's singles gold", url: "https://www.chinadailyhk.com/hk/article/640211" },
      { label: "China Daily: China takes six table tennis golds", url: "https://www.chinadailyasia.com/hk/article/640271" },
      { label: "SCMP: Japan men stun China to claim team gold", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
      { label: "ITTF 2026 events calendar", url: "https://www.ittf.com/2026-events-calendar/" },
    ],
  },
];

export const postSlugs = posts.map((p) => p.slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const BLOG_TITLE = "Table Tennis News & Tips Blog";
export const BLOG_DESCRIPTION =
  "Latest table tennis news, tournament recaps and practical training tips for ping pong players, from the makers of Ping Pong & Table Tennis Log.";

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
