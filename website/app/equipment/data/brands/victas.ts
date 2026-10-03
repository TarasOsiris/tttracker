import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** victas.com Japanese product page (VICTAS Inc., Japan). */
const jp = (id: number, label: string): Source => ({
  url: `https://www.victas.com/products/detail.html?id=${id}`,
  label: `VICTAS (victas.com, Japan): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** victas.com English (en_gb) product page, Victas's own European site. */
const en = (id: number, label: string): Source => ({
  url: `https://www.victas.com/en_gb/products/detail.html?id=${id}`,
  label: `VICTAS (victas.com English/European site): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** ITTF List of Authorized Racket Coverings valid from 1 January 2026 (copy published by the Hessian TT association). */
const LARC: Source = {
  url: "https://www.httv.de/media/000/Schiedsrichter/Material_SR-Einsatz/Zulassungslisten/LARC/ITTF/2026/Equipment_RacketCovering_1January2026_1118.pdf",
  label: "ITTF LARC (List of Authorized Racket Coverings), 1 January 2026",
  kind: "ittf",
  accessed: ACCESSED,
};

/** Japanese retailer Mingles' product page (used only for the hardness-scale wording Victas itself doesn't print). */
const mingles = (id: number, label: string): Source => ({
  url: `https://shop.mingles.jp/SHOP/${id}.html`,
  label: `Mingles online shop (Japanese retailer): ${label}`,
  kind: "retailer",
  accessed: ACCESSED,
});

const TOLERANCE_NOTE =
  "Victas prints the sponge hardness with a ±3 tolerance; the nominal value is recorded. Victas prints the same figure on its Japanese and European sites.";

const ESN_NOTE =
  "Victas does not name the hardness scale on its sites or in its 2026 catalogue. The figure is recorded on the German (ESN-type) scale because Victas lists the rubber as made in Germany.";

const UNSTATED_NOTE =
  "Victas does not name the hardness scale on its sites or in its 2026 catalogue, and Japanese retailers disagree for its Japan-made rubbers (Mingles marks Spectol S1 as 日本基準, Japanese standard, but the Japan-made VJ>07 Stiff as ドイツ基準, German standard), so the scale is recorded as unstated.";

const TENSOR_NOTE =
  "Classified as tensor because Victas's Japanese site lists the rubber type as ハイエナジーテンション裏ソフト (High Energy Tension inverted rubber).";

