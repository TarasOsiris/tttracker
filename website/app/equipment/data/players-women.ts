// Top 25 women's singles (ITTF/WTT world ranking, week 40 2026, published 2026-09-28) and their equipment setups.
// Every slot cites a source and an "as of" date. The ranking was read from the data feed behind the official
// worldtabletennis.com rankings page. Hand and grip come from each player's WTT profile (Qin Yuxuan: Chinese Wikipedia;
// Joo Cheonhui has none, so null). Sponsor pages list a player's rubbers without saying which side each is on; where a
// page lists two different rubbers, sides come from the source named in the label and the slot is "reported", not
// "confirmed". tabletennis.ph identifies gear from match photos, so a slot that rests on it alone is "unverified".
// dku51 (a Chinese retailer) publishes dated overviews; where it disagrees with other sources the label says so.
// Takkyu Oukoku's 2026 All-Japan equipment list is paywalled, so nothing here cites it. Undated pages use the date they
// were read and are at most "reported".
import type { Player, Source } from "../models";

const ACCESSED = "2026-10-03";
const VERIFIED = "2026-10-03";
const RANKING_DATE = "2026-09-28";

const ranking: Source = {
  url: "https://www.worldtabletennis.com/rankings",
  label: "ITTF/WTT Women's Singles World Ranking, week 40 2026 (published 2026-09-28)",
  kind: "ittf",
  accessed: ACCESSED,
};

const rank = (position: number) => ({ position, date: RANKING_DATE, source: ranking });

const src = (url: string, label: string, kind: Source["kind"]): Source => ({ url, label, kind, accessed: ACCESSED });

// Shared sources.
const DKU51_JULY_URL = "https://www.dku51.com/article-15375.html";
const dku51July = src(
  DKU51_JULY_URL,
  "动库商城 (dku51): equipment of the top-ranked women's singles players, 2026-07-25",
  "retailer",
);
const dku51 = (note: string): Source =>
  src(DKU51_JULY_URL, `动库商城 (dku51): equipment of the top-ranked women's singles players, 2026-07-25 (${note})`, "retailer");
const ph = (slug: string, name: string): Source =>
  src(`https://tabletennis.ph/equipment/${slug}-equipment/`, `tabletennis.ph: ${name} equipment`, "press");
const phNote = (slug: string, name: string, note: string): Source =>
  src(`https://tabletennis.ph/equipment/${slug}-equipment/`, `tabletennis.ph: ${name} equipment (${note})`, "press");
const rallys = (slug: string, label: string): Source =>
  src(`https://rallys.online/forplayers/player/${slug}/`, label, "press");
const bfJp = (slug: string, label: string): Source =>
  src(`https://www.butterfly.co.jp/players/detail/${slug}.html`, label, "manufacturer");

