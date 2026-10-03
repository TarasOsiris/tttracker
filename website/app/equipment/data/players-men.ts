// Top 25 men's singles (ITTF/WTT world ranking, week 40 2026, published 2026-09-28) and their equipment setups.
// Every slot cites a source and an "as of" date. Butterfly's sponsor pages list a player's blade and rubbers but not
// which rubber is on which side; where they list two different rubbers, sides come from the source named in the label
// and the slot is "reported", not "confirmed". Undated pages use the date they were read and are at most "reported".
import type { Player, Source } from "../models";

const ACCESSED = "2026-10-03";
const VERIFIED = "2026-10-03";
const RANKING_DATE = "2026-09-28";

const ranking: Source = {
  url: "https://www.worldtabletennis.com/rankings",
  label: "ITTF/WTT Men's Singles World Ranking, week 40 2026",
  kind: "ittf",
  accessed: ACCESSED,
};

const rank = (position: number) => ({ position, date: RANKING_DATE, source: ranking });

const butterfly = (slug: string, label: string): Source => ({
  url: `https://www.butterfly-global.com/en/sponsoring/detail/${slug}.html`,
  label,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const wangChuqinPh: Source = {
  url: "https://tabletennis.ph/equipment/wang-chuqin-equipment/",
  label: "tabletennis.ph: Wang Chuqin equipment (Wikipedia lists a DHS W968 blade instead)",
  kind: "press",
  accessed: ACCESSED,
};
const felixTibhar: Source = {
  url: "https://tibhar.info/en/pro-player/felix-lebrun/",
  label: "Tibhar: Félix Lebrun pro-player page",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const matsushimaBf = butterfly("matsushima-sora", "Butterfly: Sora Matsushima sponsoring page");
const matsushimaBfSides = butterfly(
  "matsushima-sora",
  "Butterfly: Sora Matsushima sponsoring page (sides per Yarilog's Japan men's equipment list, Oct 2025-Jan 2026)",
);
const harimotoBf = butterfly("harimoto-tomokazu", "Butterfly: Tomokazu Harimoto sponsoring page");
const harimotoPh: Source = {
  url: "https://tabletennis.ph/equipment/tomokazu-harimoto-equipment/",
  label: "tabletennis.ph: Tomokazu Harimoto equipment",
  kind: "press",
  accessed: ACCESSED,
};
const trulsStiga: Source = {
  url: "https://www.stigasports.com/en-row/players-teams-tt/truls-moregardh",
  label: "Stiga: Truls Möregårdh player page (lists Cybershape Carbon Truls Edition and Helix Platinum XH 2.2)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const trulsMegaspin: Source = {
  url: "https://www.megaspin.net/store/default.asp?pid=s-cyber-c-cwt-truls-cmb",
  label: "Megaspin: Truls Möregårdh pro combo (Helix Platinum XH on both sides)",
  kind: "retailer",
  accessed: ACCESSED,
};
const linYunJuBf = butterfly("lin-yunju", "Butterfly: Lin Yun-Ju sponsoring page");
const linYunJuBfSides = butterfly("lin-yunju", "Butterfly: Lin Yun-Ju sponsoring page (sides per Wikipedia)");
const calderanoJoola: Source = {
  url: "https://joola.com/pages/hugo-calderano",
  label: "JOOLA: Hugo Calderano page",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const linShidongPh: Source = {
  url: "https://tabletennis.ph/equipment/lin-shidong-equipment/",
  label: "tabletennis.ph: Lin Shidong equipment",
  kind: "press",
  accessed: ACCESSED,
};
const alexisTibhar: Source = {
  url: "https://tibhar.info/en/alexis-lebrun/",
  label: "Tibhar: Alexis Lebrun x Tibhar",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const qiuBf = butterfly("qiu-dang", "Butterfly: Dang Qiu sponsoring page");

const jangRallys: Source = {
  url: "https://rallys.online/forplayers/player/jang-woojin/",
  label: "Rallys: Jang Woojin profile and equipment",
  kind: "press",
  accessed: ACCESSED,
};
const jorgicPh: Source = {
  url: "https://tabletennis.ph/equipment/darko-jorgic-equipment/",
  label: "tabletennis.ph: Darko Jorgic equipment (Tabletennis Reference still lists a Dynamic JC blade)",
  kind: "press",
  accessed: ACCESSED,
};
const jorgicTibhar: Source = {
  url: "https://tibhar.info/en/pro-player/darko-jorgic/",
  label: "Tibhar: Darko Jorgic pro-player page (lists Hybrid K3 and Infinity MX-P without sides; tabletennis.ph and Tabletennis Reference list Hybrid K3 on his forehand)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const jorgicTibharBh: Source = {
  url: "https://tibhar.info/en/pro-player/darko-jorgic/",
  label: "Tibhar: Darko Jorgic pro-player page (lists Hybrid K3 and Infinity MX-P without sides; tabletennis.ph and Tabletennis Reference still list Evolution MX-P on his backhand)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const togamiBf = butterfly("togami-shunsuke", "Butterfly: Shunsuke Togami sponsoring page");
const togamiBfSides = butterfly(
  "togami-shunsuke",
  "Butterfly: Shunsuke Togami sponsoring page (sides per Yarilog's Japan men's equipment list, Sept 2026)",
);
const lindDonic: Source = {
  url: "https://www.donic.com/donicfamily/champions-and-talents/anders-lind-2026/",
  label: "DONIC Family: Anders Lind 2026 (Bluegrip C2 shown for forehand and backhand)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const wenRuiboPpong: Source = {
  url: "https://www.ppongsuper.com/product/stiga-luma-hybrid-carbon-wen-ruibo/",
  label: "PPongsuper: Stiga Luma Hybrid Carbon (Wen Ruibo Edition), \"the blade used by Wen Ruibo\" (tabletennis.ph also lists a Stiga Luma Hybrid)",
  kind: "retailer",
  accessed: ACCESSED,
};
const wenRuiboPh: Source = {
  url: "https://tabletennis.ph/equipment/wen-ruibo-equipment/",
  label: "tabletennis.ph: Wen Ruibo equipment",
  kind: "press",
  accessed: ACCESSED,
};
const shinozukaBf = butterfly(
  "shinozuka-hiroto",
  "Butterfly: Hiroto Shinozuka sponsoring page (Yarilog's Japan men's list, May 2026, shows a Fan Zhendong ALC)",
);
const shinozukaBfSides = butterfly(
  "shinozuka-hiroto",
  "Butterfly: Hiroto Shinozuka sponsoring page (sides per Yarilog's Japan men's equipment list, May 2026)",
);
const ovtcharovBf = butterfly("ovtcharov-dimitrij", "Butterfly: Dimitrij Ovtcharov sponsoring page");
const ovtcharovBfSides = butterfly(
  "ovtcharov-dimitrij",
  "Butterfly: Dimitrij Ovtcharov sponsoring page (lists both rubbers; sides per Tabletennis Reference: Dignics 09C forehand, Zyre 03 backhand)",
);
const franziskaBf = butterfly("franziska-patrick", "Butterfly: Patrick Franziska sponsoring page");
const franziskaTtd: Source = {
  url: "https://www.youtube.com/watch?v=bcUjJaDrAZg",
  label: "TableTennisDaily: Zyre 03 vs Dignics 09C with Patrick Franziska",
  kind: "press",
  accessed: ACCESSED,
};
const jhaBf = butterfly("jha-kanak", "Butterfly: Kanak Jha sponsoring page");

const zhouQihaoPpong: Source = {
  url: "https://www.ppongsuper.com/top-10-new-table-tennis-products-of-2025/",
  label: "PPongsuper: Top 10 new table tennis products of 2025 (Zhou Qihao's Project Z)",
  kind: "retailer",
  accessed: ACCESSED,
};
const zhouQihaoPh: Source = {
  url: "https://tabletennis.ph/equipment/zhou-qihao-equipment/",
  label: "tabletennis.ph: Zhou Qihao equipment",
  kind: "press",
  accessed: ACCESSED,
};
const sidorenkoDonic: Source = {
  url: "https://www.donic.com/en/donicfamily/legends-and-players/vladimir-sidorenko-tabletennis/",
  label: "DONIC Family: Vladimir Sidorenko (rubbers shown as forehand/backhand; no blade listed)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const cotonDonic: Source = {
  url: "https://www.donic.com/en/donicfamily/legends-and-players/flavien-coton-tabletennis/",
  label: "DONIC Family: Flavien Coton",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const poretAndro: Source = {
  url: "http://web.archive.org/web/20260414011446/https://www.andro.de/en/thibault-poret",
  label: "andro: Equipment from Thibault (archived 2026-04-14; NUZN 55 listed for both sides)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const xiangPengPh: Source = {
  url: "https://tabletennis.ph/equipment/xiang-peng-equipment/",
  label: "tabletennis.ph: Xiang Peng equipment",
  kind: "press",
  accessed: ACCESSED,
};
const ohJunsungRef: Source = {
  url: "https://tabletennis-reference.com/player/detail/5422",
  label: "Tabletennis Reference: Oh Junsung equipment (Butterfly Viscaria blade; he joined Tibhar in January 2025)",
  kind: "reference",
  accessed: ACCESSED,
};

export const menPlayers: Player[] = [
  {
    id: "wang-chuqin",
    name: "Wang Chuqin",
    country: "CHN",
    gender: "men",
    hand: "left",
    grip: "shakehand",
    ranking: rank(1),
    setup: {
      blade: {
        itemId: "dhs-hurricane-king",
        name: "DHS Hurricane King",
        confidence: "unverified",
        source: wangChuqinPh,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "DHS Hurricane 3 National",
        variant: "National",
        confidence: "unverified",
        source: wangChuqinPh,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "dhs-hurricane-8",
        name: "DHS Hurricane 8",
        confidence: "unverified",
        source: wangChuqinPh,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "felix-lebrun",
    name: "Félix Lebrun",
    country: "FRA",
    gender: "men",
    hand: "right",
    grip: "penhold",
    ranking: rank(2),
    setup: {
      blade: {
        itemId: "tibhar-felix-lebrun-hyper-carbon",
        name: "Tibhar Félix Lebrun Hyper Carbon",
        confidence: "reported",
        source: felixTibhar,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "tibhar-hybrid-k3",
        name: "Tibhar Hybrid K3",
        confidence: "reported",
        source: felixTibhar,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "tibhar-hybrid-k3",
        name: "Tibhar Hybrid K3",
        confidence: "reported",
        source: felixTibhar,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "sora-matsushima",
    name: "Sora Matsushima",
    country: "JPN",
    gender: "men",
    hand: "left",
    grip: "shakehand",
    ranking: rank(3),
    setup: {
      blade: {
        itemId: "butterfly-fan-zhendong-alc",
        name: "Butterfly Fan Zhendong ALC",
        confidence: "confirmed",
        source: matsushimaBf,
        asOf: "2025-10-01",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "reported",
        source: matsushimaBfSides,
        asOf: "2025-10-01",
      },
      backhand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "reported",
        source: matsushimaBfSides,
        asOf: "2025-10-01",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "tomokazu-harimoto",
    name: "Tomokazu Harimoto",
    country: "JPN",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(4),
    setup: {
      blade: {
        itemId: "butterfly-harimoto-innerforce-super-alc",
        name: "Butterfly Harimoto Tomokazu Innerforce Super ALC",
        confidence: "confirmed",
        source: harimotoBf,
        asOf: "2025-10-11",
      },
      forehand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "confirmed",
        source: harimotoBf,
        asOf: "2025-10-11",
      },
      backhand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "confirmed",
        source: harimotoBf,
        asOf: "2025-10-11",
      },
    },
    history: [
      {
        date: "2024-10-11",
        slot: "blade",
        from: "Butterfly Harimoto Innerforce ALC",
        to: "Butterfly Harimoto Tomokazu Innerforce Super ALC",
        source: harimotoPh,
      },
    ],
    lastVerified: VERIFIED,
  },
  {
    id: "truls-moregardh",
    name: "Truls Möregårdh",
    country: "SWE",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(5),
    setup: {
      blade: {
        itemId: "stiga-cybershape-carbon-cwt",
        name: "Stiga Cybershape Carbon Truls Edition",
        confidence: "reported",
        source: trulsStiga,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "stiga-helix-platinum-xh",
        name: "Stiga Helix Platinum XH",
        confidence: "reported",
        source: trulsMegaspin,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "stiga-helix-platinum-xh",
        name: "Stiga Helix Platinum XH",
        confidence: "reported",
        source: trulsMegaspin,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "lin-yun-ju",
    name: "Lin Yun-Ju",
    country: "TPE",
    gender: "men",
    hand: "left",
    grip: "shakehand",
    ranking: rank(6),
    setup: {
      blade: {
        itemId: "butterfly-viscaria-super-alc",
        name: "Butterfly Viscaria Super ALC",
        confidence: "confirmed",
        source: linYunJuBf,
        asOf: "2026-01-05",
      },
      forehand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "reported",
        source: linYunJuBfSides,
        asOf: "2026-01-05",
      },
      backhand: {
        itemId: "butterfly-dignics-05",
        name: "Butterfly Dignics 05",
        confidence: "reported",
        source: linYunJuBfSides,
        asOf: "2026-01-05",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "hugo-calderano",
    name: "Hugo Calderano",
    country: "BRA",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(7),
    setup: {
      blade: {
        itemId: "joola-hugo-calderano-ary-c",
        name: "JOOLA Hugo Calderano ARY-C",
        confidence: "reported",
        source: calderanoJoola,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "joola-trinity-hugo-calderano-charged",
        name: "JOOLA Trinity Hugo Calderano Charged",
        confidence: "reported",
        source: calderanoJoola,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "joola-trinity-hugo-calderano-dynamic",
        name: "JOOLA Trinity Hugo Calderano Dynamic",
        confidence: "reported",
        source: calderanoJoola,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "lin-shidong",
    name: "Lin Shidong",
    country: "CHN",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(8),
    setup: {
      blade: {
        itemId: "butterfly-viscaria",
        name: "Butterfly Viscaria",
        variant: "Golden version",
        confidence: "unverified",
        source: linShidongPh,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "DHS Hurricane 3 National",
        variant: "National",
        confidence: "unverified",
        source: linShidongPh,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "unverified",
        source: linShidongPh,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "alexis-lebrun",
    name: "Alexis Lebrun",
    country: "FRA",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(9),
    setup: {
      blade: {
        itemId: "tibhar-alexis-lebrun-krypto-carbon",
        name: "Tibhar Alexis Lebrun Krypto Carbon",
        confidence: "reported",
        source: alexisTibhar,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "tibhar-hybrid-k3",
        name: "Tibhar Hybrid K3",
        confidence: "reported",
        source: alexisTibhar,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "tibhar-hybrid-k3",
        name: "Tibhar Hybrid K3",
        confidence: "reported",
        source: alexisTibhar,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "dang-qiu",
    name: "Dang Qiu",
    country: "GER",
    gender: "men",
    hand: "right",
    grip: "penhold",
    ranking: rank(10),
    setup: {
      blade: {
        itemId: "butterfly-viscaria",
        name: "Butterfly Viscaria - CS",
        variant: "CS (Chinese penhold) handle",
        confidence: "confirmed",
        source: qiuBf,
        asOf: "2026-09-20",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "confirmed",
        source: qiuBf,
        asOf: "2026-09-20",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "confirmed",
        source: qiuBf,
        asOf: "2026-09-20",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "jang-woojin",
    name: "Jang Woojin",
    country: "KOR",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(11),
    setup: {
      blade: {
        itemId: "dhs-hurricane-long-5",
        name: "DHS Hurricane Long 5",
        confidence: "reported",
        source: jangRallys,
        asOf: "2025-05-01",
      },
      forehand: {
        itemId: "dhs-hurricane-3-neo",
        name: "DHS Hurricane 3 Neo",
        confidence: "reported",
        source: jangRallys,
        asOf: "2025-05-01",
      },
      backhand: {
        itemId: "victas-v15-extra",
        name: "Victas V>15 Extra",
        confidence: "reported",
        source: jangRallys,
        asOf: "2025-05-01",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "darko-jorgic",
    name: "Darko Jorgic",
    country: "SLO",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(12),
    setup: {
      blade: {
        itemId: "tibhar-shang-kun-hybrid-ac",
        name: "Tibhar Shang Kun Hybrid AC",
        confidence: "unverified",
        source: jorgicPh,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "tibhar-hybrid-k3",
        name: "Tibhar Hybrid K3",
        confidence: "reported",
        source: jorgicTibhar,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "tibhar-infinity-mx-p",
        name: "Tibhar Infinity MX-P",
        confidence: "reported",
        source: jorgicTibharBh,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "shunsuke-togami",
    name: "Shunsuke Togami",
    country: "JPN",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(13),
    setup: {
      blade: {
        itemId: "butterfly-fan-zhendong-alc",
        name: "Butterfly Fan Zhendong ALC",
        confidence: "confirmed",
        source: togamiBf,
        asOf: "2026-05-21",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "reported",
        source: togamiBfSides,
        asOf: "2026-05-21",
      },
      backhand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "reported",
        source: togamiBfSides,
        asOf: "2026-05-21",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "anders-lind",
    name: "Anders Lind",
    country: "DEN",
    gender: "men",
    hand: "left",
    grip: "shakehand",
    ranking: rank(14),
    setup: {
      blade: {
        itemId: "donic-anders-lind-exceptional",
        name: "DONIC Anders Lind Exceptional",
        confidence: "reported",
        source: lindDonic,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "donic-bluegrip-c2",
        name: "DONIC Bluegrip C2",
        confidence: "reported",
        source: lindDonic,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "donic-bluegrip-c2",
        name: "DONIC Bluegrip C2",
        confidence: "reported",
        source: lindDonic,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "wen-ruibo",
    name: "Wen Ruibo",
    country: "CHN",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(15),
    setup: {
      blade: {
        itemId: null,
        name: "Stiga Luma Hybrid Carbon",
        confidence: "unverified",
        source: wenRuiboPpong,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "DHS Hurricane 3 National",
        variant: "National",
        confidence: "unverified",
        source: wenRuiboPh,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "stiga-dna-hybrid-xh",
        name: "Stiga DNA Hybrid XH",
        confidence: "unverified",
        source: wenRuiboPh,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "zhou-qihao",
    name: "Zhou Qihao",
    country: "CHN",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(16),
    setup: {
      blade: {
        itemId: null,
        name: "Double Fish Project Z",
        confidence: "unverified",
        source: zhouQihaoPpong,
        asOf: "2025-12-29",
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "DHS Hurricane 3",
        confidence: "unverified",
        source: zhouQihaoPh,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "butterfly-dignics-05",
        name: "Butterfly Dignics 05",
        confidence: "unverified",
        source: zhouQihaoPh,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "vladimir-sidorenko",
    name: "Vladimir Sidorenko",
    country: "RUS",
    gender: "men",
    hand: "left",
    grip: "shakehand",
    ranking: rank(17),
    setup: {
      blade: {
        itemId: null,
        name: "Not publicly confirmed",
        confidence: "unverified",
        source: sidorenkoDonic,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "donic-bluegrip-c2",
        name: "DONIC Bluegrip C2",
        confidence: "reported",
        source: sidorenkoDonic,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "donic-bluestar-a1",
        name: "DONIC Bluestar A1",
        confidence: "reported",
        source: sidorenkoDonic,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "hiroto-shinozuka",
    name: "Hiroto Shinozuka",
    country: "JPN",
    gender: "men",
    hand: "left",
    grip: "shakehand",
    ranking: rank(18),
    setup: {
      blade: {
        itemId: "butterfly-timo-boll-alc",
        name: "Butterfly Timo Boll ALC",
        confidence: "confirmed",
        source: shinozukaBf,
        asOf: "2026-01-19",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "reported",
        source: shinozukaBfSides,
        asOf: "2026-01-19",
      },
      backhand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "reported",
        source: shinozukaBfSides,
        asOf: "2026-01-19",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "flavien-coton",
    name: "Flavien Coton",
    country: "FRA",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(19),
    setup: {
      blade: {
        itemId: "donic-coton-relevant",
        name: "DONIC Coton Relevant",
        confidence: "reported",
        source: cotonDonic,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "donic-bluestar-a1",
        name: "DONIC Bluestar A1",
        confidence: "reported",
        source: cotonDonic,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "donic-bluestar-a1",
        name: "DONIC Bluestar A1",
        confidence: "reported",
        source: cotonDonic,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "dimitrij-ovtcharov",
    name: "Dimitrij Ovtcharov",
    country: "GER",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(20),
    setup: {
      blade: {
        itemId: null,
        name: "Butterfly custom shakehand blade",
        variant: "Custom-made ALC blade (Butterfly lists \"Custom Shakehand, ALC\" without a model name)",
        confidence: "confirmed",
        source: ovtcharovBf,
        asOf: "2026-05-22",
      },
      forehand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "reported",
        source: ovtcharovBfSides,
        asOf: "2026-05-22",
      },
      backhand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "reported",
        source: ovtcharovBfSides,
        asOf: "2026-05-22",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "thibault-poret",
    name: "Thibault Poret",
    country: "FRA",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(21),
    setup: {
      blade: {
        itemId: "andro-synteliac-zco",
        name: "andro Synteliac ZCO",
        confidence: "reported",
        source: poretAndro,
        asOf: "2026-04-14",
      },
      forehand: {
        itemId: "andro-nuzn-55",
        name: "andro NUZN 55",
        confidence: "reported",
        source: poretAndro,
        asOf: "2026-04-14",
      },
      backhand: {
        itemId: "andro-nuzn-55",
        name: "andro NUZN 55",
        confidence: "reported",
        source: poretAndro,
        asOf: "2026-04-14",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "xiang-peng",
    name: "Xiang Peng",
    country: "CHN",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(22),
    setup: {
      blade: {
        itemId: null,
        name: "DHS Hurricane Long",
        variant: "Model number not stated",
        confidence: "unverified",
        source: xiangPengPh,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "dhs-hurricane-3",
        name: "DHS Hurricane 3 National",
        variant: "National",
        confidence: "unverified",
        source: xiangPengPh,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "dhs-hurricane-3",
        name: "DHS Hurricane 3",
        confidence: "unverified",
        source: xiangPengPh,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "oh-junsung",
    name: "Oh Junsung",
    country: "KOR",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(23),
    setup: {
      blade: {
        itemId: "butterfly-viscaria",
        name: "Butterfly Viscaria",
        confidence: "unverified",
        source: ohJunsungRef,
        asOf: ACCESSED,
      },
      forehand: {
        itemId: "tibhar-hybrid-k3-pro",
        name: "Tibhar Hybrid K3 Pro",
        confidence: "unverified",
        source: ohJunsungRef,
        asOf: ACCESSED,
      },
      backhand: {
        itemId: "tibhar-hybrid-k3-pro",
        name: "Tibhar Hybrid K3 Pro",
        confidence: "unverified",
        source: ohJunsungRef,
        asOf: ACCESSED,
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "patrick-franziska",
    name: "Patrick Franziska",
    country: "GER",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(24),
    setup: {
      blade: {
        itemId: "butterfly-franziska-innerforce-zlc",
        name: "Butterfly Franziska Innerforce ZLC",
        confidence: "confirmed",
        source: franziskaBf,
        asOf: "2026-06-15",
      },
      forehand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "confirmed",
        source: franziskaTtd,
        asOf: "2026-03-11",
      },
      backhand: {
        itemId: "butterfly-dignics-09c",
        name: "Butterfly Dignics 09C",
        confidence: "confirmed",
        source: franziskaTtd,
        asOf: "2026-03-11",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
  {
    id: "kanak-jha",
    name: "Kanak Jha",
    country: "USA",
    gender: "men",
    hand: "right",
    grip: "shakehand",
    ranking: rank(25),
    setup: {
      blade: {
        itemId: "butterfly-timo-boll-alc",
        name: "Butterfly Timo Boll ALC",
        confidence: "confirmed",
        source: jhaBf,
        asOf: "2026-02-12",
      },
      forehand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "confirmed",
        source: jhaBf,
        asOf: "2026-02-12",
      },
      backhand: {
        itemId: "butterfly-zyre-03",
        name: "Butterfly Zyre 03",
        confidence: "confirmed",
        source: jhaBf,
        asOf: "2026-02-12",
      },
    },
    history: [],
    lastVerified: VERIFIED,
  },
];
