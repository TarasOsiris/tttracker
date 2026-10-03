import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** Tianjin 729 Sports Equipment Co., Ltd., Chinese-language official site (spec tables with hardness and ratings). */
const cn = (id: string, label: string): Source => ({
  url: `http://www.729sports.com/productdetails/${id}.html`,
  label: `729 Sports (official, Chinese site): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** Tianjin 729 Sports Equipment Co., Ltd., English-language official site. */
const en = (id: string, label: string): Source => ({
  url: `http://en.729sports.com/productdetails/${id}.html`,
  label: `729 Sports (official, English site): ${label}`,
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

const HARDNESS_NOTE =
  "729's printed degrees may not match DHS degrees exactly; Chinese makers have used different durometers.";

const RATINGS_NOTE =
  "729 prints Speed, Spin, Control and Forward numbers without stating the top of its scale; they are shown as printed and aren't comparable with other brands' numbers.";

export const brand: Brand = {
  id: "729",
  name: "729 Friendship",
  country: "China",
  website: "http://en.729sports.com/",
  ratingNote:
    "729 lists rubbers with Speed, Spin, Control and Forward numbers (and on some pages a Loopdrive number) without stating the top of the scale; most blade pages give only a text description.",
  hardnessScale: "chinese",
  logo: { src: "/equipment/brands/729.webp", width: 138, height: 64, sourceUrl: "http://en.729sports.com/", credit: "Logo © 729 Friendship" },
  sources: [
    {
      url: "http://en.729sports.com/about/3.html",
      label: "729 Sports (official): Company Profile",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "http://www.729sports.com/",
      label: "729 Sports (official, Chinese site): home page",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const blackCarbonEn = en("377", "Black Carbon Blades");
const blackCarbonCn = cn("286", "黑软碳底板 (Black Carbon)");
const yellowEn = en("378", "Yellow Arylate Carbon Blades");
const yellowCn = cn("287", "黄芳碳底板 (Yellow Arylate Carbon; Chinese text names the fibre 黄芳纶纤维, yellow aramid fibre)");
const z2En = en("386", "Z-2 Blades");
const z2Cn = cn("285", "Z-2底板");
const c5En = en("383", "C5 MAX Blades");
const c5Cn = cn("282", "C5MAX底板");

export const blades: Blade[] = [
  {
    id: "729-black-carbon",
    brandId: "729",
    name: "Black Carbon",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 729 carbon blade that pairs a soundboard-grade softwood with plain-woven carbon fibre cloth.",
    description: [
      "The Black Carbon is part of 729's Arylate Carbon blade series. 729 describes it as combining wood of piano-soundboard quality with carbon fibre woven into cloth in a criss-cross plain weave.",
      "729 says the carbon layer adds stiffness and improves the blade's handling feel, combining powerful hitting with stability. The maker does not publish the ply count, thickness or weight on its product pages.",
    ],
    facts: [],
    notes: [
      "729's two official sites name the wood differently: the Chinese page says spruce (云杉), the English page says \"Cypress Wood of piano soundboard quality\". Neither says which ply it is, so the outer wood is left blank.",
      "729 does not publish ply count, thickness, weight or handle options on its product pages.",
    ],
    photo: { src: "/equipment/photos/blades/729-black-carbon.webp", width: 578, height: 1000, sourceUrl: "http://en.729sports.com/productdetails/377.html", credit: "© 729 Friendship" },
    sources: [blackCarbonEn, blackCarbonCn],
    lastVerified: ACCESSED,
    plies: null,
    layup: null,
    fibers: ["carbon"],
    fiberName: "carbon fiber (plain-woven cloth)",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: null,
    weightG: null,
    handles: [],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "729-yellow-arylate-carbon",
    brandId: "729",
    name: "Yellow Arylate Carbon",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 729 composite blade using a woven cloth of yellow aramid fibre (sold in English as \"arylate\") and carbon fibre, with an ayous core.",
    description: [
      "The Yellow Arylate Carbon is part of 729's Arylate Carbon blade series. 729's Chinese page says it uses yellow aramid fibre (黄芳纶纤维) and carbon fibre woven together into a criss-cross cloth; the English page calls the same fibre \"Yellow Arylate Fiber\".",
      "The core is ayous, which 729 says it selects for an even annual-ring texture to keep the blade stable and give a clear feel. Ply count, thickness and weight are not published on the maker's product pages.",
    ],
    facts: [],
    notes: [
      "729's English page calls the fibre \"Yellow Arylate Fiber\"; its Chinese page names it 黄芳纶纤维, which means yellow aramid fibre. The fibre is recorded as aramid-carbon from the Chinese spec text; the English product name is kept as sold.",
      "729 does not publish ply count, thickness, weight or handle options on its product pages.",
    ],
    photo: { src: "/equipment/photos/blades/729-yellow-arylate-carbon.webp", width: 575, height: 1000, sourceUrl: "http://en.729sports.com/productdetails/378.html", credit: "© 729 Friendship" },
    sources: [yellowEn, yellowCn],
    lastVerified: ACCESSED,
    plies: null,
    layup: null,
    fibers: ["aramid-carbon"],
    fiberName: "Yellow Arylate Fiber and Carbon Fiber (黄芳纶纤维和碳纤维)",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: null,
    weightG: null,
    handles: [],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "729-z-2",
    brandId: "729",
    name: "Z-2",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 729 blade with a carbon crystal layer, aimed at mid-distance loop players.",
    description: [
      "729 says the Z-2 uses a carbon crystal layer to raise the blade's elasticity, giving strong performance when looping from mid and far distances.",
      "The maker describes a large sweet spot and a direct feel that improves control, and positions the Z-2 for loop-drive players at mid-distance. 729 does not publish the ply count, thickness or weight on its product pages.",
    ],
    facts: [],
    notes: ["729 does not publish ply count, thickness, weight, fibre position or handle options on its product pages."],
    photo: { src: "/equipment/photos/blades/729-z-2.webp", width: 569, height: 1000, sourceUrl: "http://en.729sports.com/productdetails/386.html", credit: "© 729 Friendship" },
    sources: [z2En, z2Cn],
    lastVerified: ACCESSED,
    plies: null,
    layup: null,
    fibers: ["carbon"],
    fiberName: "carbon crystal layer (碳晶层)",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: null,
    weightG: null,
    handles: [],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "729-c5-max",
    brandId: "729",
    name: "C5 MAX",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A five-ply all-wood 729 blade with an enlarged sweet spot, aimed at beginners.",
    description: [
      "The C5 MAX is a five-ply all-wood blade. 729 says it has balanced performance and an enlarged sweet spot that makes it easier to control where the ball lands.",
      "729 recommends it for beginners looking for a balance of attack and defence. Thickness and weight are not published on the maker's product pages.",
    ],
    facts: [],
    notes: ["729 does not publish thickness, weight or handle options on its product pages."],
    photo: { src: "/equipment/photos/blades/729-c5-max.webp", width: 644, height: 596, sourceUrl: "http://en.729sports.com/productdetails/383.html", credit: "© 729 Friendship" },
    sources: [c5En, c5Cn],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5 plies all wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: null,
    weightG: null,
    handles: [],
    manufacturerClass: null,
    madeIn: null,
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const b2pCn = cn("216", "奔腾Ⅱ省套（普版） (Battle II Provincial, common version)");
const b2pEn = en("1168511868071018496", "Battle II Provincial (Common Version)");
const b2pMega: Source = {
  url: "https://www.megaspin.net/store/default.asp?pid=r-729-battle-ii-prov",
  label: "Megaspin: RITC Friendship 729 Battle II Provincial",
  kind: "retailer",
  accessed: ACCESSED,
};
const b2pTt11: Source = {
  url: "https://tabletennis11.com/en/friendship-729-battle-ii-provincial",
  label: "Tabletennis11: Friendship 729 Battle II Provincial",
  kind: "retailer",
  accessed: ACCESSED,
};
const b2pCnGolden = cn("217", "奔腾Ⅱ省套（金版） (Battle II Provincial, golden version)");

const focus3En = en("1168511874526052352", "Focus III Sponge Rubber");
const focus3Cn = cn("235", "焦点 Ⅲ 套胶 (Focus III)");

const es08En = en("1168511877860524032", "729-08ES Sponge Rubber");
const es08Cn = cn("244", "729-08ES 套胶");

const r755En = en("1168511882247766016", "755 Sponge Rubber");
const r755Cn = cn("256", "755套胶");
const r755OxCn = cn("249", "755长胶 (755 long pimples topsheet)");

const r80240En = en("1168511882461675520", "802-40 Sponge Rubber");
const r80240Cn = cn("257", "802-40套胶");
const r802Cn = cn("258", "802套胶 (802)");

export const rubbers: Rubber[] = [
  {
    id: "729-battle-2-provincial",
    brandId: "729",
    name: "Battle II Provincial",
    aliases: ["Battle 2 Provincial"],
    manufacturerRatings: [
      { label: "Fitted Type", value: "Fast Attack Loopdrive" },
      { label: "Speed", value: 12.5 },
      { label: "Spin", value: 12 },
      { label: "Control", value: 12 },
      { label: "Forward", value: 13 },
      { label: "Loopdrive", value: 13 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The provincial-grade version of 729's Battle II, a tacky inverted rubber sold in 38 and 39 degree sponges.",
    description: [
      "Battle II Provincial is one of several Battle II versions in 729's catalogue. 729 lists the common version with a 2.1 mm sponge in 38 or 39 degrees and recommends it for a fast-attack and loop style.",
      "Retailers describe it as a tacky rubber with a grippy topsheet and a livelier sponge than the standard commercial Battle II. 729 itself prints only its spec table for this version, with no description.",
    ],
    facts: [],
    notes: [
      "Hardness options listed by 729 for the common version: 38 and 39 degrees. 729 lists a separate golden version with a 40 degree, 2.15 mm sponge.",
      HARDNESS_NOTE,
      RATINGS_NOTE,
      "The tacky classification comes from Megaspin and Tabletennis11, which both describe it as a tacky rubber; 729's own page has no description.",
      "The ITTF LARC lists Friendship \"729BattleII\" (27-007); the provincial version is not listed separately, so ITTF approval is left blank.",
      "729 also sells National, golden-version and blue-sponge \"direct supply for provincial teams\" Battle II versions; they are separate products.",
    ],
    photo: { src: "/equipment/photos/rubbers/729-battle-2-provincial.webp", width: 800, height: 704, sourceUrl: "http://en.729sports.com/productdetails/1168511868071018496.html", credit: "© 729 Friendship" },
    sources: [b2pCn, b2pEn, b2pCnGolden, b2pMega, b2pTt11, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: null,
    hardness: { min: 38, max: 39, scale: "chinese" },
    spongeThicknesses: ["2.1"],
    spongeColor: null,
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "729-focus-3",
    brandId: "729",
    name: "Focus III",
    aliases: ["Focus 3"],
    manufacturerRatings: [
      { label: "Type", value: "Speed type" },
      { label: "Speed", value: 12 },
      { label: "Spin", value: 11 },
      { label: "Control", value: 11 },
      { label: "Forward", value: 12 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A non-tacky 729 inverted rubber with an energy-storing sponge, sold in 42 and 44 degrees.",
    description: [
      "Focus III is a speed-type inverted rubber from 729's Focus series. 729 says its topsheet is made with new processing and mould technology that keeps a long-lasting non-tacky grip, so friction and spin come easily.",
      "The sponge uses what 729 calls energy-storing technology combined with SENSOR bonding, which the maker says gives strong bounce with VOC-free glues. 729 lists a 2.1 mm sponge in 42 or 44 degrees.",
    ],
    facts: [
      {
        text: "729 says Focus III's sponge is built to give strong bounce when glued with VOC-free (water-based) glues, without speed glue.",
        source: focus3En.url,
      },
    ],
    notes: [
      "Hardness options listed by 729: 42 and 44 degrees.",
      HARDNESS_NOTE,
      RATINGS_NOTE,
      "Classified as tensor from 729's description: a non-tacky topsheet on a sponge using what the Chinese page calls energy-storing tension technology (储能张力技术), which performs without speed glue.",
    ],
    photo: { src: "/equipment/photos/rubbers/729-focus-3.webp", width: 800, height: 800, sourceUrl: "http://en.729sports.com/productdetails/1168511874526052352.html", credit: "© 729 Friendship" },
    sources: [focus3En, focus3Cn, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: "non-tacky",
    hardness: { min: 42, max: 44, scale: "chinese" },
    spongeThicknesses: ["2.1"],
    spongeColor: null,
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "729-729-08-es",
    brandId: "729",
    name: "729-08 ES",
    aliases: ["729-08ES"],
    manufacturerRatings: [
      { label: "Speed", value: 12 },
      { label: "Spin", value: 12 },
      { label: "Control", value: 11 },
      { label: "Forward", value: 12 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A tacky 729 inverted rubber whose ES sponge is designed to perform without speed glue.",
    description: [
      "The 729-08 ES pairs a tacky topsheet made with what 729 calls its HS technology with a sponge using its ES technology, which the maker says removes the traditional reliance on speed glue.",
      "729 says it plays consistently with both water-based and organic glues and recommends it for loop-drive attacking play. It is listed with a 2.1 mm sponge in 45 or 47 degrees.",
    ],
    facts: [],
    notes: [
      "Hardness options listed by 729: 45 and 47 degrees.",
      HARDNESS_NOTE,
      RATINGS_NOTE,
      "Classified as tacky because 729 describes the topsheet as viscous (粘性, \"HS\" technology).",
      "The ITTF LARC lists Friendship \"R.I.T.C.729-08\"; the ES version is not listed separately, so ITTF approval is left blank.",
    ],
    photo: { src: "/equipment/photos/rubbers/729-729-08-es.webp", width: 800, height: 800, sourceUrl: "http://en.729sports.com/productdetails/1168511877860524032.html", credit: "© 729 Friendship" },
    sources: [es08En, es08Cn, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: "tacky",
    hardness: { min: 45, max: 47, scale: "chinese" },
    spongeThicknesses: ["2.1"],
    spongeColor: null,
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "729-755",
    brandId: "729",
    name: "755",
    aliases: ["RITC 755"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "729's long-pimpled rubber for defensive and control players, sold on thin 38 degree sponges.",
    description: [
      "The 755 is a long-pips rubber. 729 says it has pronounced spin-reversing properties, using a tough but soft rubber with a precise pimple structure that makes returns float and wobble.",
      "A balanced sponge is meant to make up for the usual weaknesses of long pips, holding the ball longer for a clearer feel and stronger defence. 729 recommends it for defensive control players and lists 0.5, 0.8 and 1.0 mm sponges at 38 degrees.",
    ],
    facts: [
      {
        text: "729 says the 755 has long been nicknamed the \"magic pimples\".",
        source: r755En.url,
      },
    ],
    notes: [
      "Hardness listed by 729: 38 degrees.",
      HARDNESS_NOTE,
      "729 also lists a separate 755 long-pimples topsheet product; pimple dimensions are not published.",
    ],
    photo: { src: "/equipment/photos/rubbers/729-755.webp", width: 695, height: 696, sourceUrl: "http://en.729sports.com/productdetails/1168511882247766016.html", credit: "© 729 Friendship" },
    sources: [r755En, r755Cn, r755OxCn, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 38, scale: "chinese" },
    spongeThicknesses: ["0.5", "0.8", "1.0"],
    spongeColor: null,
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "729-802-40",
    brandId: "729",
    name: "802-40",
    aliases: ["RITC 802-40"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "729's short-pips rubber with short, thick pimples on a thin base sheet, sold in 36 to 40 degree sponges.",
    description: [
      "The 802-40 is a short-pips rubber. 729 says the topsheet uses a thin base, short and thick pimples and a textured pimple surface to reduce the heavy feel and energy loss at impact while still creating spin through friction.",
      "An upgraded soft, elastic sponge is meant to work with the blade's stiffness for fast, penetrating shots. 729 lists 2.0 and 2.15 mm sponges in 36, 38 or 40 degrees.",
    ],
    facts: [],
    notes: [
      "Hardness options listed by 729: 36, 38 and 40 degrees.",
      HARDNESS_NOTE,
      "729 also sells the 802 short pips (35/38 degrees, 1.7/1.9/2.1 mm) as a separate product. Pimple dimensions are not published.",
    ],
    photo: { src: "/equipment/photos/rubbers/729-802-40.webp", width: 695, height: 696, sourceUrl: "http://en.729sports.com/productdetails/1168511882461675520.html", credit: "© 729 Friendship" },
    sources: [r80240En, r80240Cn, r802Cn, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 36, max: 40, scale: "chinese" },
    spongeThicknesses: ["2.0", "2.15"],
    spongeColor: null,
    ittfApproved: true,
    madeIn: null,
  },
];
