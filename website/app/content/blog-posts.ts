// The posts, newest first, in English. A translation goes in its language's list under the same slug; only
// translated posts get a page in that language (blog.server.ts), the rest are linked in English.
import type { Locale } from "../i18n/config";
import type { BlogPost } from "./blog";

const hero = {
  src: "/blog/asian-games-2026-arena.webp",
  width: 1200,
  height: 675,
  alt: "Packed arena with several blue table tennis courts in play at a World Team Table Tennis Championships",
  caption: "A packed arena at the 2026 World Team Table Tennis Championships in London. Archive photo, not from Nagoya.",
  credit: "Bearas, CC BY-SA 4.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:2026_World_Team_Table_Tennis_Championships_20260503_135123.jpg",
};
const harimotoImage = {
  src: "/blog/harimoto-tomokazu.webp",
  width: 1000,
  height: 666,
  alt: "Young Tomokazu Harimoto crouching over the table about to serve during a practice session",
  caption: "Tomokazu Harimoto serving, in an archive photo from 2017.",
  credit: "Peter Porai-Koshits, CC BY-SA 4.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:ITTF_World_Tour_2017_German_Open_Harimoto_Tomokazu_02.jpg",
};
const wangManyuImage = {
  src: "/blog/wang-manyu.webp",
  width: 1000,
  height: 666,
  alt: "Wang Manyu in a yellow and green shirt returning the ball at the table",
  caption: "Wang Manyu in action, in an archive photo from 2016.",
  credit: "XIAOYU TANG, CC BY-SA 2.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Wang_Manyu_ACTTC2016_10.jpeg",
};

const lebrunHero = {
  src: "/blog/felix-lebrun.webp",
  width: 1200,
  height: 675,
  alt: "Felix Lebrun leaning over the table to play a forehand with the ball just leaving his paddle",
  caption: "Félix Lebrun in action. Archive photo from the 2022 European Championships in Munich, not from Beijing.",
  credit: "Granada, CC BY-SA 4.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:20220818_European_Championships_Munich_2022_Felix_Lebrun_850_9499.jpg",
};
const lebrunInline = {
  src: "/blog/felix-lebrun-serve.webp",
  width: 1000,
  height: 666,
  alt: "Felix Lebrun playing a close-to-the-table shot with glasses on and the ball by his paddle",
  caption: "Lebrun at the 2022 European Championships in Munich, aged 15. Archive photo.",
  credit: "Granada, CC BY-SA 4.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:20220818_European_Championships_Munich_2022_Felix_Lebrun_850_9499.jpg",
};

const batraHero = {
  src: "/blog/manika-batra.webp",
  width: 1200,
  height: 675,
  alt: "Manika Batra in a blue India shirt waiting for the ball at the table, with an opponent in yellow in the foreground",
  caption: "Manika Batra in action. Archive photo from the Commonwealth Table Tennis Championships in Cuttack, India, not from Beijing.",
  credit: "Government of Odisha, CC BY 4.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:Manika_Batra.jpg",
};
const batraInline = {
  src: "/blog/manika-batra-rally.webp",
  width: 1000,
  height: 666,
  alt: "Manika Batra watching the ball after tossing it up to serve at the table",
  caption: "Batra at the Commonwealth Championships in Cuttack. Archive photo, not from China Smash.",
  credit: "Government of Odisha, CC BY 4.0",
  creditUrl: "https://commons.wikimedia.org/wiki/File:216_Batra_Manika_India1.jpg",
};

const arenaImage = {
  ...hero,
  caption: "A packed arena at the 2026 World Team Table Tennis Championships in London. Archive photo, not from Beijing.",
};

