import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** Nittaku Japan (Nippon Takkyu), the maker's own site. Product pages are in Japanese. */
const nittakuBlade = (slug: string, label: string): Source => ({
  url: `https://www.nittaku.com/products/rackets/${slug}`,
  label: `Nittaku (official, Japan): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const nittakuRubber = (slug: string, label: string): Source => ({
  url: `https://www.nittaku.com/products/rubbers/${slug}`,
  label: `Nittaku (official, Japan): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** Nittaku's rubber guide: thickness classes in mm, the Speed/Spin icons (relative to Nodias = 10.00), and categories. */
const RUBBER_GUIDE: Source = {
  url: "https://www.nittaku.com/wp-content/uploads/2021/05/085fd1b0b8bc68987bc15cf033b606c5.pdf",
  label: "Nittaku (official, Japan): Rubber basics guide (sponge thickness classes, speed/spin icons, categories)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

/** ITTF List of Authorized Racket Coverings valid from 1 January 2026 (copy published by the Hessian TT association). */
const LARC: Source = {
  url: "https://www.httv.de/media/000/Schiedsrichter/Material_SR-Einsatz/Zulassungslisten/LARC/ITTF/2026/Equipment_RacketCovering_1January2026_1118.pdf",
  label: "ITTF LARC (List of Authorized Racket Coverings), 1 January 2026",
  kind: "ittf",
  accessed: ACCESSED,
};

/** Sponge thickness classes as defined in Nittaku's rubber guide (RUBBER_GUIDE). */
const T = {
  thin: "1.2–1.4", // 薄
  middle: "1.4–1.7", // 中
  thick: "1.7–1.9", // 厚
  superThick: "1.9–2.1", // 特厚
  max: "MAX", // MAX, 2.1 mm and over
} as const;

const thicknessNote = (classes: string) =>
  `Nittaku Japan sells this rubber in the thickness classes ${classes}. Its rubber guide defines 薄 (thin) as 1.2–1.4 mm, 中 (middle) as 1.4–1.7 mm, 厚 (thick) as 1.7–1.9 mm, 特厚 (super thick) as 1.9–2.1 mm and MAX as 2.1 mm and over; those ranges are shown here.`;

const RATING_NOTE =
  "Nittaku's Speed and Spin figures are comparison values against its Nodias rubber, which is set at 10.00; they are not on a fixed 10-point scale.";

const germanHardnessNote = (jp: string, de: string) =>
  `Nittaku Japan lists the sponge hardness as ${jp} on its Japanese scale and ${de} by the German standard (ドイツ基準); the German figure is shown here.`;

const BLADE_FEEL_NOTE =
  "Nittaku rates its blades with word tiers rather than numbers: Speed (スピード, e.g. Mid, Mid Fast) and Feel (打球感: Soft, Middle or Hard).";

export const brand: Brand = {
  id: "nittaku",
  name: "Nittaku",
  country: "Japan",
  website: "https://www.nittaku.com",
  ratingNote:
    "Nittaku rates rubbers by Speed and Spin as comparison values against its Nodias rubber set at 10.00, and rates blades with word tiers for Speed (e.g. Mid, Mid Fast) and Feel (Soft, Middle, Hard).",
  hardnessScale: null,
  sources: [
    {
      url: "https://www.nittaku.com/",
      label: "Nittaku (official site, Japan)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    RUBBER_GUIDE,
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const acoustic = nittakuBlade("post-39", "アコースティック (Acoustic)");
const acousticCarbon = nittakuBlade("post-34", "アコースティックカーボン (Acoustic Carbon)");
const acousticCarbonInner = nittakuBlade("post-28", "アコースティックカーボンインナー (Acoustic Carbon Inner)");
const violin = nittakuBlade("post-37", "バイオリン (Violin)");
const violinCarbon = nittakuBlade("post-8", "バイオリンカーボン (Violin Carbon)");
const septear = nittakuBlade("post-52", "セプティアー (Septear)");
const latika = nittakuBlade("post-50", "ラティカ (Latika)");
const hayataH2 = nittakuBlade("post-154", "Hina Hayata H2");
const mimaItoCarbon = nittakuBlade("post-145-2", "伊藤美誠カーボン (Mima Ito Carbon)");
const tribusCarbon = nittakuBlade("post-153", "トリバスカーボン (Tribus Carbon)");
const shakeHandList: Source = {
  url: "https://www.nittaku.com/products/rackets/shake-hand/",
  label: "Nittaku (official, Japan): shakehand blade list",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const acousticGRev = nittakuBlade("post-170", "アコースティックG-REVISION (Acoustic G-REVISION)");
const acousticCarbonGRev = nittakuBlade("post-171", "アコースティックカーボンG-REVISION (Acoustic Carbon G-REVISION)");
const acousticCarbonInnerGRev = nittakuBlade("post-172", "アコースティックカーボンインナーG-REVISION (Acoustic Carbon Inner G-REVISION)");

const gorikiSuperCut = nittakuBlade("post-138", "剛力スーパーカット (Goriki Super Cut)");

const weightNote = (g: number) =>
  `Nittaku Japan prints the weight as "${g}±g" without stating the tolerance; ${g} g is shown as the nominal weight.`;

export const blades: Blade[] = [
  {
    id: "nittaku-acoustic",
    brandId: "nittaku",
    name: "Acoustic",
    manufacturerRatings: [
      { label: "Speed", value: "Mid" },
      { label: "Feel", value: "Middle" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made 5-ply all-wood offensive blade built with what Nittaku calls its string-instrument construction method.",
    description: [
      "The Acoustic is a five-ply all-wood blade made in Japan. Nittaku builds it with a method it calls 弦楽器製法, a construction technique it says comes from string-instrument making.",
      "Nittaku rates it Mid for speed and Middle for feel, and says the stable ply construction lets it suit a wide range of rubbers and techniques. It lists a thickness of 5.7 mm, a 157 x 150 mm head and a weight of about 88 g.",
    ],
    facts: [
      {
        text: "Nittaku makes the Acoustic with what it calls a string-instrument construction method (弦楽器製法).",
        source: acoustic.url,
      },
    ],
    notes: [
      weightNote(88),
      "Nittaku Japan lists the straight (ST) handle as discontinued as of 31 August 2025; the flared (FL) handle remains. Nittaku also sells the Acoustic G-REVISION, a separate product with its own G-REVISION grip (listed separately).",
      BLADE_FEEL_NOTE,
    ],
    sources: [acoustic, acousticGRev, shakeHandList],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5 wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.7,
    weightG: { min: 88 },
    handles: ["FL"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-acoustic-carbon",
    brandId: "nittaku",
    name: "Acoustic Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Acoustic with two plies of FE Carbon placed close to the outer veneers, a 5+2 offensive blade made in Japan.",
    description: [
      "The Acoustic Carbon takes the five-ply Acoustic and adds two plies of what Nittaku calls FE Carbon, placed close to the outer veneers (Nittaku's \"outer type\"). Nittaku describes the FE Carbon as supple and stable and says the layout gives more speed than the all-wood Acoustic.",
      "Nittaku rates it Mid Fast for speed and Hard for feel. It lists a thickness of 5.5 mm, a 157 x 150 mm head and a weight of about 90 g.",
    ],
    facts: [],
    notes: [
      weightNote(90),
      "Nittaku Japan lists the straight (ST) handle as discontinued as of 31 August 2025; the flared (FL) handle remains. Nittaku also sells an Acoustic Carbon (LG type) handle version, and the Acoustic Carbon G-REVISION, a separate product with its own G-REVISION grip in FL and ST (listed separately).",
      BLADE_FEEL_NOTE,
    ],
    sources: [acousticCarbon, acousticCarbonGRev, shakeHandList],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 FE Carbon",
    fibers: ["carbon"],
    fiberName: "FE Carbon",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 5.5,
    weightG: { min: 90 },
    handles: ["FL"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-acoustic-carbon-inner",
    brandId: "nittaku",
    name: "Acoustic Carbon Inner",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Acoustic with two plies of FE Carbon placed next to the core, a 5+2 inner-carbon offensive blade made in Japan.",
    description: [
      "The Acoustic Carbon Inner uses the same five-ply Acoustic base as the Acoustic Carbon, but places the two FE Carbon plies close to the core rather than under the outer veneers.",
      "Nittaku says this makes the blade more supple with longer dwell than the outer version and allows stable topspin attacks from mid-distance. It rates the blade Mid Fast for speed and Hard for feel, and lists 5.5 mm thickness, a 157 x 150 mm head and about 90 g.",
    ],
    facts: [],
    notes: [
      weightNote(90),
      "Nittaku Japan lists the straight (ST) handle as discontinued as of 31 August 2025; the flared (FL) handle remains. Nittaku also sells the Acoustic Carbon Inner G-REVISION, a separate product with its own G-REVISION grip in FL and ST (listed separately).",
      BLADE_FEEL_NOTE,
    ],
    sources: [acousticCarbonInner, acousticCarbonInnerGRev, shakeHandList],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 FE Carbon",
    fibers: ["carbon"],
    fiberName: "FE Carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.5,
    weightG: { min: 90 },
    handles: ["FL"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-acoustic-g-revision",
    brandId: "nittaku",
    name: "Acoustic G-REVISION",
    manufacturerRatings: [
      { label: "Speed", value: "Mid" },
      { label: "Feel", value: "Middle" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The 5-ply all-wood Acoustic fitted with Nittaku's G-REVISION grip, sold as a separate product in flared and straight handles.",
    description: [
      "The Acoustic G-REVISION is a five-ply all-wood blade made in Japan with the string-instrument construction method (弦楽器製法) Nittaku uses for the Acoustic. Nittaku sells it as a separate product with its own G-REVISION grip, which it says improves the fit in the hand.",
      "Its listed blade specifications match the Acoustic: 5.7 mm thick, a 157 x 150 mm head, rated Mid for speed and Middle for feel. Nittaku lists it at about 89 g, with grips of 100 x 22.5 mm (ST) and 100 x 24.5 mm (FL).",
    ],
    facts: [],
    notes: [
      weightNote(89),
      "Nittaku lists the regular Acoustic at 88 g with a 100 x 22 mm FL grip; the G-REVISION differs in its grip and listed weight.",
      BLADE_FEEL_NOTE,
    ],
    sources: [acousticGRev, acoustic, shakeHandList],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5 wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.7,
    weightG: { min: 89 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-acoustic-carbon-g-revision",
    brandId: "nittaku",
    name: "Acoustic Carbon G-REVISION",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Acoustic Carbon (5 wood + 2 outer FE Carbon) fitted with Nittaku's G-REVISION grip, sold as a separate product.",
    description: [
      "The Acoustic Carbon G-REVISION is a Japanese-made 5+2 blade with two plies of FE Carbon placed on the outer side, built with Nittaku's string-instrument method. Nittaku sells it as a separate product with its own G-REVISION grip, which it says improves the fit in the hand.",
      "Its listed blade specifications match the Acoustic Carbon: 5.5 mm thick, a 157 x 150 mm head, rated Mid Fast for speed and Hard for feel. Nittaku lists it at about 91 g, with grips of 100 x 22.5 mm (ST) and 100 x 24.5 mm (FL).",
    ],
    facts: [],
    notes: [
      weightNote(91),
      "Nittaku lists the regular Acoustic Carbon at 90 g with a 100 x 22 mm FL grip; the G-REVISION differs in its grip and listed weight.",
      BLADE_FEEL_NOTE,
    ],
    sources: [acousticCarbonGRev, acousticCarbon, shakeHandList],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 FE Carbon",
    fibers: ["carbon"],
    fiberName: "FE Carbon",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 5.5,
    weightG: { min: 91 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-acoustic-carbon-inner-g-revision",
    brandId: "nittaku",
    name: "Acoustic Carbon Inner G-REVISION",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Acoustic Carbon Inner (5 wood + 2 inner FE Carbon) fitted with Nittaku's G-REVISION grip, sold as a separate product.",
    description: [
      "The Acoustic Carbon Inner G-REVISION is a Japanese-made 5+2 blade with two plies of FE Carbon placed on the inner side, built with Nittaku's string-instrument method. Nittaku sells it as a separate product with its own G-REVISION grip, which it says improves the fit in the hand.",
      "Its listed blade specifications match the Acoustic Carbon Inner: 5.5 mm thick, a 157 x 150 mm head, rated Mid Fast for speed and Hard for feel. Nittaku lists it at about 91 g, with grips of 100 x 22.5 mm (ST) and 100 x 24.5 mm (FL).",
    ],
    facts: [],
    notes: [
      weightNote(91),
      "Nittaku lists the regular Acoustic Carbon Inner at 90 g with a 100 x 22 mm FL grip; the G-REVISION differs in its grip and listed weight.",
      BLADE_FEEL_NOTE,
    ],
    sources: [acousticCarbonInnerGRev, acousticCarbonInner, shakeHandList],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 FE Carbon",
    fibers: ["carbon"],
    fiberName: "FE Carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.5,
    weightG: { min: 91 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-violin",
    brandId: "nittaku",
    name: "Violin",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Slow" },
      { label: "Feel", value: "Soft" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A thin, Japanese-made 5-ply all-wood blade built with Nittaku's string-instrument method, rated Mid Slow and Soft.",
    description: [
      "The Violin is a five-ply all-wood blade made in Japan with the string-instrument construction method Nittaku also uses for the Acoustic. At 5.3 mm it is thinner than the Acoustic, and its head is slightly smaller at 156 x 149 mm.",
      "Nittaku describes a wide sweet spot, a pleasant feel and a characteristic flex that holds the ball before releasing it. It rates the blade Mid Slow for speed and Soft for feel, and lists a weight of about 88 g.",
    ],
    facts: [],
    notes: [weightNote(88), BLADE_FEEL_NOTE],
    sources: [violin],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5 wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.3,
    weightG: { min: 88 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-violin-carbon",
    brandId: "nittaku",
    name: "Violin Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Violin with two outer plies of FE Carbon added, a thin 5+2 offensive blade made in Japan.",
    description: [
      "The Violin Carbon adds two plies of FE Carbon, placed close to the outer veneers, to the five-ply Violin. Nittaku says the carbon raises the speed while keeping the Violin's characteristic flex.",
      "It keeps the Violin's 5.3 mm thickness and 156 x 149 mm head. Nittaku rates it Mid Fast for speed and Hard for feel, and lists a weight of about 90 g.",
    ],
    facts: [],
    notes: [weightNote(90), BLADE_FEEL_NOTE],
    sources: [violinCarbon],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 FE Carbon",
    fibers: ["carbon"],
    fiberName: "FE Carbon",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 5.3,
    weightG: { min: 90 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-septear",
    brandId: "nittaku",
    name: "Septear",
    manufacturerRatings: [
      { label: "Speed", value: "Mid" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply blade made entirely of natural Kiso hinoki, aimed by Nittaku at players developing an all-round attacking game.",
    description: [
      "The Septear is a seven-ply all-wood blade in which every ply is natural Kiso hinoki (Japanese cypress), made in Japan. It measures 6.7 mm thick with a 157 x 150 mm head and weighs about 85 g.",
      "Nittaku pitches it at players learning a range of strokes, from short play to flat hitting and topspin, and says it offers seven-ply power at an average weight, with a balance of attack and defence. It rates the blade Mid for speed and Hard for feel.",
    ],
    facts: [
      {
        text: "All seven plies of the Septear are natural Kiso hinoki, according to Nittaku.",
        source: septear.url,
      },
      {
        text: "Nittaku says the hinoki comes from the Kiso region of Nagano Prefecture, selected from trees averaging 250 years old.",
        source: septear.url,
      },
    ],
    notes: [weightNote(85), BLADE_FEEL_NOTE],
    sources: [septear],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7 ply, all natural Kiso hinoki",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Kiso hinoki",
    thicknessMm: 6.7,
    weightG: { min: 85 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-latika",
    brandId: "nittaku",
    name: "Latika",
    manufacturerRatings: [
      { label: "Speed", value: "Mid" },
      { label: "Feel", value: "Middle" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply all-wood blade that Nittaku describes as control-oriented, based on its Kasumi Basic with a slightly larger head.",
    description: [
      "The Latika is a five-ply all-wood blade made in China. Nittaku says it is based on its Kasumi Basic blade, with the head enlarged slightly to 158 x 152 mm to make blocking and attacking more stable.",
      "Nittaku describes it as a high-control blade for improving players and those looking for a balance of attack and defence. It rates it Mid for speed and Middle for feel, and lists 5.8 mm thickness and about 88 g.",
    ],
    facts: [
      {
        text: "Nittaku prints the Japanese phrase 為せば成る (roughly, \"where there's a will, there's a way\") on the Latika's blade.",
        source: latika.url,
      },
    ],
    notes: [
      weightNote(88),
      "Nittaku posted a country-of-origin change notice for the Latika on 29 November 2023, with changed stock shipping from that date; it currently lists China as the country of origin.",
      BLADE_FEEL_NOTE,
    ],
    sources: [latika],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5 wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.8,
    weightG: { min: 88 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "China",
  },
  {
    id: "nittaku-hina-hayata-h2",
    brandId: "nittaku",
    name: "Hina Hayata H2",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Middle" },
    ],
    releaseYear: null,
    status: "current",
    summary: "Hina Hayata's signature 5+2 blade with Nittaku's PKC (Kevlar and carbon) composite placed on the inside.",
    description: [
      "The Hina Hayata H2 is a Japanese-made signature blade named after Japanese player Hina Hayata. It has five wood plies plus two plies of PKC, Nittaku's combination of Kevlar and carbon, placed on the inner side next to the core.",
      "Nittaku describes a soft feel that gives clear feedback for delicate touch, with the high-modulus PKC adding power while keeping the character of the wood. It rates the blade Mid Fast for speed and Middle for feel, and lists 5.8 mm thickness, a 158 x 152 mm head and about 88 g.",
    ],
    facts: [
      {
        text: "PKC, the composite in the Hina Hayata H2, is Nittaku's combination of Kevlar and carbon.",
        source: hayataH2.url,
      },
    ],
    notes: [weightNote(88), "Nittaku notes the blade is not eligible for its custom racket service.", BLADE_FEEL_NOTE],
    sources: [hayataH2],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 PKC",
    fibers: ["aramid-carbon"],
    fiberName: "PKC (Kevlar® + Carbon)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.8,
    weightG: { min: 88 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-mima-ito-carbon",
    brandId: "nittaku",
    name: "Mima Ito Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Fast" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "Nittaku's Mima Ito signature edition of the Acoustic Carbon, a 5+2 outer FE Carbon blade made in Japan.",
    description: [
      "The Mima Ito Carbon is the Mima Ito model of the Acoustic Carbon. Like the Acoustic Carbon, it combines the five-ply Acoustic with two plies of FE Carbon placed close to the outer veneers.",
      "Its listed specifications match the Acoustic Carbon: 5.5 mm thick, a 157 x 150 mm head, about 90 g, rated Mid Fast for speed and Hard for feel. It is sold in flared and straight handles.",
    ],
    facts: [
      {
        text: "Nittaku describes the Mima Ito Carbon as the Mima Ito model of the Acoustic Carbon, named after the Japanese player.",
        source: mimaItoCarbon.url,
      },
    ],
    notes: [weightNote(90), "Nittaku notes the blade is not eligible for its custom racket service.", BLADE_FEEL_NOTE],
    sources: [mimaItoCarbon],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 FE Carbon",
    fibers: ["carbon"],
    fiberName: "FE Carbon",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 5.5,
    weightG: { min: 90 },
    handles: ["FL", "ST"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-tribus-carbon",
    brandId: "nittaku",
    name: "Tribus Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "Mid" },
      { label: "Feel", value: "Hard" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 blade with ultra-thin outer carbon that Nittaku pitches as a first carbon blade, designed to keep a wood-like feel and control.",
    description: [
      "The Tribus Carbon is a Japanese-made blade with five wood plies and two plies of what Nittaku calls ultra-thin carbon (極薄カーボン), placed on the outer side. Nittaku says the relatively light, thin carbon keeps the feel of the wood and puts the emphasis on control across the whole blade face.",
      "It is 6.4 mm thick with a 157 x 150 mm head and weighs about 85 g. Nittaku rates it Mid for speed and Hard for feel, sells it with a flared handle in three handle colours, and recommends it for players stepping up to a carbon blade.",
    ],
    facts: [],
    notes: [weightNote(85), BLADE_FEEL_NOTE],
    sources: [tribusCarbon],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 wood + 2 ultra-thin carbon",
    fibers: ["carbon"],
    fiberName: "Ultra-thin carbon (極薄カーボン)",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 6.4,
    weightG: { min: 85 },
    handles: ["FL"],
    manufacturerClass: "Offensive",
    madeIn: "Japan",
  },
  {
    id: "nittaku-goriki-super-cut",
    brandId: "nittaku",
    name: "Goriki Super Cut",
    manufacturerRatings: [
      { label: "Speed", value: "Mid Slow" },
      { label: "Feel", value: "Soft" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A heavy, thin 7-ply all-wood defensive blade from Nittaku's Goriki series, made in Japan.",
    description: [
      "The Goriki Super Cut (剛力スーパーカット) is a seven-ply all-wood shakehand blade made in Japan, which Nittaku classes as a defensive (守備用) blade. Nittaku says it uses the same plywood as its Goriki blade.",
      "Nittaku describes a heavyweight blade with a distinctive flex that produces well-controlled, sharp chops, and says it can still deliver strong smashes when counter-attacking. It lists a 165 x 156 mm head, 4.9 mm thickness and a weight of about 105 g, and rates it Mid Slow for speed and Soft for feel.",
    ],
    facts: [
      {
        text: "Nittaku says the Goriki Super Cut uses the same plywood as its Goriki (剛力) blade.",
        source: gorikiSuperCut.url,
      },
    ],
    notes: [
      weightNote(105),
      "Nittaku Japan lists only the flared (FL) handle, 100 x 24 mm.",
      "Nittaku notes the blade is not eligible for its custom racket service.",
      BLADE_FEEL_NOTE,
    ],
    sources: [gorikiSuperCut, shakeHandList],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7 wood",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 4.9,
    weightG: { min: 105 },
    handles: ["FL"],
    manufacturerClass: "Defensive",
    madeIn: "Japan",
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const fastarcG1 = nittakuRubber("post-3", "ファスターク G-1 (Fastarc G-1)");
const fastarcC1 = nittakuRubber("post-4", "ファスターク C-1 (Fastarc C-1)");
const fastarcS1 = nittakuRubber("post-5", "ファスターク S-1 (Fastarc S-1)");
const hammondZ2 = nittakuRubber("post-62-2", "ハモンド Z2 (Hammond Z2)");
const genextion = nittakuRubber("post-66", "ジェネクション (Genextion)");
const genextionV2c = nittakuRubber("post-71", "ジェネクション V2C (Genextion V2C)");
const flyattSpin = nittakuRubber("post-9", "フライアット スピン (Flyatt Spin)");
const factive = nittakuRubber("post-1", "ファクティブ (Factive)");
const moristoSp = nittakuRubber("post-30", "モリストSP (Moristo SP)");
const moristoSpAx = nittakuRubber("post-29", "モリストSP AX (Moristo SP AX)");
const moristoDf = nittakuRubber("post-6", "モリスト DF (Moristo DF)");

const doKnuckle = nittakuRubber("post-33", "ドナックル（表ソフト） (Do Knuckle, sponged)");
const pimplesOutList: Source = {
  url: "https://www.nittaku.com/products/rubbers/pimples-out/",
  label: "Nittaku (official, Japan): pimples-out (表ソフト) rubber list",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const nittakuDe = (handle: string, label: string): Source => ({
  url: `https://nittaku.tt/products/${handle}`,
  label: `Nittaku Deutschland (nittaku.tt, states it is an official Nittaku dealer since 2012): ${label}`,
  kind: "retailer",
  accessed: ACCESSED,
});
const hammondZ2De = nittakuDe("nittaku-hammond-z2", "Nittaku Hammond Z2");
const flyattSpinDe = nittakuDe("flyatt-spin", "Nittaku Flyatt Spin");