export const brand: Brand = {
  id: "victas",
  name: "Victas",
  country: "Japan",
  website: "https://www.victas.com",
  ratingNote:
    "Victas gives each blade a class such as OFF, OFF+ or ALL; on its Japanese site a few rubbers also carry numeric ratings (arc height, speed, drive accuracy, topsheet strength, rebound) with no scale maximum stated.",
  hardnessScale: null,
  sources: [
    {
      url: "https://www.victas.com/tsphistory/",
      label: "VICTAS: TSP brand history (TSP joins VICTAS; products carried over to VICTAS)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "https://www.victas.com/products/detail.html?id=779",
      label: "VICTAS (victas.com, Japan): V>20 Double Extra (example of numeric rubber ratings)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "https://www.victas.com/webcatalog/content1405.html",
      label: "VICTAS: 2026 Table Tennis Catalog (hardness legend gives no scale)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "https://shop.mingles.jp/SHOP/2846.html",
      label: "Mingles online shop (Japanese retailer): VICTAS VJ>07 Stiff, Japan-made, hardness marked ドイツ基準",
      kind: "retailer",
      accessed: ACCESSED,
    },
    {
      url: "https://shop.mingles.jp/SHOP/4185.html",
      label: "Mingles online shop (Japanese retailer): VICTAS Spectol S1, Japan-made, hardness marked 日本基準",
      kind: "retailer",
      accessed: ACCESSED,
    },
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const swatJp = jp(15, "Swat (スワット)");
const swatCnJp = jp(16, "Swat CHN (Chinese penhold)");
const swatEn = en(143, "SWAT");

const swatCJp = jp(17, "Swat Carbon (スワット カーボン)");
const swatCCnJp = jp(18, "Swat Carbon CHN (Chinese penhold)");
const swatCEn = en(133, "SWAT CARBON");

const ffvcJp = jp(19, "Fire Fall VC (ファイヤーフォール VC)");
const ffvcCnJp = jp(20, "Fire Fall VC CHN (Chinese penhold)");
const ffvcEn = en(161, "FIRE FALL VC");

const fffcJp = jp(93, "Fire Fall FC (ファイヤーフォール FC)");
const fffcEn = en(164, "FIRE FALL FC");

const kmsJp = jp(78, "Koji Matsushita Special (松下浩二 スペシャル)");
const kmsEn = en(106, "KOJI MATSUSHITA SPECIAL");

const kmoJp = jp(76, "Koji Matsushita Offensive (松下浩二 オフェンシブ)");
const kmoEn = en(105, "KOJI MATSUSHITA OFFENSIVE");

const nwJp = jp(11, "Koki Niwa Wood (丹羽孝希ウッド)");
const nwCnJp = jp(12, "Koki Niwa Wood CHN (Chinese penhold)");
const nwEn = en(149, "KOKI NIWA WOOD");

const nzcJp = jp(9, "Koki Niwa ZC (丹羽孝希 ZC)");
const nzcCnJp = jp(10, "Koki Niwa ZC CHN (Chinese penhold)");
const nzcEn = en(145, "KOKI NIWA ZC");

const zxInJp = jp(82, "ZX-Gear In (ゼクスギア イン)");
const zxInEn = en(167, "ZX-GEAR IN");

const zxOutJp = jp(83, "ZX-Gear Out (ゼクスギア アウト)");
const zxOutEn = en(118, "ZX-GEAR OUT");

const hcpJp = jp(29, "Hino-Carbon Power (ヒノカーボン パワー)");
const hcpCnJp = jp(30, "Hino-Carbon Power CHN (Chinese penhold)");
const hcpEn = en(89, "HINO-CARBON POWER");

export const blades: Blade[] = [
  {
    id: "victas-swat",
    brandId: "victas",
    name: "Swat",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "An all-wood 7-ply offensive blade, 6.0 mm thick, that Victas rates OFF.",
    description: [
      "Swat is a 7-ply all-wood blade made in China. Victas lists it at 6.0 mm thick, 158 x 150 mm, around 85 g, and classes it OFF.",
      "Victas describes it as making the most of the feel of wood, with a wide sweet spot and easy handling that suits a broad range of styles. Its European site adds that the blade has a slight head-heavy balance and a soft feel aimed at topspin players.",
      "It is sold in flared and straight handles, a Japan-only slim handle, and as a separate Chinese penhold version.",
    ],
    facts: [
      {
        text: "Victas says Swat was developed by a Japanese team led by former world-class player Koji Matsushita.",
        source: swatEn.url,
      },
    ],
    notes: [
      "The Japanese site also lists a SLIM handle (310008), which has no equivalent in our handle list.",
      "The Chinese penhold version (Swat CHN) is listed at 159 x 150 mm and about 80 g.",
    ],
    sources: [swatJp, swatCnJp, swatEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7 wood plies (木材7枚)",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 85 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF",
    madeIn: "China",
  },
  {
    id: "victas-swat-carbon",
    brandId: "victas",
    name: "Swat Carbon",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A carbon version of Swat: five wood plies plus two Fleece Carbon layers, 6.0 mm thick, classed OFF.",
    description: [
      "Swat Carbon adds two layers of Fleece Carbon to five wood plies. Victas lists it at 6.0 mm thick, 158 x 150 mm and around 85 g, and classes it OFF. It is made in China.",
      "Victas describes it as keeping the wooden feel of the original Swat while adding power to steady topspin strokes. Its Japanese product page presents the blade with Victas's DYNA SHELL construction, in which the composite sits between the outer ply and the ply beneath it.",
    ],
    facts: [
      {
        text: "Victas's DYNA SHELL construction places the special material between the outer ply and the next ply of a 5-ply wood blade.",
        source: swatCJp.url,
      },
    ],
    notes: [
      "Fiber position is taken from the DYNA SHELL explanation on the Japanese Swat Carbon page; the European page does not state where the carbon sits.",
      "The Chinese penhold version (Swat Carbon CHN) is listed at 160 x 150 mm and about 80 g.",
    ],
    sources: [swatCJp, swatCCnJp, swatCEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 Fleece Carbon (木材5枚+フリースカーボン2枚)",
    fibers: ["carbon"],
    fiberName: "Fleece Carbon",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 85 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF",
    madeIn: "China",
  },
  {
    id: "victas-fire-fall-vc",
    brandId: "victas",
    name: "Fire Fall VC",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner composite blade with Victas's V-Carbon next to the core, 6.4 mm thick, classed OFF+.",
    description: [
      "Fire Fall VC combines five wood plies with two layers of V-Carbon placed alongside the core, a layout Victas calls DYNA CORE. Victas lists it at 6.4 mm, 157 x 150 mm and around 92 g, and classes it OFF+. It is made in China.",
      "Victas describes V-Carbon as a material that weaves a high-strength 'super fiber' together with carbon, and says the blade is built for hard-hitting power while staying stable.",
    ],
    facts: [
      {
        text: "Victas says V-Carbon weaves carbon together with a super fiber used in protective clothing and space suits.",
        source: ffvcJp.url,
      },
    ],
    notes: [
      "Victas does not name the 'super fiber' in V-Carbon, so it is recorded as carbon plus an unspecified other fiber.",
      "The Chinese penhold version (Fire Fall VC CHN) is listed at about 87 g.",
    ],
    sources: [ffvcJp, ffvcCnJp, ffvcEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 V-Carbon (木材5枚＋Vカーボン2枚)",
    fibers: ["carbon", "other"],
    fiberName: "V-Carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 6.4,
    weightG: { min: 92 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF+",
    madeIn: "China",
  },
  {
    id: "victas-fire-fall-fc",
    brandId: "victas",
    name: "Fire Fall FC",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A light 5+2 inner blade with Fleece Carbon next to the core, 6.0 mm thick, which Victas rates OFF.",
    description: [
      "Fire Fall FC uses Victas's DYNA CORE layout: two layers of Fleece Carbon placed directly on the core inside five wood plies. Victas lists it at 6.0 mm, 157 x 150 mm and around 82 g. It is made in China.",
      "Victas calls it the Fire Fall model with the best feel, describing a soft touch that carries through to the hand despite the composite, a fairly high arc and an emphasis on stability in serve, return and blocking.",
    ],
    facts: [],
    notes: [
      "Both Victas sites list the class as OFF, but the text on the European page calls it an \"OFF- blade\"; the listed class OFF is recorded.",
    ],
    sources: [fffcJp, fffcEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 Fleece Carbon (木材5枚+フリースカーボン2枚)",
    fibers: ["carbon"],
    fiberName: "Fleece Carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 82 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF",
    madeIn: "China",
  },
  {
    id: "victas-koji-matsushita-special",
    brandId: "victas",
    name: "Koji Matsushita Special",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A large-headed defensive blade with two Fleece Carbon layers, 5.6 mm thick, classed ALL.",
    description: [
      "Koji Matsushita Special is a defensive (chopping) blade with five wood plies and two layers of Fleece Carbon. Victas lists a large 165 x 155 mm head, 5.6 mm thickness and around 90 g, and classes it ALL. It is made in China.",
      "Victas describes a damped wood layup, a wide sweet spot and very little vibration in the hand, and aims it at modern defenders who also attack.",
    ],
    facts: [
      {
        text: "The blade is named after Koji Matsushita, whom Victas calls a legendary Japanese defender, and Victas says his experience went into its design.",
        source: kmsEn.url,
      },
    ],
    notes: ["Victas does not say where the Fleece Carbon sits in the layup."],
    sources: [kmsJp, kmsEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 Fleece Carbon (木材5枚+フリースカーボン2枚)",
    fibers: ["carbon"],
    fiberName: "Fleece Carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.6,
    weightG: { min: 90 },
    handles: ["FL", "ST"],
    manufacturerClass: "ALL",
    madeIn: "China",
  },
  {
    id: "victas-koki-niwa-wood",
    brandId: "victas",
    name: "Koki Niwa Wood",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade, 6.5 mm thick, classed OFF+.",
    description: [
      "Koki Niwa Wood is a 7-ply all-wood blade made in China. Victas lists it at 6.5 mm, 157 x 150 mm and around 90 g, and classes it OFF+.",
      "Victas describes it as a fast all-wood blade for close-to-the-table play and counter-hitting, and its European site recommends pairing it with hard offensive rubbers such as V>15 Extra.",
    ],
    facts: [
      {
        text: "The blade is a signature model for Japanese player Koki Niwa, and Victas says no special materials were used, only wood.",
        source: nwJp.url,
      },
    ],
    notes: ["The Chinese penhold version (Koki Niwa Wood CHN) is listed at about 85 g."],
    sources: [nwJp, nwCnJp, nwEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7 wood plies (木材7枚)",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.5,
    weightG: { min: 90 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF+",
    madeIn: "China",
  },
  {
    id: "victas-koki-niwa-zc",
    brandId: "victas",
    name: "Koki Niwa ZC",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made 5+2 outer blade with Z-Carbon under a hinoki face, 6.0 mm thick, classed OFF+.",
    description: [
      "Koki Niwa ZC has five wood plies and two layers of Victas's Z-Carbon, placed directly under the outer ply, and a hinoki face veneer. Victas lists it at 6.0 mm, 157 x 150 mm and around 89 g, and classes it OFF+. It is made in Japan.",
      "Victas describes it as combining good rebound with control, suited to attacking close to the table.",
    ],
    facts: [
      {
        text: "Victas says Koki Niwa took part in developing the blade.",
        source: nzcEn.url,
      },
    ],
    notes: ["The Chinese penhold version (Koki Niwa ZC CHN) is listed at about 84 g."],
    sources: [nzcJp, nzcCnJp, nzcEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 Z-Carbon (木材5枚＋Zカーボン2枚)",
    fibers: ["carbon", "other"],
    fiberName: "Z-Carbon (Zxion)",
    fiberPosition: "outer",
    outerWood: "Hinoki",
    thicknessMm: 6.0,
    weightG: { min: 89 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF+",
    madeIn: "Japan",
  },
  {
    id: "victas-zx-gear-in",
    brandId: "victas",
    name: "ZX-Gear In",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made 5+2 inner blade with Z-Carbon next to the core, 5.9 mm thick, classed OFF+.",
    description: [
      "ZX-Gear In places two layers of Z-Carbon directly on the core of a five-ply wood blade (Victas's DYNA CORE layout). Victas lists it at 5.9 mm, 157 x 150 mm and around 89 g, and classes it OFF+. It is made in Japan.",
      "Victas describes its rebound as the middle of the ZX-Gear range and says it balances power in loops with control in short play over the table.",
    ],
    facts: [
      {
        text: "Victas says the Z-Carbon in the ZX-Gear series uses Zxion, a high-elasticity fiber from KB Seiren, which Victas calls the first use of the fiber in table tennis.",
        source: zxInJp.url,
      },
    ],
    notes: [
      "Grip size differs between Victas sites: Japanese site FL 100x23 / ST 100x22 mm, European site 100x24 (FL) / 23 (ST) mm.",
    ],
    sources: [zxInJp, zxInEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 Z-Carbon (木材5枚＋Zカーボン2枚)",
    fibers: ["carbon", "other"],
    fiberName: "Z-Carbon (Zxion)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF+",
    madeIn: "Japan",
  },
  {
    id: "victas-zx-gear-out",
    brandId: "victas",
    name: "ZX-Gear Out",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made 5+2 outer blade with Z-Carbon under the outer ply, 5.9 mm thick, classed OFF+.",
    description: [
      "ZX-Gear Out places two layers of Z-Carbon directly under the outer ply of a five-ply wood blade (Victas's DYNA SHELL layout). Victas lists it at 5.9 mm, 157 x 150 mm and around 89 g, and classes it OFF+. It is made in Japan.",
      "Victas recommends it for players who want a strong rebound and power, and says the elastic fiber still gives good dwell time for an outer-carbon blade.",
    ],
    facts: [
      {
        text: "Victas calls ZX-Gear Out the first outer-carbon blade under the VICTAS brand.",
        source: zxOutJp.url,
      },
      {
        text: "The Z-Carbon in the ZX-Gear series uses Zxion, a fiber Victas says is close to aramid in performance but more elastic.",
        source: zxOutJp.url,
      },
    ],
    notes: [
      "Grip size differs between Victas sites: Japanese site FL 100x23 / ST 100x22 mm, European site 100x24 (FL) / 23 (ST) mm.",
    ],
    sources: [zxOutJp, zxOutEn],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 Z-Carbon (木材5枚＋Zカーボン2枚)",
    fibers: ["carbon", "other"],
    fiberName: "Z-Carbon (Zxion)",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF+",
    madeIn: "Japan",
  },
  {
    id: "victas-hino-carbon-power",
    brandId: "victas",
    name: "Hino-Carbon Power",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 3-ply hinoki and kiri blade with two carbon layers, listed at 7.0 mm and about 85 g.",
    description: [
      "Hino-Carbon Power has three wood plies, hinoki faces and a kiri core, with carbon between each face and the core. Victas's Japanese site lists it at 7.0 mm, 158 x 151 mm and around 85 g, and classes it OFF+. It is made in China.",
      "Victas describes the combination of hinoki's dwell and carbon's rebound as suited to everything from rally play to fast attack, and its European site places it among the lighter carbon blades.",
    ],
    facts: [],
    notes: [
      "Class differs between Victas sites: Japanese site OFF+, European site OFF. The Japanese (home) site value is recorded.",
      "Blade size differs: Japanese site 158 x 151 mm, European site 160 x 153 mm. The European site gives no thickness; 7.0 mm is from the Japanese site.",
      "With only three wood plies, the carbon sits both directly under the hinoki face and next to the kiri core, so the position is recorded as other.",
    ],
    sources: [hcpJp, hcpCnJp, hcpEn],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "3 wood + 2 carbon (木材3枚+カーボン2枚)",
    fibers: ["carbon"],
    fiberName: "Carbon",
    fiberPosition: "other",
    outerWood: "Hinoki",
    thicknessMm: 7.0,
    weightG: { min: 85 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF+",
    madeIn: "China",
  },
  {
    id: "victas-koji-matsushita-offensive",
    brandId: "victas",
    name: "Koji Matsushita Offensive",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply all-wood defensive blade with mahogany outer plies, 6.0 mm thick, classed OFF-.",
    description: [
      "Koji Matsushita Offensive is a five-ply all-wood blade that Victas lists among its defensive (chopping) blades. Victas gives a large 165 x 155 mm head, 6.0 mm thickness and around 93 g, and classes it OFF-. It is made in Japan.",
      "Victas says the slightly hard mahogany outer plies give the ball power when attacking, while the core wood is chosen to keep chops stable. It pitches the blade at more aggressive choppers who mix sudden counter-attacks into their defence.",
    ],
    facts: [
      {
        text: "Victas says all blades in the Koji Matsushita series are hand-made in its Japanese blade workshop.",
        source: kmoEn.url,
      },
    ],
    sources: [kmoJp, kmoEn],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5 wood plies (木材5枚)",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Mahogany",
    thicknessMm: 6.0,
    weightG: { min: 93 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF-",
    madeIn: "Japan",
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const v15xJp = jp(781, "V>15 Extra (V>15 エキストラ)");
const v15xEn = en(9, "V > 15 Extra");
const v15sJp = jp(782, "V>15 Stiff (V>15 スティフ)");
const v15sEn = en(10, "V > 15 Stiff");
const v15lJp = jp(783, "V>15 Limber (V>15 リンバー)");
const v15lEn = en(11, "V > 15 Limber");
const v20Jp = jp(779, "V>20 Double Extra (V>20 ダブルエキストラ)");
const v20En = en(5, "V > 20 Double Extra");
const v22Jp = jp(795, "V>22 Double Extra (V>22 ダブルエキストラ)");
const v22En = en(6, "V > 22 Double Extra");
const v15stJp = jp(764, "V>15 Sticky (V>15 スティッキー)");
const v15stEn = en(175, "V > 15 Sticky");
const vexJp = jp(40, "Ventus Extra (ヴェンタス エキストラ)");
const vexEn = en(12, "VENTUS Extra");
const p1vJp = jp(789, "Curl P1V (カール P1V)");
const p1vEn = en(40, "CURL P1V");
const p3avJp = jp(792, "Curl P3αV (カール P3αV)");
const p3avEn = en(43, "CURL P3aV");
const s1Jp = jp(68, "Spectol S1 (スペクトル S1)");
const s1En = en(37, "SPECTOL S1");
const s3Jp = jp(70, "Spectol S3 (スペクトル S3)");
const s3En = en(35, "SPECTOL S3");
const vo102Jp = jp(799, "VO>102");
const vo102En = en(32, "VO > 102");
const v15ssEn = en(176, "V > 15 Sticky Soft");
const v15xMg = mingles(2442, "VICTAS V>15 Extra (hardness marked ドイツ基準, German standard)");
const v15sMg = mingles(2443, "VICTAS V>15 Stiff (hardness marked ドイツ基準, German standard)");
const v15lMg = mingles(2444, "VICTAS V>15 Limber (hardness marked ドイツ基準, German standard)");
const s1Mg = mingles(4185, "VICTAS Spectol S1 (hardness marked 日本基準, Japanese standard)");
const vj07sMg = mingles(2846, "VICTAS VJ>07 Stiff, Japan-made (hardness marked ドイツ基準, German standard)");

export const rubbers: Rubber[] = [
  {
    id: "victas-v15-extra",
    brandId: "victas",
    name: "V>15 Extra",
    aliases: ["V > 15 Extra"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A German-made high-tension offensive inverted rubber with a 47.5 sponge, the hardest of the original V>15 trio.",
    description: [
      "V>15 Extra is an inverted tensor rubber that Victas describes as High Energy Tension. It is made in Germany, with a 47.5 (±3) sponge in 2.0 mm and MAX, and comes in red, black and blue.",
      "Victas positions it as the power-oriented model of the V>15 series, aimed at aggressive topspin players and topspin-to-topspin rallies.",
    ],
    facts: [],
    notes: [TOLERANCE_NOTE, ESN_NOTE, TENSOR_NOTE, "Victas asks players using the blue sheet to put a black rubber on the other side."],
    sources: [v15xJp, v15xEn, v15xMg, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-v15-stiff",
    brandId: "victas",
    name: "V>15 Stiff",
    aliases: ["V > 15 Stiff"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The medium-hard (45) member of the German-made V>15 tensor series.",
    description: [
      "V>15 Stiff is a German-made inverted tensor rubber with a 45.0 (±3) sponge, sold in 2.0 mm and MAX in red and black.",
      "Victas places it between V>15 Extra and V>15 Limber, describing it as combining the power of Extra with the spin and elasticity of Limber, for players who want to control rallies.",
    ],
    facts: [],
    notes: [TOLERANCE_NOTE, ESN_NOTE, TENSOR_NOTE],
    sources: [v15sJp, v15sEn, v15sMg, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-v15-limber",
    brandId: "victas",
    name: "V>15 Limber",
    aliases: ["V > 15 Limber"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The softest (40) member of the German-made V>15 tensor series, aimed at control.",
    description: [
      "V>15 Limber is a German-made inverted tensor rubber with a 40.0 (±3) sponge, sold in 2.0 mm and MAX in red and black.",
      "Victas describes it as the easiest to use of the V>15 series, balanced in attack and defence and able to perform without much physical power.",
    ],
    facts: [],
    notes: [
      TOLERANCE_NOTE,
      ESN_NOTE,
      TENSOR_NOTE,
      "The European Victas page for V > 15 Limber repeats the V > 15 Stiff product text; the description here follows the Japanese page.",
    ],
    sources: [v15lJp, v15lEn, v15lMg, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-v20-double-extra",
    brandId: "victas",
    name: "V>20 Double Extra",
    aliases: ["V > 20 Double Extra"],
    manufacturerRatings: [
      { label: "Arc height (弧線の高さ)", value: 7.0 },
      { label: "Speed (スピード)", value: 9.1 },
      { label: "Drive accuracy (ドライブの精度)", value: 8.2 },
      { label: "Topsheet strength (シートの強さ)", value: 7.2 },
      { label: "Rebound (反発)", value: 8.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A hard (52.5) German-made tensor rubber with shorter, Chinese-style pips, designed to feel softer than its number.",
    description: [
      "V>20 Double Extra is a German-made inverted tensor rubber with a 52.5 (±3) sponge, sold in 1.8 mm, 2.0 mm and MAX in red and black.",
      "Victas says it pairs European tension technology with a shorter, Chinese-style pip geometry, and that despite the hard sponge it does not feel hard. It describes the rubber as forgiving on impact and reliable in close rallies.",
    ],
    facts: [],
    notes: [
      TOLERANCE_NOTE,
      ESN_NOTE,
      TENSOR_NOTE,
      "Ratings are from the Japanese Victas page; labels are translated with the original Japanese in brackets. Victas does not state the top of the scale.",
    ],
    sources: [v20Jp, v20En, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 52.5, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-v22-double-extra",
    brandId: "victas",
    name: "V>22 Double Extra",
    aliases: ["V > 22 Double Extra"],
    manufacturerRatings: [
      { label: "Arc height (弧線の高さ)", value: 6.7 },
      { label: "Speed (スピード)", value: 9.0 },
      { label: "Drive accuracy (ドライブの精度)", value: 7.3 },
      { label: "Topsheet strength (シートの強さ)", value: 9.0 },
      { label: "Rebound (反発)", value: 8.3 },
    ],
    releaseYear: 2022,
    status: "current",
    summary: "A German-made tensor rubber released in 2022, with a 50 sponge that Victas says contains special air cells.",
    description: [
      "V>22 Double Extra is a German-made inverted tensor rubber with a 50.0 (±3) sponge, sold in 2.0 mm and MAX in red, black and blue.",
      "Victas describes a topsheet that grips the ball strongly as it sinks in, over a sponge with special air bubbles (an open-pore design, per its European site), and says the result is both powerful and stable enough to land deep on the table.",
    ],
    facts: [
      {
        text: "Victas says V>22 Double Extra came out in 2022, seven years after V>15 Extra.",
        source: v22Jp.url,
      },
    ],
    notes: [
      TOLERANCE_NOTE,
      ESN_NOTE,
      TENSOR_NOTE,
      "Ratings are from the Japanese Victas page; labels are translated with the original Japanese in brackets. Victas does not state the top of the scale.",
      "Victas asks players using the blue sheet to put a black rubber on the other side.",
    ],
    sources: [v22Jp, v22En, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-v15-sticky",
    brandId: "victas",
    name: "V>15 Sticky",
    aliases: ["V > 15 Sticky"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A hybrid: a slightly tacky topsheet on a hard (52.5) German-made tension sponge.",
    description: [
      "V>15 Sticky is a German-made hybrid rubber that puts a slightly tacky topsheet on a High Energy Tension sponge of 52.5 (±3). It is sold in 2.0 mm and MAX in red and black.",
      "Victas says the sponge and pip shape differ from the rest of the V>15 series, and that the slightly tacky sheet lets players vary tempo and spin, with longer contact on serves and returns.",
    ],
    facts: [
      {
        text: "Victas calls V>15 Sticky the first slightly tacky model in the V>15 series.",
        source: v15stJp.url,
      },
    ],
    notes: [
      TOLERANCE_NOTE,
      ESN_NOTE,
      "Classified as hybrid because Victas lists the type as 微粘着ハイエナジーテンション (slightly tacky High Energy Tension).",
      "A softer version, V > 15 Sticky Soft (47.5), is sold separately (Victas European site).",
    ],
    sources: [v15stJp, v15stEn, v15ssEn, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: 52.5, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-ventus-extra",
    brandId: "victas",
    name: "Ventus Extra",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The top model of the Ventus tensor series, with a pink 47.5 sponge, made in Germany.",
    description: [
      "Ventus Extra is the top model of Victas's Ventus series: a German-made inverted tensor rubber with a 47.5 (±3) sponge, sold in 1.8 mm, 2.0 mm and MAX.",
      "Victas describes a high-rebound sponge that still grips the ball and a topsheet built to boost spin, and says it handles flat hitting as well as spin strokes. Its European site notes the sponge is pink.",
    ],
    facts: [],
    notes: [
      TOLERANCE_NOTE,
      ESN_NOTE,
      TENSOR_NOTE,
      "Colours: the Japanese site lists red, black, pink and a limited-quantity violet; the European site lists red and black.",
    ],
    sources: [vexJp, vexEn, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: "Pink",
    topsheetColors: ["Red", "Black", "Pink", "Violet"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "victas-curl-p1v",
    brandId: "victas",
    name: "Curl P1V",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made long-pips rubber with the tallest, thinnest pips in the Curl range, for spin-reversing defence.",
    description: [
      "Curl P1V is a long-pips rubber made in Japan, sold without sponge (OX) and with 0.5, 1.0 and 1.5 mm sponge, in red and black. Victas lists the sponge hardness as 55.0 (±3).",
      "Victas presents it as the variation-focused model of the Curl series, with a wide range of spin variation for chopping and close-to-the-table play.",
    ],
    facts: [
      {
        text: "Victas says Curl P1V has the tallest and most slender pips of the Curl series.",
        source: p1vJp.url,
      },
    ],
    notes: [TOLERANCE_NOTE, UNSTATED_NOTE],
    sources: [p1vJp, p1vEn, s1Mg, vj07sMg, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 55, scale: "unstated" },
    spongeThicknesses: ["OX", "0.5", "1.0", "1.5"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "victas-curl-p3av",
    brandId: "victas",
    name: "Curl P3αV",
    aliases: ["Curl P3aV", "Curl P3 Alpha V"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made long-pips rubber, slightly shorter than Curl P1V, aimed at easier control.",
    description: [
      "Curl P3αV is a long-pips rubber made in Japan, sold without sponge (OX) and with 0.5, 1.0 and 1.5 mm sponge, in red and black. Victas lists the sponge hardness as 55.0 (±3).",
      "Victas says its pips are slightly lower than those of Curl P1V, giving similar variation with easier handling both close to and away from the table.",
    ],
    facts: [
      {
        text: "Victas describes the Curl P3αV pips as the most slender in the Curl series, and slightly lower than Curl P1V.",
        source: p3avJp.url,
      },
    ],
    notes: [
      TOLERANCE_NOTE,
      UNSTATED_NOTE,
      "On 2026-10-03 the European Victas page said the rubber was currently out of stock; it remains listed on both Victas sites.",
    ],
    sources: [p3avJp, p3avEn, s1Mg, vj07sMg, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 55, scale: "unstated" },
    spongeThicknesses: ["OX", "0.5", "1.0", "1.5"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "victas-spectol-s1",
    brandId: "victas",
    name: "Spectol S1",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made short-pips rubber that continues TSP's long-running Spectol line.",
    description: [
      "Spectol S1 is a short pips-out rubber made in Japan, with a 35.0 (±3) sponge in 1.3, 1.6, 2.0 mm and MAX, sold in red, black and blue. Victas's Japanese site calls it a speed-type high-elasticity pips-out rubber.",
      "Victas describes it as a standard pips-out rubber with good speed and variation that suits many styles. Its European site says the short pips are slightly tacky, making it easier to lift backspin.",
    ],
    facts: [
      {
        text: "Victas says Spectol S1 carries on TSP's Spectol series, which it credits with producing many world champions.",
        source: s1Jp.url,
      },
    ],
    notes: [TOLERANCE_NOTE, UNSTATED_NOTE],
    sources: [s1Jp, s1En, s1Mg, vj07sMg, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: "slightly-tacky",
    hardness: { min: 35, scale: "unstated" },
    spongeThicknesses: ["1.3", "1.6", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "victas-spectol-s3",
    brandId: "victas",
    name: "Spectol S3",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made short-pips rubber in the Spectol line, with a tension sponge for more rebound.",
    description: [
      "Spectol S3 is a short pips-out rubber made in Japan with a tension sponge of 37.5 (±3), sold in 1.6, 2.0 mm and MAX in red, black and blue.",
      "Victas says it keeps the Spectol S1 topsheet's speed and variation while using tension technology for more rebound, and still produces knuckle balls easily. Its European site adds that the pips are slightly thinner, for more spin variation.",
    ],
    facts: [],
    notes: [TOLERANCE_NOTE, UNSTATED_NOTE],
    sources: [s3Jp, s3En, s1Mg, vj07sMg, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 37.5, scale: "unstated" },
    spongeThicknesses: ["1.6", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "victas-vo102",
    brandId: "victas",
    name: "VO>102",
    aliases: ["VO > 102"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A German-made attacking short-pips rubber with a 37.5 tension sponge and wider, horizontally set pips.",
    description: [
      "VO>102 is a short pips-out rubber made in Germany with a High Energy Tension sponge of 37.5 (±3), sold in 1.8, 2.0 mm and MAX in red, black and blue.",
      "Victas says attack took priority over blocking in its design. The pips are set horizontally for stability, over a softer tension sponge and a speed-oriented topsheet.",
    ],
    facts: [],
    notes: [TOLERANCE_NOTE, ESN_NOTE],
    sources: [vo102Jp, vo102En, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 37.5, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: "Germany",
  },
];
