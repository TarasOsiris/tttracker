import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** JOOLA Germany's own shop (English version of joola.de). */
const joolaDe = (handle: string, label: string): Source => ({
  url: `https://joola.de/en/products/${handle}`,
  label: `JOOLA Germany (joola.de): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** JOOLA USA's own shop. */
const joolaUs = (handle: string, label: string): Source => ({
  url: `https://joola.com/products/${handle}`,
  label: `JOOLA USA (joola.com): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const megaspin = (pid: string, label: string): Source => ({
  url: `https://www.megaspin.net/store/default.asp?pid=${pid}`,
  label: `Megaspin: ${label}`,
  kind: "retailer",
  accessed: ACCESSED,
});

/** English Newsbook 2026, linked from joola.de/en/pages/catalogs. Spec tables for rubbers (p. 50) and blades (p. 58). */
const NEWSBOOK: Source = {
  url: "https://www.yumpu.com/de/document/read/71100897/joola-newsbook-2026-en",
  label: "JOOLA Newsbook 2026 (English catalogue linked from joola.de/en/pages/catalogs), rubber and blade spec tables",
  kind: "manufacturer",
  accessed: ACCESSED,
};

/** German Equipment Guide 2026/27, linked from joola.de/pages/kataloge. Spec tables for rubbers (p. 18) and blades (p. 32). */
const GUIDE: Source = {
  url: "https://www.yumpu.com/de/document/read/71287377/joola-equipment-guide-2026-de",
  label: "JOOLA Equipment Guide 2026/27 (German catalogue linked from joola.de/pages/kataloge), rubber and blade spec tables",
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

/** Megaspin's Dynaryz AGR page states that JOOLA's Premium line rubbers are designed and manufactured in Germany. */
const premiumMadeIn = megaspin("j-dynaryz-agr", "JOOLA Dynaryz AGR (states JOOLA's Premium line rubbers are designed and manufactured in Germany)");

const MAX_PLUS_NOTE =
  "joola.de's thickness selector labels the thickest option \"max\", while its spec table and JOOLA's 2026 catalogues list \"max+\"; JOOLA USA sells it as \"MAX\".";

export const brand: Brand = {
  id: "joola",
  name: "JOOLA",
  country: "Germany",
  website: "https://joola.de/en",
  ratingNote:
    "JOOLA Germany rates blades for Speed, Control, Precision, Hardness and Flexibility and rubbers for Speed, Spin, Flight curve and Precision; it does not state the top of the scale, and some rubbers score 11 or 12.",
  hardnessScale: "unstated",
  logo: { src: "/equipment/brands/joola.svg", width: 500, height: 158, sourceUrl: "https://joola.de/en", credit: "Logo © JOOLA" },
  sources: [
    {
      url: "https://joola.de/en",
      label: "JOOLA Germany: official site and shop",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "https://joola.com/",
      label: "JOOLA USA: official site and shop",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "https://joola.de/en/pages/catalogs",
      label: "JOOLA Germany: catalogues page",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const aryCDe = joolaDe("joola-blade-hugo-calderano-ary-c", "Hugo Calderano ARY-c");
const aryCUs = joolaUs("joola-hugo-calderano-ary-c", "Hugo Calderano ARY-C");
const aryXDe = joolaDe("joola-blade-hugo-calderano-ary-x", "Hugo Calderano ARY-x");
const aryXUs = joolaUs("joola-hugo-calderano-ary-x", "Hugo Calderano ARY-X");
const freezeHrdDe = joolaDe("joola-wood-vyzaryz-freeze-hrd", "Vyzaryz Freeze HRD");
const freezeHrdUs = joolaUs("vyzaryz-freeze-hrd-table-tennis-blade", "Vyzaryz Freeze HRD Table Tennis Blade");
const freezeHrdMega = megaspin("j-vyzaryz-freeze-hrd", "JOOLA Vyzaryz Freeze HRD");
const vyzTrinityUs = joolaUs("vyzaryz-trinity-table-tennis-blade", "Vyzaryz Trinity Table Tennis Blade");
const vyzTrinityMega = megaspin("j-vyzaryz-trinity", "JOOLA Vyzaryz Trinity");
const klcInnerDe = joolaDe("joola-blade-hugo-calderano-kl-c-inner", "Hugo Calderano KL-c Inner");
const klcInnerUs = joolaUs("joola-hugo-calderano-kl-c-inner-table-tennis-blade", "Hugo Calderano KL-c Inner Table Tennis Blade");
const klcInnerMega = megaspin("j-calderano-kl-c-i", "JOOLA Hugo Calderano KL-c Inner");
const klcOuterUs = joolaUs("joola-hugo-calderano-kl-c-outer-table-tennis-blade", "Hugo Calderano KL-c Outer Table Tennis Blade");
const klcOuterMega = megaspin("j-calderano-kl-c-o", "JOOLA Hugo Calderano KL-c Outer");
const hcAw7De = joolaDe("joola-hugo-calderano-kl-c-aw-7", "Hugo Calderano AW-7");
const hcAw7Us = joolaUs("joola-hugo-calderano-aw-7-table-tennis-blade", "Hugo Calderano AW-7 Table Tennis Blade");
const hcAw7Mega = megaspin("j-calderano-aw-7", "JOOLA Hugo Calderano AW-7");
const oneDe = joolaDe("joola-wood-proline-one", "PROline ONE");
const oneUs = joolaUs("joola-proline-one-table-tennis-blade", "PROline One Table Tennis Blade");
const oacDe = joolaDe("joola-wood-proline-oac", "PROline OAC");
const oacUs = joolaUs("joola-proline-oac-table-tennis-blade", "PROline OAC Table Tennis Blade");
const iacDe = joolaDe("joola-wood-proline-iac", "PROline IAC");
const iacUs = joolaUs("joola-proline-iac-table-tennis-blade", "PROline IAC Table Tennis Blade");
const aw7De = joolaDe("joola-wood-proline-aw7", "PROline AW7");
const aw7Us = joolaUs("joola-proline-aw7-table-tennis-blade", "PROline AW7 Table Tennis Blade");
const warriorDe = joolaDe("joola-wood-tezzo-warrior", "Tezzo Warrior");
const warriorUs = joolaUs("tezzo-warrior-table-tennis-blade", "Tezzo Warrior Table Tennis Blade");
const warriorMega = megaspin("j-tezzo-warrior", "JOOLA Tezzo Warrior");
const cwxBladeDe = joolaDe("joola-chen-weixing-wood", "Chen Weixing Defender");
const cwxBladeUs = joolaUs("chen-weixing-table-tennis-blade", "CWX Table Tennis Blade");

export const blades: Blade[] = [
  {
    id: "joola-hugo-calderano-ary-c",
    brandId: "joola",
    name: "Hugo Calderano ARY-c",
    aliases: ["Hugo Calderano ARY-C"],
    manufacturerRatings: [
      { label: "Speed", value: 9 },
      { label: "Control", value: 8 },
      { label: "Precision", value: 9 },
      { label: "Hardness", value: 7 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner-fibre offensive blade from JOOLA's Hugo Calderano range, with ARY-c fibre under limba outer plies.",
    description: [
      "The Hugo Calderano ARY-c pairs limba outer plies with two layers of JOOLA's ARY-c fibre placed on the inner side, close to the core. JOOLA lists it at 6 mm thick and 88 g ±3 g, in flared and straight handles.",
      "JOOLA describes the inner-fibre build as keeping the short game controlled while still giving strong acceleration on full attacking strokes, with a large sweet spot. JOOLA's 2026 catalogues list it in the Pro line with the ARY-x and the Vyzaryz Freeze HRD.",
    ],
    facts: [
      {
        text: "JOOLA USA says the blade combines an Italian-made handle with Korean manufacturing.",
        source: aryCUs.url,
      },
    ],
    notes: [
      "joola.de's German spec table, JOOLA USA and both 2026 catalogues give a limba outer ply; the English joola.de spec table lists koto, which looks like a translation error.",
      "Weight as stated by JOOLA USA: 88 g ±3 g.",
    ],
    photo: { src: "/equipment/photos/blades/joola-hugo-calderano-ary-c.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-blade-hugo-calderano-ary-c", credit: "© JOOLA" },
    sources: [aryCDe, aryCUs, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 inner",
    fibers: ["arylate-carbon"],
    fiberName: "ARY-c",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: 6,
    weightG: { min: 85, max: 91 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: "South Korea",
  },
  {
    id: "joola-hugo-calderano-ary-x",
    brandId: "joola",
    name: "Hugo Calderano ARY-x",
    aliases: ["Hugo Calderano ARY-X"],
    manufacturerRatings: [
      { label: "Speed", value: 9 },
      { label: "Control", value: 9 },
      { label: "Precision", value: 9 },
      { label: "Hardness", value: 7 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 offensive blade with JOOLA's carbon-free ARY-x fibre directly under koto outer plies.",
    description: [
      "The Hugo Calderano ARY-x places JOOLA's ARY-x fibre, which JOOLA says contains no carbon, directly beneath koto outer plies. JOOLA lists it at 5.8 mm and 85 g ±3 g, in flared and straight handles.",
      "JOOLA describes it as combining the feel of an all-wood blade with the stability of a composite, aimed at attackers who build points through placement and consistency. JOOLA USA adds that it is forgiving and pairs well with harder, faster rubbers.",
    ],
    facts: [
      {
        text: "JOOLA describes ARY-x as a carbon-free synthetic fibre, unlike the ARY-c used in the sister ARY-c blade.",
        source: NEWSBOOK.url,
      },
    ],
    notes: ["Weight as stated by JOOLA USA: 85 g ±3 g."],
    photo: { src: "/equipment/photos/blades/joola-hugo-calderano-ary-x.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-blade-hugo-calderano-ary-x", credit: "© JOOLA" },
    sources: [aryXDe, aryXUs, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 outer",
    fibers: ["other"],
    fiberName: "ARY-x",
    fiberPosition: "outer",
    outerWood: "Koto",
    thicknessMm: 5.8,
    weightG: { min: 82, max: 88 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-vyzaryz-freeze-hrd",
    brandId: "joola",
    name: "Vyzaryz Freeze HRD",
    manufacturerRatings: [
      { label: "Speed", value: 9 },
      { label: "Control", value: 7 },
      { label: "Precision", value: 9 },
      { label: "Hardness", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A koto-faced 5+2 outer ARY-c offensive blade, the harder successor to JOOLA's Vyzaryz Freeze.",
    description: [
      "The Vyzaryz Freeze HRD puts JOOLA's ARY-c fibre directly under koto outer plies, a classic outer-carbon construction. JOOLA's catalogues list it at 5.7 mm.",
      "JOOLA says its \"Cold Cured\" process softens the hard shell of this construction, giving a firm but sensitive touch that makes it controllable for a wider range of players. JOOLA presents it as the successor to the original Vyzaryz Freeze, which uses a limba outer ply.",
    ],
    facts: [
      {
        text: "JOOLA USA says its Premium Line blades use composite materials made in Japan and handles from Italy, with assembly in South Korea.",
        source: freezeHrdUs.url,
      },
    ],
    notes: [
      "JOOLA's catalogues list flared and straight handles; joola.de and JOOLA USA also sell a penhold version, which Megaspin lists as Chinese penhold.",
      "Weight: joola.de's spec table gives a net weight of 0.085 kg and Megaspin lists 85 g; JOOLA's product descriptions don't state a weight.",
    ],
    photo: { src: "/equipment/photos/blades/joola-vyzaryz-freeze-hrd.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-wood-vyzaryz-freeze-hrd", credit: "© JOOLA" },
    sources: [freezeHrdDe, freezeHrdUs, NEWSBOOK, GUIDE, freezeHrdMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 outer",
    fibers: ["arylate-carbon"],
    fiberName: "ARY-c",
    fiberPosition: "outer",
    outerWood: "Koto",
    thicknessMm: 5.7,
    weightG: { min: 85 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: null,
    madeIn: "South Korea",
  },
  {
    id: "joola-vyzaryz-trinity",
    brandId: "joola",
    name: "Vyzaryz Trinity",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 limba blade built around JOOLA's X3 weave of PBO-c and ARY-c fibres.",
    description: [
      "The Vyzaryz Trinity uses what JOOLA calls X3: a composite in which PBO-c fibres run in one direction and ARY-c fibres in the other. Limba outer plies sit on top of this 5+2 construction.",
      "JOOLA describes the weave as combining power and force with feel and accuracy. It belongs to JOOLA's Premium Line of blades.",
    ],
    facts: [
      {
        text: "JOOLA USA calls the X3 weave a JOOLA first, made by weaving horizontal PBO-c layers with vertical ARY-c layers.",
        source: vyzTrinityUs.url,
      },
    ],
    notes: [
      "On 3 October 2026 JOOLA USA listed only a penhold version, without saying whether it is a Chinese or Japanese penhold, and the blade is not in JOOLA's 2026 catalogues; Megaspin listed it as out of stock without handle options. No handle type is recorded.",
      "Weight from Megaspin (90 g); JOOLA doesn't publish thickness or weight on its current page.",
    ],
    photo: { src: "/equipment/photos/blades/joola-vyzaryz-trinity.webp", width: 800, height: 800, sourceUrl: "https://joola.com/products/vyzaryz-trinity-table-tennis-blade", credit: "© JOOLA" },
    sources: [vyzTrinityUs, vyzTrinityMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["zylon-carbon", "arylate-carbon"],
    fiberName: "X3 (PBO-c and ARY-c weave)",
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: null,
    weightG: { min: 90 },
    handles: [],
    manufacturerClass: null,
    madeIn: "South Korea",
  },
  {
    id: "joola-hugo-calderano-kl-c-inner",
    brandId: "joola",
    name: "Hugo Calderano KL-c Inner",
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Control", value: 7 },
      { label: "Precision", value: 7 },
      { label: "Hardness", value: 7 },
      { label: "Flexibility", value: 5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner aramid-carbon (KL-c) offensive blade with limba outer plies, part of JOOLA's Hugo Calderano range.",
    description: [
      "The Hugo Calderano KL-c Inner places two layers of KL-c, JOOLA's aramid-carbon weave, on either side of an ayous core, with further ayous plies and limba on the outside. JOOLA lists it at 6 mm and around 85 g.",
      "JOOLA describes it as a low-vibration, spin-friendly attacking blade with a stable catapult on active strokes, rated at OFF speed by JOOLA USA. Its outer-fibre counterpart is the Hugo Calderano KL-c Outer.",
    ],
    facts: [
      {
        text: "JOOLA describes KL-c as its own hybrid weave of aramid and carbon fibres, combining carbon's stiffness with aramid's vibration damping.",
        source: klcInnerUs.url,
      },
    ],
    notes: ["JOOLA's catalogues list flared and straight handles; JOOLA USA also sells a penhold version, listed by Megaspin as Chinese penhold."],
    photo: { src: "/equipment/photos/blades/joola-hugo-calderano-kl-c-inner.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-blade-hugo-calderano-kl-c-inner", credit: "© JOOLA" },
    sources: [klcInnerDe, klcInnerUs, NEWSBOOK, GUIDE, klcInnerMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 inner",
    plyOrder: ["Limba", "Ayous", "KL-c", "Ayous", "KL-c", "Ayous", "Limba"],
    fibers: ["aramid-carbon"],
    fiberName: "KL-c",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: 6,
    weightG: { min: 85 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-hugo-calderano-kl-c-outer",
    brandId: "joola",
    name: "Hugo Calderano KL-c Outer",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 outer aramid-carbon (KL-c) offensive blade with koto outer plies, part of JOOLA's Hugo Calderano range.",
    description: [
      "The Hugo Calderano KL-c Outer places JOOLA's KL-c aramid-carbon fibre directly beneath koto outer plies, over limba and a kiri core. JOOLA's German catalogue lists it at 5.8 mm.",
      "JOOLA USA describes it as faster and crisper than the KL-c Inner, at OFF+ speed, for fast rallies, counter-loops and drives from mid-distance.",
    ],
    facts: [
      {
        text: "JOOLA USA gives the full ply order: koto, KL-c, limba, kiri, limba, KL-c, koto.",
        source: klcOuterUs.url,
      },
    ],
    notes: [
      "JOOLA's German catalogue lists flared and straight handles; JOOLA USA also sells a penhold version, listed by Megaspin as Chinese penhold.",
      "JOOLA doesn't publish a weight for this blade.",
    ],
    photo: { src: "/equipment/photos/blades/joola-hugo-calderano-kl-c-outer.webp", width: 800, height: 800, sourceUrl: "https://joola.com/products/joola-hugo-calderano-kl-c-outer-table-tennis-blade", credit: "© JOOLA" },
    sources: [klcOuterUs, GUIDE, klcOuterMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 outer",
    plyOrder: ["Koto", "KL-c", "Limba", "Kiri", "Limba", "KL-c", "Koto"],
    fibers: ["aramid-carbon"],
    fiberName: "KL-c",
    fiberPosition: "outer",
    outerWood: "Koto",
    thicknessMm: 5.8,
    weightG: null,
    handles: ["FL", "ST", "CS"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-hugo-calderano-aw-7",
    brandId: "joola",
    name: "Hugo Calderano AW-7",
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Control", value: 8 },
      { label: "Precision", value: 7 },
      { label: "Hardness", value: 6 },
      { label: "Flexibility", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade from JOOLA's Hugo Calderano range, with limba outer plies and an ayous core.",
    description: [
      "The Hugo Calderano AW-7 is a seven-ply all-wood blade combining several limba plies with ayous and blue ayous in the core. JOOLA's catalogues list it at 6.8 mm.",
      "JOOLA describes it as soft on contact with long dwell time and high spin potential, with linear, predictable speed. It is aimed at spin-oriented attackers who rely on technique and placement rather than raw speed.",
    ],
    facts: [],
    notes: [
      "JOOLA's catalogues list flared and straight handles; JOOLA USA also sells a penhold version, listed by Megaspin as Chinese penhold.",
      "Weight not shown: JOOLA's product descriptions don't state one, and joola.de's \"Net Weight\" field (0.088 kg here) also shows placeholder values on other products, so it isn't used.",
    ],
    photo: { src: "/equipment/photos/blades/joola-hugo-calderano-aw-7.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-hugo-calderano-kl-c-aw-7", credit: "© JOOLA" },
    sources: [hcAw7De, hcAw7Us, NEWSBOOK, GUIDE, hcAw7Mega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 6.8,
    weightG: null,
    handles: ["FL", "ST", "CS"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-proline-one",
    brandId: "joola",
    name: "PROline ONE",
    aliases: ["PROline One"],
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Control", value: 7 },
      { label: "Precision", value: 7 },
      { label: "Hardness", value: 7 },
      { label: "Flexibility", value: 7 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner 3K-c carbon blade with hinoki outer plies, JOOLA's successor to the Rossi Emotion.",
    description: [
      "The PROline ONE uses a thin hinoki outer ply over JOOLA's 3K-c carbon, which sits on the inner side directly over the core. JOOLA's catalogues list it at 5.8 mm, with flared, straight and anatomic handles.",
      "JOOLA describes it as soft on contact but with some sharpness and a strong speed kick, suited to players who play close to the table. JOOLA says it keeps the properties of its predecessor's construction, with a new design, a reworked handle shape and improved workmanship.",
    ],
    facts: [
      {
        text: "JOOLA presents the PROline ONE as the successor to its Rossi Emotion blade.",
        source: oneUs.url,
      },
    ],
    notes: [
      "JOOLA USA sells flared and straight handles only; the anatomic handle is listed by joola.de and JOOLA's catalogues.",
      "Weight not shown: JOOLA's product descriptions don't state one, and joola.de's \"Net Weight\" field (0.085 kg here) also shows placeholder values on other products, so it isn't used.",
    ],
    photo: { src: "/equipment/photos/blades/joola-proline-one.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-wood-proline-one", credit: "© JOOLA" },
    sources: [oneDe, oneUs, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 inner",
    fibers: ["carbon"],
    fiberName: "3K-c",
    fiberPosition: "inner",
    outerWood: "Hinoki",
    thicknessMm: 5.8,
    weightG: null,
    handles: ["FL", "ST", "AN"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-proline-oac",
    brandId: "joola",
    name: "PROline OAC",
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Control", value: 7 },
      { label: "Precision", value: 8 },
      { label: "Hardness", value: 8 },
      { label: "Flexibility", value: 5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 outer KL-c (aramid-carbon) offensive blade with limba outer plies and a kiri core.",
    description: [
      "The PROline OAC (outer aramid carbon) places JOOLA's KL-c fibre directly under limba outer plies, around a light kiri core. JOOLA lists it at 85 g and 5.6 mm.",
      "JOOLA describes the softer limba face as taking the edge off the outer-fibre layup, giving longer dwell time and a higher arc on topspins while keeping the speed of an outer composite blade.",
    ],
    facts: [],
    photo: { src: "/equipment/photos/blades/joola-proline-oac.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-wood-proline-oac", credit: "© JOOLA" },
    sources: [oacDe, oacUs, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 outer",
    fibers: ["aramid-carbon"],
    fiberName: "KL-c",
    fiberPosition: "outer",
    outerWood: "Limba",
    thicknessMm: 5.6,
    weightG: { min: 85 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-proline-iac",
    brandId: "joola",
    name: "PROline IAC",
    manufacturerRatings: [
      { label: "Speed", value: 9 },
      { label: "Control", value: 6 },
      { label: "Precision", value: 7 },
      { label: "Hardness", value: 8 },
      { label: "Flexibility", value: 6 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner KL-c (aramid-carbon) offensive blade with koto outer plies.",
    description: [
      "The PROline IAC (inner aramid carbon) combines hard koto outer plies with JOOLA's KL-c fibre placed on the inner side near the core. JOOLA lists it at 85 g and 5.4 mm.",
      "JOOLA calls the koto-over-inner-fibre pairing an unusual combination: the koto gives a direct touch while the inner fibre lets the ball sink in further, which JOOLA says makes it more forgiving than classic koto outer-carbon blades.",
    ],
    facts: [],
    photo: { src: "/equipment/photos/blades/joola-proline-iac.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-wood-proline-iac", credit: "© JOOLA" },
    sources: [iacDe, iacUs, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2 inner",
    fibers: ["aramid-carbon"],
    fiberName: "KL-c",
    fiberPosition: "inner",
    outerWood: "Koto",
    thicknessMm: 5.4,
    weightG: { min: 85 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-proline-aw7",
    brandId: "joola",
    name: "PROline AW7",
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Control", value: 7 },
      { label: "Precision", value: 8 },
      { label: "Hardness", value: 6 },
      { label: "Flexibility", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade with limba outer plies and blackened kiri inner plies, at 90 g.",
    description: [
      "The PROline AW7 is a seven-ply all-wood blade with limba and ayous outer layers around blackened kiri inner plies. JOOLA lists it at 6.9 mm and 90 g.",
      "JOOLA says it made this 7-ply design heavier and stiffer than a typical all-wood blade to add power, while keeping a high topspin arc and natural feel.",
    ],
    facts: [
      {
        text: "JOOLA USA says the two blackened kiri inner plies were added to stiffen the core and raise the blade's overall hardness.",
        source: aw7Us.url,
      },
    ],
    notes: [
      "Thickness: joola.de, JOOLA USA and the catalogue text say 6.9 mm, but the spec tables in JOOLA's Newsbook 2026 and Equipment Guide 2026/27 list 6.8 mm.",
    ],
    photo: { src: "/equipment/photos/blades/joola-proline-aw7.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-wood-proline-aw7", credit: "© JOOLA" },
    sources: [aw7De, aw7Us, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 6.9,
    weightG: { min: 90 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-tezzo-warrior",
    brandId: "joola",
    name: "Tezzo Warrior",
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Control", value: 6 },
      { label: "Precision", value: 8 },
      { label: "Hardness", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner KL-c (aramid-carbon) offensive blade with limba outer plies from JOOLA's Tezzo series.",
    description: [
      "The Tezzo Warrior combines limba outer plies with JOOLA's KL-c fibre placed on the inner side. JOOLA describes it as soft on contact with a pronounced catapult, letting the ball sink in for longer dwell time.",
      "JOOLA suggests it as a step for players moving from all-wood to composite blades, and recommends pairing it with somewhat harder rubbers.",
    ],
    facts: [],
    notes: [
      "Not listed in JOOLA's 2026 catalogues, but still sold by joola.de and JOOLA USA on 3 October 2026.",
      "joola.de and JOOLA USA also sell a penhold version without saying whether it is a Chinese or Japanese penhold, and Megaspin listed the blade as out of stock without handle options, so only flared and straight are recorded.",
      "Weight not shown: joola.de's \"Net Weight\" field (0.093 kg here) also shows placeholder values on other products, so it isn't used. JOOLA doesn't publish a thickness.",
    ],
    photo: { src: "/equipment/photos/blades/joola-tezzo-warrior.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-wood-tezzo-warrior", credit: "© JOOLA" },
    sources: [warriorDe, warriorUs, warriorMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["aramid-carbon"],
    fiberName: "KL-c",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: null,
    weightG: null,
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "joola-cwx",
    brandId: "joola",
    name: "CWX",
    aliases: ["Chen Weixing Defender", "Chen Weixing"],
    manufacturerRatings: [
      { label: "Speed", value: 4 },
      { label: "Control", value: 9 },
      { label: "Precision", value: 9 },
      { label: "Hardness", value: 5 },
      { label: "Flexibility", value: 7 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A defensive 7-ply blade with two black-cloth layers, developed with chopper Chen Weixing.",
    description: [
      "The CWX is JOOLA's defensive blade, built from limba outer plies, koto, a kiri core and two layers of black cloth. JOOLA's catalogues list it at 5.8 mm.",
      "JOOLA designed it for variable chopping defence while still allowing fast topspins, and says the black-cloth layers add control and rigidity.",
    ],
    facts: [
      {
        text: "JOOLA developed the blade with Chen Weixing, whom it calls Europe's top defensive player.",
        source: cwxBladeDe.url,
      },
    ],
    notes: [
      "JOOLA USA calls it a 5+2 ply blade and gives the order limba, koto, black cloth, kiri, black cloth, koto, limba; JOOLA's catalogues list it as 7 plies with no synthetic fibre.",
      "Weight not shown: JOOLA's product descriptions don't state one, and joola.de's \"Net Weight\" field (0.09 kg here) also shows placeholder values on other products, so it isn't used.",
    ],
    photo: { src: "/equipment/photos/blades/joola-cwx.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-chen-weixing-wood", credit: "© JOOLA" },
    sources: [cwxBladeDe, cwxBladeUs, NEWSBOOK, GUIDE],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    plyOrder: ["Limba", "Koto", "Black Cloth", "Kiri", "Black Cloth", "Koto", "Limba"],
    fibers: ["other"],
    fiberName: "Black Cloth",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: 5.8,
    weightG: null,
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: null,
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const chargedDe = joolaDe("joola-rubber-trinity-hugo-calderano-charged", "Trinity Hugo Calderano Charged");
const chargedUs = joolaUs("trinity-charged-hugo-calderano-rubber", "Trinity Charged Hugo Calderano Rubber");
const dynamicDe = joolaDe("joola-rubber-trinity-hugo-calderano-dynamic", "Trinity Hugo Calderano Dynamic");
const dynamicUs = joolaUs("trinity-dynamic-hugo-calderano-rubber", "Trinity Dynamic Hugo Calderano Rubber");
const intenseDe = joolaDe("joola-rubber-trinity-intense", "Trinity Intense");
const trinityHybridDe = joolaDe("joola-rubber-trinity-ihybrid", "Trinity Hybrid");
const infernoDe = joolaDe("joola-rubber-dynaryz-inferno", "Dynaryz Inferno");
const infernoUs = joolaUs("dynaryz-inferno-table-tennis-rubber", "Dynaryz Inferno Table Tennis Rubber");
const zgxDe = joolaDe("joola-rubber-dynaryz-zgx", "Dynaryz ZGX");
const zgrDe = joolaDe("joola-rubber-dynaryz-zgr", "Dynaryz ZGR");
const zgrUs = joolaUs("dynaryz-zgr-table-tennis-rubber", "Dynaryz ZGR Table Tennis Rubber");
const agrDe = joolaDe("joola-rubber-dynaryz-agr", "Dynaryz AGR");
const agrUs = joolaUs("dynaryz-agr-table-tennis-rubber", "Dynaryz AGR Table Tennis Rubber");
const accDe = joolaDe("joola-rubber-dynaryz-acc", "Dynaryz ACC");
const accUs = joolaUs("dynaryz-acc-table-tennis-rubber", "Dynaryz ACC Table Tennis Rubber");
const cmdDe = joolaDe("joola-rubber-dynaryz-cmd", "Dynaryz CMD");
const cmdUs = joolaUs("dynaryz-cmd-table-tennis-rubber", "Dynaryz CMD Table Tennis Rubber");
const fireDe = joolaDe("joola-rhyzen-fire-rubber", "Rhyzen FIRE");
const fireUs = joolaUs("rhyzen-fire-table-tennis-rubber", "Rhyzen FIRE Table Tennis Rubber");
const iceDe = joolaDe("joola-rubber-rhyzen-ice", "Rhyzen ICE");
const iceUs = joolaUs("rhyzen-ice-table-tennis-rubber", "Rhyzen ICE Table Tennis Rubber");
const rCmdDe = joolaDe("joola-rhyzen-cmd-rubber", "Rhyzen CMD");
const rCmdUs = joolaUs("rhyzen-cmd-table-tennis-rubber", "Rhyzen CMD Table Tennis Rubber");
const tangoDe = joolaDe("joola-rubber-tango-ultra", "Tango Ultra");
const tangoUs = joolaUs("tango-ultra-table-tennis-rubber", "Tango Ultra Short-Pips Table Tennis Rubber");
const expressDe = joolaDe("joola-rubber-express-ultra", "Express Ultra");
const expressUs = joolaUs("express-ultra-table-tennis-rubber", "Express Ultra Short-Pips Table Tennis Rubber");
const cwxDe = joolaDe("joola-rubber-cwx", "CWX");
const cwxUs = joolaUs("cwx-table-tennis-rubber", "CWX Long-Pips Table Tennis Rubber");

const rhyzenSeriesDe: Source = {
  url: "https://joola.de/en/pages/rhyzen-series",
  label: "JOOLA Germany (joola.de): Rhyzen series page",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const TRINITY_TENSOR_NOTE =
  "Recorded as tensor because JOOLA's Equipment Guide 2026/27 says the Energy X sponge raises energy return for dynamic ball acceleration and describes the Fusion X and Dynamic X topsheets as giving a catapult effect.";

const TRINITY_MAX_NOTE = "joola.de and JOOLA's 2026 catalogues list the thickest option as \"max+\"; JOOLA USA sells it as \"MAX\".";

const HYPER_BOUNCE_NOTE =
  "Recorded as tensor because JOOLA describes the Hyper Bounce sponge's strong catapult effect, its Equipment Guide 2026/27 calls it a pre-tensioned sponge, and JOOLA USA calls it a spring-loaded sponge.";

const DYNARYZ_ESN_NOTE =
  "JOOLA prints sponge degrees without naming a scale; the ESN scale is recorded because Megaspin states that JOOLA's Premium line rubbers, which include the Dynaryz series, are made in Germany.";

export const rubbers: Rubber[] = [
  {
    id: "joola-trinity-hugo-calderano-charged",
    brandId: "joola",
    name: "Trinity Hugo Calderano Charged",
    aliases: ["Trinity Charged"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The hardest model of JOOLA's Trinity series, with a 57.5° Energy X sponge, developed with Hugo Calderano.",
    description: [
      "Trinity Hugo Calderano Charged pairs JOOLA's Fusion X topsheet with a 57.5° Energy X sponge, the hardest in JOOLA's 2026 range. JOOLA calls it the flagship of the Trinity series.",
      "JOOLA describes it as very direct, with high speed and spin and precise feedback, aimed at technically strong attackers who play close to the table. The Trinity Hugo Calderano Dynamic is the softer sister model.",
    ],
    facts: [
      {
        text: "The ITTF list of authorised racket coverings registers it as \"Hugo Calderano Trinity Charged\" (approval code 40-054).",
        source: LARC.url,
      },
    ],
    notes: [
      TRINITY_TENSOR_NOTE,
      TRINITY_MAX_NOTE,
      "JOOLA prints the sponge degrees without naming a scale. JOOLA calls the Fusion X topsheet grippy but doesn't say whether it is tacky.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-trinity-hugo-calderano-charged.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-trinity-hugo-calderano-charged", credit: "© JOOLA" },
    sources: [chargedDe, chargedUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 57.5, scale: "unstated" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Black", "Red"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-trinity-hugo-calderano-dynamic",
    brandId: "joola",
    name: "Trinity Hugo Calderano Dynamic",
    aliases: ["Trinity Dynamic"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 52.5° Trinity-series offensive rubber developed with Hugo Calderano, softer than the Charged model.",
    description: [
      "Trinity Hugo Calderano Dynamic uses the same Fusion X topsheet as the Charged model on a softer 52.5° Energy X sponge.",
      "JOOLA describes it as the versatile model of the series, slightly more forgiving than the Charged, for players who switch between controlled rallies and full attacks.",
    ],
    facts: [
      {
        text: "JOOLA USA says all Trinity rubbers combine three technologies: the Energy X sponge, the Fusion X topsheet and what it calls China Intense Dynamic Geometry.",
        source: dynamicUs.url,
      },
    ],
    notes: [
      TRINITY_TENSOR_NOTE,
      TRINITY_MAX_NOTE,
      "JOOLA prints the sponge degrees without naming a scale. JOOLA calls the Fusion X topsheet grippy but doesn't say whether it is tacky.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-trinity-hugo-calderano-dynamic.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-trinity-hugo-calderano-dynamic", credit: "© JOOLA" },
    sources: [dynamicDe, dynamicUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 52.5, scale: "unstated" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Black", "Red"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-trinity-intense",
    brandId: "joola",
    name: "Trinity Intense",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A 55° Trinity-series rubber with JOOLA's Dynamic X topsheet, aimed at topspin attackers.",
    description: [
      "Trinity Intense pairs a 55° Energy X sponge with JOOLA's Dynamic X topsheet. JOOLA calls it the topspin specialist of the Trinity series.",
      "JOOLA describes it as slightly harder and more powerful than the Dynamic, with a direct feel and fast rebound.",
    ],
    facts: [],
    notes: [
      TRINITY_TENSOR_NOTE,
      "Not on the ITTF LARC of 1 January 2026, so ITTF approval is left unconfirmed; joola.de tags it as new.",
      "JOOLA prints the sponge degrees without naming a scale, and doesn't say whether the Dynamic X topsheet is tacky.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-trinity-intense.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-trinity-intense", credit: "© JOOLA" },
    sources: [intenseDe, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 55, scale: "unstated" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "joola-trinity-hybrid",
    brandId: "joola",
    name: "Trinity Hybrid",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "The control-oriented model of JOOLA's Trinity series, with a 50° Energy X sponge and Grip Pro X topsheet.",
    description: [
      "Trinity Hybrid pairs a 50° Energy X sponge with JOOLA's Grip Pro X topsheet, which JOOLA describes as very grippy.",
      "JOOLA positions it as the control model of the Trinity series, with longer dwell time for spinny topspins and openings against backspin.",
    ],
    facts: [],
    notes: [
      "Despite the name, no JOOLA page or catalogue, nor the retailer contra.de, says the Grip Pro X topsheet is tacky: JOOLA calls it very grippy and says it increases ball adhesion, wording its Equipment Guide also uses for the non-tacky Advanced Traction topsheet. Recorded as tensor because the same Guide says the Energy X sponge raises energy return for dynamic ball acceleration.",
      "Not on the ITTF LARC of 1 January 2026, so ITTF approval is left unconfirmed; joola.de tags it as new.",
      "JOOLA prints the sponge degrees without naming a scale.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-trinity-hybrid.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-trinity-ihybrid", credit: "© JOOLA" },
    sources: [
      trinityHybridDe,
      NEWSBOOK,
      GUIDE,
      LARC,
      {
        url: "https://www.contra.de/joola-belag-trinity-hybrid/",
        label: "contra.de: JOOLA Belag Trinity Hybrid",
        kind: "retailer",
        accessed: ACCESSED,
      },
    ],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50, scale: "unstated" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "joola-dynaryz-inferno",
    brandId: "joola",
    name: "Dynaryz Inferno",
    manufacturerRatings: [
      { label: "Speed", value: 12 },
      { label: "Spin", value: 10 },
      { label: "Flight curve", value: 7 },
      { label: "Precision", value: 9 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 50° Dynaryz rubber with JOOLA's pre-tensioned Kinetic Tension topsheet and the series' highest Speed rating on joola.de.",
    description: [
      "Dynaryz Inferno puts JOOLA's Kinetic Tension topsheet on the 50° Hyper Bounce sponge used across the Dynaryz series. joola.de gives it a Speed rating of 12, the highest figure on its rubber pages.",
      "JOOLA says the strong catapult suits fast, powerful topspins and opening loops, while a longer dwell time keeps it controllable despite the hard sponge.",
    ],
    facts: [
      {
        text: "JOOLA says the topsheet is so pre-tensioned that the pimples can be seen shining through it.",
        source: infernoDe.url,
      },
    ],
    notes: [
      "Recorded as tensor because JOOLA describes the Kinetic Tension topsheet as pre-tensioned and its Equipment Guide 2026/27 calls the Hyper Bounce sponge pre-tensioned.",
      MAX_PLUS_NOTE,
      DYNARYZ_ESN_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/joola-dynaryz-inferno.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-dynaryz-inferno", credit: "© JOOLA" },
    sources: [infernoDe, infernoUs, NEWSBOOK, GUIDE, LARC, premiumMadeIn],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50, scale: "esn" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Black", "Red", "Purple"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "joola-dynaryz-zgx",
    brandId: "joola",
    name: "Dynaryz ZGX",
    manufacturerRatings: [
      { label: "Speed", value: 11 },
      { label: "Spin", value: 10 },
      { label: "Flight curve", value: 9 },
      { label: "Precision", value: 10 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Dynaryz hybrid rubber with a slightly tacky Hyper Traction topsheet and a high arc.",
    description: [
      "Dynaryz ZGX combines JOOLA's slightly tacky Hyper Traction topsheet with the Hyper Bounce sponge, which JOOLA describes as joining European-style catapult with the grip of Chinese rubbers.",
      "JOOLA says its pimple geometry gives a very high arc, aimed at advanced attackers, and that it suits receive and serve play.",
    ],
    facts: [],
    notes: [
      "Hardness: JOOLA's 2026 catalogues list 53°; the joola.de product text says 52.5°.",
      "joola.de's product text calls the topsheet slightly tacky; the page's English meta description calls it extremely tacky, and JOOLA's Newsbook 2026 calls the rubber extremely grippy.",
      "Recorded as hybrid: JOOLA says it combines the catapult of European rubbers with the grip of classic Chinese rubbers, on a Hyper Bounce sponge its Equipment Guide 2026/27 calls pre-tensioned.",
      MAX_PLUS_NOTE,
      DYNARYZ_ESN_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/joola-dynaryz-zgx.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-dynaryz-zgx", credit: "© JOOLA" },
    sources: [zgxDe, NEWSBOOK, GUIDE, LARC, premiumMadeIn],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: 53, scale: "esn" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "joola-dynaryz-zgr",
    brandId: "joola",
    name: "Dynaryz ZGR",
    manufacturerRatings: [
      { label: "Speed", value: 10 },
      { label: "Spin", value: 11 },
      { label: "Flight curve", value: 8 },
      { label: "Precision", value: 10 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 56° Dynaryz hybrid rubber with a slightly tacky topsheet and a flat, fast arc.",
    description: [
      "Dynaryz ZGR combines JOOLA's slightly tacky Hyper Traction topsheet with a very hard 56° Hyper Bounce sponge. JOOLA says it resembles classic Chinese rubbers in its direct feel.",
      "JOOLA says its pimple geometry is tuned for speed, giving a flat trajectory. It recommends good timing and a fast arm because of the short dwell time.",
    ],
    facts: [
      {
        text: "JOOLA USA describes ZGR as a long-awaited fusion of a tacky, grippy surface with a spring-loaded sponge.",
        source: zgrUs.url,
      },
    ],
    notes: [MAX_PLUS_NOTE, DYNARYZ_ESN_NOTE],
    photo: { src: "/equipment/photos/rubbers/joola-dynaryz-zgr.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-dynaryz-zgr", credit: "© JOOLA" },
    sources: [zgrDe, zgrUs, NEWSBOOK, GUIDE, LARC, premiumMadeIn],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: 56, scale: "esn" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "joola-dynaryz-agr",
    brandId: "joola",
    name: "Dynaryz AGR",
    manufacturerRatings: [
      { label: "Speed", value: 11 },
      { label: "Spin", value: 10 },
      { label: "Flight curve", value: 6 },
      { label: "Precision", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 50° Dynaryz offensive rubber with JOOLA's Advanced Traction topsheet.",
    description: [
      "Dynaryz AGR pairs the Advanced Traction topsheet with a hard 50° Hyper Bounce sponge, which JOOLA says has a strong catapult despite its hardness.",
      "JOOLA describes it as a typical European attacking rubber with a hard sponge but a lively feel, suited to players with a strong arm swing, and says its pimple geometry gives a higher arc.",
    ],
    facts: [
      {
        text: "JOOLA says the Advanced Traction topsheet is designed to compensate for the spin lost with the plastic ball.",
        source: agrDe.url,
      },
    ],
    notes: [HYPER_BOUNCE_NOTE, "Megaspin lists 52.5° for this rubber; JOOLA's own pages and 2026 catalogues give 50°.", DYNARYZ_ESN_NOTE],
    photo: { src: "/equipment/photos/rubbers/joola-dynaryz-agr.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-dynaryz-agr", credit: "© JOOLA" },
    sources: [agrDe, agrUs, NEWSBOOK, GUIDE, LARC, premiumMadeIn, zgrUs],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50, scale: "esn" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black", "Purple"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "joola-dynaryz-acc",
    brandId: "joola",
    name: "Dynaryz ACC",
    manufacturerRatings: [
      { label: "Speed", value: 10 },
      { label: "Spin", value: 10 },
      { label: "Flight curve", value: 8 },
      { label: "Precision", value: 11 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The medium-hard 47.5° model of JOOLA's Dynaryz series.",
    description: [
      "Dynaryz ACC uses the Advanced Traction topsheet on a medium-hard 47.5° Hyper Bounce sponge, between the CMD and AGR in hardness.",
      "JOOLA calls it the all-in-one rubber of the series, balancing speed, spin and control, and says it reacts strongly to both soft and hard topspins.",
    ],
    facts: [],
    notes: [HYPER_BOUNCE_NOTE, DYNARYZ_ESN_NOTE],
    photo: { src: "/equipment/photos/rubbers/joola-dynaryz-acc.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-dynaryz-acc", credit: "© JOOLA" },
    sources: [accDe, accUs, NEWSBOOK, GUIDE, LARC, premiumMadeIn, zgrUs],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "esn" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black", "Purple"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "joola-dynaryz-cmd",
    brandId: "joola",
    name: "Dynaryz CMD",
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Spin", value: 10 },
      { label: "Flight curve", value: 9 },
      { label: "Precision", value: 11 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The softest model of JOOLA's Dynaryz series, with a 43° Hyper Bounce sponge.",
    description: [
      "Dynaryz CMD uses the Advanced Traction topsheet on a soft 43° Hyper Bounce sponge. JOOLA says the soft sponge gives a pronounced sound and longer dwell time.",
      "JOOLA describes it as forgiving, not demanding perfect footwork or technique, which makes it suitable for attackers who train less as well as for stronger players.",
    ],
    facts: [],
    notes: [HYPER_BOUNCE_NOTE, DYNARYZ_ESN_NOTE],
    photo: { src: "/equipment/photos/rubbers/joola-dynaryz-cmd.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-dynaryz-cmd", credit: "© JOOLA" },
    sources: [cmdDe, cmdUs, NEWSBOOK, GUIDE, LARC, premiumMadeIn, zgrUs],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 43, scale: "esn" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Purple",
    topsheetColors: ["Red", "Black", "Purple"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "joola-rhyzen-fire",
    brandId: "joola",
    name: "Rhyzen FIRE",
    aliases: ["Rhyzen Fire"],
    manufacturerRatings: [
      { label: "Speed", value: 8 },
      { label: "Spin", value: 9 },
      { label: "Flight curve", value: 7 },
      { label: "Precision", value: 9 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A medium-hard offensive rubber from JOOLA's Rhyzen series with a coarse-pored Momentum sponge.",
    description: [
      "Rhyzen FIRE pairs JOOLA's Enhanced Traction topsheet with a coarse-pored Momentum sponge. JOOLA says its Sweetzone technology enlarges the optimal hitting area for a more even rebound.",
      "JOOLA describes it as a rubber for controlled attack: lively on active strokes but calm on short play, blocks and returns.",
    ],
    facts: [],
    notes: [
      "Recorded as tensor because joola.de says the coarse-pored Momentum sponge gives a catapult effect, letting the ball sink in deeply before accelerating it powerfully.",
      "Hardness: JOOLA's 2026 catalogues list 47.5°; the joola.de product text says 45°. JOOLA prints the degrees without naming a scale.",
      MAX_PLUS_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/joola-rhyzen-fire.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rhyzen-fire-rubber", credit: "© JOOLA" },
    sources: [fireDe, fireUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "unstated" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Pink",
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-rhyzen-ice",
    brandId: "joola",
    name: "Rhyzen ICE",
    aliases: ["Rhyzen Ice"],
    manufacturerRatings: [
      { label: "Speed", value: 6 },
      { label: "Spin", value: 9 },
      { label: "Flight curve", value: 9 },
      { label: "Precision", value: 9 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A soft 40° all-round rubber from JOOLA's Rhyzen series.",
    description: [
      "Rhyzen ICE pairs the Enhanced Traction topsheet with a soft, coarse-pored 40° Momentum sponge and JOOLA's Sweetzone technology.",
      "JOOLA describes it as a modern all-round rubber focused on control and feel, calm in the short game while keeping enough energy for attacking strokes.",
    ],
    facts: [],
    notes: [
      "Recorded as tensor because joola.de says the coarse-pored Momentum sponge gives a catapult effect, letting the ball sink in deeply before accelerating it powerfully.",
      "Thicknesses: JOOLA's 2026 catalogues and joola.de's spec table list 2.0 and max+; joola.de's selector offers 1.8, 2.0 and max, and JOOLA USA sells 2.0 and MAX.",
      "JOOLA prints the degrees without naming a scale.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-rhyzen-ice.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-rhyzen-ice", credit: "© JOOLA" },
    sources: [iceDe, iceUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, scale: "unstated" },
    spongeThicknesses: ["2.0", "max+"],
    spongeColor: "Pink",
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-rhyzen-cmd",
    brandId: "joola",
    name: "Rhyzen CMD",
    manufacturerRatings: [
      { label: "Speed", value: 6 },
      { label: "Spin", value: 9 },
      { label: "Flight curve", value: 8 },
      { label: "Precision", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A controlled all-round rubber from JOOLA's Rhyzen series with a Balance sponge.",
    description: [
      "Rhyzen CMD pairs the Enhanced Traction topsheet with JOOLA's Balance sponge and Sweetzone technology.",
      "JOOLA describes it as built on control, with restrained rebound on passive strokes and returns, while still letting the player switch to attack.",
    ],
    facts: [],
    notes: [
      "Recorded as tensor because JOOLA says its Balance sponge has a built-in tensor effect (Express Ultra page and Equipment Guide 2026/27) and gives Rhyzen CMD high inherent dynamics for attacking (Rhyzen series page). The Equipment Guide's sponge legend also calls the Balance sponge classically fine-pored.",
      "Hardness: JOOLA's 2026 catalogues list 43°; the joola.de product text says 45°. JOOLA prints the degrees without naming a scale.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-rhyzen-cmd.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rhyzen-cmd-rubber", credit: "© JOOLA" },
    sources: [rCmdDe, rCmdUs, NEWSBOOK, GUIDE, LARC, rhyzenSeriesDe, expressDe],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 43, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Pink",
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-tango-ultra",
    brandId: "joola",
    name: "Tango Ultra",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A short-pips rubber on a soft Balance sponge with built-in tension, aimed at blockers and all-round players.",
    description: [
      "Tango Ultra is a short-pips rubber on JOOLA's soft Balance sponge with a built-in tensor effect.",
      "JOOLA says the sponge absorbs energy on passive blocks to slow the ball, but releases it on active blocks and attacks. JOOLA USA says it was developed with short-pips blockers in mind; JOOLA's Express Ultra is the short-pips model aimed at attackers.",
    ],
    facts: [],
    notes: [
      "Hardness: JOOLA's 2026 catalogues list 35°; the joola.de product text says 37.5°. JOOLA prints the degrees without naming a scale.",
      "Sponge colour: JOOLA's 2026 catalogues list yellow; joola.de's spec table lists cream.",
    ],
    photo: { src: "/equipment/photos/rubbers/joola-tango-ultra.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-tango-ultra", credit: "© JOOLA" },
    sources: [tangoDe, tangoUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 35, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Yellow",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-express-ultra",
    brandId: "joola",
    name: "Express Ultra",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "An offensive short-pips rubber on a soft 37° Balance sponge with built-in tension.",
    description: [
      "Express Ultra is a short-pips rubber on JOOLA's soft 37° Balance sponge with a built-in tensor effect.",
      "JOOLA aims it at attacking short-pips players, saying it stays calm on soft strokes but accelerates the ball strongly on attacking strokes, allowing sudden changes of pace.",
    ],
    facts: [],
    notes: ["JOOLA prints the degrees without naming a scale."],
    photo: { src: "/equipment/photos/rubbers/joola-express-ultra.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-express-ultra", credit: "© JOOLA" },
    sources: [expressDe, expressUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 37, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Cream",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "joola-cwx",
    brandId: "joola",
    name: "CWX",
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A long-pips defensive rubber developed with Chen Weixing, sold without sponge or on a hard 50° sponge.",
    description: [
      "CWX is JOOLA's long-pips rubber for defenders, sold without sponge (OX) or on a hard 50° Momentum sponge in 0.5 and 0.9 mm.",
      "JOOLA says the narrow, flexible pimple necks with a grippy micro-structure allow heavy backspin and spin variation when chopping, and that the rubber keeps a flat trajectory.",
    ],
    facts: [
      {
        text: "JOOLA developed CWX together with defender Chen Weixing.",
        source: cwxDe.url,
      },
    ],
    notes: ["JOOLA prints the degrees without naming a scale."],
    photo: { src: "/equipment/photos/rubbers/joola-cwx.webp", width: 800, height: 800, sourceUrl: "https://joola.de/en/products/joola-rubber-cwx", credit: "© JOOLA" },
    sources: [cwxDe, cwxUs, NEWSBOOK, GUIDE, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 50, scale: "unstated" },
    spongeThicknesses: ["OX", "0.5", "0.9"],
    spongeColor: "Pink",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
];
