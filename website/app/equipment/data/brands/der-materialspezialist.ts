import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** A product page on der-materialspezialist's own shop (English). */
const dms = (path: string, label: string): Source => ({
  url: `https://www.der-materialspezialist.com/en/Rubbers/der-materialspezialist/${path}.html`,
  label: `der-materialspezialist: ${label}`,
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
  url: "https://www.der-materialspezialist.com/en/About-us:_:23.html",
  label: "der-materialspezialist: About us",
  kind: "manufacturer",
  accessed: ACCESSED,
};

export const brand: Brand = {
  id: "der-materialspezialist",
  name: "Der Materialspezialist",
  country: "Germany",
  website: "https://www.der-materialspezialist.com",
  ratingNote:
    "der-materialspezialist rates rubbers with numbers for Speed and Control plus Spin or Disruptive effect, with no stated maximum (some values exceed 100), and gives hardness as a word grade such as \"Medium\".",
  hardnessScale: null,
  sources: [about],
};

export const blades: Blade[] = [];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const spinfire = dms("Short-pimples/SPINFIRE::201", "Spinfire");
const spectre = dms("Long-pimples/SPECTRE::200", "Spectre");
const hallucination = dms("Long-pimples/HALLUCINATION::235", "Hallucination");
const fakir = dms("Long-pimples/FAKIR::213", "Fakir");
const elimination = dms("Long-pimples/ELIMINATION-EXTRA-LONG::78", "Elimination Extra Long");
const ttrKiller = dms("Anti-Top/TTR-KILLER::207", "TTR-Killer");

export const rubbers: Rubber[] = [
  {
    id: "der-materialspezialist-spinfire",
    brandId: "der-materialspezialist",
    name: "Spinfire",
    manufacturerRatings: [
      { label: "Speed", value: 114 },
      { label: "Control", value: 92 },
      { label: "Spin", value: 89 },
      { label: "Hardness", value: "Medium / Hard" },
      { label: "Characteristics", value: "Allround / Offensive" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A short-pimple rubber that der-materialspezialist describes as very fast and designed to play closer to an inverted rubber, sold in six colours.",
    description: [
      "Spinfire is a short-pimple rubber that der-materialspezialist says was developed to offer properties comparable to a pimples-in rubber while keeping the disruptive effect of short pimples. The maker credits its closely spaced pimple heads for the spin it generates on serves and attacks.",
      "der-materialspezialist describes a very high speed and a flat trajectory, and says even inverted-rubber players can adapt to it after a short period. It is sold without sponge (OX) or with 1.5, 1.8 or 2.1 mm sponge.",
      "Softer and \"Extrem\" variants of Spinfire are sold as separate products.",
    ],
    facts: [
      {
        text: "der-materialspezialist says Spinfire uses the same rubber compound as its Firestorm short-pimple rubber.",
        source: spinfire.url,
      },
    ],
    sources: [spinfire, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "1.5", "1.8", "2.1"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue", "Purple", "Pink"],
    pips: { note: "der-materialspezialist describes closely arranged short pimple heads; no dimensions are published." },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "der-materialspezialist-spectre",
    brandId: "der-materialspezialist",
    name: "Spectre",
    manufacturerRatings: [
      { label: "Speed", value: 35 },
      { label: "Control", value: 96 },
      { label: "Disruptive effect", value: 105 },
      { label: "Hardness", value: "Medium-" },
      { label: "Characteristics", value: "Defensive / Allround" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber that der-materialspezialist aims at disruptive blocking close to the table, sold OX or with 0.5 or 1.0 mm sponge in six colours.",
    description: [
      "Spectre is a long-pimple rubber with what der-materialspezialist calls an entirely new pimple structure and a unique rubber compound. The maker aims it at disruptive play near the table with occasional mid-distance rallies.",
      "der-materialspezialist says the compound slows the ball when blocking hard loops and hits, producing a low, wobbling return, and that the sponge versions add power and spin. It recommends mounting the OX version with a DK-4 adhesive foil.",
    ],
    facts: [],
    sources: [spectre, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.5", "1.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue", "Purple", "Pink"],
    pips: {
      note: "der-materialspezialist says Spectre uses the maximum permissible pimple length; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "der-materialspezialist-hallucination",
    brandId: "der-materialspezialist",
    name: "Hallucination",
    manufacturerRatings: [
      { label: "Speed", value: 38 },
      { label: "Speed OX", value: 29 },
      { label: "Control", value: 102 },
      { label: "Disruptive effect", value: 106 },
      { label: "Hardness", value: "Soft+" },
      { label: "Characteristics", value: "Defensive / Allround / Offensive" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber with a soft topsheet compound that der-materialspezialist says slows the ball, sold OX or with 0.7 mm sponge.",
    description: [
      "Hallucination is a long-pimple rubber with a soft, elastic rubber compound that der-materialspezialist says cushions the ball for short, sharply dropping blocks.",
      "The maker attributes its low sensitivity to incoming spin to smooth pimple stems, and says its grippy pimple heads make the ball dive sharply and dart away unexpectedly on attacking strokes. According to der-materialspezialist, the 0.7 mm sponge version pairs the soft topsheet with a medium-hard sponge, which it says adds speed at a slight cost in control.",
    ],
    facts: [],
    notes: [
      "der-materialspezialist sells Hallucination in red, black, green and blue; the ITTF list (LARC 2026) also lists pink and violet topsheets.",
    ],
    sources: [hallucination, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.7"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue"],
    pips: {
      note: "der-materialspezialist describes smooth pimple stems and grippy pimple heads; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "der-materialspezialist-fakir",
    brandId: "der-materialspezialist",
    name: "Fakir",
    manufacturerRatings: [
      { label: "Speed", value: 38 },
      { label: "Control", value: 98 },
      { label: "Disruptive effect", value: 106 },
      { label: "Hardness", value: "Medium" },
      { label: "Characteristics", value: "Defensive / Allround / Offensive" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber whose pimple height and aspect ratio der-materialspezialist says sit at the upper permitted limit, sold in six colours.",
    description: [
      "Fakir is a long-pimple rubber for which der-materialspezialist says both the aspect ratio (pimple length to diameter) and the overall height sit at the upper limit of what is permitted.",
      "The maker describes it as insensitive to incoming spin in defence thanks to its rubber compound, with strong flutter effects on aggressive strokes. It is sold OX or with 1.0 mm sponge, and der-materialspezialist recommends mounting both with a DK-4 adhesive foil.",
    ],
    facts: [
      {
        text: "der-materialspezialist says Fakir is available in all topsheet colours approved by the ITTF.",
        source: fakir.url,
      },
    ],
    sources: [fakir, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "1.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue", "Purple", "Pink"],
    pips: {
      note: "der-materialspezialist says the aspect ratio and total height are at the upper permitted limit; no figures are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "der-materialspezialist-elimination-extra-long",
    brandId: "der-materialspezialist",
    name: "Elimination Extra Long",
    manufacturerRatings: [
      { label: "Speed", value: 38 },
      { label: "Control", value: 93 },
      { label: "Disruptive effect", value: 105 },
      { label: "Hardness", value: "Medium+" },
      { label: "Characteristics", value: "Defensive / Allround" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber that der-materialspezialist says fully uses the ITTF limits, aimed at close-to-table blocking and classic defence.",
    description: [
      "Elimination Extra Long is a long-pimple rubber that der-materialspezialist says fully uses the limits of the ITTF regulations. The maker describes a high disruptive effect and high rotation values.",
      "der-materialspezialist pitches it for disruptive blocking close to the table and for classic defence, says its relatively soft pimples also allow attacking strokes, and attributes its slowness and control to a new rubber compound. It is sold in red and black, OX or with 0.5 or 1.0 mm sponge.",
    ],
    facts: [],
    sources: [elimination, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.5", "1.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    pips: {
      note: "der-materialspezialist says the ITTF limits are fully used and describes the pimples as relatively soft; no dimensions are published.",
    },
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "der-materialspezialist-ttr-killer",
    brandId: "der-materialspezialist",
    name: "TTR-Killer",
    manufacturerRatings: [
      { label: "Speed", value: 89 },
      { label: "Control", value: 94 },
      { label: "Disruptive effect", value: 97 },
      { label: "Hardness", value: "Medium" },
      { label: "Characteristics", value: "Defensive / Allround / Offensive" },
    ],
    releaseYear: null,
    status: "current",
    summary: "An anti-spin rubber that der-materialspezialist says uses a very thin topsheet with long inward pimples, sold with 1.4, 1.7 or 2.0 mm sponge.",
    description: [
      "TTR-Killer is an anti-spin rubber that der-materialspezialist says combines anti-spin and long-pimple properties, using an extremely thin topsheet with very long pimples facing inward.",
      "The maker describes a flat trajectory with a ball that dives strongly, and says it is insensitive to spin. It recommends the thinner sponges for close-to-table play and classic defence and the thicker ones for offensive play.",
    ],
    facts: [],
    sources: [ttrKiller, LARC],
    lastVerified: ACCESSED,
    type: "anti",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.4", "1.7", "2.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green"],
    ittfApproved: true,
    madeIn: null,
  },
];
