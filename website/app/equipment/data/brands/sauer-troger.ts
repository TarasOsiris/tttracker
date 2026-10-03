import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** A product page on Sauer & Tröger's own shop (English). */
const st = (handle: string, label: string): Source => ({
  url: `https://www.sauer-troeger.com/en/products/${handle}`,
  label: `Sauer & Tröger: ${label}`,
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

const about: Source = {
  url: "https://www.sauer-troeger.com/en/pages/ueber-uns",
  label: "Sauer & Tröger: About Us",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const comparison: Source = {
  url: "https://www.sauer-troeger.com/en/pages/noppen-vergleich",
  label: "Sauer & Tröger: Pimples comparison",
  kind: "manufacturer",
  accessed: ACCESSED,
};

export const brand: Brand = {
  id: "sauer-troger",
  name: "Sauer & Tröger",
  country: "Germany",
  website: "https://www.sauer-troeger.com",
  ratingNote:
    "Sauer & Tröger rates its rubbers with numbers for Pace (Tempo), Control and Disruptive effect, with no stated maximum (some values exceed 100), plus a worded sponge hardness and game system.",
  hardnessScale: null,
  logo: { src: "/equipment/brands/sauer-troger.webp", width: 300, height: 118, sourceUrl: "https://www.sauer-troeger.com", credit: "Logo © Sauer & Tröger" },
  sources: [about],
};

export const blades: Blade[] = [];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const hellfire = st("hellfire", "Hellfire");
const hellfireX = st("hellfire-x", "Hellfire X");
const schmerz = st("schmerz-1", "Schmerz (Pain)");
const monkey = st("monkey", "Monkey");
const hipster = st("hipster-1", "Hipster");
const hass = st("hass", "Hass (Hatred)");

export const rubbers: Rubber[] = [
  {
    id: "sauer-troger-hellfire",
    brandId: "sauer-troger",
    name: "Hellfire",
    manufacturerRatings: [
      { label: "Pace", value: 40 },
      { label: "Control", value: 97 },
      { label: "Disruptive effect", value: 102 },
      { label: "Game system", value: "all-round" },
      { label: "Sponge Hardness", value: "Medium" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The predecessor of Hellfire X, a long-pimple rubber whose widely spaced, stiff pimples Sauer & Tröger says put heavy backspin on defensive strokes.",
    description: [
      "Hellfire is a long-pimple rubber whose pimples, according to Sauer & Tröger, are set noticeably far apart and have wide, slightly roughened, stiff heads. The maker says this converts the speed of the incoming ball into backspin, so chops and blocks come back with a lot of cut.",
      "Sauer & Tröger writes that Hellfire combines a dangerous surface with moderate speed thanks to a new rubber compound and pimple geometry, and that the hard pimples also allow solid attacking strokes straight after the bounce. Its shop currently sells it only without sponge (OX), in red and black.",
    ],
    facts: [
      {
        text: "Sauer & Tröger was founded by long-pimple players Sebastian Sauer and Pascal Tröger; the company says Sauer had the idea of developing his own long-pimple rubber in 2010, after the ITTF ban on smooth pimples in 2008.",
        source: about.url,
      },
    ],
    notes: [
      "The Hellfire product page shows Control 97 and Disruptive effect 102; Sauer & Tröger's pimples comparison page shows Tempo 40, Control 95 and Disruptive effect 90. The product page values are shown.",
      "The shop sells Hellfire only as OX. The product text still recommends a version with 0.9 mm sponge, and the pimples comparison page lists OX/0.5 mm; neither sponge version is offered in the shop.",
    ],
    photo: { src: "/equipment/photos/rubbers/sauer-troger-hellfire.webp", width: 800, height: 800, sourceUrl: "https://www.sauer-troeger.com/en/products/hellfire", credit: "© Sauer & Tröger" },
    sources: [hellfire, comparison, about, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: {
      note: "Sauer & Tröger describes widely spaced pimples with wide, slightly roughened, hard heads; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "sauer-troger-hellfire-x",
    brandId: "sauer-troger",
    name: "Hellfire X",
    aliases: ["Hellfire-X"],
    manufacturerRatings: [
      { label: "Pace", value: 42 },
      { label: "Control", value: 95 },
      { label: "Disruptive effect", value: 105 },
      { label: "Sponge Hardness", value: "Medium" },
      { label: "Game system", value: "DEF + / ALL" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The successor to Hellfire, a long-pimple rubber whose pimples Sauer & Tröger describes as high-aspect-ratio and widely spaced, sold OX or with 0.5 or 1.2 mm sponge.",
    description: [
      "Hellfire X is a long-pimple rubber developed from Hellfire. Sauer & Tröger describes pimples with a high aspect ratio, wide spacing, smooth necks and wide, slightly roughened heads that feel hard under light pressure and give way under higher pressure.",
      "The maker says the pimples slow the incoming ball and return it with backspin, so defensive balls carry a lot of cut, and that the OX version plays significantly differently from the sponge versions.",
    ],
    facts: [
      {
        text: "Sauer & Tröger says the Hellfire X test phase lasted three years and was run with experienced pimple players under the direction of Sebastian Sauer.",
        source: hellfireX.url,
      },
    ],
    notes: [
      "Red and black are sold OX or with 0.5 or 1.2 mm sponge; purple, green and blue are sold as OX only.",
      "The ITTF list (LARC 2026) lists Hellfire-X topsheets in black, green, red and violet; blue is not listed there.",
      "The English shop shows the blue option as \"Blau\".",
    ],
    photo: { src: "/equipment/photos/rubbers/sauer-troger-hellfire-x.webp", width: 800, height: 800, sourceUrl: "https://www.sauer-troeger.com/en/products/hellfire-x", credit: "© Sauer & Tröger" },
    sources: [hellfireX, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.5", "1.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Purple", "Green", "Blue"],
    pips: {
      note: "Sauer & Tröger describes a high aspect ratio, wide spacing, smooth necks and slightly roughened heads; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "sauer-troger-schmerz",
    brandId: "sauer-troger",
    name: "Schmerz",
    aliases: ["Pain"],
    manufacturerRatings: [
      { label: "Pace", value: 43 },
      { label: "Control", value: 94 },
      { label: "Disruptive effect", value: 100 },
      { label: "Game system", value: "Allround - / Allround" },
      { label: "Sponge Hardness", value: "Medium +" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber that Sauer & Tröger describes as having tightly packed, thin, soft pimples, sold OX or with 0.5 mm sponge.",
    description: [
      "Schmerz (German for \"pain\") is a long-pimple rubber with what Sauer & Tröger describes as tightly packed pimple heads, pimples thinner than on other rubbers, and a pleasantly soft rubber mix.",
      "The maker pitches it for blocking and chopping with a lot of spin and disruption, and says the soft topsheet also allows topspin strokes. It is sold in red and black, OX or with an ultra-thin 0.5 mm sponge that Sauer & Tröger says dampens hard attacking balls.",
    ],
    facts: [],
    photo: { src: "/equipment/photos/rubbers/sauer-troger-schmerz.webp", width: 539, height: 540, sourceUrl: "https://www.sauer-troeger.com/en/products/schmerz-1", credit: "© Sauer & Tröger" },
    sources: [schmerz, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.5"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: {
      note: "Sauer & Tröger describes tightly packed, comparatively thin, soft pimples; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "sauer-troger-monkey",
    brandId: "sauer-troger",
    name: "Monkey",
    manufacturerRatings: [
      { label: "Pace", value: 44 },
      { label: "Control", value: 94 },
      { label: "Disruptive effect", value: 105 },
      { label: "Sponge Hardness", value: "Medium" },
      { label: "Game system", value: "DEF+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber whose pimples Sauer & Tröger describes as high-aspect-ratio and widely spaced, sold OX or with a 0.6 mm dampening sponge in red, black and blue.",
    description: [
      "Monkey is a long-pimple rubber whose pimples Sauer & Tröger describes as having a high aspect ratio and wide spacing, fairly smooth necks and wide, slightly roughened heads that feel medium-hard under light pressure and softer under higher pressure.",
      "The maker says the sponge version uses a new dampening sponge and suggests it as an alternative for players who have used OX. It is sold in red, black and blue, OX or with 0.6 mm sponge.",
    ],
    facts: [],
    photo: { src: "/equipment/photos/rubbers/sauer-troger-monkey.webp", width: 800, height: 800, sourceUrl: "https://www.sauer-troeger.com/en/products/monkey", credit: "© Sauer & Tröger" },
    sources: [monkey, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.6"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    pips: {
      note: "Sauer & Tröger describes a high aspect ratio, wide spacing, fairly smooth necks and slightly roughened heads; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "sauer-troger-hipster",
    brandId: "sauer-troger",
    name: "Hipster",
    manufacturerRatings: [
      { label: "Pace", value: 91 },
      { label: "Control", value: 82 },
      { label: "Disruptive effect", value: 89 },
      { label: "Game system", value: "Allround + / Offensive -" },
      { label: "Sponge Hardness", value: "Hard -" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A half-long (medium) pimple rubber meant to sit between short and long pimples, sold with 1.1, 1.5 or 1.9 mm sponge.",
    description: [
      "Hipster is a half-long pimple rubber. Sauer & Tröger describes cylindrical pimples at moderate spacing with narrow necks, which it says produce backspin on blocks similar to classic long pimples.",
      "The maker presents it as combining short- and long-pimple characteristics, and says the thinner the sponge, the more it behaves like a long pimple, and the thicker, the more like a short pimple. It is sold in red and black.",
    ],
    facts: [],
    photo: { src: "/equipment/photos/rubbers/sauer-troger-hipster.webp", width: 539, height: 540, sourceUrl: "https://www.sauer-troeger.com/en/products/hipster-1", credit: "© Sauer & Tröger" },
    sources: [hipster, LARC],
    lastVerified: ACCESSED,
    type: "medium-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.1", "1.5", "1.9"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: {
      note: "Sauer & Tröger describes cylindrical pimples at moderate spacing with narrow necks; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "sauer-troger-hass",
    brandId: "sauer-troger",
    name: "Hass",
    aliases: ["Hatred"],
    manufacturerRatings: [
      { label: "Pace", value: 96 },
      { label: "Control", value: 92 },
      { label: "Disruptive effect", value: 83 },
      { label: "Game system", value: "ALL + / OFF" },
      { label: "Sponge Hardness", value: "Medium" },
    ],
    releaseYear: null,
    status: "current",
    summary: "An offensive short-pimple rubber whose pimples Sauer & Tröger describes as cylindrical and soft, sold with 1.5, 1.8 or 2.1 mm sponge.",
    description: [
      "Hass (German for \"hatred\") is an offensive short-pimple rubber. Sauer & Tröger describes cylindrical pimples of equal diameter from neck to head, slightly longer, narrower and further apart than on its Zargus, and soft to the touch.",
      "The maker pitches it at attacking short-pimple players, describing a built-in speed-glue effect and strong counter-spin over the table, and recommends thinner sponge for more control. It is sold in red and black.",
    ],
    facts: [],
    photo: { src: "/equipment/photos/rubbers/sauer-troger-hass.webp", width: 539, height: 540, sourceUrl: "https://www.sauer-troeger.com/en/products/hass", credit: "© Sauer & Tröger" },
    sources: [hass, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.5", "1.8", "2.1"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: {
      note: "Sauer & Tröger describes cylindrical pimples of equal diameter from neck to head; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
];
