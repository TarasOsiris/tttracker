import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/**
 * yasakatabletennis.com: Yasaka's international English site, run by Yasaka Co. Ltd together with Wood House i Tranås AB,
 * which operates Yasaka's blade factory in Tranås, Sweden. Blade pages carry a "Made in Sweden" badge.
 */
const se = (slug: string, label: string): Source => ({
  url: `https://yasakatabletennis.com/product/${slug}`,
  label: `Yasaka (yasakatabletennis.com, international site of Yasaka Co. Ltd & Wood House i Tranås AB): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** yasakajp.com: the site of Yasaka Co., Ltd. (株式会社ヤサカ), the Tokyo headquarters. */
const jp = (slug: string, label: string): Source => ({
  url: `https://www.yasakajp.com/items/${slug}/`,
  label: `Yasaka Japan (yasakajp.com, Yasaka Co., Ltd. headquarters): ${label}`,
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

const seHome: Source = {
  url: "https://yasakatabletennis.com/",
  label: "Yasaka (yasakatabletennis.com): company footer (headquarters in Tokyo, blade factory in Tranås, Sweden)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const jpHistory: Source = {
  url: "https://www.yasakajp.com/philosophy/",
  label: "Yasaka Japan: 経営理念と沿革 (philosophy and company history)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const jpMaLin: Source = {
  url: "https://www.yasakajp.com/2025/06/27/thx_malin/",
  label: "Yasaka Japan: 馬琳氏との契約が満了となりました (advisory contract with Ma Lin has ended), 27 June 2025",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const jpRubberList: Source = {
  url: "https://www.yasakajp.com/goods/rub/",
  label: "Yasaka Japan: rubber product list",
  kind: "manufacturer",
  accessed: ACCESSED,
};

export const brand: Brand = {
  id: "yasaka",
  name: "Yasaka",
  country: "Japan",
  website: "https://yasakatabletennis.com",
  ratingNote:
    "Yasaka's international site gives blades a Speed and a Control number and rubbers Speed, Spin and Control numbers without stating the top of the scale; Yasaka Japan rates its rubbers relative to Mark V, which is set to 10.",
  hardnessScale: null,
  logo: { src: "/equipment/brands/yasaka.svg", width: 208, height: 43, sourceUrl: "https://yasakatabletennis.com", credit: "Logo © Yasaka" },
  sources: [seHome, jpHistory, jpRubberList],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const MYTH_RENAME_NOTE =
  "Yasaka Japan announced in June 2025 that its advisory contract with Ma Lin had ended when its term expired, and said it would announce later how Ma Lin-related products would be sold. The Myth blades went on sale in Japan in March 2026. Retailer American Table Tennis says the Myth series \"is officially replacing the Ma Lin blade lineup, carrying forward the same proven construction\", with an upgraded handle design and new cosmetics. Yasaka itself doesn't publish a comparison with the Ma Lin blades, so they aren't treated as identical here.";

const PEN_NOTE =
  "Yasaka's international site lists \"Concave\" (flared), \"Straight\", \"Anatomic\" and \"Pen\" handles; Yasaka Japan lists FLA, STR and the penhold version as Chinese penhold (中国式).";

const CONCAVE_NOTE = "Yasaka's international site calls the flared handle \"Concave\".";

const mythEoSe = se("myth-extra-offensive", "Myth Extra Offensive");
const mythEoJp = jp("myth_eo", "マイスエキストラオフェンシブ (Myth Extra Offensive)");
const mythEoAtt: Source = {
  url: "https://americantabletennis.com/products/yasaka-myth-extra-offensive",
  label: "American Table Tennis: Yasaka Myth Extra Offensive",
  kind: "retailer",
  accessed: ACCESSED,
};

const mythCSe = se("myth-carbon", "Myth Carbon");
const mythCJp = jp("myth_c", "マイスカーボン (Myth Carbon)");
const mythCAtt: Source = {
  url: "https://americantabletennis.com/products/yasaka-myth-carbon",
  label: "American Table Tennis: Yasaka Myth Carbon",
  kind: "retailer",
  accessed: ACCESSED,
};

const mythScSe = se("myth-soft-carbon", "Myth Soft Carbon");
const mythScJp = jp("myth_sc", "マイスソフトカーボン (Myth Soft Carbon)");
const mythScAtt: Source = {
  url: "https://americantabletennis.com/products/yasaka-myth-soft-carbon",
  label: "American Table Tennis: Yasaka Myth Soft Carbon",
  kind: "retailer",
  accessed: ACCESSED,
};

const mythEsSe = se("myth-extra-special", "Myth Extra Special");
const mythEsJp = jp("myth_es", "マイスエキストラスペシャル (Myth Extra Special)");

const swExtraSe = se("sweden-extra", "Sweden Extra");
const swExtraJp = jp("swedenextra", "スウェーデンエキストラ (Sweden Extra)");

const swClassicSe = se("sweden-classic", "Sweden Classic");
const swClassicJp = jp("swedenclassic", "スウェーデンクラシック (Sweden Classic)");

const falckCSe = se("falck-carbon-2", "Falck Carbon");
const falckCJp = jp("falck-carbon", "ファルクカーボン (Falck Carbon)");

const falckW7Jp = jp("falck-w7", "ファルクW7 (Falck W7)");

const eo7Se = se("extra-offensive-7-power", "Extra Offensive 7 Power");

const mc3dSe = se("max-carbon-3d", "Max Carbon 3D");

export const blades: Blade[] = [
  {
    id: "yasaka-myth-extra-offensive",
    brandId: "yasaka",
    name: "Myth Extra Offensive",
    aliases: ["Myth YEO"],
    manufacturerRatings: [
      { label: "Speed", value: 81 },
      { label: "Control", value: 75 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 5-ply all-wood offensive blade with hard walnut outer veneers, from Yasaka's Myth series.",
    description: [
      "The Myth Extra Offensive is a 5-ply all-wood blade made in Sweden. Yasaka pairs hard walnut outer veneers with selected Scandinavian pine veneers and describes the result as fast for an all-wood blade, with a slightly harder feel than other all-wood blades.",
      "Yasaka aims it at technical attackers playing close to mid distance, and notes that because its speed builds linearly it can feel less powerful than carbon blades from mid-distance. Yasaka Japan describes it as balancing attack and defence, from power strokes to small touches over the table.",
      "It belongs to the Myth series, which went on sale after Yasaka Japan's advisory contract with Ma Lin ended; retailer American Table Tennis says the series replaces Yasaka's Ma Lin blade lineup. It is sold with flared, straight, anatomic and Chinese penhold handles.",
    ],
    facts: [
      {
        text: "Yasaka Japan announced in June 2025 that its advisory contract with Ma Lin, the 2008 Olympic singles champion, had ended when its term expired.",
        source: jpMaLin.url,
      },
      {
        text: "Yasaka Japan calls it a classic of 5-ply blades that once reached the top of the world game.",
        source: mythEoJp.url,
      },
    ],
    notes: [
      MYTH_RENAME_NOTE,
      "Thickness and weight follow Yasaka's international site (~5.8 mm, ~85 g). Yasaka Japan lists 6.0 mm and 85 g ±.",
      "Yasaka Japan lists the Myth Extra Offensive's Japanese release as March 2026; no worldwide release year is stated, so none is given.",
      PEN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-myth-extra-offensive.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/myth-extra-offensive", credit: "© Yasaka" },
    sources: [mythEoSe, mythEoJp, jpMaLin, mythEoAtt],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Walnut",
    thicknessMm: 5.8,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN", "CS"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-myth-carbon",
    brandId: "yasaka",
    name: "Myth Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 86 },
      { label: "Control", value: 73 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 5+2 inner-carbon offensive blade from Yasaka's Myth series, with CFNW layers next to the core.",
    description: [
      "The Myth Carbon combines five wood plies with two layers of CFNW (Carbon Fleece Non-Woven) placed close to the core. Yasaka contrasts this with outer-carbon blades and says the inner position keeps a more natural ball contact, with the carbon coming into play mainly on harder strokes.",
      "Yasaka describes moderate flex and a balance of speed and stability suited to loopers and all-round attackers. Yasaka Japan describes it as having high rebound within the Myth series, combining very thin carbon with fairly hard wood for a wide sweet spot, and aims it at close-to-the-table looping.",
      "It is part of the Myth series, which retailer American Table Tennis says replaces Yasaka's Ma Lin blade lineup, and is sold with flared, straight, anatomic and Chinese penhold handles.",
    ],
    facts: [
      {
        text: "Yasaka Japan says the Myth Carbon's inner carbon gives it high rebound within the Myth series, and pairs very thin carbon with fairly hard wood.",
        source: mythCJp.url,
      },
    ],
    notes: [
      MYTH_RENAME_NOTE,
      "Thickness and weight follow Yasaka's international site (~5.5 mm, ~86 g). Yasaka Japan lists 5.7 mm and 85 g ±.",
      "Yasaka Japan lists the Myth Carbon's Japanese release as March 2026; no worldwide release year is stated, so none is given.",
      PEN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-myth-carbon.webp", width: 800, height: 828, sourceUrl: "https://yasakatabletennis.com/product/myth-carbon", credit: "© Yasaka" },
    sources: [mythCSe, mythCJp, jpMaLin, mythCAtt],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2-ply",
    fibers: ["carbon"],
    fiberName: "CFNW (Carbon Fleece Non-Woven)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.5,
    weightG: { min: 86 },
    handles: ["FL", "ST", "AN", "CS"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-myth-soft-carbon",
    brandId: "yasaka",
    name: "Myth Soft Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 85 },
      { label: "Control", value: 73 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 5+2 inner-carbon blade with a softer wood composition, which Yasaka describes as an evolution of the Sweden Extra.",
    description: [
      "The Myth Soft Carbon adds two thin inner layers of CFNW carbon near the core to a soft wood composition. Yasaka presents it as an evolution of the all-wood Sweden Extra, with a larger sweet spot and more stability while keeping much of the all-wood feel.",
      "Yasaka describes it as flexible with good dwell time, suited to spin-oriented loopers and all-round attackers. Yasaka Japan describes a soft feel for a carbon blade, with the emphasis on stability, and says it also suits pimples-out rubbers.",
      "It is part of the Myth series, which retailer American Table Tennis says replaces Yasaka's Ma Lin blade lineup, and is sold with flared, straight, anatomic and Chinese penhold handles.",
    ],
    facts: [
      {
        text: "Yasaka says the Myth Soft Carbon was developed as an evolution of its all-wood Sweden Extra blade.",
        source: mythScSe.url,
      },
    ],
    notes: [
      MYTH_RENAME_NOTE,
      "Weight follows Yasaka's international site (~86 g). Yasaka Japan lists 87 g ±. Both list 5.7 mm.",
      "Yasaka Japan lists the Myth Soft Carbon's Japanese release as March 2026; no worldwide release year is stated, so none is given.",
      PEN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-myth-soft-carbon.webp", width: 800, height: 824, sourceUrl: "https://yasakatabletennis.com/product/myth-soft-carbon", credit: "© Yasaka" },
    sources: [mythScSe, mythScJp, jpMaLin, mythScAtt],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2-ply",
    fibers: ["carbon"],
    fiberName: "CFNW (Carbon Fleece Non-Woven)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.7,
    weightG: { min: 86 },
    handles: ["FL", "ST", "AN", "CS"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-myth-extra-special",
    brandId: "yasaka",
    name: "Myth Extra Special",
    manufacturerRatings: [
      { label: "Speed", value: 89 },
      { label: "Control", value: 69 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 7-ply all-wood offensive blade from Yasaka's Myth series, with thin hard walnut outer veneers.",
    description: [
      "The Myth Extra Special is a 7-ply all-wood blade. Yasaka describes harder inner veneers forming a solid core, a slightly softer middle veneer to damp vibration, and thin, hard walnut outer veneers, the same outer wood as the Myth Extra Offensive.",
      "Yasaka aims it at experienced attackers and says the extra plies raise rebound while keeping balance. Yasaka says it is popular in Asia, particularly in Japan.",
      "It is part of the Myth series, which retailer American Table Tennis says replaces Yasaka's Ma Lin blade lineup, and is sold with flared, straight, anatomic and Chinese penhold handles.",
    ],
    facts: [
      {
        text: "Yasaka Japan says the Myth Extra Special uses the same walnut outer veneer as the Myth Extra Offensive, built up to 7 plies for more rebound.",
        source: mythEsJp.url,
      },
    ],
    notes: [
      MYTH_RENAME_NOTE,
      "Thickness and weight follow Yasaka's international site (~6.2 mm, ~88 g). Yasaka Japan lists 6.3 mm and 92 g ±.",
      "Yasaka Japan lists the Myth Extra Special's Japanese release as March 2026; no worldwide release year is stated, so none is given.",
      PEN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-myth-extra-special.webp", width: 732, height: 720, sourceUrl: "https://yasakatabletennis.com/product/myth-extra-special", credit: "© Yasaka" },
    sources: [mythEsSe, mythEsJp, jpMaLin, mythEoAtt],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Walnut",
    thicknessMm: 6.2,
    weightG: { min: 88 },
    handles: ["FL", "ST", "AN", "CS"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-sweden-extra",
    brandId: "yasaka",
    name: "Sweden Extra",
    manufacturerRatings: [
      { label: "Speed", value: 70 },
      { label: "Control", value: 77 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A classic Swedish-made 5-ply all-wood blade that Yasaka positions between control and attack.",
    description: [
      "The Sweden Extra is a 5-ply all-wood blade from Yasaka's Sweden series. Yasaka describes a medium outer layer, high feedback and a balance of control and offensive capability, built on Nordic wood with a slightly harder surface.",
      "Yasaka suggests it for players moving up to more competitive levels and for mid-distance rallies, with enough speed to attack while keeping control for defensive shots. It is sold with flared, straight, anatomic and Chinese penhold handles.",
    ],
    facts: [
      {
        text: "Yasaka developed the Myth Soft Carbon as a carbon evolution of the Sweden Extra.",
        source: mythScSe.url,
      },
    ],
    notes: [
      "Thickness follows Yasaka's international site (~5.7 mm). Yasaka Japan lists 5.8 mm. Both list about 85 g.",
      PEN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-sweden-extra.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/sweden-extra", credit: "© Yasaka" },
    sources: [swExtraSe, swExtraJp, mythScSe],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.7,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN", "CS"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-sweden-classic",
    brandId: "yasaka",
    name: "Sweden Classic",
    manufacturerRatings: [
      { label: "Speed", value: 67 },
      { label: "Control", value: 78 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A light, soft Swedish-made 5-ply all-wood allround blade aimed at control and learning technique.",
    description: [
      "The Sweden Classic is a 5-ply all-wood blade with a soft outer layer. Yasaka describes it as light and flexible, slower than modern offensive blades, and easy to generate spin with when looping close to the table.",
      "Yasaka positions it for players learning technique and for allround players who value stability, and says it works for chopping and blocking as well as controlled attacking. It is sold with flared, straight, anatomic and Chinese penhold handles.",
    ],
    facts: [],
    notes: [
      "Thickness follows Yasaka's international site (~5.35 mm). Yasaka Japan lists 5.5 mm. Both list about 83 g.",
      PEN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-sweden-classic.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/sweden-classic", credit: "© Yasaka" },
    sources: [swClassicSe, swClassicJp],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.35,
    weightG: { min: 83 },
    handles: ["FL", "ST", "AN", "CS"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-falck-carbon",
    brandId: "yasaka",
    name: "Falck Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 92 },
      { label: "Control", value: 68 },
    ],
    releaseYear: 2025,
    status: "current",
    summary: "A Swedish-made 5+2 inner-carbon offensive blade with limba outer veneers, developed with Mattias Falck.",
    description: [
      "The Falck Carbon combines five wood plies, with limba outer veneers, and two inner carbon layers placed close to the core. Yasaka's international site calls the carbon Japanese Premium Carbon (JPC); Yasaka Japan calls it PA carbon.",
      "Yasaka says the inner carbon enlarges the sweet spot and keeps softer strokes controlled while adding speed on hard hits, and describes a medium-hard, crisp feel. Yasaka Japan says the balance is meant to suit both a pimples-out forehand and an inverted backhand, and a wide range of rubbers.",
      "It is sold with flared and straight handles.",
    ],
    facts: [
      {
        text: "Yasaka Japan says the Falck Carbon was co-developed with Mattias Falck, whom it describes as a world champion in doubles and world No. 2 in singles.",
        source: falckCJp.url,
      },
    ],
    notes: [
      "Thickness follows Yasaka's international site (~5.7 mm). Yasaka Japan lists 5.9 mm. Both list about 87 g.",
      "The fibre name differs by region: \"Japanese Premium Carbon (JPC)\" on Yasaka's international site, \"PAカーボン\" (PA carbon) on Yasaka Japan.",
      "Release year from Yasaka Japan, which lists a spring 2025 release.",
      "Handles: Yasaka Japan lists STR and FLA; Yasaka's international site lists \"Straight\" and \"Concave\" (flared).",
    ],
    photo: { src: "/equipment/photos/blades/yasaka-falck-carbon.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/falck-carbon-2", credit: "© Yasaka" },
    sources: [falckCSe, falckCJp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2-ply",
    fibers: ["carbon"],
    fiberName: "Japanese Premium Carbon (JPC)",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: 5.7,
    weightG: { min: 87 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-falck-w7",
    brandId: "yasaka",
    name: "Falck W7",
    manufacturerRatings: [],
    releaseYear: 2025,
    status: "current",
    summary: "A Swedish-made 7-ply all-wood offensive blade from Yasaka's Falck series.",
    description: [
      "The Falck W7 is a 7-ply all-wood blade in the Falck series. Yasaka Japan says a slightly thick core raises rebound, while slightly hard dyed veneers give a wide sweet spot and control.",
      "Yasaka Japan classes its speed as mid-fast and its feel as medium. It is sold with flared and straight handles.",
    ],
    facts: [],
    notes: [
      "Specs come from Yasaka Japan; the blade has no product page on Yasaka's international site, so no numeric Speed/Control ratings are given.",
      "Release year from Yasaka Japan, which lists a spring 2025 release.",
    ],
    photo: { src: "/equipment/photos/blades/yasaka-falck-w7.webp", width: 600, height: 600, sourceUrl: "https://www.yasakajp.com/items/falck-w7/", credit: "© Yasaka" },
    sources: [falckW7Jp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "木材7枚合板 (7-ply wood)",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.4,
    weightG: { min: 85 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-extra-offensive-7-power",
    brandId: "yasaka",
    name: "Extra Offensive 7 Power",
    aliases: ["YEO 7 Power"],
    manufacturerRatings: [
      { label: "Speed", value: 88 },
      { label: "Control", value: 70 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 5+2 inner-carbon offensive blade with a hard walnut outer veneer and medium flex.",
    description: [
      "The Extra Offensive 7 Power combines five wood plies with two inner carbon layers under a hard walnut outer veneer. Yasaka says the inner carbon adds stability and a larger sweet spot, while the walnut surface adds speed.",
      "Yasaka describes medium flex and medium feedback, and aims it at attackers who loop and counter from close to the table or mid distance. It is sold with flared, straight and anatomic handles.",
    ],
    facts: [],
    notes: [
      "Yasaka's international site also lists a \"Pen\" version but doesn't say whether it is Chinese or Japanese penhold, so it isn't listed as a handle here.",
      "Yasaka doesn't name the carbon material, so the fibre name is given generically as carbon.",
      CONCAVE_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-extra-offensive-7-power.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/extra-offensive-7-power", credit: "© Yasaka" },
    sources: [eo7Se],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2-ply",
    fibers: ["carbon"],
    fiberName: "carbon",
    fiberPosition: "inner",
    outerWood: "Walnut",
    thicknessMm: 5.6,
    weightG: { min: 86 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
  {
    id: "yasaka-max-carbon-3d",
    brandId: "yasaka",
    name: "Max Carbon 3D",
    manufacturerRatings: [
      { label: "Speed", value: 93 },
      { label: "Control", value: 67 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 9-ply (7 wood + 2 carbon) offensive blade with grooves carved into the handle.",
    description: [
      "The Max Carbon 3D is built from seven wood plies and two carbon plies, about 6.3 mm thick. Yasaka describes it as stiff and fast, with a large sweet spot for looping, blocking and counter-attacking.",
      "Its \"3D-technology\" consists of grooves carved into the handle, which Yasaka says add flexibility and a more responsive feel. It is sold with flared, straight and anatomic handles.",
    ],
    facts: [
      {
        text: "The \"3D\" in the name refers to grooves carved into the handle, which Yasaka says increase the blade's flexibility.",
        source: mc3dSe.url,
      },
    ],
    notes: [
      "Yasaka's international site also lists a \"Pen\" version but doesn't say whether it is Chinese or Japanese penhold, so it isn't listed as a handle here.",
      "Yasaka doesn't say where the carbon plies sit or name the carbon material.",
      CONCAVE_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yasaka-max-carbon-3d.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/max-carbon-3d", credit: "© Yasaka" },
    sources: [mc3dSe],
    lastVerified: ACCESSED,
    plies: 9,
    layup: "7+2-ply",
    fibers: ["carbon"],
    fiberName: "carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.3,
    weightG: { min: 91 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: null,
    madeIn: "Sweden",
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const JP_SCALE_NOTE = "Yasaka Japan's Speed/Spin/Control values are relative to Mark V, which Yasaka sets to 10.";

const markVSe = se("mark-v-3", "Mark V");
const markVJp = jp("markv", "マーク V (Mark V)");
const hpsSe = se("mark-v-hps", "Mark V HPS");
const hpsJp = jp("markv_hps", "マーク V HPS (Mark V HPS)");
const r7Se = se("rakza-7", "Rakza 7");
const r7Jp = jp("rakza_7", "ラクザ 7 (Rakza 7)");
const r7sSe = se("rakza-7-soft", "Rakza 7 Soft");
const r7sJp = jp("rakza_7_soft", "ラクザ 7 ソフト (Rakza 7 Soft)");
const r7hSe = se("rakza-7-hard", "Rakza 7 Hard");
const r7hJp = jp("rakza7hard", "ラクザ7ハード (Rakza 7 Hard)");
const r9Se = se("rakza-9", "Rakza 9");
const r9Jp = jp("rakza_9", "ラクザ 9 (Rakza 9)");
const rxSe = se("rakza-x", "Rakza X");
const rxJp = jp("rakza-x", "ラクザX (Rakza X)");
const rzSe = se("rakza-z", "Rakza Z");
const rzJp = jp("rakza-z", "ラクザZ (Rakza Z)");
const rzehSe = se("rakza-z-extra-hard-2", "Rakza Z Extra Hard");
const rzehJp = jp("rakza-z-extra-hard", "ラクザZ エクストラハード (Rakza Z Extra Hard)");
const riganSe = se("rigan-2", "Rigan");
const riganJp = jp("%e3%83%a9%e3%82%a4%e3%82%ac%e3%83%b3", "ライガン (Rigan)");
const ph11Se = se("phantom-14", "Phantom 0011");
const ph11Jp = jp("phantom_0011_mugen", "ファントム 0011 (Phantom 0011)");

/** Colour and thickness options from the variant list on yasakatabletennis.com. */
const RED_BLACK = ["Red", "Black"];

export const rubbers: Rubber[] = [
  {
    id: "yasaka-mark-v",
    brandId: "yasaka",
    name: "Mark V",
    manufacturerRatings: [
      { label: "Speed", value: 80 },
      { label: "Spin", value: 60 },
      { label: "Control", value: 70 },
    ],
    releaseYear: 1969,
    status: "current",
    summary: "Yasaka's long-running classic inverted rubber with a natural-rubber topsheet and medium-hard sponge, launched in 1969 and made in Japan.",
    description: [
      "Mark V is a classic high-elasticity, high-friction inverted rubber with a topsheet based on natural rubber and a medium-hard sponge. Yasaka lists it as plain \"Inverted\" rather than tensor, with a medium arc.",
      "Yasaka describes it as a balance of speed, spin and control and now pitches it mainly at developing players. It is the reference point for Yasaka Japan's rubber ratings, which score every other rubber relative to Mark V's 10.",
      "It is sold in red and black in 1.0, 1.5, 1.8, 2.0 mm and max sponge.",
    ],
    facts: [
      {
        text: "Yasaka Japan's company history dates the launch of Mark V to 1969, and says it has been sold worldwide for more than 50 years.",
        source: jpHistory.url,
      },
      {
        text: "Yasaka Japan rates all of its rubbers relative to Mark V, which is set to 10 for speed, spin and control.",
        source: markVJp.url,
      },
    ],
    notes: [
      "Classed as classic (non-tensor): Yasaka's international site lists its surface as \"Inverted\" (tensor rubbers such as Rakza 7 are listed as \"Inverted Tensor\") and says newer rubbers with advanced technologies have since emerged; Yasaka Japan classes it as 高弾性硬摩擦 (high-elasticity, high-friction) inverted, separate from its tension-sponge \"Hybrid Energy\" type.",
      "Hardness from Yasaka Japan (40-45°); Yasaka's international site gives ~42.5. Mark V is made in Japan and Yasaka doesn't state which degree scale it uses, so the scale is marked unstated.",
      "Yasaka Japan rates it Speed 10, Spin 10, Control 10. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-mark-v.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/mark-v-3", credit: "© Yasaka" },
    sources: [markVSe, markVJp, jpHistory, LARC],
    lastVerified: ACCESSED,
    type: "classic",
    tackiness: null,
    hardness: { min: 40, max: 45, scale: "unstated" },
    spongeThicknesses: ["1.0", "1.5", "1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "yasaka-mark-v-hps",
    brandId: "yasaka",
    name: "Mark V HPS",
    manufacturerRatings: [
      { label: "Speed", value: 94 },
      { label: "Spin", value: 60 },
      { label: "Control", value: 70 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Mark V topsheet on a newer, more dynamic HPS sponge, made in Japan.",
    description: [
      "Mark V HPS keeps the Mark V topsheet and pairs it with a newer sponge formula that Yasaka says adds speed while keeping Mark V's feel and ease of use. Yasaka lists it as plain \"Inverted\" rather than tensor.",
      "Yasaka aims it at controlled attacking play close to the table, with a medium arc. It is sold in red and black in 2.0 mm and max sponge.",
    ],
    facts: [],
    notes: [
      "Classed as classic (non-tensor): Yasaka's international site lists its surface as \"Inverted\" (tensor rubbers such as Rakza 7 are listed as \"Inverted Tensor\") and says newer rubbers with advanced technologies have since emerged; Yasaka Japan classes it as 高弾性硬摩擦 (high-elasticity, high-friction) inverted, separate from its tension-sponge \"Hybrid Energy\" type.",
      "Yasaka spells out HPS differently by region: \"High Performance Sponge\" on its international site, \"Hybrid Power Sponge\" (ハイブリッドパワースポンジ) on Yasaka Japan.",
      "Hardness from Yasaka Japan (40-45°); Yasaka's international site gives ~42.5. It is made in Japan and Yasaka doesn't state which degree scale it uses, so the scale is marked unstated.",
      "Sponge thicknesses follow Yasaka's international site (2.0 mm, max). Yasaka Japan lists 特厚, 厚 and 中厚 (extra thick, thick, medium thick).",
      "Yasaka Japan rates it Speed 12, Spin 10, Control 10. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-mark-v-hps.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/mark-v-hps", credit: "© Yasaka" },
    sources: [hpsSe, hpsJp, LARC],
    lastVerified: ACCESSED,
    type: "classic",
    tackiness: null,
    hardness: { min: 40, max: 45, scale: "unstated" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "yasaka-rakza-7",
    brandId: "yasaka",
    name: "Rakza 7",
    manufacturerRatings: [
      { label: "Speed", value: 87 },
      { label: "Spin", value: 88 },
      { label: "Control", value: 63 },
    ],
    releaseYear: 2010,
    status: "current",
    summary: "Yasaka's German-made all-round attacking tensor rubber with a grippy natural-rubber topsheet and a medium-hard sponge.",
    description: [
      "Rakza 7 pairs a high-friction topsheet with a high natural-rubber content and a medium-hard tensor sponge. Yasaka calls the concept Hybrid Energy and describes a medium arc and a balance of spin, speed and control.",
      "Yasaka presents it as one of the most accessible rubbers in the Rakza series, suited to both forehand and backhand, and as a step up for players moving from allround to offensive rubbers. Yasaka Japan says it has won several national titles.",
      "It is sold in red and black in 1.8, 2.0 mm and max sponge. Softer and harder versions are sold separately as Rakza 7 Soft and Rakza 7 Hard.",
    ],
    facts: [
      {
        text: "Yasaka Japan's company history lists 2010 as the year it launched Rakza 7, a \"Hybrid Energy\" rubber.",
        source: jpHistory.url,
      },
    ],
    notes: [
      "Classed as tensor: Yasaka's international site lists its surface as \"Inverted Tensor\", and Yasaka Japan classes it as a \"Hybrid Energy\" (ハイブリッドエナジー型) rubber, a grippy topsheet on a tension sponge.",
      "Hardness from Yasaka Japan (45-50°, made in Germany). Yasaka's international site gives ~45°, the bottom of that range.",
      "Yasaka Japan rates it Speed 11, Spin 14, Control 9. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-7.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-7", credit: "© Yasaka" },
    sources: [r7Se, r7Jp, jpHistory, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, max: 50, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rakza-7-soft",
    brandId: "yasaka",
    name: "Rakza 7 Soft",
    manufacturerRatings: [
      { label: "Speed", value: 84 },
      { label: "Spin", value: 88 },
      { label: "Control", value: 67 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Rakza 7 topsheet on a softer, lighter sponge, with a higher arc and more dwell time.",
    description: [
      "Rakza 7 Soft uses the Rakza 7 topsheet on a softer tensor sponge. Yasaka says the softer sponge increases dwell time, gives a higher arc than Rakza 7 and makes it easier to spin the ball without hitting hard.",
      "Yasaka Japan adds that it is lighter than Rakza 7 and easier to handle. It is sold in red and black in 1.8, 2.0 mm and max sponge.",
    ],
    facts: [],
    notes: [
      "Classed as tensor: Yasaka's international site lists its surface as \"Inverted Tensor\", and Yasaka Japan classes it as a \"Hybrid Energy\" (ハイブリッドエナジー型) rubber, a grippy topsheet on a tension sponge.",
      "Hardness from Yasaka Japan (37-42°, made in Germany). Yasaka's international site gives ~40°.",
      "Yasaka Japan rates it Speed 11-, Spin 14+, Control 9+. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-7-soft.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-7-soft", credit: "© Yasaka" },
    sources: [r7sSe, r7sJp, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 37, max: 42, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rakza-7-hard",
    brandId: "yasaka",
    name: "Rakza 7 Hard",
    manufacturerRatings: [
      { label: "Speed", value: 89 },
      { label: "Spin", value: 87 },
      { label: "Control", value: 60 },
    ],
    releaseYear: 2026,
    status: "current",
    summary: "The Rakza 7 topsheet on a harder sponge, added to the range in 2026 for more power on hard strokes.",
    description: [
      "Rakza 7 Hard combines the Rakza 7 topsheet with a stiffer tensor sponge. Yasaka says the harder sponge transfers more energy on strong impacts while keeping as much as possible of Rakza 7's ease of use and spin.",
      "Yasaka calls it the most direct rubber in the Rakza 7 family and aims it at powerful loops and counter-attacks. It is sold in red and black in 2.0 mm and max sponge.",
    ],
    facts: [],
    notes: [
      "Classed as tensor: Yasaka's international site lists its surface as \"Inverted Tensor\", and Yasaka Japan classes it as a \"Hybrid Energy\" (ハイブリッドエナジー型) rubber, a grippy topsheet on a tension sponge.",
      "Hardness from Yasaka Japan (47-52°, made in Germany). Yasaka's international site gives ~50°.",
      "Release year from Yasaka Japan, which lists a March 2026 release.",
      "Not on the ITTF LARC of 1 January 2026 under this name, so ITTF approval is left blank.",
      "Yasaka Japan rates it Speed 11+, Spin 14-, Control 9-. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-7-hard.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-7-hard", credit: "© Yasaka" },
    sources: [r7hSe, r7hJp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47, max: 52, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: null,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rakza-9",
    brandId: "yasaka",
    name: "Rakza 9",
    manufacturerRatings: [
      { label: "Speed", value: 91 },
      { label: "Spin", value: 85 },
      { label: "Control", value: 60 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A faster, lower-arc tuning of Rakza 7 for direct, speed-oriented attacking.",
    description: [
      "Rakza 9 is based on Rakza 7 and uses the same Hybrid Energy concept of a high-friction natural-rubber topsheet on a tensor sponge. Yasaka says it was tuned for faster release and more rebound while keeping as much spin as possible.",
      "Yasaka describes a lower, more direct arc than Rakza 7 and a crisp feel, aimed at fast loops, counters and smashes. It is sold in red and black in 2.0 mm and max sponge.",
    ],
    facts: [
      {
        text: "Yasaka Japan says Rakza 9 was developed by adjusting Rakza 7 for a faster release and higher rebound.",
        source: r9Jp.url,
      },
    ],
    notes: [
      "Classed as tensor: Yasaka's international site lists its surface as \"Inverted Tensor\", and Yasaka Japan classes it as a \"Hybrid Energy\" (ハイブリッドエナジー型) rubber, a grippy topsheet on a tension sponge.",
      "Hardness from Yasaka Japan (40-45°, made in Germany). Yasaka's international site gives ~42.5°.",
      "Yasaka Japan rates it Speed 11+, Spin 13+, Control 8+. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-9.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-9", credit: "© Yasaka" },
    sources: [r9Se, r9Jp, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, max: 45, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rakza-x",
    brandId: "yasaka",
    name: "Rakza X",
    manufacturerRatings: [
      { label: "Speed", value: 87 },
      { label: "Spin", value: 85 },
      { label: "Control", value: 70 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A German-made tensor rubber with Yasaka's NSS grip topsheet and a harder \"Power Sponge\".",
    description: [
      "Rakza X combines a natural-rubber topsheet with Yasaka's NSS surface and a harder tensor sponge that Yasaka calls the Power Sponge. Yasaka says the NSS surface grips the ball for longer, helping spin and stability against incoming spin.",
      "Yasaka describes a medium arc, a fast and direct energy transfer and good short-game control. Yasaka Japan says it has won several national titles. It is sold in red and black in 1.8, 2.0 mm and max sponge.",
    ],
    facts: [],
    notes: [
      "Classed as tensor: Yasaka's international site lists its surface as \"Inverted Tensor\", and Yasaka Japan classes it as a \"Hybrid Energy\" (ハイブリッドエナジー型) rubber, a grippy topsheet on a tension sponge.",
      "Yasaka spells out NSS differently by region: \"New Surface System\" on its international site, \"Non Slip Sheet\" on Yasaka Japan.",
      "Hardness from Yasaka Japan (45-50°, made in Germany). Yasaka's international site gives ~47.5°.",
      "Yasaka Japan rates it Speed 11, Spin 13+, Control 10. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-x.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-x", credit: "© Yasaka" },
    sources: [rxSe, rxJp, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, max: 50, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rakza-z",
    brandId: "yasaka",
    name: "Rakza Z",
    manufacturerRatings: [
      { label: "Speed", value: 84 },
      { label: "Spin", value: 92 },
      { label: "Control", value: 63 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A hybrid rubber that puts a tacky topsheet on a hard \"Power Sponge\", made in Germany.",
    description: [
      "Rakza Z pairs a newly developed tacky topsheet with a hard Power Sponge. Yasaka says the tacky surface holds the ball for heavy spin and a high arc, while the harder sponge gives more rebound than conventional tacky rubbers.",
      "Yasaka aims it at physical attackers playing close to the table and from mid distance, and highlights serves and returns. It is sold in red and black in 2.0 mm and max sponge.",
    ],
    facts: [
      {
        text: "Yasaka Japan says Rakza Z was the first rubber in the Rakza series to use a tacky topsheet.",
        source: rzJp.url,
      },
    ],
    notes: [
      "Classed as hybrid: Yasaka describes a tacky (粘着性) topsheet on a hard \"Power Sponge\", and Yasaka Japan classes it as a \"Hybrid Energy\" (tension-sponge) rubber.",
      "Hardness from Yasaka Japan (47-52°, made in Germany). Yasaka's international site gives 50.",
      "Yasaka Japan rates it Speed 11-, Spin 14+, Control 9. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-z.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-z", credit: "© Yasaka" },
    sources: [rzSe, rzJp, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 47, max: 52, scale: "esn" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rakza-z-extra-hard",
    brandId: "yasaka",
    name: "Rakza Z Extra Hard",
    manufacturerRatings: [
      { label: "Speed", value: 84 },
      { label: "Spin", value: 92 },
      { label: "Control", value: 63 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Rakza Z tacky topsheet on an even harder sponge, the hardest rubber in the Rakza series.",
    description: [
      "Rakza Z Extra Hard uses the tacky Rakza Z topsheet on a harder sponge. Yasaka calls it the hardest rubber in the Rakza series and says it transfers energy without loss on strong impacts.",
      "Yasaka says it has a lower catapult effect than Rakza Z, which makes fast shots easier to control, and aims it at hard-hitting players. It is sold in red and black in max sponge only.",
    ],
    facts: [],
    notes: [
      "Classed as hybrid: Yasaka describes a tacky (粘着性) topsheet on a hard sponge, and Yasaka Japan classes it as a \"Hybrid Energy\" (tension-sponge) rubber.",
      "Hardness from Yasaka Japan (52-57°, made in Germany). Yasaka's international site gives ~55°.",
      "The ITTF LARC lists Rakza Z but not Rakza Z Extra Hard by name, so ITTF approval is left blank.",
      "Yasaka Japan rates it Speed 11-, Spin 14+, Control 9. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rakza-z-extra-hard.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rakza-z-extra-hard-2", credit: "© Yasaka" },
    sources: [rzehSe, rzehJp],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 52, max: 57, scale: "esn" },
    spongeThicknesses: ["MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: null,
    madeIn: "Germany",
  },
  {
    id: "yasaka-rigan",
    brandId: "yasaka",
    name: "Rigan",
    manufacturerRatings: [
      { label: "Speed", value: 84 },
      { label: "Spin", value: 78 },
      { label: "Control", value: 77 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A softer, easy-to-handle German-made tensor rubber with a grippy topsheet, aimed at control.",
    description: [
      "Rigan uses Yasaka's Hybrid Energy concept, a grippy topsheet on a tension sponge, but with a softer topsheet and sponge to make it easier to handle. Yasaka describes good ball control, a medium arc and high durability.",
      "Yasaka positions it for a wide range of playing styles that value consistency over maximum speed. It is sold in red and black in 1.8, 2.0 mm and max sponge.",
    ],
    facts: [],
    notes: [
      "Classed as tensor: Yasaka's international site lists its surface as \"Inverted Tensor\", and Yasaka Japan classes it as a \"Hybrid Energy\" (ハイブリッドエナジー型) rubber, a grippy topsheet on a tension sponge.",
      "Hardness from Yasaka Japan (40-45°, made in Germany). Yasaka's international site gives ~42.5°.",
      "Yasaka Japan rates it Speed 10+, Spin 12+, Control 11. " + JP_SCALE_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-rigan.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/rigan-2", credit: "© Yasaka" },
    sources: [riganSe, riganJp, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, max: 45, scale: "esn" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "yasaka-phantom-0011",
    brandId: "yasaka",
    name: "Phantom 0011",
    manufacturerRatings: [
      { label: "Speed", value: 56 },
      { label: "Spin", value: 18 },
      { label: "Control", value: 77 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made long-pimples rubber with 1.7 mm pimples on a thin sponge, aimed at spin reversal and disruption.",
    description: [
      "Phantom 0011 is a long-pimples rubber with soft, 1.7 mm high pimples on a thin sponge. Yasaka describes it as built to reverse spin and alter ball trajectories, with a low arc.",
      "Yasaka says the 1.0 mm sponge adds speed and stability, leaving room for occasional attacks alongside defensive play. It is sold in red and black with a 1.0 mm sponge on Yasaka's international site.",
    ],
    facts: [],
    notes: [
      "Hardness from Yasaka Japan (40-45°); Yasaka's international site gives ~42.5°. It is made in Japan and Yasaka doesn't state which degree scale it uses, so the scale is marked unstated.",
      "Yasaka Japan lists the sponge thickness as 極薄 (very thin); Yasaka's international site sells it as 1.0 mm.",
      "Yasaka Japan rates it Speed 6+, Spin 4, Control 11. " + JP_SCALE_NOTE,
      "The ITTF LARC lists it as \"Phantom0011~\".",
    ],
    photo: { src: "/equipment/photos/rubbers/yasaka-phantom-0011.webp", width: 800, height: 800, sourceUrl: "https://yasakatabletennis.com/product/phantom-14", credit: "© Yasaka" },
    sources: [ph11Se, ph11Jp, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 40, max: 45, scale: "unstated" },
    spongeThicknesses: ["1.0"],
    spongeColor: null,
    topsheetColors: RED_BLACK,
    pips: { heightMm: 1.7 },
    ittfApproved: true,
    madeIn: "Japan",
  },
];
