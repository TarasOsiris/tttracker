// Blog posts, in English only (news and commentary are not translated). Newest first. Inline links use
// [label](url) and **bold**, same as the legal pages. Adding a post here adds its page to the prerender
// list and sitemap.xml automatically.
import type { LegalBlock } from "./legal";

export type BlogImage = {
  /** File under public/blog/. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Caption shown under the image; say honestly when it is an archive photo. */
  caption: string;
  /** Photographer and licence, e.g. "Bearas, CC BY-SA 4.0". */
  credit: string;
  /** Page the photo came from (Wikimedia Commons file page). */
  creditUrl: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description / card summary, aim for 140-160 characters. */
  description: string;
  /** ISO date. */
  published: string;
  readMinutes: number;
  keywords: string[];
  hero: BlogImage;
  intro: string;
  /** "In short" bullets shown right under the intro. */
  takeaways: string[];
  sections: { heading: string; image?: BlogImage; blocks: LegalBlock[] }[];
  sources: { label: string; url: string }[];
};

export const posts: BlogPost[] = [
  {
    slug: "asian-games-2026-table-tennis-recap",
    title: "Table Tennis News: Japan Stuns China, Lin Shidong Wins Three Golds at the 2026 Asian Games",
    description:
      "Asian Games 2026 table tennis recap: Japan's men end China's gold streak, Lin Shidong and Wang Manyu take singles titles, plus the WTT events to watch in October.",
    published: "2026-10-03",
    readMinutes: 5,
    keywords: [
      "table tennis news",
      "Asian Games 2026 table tennis",
      "Aichi-Nagoya Asian Games",
      "Lin Shidong",
      "Wang Manyu",
      "WTT Champions Montpellier",
      "ping pong news",
    ],
    hero: {
      src: "/blog/asian-games-2026-arena.webp",
      width: 1200,
      height: 675,
      alt: "Packed arena with several blue table tennis courts in play at a World Team Table Tennis Championships",
      caption: "A packed arena at the 2026 World Team Table Tennis Championships in London. Archive photo, not from Nagoya.",
      credit: "Bearas, CC BY-SA 4.0",
      creditUrl: "https://commons.wikimedia.org/wiki/File:2026_World_Team_Table_Tennis_Championships_20260503_135123.jpg",
    },
    intro:
      "One week, seven gold medals, and one result nobody saw coming. The Aichi-Nagoya Asian Games just wrapped up its table tennis programme, and Japan's men won Asian Games team gold for the first time since 1966, beating China to do it. Here is the full recap, the upset that stole the quarterfinals, and what to watch next.",
    takeaways: [
      "**Japan's men won team gold**, ending China's eight-title streak at the Asian Games.",
      "**China still won 6 of 7 golds**, with Lin Shidong taking three on his Asian Games debut.",
      "**Wang Manyu beat Sun Yingsha 4-2** in an all-Chinese women's singles final.",
      "**World No. 344 Noshad Alamiyan stunned world No. 4 Tomokazu Harimoto** in the quarterfinals.",
      "**Next up:** WTT Champions Montpellier starts October 27.",
    ],
    sections: [
      {
        heading: "Japan's men beat China for team gold",
        blocks: [
          "The headline result came in the men's team event on September 24 at Sky Hall Toyota. **Japan beat China**, with [Sora Matsushima](https://en.wikipedia.org/wiki/Sora_Matsushima) winning the deciding match 3-1 against Wen Ruibo.",
          "It was Japan's first Asian Games men's team title since Bangkok 1966, and it ended China's run of eight straight titles in the event. China did win the women's team gold, so the evening ended with the old order restored on one side of the draw and shaken on the other.",
        ],
      },
      {
        heading: "China still took six of seven golds",
        blocks: [
          "The men's team final was the only gold China missed. Across the individual events the results were:",
          {
            list: [
              "**Men's singles:** [Lin Shidong](https://en.wikipedia.org/wiki/Lin_Shidong) beat defending champion [Wang Chuqin](https://en.wikipedia.org/wiki/Wang_Chuqin) in an all-Chinese final.",
              "**Women's singles:** [Wang Manyu](https://en.wikipedia.org/wiki/Wang_Manyu) beat [Sun Yingsha](https://en.wikipedia.org/wiki/Sun_Yingsha) 4-2, again an all-Chinese final.",
              "**Mixed doubles:** Lin Shidong and Kuai Man beat Wang Chuqin and Sun Yingsha 4-0 (11-9, 13-11, 11-9, 11-9).",
              "**Women's doubles:** Kuai Man and Wang Manyu beat Japan's Miwa Harimoto and Hina Hayata 4-0.",
            ],
          },
          "Lin Shidong won three titles on his Asian Games debut, and Kuai Man collected three of her own. For the full draw, see the [Asian Games table tennis page on Wikipedia](https://en.wikipedia.org/wiki/Table_tennis_at_the_2026_Asian_Games) and the [PingSunday results tracker](https://pingsunday.com/2026-asian-games-table-tennis-schedules-and-results/).",
        ],
      },
      {
        heading: "The upset of the week: Alamiyan beats Harimoto",
        image: {
          src: "/blog/harimoto-tomokazu.webp",
          width: 1000,
          height: 666,
          alt: "Young Tomokazu Harimoto crouching over the table about to serve during a practice session",
          caption: "Tomokazu Harimoto serving, in an archive photo from 2017.",
          credit: "Peter Porai-Koshits, CC BY-SA 4.0",
          creditUrl: "https://commons.wikimedia.org/wiki/File:ITTF_World_Tour_2017_German_Open_Harimoto_Tomokazu_02.jpg",
        },
        blocks: [
          "In the men's singles quarterfinals, Iran's **Noshad Alamiyan**, ranked 344th in the world, beat Japan's [Tomokazu Harimoto](https://en.wikipedia.org/wiki/Tomokazu_Harimoto), ranked fourth, 4-3. Harimoto's exit came two days after Japan's team triumph, and it is a reminder of how thin the margin is in a best-of-seven: a ranking gap of 340 places can disappear in one hot game.",
          "It was not the only Japanese disappointment in the singles. Matsushima, the hero of the team final, lost 4-2 to Lin Shidong in the quarterfinals.",
        ],
      },
      {
        heading: "Women's singles: Wang Manyu takes gold",
        image: {
          src: "/blog/wang-manyu.webp",
          width: 1000,
          height: 666,
          alt: "Wang Manyu in a yellow and green shirt returning the ball at the table",
          caption: "Wang Manyu in action, in an archive photo from 2016.",
          credit: "XIAOYU TANG, CC BY-SA 2.0",
          creditUrl: "https://commons.wikimedia.org/wiki/File:Wang_Manyu_ACTTC2016_10.jpeg",
        },
        blocks: [
          "The women's draw was a Chinese affair at the sharp end. Wang Manyu beat Sun Yingsha 4-2 for the singles title, then added the women's doubles with Kuai Man. Japan's Hina Hayata and Miwa Harimoto were the best of the rest, reaching the singles semifinals and the doubles final.",
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
          "Streams, draws and rankings are on [World Table Tennis](https://www.worldtabletennis.com), and the [ITTF events calendar](https://www.ittf.com/2026-events-calendar/) has the full schedule. Dates can change, so check before you plan to watch.",
        ],
      },
      {
        heading: "Steal one idea from the pros this week",
        blocks: [
          "Alamiyan's win is a case study in preparation: a lower-ranked player who knows an opponent's habits can take the match to a seventh game. You do not need a coach to do that. Log your matches and opponents in [Ping Pong & Table Tennis Log](/), and you will see which serves, spins and patterns decide your own results.",
          "Want a new weapon? Browse the [serve encyclopedia](/serves) for the serves the pros use, learn the [spins](/spins), or run one of the free [training drills](/drills) before your next session. Quick test of your knowledge: take the [serve quiz](/quiz).",
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