// Player-specific sources.
const harimotoBf = bfJp("harimoto-miwa", "Butterfly Japan: Miwa Harimoto player page (equipment as of 2025-12-18)");
const harimotoBfSides = bfJp(
  "harimoto-miwa",
  "Butterfly Japan: Miwa Harimoto player page (equipment as of 2025-12-18; lists Dignics 09C and Dignics 05 without sides, sides per dku51, 2026-07-25)",
);
const harimotoPh = ph("miwa-harimoto", "Miwa Harimoto");
const zhuBf = bfJp("zhu-yuling", "Butterfly Japan: Zhu Yuling player page (equipment as of 2026-02-16)");
const zhuBfSides = bfJp(
  "zhu-yuling",
  "Butterfly Japan: Zhu Yuling player page (equipment as of 2026-02-16; sides per Tabletennis Reference and dku51)",
);
const diazBf = bfJp("diaz-adriana", "Butterfly Japan: Adriana Díaz player page (equipment as of 2025-09-17)");
const hayataBlade = dku51("Rallys, 2025-04, also says she uses a custom-made Nittaku blade");
const hayataRallys = rallys(
  "hayata-hina",
  "Rallys: Hina Hayata equipment and profile (Tabletennis Reference and dku51 list the same forehand)",
);
const hayataBackhand = dku51(
  "lists Dignics 09C on the backhand, while Rallys (2025-04) and Tabletennis Reference list Hurricane 3 National on both sides",
);
const winterBlade = dku51("Tabletennis Reference also lists Novacell OFF/S; tabletennis.ph lists Novacell OFF");
const winterPh = phNote(
  "sabine-winter",
  "Sabine Winter",
  "Tabletennis Reference and dku51 list the same forehand",
);
const winterPhBackhand = phNote(
  "sabine-winter",
  "Sabine Winter",
  "from match photos; dku51, 2026-07-25, lists ABS 3 Pro",
);
const shinDku51 = dku51("tabletennis.ph, 2026-03, lists Hurricane Sun, Hurricane 3 National and Dignics 09C instead");
const odoRallys = rallys(
  "satsuki-odo",
  "Rallys: Satsuki Odo equipment and profile (Tabletennis Reference lists the same setup)",
);
const satoRallys = rallys(
  "sato-hitomi",
  "Rallys: Hitomi Sato equipment and profile (Tabletennis Reference lists the same setup)",
);
const hashimotoRallys = rallys(
  "honoka-hashimoto",
  "Rallys: Honoka Hashimoto equipment and profile (Tabletennis Reference and dku51 list the same setup)",
);
const hanYingPh = phNote(
  "han-ying",
  "Han Ying",
  "Tabletennis Reference lists the same rubbers",
);
const hanYingPhBlade = phNote(
  "han-ying",
  "Han Ying",
  "from match photos; Tabletennis Reference lists a Koji Matsushita blade without the model",
);
const nagasakiBlade = phNote(
  "miyu-nagasaki",
  "Miyu Nagasaki",
  "from match photos; dku51, 2026-07-25, also lists a Harimoto Super ALC blade",
);
const nagasakiForehand = dku51("Tabletennis Reference also lists Tenergy 05 Hard; tabletennis.ph, 2026-03, lists Dignics 05");
const nagasakiBackhand = dku51("tabletennis.ph and Tabletennis Reference also list Dignics 05 on the backhand");
const yokoiPh = phNote(
  "sakura-yokoi",
  "Sakura Yokoi",
  "from match photos; dku51, 2026-07-25, lists Viscaria Super ALC, Dignics 09C and ZYRE-03, and Tabletennis Reference lists Hurricane Long 5 with Hurricane 3 National",
);
const jooPh = ph("joo-cheonhui", "Joo Cheonhui");
const jooPhBackhand = phNote("joo-cheonhui", "Joo Cheonhui", "names the blade and forehand only; no sponsor page found");
const godaStiga = src(
  "https://www.stigasports.com/en-row/players-teams-tt/hana-goda",
  "Stiga: Hana Goda player page (undated)",
  "manufacturer",
);
const godaStigaRubber = src(
  "https://www.stigasports.com/en-row/players-teams-tt/hana-goda",
  "Stiga: Hana Goda player page (undated; names one rubber without a side, dku51, 2026-07-25, lists it on both sides)",
  "manufacturer",
);
const szocsPh = phNote("bernadette-szocs", "Bernadette Szőcs", "Tabletennis Reference lists the same setup");
const kiharaDku51 = dku51("Tabletennis Reference also lists Speedy Soft D.TecS on the backhand");
const itoNittaku = src(
  "https://nittaku.world-tt-s.com/news/page_225.html",
  "Nittaku on Takkyu Oukoku WEB: the gear Mima Ito uses, 2025-06-06",
  "manufacturer",
);

