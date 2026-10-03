import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** DHS Sports USA, the official U.S. representative of Shanghai Double Happiness (DHS). */
const dhsUsa = (handle: string, label: string): Source => ({
  url: `https://dhssportsusa.com/products/${handle}`,
  label: `DHS Sports USA (official U.S. partner): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const megaspin = (pid: string, label: string): Source => ({
  url: `https://www.megaspin.net/store/default.asp?pid=${pid}`,
  label: `Megaspin: ${label}`,
  kind: "retailer",
  accessed: ACCESSED,
});

/** ITTF List of Authorized Racket Coverings valid from 1 January 2026 (copy published by the Hessian TT association). */
const LARC: Source = {
  url: "https://www.httv.de/media/000/Schiedsrichter/Material_SR-Einsatz/Zulassungslisten/LARC/ITTF/2026/Equipment_RacketCovering_1January2026_1118.pdf",
  label: "ITTF LARC (List of Authorized Racket Coverings), 1 January 2026",
  kind: "ittf",
  accessed: ACCESSED,
};

export const brand: Brand = {
  id: "dhs",
  name: "DHS",
  country: "China",
  website: "https://dhssportsusa.com",
  ratingNote:
    "DHS Sports USA lists each blade with a Skill Level tier (PRO, PLAYER or STAR PLAYER) and a Blade Type such as \"Offensive Max\" rather than numeric speed or control ratings.",
  hardnessScale: "chinese",
  logo: { src: "/equipment/brands/dhs.webp", width: 600, height: 232, sourceUrl: "https://dhssportsusa.com", credit: "Logo © DHS" },
  sources: [
    {
      url: "https://dhssportsusa.com/pages/about-us",
      label: "DHS Sports USA: About Us (official U.S. representative of DHS Sports; Shanghai Double Happiness Co., Ltd., founded 1959)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const hl5Usa = dhsUsa("dhs-hurricane-long-5-table-tennis-blade", "Hurricane Long 5");
const hl5Mega = megaspin("dhs-hurricane-long-5", "DHS Hurricane Long 5");
const hl5CsMega = megaspin("dhs-hurricane-long-5-cs", "DHS Hurricane Long 5 (Chinese penhold)");

const hl5xUsa = dhsUsa("dhs-hurricane-long-5x-table-tennis-blade", "Hurricane Long 5X");
const hl5xMega = megaspin("dhs-hur-long-5x", "DHS Hurricane Long 5X");
const hl5xCsMega = megaspin("dhs-hur-long-5x-cs", "DHS Hurricane Long 5X (Chinese penhold)");

const hl5hUsa = dhsUsa("dhs-hurricane-long-5h-table-tennis-blade-shakehand", "Hurricane Long 5H");
const hl5hMega = megaspin("dhs-hur-long-5h", "DHS Hurricane Long 5H");

const w968Usa = dhsUsa("dhs-hurricane-long-5-w968-table-tennis-blade", "W968 Hurricane Long 5");
const w968Mega = megaspin("dhs-hur-long-5-nat", "DHS Hurricane Long 5 National (W968)");

const hl3Usa = dhsUsa("dhs-hurricane-long-3-table-tennis-balde", "Hurricane Long 3");
const hl3Mega = megaspin("dhs-hurricane-long-3", "DHS Hurricane Long 3");

const h301Usa = dhsUsa("dhs-hurricane-301-table-tennis-blade", "Hurricane 301");
const h301Mega = megaspin("dhs-hurricane-301", "DHS Hurricane 301");
const h301CsMega = megaspin("dhs-hurricane-301-cs", "DHS Hurricane 301 (penhold)");

const h301tUsa = dhsUsa("dhs-hurricane-301t-table-tennis-blade", "Hurricane 301T");
const h301tMega = megaspin("dhs-hurricane-301t", "DHS Hurricane 301T");
const h301tCsMega = megaspin("dhs-hurricane-301t-cs", "DHS Hurricane 301T (penhold)");

const kingUsa = dhsUsa("dhs-hurricane-king-table-tennis-blade", "Hurricane King");
const kingMega = megaspin("dhs-hurricane-king-wc", "DHS Hurricane King (Wang Chuqin)");

const sunUsa = dhsUsa("dhs-hurricane-sun-table-tennis-blade", "Hurricane Sun");
const sunMega = megaspin("dhs-hurricane-sun", "DHS Hurricane Sun");

const hao3Usa = dhsUsa("dhs-national-hao-3-table-tennis-blade", "Hurricane Hao 3");
const hao3Mega = megaspin("dhs-hurricane-hao-3", "DHS Hurricane Hao 3");
const hao3CsMega = megaspin("dhs-hurricane-hao-3-cs", "DHS Hurricane Hao 3 (penhold)");

const b2xUsa = dhsUsa("dhs-bo-fang-x-carbon-table-tennis-blades", "Fang Bo 2X Carbon");
const b2xMega = megaspin("dhs-fang-bo-b2-x", "DHS Fang Bo B2 X");
const b2xCsMega = megaspin("dhs-fang-bo-b2-x-cs", "DHS Fang Bo B2 X (penhold)");

const pg7Mega = megaspin("dhs-power-g7", "DHS Power G7");
const pg7CsMega = megaspin("dhs-power-g7-cs", "DHS Power G7 (penhold)");
const pg7Paddle: Source = {
  url: "https://www.paddlepalace.com/DHS-Power-G7/productinfo/SCPG7/",
  label: "Paddle Palace: DHS Power G7",
  kind: "retailer",
  accessed: ACCESSED,
};
const pg7Tt11: Source = {
  url: "https://dhs-tt.com/dhs_en/dhs-power-g7-off",
  label: "dhs-tt.com (Tabletennis11 DHS storefront): DHS Power G7",
  kind: "retailer",
  accessed: ACCESSED,
};

export const blades: Blade[] = [
  {
    id: "dhs-hurricane-long-5",
    brandId: "dhs",
    name: "Hurricane Long 5",
    aliases: ["HL5"],
    manufacturerRatings: [{ label: "Skill Level", value: "PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply wood plus 2-ply inner arylate-carbon offensive blade from DHS's Hurricane Long series, built around Ma Long's playing style.",
    description: [
      "The Hurricane Long 5 combines five wood plies with two plies of yellow-black arylate-carbon placed on both sides of the core, a construction DHS calls Pith-Film technology. DHS lists it as a PLAYER-level blade of the \"Offensive Max\" type.",
      "DHS describes the inner-fibre layup as giving a delicate feel and low rebound on soft touches for the short game, while the reinforced core supplies power and speed on full strokes.",
      "DHS states a thickness of 5.9 mm and a shakehand weight of about 89 g. A W968 version in DHS's 968 series is sold as a separate product.",
    ],
    facts: [
      {
        text: "DHS says each Hurricane Long model number reflects a stage of Ma Long's technical development, and that the Long 5, the fourth blade in the series, was tailored to him in 2013.",
        source: hl5Usa.url,
      },
    ],
    notes: [
      "DHS Sports USA lists the thickness as 5.9 mm ±0.1 and the weight as 89 g ±3, and notes that data vary between blades.",
      "DHS Sports USA sells the shakehand version; the Chinese-penhold version is listed by Megaspin.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-long-5.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-long-5-table-tennis-blade", credit: "© DHS" },
    sources: [hl5Usa, hl5Mega, hl5CsMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "arylate-carbon (yellow-black)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-hurricane-long-5x",
    brandId: "dhs",
    name: "Hurricane Long 5X",
    aliases: ["HL5X"],
    manufacturerRatings: [{ label: "Skill Level", value: "PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "A thicker-core version of the Hurricane Long 5, a 5+2 arylate-carbon offensive blade measuring about 6.0 mm.",
    description: [
      "The Hurricane Long 5X keeps the 5 wood + 2 arylate-carbon structure of the Hurricane Long series but uses what DHS calls Thicker Pith technology: the core is 0.5 mm thicker and the plies on either side of it are 0.2 mm thinner, taking the blade from 5.9 mm to about 6.0 mm.",
      "DHS says the stiffer core bends less on impact for a faster rebound, and that the thinner force plies lower the power threshold so strong acceleration is available with medium effort. It is listed as a PLAYER-level \"Offensive Max\" blade.",
    ],
    facts: [
      {
        text: "DHS says the 5X core is 0.5 mm thicker than the Long 5's while the force plies on both sides are 0.2 mm thinner.",
        source: hl5xUsa.url,
      },
    ],
    notes: [
      "DHS Sports USA lists the thickness as 6.0 mm ±0.1, shakehand weight 89 g ±3 and penhold weight 87 g ±3.",
      "DHS does not state on this page where the carbon plies sit, so the fibre position is left blank.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-long-5x.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-long-5x-table-tennis-blade", credit: "© DHS" },
    sources: [hl5xUsa, hl5xMega, hl5xCsMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "arylate-carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 89 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-hurricane-long-5h",
    brandId: "dhs",
    name: "Hurricane Long 5H",
    aliases: ["HL5H"],
    manufacturerRatings: [{ label: "Skill Level", value: "PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "A Hurricane Long series offensive blade with a 5+2H inner construction using what DHS calls ultra-dense fibre.",
    description: [
      "The Hurricane Long 5H uses what DHS calls a newly developed ultra-dense fibre, placed close to the core in a 5+2H inner-fibre construction, together with a thickened straight-grained core.",
      "DHS says this raises rigidity and energy transfer for loops and drives while keeping the short game stable. It is listed as a PLAYER-level \"Offensive Max\" blade, 5.9 mm thick and about 89 g.",
    ],
    facts: [],
    notes: ["DHS Sports USA lists the thickness as 5.9 mm ±0.1 and the shakehand weight as 89 g ±3."],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-long-5h.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-long-5h-table-tennis-blade-shakehand", credit: "© DHS" },
    sources: [hl5hUsa, hl5hMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2H",
    fibers: ["other"],
    fiberName: "ultra-dense fiber",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-w968-hurricane-long-5",
    brandId: "dhs",
    name: "W968 Hurricane Long 5",
    aliases: ["Hurricane Long 5 National (W968)", "Hurricane Long 5 W968"],
    manufacturerRatings: [{ label: "Skill Level", value: "STAR PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "The 968-series premium version of the Hurricane Long 5, sold at retail with the same 5+2 inner arylate-carbon layup.",
    description: [
      "The W968 Hurricane Long 5 shares the Long 5's structure: five wood plies and two inner plies of yellow-black arylate-carbon either side of the core. DHS places it in its 968 series, which it describes as its highest level of craftsmanship and consistency.",
      "DHS lists it as a STAR PLAYER-level \"Offensive Max\" blade, 5.9 mm thick and 89 g.",
    ],
    facts: [
      {
        text: "DHS describes its 968 series as the Chinese national team customized version of its blades.",
        source: w968Usa.url,
      },
    ],
    notes: [
      "Although DHS calls the 968 series the national-team customized version, this model is sold at retail by DHS Sports USA and Megaspin, so it is listed here as its own product.",
      "DHS Sports USA lists the thickness as 5.9 mm and the shakehand weight as 89 g without a tolerance.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-w968-hurricane-long-5.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-long-5-w968-table-tennis-blade", credit: "© DHS" },
    sources: [w968Usa, w968Mega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "arylate-carbon (yellow-black)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-hurricane-long-3",
    brandId: "dhs",
    name: "Hurricane Long 3",
    aliases: ["HL3"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade from DHS's Hurricane Long series.",
    description: [
      "The Hurricane Long 3 is the all-wood member of the Hurricane Long series: seven wood plies with no composite layers.",
      "DHS describes smooth energy transmission, a solid feel and clear feedback for offensive play. DHS Sports USA publishes no thickness or weight; retailer Megaspin lists it at 6.3 mm and about 90 g.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA confirms the 7-ply all-wood construction; thickness and weight come from a retailer (Megaspin).",
      "Megaspin's class, speed and control figures are not shown because they are not attributed to DHS.",
    ],
    sources: [hl3Usa, hl3Mega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7 ply wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.3,
    weightG: { min: 90 },
    handles: ["FL"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-301",
    brandId: "dhs",
    name: "Hurricane 301",
    aliases: ["H301"],
    manufacturerRatings: [{ label: "Skill Level", value: "PRO" }],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 arylate-carbon offensive blade made with DHS's Blade Balance Technology pressing process.",
    description: [
      "The Hurricane 301 pairs five wood plies with two plies of arylate-carbon. DHS builds it with Blade Balance Technology (BBT), a cold-press bonding process at stable temperatures that DHS says reduces internal stress, improves flatness and slows performance loss from temperature and humidity.",
      "DHS describes a soft feel unlike traditional ALC blades, with a low, stable arc and good touch in the short game, and says it suits both shakehand and two-sided penhold loopers. It is listed as a PRO-level \"Offensive Max\" blade, 5.8 mm thick and about 89 g.",
    ],
    facts: [
      {
        text: "DHS's Blade Balance Technology bonds the plies by cold pressing at stable temperatures to reduce internal stress and deformation.",
        source: h301Usa.url,
      },
    ],
    notes: [
      "DHS Sports USA lists the thickness as 5.8 mm ±0.1 and the weight as 89 g ±3.",
      "The inner (next-to-core) position of the carbon comes from retailer Megaspin; DHS's page does not state it.",
      "DHS Sports USA also sells a separate, higher-priced \"National 301\" blade; it is not covered by this entry.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-301.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-301-table-tennis-blade", credit: "© DHS" },
    sources: [h301Usa, h301Mega, h301CsMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "aryl-carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.8,
    weightG: { min: 89 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-hurricane-301t",
    brandId: "dhs",
    name: "Hurricane 301T",
    aliases: ["H301T"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A variant of the Hurricane 301 using three-colour woven arylate-carbon with Blade Balance Technology.",
    description: [
      "The Hurricane 301T keeps the 5+2 ALC structure and Blade Balance Technology of the 301 but uses three-colour woven arylate-carbon (yellow, blue and black, according to Megaspin).",
      "DHS says the woven fibre lowers the power threshold compared with the original 301, so players can produce quality shots with medium effort while keeping the 301's power on full strokes.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA does not publish thickness or weight for this model; 5.9 mm and 89 g (shakehand) come from retailer Megaspin, which lists 86 g for the penhold version.",
      "The carbon's position beside the core comes from Megaspin.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-301t.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-301t-table-tennis-blade", credit: "© DHS" },
    sources: [h301tUsa, h301tMega, h301tCsMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 ALC",
    fibers: ["arylate-carbon"],
    fiberName: "three-color woven arylate carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL", "CS"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-king",
    brandId: "dhs",
    name: "Hurricane King",
    aliases: ["Hurricane King (Wang Chuqin)"],
    manufacturerRatings: [{ label: "Skill Level", value: "PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 arylate-carbon offensive blade sold in a special edition with Wang Chuqin's portrait on the handle.",
    description: [
      "This Hurricane King is a five-wood, two-arylate-carbon blade sold in a special edition design with Wang Chuqin's portrait on the handle and a dragon pattern.",
      "DHS describes it as balanced between forehand and backhand, strong in backhand exchanges and suited to mid-to-long distance play. It is listed as a PLAYER-level \"Offensive Max\" blade, 5.9 mm thick and about 89 g.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA lists the thickness as 5.9 mm ±0.1 and the shakehand weight as 89 g ±3.",
      "DHS does not state where the carbon plies sit, so the fibre position is left blank.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-king.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-king-table-tennis-blade", credit: "© DHS" },
    sources: [kingUsa, kingMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "aryl-carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-hurricane-sun",
    brandId: "dhs",
    name: "Hurricane Sun",
    manufacturerRatings: [{ label: "Skill Level", value: "PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 arylate-carbon offensive blade sold in a special edition with Sun Yingsha's portrait on the handle.",
    description: [
      "The Hurricane Sun is a five-wood, two-arylate-carbon blade with Sun Yingsha's portrait on the handle and a dragon pattern.",
      "DHS describes it as built for a fast, attacking style with quick transitions between offence and defence. It is listed as a PLAYER-level \"Offensive Max\" blade, 5.9 mm thick and about 89 g.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA lists the thickness as 5.9 mm ±0.1 and the shakehand weight as 89 g ±3.",
      "DHS does not state where the carbon plies sit, so the fibre position is left blank.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-sun.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-sun-table-tennis-blade", credit: "© DHS" },
    sources: [sunUsa, sunMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "aryl-carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 89 },
    handles: ["FL"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-hurricane-hao-3",
    brandId: "dhs",
    name: "Hurricane Hao 3",
    manufacturerRatings: [{ label: "Skill Level", value: "PLAYER" }],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply offensive blade with four wood plies around a single central glass-carbon layer.",
    description: [
      "The Hurricane Hao 3 uses an unusual 2+GC+2 construction: four wood plies with a single glass-carbon layer at the centre.",
      "DHS says the central glass-carbon layer improves rebound efficiency and stability, supporting forehand and backhand loops. It is listed as a PLAYER-level \"Offensive Max\" blade, 5.8 mm thick and about 82 g.",
    ],
    facts: [
      {
        text: "DHS describes the Hurricane Hao 3 as a blade used by Wang Hao, built with four wood plies and one glass-carbon core layer.",
        source: hao3Usa.url,
      },
    ],
    notes: [
      "DHS Sports USA lists the thickness as 5.8 mm ±0.1 and the weight as 82 g ±3; Megaspin lists 85 g.",
      "DHS Sports USA sells the penhold version; the flared shakehand version is listed by Megaspin.",
      "Country of manufacture comes from Megaspin's Chinese-penhold listing (\"Made in Shanghai\"); DHS Sports USA does not state it.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-hurricane-hao-3.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-national-hao-3-table-tennis-blade", credit: "© DHS" },
    sources: [hao3Usa, hao3Mega, hao3CsMega],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "2+GC+2",
    fibers: ["glass", "carbon"],
    fiberName: "glass-carbon",
    fiberPosition: "other",
    outerWood: null,
    thicknessMm: 5.8,
    weightG: { min: 82 },
    handles: ["FL", "CS"],
    manufacturerClass: "Offensive Max",
    madeIn: "China",
  },
  {
    id: "dhs-fang-bo-b2x",
    brandId: "dhs",
    name: "Fang Bo B2X",
    aliases: ["Fang Bo 2X Carbon", "Fang Bo B2 X"],
    manufacturerRatings: [{ label: "Skill Level", value: "PRO" }],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 arylate-carbon offensive blade with what DHS describes as a 0.5 mm thicker core.",
    description: [
      "The Fang Bo B2X is a five-wood, two-arylate-carbon blade with a thickened core (+0.5 mm, according to DHS) and an overall thickness of 6 mm. Megaspin describes the core as thicker than that of the Fang Bo B2.",
      "DHS says the thicker core adds solidity, rebound speed and power for mid- to long-distance attacks, and pitches the blade at keen amateur players. It is listed as a PRO-level \"Offensive Max\" blade weighing 90 g.",
    ],
    facts: [],
    notes: [
      "DHS does not state where the carbon plies sit, so the fibre position is left blank.",
      "Megaspin lists the Chinese-penhold version at 88 g.",
    ],
    photo: { src: "/equipment/photos/blades/dhs-fang-bo-b2x.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-bo-fang-x-carbon-table-tennis-blades", credit: "© DHS" },
    sources: [b2xUsa, b2xMega, b2xCsMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2AC",
    fibers: ["arylate-carbon"],
    fiberName: "aryl-carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 90 },
    handles: ["FL", "CS"],
    manufacturerClass: "Offensive Max",
    madeIn: null,
  },
  {
    id: "dhs-power-g7",
    brandId: "dhs",
    name: "Power G7",
    aliases: ["PG7"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade from DHS's Power G series.",
    description: [
      "The Power G7 is a seven-ply all-wood blade. Retailers describe the inner five plies as using \"high pressure ballonet\" technology for a quick rebound, with a specially treated outer surface.",
      "Retailers list it at 6.3 mm thick and position it for looping from mid-distance and quick attacking drives.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA does not list this blade; specifications come from retailers.",
      "Retailers list different weights: 89 g (Megaspin and Paddle Palace, shakehand), 88 g (dhs-tt.com) and 86 g (Megaspin, penhold), so no weight is shown.",
    ],
    sources: [pg7Mega, pg7CsMega, pg7Paddle, pg7Tt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7W",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.3,
    weightG: null,
    handles: ["FL", "CS"],
    manufacturerClass: null,
    madeIn: null,
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const h3Usa = dhsUsa("dhs-hurricane-3-table-tennis-rubbers", "Hurricane 3");
const h3Mega = megaspin("dhs-hurricane-3-39", "DHS Hurricane 3 - 39 Degrees");
const h3NeoUsa = dhsUsa("dhs-hurricane-3-neo-table-tennis-rubbers", "NEO Hurricane 3");
const h3NeoMega = megaspin("dhs-h3-neo-39", "DHS Hurricane 3 Neo - 39 Degrees");
const h350Usa = dhsUsa("dhs-hurricane-3-50-table-tennis-rubbers", "Hurricane 3-50");
const h350Mega = megaspin("dhs-h3-50-35", "DHS Hurricane 3-50 - 35 Degrees");
const h8Usa = dhsUsa("dhs-hurricane-8-table-tennis-rubber-red-39-2-15", "Hurricane 8");
const h8Mega = megaspin("dhs-h-8-39", "DHS Hurricane 8 - 39 Degrees");
const h8Mega41 = megaspin("dhs-h-8-41", "DHS Hurricane 8 - 41 Degrees");
const h880Usa = dhsUsa("dhs-hurricane-8-80-table-tennis-rubber", "Hurricane 8-80");
const h880Mega = megaspin("dhs-hurricane-8-80-37", "DHS Hurricane 8-80 - 37 Degrees");
const h9Usa = dhsUsa("dhs-hurricane-9-table-tennis-rubber", "Hurricane 9");
const h9MegaBlue = megaspin("dhs-hurricane-9-blue", "DHS Hurricane 9 Blue");
const h9MegaGreen = megaspin("dhs-hurricane-9-green", "DHS Hurricane 9 Green");
const h9MegaPink = megaspin("dhs-hurricane-9-pink", "DHS Hurricane 9 Pink");
const h9MegaViolet = megaspin("dhs-hurricane-9-violet", "DHS Hurricane 9 Violet");
const ga8Usa = dhsUsa("dhs-gold-arc-8-table-tennis-rubber", "Gold Arc 8");
const ga8Mega = megaspin("d-gold-arc-8", "DHS Gold Arc 8");
const ga9Usa = dhsUsa("dhs-golden-arc-8-table-tennis-rubber", "Gold Arc 9");
const ga9Mega = megaspin("d-gold-arc-9-37", "DHS Gold Arc 9 - 37 Degrees");
const ga9Contra: Source = {
  url: "https://www.contra.de/en/dhs-rubber-gold-arc-9-mid-380/",
  label: "Contra: DHS Gold Arc 9 Mid 38.0",
  kind: "retailer",
  accessed: ACCESSED,
};
const sky3Mega39 = megaspin("dhs-skyline-3-39", "DHS Skyline 3 - 39 Degrees");
const sky3Mega40 = megaspin("dhs-skyline-3-40", "DHS Skyline 3 - 40 Degrees");
const sky360Mega37 = megaspin("dhs-skyline-3-60", "DHS Skyline 3-60");
const sky360Mega35 = megaspin("dhs-skyline-3-60-35", "DHS Skyline 3-60 - 35 Degrees");

const NATIONAL_NOTE =
  "DHS Sports USA also sells separately listed \"National\" and \"Provincial\" versions of Hurricane 3 (including blue-sponge versions). They are different products from this retail rubber and can differ in sponge and feel.";

export const rubbers: Rubber[] = [
  {
    id: "dhs-hurricane-3",
    brandId: "dhs",
    name: "Hurricane 3",
    aliases: ["Hurricane III", "H3"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A tacky inverted rubber from DHS, sold in several sponge hardnesses on the Chinese scale.",
    description: [
      "Hurricane 3 has a durable tacky topsheet that DHS says gives strong grip and heavy spin on serves, loops and counter-attacks, with a direct, low-throw trajectory.",
      "DHS recommends boosting it, saying that without boosting it may not reach its full potential. DHS Sports USA offers it in 37 to 41 degree sponges and in 2.15 and 2.2 mm.",
    ],
    facts: [
      {
        text: "DHS warns that a freshly boosted Hurricane 3 can at first play with a very low arc and little elasticity, and that this settles with use.",
        source: h3Usa.url,
      },
    ],
    notes: [
      "Hardness options sold by DHS Sports USA: 37, 38, 39, 40 and 41 degrees.",
      NATIONAL_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-hurricane-3.webp", width: 558, height: 558, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-3-table-tennis-rubbers", credit: "© DHS" },
    sources: [h3Usa, h3Mega, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 37, max: 41, scale: "chinese" },
    spongeThicknesses: ["2.15", "2.2"],
    spongeColor: null,
    topsheetColors: ["Black", "Red"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-3-neo",
    brandId: "dhs",
    name: "Hurricane 3 Neo",
    aliases: ["NEO Hurricane 3", "Hurricane 3 NEO"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The factory-treated version of Hurricane 3, with a NEO layer that DHS says adds speed and power.",
    description: [
      "Hurricane 3 Neo uses the same tacky Hurricane 3 topsheet, but the sponge is pre-treated at the factory with an inorganic glue layer that DHS calls the NEO layer, intended to add speed and power out of the packet.",
      "DHS says the NEO layer keeps the sponge primed for roughly a month, after which the rubber may feel harder and lose grip; it recommends boosting and oiling to restore it. DHS Sports USA sells it in 37 to 41 degree sponges and in 2.1, 2.15 and 2.2 mm.",
    ],
    facts: [
      {
        text: "DHS says the factory-applied NEO layer keeps the sponge's energy for approximately one month.",
        source: h3NeoUsa.url,
      },
    ],
    notes: [
      "Hardness options sold by DHS Sports USA: 37, 39, 40 and 41 degrees.",
      "DHS Sports USA also sells separately listed NEO Hurricane 3 \"National\" and \"Provincial\" versions (including blue-sponge versions); they are different products from this retail rubber.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-hurricane-3-neo.webp", width: 630, height: 630, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-3-neo-table-tennis-rubbers", credit: "© DHS" },
    sources: [h3NeoUsa, h3NeoMega, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 37, max: 41, scale: "chinese" },
    spongeThicknesses: ["2.1", "2.15", "2.2"],
    spongeColor: null,
    topsheetColors: ["Black", "Red"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-3-50",
    brandId: "dhs",
    name: "Hurricane 3-50",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The Hurricane 3 tacky surface on what DHS calls a high-elasticity \"50#\" sponge.",
    description: [
      "Hurricane 3-50 combines the Hurricane 3 tacky surface with a high-elasticity 50# sponge. DHS says this makes power easier to generate, so compact strokes and wrist acceleration still produce spin and speed.",
      "DHS Sports USA sells it in 35 and 37 degree sponges, 2.1 mm only.",
    ],
    facts: [],
    notes: [
      "Hardness options sold by DHS Sports USA: 35 and 37 degrees.",
      "DHS Sports USA lists only a red topsheet; Megaspin also sells black.",
      "The ITTF list authorises the Hurricane III topsheet, but neither DHS nor the list names the 3-50 version, so ITTF approval is left unconfirmed here.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-hurricane-3-50.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-3-50-table-tennis-rubbers", credit: "© DHS" },
    sources: [h350Usa, h350Mega],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 35, max: 37, scale: "chinese" },
    spongeThicknesses: ["2.1"],
    spongeColor: null,
    topsheetColors: ["Red"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-8",
    brandId: "dhs",
    name: "Hurricane 8",
    aliases: ["Hurricane VIII", "H8"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A faster Hurricane-series tacky rubber with a high-density, more elastic sponge.",
    description: [
      "Hurricane 8 has a topsheet formulated to balance tackiness and elasticity, paired with a high-density sponge that DHS says is more elastic than conventional sponges.",
      "DHS says it keeps the heavy spin of the Hurricane line while adding ball speed and more direct power transfer. DHS Sports USA sells 37, 39 and 40 degree sponges in 2.15 and 2.2 mm.",
    ],
    facts: [
      {
        text: "Megaspin describes Hurricane 8's sponge as using \"Macro-Cell\" and \"High-Elasticity Particle Osmosis\" technology, credited with raising elasticity by 15%.",
        source: h8Mega.url,
      },
    ],
    notes: [
      "Hardness options sold by DHS Sports USA: 37, 39 and 40 degrees. Megaspin also sells a 41-degree version.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-hurricane-8.webp", width: 787, height: 780, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-8-table-tennis-rubber-red-39-2-15", credit: "© DHS" },
    sources: [h8Usa, h8Mega, h8Mega41, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 37, max: 40, scale: "chinese" },
    spongeThicknesses: ["2.15", "2.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-8-80",
    brandId: "dhs",
    name: "Hurricane 8-80",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Hurricane-series rubber pairing the tacky topsheet with a high-elastic, large-pore \"80\" sponge.",
    description: [
      "Hurricane 8-80 combines the tacky Hurricane topsheet with a high-elastic, large-pore sponge. DHS says this gives a crisper feel and faster ball release while keeping the Hurricane grip and spin.",
      "DHS describes it as a lighter, more dynamic tacky rubber suitable for both forehand and backhand. DHS Sports USA sells 37 and 38 degree sponges, 2.1 mm only.",
    ],
    facts: [],
    notes: [
      "Hardness options sold by DHS Sports USA: 37 and 38 degrees.",
      "The ITTF list authorises Hurricane 8, but neither DHS nor the list names the 8-80 version, so ITTF approval is left unconfirmed here.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-hurricane-8-80.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-8-80-table-tennis-rubber", credit: "© DHS" },
    sources: [h880Usa, h880Mega],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 37, max: 38, scale: "chinese" },
    spongeThicknesses: ["2.1"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "dhs-hurricane-9",
    brandId: "dhs",
    name: "Hurricane 9",
    aliases: ["Hurricane IX"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A tacky Hurricane rubber whose topsheet colour indicates which of several different sponges it uses.",
    description: [
      "Hurricane 9 is a high-tack rubber sold with coloured topsheets, and each colour comes with a different sponge. DHS describes the blue version as built on its blue sponge for power-oriented attackers, and the green and violet versions on a soft, large-pore elastic sponge aimed at variation and easy speed.",
      "DHS Sports USA sells blue and green versions in 37 and 38 degree sponges and 2.1 to 2.2 mm.",
    ],
    facts: [
      {
        text: "The ITTF list authorises Hurricane 9 in blue, green, pink and violet as well as red and black.",
        source: LARC.url,
      },
    ],
    notes: [
      "Hardness options sold by DHS Sports USA: 37 and 38 degrees. Megaspin also lists the pink version at 38 and 39 degrees.",
      "Sources disagree on the pink version's sponge: DHS Sports USA says orange sponge, Megaspin says blue sponge.",
      "Sponge colour differs by topsheet colour, so no single sponge colour is given.",
      "Topsheet colours are those named on the DHS Sports USA page (its shop options list Blue and Green); the ITTF list also authorises red and black.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-hurricane-9.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-hurricane-9-table-tennis-rubber", credit: "© DHS" },
    sources: [h9Usa, h9MegaBlue, h9MegaGreen, h9MegaPink, h9MegaViolet, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 37, max: 38, scale: "chinese" },
    spongeThicknesses: ["2.1", "2.15", "2.2"],
    spongeColor: null,
    topsheetColors: ["Blue", "Pink", "Green", "Violet"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-gold-arc-8",
    brandId: "dhs",
    name: "Gold Arc 8",
    aliases: ["GoldArc 8"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A non-tacky offensive rubber with what DHS calls strong built-in tension, developed with German rubber specialists.",
    description: [
      "Gold Arc 8 is a high-elastic, non-tacky rubber with built-in tension, short, thick and densely packed pimples and a dense large-pore sponge. DHS aims it at speed, power and direct attacking play.",
      "DHS says the rubber is produced using the Shore C hardness standard. DHS Sports USA sells 47.5 and 50 versions in Med and Max thickness.",
    ],
    facts: [
      {
        text: "DHS says Gold Arc 8 was developed jointly by the DHS Technical Center and German rubber manufacturing specialists, with technical input from Wang Liqin and Ma Long.",
        source: ga8Usa.url,
      },
    ],
    notes: [
      "Hardness options sold by DHS Sports USA: 47.5 and 50. DHS says the rubber is produced to the Shore C hardness standard and does not call these ESN, German or Chinese degrees, so the scale is recorded as unstated.",
      "DHS says it was developed with German rubber manufacturing specialists but does not state where it is made, so the country of manufacture is left blank.",
      "Classified as tensor because DHS describes a high-elastic, non-tacky rubber with \"strong built-in tension\" and a \"highly tensioned topsheet\".",
      "Megaspin lists the thicknesses as 2.0 and Max.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-gold-arc-8.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-gold-arc-8-table-tennis-rubber", credit: "© DHS" },
    sources: [ga8Usa, ga8Mega, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: "non-tacky",
    hardness: { min: 47.5, max: 50, scale: "unstated" },
    spongeThicknesses: ["Med", "Max"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-gold-arc-9",
    brandId: "dhs",
    name: "Gold Arc 9",
    aliases: ["GoldArc 9"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A high-elasticity, non-tacky inverted rubber from DHS's Gold Arc line, aimed at balanced speed and control.",
    description: [
      "Gold Arc 9 is a non-tacky inverted rubber. DHS says its topsheet technology raises the elasticity of both topsheet and sponge, and that PRT (Particle Reinforcement Technology) shapes the pimples for faster recovery and rebound.",
      "DHS describes a large-pore, high-energy sponge with a crisp, controlled feel. DHS Sports USA sells it in 37 and 38 degree sponges, 2.0 and 2.1 mm.",
    ],
    facts: [],
    notes: [
      "Hardness options sold by DHS Sports USA: 37 and 38. DHS does not say which scale these use, so the scale is recorded as unstated.",
      "Classified as tensor because retailer Contra describes the rubber as \"under constant tension\" thanks to its pimple structure and processing; the DHS Sports USA page does not use the word tension.",
      "DHS Sports USA lists only a red topsheet; Contra lists red and black.",
      "DHS Sports USA's page address reads \"golden-arc-8\" but the product is Gold Arc 9.",
    ],
    photo: { src: "/equipment/photos/rubbers/dhs-gold-arc-9.webp", width: 800, height: 800, sourceUrl: "https://dhssportsusa.com/products/dhs-golden-arc-8-table-tennis-rubber", credit: "© DHS" },
    sources: [ga9Usa, ga9Mega, ga9Contra, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: "non-tacky",
    hardness: { min: 37, max: 38, scale: "unstated" },
    spongeThicknesses: ["2.0", "2.1"],
    spongeColor: null,
    topsheetColors: ["Red"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-skyline-3",
    brandId: "dhs",
    name: "Skyline 3",
    aliases: ["Skyline III"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A tacky DHS inverted rubber built for continuous loop attacks.",
    description: [
      "Skyline 3 is a tacky inverted rubber. Retailer Megaspin describes a sponge that recovers its shape quickly after impact, supporting repeated loop attacks.",
      "Megaspin sells it in 39 and 40 degree versions, in 2.15 and 2.2 mm.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA does not list this rubber; specifications come from a retailer (Megaspin).",
      "Hardness options sold by Megaspin: 39 and 40 degrees.",
    ],
    sources: [sky3Mega39, sky3Mega40, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 39, max: 40, scale: "chinese" },
    spongeThicknesses: ["2.15", "2.2"],
    spongeColor: null,
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dhs-skyline-3-60",
    brandId: "dhs",
    name: "Skyline 3-60",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The Skyline 3 tacky topsheet on a soft, elastic \"60\" sponge.",
    description: [
      "Skyline 3-60 pairs the classic tacky Skyline 3 rubber with a soft, elastic 60 sponge. Retailer Megaspin describes it as needing little effort for loop attacks and as suited to varied spin and wrist play.",
      "Megaspin sells it in 35 and 37 degree versions, 2.1 mm only.",
    ],
    facts: [],
    notes: [
      "DHS Sports USA does not list this rubber; specifications come from a retailer (Megaspin).",
      "Hardness options sold by Megaspin: 35 and 37 degrees.",
      "The ITTF list authorises the Skyline III topsheet, but no source names the 3-60 version, so ITTF approval is left unconfirmed here.",
    ],
    sources: [sky360Mega37, sky360Mega35],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 35, max: 37, scale: "chinese" },
    spongeThicknesses: ["2.1"],
    spongeColor: null,
    ittfApproved: null,
    madeIn: null,
  },
];