export const blogPostsByLocale: Partial<Record<Locale, BlogPost[]>> & { en: BlogPost[] } = {
  en: [{
  slug: "china-smash-2026-upsets-zhu-sibing-zhou-qihao-quarterfinals",
  title: "China Smash 2026: Zhu Sibing and Zhou Qihao Stun Seeds, Quarterfinals Set",
  description:
    "China Smash 2026 round of 16: qualifier Zhu Sibing beats Kuai Man, Zhou Qihao sweeps Harimoto, and Sun Yingsha falls to world No. 101. Full quarterfinal lineup.",
  published: "2026-10-09",
  readMinutes: 4,
  keywords: [
    "China Smash 2026 quarterfinals",
    "Zhu Sibing Kuai Man",
    "Zhou Qihao Harimoto",
    "Sun Yingsha Orawan Paranang",
    "Wang Manyu Shin Yu-bin",
    "WTT China Smash Beijing",
    "table tennis results",
    "table tennis news today",
  ],
  hero: {
    ...hero,
    caption: "A packed arena at the 2026 World Team Table Tennis Championships in London. Archive photo, not from Beijing.",
  },
  intro:
    "Beijing has turned into the upset capital of table tennis. World No. 1 Sun Yingsha lost to a player ranked 101st, qualifier Zhu Sibing (No. 134) knocked out fourth seed Kuai Man, and Zhou Qihao swept third seed Tomokazu Harimoto. The quarterfinals at the WTT China Smash are now wide open.",
  takeaways: [
    "**Orawan Paranang (Thailand, No. 101) beat Sun Yingsha 3-1** (8-11, 11-4, 12-10, 12-10), then lost to Honoka Hashimoto.",
    "**Qualifier Zhu Sibing beat Kuai Man 5-11, 12-10, 9-11, 11-9, 11-7** for her first Grand Smash quarterfinal.",
    "**Zhou Qihao beat Tomokazu Harimoto 11-9, 11-8, 11-9** and plays Jang Woo-jin next.",
    "**Defending champion Wang Manyu** beat Shi Xunyao in five games and meets Shin Yu-bin in the quarters.",
    "**Félix Lebrun (seed 1) plays Hugo Calderano** in the men's quarterfinals.",
  ],
  sections: [
    {
      heading: "Sun Yingsha out, Zhu Sibing in",
      image: wangManyuImage,
      blocks: [
        "On Wednesday, Thai qualifier Orawan Paranang beat two-time defending champion [Sun Yingsha](https://en.wikipedia.org/wiki/Sun_Yingsha) 3-1 (8-11, 11-4, 12-10, 12-10), according to [CGTN](https://news.cgtn.com/news/2026-10-08/WTT-China-Smash-highlighted-by-string-of-major-early-upsets-in-Beijing-1R4py2V4RKo/p.html). On Thursday Honoka Hashimoto beat her in straight games, but the damage to the draw was done.",
        "Then came Zhu Sibing, ranked 134th, who beat fourth seed Kuai Man 5-11, 12-10, 9-11, 11-9, 11-7, per [China Daily](https://chinadailyhk.com/hk/article/640772). She trailed in the match and won both deciding games. She now plays Japan's Hitomi Sato.",
        "Defending champion [Wang Manyu](https://en.wikipedia.org/wiki/Wang_Manyu) beat Shi Xunyao in five games and plays Korea's Shin Yu-bin, who beat Hina Hayata. The other women's quarterfinals are Miwa Harimoto against Wang Yidi, and Chen Xingtong against Hashimoto.",
      ],
    },
    {
      heading: "Zhou Qihao ends Harimoto's run",
      image: harimotoImage,
      blocks: [
        "[Tomokazu Harimoto](https://en.wikipedia.org/wiki/Tomokazu_Harimoto) came back from 0-2 in round one, but on Thursday he had no such rescue: Zhou Qihao won 11-9, 11-8, 11-9. Zhou plays ninth seed Jang Woo-jin of South Korea on Friday.",
        "Elsewhere Truls Möregårdh beat 13th seed Wen Ruibo in five games, and Sora Matsushima beat Kuo Guan-Hong 11-6, 5-11, 11-6, 11-4. Top seed [Félix Lebrun](https://en.wikipedia.org/wiki/F%C3%A9lix_Lebrun) meets Hugo Calderano, Möregårdh plays Lin Yun-Ju, and Matsushima plays Feng Yi-hsin, per the [Wikipedia bracket](https://en.wikipedia.org/wiki/China_Smash_2026).",
      ],
    },
    {
      heading: "Doubles and mixed doubles",
      blocks: [
        "In women's doubles, Wang Yidi/Jiang Yiyi beat Bernadette Szocs/Elizabeta Samara 3-0, and Wang Manyu/Kuai Man, Chen Yi/Li Yihui also reached the semifinals. In men's doubles, Wen Ruibo/Yuan Licen beat Izaac Quek/Koen Pang. The mixed doubles final on Friday is Lin Yun-ju/Cheng I-ching of Chinese Taipei against Korea's Lim Jong-hoon/Shin Yu-bin.",
      ],
    },
    {
      heading: "What it means",
      blocks: [
        "With Wang Chuqin and Lin Shidong absent injured, and Sun out, this is the most open Grand Smash of the year. Follow the final rounds (the event ends October 11) on [World Table Tennis](https://www.worldtabletennis.com). Our earlier posts cover the [preview](/blog/china-smash-2026-beijing-table-tennis-preview) and the [round of 32](/blog/china-smash-2026-day-results-wang-manyu-batra-lebrun-scare).",
      ],
    },
    {
      heading: "The lesson for your own matches",
      blocks: [
        "Both Zhu and Paranang won the deciding games by staying aggressive when ranking said they should not. At club level, the same happens at 9-9. Log your matches in [Ping Pong & Table Tennis Log](/) to see how you do in close games, then work on them with [drills](/drills), new options from the [serve encyclopedia](/serves) and reading [spin](/spins). Not sure where you stand? Try the [quiz](/quiz).",
      ],
    },
  ],
  sources: [
    { label: "CGTN: WTT China Smash highlighted by string of major early upsets in Beijing", url: "https://news.cgtn.com/news/2026-10-08/WTT-China-Smash-highlighted-by-string-of-major-early-upsets-in-Beijing-1R4py2V4RKo/p.html" },
    { label: "China Daily HK: Zhu, Zhou stun top seeds as Chinese paddlers surge at China Smash", url: "https://chinadailyhk.com/hk/article/640772" },
    { label: "Wikipedia: China Smash 2026", url: "https://en.wikipedia.org/wiki/China_Smash_2026" },
    { label: "Olympics.com: China Smash 2026 top stars and how to watch", url: "https://www.olympics.com/en/news/table-tennis-china-smash-2026-top-stars-watch-live" },
  ],
},
  {
    slug: "china-smash-2026-day-results-wang-manyu-batra-lebrun-scare",
  title: "China Smash 2026 Results: Wang Manyu Survives Batra, Lebrun Escapes a French Scare",
  description:
    "China Smash 2026 round of 32 results from Beijing: Wang Manyu beats Manika Batra, Félix Lebrun survives Coton, Wen Ruibo stops Duda and Harimoto comes back from 0-2.",
  published: "2026-10-07",
  readMinutes: 4,
  keywords: [
    "China Smash 2026 results",
    "Wang Manyu Manika Batra",
    "Felix Lebrun Flavien Coton",
    "Harimoto China Smash",
    "WTT China Smash Beijing",
    "table tennis results",
    "table tennis news today",
    "WTT Grand Smash",
  ],
  hero: batraHero,
  intro:
    "Two top seeds, two scares. At the WTT China Smash in Beijing, world No. 58 Manika Batra took a game off top-seeded Wang Manyu, and Félix Lebrun had to come back from a game down against his own countryman Flavien Coton. Both got through, but the early rounds showed how thin the margin is at a Grand Smash.",
  takeaways: [
    "**Wang Manyu beat Manika Batra 11-5, 9-11, 11-6, 11-5** in 31 minutes, after Batra led 9-9 in the second game.",
    "**Félix Lebrun beat Flavien Coton 9-11, 14-12, 11-9, 11-4** to reach the last 16.",
    "**Wen Ruibo, 19, swept Benedikt Duda 11-6, 11-8, 11-7** a day after Duda beat England's Tom Jarvis 3-2.",
    "**Tomokazu Harimoto came back from 0-2** to beat Denmark's Jonathan Groth 3-2 in round one.",
    "**The tournament runs until October 11** at Shougang Park in Beijing.",
  ],
  sections: [
    {
      heading: "Wang Manyu holds off Manika Batra",
      image: batraInline,
      blocks: [
        "Top seed [Wang Manyu](https://en.wikipedia.org/wiki/Wang_Manyu) won 11-5, 9-11, 11-6, 11-5 in 31 minutes, but it was not as comfortable as the result suggests. India's [Manika Batra](https://en.wikipedia.org/wiki/Manika_Batra), ranked 58th, was level at 9-9 in the second game and took it. [Xinhua](https://english.news.cn/20261006/5f57048bb3574fc9ae0d31bc1ffc82a6/c.html) quotes Wang afterwards: \"I didn't handle some opportunity balls particularly well, and there were some unforced errors.\"",
        "Why it matters: Wang is the favorite in a women's draw without much resistance at the top, so any wobble is news. Other round-of-32 results: Shi Xunyao beat Poland's Natalia Bajor 13-11, 11-7, 11-9, Wang Yidi beat Cheng I-Ching 15-13, 11-9, 2-11, 11-7, and Japan's Miwa Harimoto beat Hong Kong's Su Tsz Tung 11-5, 13-15, 11-6, 11-5.",
      ],
    },
    {
      heading: "Lebrun survives an all-French battle",
      blocks: [
        "[Félix Lebrun](https://en.wikipedia.org/wiki/F%C3%A9lix_Lebrun), the top seed since Wang Chuqin and Lin Shidong withdrew injured (see our [China Smash preview](/blog/china-smash-2026-beijing-table-tennis-preview)), lost the first game 9-11 to Flavien Coton, who then held two game points in the second. Lebrun saved them, won 14-12 and closed out 11-9, 11-4.",
        "Also through to the last 16 was Chinese Taipei's [Lin Yun-Ju](https://en.wikipedia.org/wiki/Lin_Yun-ju), who survived a five-game match against China's Huang Youzheng in which Huang had two match points.",
      ],
    },
    {
      heading: "Wen Ruibo stops Duda, Harimoto fights back",
      image: harimotoImage,
      blocks: [
        "Benedikt Duda (Germany) had beaten England's Tom Jarvis 3-2 in the round of 64 (12-14, 11-3, 9-11, 11-9, 11-6), according to [Table Tennis England](https://www.tabletennisengland.co.uk/news/2026/wtt-china-smash-2026/). The next day 19-year-old Wen Ruibo beat him 11-6, 11-8, 11-7.",
        "Japan's [Tomokazu Harimoto](https://en.wikipedia.org/wiki/Tomokazu_Harimoto) lost the first two games to Jonathan Groth, 9-11 and 7-11, then won three straight to take the match 3-2.",
        "In mixed doubles, Huang Youzheng and Chen Yi advanced 11-8, 11-6, 11-7 and now face Japan's Sora Matsushima and Miwa Harimoto.",
      ],
    },
    {
      heading: "What to watch next",
      blocks: [
        "Rankings after the event will matter: as of September 14, Wang Chuqin was world No. 1 on 8,157 points, with Lebrun second on 7,479 and Matsushima third on 6,930, according to the [ITTF ranking](https://en.wikipedia.org/wiki/ITTF_World_Ranking). A deep run for Lebrun with Wang Chuqin out could change that. Follow the bracket on [Wikipedia](https://en.wikipedia.org/wiki/China_Smash_2026) or [World Table Tennis](https://www.worldtabletennis.com).",
        "After Beijing: the Youth Contender in Lignano (October 21-27) and the Parkinson's and Alzheimer's world championships in Shanghai (October 20-25).",
      ],
    },
    {
      heading: "The lesson for your own matches",
      blocks: [
        "Batra won a game off the world's top-seeded player by playing the big points better for one game. You can do the same at club level, but only if you know where your points go. Log your matches in [Ping Pong & Table Tennis Log](/) and see which games you lose from 9-9. Then practice the shots that decide close games: [drills](/drills) for your third-ball attack, new options from the [serve encyclopedia](/serves), and reading incoming [spin](/spins). Not sure what you are facing? Try the [quiz](/quiz).",
      ],
    },
  ],
  sources: [
    { label: "Xinhua: Wang Manyu holds off tricky Batra as Lebrun, Lin survive scares at WTT China Smash", url: "https://english.news.cn/20261006/5f57048bb3574fc9ae0d31bc1ffc82a6/c.html" },
    { label: "Table Tennis England: WTT China Smash 2026", url: "https://www.tabletennisengland.co.uk/news/2026/wtt-china-smash-2026/" },
    { label: "Wikipedia: China Smash 2026", url: "https://en.wikipedia.org/wiki/China_Smash_2026" },
    { label: "Wikipedia: ITTF World Ranking", url: "https://en.wikipedia.org/wiki/ITTF_World_Ranking" },
    { label: "Olympics.com: China Smash 2026 top stars and how to watch", url: "https://www.olympics.com/en/news/table-tennis-china-smash-2026-top-stars-watch-live" },
  ],
},
  {
  slug: "china-smash-2026-beijing-table-tennis-preview",
  title: "China Smash 2026: Lebrun Leads Beijing Draw as Wang Chuqin and Lin Shidong Withdraw",
  description:
    "WTT China Smash 2026 in Beijing: Lebrun is top seed after Wang Chuqin and Lin Shidong pulled out, with $2M prize money, 2,000 ranking points and early upsets.",
  published: "2026-10-05",
  readMinutes: 4,
  keywords: [
    "China Smash 2026",
    "WTT China Smash Beijing",
    "Felix Lebrun",
    "Wang Manyu",
    "Sun Yingsha",
    "table tennis news",
    "WTT Grand Smash",
    "ping pong news",
  ],
  hero: lebrunHero,
  intro:
    "The last big WTT event of the season is under way in Beijing, and the draw just lost its two biggest stars. Wang Chuqin and Lin Shidong have both withdrawn injured, which hands France's Félix Lebrun the No. 1 seed and a very open path to 2,000 ranking points. Here is what you need to know before the main draw hits full speed.",
  takeaways: [
    "**WTT China Smash runs October 1-11** at Shougang Park in Beijing, with the main draw from October 4.",
    "**Wang Chuqin and Lin Shidong withdrew injured**, so Félix Lebrun is now the top men's seed.",
    "**Wang Manyu and Sun Yingsha are the top two women's seeds**, with China holding six of the top nine.",
    "**The winners collect 2,000 ranking points**, and the singles champions take home $135,000.",
    "**English qualifiers fell early**, including Liam Pitchford and Tin-Tin Ho.",
  ],
  sections: [
    {
      heading: "Lebrun is the man to beat",
      image: lebrunInline,
      blocks: [
        "With Wang Chuqin and Lin Shidong out through injury, [Félix Lebrun](https://en.wikipedia.org/wiki/F%C3%A9lix_Lebrun) is the No. 1 seed in men's singles, followed by Japan's [Sora Matsushima](https://en.wikipedia.org/wiki/Sora_Matsushima), [Tomokazu Harimoto](https://en.wikipedia.org/wiki/Tomokazu_Harimoto) and Sweden's Truls Möregårdh. Both Japanese players arrive on a high after the Asian Games, which we covered in our [Asian Games recap](/blog/asian-games-2026-table-tennis-recap).",
        "Why it matters: Wang Chuqin was the defending champion and the world No. 1 coming into the event, so his absence reshuffles the rankings race as well as the trophy picture. [Olympics.com's preview](https://www.olympics.com/en/news/table-tennis-china-smash-2026-top-stars-watch-live) calls the China Smash the last major of the WTT circuit season.",
      ],
    },
    {
      heading: "Women's draw: Wang Manyu and Sun Yingsha lead",
      blocks: [
        "In the women's singles, [Wang Manyu](https://en.wikipedia.org/wiki/Wang_Manyu) is seeded first and [Sun Yingsha](https://en.wikipedia.org/wiki/Sun_Yingsha) second, followed by Japan's Miwa Harimoto and China's Kuai Man. China has six of the top nine women in the field. Wang Manyu beat Sun 4-2 in the Asian Games final last week, so the rematch everyone wants is a semifinal at the earliest.",
      ],
    },
    {
      heading: "What is at stake",
      blocks: [
        "China Smash is a WTT Grand Smash, the top tier of the circuit, and the numbers show it:",
        {
          list: [
            "**Prize money:** US$2,050,000 in total, with $135,000 for each singles winner and $68,000 for the finalists.",
            "**Ranking points:** 2,000 for the singles winner, 1,400 for the finalist, 900 for a semifinalist and 580 for a quarterfinalist.",
            "**Venue:** Shougang Park in Shijingshan, Beijing, with qualifying from October 1 and the main draw from October 4 to 11.",
          ],
        },
        "Draws, schedules and live streams are on [World Table Tennis](https://www.worldtabletennis.com), and the [China Smash 2026 Wikipedia page](https://en.wikipedia.org/wiki/China_Smash_2026) tracks the bracket as it fills in.",
      ],
    },
    {
      heading: "Early upsets: England's hopes end in qualifying",
      image: arenaImage,
      blocks: [
        "The qualifiers produced some tight finishes. [Table Tennis England](https://www.tabletennisengland.co.uk/news/2026/wtt-china-smash-2026/) reports that Liam Pitchford beat Edward Ly 11-4, 11-7, 5-11, 11-9 and Maciej Kubik 11-5, 11-3, 11-8, before losing a five-game thriller to Belgium's Cedric Nuytinck (world No. 59) 11-9, 11-5, 3-11, 8-11, 11-4.",
        "Tin-Tin Ho beat Chile's Paulina Vega 11-5, 11-3, 11-9, then lost in five to France's Audrey Zarif (world No. 105), 10-12, 7-11, 13-11, 11-7, 11-3, after leading two games to nil. Connor Green also went out in round one, losing 3-2 to Egypt's Youssef Abdelaziz. Lesson for everyone: leading 2-0 means nothing at this level.",
      ],
    },
    {
      heading: "More table tennis coming up",
      blocks: [
        {
          list: [
            "**WTT Champions Montpellier:** October 27 to November 1.",
            "**WTT Feeder Chennai:** October 28 to November 1.",
            "**WTT Youth Contender Lignano:** October 21-27.",
          ],
        },
        "Check the [ITTF events calendar](https://www.ittf.com/2026-events-calendar/) in case dates change.",
      ],
    },
    {
      heading: "Learn from Pitchford and Ho: how to close a match",
      blocks: [
        "Losing from 2-0 up or 2-1 up is the most common way club players give away matches too. Log your games in [Ping Pong & Table Tennis Log](/) and check whether your losses come in deciding games, and against which opponents. Then work on the fix: sharpen your third-ball attack with a few [training drills](/drills), add a surprise from the [serve encyclopedia](/serves), and make sure you understand the [spin](/spins) coming back at you. Test yourself with the [serve quiz](/quiz).",
      ],
    },
  ],
  sources: [
    { label: "Olympics.com: China Smash 2026 top stars and how to watch", url: "https://www.olympics.com/en/news/table-tennis-china-smash-2026-top-stars-watch-live" },
    { label: "Wikipedia: China Smash 2026", url: "https://en.wikipedia.org/wiki/China_Smash_2026" },
    { label: "Table Tennis England: WTT China Smash 2026", url: "https://www.tabletennisengland.co.uk/news/2026/wtt-china-smash-2026/" },
    { label: "Butterfly: China Smash, Japan brings momentum to Beijing", url: "https://butterflyonline.com/china-smash-japan-brings-momentum-to-beijing/" },
    { label: "PingSunday: China Smash 2026 players, schedule and prize money", url: "https://pingsunday.com/china-smash-2026-players-schedule-prize-money-and-ranking-points/" },
    { label: "ITTF 2026 events calendar", url: "https://www.ittf.com/2026-events-calendar/" },
  ],
},
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
  hero,
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
      image: harimotoImage,
      blocks: [
        "In the men's singles quarterfinals, Iran's **Noshad Alamiyan**, ranked 344th in the world, beat Japan's [Tomokazu Harimoto](https://en.wikipedia.org/wiki/Tomokazu_Harimoto), ranked fourth, 4-3. Harimoto's exit came two days after Japan's team triumph, and it is a reminder of how thin the margin is in a best-of-seven: a ranking gap of 340 places can disappear in one hot game.",
        "It was not the only Japanese disappointment in the singles. Matsushima, the hero of the team final, lost 4-2 to Lin Shidong in the quarterfinals.",
      ],
    },
    {
      heading: "Women's singles: Wang Manyu takes gold",
      image: wangManyuImage,
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
}],
  es: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "Noticias de Tenis de Mesa: Japón sorprende a China y Lin Shidong gana tres oros en los Juegos Asiáticos 2026",
      description:
        "Resumen de tenis de mesa de los Juegos Asiáticos 2026: el equipo masculino de Japón corta la racha de China, Lin Shidong y Wang Manyu ganan en individuales, y los torneos WTT de octubre.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "noticias de tenis de mesa",
        "Juegos Asiáticos 2026 tenis de mesa",
        "Juegos Asiáticos Aichi-Nagoya",
        "Lin Shidong",
        "Wang Manyu",
        "WTT Champions Montpellier",
        "noticias de ping pong",
      ],
      hero,
      intro:
        "El mundo del tenis de mesa se concentró la última semana en Nagoya, donde los Juegos Asiáticos de Aichi-Nagoya dejaron una de las mayores sorpresas por equipos en décadas. Esto es lo que ocurrió, quiénes ganaron y qué torneos seguir próximamente.",
      takeaways: [
        "**El equipo masculino de Japón ganó el oro**, cortando la racha de ocho títulos consecutivos de China.",
        "**China aun así se llevó 6 de los 7 oros**, con Lin Shidong logrando tres en su debut en los Juegos Asiáticos.",
        "**Wang Manyu venció a Sun Yingsha por 4-2** en una final individual femenina íntegramente china.",
        "**El número 344 del mundo Noshad Alamiyan sorprendió al número 4 Tomokazu Harimoto** en cuartos.",
        "**Próxima cita:** el WTT Champions Montpellier arranca el 27 de octubre.",
      ],
      sections: [
        {
          heading: "Japón vence a China en la final masculina por equipos",
          blocks: [
            "El resultado más destacado se produjo en la prueba masculina por equipos el 24 de septiembre en el Sky Hall Toyota. **Japón superó a China**, con Sora Matsushima ganando el partido decisivo por 3-1 ante Wen Ruibo.",
            "Fue el primer título por equipos masculino de Japón en unos Juegos Asiáticos desde Bangkok 1966, rompiendo una racha china de ocho oros consecutivos en esta modalidad. China, por su parte, revalidó el oro en la prueba femenina por equipos.",
          ],
        },
        {
          heading: "China suma seis de los siete oros en juego",
          blocks: [
            "La final masculina por equipos fue el único oro que se le escapó a la delegación china. En las pruebas individuales y de dobles, estos fueron los resultados:",
            {
              list: [
                "**Individual masculino:** Lin Shidong superó al campeón defensor Wang Chuqin en una final íntegramente china.",
                "**Individual femenino:** Wang Manyu venció a Sun Yingsha por 4-2, en otra final entre compatriotas.",
                "**Dobles mixto:** Lin Shidong y Kuai Man derrotaron a Wang Chuqin y Sun Yingsha por 4-0 (11-9, 13-11, 11-9, 11-9).",
                "**Dobles femenino:** Kuai Man y Wang Manyu se impusieron a las japonesas Miwa Harimoto y Hina Hayata por 4-0.",
              ],
            },
            "Lin Shidong se colgó tres oros en su debut en unos Juegos Asiáticos, al igual que su compañera Kuai Man.",
          ],
        },
        {
          heading: "La sorpresa individual: Alamiyan elimina a Harimoto",
          image: harimotoImage,
          blocks: [
            "En los cuartos de final de individual masculino, el iraní **Noshad Alamiyan**, número 344 del ranking mundial, derrotó al japonés Tomokazu Harimoto, cuarto del mundo, por 4-3. La eliminación de Harimoto llegó pocos días después del triunfo histórico de su equipo y demuestra lo ajustados que son los márgenes al mejor de siete sets.",
          ],
        },
        {
          heading: "Individual femenino: Wang Manyu se lleva el oro",
          image: wangManyuImage,
          blocks: [
            "El cuadro femenino fue un duelo plenamente chino en su fase final. Wang Manyu superó a Sun Yingsha por 4-2 para alzarse con el título individual, sumando luego el dobles femenino con Kuai Man. Las japonesas Hina Hayata y Miwa Harimoto fueron las mejores del resto, alcanzando las semifinales individuales y la final de dobles.",
          ],
        },
        {
          heading: "Qué torneos seguir en octubre",
          blocks: [
            {
              list: [
                "**WTT Champions Montpellier:** del 27 de octubre al 1 de noviembre.",
                "**WTT Feeder Chennai:** del 28 de octubre al 1 de noviembre.",
                "**WTT Youth Contenders:** Houston (18-21 de octubre), Lignano y Senec (21-27 de octubre), Chennai (23-26 de octubre) y Szombathely (29 de octubre al 1 de noviembre).",
              ],
            },
            "Las fechas proceden de los calendarios oficiales de la ITTF y WTT y pueden variar, por lo que te recomendamos revisar el calendario oficial antes de planear verlos.",
          ],
        },
        {
          heading: "Aprende de los profesionales: qué aplicar a tu juego esta semana",
          blocks: [
            "La victoria de Alamiyan es un gran caso de estudio sobre preparación táctica: un jugador con menor ranking que conoce a fondo las tendencias de su rival puede forzar un séptimo set. No necesitas un entrenador para registrar tus partidos y rivales en [Ping Pong y Tenis de Mesa](/); así podrás identificar qué saques, efectos y jugadas marcan la diferencia en tus propios resultados.",
            "Si quieres incorporar un saque nuevo, consulta la [enciclopedia de saques](/serves) o practica con los [planes de entrenamiento](/drills) gratuitos.",
          ],
        },
      ],
      sources: [
        { label: "Xinhua: Tenis de mesa en los Juegos Asiáticos, 26 de septiembre", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "China Daily: Wang vence a Sun para ganar el oro individual femenino", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "China Daily: China cosecha seis oros en tenis de mesa", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP: El equipo masculino de Japón sorprende a China", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "Calendario de eventos ITTF 2026", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  de: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "Tischtennis-News: Japan schlägt China sensationell, Lin Shidong holt dreimal Gold bei den Asienspielen 2026",
      description:
        "Tischtennis bei den Asienspielen 2026: Japans Herren beenden Chinas Gold-Serie im Team, Lin Shidong und Wang Manyu gewinnen die Einzeltitel, plus die WTT-Turniere im Oktober.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "Tischtennis News",
        "Asienspiele 2026 Tischtennis",
        "Aichi-Nagoya Asienspiele",
        "Lin Shidong",
        "Wang Manyu",
        "WTT Champions Montpellier",
        "Ping Pong News",
      ],
      hero,
      intro:
        "Die Tischtenniswelt blickte in der vergangenen Woche nach Nagoya, wo die Asienspiele von Aichi-Nagoya eine der größten Team-Sensationen der letzten Jahrzehnte boten. Hier ist der komplette Rückblick, die Überraschungen und worauf Sie sich im Oktober freuen können.",
      takeaways: [
        "**Japans Herren holten Team-Gold** und beendeten Chinas Serie von acht Titeln in Folge.",
        "**China gewann dennoch 6 von 7 Goldmedaillen**, Lin Shidong glänzte mit dreimal Gold bei seinem Asienspiele-Debüt.",
        "**Wang Manyu besiegte Sun Yingsha mit 4:2** in einem rein chinesischen Einzelfinale der Damen.",
        "**Die Nr. 344 der Welt Noshad Alamiyan schockte die Nr. 4 Tomokazu Harimoto** im Viertelfinale.",
        "**Als Nächstes:** WTT Champions Montpellier ab 27. Oktober.",
      ],
      sections: [
        {
          heading: "Japans Herren bezwingen China und holen Team-Gold",
          blocks: [
            "Das herausragende Ergebnis fiel am 24. September in der Sky Hall Toyota: **Japan besiegte China** im Finale des Herren-Teamwettbewerbs, nachdem Sora Matsushima das entscheidende Einzel mit 3:1 gegen Wen Ruibo gewann.",
            "Es war Japans erster Mannschaftstitel bei den Asienspielen seit Bangkok 1966 und beendete eine Serie von acht chinesischen Triumphen in Folge. Bei den Damen sicherte sich China souverän den Mannschaftstitel.",
          ],
        },
        {
          heading: "China sichert sich sechs von sieben Goldmedaillen",
          blocks: [
            "Das Herren-Team war das einzige Gold, das China verpasste. In den Einzel- und Doppelwettbewerben dominierten die chinesischen Stars:",
            {
              list: [
                "**Herreneinzel:** Lin Shidong schlug Titelverteidiger Wang Chuqin im Finale.",
                "**Dameneinzel:** Wang Manyu setzte sich mit 4:2 gegen Sun Yingsha durch.",
                "**Mixed-Doppel:** Lin Shidong und Kuai Man besiegten Wang Chuqin und Sun Yingsha mit 4:0 (11:9, 13:11, 11:9, 11:9).",
                "**Damendoppel:** Kuai Man und Wang Manyu schlugen die Japanerinnen Miwa Harimoto und Hina Hayata mit 4:0.",
              ],
            },
            "Lin Shidong gewann bei seinem Asienspiele-Debüt gleich drei Titel, ebenso wie Kuai Man.",
          ],
        },
        {
          heading: "Die Sensation der Woche: Alamiyan schlägt Harimoto",
          image: harimotoImage,
          blocks: [
            "Im Viertelfinale des Herreneinzels besiegte der Iraner **Noshad Alamiyan** (Weltrangliste Nr. 344) überraschend Japans Topstar Tomokazu Harimoto (Nr. 4 der Welt) mit 4:3. Diese Niederlage zeigt eindrucksvoll, wie eng die Weltspitze über sieben Sätze beieinander liegt.",
          ],
        },
        {
          heading: "Dameneinzel: Wang Manyu holt Gold",
          image: wangManyuImage,
          blocks: [
            "Die Damenkonkurrenz war in der entscheidenden Phase eine rein chinesische Angelegenheit. Wang Manyu bezwang Sun Yingsha mit 4:2 und holte im Doppel mit Kuai Man ein weiteres Gold. Hina Hayata und Miwa Harimoto aus Japan überzeugten als Halbfinalistinnen im Einzel und Finalistinnen im Doppel.",
          ],
        },
        {
          heading: "Turnier-Vorschau für Oktober",
          blocks: [
            {
              list: [
                "**WTT Champions Montpellier:** 27. Oktober bis 1. November.",
                "**WTT Feeder Chennai:** 28. Oktober bis 1. November.",
                "**WTT Youth Contenders:** Houston (18.–21. Oktober), Lignano und Senec (21.–27. Oktober), Chennai (23.–26. Oktober) und Szombathely (29. Oktober bis 1. November).",
              ],
            },
            "Die Termine basieren auf dem ITTF- und WTT-Turnierkalender. Bitte prüfen Sie vorab die aktuellen Spielzeiten.",
          ],
        },
        {
          heading: "Tipp für dein eigenes Training",
          blocks: [
            "Alamiyans Überraschungssieg zeigt, was taktische Spielvorbereitung ausmacht: Wer die Gewohnheiten des Gegners studiert, kann auch gegen Favoriten punkten. Mit dem [Tischtennis Trainingstagebuch](/) erfassen Sie Ihre Matches und Gegner ganz einfach und erkennen eigene Stärken und Schwächen.",
            "Möchten Sie einen neuen Aufschlag lernen? Werfen Sie einen Blick in die [Aufschlag-Enzyklopädie](/serves) oder nutzen Sie unsere kostenlosen [Trainingsübungen](/drills).",
          ],
        },
      ],
      sources: [
        { label: "Xinhua: Asienspiele Tischtennis, 26. September", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "China Daily: Wang schlägt Sun und gewinnt Einzelgold", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "China Daily: China holt sechs Tischtennis-Goldmedaillen", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP: Japans Herren überraschen China", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "ITTF Turnierkalender 2026", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  fr: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "Actualités Tennis de Table : Le Japon surprend la Chine, Lin Shidong s'offre trois médailles d'or aux Jeux asiatiques 2026",
      description:
        "Bilan du tennis de table aux Jeux asiatiques 2026 : l'équipe masculine du Japon brise l'hégémonie chinoise, Lin Shidong et Wang Manyu titrés en simple, et les tournois WTT d'octobre.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "actualités tennis de table",
        "Jeux asiatiques 2026 tennis de table",
        "Jeux asiatiques Aichi-Nagoya",
        "Lin Shidong",
        "Wang Manyu",
        "WTT Champions Montpellier",
        "ping pong actualités",
      ],
      hero,
      intro:
        "La planète tennis de table était réunie à Nagoya la semaine passée pour les Jeux asiatiques d'Aichi-Nagoya, théâtre d'un immense coup de théâtre par équipes. Retrouvez ici tous les résultats marquants et le calendrier d'octobre.",
      takeaways: [
        "**Les messieurs japonais remportent l'or par équipes**, mettant fin à 8 titres consécutifs de la Chine.",
        "**La Chine s'adjuge tout de même 6 des 7 médailles d'or**, avec un triplé pour Lin Shidong.",
        "**Wang Manyu bat Sun Yingsha 4-2** lors d'une finale individuelle dames 100 % chinoise.",
        "**Le 344e mondial Noshad Alamiyan surprend le 4e Tomokazu Harimoto** en quarts de finale.",
        "**Prochain rendez-vous :** le WTT Champions Montpellier débute le 27 octobre.",
      ],
      sections: [
        {
          heading: "Les messieurs japonais dominent la Chine pour l'or par équipes",
          blocks: [
            "Le résultat choc a eu lieu le 24 septembre au Sky Hall Toyota : **le Japon a battu la Chine** en finale par équipes hommes, Sora Matsushima offrant le point décisif 3-1 face à Wen Ruibo.",
            "C'est le premier sacre par équipes masculin du Japon aux Jeux asiatiques depuis Bangkok 1966, mettant un terme à une série de huit titres consécutifs pour la Chine. La Chine a quant à elle remporté l'or par équipes chez les dames.",
          ],
        },
        {
          heading: "La Chine rafle six des sept médailles d'or",
          blocks: [
            "L'épreuve par équipes masculine aura été le seul titre échappant à la Chine. Dans les épreuves individuelles :",
            {
              list: [
                "**Simple messieurs :** Lin Shidong s'impose face au tenant du titre Wang Chuqin.",
                "**Simple dames :** Wang Manyu bat Sun Yingsha 4-2 dans une finale 100 % chinoise.",
                "**Double mixte :** Lin Shidong et Kuai Man battent Wang Chuqin et Sun Yingsha 4-0 (11-9, 13-11, 11-9, 11-9).",
                "**Double dames :** Kuai Man et Wang Manyu dominent les Japonaises Miwa Harimoto et Hina Hayata 4-0.",
              ],
            },
            "Lin Shidong remporte trois médailles d'or pour ses premiers Jeux asiatiques, tout comme Kuai Man.",
          ],
        },
        {
          heading: "La sensation : Alamiyan élimine Harimoto",
          image: harimotoImage,
          blocks: [
            "En quarts de finale du simple messieurs, l'Iranien **Noshad Alamiyan** (344e mondial) a éliminé le Japonais Tomokazu Harimoto (4e mondial) au terme d'un match haletant en sept manches (4-3).",
          ],
        },
        {
          heading: "Simple dames : Wang Manyu s'offre l'or",
          image: wangManyuImage,
          blocks: [
            "Le tableau féminin s'est joué entre Chinoises au sommet. Wang Manyu a battu Sun Yingsha 4-2 pour le titre en simple, avant de décrocher le double dames avec Kuai Man. Les Japonaises Hina Hayata et Miwa Harimoto ont réalisé un beau parcours, atteignant les demi-finales en simple et la finale en double.",
          ],
        },
        {
          heading: "Les compétitions à suivre en octobre",
          blocks: [
            {
              list: [
                "**WTT Champions Montpellier :** du 27 octobre au 1er novembre.",
                "**WTT Feeder Chennai :** du 28 octobre au 1er novembre.",
                "**WTT Youth Contenders :** Houston (18-21 octobre), Lignano et Senec (21-27 octobre), Chennai (23-26 octobre) et Szombathely (29 octobre au 1er novembre).",
              ],
            },
            "Les dates officielles sont issues des calendriers ITTF et WTT.",
          ],
        },
        {
          heading: "Le conseil des pros pour votre entraînement",
          blocks: [
            "La victoire d'Alamiyan montre l'importance de l'analyse tactique. Dans [Tennis de table & Ping Pong](/), notez vos matchs et adversaires pour identifier vos schémas gagnants.",
            "Envie de perfectionner un service ? Explorez notre [encyclopédie des services](/serves) ou testez nos [plans d'entraînement](/drills) gratuits.",
          ],
        },
      ],
      sources: [
        { label: "Xinhua : Tennis de table aux Jeux asiatiques, 26 septembre", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "China Daily : Wang bat Sun et remporte l'or en simple", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "China Daily : La Chine remporte six médailles d'or", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP : L'équipe masculine du Japon surprend la Chine", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "Calendrier des événements ITTF 2026", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  it: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "Notizie Tennis Tavolo: Il Giappone batte la Cina, Lin Shidong vince tre ori ai Giochi Asiatici 2026",
      description:
        "Resoconto del tennistavolo ai Giochi Asiatici 2026: la squadra maschile giapponese interrompe il dominio cinese, Lin Shidong e Wang Manyu campioni nel singolo, e i tornei WTT di ottobre.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "notizie tennis tavolo",
        "Giochi Asiatici 2026 tennistavolo",
        "Giochi Asiatici Aichi-Nagoya",
        "Lin Shidong",
        "Wang Manyu",
        "WTT Champions Montpellier",
        "ping pong notizie",
      ],
      hero,
      intro:
        "Il mondo del tennistavolo ha vissuto una settimana straordinaria a Nagoya, dove i Giochi Asiatici di Aichi-Nagoya hanno regalato una delle più grandi sorprese a squadre della storia recente. Ecco tutti i verdetti e i tornei da non perdere ad ottobre.",
      takeaways: [
        "**La nazionale maschile del Giappone conquista l'oro**, interrompendo una striscia di 8 titoli della Cina.",
        "**La Cina vince comunque 6 ori su 7**, con Lin Shidong che ne porta a casa tre al debutto.",
        "**Wang Manyu supera Sun Yingsha 4-2** in una finale singolare femminile tutta cinese.",
        "**Il n. 344 del mondo Noshad Alamiyan sorprende il n. 4 Tomokazu Harimoto** ai quarti di finale.",
        "**Prossimo appuntamento:** WTT Champions Montpellier al via il 27 ottobre.",
      ],
      sections: [
        {
          heading: "Il Giappone maschile batte la Cina per l'oro a squadre",
          blocks: [
            "Il risultato più clamoroso è arrivato il 24 settembre allo Sky Hall Toyota: **il Giappone ha battuto la Cina** nella finale a squadre maschile, grazie alla vittoria decisiva di Sora Matsushima per 3-1 su Wen Ruibo.",
            "Per il Giappone è il primo titolo a squadre maschile ai Giochi Asiatici da Bangkok 1966, mettendo fine a una serie di otto vittorie consecutive della Cina. Nel torneo femminile, la Cina ha conquistato l'oro.",
          ],
        },
        {
          heading: "La Cina si aggiudica sei delle sette medaglie d'oro",
          blocks: [
            "La gara a squadre maschile è stata l'unico oro mancato dalla Cina. Nei tabelloni individuali:",
            {
              list: [
                "**Singolare maschile:** Lin Shidong supera il campione in carica Wang Chuqin in finale.",
                "**Singolare femminile:** Wang Manyu batte Sun Yingsha 4-2 in un derby cinese.",
                "**Doppio misto:** Lin Shidong e Kuai Man superano Wang Chuqin e Sun Yingsha 4-0 (11-9, 13-11, 11-9, 11-9).",
                "**Doppio femminile:** Kuai Man e Wang Manyu battono le giapponesi Miwa Harimoto e Hina Hayata 4-0.",
              ],
            },
            "Lin Shidong ha vinto tre medaglie d'oro al suo debutto ai Giochi Asiatici, così come Kuai Man.",
          ],
        },
        {
          heading: "La sorpresa individuale: Alamiyan supera Harimoto",
          image: harimotoImage,
          blocks: [
            "Nei quarti di finale del singolare maschile, l'iraniano **Noshad Alamiyan** (n. 344 del ranking mondiale) ha superato il giapponese Tomokazu Harimoto (n. 4 al mondo) al settimo set (4-3).",
          ],
        },
        {
          heading: "Singolare femminile: Wang Manyu conquista l'oro",
          image: wangManyuImage,
          blocks: [
            "Il tabellone femminile è stato un affare tutto cinese nella fase calda. Wang Manyu ha battuto Sun Yingsha 4-2 per il titolo del singolare, conquistando poi anche il doppio femminile con Kuai Man. Le giapponesi Hina Hayata e Miwa Harimoto si sono distinte raggiungendo le semifinali in singolare e la finale di doppio.",
          ],
        },
        {
          heading: "I tornei da seguire a ottobre",
          blocks: [
            {
              list: [
                "**WTT Champions Montpellier:** dal 27 ottobre al 1° novembre.",
                "**WTT Feeder Chennai:** dal 28 ottobre al 1° novembre.",
                "**WTT Youth Contenders:** Houston (18-21 ottobre), Lignano e Senec (21-27 ottobre), Chennai (23-26 ottobre) e Szombathely (29 ottobre al 1° novembre).",
              ],
            },
            "Gli orari e le dirette sono disponibili su World Table Tennis e sul calendario ufficiale ITTF.",
          ],
        },
        {
          heading: "Un consiglio dai campioni per il tuo gioco",
          blocks: [
            "La vittoria di Alamiyan è una lezione di preparazione strategica: conoscere le abitudini del rivale fa la differenza. Con [Ping Pong & Tennis Tavolo](/), registra partite e avversari per affinare la tua tattica.",
            "Vuoi arricchire il tuo servizio? Consulta l'[enciclopedia dei servizi](/serves) o allenati con i nostri [programmi di allenamento](/drills) gratuiti.",
          ],
        },
      ],
      sources: [
        { label: "Xinhua: Tennistavolo ai Giochi Asiatici, 26 settembre", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "China Daily: Wang batte Sun e vince l'oro nel singolare", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "China Daily: La Cina vince sei ori nel tennistavolo", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP: Il Giappone maschile batte a sorpresa la Cina", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "Calendario eventi ITTF 2026", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  pt: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "Notícias de Tênis de Mesa: Japão surpreende a China e Lin Shidong conquista três ouros nos Jogos Asiáticos 2026",
      description:
        "Resumo do tênis de mesa nos Jogos Asiáticos 2026: equipe masculina do Japão quebra hegemonia chinesa, Lin Shidong e Wang Manyu levam o ouro no individual, e os torneios WTT de outubro.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "notícias de tênis de mesa",
        "Jogos Asiáticos 2026 tênis de mesa",
        "Jogos Asiáticos Aichi-Nagoya",
        "Lin Shidong",
        "Wang Manyu",
        "WTT Champions Montpellier",
        "notícias de ping pong",
      ],
      hero,
      intro:
        "O mundo do tênis de mesa esteve focado em Nagoya na última semana, onde os Jogos Asiáticos de Aichi-Nagoya proporcionaram uma das maiores zebras por equipes em décadas. Confira o resumo completo e os próximos torneios.",
      takeaways: [
        "**A equipe masculina do Japão levou o ouro**, encerrando a sequência de 8 títulos da China.",
        "**A China ainda faturou 6 dos 7 ouros**, com Lin Shidong conquistando três no seu debute.",
        "**Wang Manyu superou Sun Yingsha por 4-2** em uma final feminina 100% chinesa.",
        "**O n.º 344 do mundo Noshad Alamiyan surpreendeu o n.º 4 Tomokazu Harimoto** nas quartas.",
        "**A seguir:** WTT Champions Montpellier começa em 27 de outubro.",
      ],
      sections: [
        {
          heading: "Japão derrota a China e fatura o ouro por equipes masculino",
          blocks: [
            "O resultado mais marcante ocorreu em 24 de setembro no Sky Hall Toyota: **o Japão derrotou a China** na final por equipes masculina, com Sora Matsushima vencendo o jogo decisivo por 3-1 contra Wen Ruibo.",
            "Foi o primeiro ouro por equipes masculino do Japão nos Jogos Asiáticos desde Bangcoc 1966, quebrando uma série de oito títulos seguidos da China. Na disputa feminina, a China garantiu o ouro por equipes.",
          ],
        },
        {
          heading: "China conquista seis dos sete ouros disputados",
          blocks: [
            "A prova masculina por equipes foi o único ouro não conquistado pela China. Nas competições individuais e de duplas:",
            {
              list: [
                "**Individual masculino:** Lin Shidong superou o atual campeão Wang Chuqin na final.",
                "**Individual feminino:** Wang Manyu derrotou Sun Yingsha por 4-2.",
                "**Duplas mistas:** Lin Shidong e Kuai Man venceram Wang Chuqin e Sun Yingsha por 4-0 (11-9, 13-11, 11-9, 11-9).",
                "**Duplas femininas:** Kuai Man e Wang Manyu bateram as japonesas Miwa Harimoto e Hina Hayata por 4-0.",
              ],
            },
            "Lin Shidong faturou três títulos logo na sua estreia nos Jogos Asiáticos, assim como Kuai Man.",
          ],
        },
        {
          heading: "A grande zebra: Alamiyan bate Harimoto",
          image: harimotoImage,
          blocks: [
            "Nas quartas de final do individual masculino, o iraniano **Noshad Alamiyan** (n.º 344 do ranking mundial) derrotou o japonês Tomokazu Harimoto (n.º 4 do mundo) por 4-3, provando como o formato melhor de sete sets é imprevisível.",
          ],
        },
        {
          heading: "Individual feminino: Wang Manyu conquista o ouro",
          image: wangManyuImage,
          blocks: [
            "A chave feminina foi dominada pelas atletas chinesas na reta final. Wang Manyu superou Sun Yingsha por 4-2 no individual e ainda faturou o ouro em duplas femininas ao lado de Kuai Man. As japonesas Hina Hayata e Miwa Harimoto foram o grande destaque internacional, alcançando as semifinais no individual e a final de duplas.",
          ],
        },
        {
          heading: "Torneios para acompanhar em outubro",
          blocks: [
            {
              list: [
                "**WTT Champions Montpellier:** 27 de outubro a 1 de novembro.",
                "**WTT Feeder Chennai:** 28 de outubro a 1 de novembro.",
                "**WTT Youth Contenders:** Houston (18-21 de outubro), Lignano e Senec (21-27 de outubro), Chennai (23-26 de outubro) e Szombathely (29 de outubro a 1 de novembro).",
              ],
            },
            "As datas são do calendário oficial da ITTF e WTT.",
          ],
        },
        {
          heading: "Lição dos profissionais para seu treino",
          blocks: [
            "A vitória de Alamiyan comprova o valor da preparação tática. Registre seus treinos e adversários no [Ping Pong e Tênis de Mesa](/) para entender seus padrões de jogo.",
            "Quer aprender um novo saque? Explore a [enciclopédia de saques](/serves) ou pratique com os [planos de treino](/drills) gratuitos.",
          ],
        },
      ],
      sources: [
        { label: "Xinhua: Tênis de mesa nos Jogos Asiáticos, 26 de setembro", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "China Daily: Wang bate Sun e vence o ouro individual", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "China Daily: China fatura seis ouros no tênis de mesa", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP: Japão surpreende a China e leva o ouro masculino", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "Calendário de eventos ITTF 2026", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  ja: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "卓球ニュース：日本男子が中国を破る歴史的快挙、林詩棟が2026アジア大会で3冠達成",
      description:
        "2026年愛知・名古屋アジア大会卓球総括：日本男子が中国の連覇を阻み団体金メダル獲得、林詩棟と王曼昱がシングルス制覇、10月の注目WTT大会スケジュール。",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "卓球ニュース",
        "アジア大会2026 卓球",
        "愛知・名古屋アジア大会",
        "林詩棟",
        "王曼昱",
        "WTTチャンピオンズ・モンペリエ",
        "ピンポン最新情報",
      ],
      hero,
      intro:
        "愛知・名古屋アジア大会の卓球競技が閉幕。男子団体で日本が中国を破り金メダルを獲得するという歴史的快挙が生まれました。大会の全容、注目試合、そして10月の注目大会を振り返ります。",
      takeaways: [
        "**日本男子が男子団体で金メダルを獲得**、中国の8連覇を阻止。",
        "**中国は全7種目中6種目の金メダルを獲得**、林詩棟がアジア大会デビューで3冠達成。",
        "**王曼昱が孫穎莎を4-2で破り**、女子シングルス優勝。",
        "**世界ランキング344位のノシャド・アラミアンが同4位の張本智和を準々決勝で破る大波乱**。",
        "**次回注目大会：** WTTチャンピオンズ・モンペリエが10月27日開幕。",
      ],
      sections: [
        {
          heading: "日本男子が中国を下し男子団体で金メダル獲得",
          blocks: [
            "最大のハイライトは9月24日、スカイホール豊田で行われた男子団体決勝でした。**日本が中国を撃破**。第5試合で松島輝空が温瑞博を3-1で下し、金メダルを決定づけました。",
            "日本男子のアジア大会団体金メダルは1966年バンコク大会以来60年ぶりで、中国の大会8連覇に終止符を打ちました。なお女子団体は中国が制覇しました。",
          ],
        },
        {
          heading: "中国は7種目中6種目で金メダルを獲得",
          blocks: [
            "中国が金メダルを逃したのは男子団体のみでした。個人種目の結果は以下の通りです：",
            {
              list: [
                "**男子シングルス：** 林詩棟が前回王者・王楚欽との同国対決を制し金メダル。",
                "**女子シングルス：** 王曼昱が孫穎莎を4-2で破り優勝。",
                "**混合ダブルス：** 林詩棟／蒯曼ペアが王楚欽／孫穎莎ペアに4-0（11-9, 13-11, 11-9, 11-9）で快勝。",
                "**女子ダブルス：** 蒯曼／王曼昱ペアが張本美和／早田ひなペアを4-0で下し優勝。",
              ],
            },
            "林詩棟はアジア大会デビュー戦で3冠を達成。蒯曼も3つの金メダルを手にしました。",
          ],
        },
        {
          heading: "今大会最大の波乱：アラミアンが張本智和を破る",
          image: harimotoImage,
          blocks: [
            "男子シングルス準々決勝では、世界ランキング344位のイランのノシャド・アラミアンが、世界4位の張本智和を4-3のフルゲームで破る大波乱が起きました。",
          ],
        },
        {
          heading: "女子シングルス：王曼昱が金メダル獲得",
          image: wangManyuImage,
          blocks: [
            "女子シングルスは終盤、中国勢同士の熱戦となりました。王曼昱が孫穎莎を4-2で破りシングルス優勝を果たし、蒯曼とのペアで女子ダブルスも制覇。日本勢では早田ひなと張本美和がシングルス準決勝進出、ダブルス準優勝と健闘しました。",
          ],
        },
        {
          heading: "10月の注目国際大会",
          blocks: [
            {
              list: [
                "**WTTチャンピオンズ・モンペリエ：** 10月27日〜11月1日",
                "**WTTフィーダー・チェンナイ：** 10月28日〜11月1日",
                "**WTTユースコンテンダー：** ヒューストン（10月18-21日）、リニャーノ／セネツ（10月21-27日）、チェンナイ（10月23-26日）、ソンバトヘイ（10月29日〜11月1日）",
              ],
            },
            "配信やドローはWTT公式サイトおよびITTFイベントカレンダーでご確認ください。",
          ],
        },
        {
          heading: "プロから学ぶ：今週の練習に活かせるポイント",
          blocks: [
            "アラミアンの金星は対戦相手の研究と準備の重要性を示しています。[卓球ノート](/)で日頃の練習や対戦相手の癖を記録し、自分の勝因・敗因を分析しましょう。",
            "新しい武器を身につけたい方は、[サーブ百科](/serves)や無料の[練習メニュー](/drills)をご活用ください。",
          ],
        },
      ],
      sources: [
        { label: "新華社：アジア大会卓球（9月26日）", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "チャイナ・デイリー：王曼昱が孫穎莎を破り女子単金メダル", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "チャイナ・デイリー：中国が卓球で6つの金メダル獲得", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP：日本男子が中国を破り団体金メダル", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "ITTF 2026年大会カレンダー", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  zh: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "乒乓球要闻：日本男团力克中国爆冷夺金，林诗栋2026亚运会独揽三冠",
      description:
        "2026爱知·名古屋亚运会乒乓球综述：日本男团终结中国连冠夺金，林诗栋与王曼昱分获男女单打冠军，附10月WTT赛程指南。",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "乒乓球新闻",
        "2026亚运会乒乓球",
        "爱知名古屋亚运会",
        "林诗栋",
        "王曼昱",
        "WTT蒙彼利埃冠军赛",
        "乒乓球资讯",
      ],
      hero,
      intro:
        "爱知·名古屋亚运会乒乓球项目圆满收官。日本男团在决赛中战胜中国队爆出近年来最大冷门，而国乒依然在单项中展现强大统治力。以下为您带来本届亚运会完整回顾与10月赛程前瞻。",
      takeaways: [
        "**日本男团终结中国八连冠夺金**，松岛辉空在决胜场锁定胜局。",
        "**中国队仍收获7金中的6金**，林诗栋亚运首秀独揽三冠。",
        "**王曼昱4比2战胜孙颖莎**，夺得女单冠军并搭档蒯曼收获女双金牌。",
        "**世界排名第344位诺沙德·阿拉米扬大爆冷门**，七局淘汰张本智和。",
        "**下一站赛事：** WTT蒙彼利埃冠军赛将于10月27日打响。",
      ],
      sections: [
        {
          heading: "日本男团战胜中国夺得团体金牌",
          blocks: [
            "本届赛事的最大冷门出现在9月24日丰田天空大厅的男团决赛：**日本队击败中国队**夺得男团冠军，松岛辉空在决胜场以3-1战胜温瑞博锁定胜局。",
            "这是日本男团自1966年曼谷亚运会以来首次夺得亚运团体冠军，打破了中国男团在这一项目上的八连冠伟业。在女团方面，中国队成功登顶卫冕。",
          ],
        },
        {
          heading: "国乒包揽其余六枚金牌",
          blocks: [
            "男团是中国队在本届亚运会错失的唯一一项冠军，其他单项赛果如下：",
            {
              list: [
                "**男单：** 林诗栋在国乒内战中战胜卫冕冠军王楚钦登顶。",
                "**女单：** 王曼昱以4-2力克孙颖莎夺金。",
                "**混双：** 林诗栋／蒯曼直落四局4-0（11-9, 13-11, 11-9, 11-9）战胜王楚钦／孙颖莎夺冠。",
                "**女双：** 蒯曼／王曼昱4-0战胜日本组合张本美和／早田希娜夺得金牌。",
              ],
            },
            "林诗栋在亚运会首秀中豪取三冠，蒯曼同样加冕三金。",
          ],
        },
        {
          heading: "单打爆冷焦点：阿拉米扬淘汰张本智和",
          image: harimotoImage,
          blocks: [
            "男单四分之一决赛中，世界排名第344位的伊朗选手**诺沙德·阿拉米扬**苦战七局，以4-3逆转击败世界排名第四的日本名将张本智和，上演惊天大冷门。",
          ],
        },
        {
          heading: "女单项目：王曼昱摘金",
          image: wangManyuImage,
          blocks: [
            "女子单打在最后阶段成为中国队内战。王曼昱以4比2力克孙颖莎夺得女单冠军，随后又搭档蒯曼摘得女双金牌。日本队的早田希娜和张本美和表现同样出色，分别闯入单打半决赛并夺得女双银牌。",
          ],
        },
        {
          heading: "10月乒坛观赛指南",
          blocks: [
            {
              list: [
                "**WTT蒙彼利埃冠军赛：** 10月27日至11月1日",
                "**WTT支线赛金奈站：** 10月28日至11月1日",
                "**WTT青少年球星挑战赛与常规挑战赛：** 休斯敦站（10月18-21日）、利尼亚诺与塞内茨站（10月21-27日）、金奈站（10月23-26日）、松博特海伊站（10月29日至11月1日）。",
              ],
            },
            "赛事直播与签表可在WTT世界乒联官网和ITTF国际乒联赛历查询。",
          ],
        },
        {
          heading: "专业球员带给业余爱好者的启示",
          blocks: [
            "阿拉米扬的胜利充分证明了战术准备与针对性研究的价值。使用[乒乓球笔记](/)记录您的日常训练与对手信息，助您清晰发现决定输赢的关键发球与旋转套路。",
            "想掌握新发球？欢迎查阅免费的[发球百科](/serves)或跟随[训练计划](/drills)提升球技。",
          ],
        },
      ],
      sources: [
        { label: "新华社：亚运会乒乓球赛事报道（9月26日）", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "中国日报：王曼昱力克孙颖莎夺女单金牌", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "中国日报：中国队亚运乒乓球夺得六金", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "南华早报：日本男团逆袭中国夺金", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "ITTF 2026国际乒比赛事日历", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  ko: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "탁구 뉴스: 일본 남자 대표팀 중국 꺾고 대이변, 린스둥 2026 아시안게임 3관왕 달성",
      description:
        "2026 아이치·나고야 아시안게임 탁구 총결산: 일본 남자팀의 중국 격파 금메달, 린스둥과 왕만위의 남녀 단식 우승, 그리고 10월 WTT 대회 일정 안내.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "탁구 뉴스",
        "아시안게임 2026 탁구",
        "아이치 나고야 아시안게임",
        "린스둥",
        "왕만위",
        "WTT 챔피언스 몽펠리에",
        "핑퐁 뉴스",
      ],
      hero,
      intro:
        "전 세계 탁구 팬들의 이목이 쏠렸던 아이치·나고야 아시안게임 탁구 경기가 막을 내렸습니다. 단체전에서 일본이 중국을 꺾는 대이변을 포함해 주요 경기 결과와 10월 경기 일정을 정리해 드립니다.",
      takeaways: [
        "**일본 남자 대표팀이 단체전 금메달을 획득**하며 중국의 8연패를 저지했습니다.",
        "**중국은 7개 종목 중 6개 금메달을 수확**했고, 린스둥이 3관왕에 올랐습니다.",
        "**왕만위가 쑨잉사를 4-2로 꺾고** 여자 단식 정상에 올랐습니다.",
        "**세계 344위 노샤드 알라미얀이 4위 하리모토 토모카즈를 제압**하는 대이변을 연출했습니다.",
        "**다음 일정:** WTT 챔피언스 몽펠리에가 10월 27일 개막합니다.",
      ],
      sections: [
        {
          heading: "일본 남자팀, 중국 꺾고 60년 만의 단체전 금메달",
          blocks: [
            "이번 대회 최고 이변은 9月 24일 토요타 스카이홀에서 열린 남자 단체전 결승에서 일어났습니다. **일본이 중국을 제압**하고 우승을 차지했습니다. 마지막 5매치에서 마츠시마 소라가 원루이보를 3-1로 꺾었습니다.",
            "일본 남자 탁구의 아시안게임 단체전 금메달은 1966년 방콕 대회 이후 처음이며, 중국의 8연속 우승 행진을 멈춰 세웠습니다. 한편 여자 단체전에서는 중국이 금메달을 목에 걸었습니다.",
          ],
        },
        {
          heading: "중국, 나머지 6개 종목 금메달 석권",
          blocks: [
            "남자 단체전을 제외한 개인 종목 결과는 다음과 같습니다:",
            {
              list: [
                "**남자 단식:** 린스둥이 디펜딩 챔피언 왕추친을 꺾고 금메달 획득.",
                "**여자 단식:** 왕만위가 쑨잉사를 4-2로 꺾고 정상 등극.",
                "**혼합 복식:** 린스둥-콰이만 조가 왕추친-쑨잉사 조를 4-0(11-9, 13-11, 11-9, 11-9)으로 완파.",
                "**여자 복식:** 콰이만-왕만위 조가 일본의 하리모토 미와-하야타 히나 조를 4-0으로 제압.",
              ],
            },
            "린스둥은 첫 아시안게임 출전에서 3관왕을 달성했고, 콰이만 역시 3관왕의 영예를 안았습니다.",
          ],
        },
        {
          heading: "단식 최대 이변: 알라미얀, 하리모토 격파",
          image: harimotoImage,
          blocks: [
            "남자 단식 8강전에서는 세계 랭킹 344위인 이란의 **노샤드 알라미얀**이 세계 4위 하리모토 토모카즈를 4-3 풀세트 접전 끝에 꺾는 초대형 이변을 일으켰습니다.",
          ],
        },
        {
          heading: "여자 단식: 왕만위 금메달 획득",
          image: wangManyuImage,
          blocks: [
            "여자 단식 후반부는 중국 선수들의 독무대였습니다. 왕만위는 쑨잉사를 4-2로 꺾고 단식 정상에 올랐으며, 콰이만과 호흡을 맞춘 여자 복식에서도 우승을 차지했습니다. 일본의 하야타 히나와 하리모토 미와는 단식 4강 및 복식 결승에 오르며 활약했습니다.",
          ],
        },
        {
          heading: "10월 주요 탁구 대회 안내",
          blocks: [
            {
              list: [
                "**WTT 챔피언스 몽펠리에:** 10월 27일 ~ 11월 1일",
                "**WTT 피더 첸나이:** 10월 28일 ~ 11월 1일",
                "**WTT 유스 컨텐더:** 휴스턴(10월 18-21일), 리냐노 및 세네츠(10월 21-27일), 첸나이(10월 23-26일), 솜버트헤이(10월 29일 ~ 11월 1일)",
              ],
            },
            "자세한 중계 및 대진표는 WTT 공식 웹사이트와 ITTF 이벤트 캘린더에서 확인하실 수 있습니다.",
          ],
        },
        {
          heading: "프로 선수에게 배우는 훈련 팁",
          blocks: [
            "알라미얀의 승리는 철저한 상대 분석의 힘을 보여줍니다. [탁구 훈련일지](/)에 훈련 내용과 상대의 스타일을 꾸준히 기록해 보세요.",
            "새로운 서브를 익히고 싶다면 [서브 백과](/serves)를 둘러보거나 무료 [훈련 플랜](/drills)을 시작해 보세요.",
          ],
        },
      ],
      sources: [
        { label: "신화통신: 아시안게임 탁구 소식 (9월 26일)", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "차이나데일리: 왕만위, 쑨잉사 꺾고 여자 단식 금메달", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "차이나데일리: 중국, 탁구에서 금메달 6개 획득", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP: 일본 남자팀, 중국 제압하고 금메달 획득", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "ITTF 2026 대회 일정 캘린더", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
  uk: [
    {
      slug: "asian-games-2026-table-tennis-recap",
      title: "Новини настільного тенісу: Японія шокує Китай, Лінь Шидун виграє три золота на Азійських іграх 2026",
      description:
        "Підсумки турніру з настільного тенісу на Азійських іграх 2026: чоловіча збірна Японії перериває переможну серію Китаю, Лінь Шидун і Ван Манью беруть золото в одиночці, а також анонс турнірів WTT у жовтні.",
      published: "2026-10-03",
      readMinutes: 5,
      keywords: [
        "новини настільного тенісу",
        "Азійські ігри 2026 настільний теніс",
        "Азійські ігри Айті-Нагоя",
        "Лінь Шидун",
        "Ван Манью",
        "WTT Champions Montpellier",
        "пінг понг новини",
      ],
      hero,
      intro:
        "Минулий тиждень у Нагої подарував одну з найбільших сенсацій у командних змаганнях за багато років. Ось повний огляд результатів, головні сенсації та турніри, на які варто звернути увагу у жовтні.",
      takeaways: [
        "**Чоловіча збірна Японії здобула золото в команді**, перервавши серію Китаю з 8 титулів поспіль.",
        "**Китай усе одно виграв 6 із 7 золотих медалей**, а Лінь Шидун завоював три золота на дебютних Азійських іграх.",
        "**Ван Манью перемогла Сунь Їнша з рахунком 4:2** у суто китайському жіночому одиночному фіналі.",
        "**344-та ракетка світу Ношад Аламіян сенсаційно обіграв 4-ту ракетку світу Томокадзу Харімото** у чвертьфіналі.",
        "**Наступна подія:** WTT Champions Montpellier стартує 27 жовтня.",
      ],
      sections: [
        {
          heading: "Японія обіграла Китай і взяла командне золото",
          blocks: [
            "Головна сенсація сталася 24 вересня на арені Sky Hall Toyota: **Японія перемогла Китай** у фіналі чоловічого командного турніру завдяки вирішальній перемозі Сори Мацусіми з рахунком 3:1 над Вень Жуйбо.",
            "Це перший командний титул Японії на Азійських іграх із 1966 року, який зупинив серію з восьми поспіль перемог Китаю. У жіночому командному розряді золото дісталося Китаю.",
          ],
        },
        {
          heading: "Китай забрав шість із семи золотих медалей",
          blocks: [
            "Чоловіча команда стала єдиною дисципліною, де Китай упустив золото. В інших розрядах перемогли китайські майстри:",
            {
              list: [
                "**Чоловічий одиночний розряд:** Лінь Шидун переміг чинного чемпіона Ван Чуціня.",
                "**Жіночий одиночний розряд:** Ван Манью здолала Сунь Їнша з рахунком 4:2.",
                "**Змішаний парний розряд:** Лінь Шидун і Куай Мань перемогли Ван Чуціня та Сунь Їнша з рахунком 4:0 (11-9, 13-11, 11-9, 11-9).",
                "**Жіночий парний розряд:** Куай Мань і Ван Манью обіграли японок Міву Харімото та Хіну Хаяту 4:0.",
              ],
            },
            "Лінь Шидун завоював три золоті медалі на своїх дебютних Азійських іграх, так само як і Куай Мань.",
          ],
        },
        {
          heading: "Головна сенсація турніру: Аламіян перемагає Харімото",
          image: harimotoImage,
          blocks: [
            "У чвертьфіналі чоловічого одиночного розряду іранець **Ношад Аламіян** (344-й номер світового рейтингу) у напруженій боротьбі з семи партій здолав 4-ту ракетку світу Томокадзу Харімото з рахунком 4:3.",
          ],
        },
        {
          heading: "Жіночий одиночний розряд: Ван Манью здобуває золото",
          image: wangManyuImage,
          blocks: [
            "Жіноча сітка на вирішальній стадії стала внутрішньою боротьбою Китаю. Ван Манью здолала Сунь Їнша з рахунком 4:2, а потім додала до цього золото у жіночому парному розряді разом із Куай Мань. Японки Хіна Хаята та Міва Харімото дійшли до півфіналу в одиночці та фіналу в парі.",
          ],
        },
        {
          heading: "Що дивитися у жовтні",
          blocks: [
            {
              list: [
                "**WTT Champions Montpellier:** 27 жовтня – 1 листопада.",
                "**WTT Feeder Chennai:** 28 жовтня – 1 листопада.",
                "**WTT Youth Contenders:** Х'юстон (18-21 жовтня), Ліньяно та Сенец (21-27 жовтня), Ченнаї (23-26 жовтня) і Сомбатгей (29 жовтня – 1 листопада).",
              ],
            },
            "Розклад трансляцій і сітки доступні на офіційному сайті World Table Tennis та в календарі ITTF.",
          ],
        },
        {
          heading: "Порада від профі для ваших тренувань",
          blocks: [
            "Перемога Аламіяна доводить значення тактичної підготовки: якщо знати звички суперника, можна нав'язати боротьбу навіть лідеру. Записуйте свої матчі та суперників у [Настільний теніс](/) і аналізуйте подачі, обертання та комбінації.",
            "Хочете покращити подачу? Завітайте до [енциклопедії подач](/serves) або спробуйте безкоштовні [плани тренувань](/drills).",
          ],
        },
      ],
      sources: [
        { label: "Сіньхуа: Настільний теніс на Азійських іграх, 26 вересня", url: "https://english.news.cn/20260926/c44f7930d47c45bc809248d1842525ae/c.html" },
        { label: "China Daily: Ван обіграла Сунь і здобула золото в одиночці", url: "https://www.chinadailyhk.com/hk/article/640211" },
        { label: "China Daily: Китай здобув шість золотих медалей у настільному тенісі", url: "https://www.chinadailyasia.com/hk/article/640271" },
        { label: "SCMP: Чоловіча збірна Японії сенсаційно обіграла Китай", url: "https://www.scmp.com/sport/other-sport/article/3368691/japan-men-stun-china-claim-asian-games-table-tennis-team-gold" },
        { label: "Календар подій ITTF 2026", url: "https://www.ittf.com/2026-events-calendar/" },
      ],
    },
  ],
};