export const womenPlayers: Player[] = [
  {
    id: "wang-manyu",
    name: "Wang Manyu",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(1),
    setup: {
      blade: {
        itemId: "butterfly-viscaria-super-alc",
        name: "Viscaria Super ALC",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "sun-yingsha",
    name: "Sun Yingsha",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(2),
    setup: {
      blade: {
        itemId: null,
        name: "DHS S968",
        variant: "DHS 968-series blade (the series DHS describes as its national-team version)",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "dhs-hurricane-8",
        name: "Hurricane 8 (20# sponge)",
        variant: "Special 20# sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "miwa-harimoto",
    name: "Miwa Harimoto",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(3),
    setup: {
      blade: {
        itemId: "butterfly-harimoto-innerforce-super-alc",
        name: "Harimoto Tomokazu Innerforce Super ALC",
        confidence: "confirmed",
        source: harimotoBf,
        asOf: "2025-12-18",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: harimotoBfSides,
        asOf: "2025-12-18",
      },
      backhand: {
        itemId: "butterfly-dignics-05",
        name: "Dignics 05",
        confidence: "reported",
        source: harimotoBfSides,
        asOf: "2025-12-18",
      },
    },
    history: [
      {
        date: "2024-10-10",
        slot: "blade",
        from: "Harimoto Tomokazu Innerforce ALC",
        to: "Harimoto Tomokazu Innerforce Super ALC",
        source: harimotoPh,
      },
    ],
    lastVerified: VERIFIED,
  },
  {
    id: "kuai-man",
    name: "Kuai Man",
    country: "CHN",
    gender: "women",
    hand: "left",
    grip: "shakehand",
    ranking: rank(4),
    setup: {
      blade: {
        itemId: "butterfly-viscaria",
        name: "Viscaria (gold label)",
        variant: "Gold-label special edition",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "wang-yidi",
    name: "Wang Yidi",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(5),
    setup: {
      blade: {
        itemId: "dhs-w968-hurricane-long-5",
        name: "W968",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "hina-hayata",
    name: "Hina Hayata",
    country: "JPN",
    gender: "women",
    hand: "left",
    grip: "shakehand",
    ranking: rank(6),
    setup: {
      blade: {
        itemId: "nittaku-hina-hayata-h2",
        name: "Hina Hayata H2 (custom-made)",
        variant: "Custom-made version",
        confidence: "reported",
        source: hayataBlade,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "Hurricane 3 National (blue sponge)",
        variant: "National (blue sponge)",
        confidence: "reported",
        source: hayataRallys,
        asOf: "2025-04-01",
      },
      backhand: {
        itemId: null,
        name: "Not publicly confirmed",
        confidence: "unverified",
        source: hayataBackhand,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "chen-xingtong",
    name: "Chen Xingtong",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(7),
    setup: {
      blade: {
        itemId: "dhs-w968-hurricane-long-5",
        name: "W968",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "zhu-yuling",
    name: "Zhu Yuling",
    country: "MAC",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(8),
    setup: {
      blade: {
        itemId: null,
        name: "Custom Arylate Carbon shakehand",
        variant: "Custom-made by Butterfly (Arylate Carbon), not sold under this name",
        confidence: "confirmed",
        source: zhuBf,
        asOf: "2026-02-16",
      },
      forehand: {
        itemId: "butterfly-tenergy-05-hard",
        name: "Tenergy 05 Hard",
        confidence: "reported",
        source: zhuBfSides,
        asOf: "2026-02-16",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: zhuBfSides,
        asOf: "2026-02-16",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "sabine-winter",
    name: "Sabine Winter",
    country: "GER",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(9),
    setup: {
      blade: {
        itemId: "andro-novacell-off-s",
        name: "Novacell OFF/S",
        confidence: "reported",
        source: winterBlade,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "andro-nuzn-55",
        name: "NUZN 55",
        confidence: "reported",
        source: winterPh,
        asOf: "2026-05-19",
      },
      backhand: {
        itemId: "dr-neubauer-a-b-s-3",
        name: "ABS 3 (anti-topspin)",
        confidence: "unverified",
        source: winterPhBackhand,
        asOf: "2026-05-19",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "chen-yi",
    name: "Chen Yi",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(10),
    setup: {
      blade: {
        itemId: "dhs-w968-hurricane-long-5",
        name: "W968",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "shin-yubin",
    name: "Shin Yubin",
    country: "KOR",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(11),
    setup: {
      blade: {
        itemId: null,
        name: "DHS S968 (custom)",
        variant: "968-series blade made for Shin Yubin, rose-red handle",
        confidence: "unverified",
        source: shinDku51,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "unverified",
        source: shinDku51,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (orange sponge)",
        variant: "National-team NEO version, orange sponge",
        confidence: "unverified",
        source: shinDku51,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "satsuki-odo",
    name: "Satsuki Odo",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(12),
    setup: {
      blade: {
        itemId: "dhs-hurricane-long-5",
        name: "Hurricane Long 5",
        confidence: "reported",
        source: odoRallys,
        asOf: "2026-01-01",
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "Hurricane 3 National (blue sponge)",
        variant: "National (blue sponge)",
        confidence: "reported",
        source: odoRallys,
        asOf: "2026-01-01",
      },
      backhand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo",
        confidence: "reported",
        source: odoRallys,
        asOf: "2026-01-01",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "hitomi-sato",
    name: "Hitomi Sato",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(13),
    setup: {
      blade: {
        itemId: "nittaku-goriki-super-cut",
        name: "Goriki Super Cut",
        confidence: "reported",
        source: satoRallys,
        asOf: "2026-01-01",
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "Hurricane 3 National (blue sponge)",
        variant: "National (blue sponge)",
        confidence: "reported",
        source: satoRallys,
        asOf: "2026-01-01",
      },
      backhand: {
        itemId: "nittaku-do-knuckle",
        name: "Do Knuckle (short pips)",
        confidence: "reported",
        source: satoRallys,
        asOf: "2026-01-01",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "joo-cheonhui",
    name: "Joo Cheonhui",
    country: "KOR",
    gender: "women",
    hand: null,
    grip: null,
    ranking: rank(14),
    setup: {
      blade: {
        itemId: null,
        name: "DHS Hurricane Long (model not named)",
        confidence: "unverified",
        source: jooPh,
        asOf: "2026-02-21",
      },
      forehand: {
        itemId: null,
        name: "Rhyzm",
        confidence: "unverified",
        source: jooPh,
        asOf: "2026-02-21",
      },
      backhand: {
        itemId: null,
        name: "Not publicly confirmed",
        confidence: "unverified",
        source: jooPhBackhand,
        asOf: "2026-10-03",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "honoka-hashimoto",
    name: "Honoka Hashimoto",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(15),
    setup: {
      blade: {
        itemId: "nittaku-goriki-super-cut",
        name: "Goriki Super Cut",
        confidence: "reported",
        source: hashimotoRallys,
        asOf: "2026-01-01",
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "Hurricane 3 National (blue sponge)",
        variant: "National (blue sponge)",
        confidence: "reported",
        source: hashimotoRallys,
        asOf: "2026-01-01",
      },
      backhand: {
        itemId: "nittaku-do-knuckle",
        name: "Do Knuckle (short pips)",
        confidence: "reported",
        source: hashimotoRallys,
        asOf: "2026-01-01",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "han-ying",
    name: "Han Ying",
    country: "GER",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(16),
    setup: {
      blade: {
        itemId: "victas-koji-matsushita-offensive",
        name: "Koji Matsushita Offensive",
        confidence: "unverified",
        source: hanYingPhBlade,
        asOf: "2026-03-08",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo",
        confidence: "reported",
        source: hanYingPh,
        asOf: "2026-03-08",
      },
      backhand: {
        itemId: "victas-spectol-s3",
        name: "Spectol S3 (short pips)",
        confidence: "reported",
        source: hanYingPh,
        asOf: "2026-03-08",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "shi-xunyao",
    name: "Shi Xunyao",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(17),
    setup: {
      blade: {
        itemId: "butterfly-fan-zhendong-super-alc",
        name: "Fan Zhendong Super ALC",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "miyu-nagasaki",
    name: "Miyu Nagasaki",
    country: "JPN",
    gender: "women",
    hand: "left",
    grip: "shakehand",
    ranking: rank(18),
    setup: {
      blade: {
        itemId: "butterfly-harimoto-innerforce-super-alc",
        name: "Harimoto Tomokazu Innerforce Super ALC",
        confidence: "reported",
        source: nagasakiBlade,
        asOf: "2026-03-09",
      },
      forehand: {
        itemId: "butterfly-tenergy-05-hard",
        name: "Tenergy 05 Hard",
        confidence: "reported",
        source: nagasakiForehand,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-05",
        name: "Dignics 05",
        confidence: "reported",
        source: nagasakiBackhand,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "miyuu-kihara",
    name: "Miyuu Kihara",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(19),
    setup: {
      blade: {
        itemId: "tibhar-miyuu-kihara-bingo",
        name: "Miyuu Kihara Bingo",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "tibhar-hybrid-k3-pro",
        name: "Hybrid K3 Pro",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "tibhar-speedy-soft-d-tecs",
        name: "Speedy Soft D.TecS (2.0 mm, short pips)",
        confidence: "reported",
        source: kiharaDku51,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "adriana-diaz",
    name: "Adriana Díaz",
    country: "PUR",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(20),
    setup: {
      blade: {
        itemId: null,
        name: "Custom Super Arylate Carbon shakehand (G-FLESS)",
        variant: "Custom-made by Butterfly (Super Arylate Carbon, G-FLESS spec), not sold under this name",
        confidence: "confirmed",
        source: diazBf,
        asOf: "2025-09-17",
      },
      forehand: {
        itemId: "butterfly-dignics-05",
        name: "Dignics 05",
        confidence: "confirmed",
        source: diazBf,
        asOf: "2025-09-17",
      },
      backhand: {
        itemId: "butterfly-dignics-05",
        name: "Dignics 05",
        confidence: "confirmed",
        source: diazBf,
        asOf: "2025-09-17",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "hana-goda",
    name: "Hana Goda",
    country: "EGY",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(21),
    setup: {
      blade: {
        itemId: "stiga-cybershape-wood",
        name: "Cybershape Wood",
        confidence: "reported",
        source: godaStiga,
        asOf: "2026-10-03",
      },
      forehand: {
        itemId: "stiga-dna-platinum-h",
        name: "DNA Platinum H",
        confidence: "reported",
        source: godaStigaRubber,
        asOf: "2026-10-03",
      },
      backhand: {
        itemId: "stiga-dna-platinum-h",
        name: "DNA Platinum H",
        confidence: "reported",
        source: godaStigaRubber,
        asOf: "2026-10-03",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "sakura-yokoi",
    name: "Sakura Yokoi",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(22),
    setup: {
      blade: {
        itemId: "butterfly-fan-zhendong-alc",
        name: "Fan Zhendong ALC",
        confidence: "unverified",
        source: yokoiPh,
        asOf: "2026-03-08",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "unverified",
        source: yokoiPh,
        asOf: "2026-03-08",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "unverified",
        source: yokoiPh,
        asOf: "2026-03-08",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "bernadette-szocs",
    name: "Bernadette Szőcs",
    country: "ROU",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(23),
    setup: {
      blade: {
        itemId: "tibhar-szocs-signature",
        name: "Szőcs Signature",
        confidence: "reported",
        source: szocsPh,
        asOf: "2026-03-09",
      },
      forehand: {
        itemId: "tibhar-quantum-x-pro",
        name: "Quantum X Pro (pink topsheet)",
        confidence: "reported",
        source: szocsPh,
        asOf: "2026-03-09",
      },
      backhand: {
        itemId: "tibhar-hybrid-k3",
        name: "Hybrid K3",
        confidence: "reported",
        source: szocsPh,
        asOf: "2026-03-09",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "mima-ito",
    name: "Mima Ito",
    country: "JPN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(24),
    setup: {
      blade: {
        itemId: "nittaku-mima-ito-carbon",
        name: "Mima Ito Carbon",
        confidence: "confirmed",
        source: itoNittaku,
        asOf: "2025-06-06",
      },
      forehand: {
        itemId: "nittaku-fastarc-g-1",
        name: "Fastarc G-1",
        confidence: "confirmed",
        source: itoNittaku,
        asOf: "2025-06-06",
      },
      backhand: {
        itemId: "nittaku-moristo-sp",
        name: "Moristo SP (short pips)",
        confidence: "confirmed",
        source: itoNittaku,
        asOf: "2025-06-06",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "qin-yuxuan",
    name: "Qin Yuxuan",
    country: "CHN",
    gender: "women",
    hand: "right",
    grip: "shakehand",
    ranking: rank(25),
    setup: {
      blade: {
        itemId: "butterfly-fan-zhendong-alc",
        name: "Fan Zhendong ALC",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "Hurricane 3 Neo National (blue sponge)",
        variant: "National-team NEO version, blue sponge",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Dignics 09C",
        confidence: "reported",
        source: dku51July,
        asOf: "2026-07-25",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
];