const hammondZ2Pp: Source = {
  url: "https://www.paddlepalace.com/products/nittaku-hammond-z2-rubber",
  label: "Paddle Palace: Nittaku Hammond Z2",
  kind: "retailer",
  accessed: ACCESSED,
};
const flyattSpinPp: Source = {
  url: "https://www.paddlepalace.com/Nittaku-Flyatt-Spin/productinfo/RNFLN/",
  label: "Paddle Palace: Nittaku Flyatt Spin",
  kind: "retailer",
  accessed: ACCESSED,
};

export const rubbers: Rubber[] = [
  {
    id: "nittaku-fastarc-g-1",
    brandId: "nittaku",
    name: "Fastarc G-1",
    manufacturerRatings: [
      { label: "Speed", value: 15.0 },
      { label: "Spin", value: 12.5 },
    ],
    releaseYear: 2010,
    status: "current",
    summary: "A German-made tension rubber that Nittaku positions as the spin-and-drive model of its Fastarc series.",
    description: [
      "Fastarc G-1 is a tension (テンション系) inverted rubber made in Germany. Nittaku presents it as the spin-drive-focused member of the Fastarc series.",
      "Nittaku says its tension spin sheet has densely packed pimples and strong grip that keep power in rallies, and that its \"strong sponge\" gives a hard hitting feel while holding the ball. The sponge is 47.5 by the German standard (37.5 on Nittaku's Japanese scale).",
    ],
    facts: [
      {
        text: "Nittaku says the Fastarc name combines \"Fast\" (speed) and \"Arc\", for the arcing ball trajectory it was designed to produce.",
        source: fastarcG1.url,
      },
    ],
    notes: [
      germanHardnessNote("37.5", "47.5"),
      thicknessNote("中, 厚, 特厚 and MAX"),
      RATING_NOTE,
      "Release year: Nittaku's product page quotes Kasumi Ishikawa saying she has used Fastarc G-1 since its release in November 2010.",
    ],
    sources: [fastarcG1, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "esn" },
    spongeThicknesses: [T.middle, T.thick, T.superThick, T.max],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-fastarc-c-1",
    brandId: "nittaku",
    name: "Fastarc C-1",
    manufacturerRatings: [
      { label: "Speed", value: 15.25 },
      { label: "Spin", value: 12.25 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The balanced, softer-sponge model of Nittaku's German-made Fastarc tension series.",
    description: [
      "Fastarc C-1 is a tension inverted rubber made in Germany. Nittaku positions it for rallies that balance spin and speed, citing stable short play, counter-attacks and two-winged topspin.",
      "Its sponge is softer than the G-1's, at 45.0 by the German standard (35.0 on Nittaku's Japanese scale).",
    ],
    facts: [],
    notes: [germanHardnessNote("35.0", "45.0"), thicknessNote("中, 厚 and 特厚"), RATING_NOTE],
    sources: [fastarcC1, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, scale: "esn" },
    spongeThicknesses: [T.middle, T.thick, T.superThick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-fastarc-s-1",
    brandId: "nittaku",
    name: "Fastarc S-1",
    manufacturerRatings: [
      { label: "Speed", value: 15.5 },
      { label: "Spin", value: 11.75 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The speed-and-hitting model of Nittaku's German-made Fastarc tension series.",
    description: [
      "Fastarc S-1 is a tension inverted rubber made in Germany. Nittaku positions it for speed and smashes: flat hitting close to and slightly back from the table, and fast topspin out of blocks.",
      "It has the highest Speed and lowest Spin figure of the three Fastarc models covered here, and a 45.0 sponge by the German standard (35.0 on Nittaku's Japanese scale).",
    ],
    facts: [],
    notes: [germanHardnessNote("35.0", "45.0"), thicknessNote("中, 厚 and 特厚"), RATING_NOTE],
    sources: [fastarcS1, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, scale: "esn" },
    spongeThicknesses: [T.middle, T.thick, T.superThick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-hammond-z2",
    brandId: "nittaku",
    name: "Hammond Z2",
    manufacturerRatings: [
      { label: "Speed", value: 16.0 },
      { label: "Spin", value: 13.0 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made inverted rubber with a red \"Bulkhead\" sponge and a high-natural-rubber topsheet, in Nittaku's ZC category.",
    description: [
      "Hammond Z2 is an inverted rubber made in Japan. Nittaku files it under its own ZC (Z-Charge) category and says its sponge reduces energy loss while strengthening rebound.",
      "Its red Bulkhead Sponge has strong cell walls, which Nittaku says cut energy loss, and its Natural Rich Sheet has a high natural rubber content and a dense topsheet that Nittaku says keeps the ball from dropping even on thin contact. The sponge is 40.0 on Nittaku's Japanese scale. A rubber protector sheet is included.",
    ],
    facts: [
      {
        text: "Nittaku presents Hammond Z2 as the first new rubber in its Hammond line in 13 years.",
        source: hammondZ2.url,
      },
    ],
    notes: [
      "Type: Nittaku classifies Hammond Z2 as ZC (Z-Charge), its own category, rather than テンション系 (tension). It is listed here as tensor based on Paddle Palace, which gives its rubber tech as \"Tension\".",
      "Nittaku Japan gives only a Japanese-scale hardness (40.0). Nittaku Deutschland (nittaku.tt, a dealer) lists 50°, but Nittaku itself does not publish a German-standard figure for this rubber.",
      thicknessNote("中, 厚, 特厚 and MAX"),
      RATING_NOTE,
    ],
    sources: [hammondZ2, RUBBER_GUIDE, LARC, hammondZ2De, hammondZ2Pp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, scale: "japanese" },
    spongeThicknesses: [T.middle, T.thick, T.superThick, T.max],
    spongeColor: "Red",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "nittaku-genextion",
    brandId: "nittaku",
    name: "Genextion",
    manufacturerRatings: [
      { label: "Speed", value: 16.5 },
      { label: "Spin", value: 13.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A hard, German-made tension rubber whose topsheet geometry Nittaku places between German and Chinese styles.",
    description: [
      "Genextion is a tension inverted rubber made in Germany. Nittaku says its topsheet has a thick rubber layer with short pimples, a shape between typical German and Chinese rubbers, which it says pairs a lively tension feel with stability.",
      "Nittaku says the sponge is about 11% more energy-efficient than its earlier sponges and, despite its high hardness, plays with a soft feel. The sponge is 52.5 by the German standard (42.5 on Nittaku's Japanese scale), and it is sold only in thick and super-thick sponges.",
    ],
    facts: [
      {
        text: "Nittaku says Genextion's sponge is about 11% more energy-efficient than its conventional sponges.",
        source: genextion.url,
      },
    ],
    notes: [germanHardnessNote("42.5", "52.5"), thicknessNote("厚 and 特厚"), RATING_NOTE],
    sources: [genextion, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 52.5, scale: "esn" },
    spongeThicknesses: [T.thick, T.superThick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-genextion-v2c",
    brandId: "nittaku",
    name: "Genextion V2C",
    manufacturerRatings: [
      { label: "Speed", value: 16.0 },
      { label: "Spin", value: 14.0 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A slightly tacky version of Genextion on the same hard German-made tension sponge.",
    description: [
      "Genextion V2C is a German-made tension rubber with a slightly tacky (微粘着) topsheet. Nittaku says the tack is tuned to give the ball a moderate contact time, making the rubber less affected by an opponent's spin and easier to control in short play.",
      "Nittaku also says it allows quality counters taken early and produces a ball that sinks. Compared with Genextion it has a lower Speed and higher Spin figure; the sponge hardness is the same, 52.5 by the German standard (42.5 on Nittaku's Japanese scale).",
    ],
    facts: [],
    notes: [
      "Type: Nittaku classes Genextion V2C as テンション系 (tension) and describes its topsheet as 微粘着 (slightly tacky); it is listed here as a hybrid.",
      germanHardnessNote("42.5", "52.5"),
      thicknessNote("厚 and 特厚"),
      RATING_NOTE,
    ],
    sources: [genextionV2c, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: 52.5, scale: "esn" },
    spongeThicknesses: [T.thick, T.superThick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-flyatt-spin",
    brandId: "nittaku",
    name: "Flyatt Spin",
    manufacturerRatings: [
      { label: "Speed", value: 14.25 },
      { label: "Spin", value: 12.25 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made, spin-oriented inverted rubber in Nittaku's AC (Active Charge) category.",
    description: [
      "Flyatt Spin is an inverted rubber made in Japan. Nittaku classifies it as AC (Active Charge), which its rubber guide describes as drawing out the rubber's natural elasticity and giving the sheet and sponge a taut feel, as distinct from its tension category.",
      "Nittaku aims it at players who want to win points with spin, such as topspin and chiquita, and says the natural-rubber topsheet is strengthened at a molecular level for grip and is less prone to chipping at the edges. The sponge is 35.0 on Nittaku's Japanese scale.",
    ],
    facts: [],
    notes: [
      "Type: Nittaku classifies Flyatt Spin as AC (Active Charge), a separate category from tension (テンション) in its rubber guide, and Paddle Palace gives its rubber tech as \"Classic\"; it is listed here as a classic inverted rubber.",
      "Nittaku Japan gives only a Japanese-scale hardness (35.0). Nittaku Deutschland (nittaku.tt, a dealer) lists about 45°, but Nittaku itself does not publish a German-standard figure for this rubber.",
      thicknessNote("中, 厚 and 特厚"),
      RATING_NOTE,
    ],
    sources: [flyattSpin, RUBBER_GUIDE, LARC, flyattSpinDe, flyattSpinPp],
    lastVerified: ACCESSED,
    type: "classic",
    tackiness: null,
    hardness: { min: 35, scale: "japanese" },
    spongeThicknesses: [T.middle, T.thick, T.superThick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Japan",
  },
  {
    id: "nittaku-factive",
    brandId: "nittaku",
    name: "Factive",
    manufacturerRatings: [
      { label: "Speed", value: 14.75 },
      { label: "Spin", value: 11.75 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A German-made tension rubber that Nittaku aims at players who build attacks from serve, receive and short play.",
    description: [
      "Factive is a tension inverted rubber made in Germany. Nittaku emphasises its grip on the ball and says it supports basic techniques such as sharp serves and a receive that holds the ball.",
      "Nittaku recommends it for players who want to take the initiative over the table and turn it into attack. The sponge is 45.0 by the German standard (35.0 on Nittaku's Japanese scale).",
    ],
    facts: [],
    notes: [germanHardnessNote("35.0", "45.0"), thicknessNote("中, 厚 and 特厚"), RATING_NOTE],
    sources: [factive, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, scale: "esn" },
    spongeThicknesses: [T.middle, T.thick, T.superThick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-moristo-sp",
    brandId: "nittaku",
    name: "Moristo SP",
    manufacturerRatings: [
      { label: "Speed", value: 12.5 },
      { label: "Spin", value: 7.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "Nittaku's long-selling German-made short-pips tension rubber, with vertically oriented pimples.",
    description: [
      "Moristo SP is a short-pimples-out tension rubber made in Germany, with pimples oriented vertically (縦目). Nittaku calls it a long seller among its pimples-out rubbers.",
      "Nittaku describes fast, straight shots with a sharp ball, contrasted with natural knuckle variation and dead blocks. The sponge is 40.0 by the German standard (30.0 on Nittaku's Japanese scale).",
    ],
    facts: [],
    notes: [
      germanHardnessNote("30.0", "40.0"),
      thicknessNote("中, 厚, 特厚 and MAX"),
      RATING_NOTE,
      "Nittaku Japan shows no ITTF approval number for Moristo SP; it appears on the ITTF LARC (1 January 2026) without a code.",
    ],
    sources: [moristoSp, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 40, scale: "esn" },
    spongeThicknesses: [T.middle, T.thick, T.superThick, T.max],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: { note: "Vertical pimple orientation (縦目), per Nittaku." },
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-moristo-sp-ax",
    brandId: "nittaku",
    name: "Moristo SP AX",
    manufacturerRatings: [
      { label: "Speed", value: 13.0 },
      { label: "Spin", value: 8.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A grippier, horizontally oriented short-pips version of Moristo SP, made in Germany.",
    description: [
      "Moristo SP AX is a short-pimples-out tension rubber made in Germany, with pimples oriented horizontally (横目), unlike the vertical pimples of Moristo SP.",
      "Nittaku describes it as a pimples-out rubber that \"bites\" the ball on topspin and pushes, with a feel closer to an inverted rubber and blocks that don't lose pace. It has higher Speed and Spin figures than Moristo SP and the same sponge hardness, 40.0 by the German standard (30.0 on Nittaku's Japanese scale).",
    ],
    facts: [],
    notes: [germanHardnessNote("30.0", "40.0"), thicknessNote("中, 厚, 特厚 and MAX"), RATING_NOTE],
    sources: [moristoSpAx, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 40, scale: "esn" },
    spongeThicknesses: [T.middle, T.thick, T.superThick, T.max],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: { note: "Horizontal pimple orientation (横目), per Nittaku." },
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-moristo-df",
    brandId: "nittaku",
    name: "Moristo DF",
    manufacturerRatings: [
      { label: "Speed", value: 11.75 },
      { label: "Spin", value: 11.0 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A German-made tension inverted rubber designed by Nittaku for defenders who chop.",
    description: [
      "Moristo DF is a tension inverted rubber made in Germany that Nittaku describes as a rubber for chopping. It pairs a high-spin topsheet with a soft sponge, which Nittaku says produces stable chops while still giving good control when attacking.",
      "Nittaku recommends it for players who want to balance attack and defence. The sponge is 40.0 by the German standard (30.0 on Nittaku's Japanese scale), and it is sold in thin, middle and thick sponges.",
    ],
    facts: [],
    notes: [
      germanHardnessNote("30.0", "40.0"),
      thicknessNote("薄, 中 and 厚"),
      RATING_NOTE,
      "Nittaku Japan shows no ITTF approval number for Moristo DF; it appears on the ITTF LARC (1 January 2026) without a code.",
    ],
    sources: [moristoDf, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, scale: "esn" },
    spongeThicknesses: [T.thin, T.middle, T.thick],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "nittaku-do-knuckle",
    brandId: "nittaku",
    name: "Do Knuckle",
    manufacturerRatings: [
      { label: "Speed", value: 7.5 },
      { label: "Spin", value: 6.0 },
      { label: "Variation", value: 11.75 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Japanese-made pimples-out rubber with pimples shaped close to long pips, which Nittaku files under its variation (変化系) category for knuckle balls.",
    description: [
      "Do Knuckle (ドナックル) is a pimples-out rubber made in Japan, listed by Nittaku under 表ソフト (short pimples-out) and its 変化系 (variation) category, which its rubber guide describes as rubbers that make irregular balls such as knuckle easy to produce. Nittaku says the pimple shape is close to that of long pimples, with the pimples arranged vertically (縦目).",
      "Nittaku describes it as combining a long-pips-style knuckle ball with the attacking ability of a pimples-out rubber, and says it catches the ball well on pushes and chops so players can vary their returns. It suggests the middle sponge on a shakehand backhand for variation attacks and the ultra-thin sponge for the back of a penhold racket, twiddling or choppers, and calls the Goriki blade series a best match. The sponge is 32.5 on Nittaku's Japanese scale.",
    ],
    facts: [],
    notes: [
      "Type: Nittaku lists Do Knuckle under 表ソフト (pimples-out, not its 粒高 long-pimples category) and describes the pimple shape as close to long pimples; it is listed here as short pips.",
      "Nittaku Japan gives only a Japanese-scale hardness (32.5) and no German-standard figure.",
      "Nittaku Japan sells this rubber in the thickness classes 超極薄, 極薄 and 中. Its rubber guide defines 超極薄 (ultra super thin) as 0.4–0.7 mm, 極薄 (super thin) as 0.9–1.2 mm and 中 (middle) as 1.4–1.7 mm; those ranges are shown here.",
      "Variation (変化) is Nittaku's own rating; its rubber guide says a higher number means variation comes more easily.",
      RATING_NOTE,
      "Nittaku also sells Do Knuckle as a topsheet-only (表一枚, OX) version under the same ITTF number 54-032, with Speed 7.00, Spin 6.00 and Variation 12.25; that version is not covered by this entry.",
    ],
    sources: [doKnuckle, pimplesOutList, RUBBER_GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 32.5, scale: "japanese" },
    spongeThicknesses: ["0.4–0.7", "0.9–1.2", T.middle],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: { note: "Vertical pimple orientation (縦目); Nittaku describes the pimple shape as close to long pimples." },
    ittfApproved: true,
    madeIn: "Japan",
  },
];
