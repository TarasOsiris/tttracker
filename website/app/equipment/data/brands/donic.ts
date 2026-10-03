import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** Product page on donic.com (English shop). */
const dn = (path: string, label: string): Source => ({
  url: `https://www.donic.com/en/${path}`,
  label: `DONIC: ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** DONIC's 2026/27 English catalogue (PDF behind the online catalogue on donic.com). */
const CATALOGUE_PDF = "https://www.donic.com/media/Blaetterkataloge/DONIC/EN/blaetterkatalog/pdf/complete.pdf";
const cat = (page: number): Source => ({
  url: `${CATALOGUE_PDF}#page=${page}`,
  label: `DONIC catalogue 2026/27 (English), page ${page}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const tt11 = (slug: string, label: string): Source => ({
  url: `https://tabletennis11.com/en/${slug}`,
  label: `Tabletennis11: ${label}`,
  kind: "retailer",
  accessed: ACCESSED,
});

const megaspin = (pid: string, label: string): Source => ({
  url: `https://www.megaspin.net/store/default.asp?pid=${pid}`,
  label: `Megaspin: ${label}`,
  kind: "retailer",
  accessed: ACCESSED,
});

const FIBERS_GLOSSARY: Source = {
  url: "https://www.donic.com/en/shop-service/glossary-donic-synthetic-fibers/",
  label: "DONIC: Glossary of DONIC synthetic fibres",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const RUBBER_GLOSSARY: Source = {
  url: "https://www.donic.com/en/shop-service/glossary-rubber-technologies/",
  label: "DONIC: Glossary of rubber technologies",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const BLUEFIRE_SERIES = dn("donic-rubber-series-bluefire", "BLUEFIRE M series technology page");
const BLUEGRIP_SERIES = dn("donic-rubber-series-bluegrip", "BLUEGRIP J series technology page");
const BLUESTORM_SERIES = dn("donic-rubber-series-bluestorm", "BLUESTORM Z series technology page");

/** ITTF List of Authorized Racket Coverings valid from 1 January 2026 (copy published by the Hessian TT association). */
const LARC: Source = {
  url: "https://www.httv.de/media/000/Schiedsrichter/Material_SR-Einsatz/Zulassungslisten/LARC/ITTF/2026/Equipment_RacketCovering_1January2026_1118.pdf",
  label: "ITTF LARC (List of Authorized Racket Coverings), 1 January 2026",
  kind: "ittf",
  accessed: ACCESSED,
};

const SENSO_NOTE =
  "SENSO is DONIC's handle construction with hollow spaces milled into the handle; DONIC's catalogue says SENSO V1 is tuned for speed, V2 for control and V3 is a defensive version.";

const PENHOLDER_NOTE =
  "DONIC's catalogue marks this blade as also available as a penholder, without saying which penhold handle style; donic.com sells the shakehand handles listed here.";

const RATING_NOTE_BLADE = "Control and Speed are the marks printed in DONIC's 2026/27 catalogue; DONIC does not state the top of the scale.";
const RATING_NOTE_RUBBER = "Control, Speed and Spin are the marks printed in DONIC's 2026/27 catalogue; DONIC does not state the top of the scale.";

const HARDNESS_SCALE_NOTE =
  "DONIC prints the sponge hardness in degrees but does not say which hardness scale it uses, so no hardness band is derived from it.";

export const brand: Brand = {
  id: "donic",
  name: "DONIC",
  country: "Germany",
  website: "https://www.donic.com",
  ratingNote:
    "DONIC's catalogue rates blades for Control and Speed and rubbers for Control, Speed and Spin with marks such as 7+, 10- or 10++, without stating the top of the scale; its shop pages also give a playing class such as \"OFF, OFF +\".",
  hardnessScale: null,
  logo: { src: "/equipment/brands/donic.svg", width: 370, height: 98, sourceUrl: "https://commons.wikimedia.org/wiki/File:DONIC_Logo.svg", credit: "Logo © DONIC (Wikimedia Commons, CC BY-SA 4.0)" },
  sources: [
    {
      url: "https://www.donic.com/en/donicfamily/about-us/",
      label: "DONIC: About us (founded in Cologne by Dr. Georg Nicklas; headquarters in Völklingen, Germany)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    { ...cat(2), label: "DONIC catalogue 2026/27 (English), page 2: blade technology overview" },
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const otcDn = dn("DONIC-ORIGINAL-TRUE-CARBON/110265010", "ORIGINAL TRUE CARBON");
const otcTt11 = tt11("donic-ovtcharov-true-carbon", "Donic Original True Carbon");
const otcMega = megaspin("d-original-true-carbon", "Donic Original True Carbon");

const otciDn = dn("DONIC-ORIGINAL-TRUE-CARBON-INNER/110291010", "ORIGINAL TRUE CARBON INNER");
const otciTt11 = tt11("donic-original-true-carbon-inner", "Donic Original True Carbon Inner");
const otciMega = megaspin("d-original-true-carbon-i", "Donic Original True Carbon Inner");

const wscDn = dn("DONIC-WALDNER-SENSO-CARBON/100219010", "WALDNER SENSO CARBON");
const wscTt11 = tt11("donic-waldner-senso-carbon", "Donic Waldner Senso Carbon");

const csDn = dn("DONIC-ORIGINAL-CARBOSPEED/110227010", "ORIGINAL CARBOSPEED");
const csTt11 = tt11("donic-ovtcharov-carbospeed", "Donic Original Carbospeed");
const csMega = megaspin("d-ovtcharov-cs", "Donic Original Carbospeed");

const osv1Dn = dn("DONIC-ORIGINAL-SENSO-V1/110225010", "ORIGINAL SENSO V1");
const osv1Tt11 = tt11("donic-ovtcharov-senso-v1", "Donic Original Senso V1");

const wapDn = dn("DONIC-WALDNER-ALLPLAY/100218010", "WALDNER ALLPLAY");
const wapTt11 = tt11("donic-waldner-allplay", "Donic Waldner Allplay");

const wsv1Dn = dn("DONIC-WALDNER-SENSO-V1/100227010", "WALDNER SENSO V1");

const dicDn = dn("DONIC-WALDNER-DICON/100222010", "WALDNER DICON");
const dicTt11 = tt11("donic-waldner-dicon", "Donic Waldner Dicon");

const aapDn = dn("DONIC-APPELGREN-ALLPLAY/100201010", "APPELGREN ALLPLAY");
const aapTt11 = tt11("donic-appelgren-allplay", "Donic Appelgren Allplay");

const ppaDn = dn("DONIC-PERSSON-POWERALLROUND/100205010", "PERSSON POWERALLROUND");

const pppDn = dn("DONIC-PERSSON-POWERPLAY/100206010", "PERSSON POWERPLAY");
const pppTt11 = tt11("donic-persson-powerplay", "Donic Persson Powerplay");

const dcsDn = dn("DONIC-DEFPLAY-CLASSIC-SENSO/100211010", "DEFPLAY CLASSIC SENSO");

const zjtcDn = dn("DONIC-ZHANG-JIKE-TRUE-CARBON/110296010", "ZHANG JIKE TRUE CARBON");

const aleDn = dn("DONIC-ANDERS-LIND-EXCEPTIONAL/110262010", "ANDERS LIND EXCEPTIONAL");
const aleDnFr: Source = {
  url: "https://www.donic.com/fr/DONIC-ANDERS-LIND-EXCEPTIONAL/110262010",
  label: "DONIC: ANDERS LIND EXCEPTIONAL (French shop page)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const crDn = dn("DONIC-COTON-RELEVANT/100270010", "COTON RELEVANT");

export const blades: Blade[] = [
  {
    id: "donic-original-true-carbon",
    brandId: "donic",
    name: "Original True Carbon",
    aliases: ["Ovtcharov True Carbon"],
    manufacturerRatings: [
      { label: "Control", value: "7+" },
      { label: "Speed", value: 10 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 offensive blade with Kevlar carbon placed directly under koto outer plies around a kiri core.",
    description: [
      "The Original True Carbon has seven plies: a kiri core, ayous, Kevlar carbon and koto outer veneers, with the composite layers sitting directly beneath the outer plies.",
      "DONIC describes it as powerful and penetrating on attacking strokes while keeping a soft enough touch for passive shots, and recommends it for attackers who also want to play safely over the table. DONIC classes it OFF to OFF+.",
      "DONIC's catalogue gives a weight of about 90 g. It was previously sold as the Ovtcharov True Carbon.",
    ],
    facts: [
      { text: "The blade was previously sold under the name Donic Ovtcharov True Carbon.", source: otcMega.url },
    ],
    notes: [
      "DONIC's catalogue gives \"approx. 90 g\"; the donic.com shop lists it in the 80-90 g weight band.",
      "Thickness is not published by DONIC; the 5.5 mm value is from Tabletennis11.",
      PENHOLDER_NOTE,
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-original-true-carbon.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ORIGINAL-TRUE-CARBON/110265010", credit: "© DONIC" },
    sources: [otcDn, cat(11), FIBERS_GLOSSARY, otcTt11, otcMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    plyOrder: ["Koto", "Kevlar Carbon", "Ayous", "Kiri", "Ayous", "Kevlar Carbon", "Koto"],
    fibers: ["aramid-carbon"],
    fiberName: "Kevlar Carbon",
    fiberPosition: "outer",
    outerWood: "Koto",
    thicknessMm: 5.5,
    weightG: { min: 90 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "OFF, OFF +",
    madeIn: null,
  },
  {
    id: "donic-original-true-carbon-inner",
    brandId: "donic",
    name: "Original True Carbon Inner",
    manufacturerRatings: [
      { label: "Control", value: 8 },
      { label: "Speed", value: "10-" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The inner-fibre version of the Original True Carbon, with Hybrid Aramid Carbon next to the kiri core.",
    description: [
      "The True Carbon Inner uses the same kiri, ayous and koto veneers as the Original True Carbon, but moves the composite inward: two layers of Hybrid Aramid Carbon wrap the kiri core instead of sitting under the outer plies.",
      "DONIC says this gives a softer touch and more control than the True Carbon, with slightly less speed, and describes it as fast, semi-hard and controlled. It recommends it for attackers looking for consistency and classes it ALL+ to OFF-.",
      "DONIC's catalogue gives a weight of about 85 g.",
    ],
    facts: [
      {
        text: "DONIC says the Hybrid Aramid Carbon layers in this blade completely embrace the inner plies rather than sitting under the outer plies, as they do in the Original True Carbon.",
        source: otciDn.url,
      },
    ],
    notes: [
      "DONIC does not publish the thickness. Retailers disagree: Tabletennis11 lists 5.6 mm and Megaspin 5.5 mm, so no thickness is recorded.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-original-true-carbon-inner.webp", width: 800, height: 756, sourceUrl: "https://www.donic.com/en/DONIC-ORIGINAL-TRUE-CARBON-INNER/110291010", credit: "© DONIC" },
    sources: [otciDn, cat(11), FIBERS_GLOSSARY, otciTt11, otciMega],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    plyOrder: ["Koto", "Ayous", "Hybrid Aramid Carbon", "Kiri", "Hybrid Aramid Carbon", "Ayous", "Koto"],
    fibers: ["aramid-carbon"],
    fiberName: "Hybrid Aramid Carbon",
    fiberPosition: "inner",
    outerWood: "Koto",
    thicknessMm: null,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL+, OFF -",
    madeIn: null,
  },
  {
    id: "donic-waldner-senso-carbon",
    brandId: "donic",
    name: "Waldner Senso Carbon",
    manufacturerRatings: [
      { label: "Control", value: "8+" },
      { label: "Speed", value: "8+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 carbon blade built on the Allplay design, with carbon around an abachi core and a SENSO handle.",
    description: [
      "The Waldner Senso Carbon takes the Allplay as its starting point and adds two carbon layers around the abachi core, with anegre and limba veneers outside them.",
      "DONIC describes it as balanced and quick with a lot of control and feel, and recommends it for offensive players and allrounders who like to attack. Its handle uses DONIC's SENSO hollow-space construction. DONIC classes it ALL+ to OFF-.",
      "DONIC's catalogue gives a weight of about 85 g.",
    ],
    facts: [
      { text: "DONIC says the Waldner Senso Carbon is based on its Allplay blade, with two carbon layers added around the core.", source: wscDn.url },
      { text: "DONIC's catalogue lists its SENSO hollow-handle system as patented under German patent no. DE 4429843.", source: cat(26).url },
    ],
    notes: [
      "DONIC's technology text lists abachi (core), carbon (2+4), anegre (3+5) and limba (outer); this numbering does not give a clean seven-ply order, so no ply order is recorded. DONIC states the carbon layers surround the core.",
      "The shop lists 7 layers; the catalogue lists it as 5+2 ply.",
      "Made in Sweden according to the print on the blade pictured in DONIC's catalogue (page 12).",
      SENSO_NOTE,
      "Thickness is not published by DONIC; the 5.6 mm value is from Tabletennis11.",
      PENHOLDER_NOTE,
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-waldner-senso-carbon.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-WALDNER-SENSO-CARBON/100219010", credit: "© DONIC" },
    sources: [wscDn, cat(12), cat(26), FIBERS_GLOSSARY, wscTt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Carbon",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: 5.6,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL+, OFF -",
    madeIn: "Sweden",
  },
  {
    id: "donic-original-carbospeed",
    brandId: "donic",
    name: "Original Carbospeed",
    aliases: ["Ovtcharov Carbospeed"],
    manufacturerRatings: [
      { label: "Control", value: 6 },
      { label: "Speed", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 3+2 carbon blade with a thick kiri core and kiso hinoki outer plies, DONIC's very fast stiff attacking blade.",
    description: [
      "The Original Carbospeed has only five plies: a thick kiri core, two carbon layers and kiso hinoki outer veneers.",
      "DONIC calls it \"The Missile\" and describes it as extremely fast and very hard, with relatively good control, recommending it for aggressive players who are always on the attack. DONIC classes it OFF to OFF+.",
      "DONIC's catalogue gives a weight of about 85 g. It was previously sold as the Ovtcharov Carbospeed.",
    ],
    facts: [
      { text: "The blade was previously sold under the name Donic Ovtcharov Carbospeed.", source: csMega.url },
      { text: "DONIC's catalogue gives the Original Carbospeed the nickname \"The Missile\".", source: cat(18).url },
    ],
    notes: [
      "The carbon layers sit directly under the hinoki outer veneers and also directly against the kiri core, because the blade has only one wood ply on each side of the core.",
      "Thickness is not published by DONIC; the 6.8 mm value is from Tabletennis11.",
      PENHOLDER_NOTE,
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-original-carbospeed.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ORIGINAL-CARBOSPEED/110227010", credit: "© DONIC" },
    sources: [csDn, cat(18), FIBERS_GLOSSARY, csTt11, csMega],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "3+2",
    plyOrder: ["Kiso Hinoki", "Carbon", "Kiri", "Carbon", "Kiso Hinoki"],
    fibers: ["carbon"],
    fiberName: "Carbon",
    fiberPosition: "outer",
    outerWood: "Kiso Hinoki",
    thicknessMm: 6.8,
    weightG: { min: 85 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF, OFF +",
    madeIn: null,
  },
  {
    id: "donic-original-senso-v1",
    brandId: "donic",
    name: "Original Senso V1",
    manufacturerRatings: [
      { label: "Control", value: "6+" },
      { label: "Speed", value: 10 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade with walnut outer veneers and a SENSO V1 handle.",
    description: [
      "The Original Senso V1 is a seven-ply wooden blade: abachi in the core and the next layers, koto beneath the surface and hard walnut outer veneers. DONIC says the inner plies are bonded with a specially developed carbon gluing process, but it lists the blade under wooden veneers rather than fibre blades.",
      "DONIC describes it as fast, dynamic and powerful and recommends it for aggressive attackers looking to win points with powerful shots. DONIC classes it OFF to OFF+.",
      "DONIC's catalogue gives a weight of about 90 g.",
    ],
    facts: [
      { text: "DONIC's catalogue lists its SENSO hollow-handle system as patented under German patent no. DE 4429843.", source: cat(26).url },
    ],
    notes: [
      "DONIC's catalogue gives \"approx. 90 g\"; the donic.com shop lists it in the over-90 g weight band.",
      "Made in Sweden according to the print on the blade pictured in DONIC's catalogue (page 21).",
      SENSO_NOTE,
      "Thickness is not published by DONIC; the 6.3 mm value is from Tabletennis11.",
      PENHOLDER_NOTE,
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-original-senso-v1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ORIGINAL-SENSO-V1/110225010", credit: "© DONIC" },
    sources: [osv1Dn, cat(21), cat(26), osv1Tt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    plyOrder: ["Walnut", "Koto", "Abachi", "Abachi", "Abachi", "Koto", "Walnut"],
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Walnut",
    thicknessMm: 6.3,
    weightG: { min: 90 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "OFF, OFF +",
    madeIn: "Sweden",
  },
  {
    id: "donic-waldner-allplay",
    brandId: "donic",
    name: "Waldner Allplay",
    manufacturerRatings: [
      { label: "Control", value: "8+" },
      { label: "Speed", value: "6+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Allplay 5-ply limba and abachi allround blade in a Waldner design with a dark wood handle.",
    description: [
      "The Waldner Allplay is DONIC's Allplay construction, five veneers of limba around an abachi core, in a Jan-Ove Waldner design with a dark natural wood handle.",
      "DONIC describes it as lightweight with excellent control and feel and good speed reserves, and recommends it for allround players who want a varied game. DONIC classes it ALL- to ALL.",
      "DONIC's catalogue gives a weight of about 85 g.",
    ],
    facts: [],
    notes: ["Thickness is not published by DONIC; the 5.5 mm value is from Tabletennis11.", RATING_NOTE_BLADE],
    photo: { src: "/equipment/photos/blades/donic-waldner-allplay.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-WALDNER-ALLPLAY/100218010", credit: "© DONIC" },
    sources: [wapDn, cat(22), wapTt11],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    plyOrder: ["Limba", "Limba", "Abachi", "Limba", "Limba"],
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 5.5,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL -, ALL",
    madeIn: null,
  },
  {
    id: "donic-waldner-senso-v1",
    brandId: "donic",
    name: "Waldner Senso V1",
    manufacturerRatings: [
      { label: "Control", value: "7+" },
      { label: "Speed", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply limba and abachi allround blade with a thin core, about 5.8 mm thick, and a SENSO V1 handle.",
    description: [
      "The Waldner Senso V1 uses the same five veneers as the Allplay, limba around an abachi core, but DONIC says the core veneer is of minimal thickness and the whole blade is about 5.8 mm thick.",
      "DONIC calls it a classic Swedish allround blade that is much quicker than conventional allround blades while keeping control, and recommends it for offensive and power-allround players. Its handle uses the SENSO V1 hollow-space construction. DONIC classes it ALL to ALL+.",
      "DONIC's catalogue gives a weight of about 85 g. A SENSO V2 version is sold separately.",
    ],
    facts: [
      { text: "DONIC's catalogue lists its SENSO hollow-handle system as patented under German patent no. DE 4429843.", source: cat(26).url },
    ],
    notes: [SENSO_NOTE, RATING_NOTE_BLADE],
    photo: { src: "/equipment/photos/blades/donic-waldner-senso-v1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-WALDNER-SENSO-V1/100227010", credit: "© DONIC" },
    sources: [wsv1Dn, cat(22), cat(26)],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    plyOrder: ["Limba", "Limba", "Abachi", "Limba", "Limba"],
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 5.8,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL, ALL+",
    madeIn: null,
  },
  {
    id: "donic-waldner-dicon",
    brandId: "donic",
    name: "Waldner Dicon",
    manufacturerRatings: [
      { label: "Control", value: "7+" },
      { label: "Speed", value: "9+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply limba, pine and abachi offensive blade whose handle is partly milled out for a more direct feel.",
    description: [
      "The Waldner Dicon has five plies: an abachi core, pine middle veneers and limba outer veneers.",
      "Its DICON construction removes part of the handle with a milling tool; DONIC says this gives a more direct feel for the blade's power and speed. DONIC describes it as fast, hard and very direct with good control, and classes it OFF- to OFF.",
      "DONIC's catalogue gives a weight of about 85 g.",
    ],
    facts: [
      { text: "For the DICON construction, DONIC removes parts of the handle with a milling tool.", source: dicDn.url },
    ],
    notes: ["Thickness is not published by DONIC; the 5.6 mm value is from Tabletennis11.", RATING_NOTE_BLADE],
    photo: { src: "/equipment/photos/blades/donic-waldner-dicon.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-WALDNER-DICON/100222010", credit: "© DONIC" },
    sources: [dicDn, cat(22), dicTt11],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    plyOrder: ["Limba", "Pine", "Abachi", "Pine", "Limba"],
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 5.6,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "OFF -, OFF",
    madeIn: null,
  },
  {
    id: "donic-appelgren-allplay",
    brandId: "donic",
    name: "Appelgren Allplay",
    manufacturerRatings: [
      { label: "Control", value: "8+" },
      { label: "Speed", value: "6+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "DONIC's classic 5-ply limba and abachi allround blade, named after Mikael Appelgren.",
    description: [
      "The Appelgren Allplay is a five-ply all-wood blade: limba outer and middle veneers around an abachi core.",
      "DONIC calls it its best-selling blade and describes it as lightweight, with excellent control, a great feel and good speed reserves, for allround players who value reliability. DONIC classes it ALL- to ALL.",
      "DONIC's catalogue gives a weight of about 80 g. SENSO V1 and V2 versions and a junior version with a narrower concave handle and smaller head are sold separately.",
    ],
    facts: [
      {
        text: "DONIC says Mikael Appelgren became a three-time European men's singles champion and a world team champion using this blade.",
        source: aapDn.url,
      },
    ],
    notes: [
      "Also sold with a concave-small (junior) handle for smaller hands.",
      "Thickness is not published by DONIC; the 5.4 mm value is from Tabletennis11.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-appelgren-allplay.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-APPELGREN-ALLPLAY/100201010", credit: "© DONIC" },
    sources: [aapDn, cat(23), aapTt11],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    plyOrder: ["Limba", "Limba", "Abachi", "Limba", "Limba"],
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 5.4,
    weightG: { min: 80 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL -, ALL",
    madeIn: null,
  },
  {
    id: "donic-persson-powerallround",
    brandId: "donic",
    name: "Persson Powerallround",
    manufacturerRatings: [
      { label: "Control", value: "7+" },
      { label: "Speed", value: "7+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply all-wood power-allround blade with red abachi middle veneers, named after Jörgen Persson.",
    description: [
      "The Persson Powerallround has five veneers: an abachi core, red abachi middle veneers and limba outer veneers. DONIC points to the red abachi layer as the feature shared by all versions.",
      "DONIC describes it as dynamic with excellent control and feel, for allround players who like to attack, and calls it one of the first power-allround blades. DONIC classes it ALL to ALL+.",
      "DONIC's catalogue gives a weight of about 85 g. SENSO V1 and V2 versions and a junior version are sold separately.",
    ],
    facts: [],
    notes: ["Also sold with a concave-small (junior) handle for smaller hands.", "Thickness is not published by DONIC.", RATING_NOTE_BLADE],
    photo: { src: "/equipment/photos/blades/donic-persson-powerallround.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-PERSSON-POWERALLROUND/100205010", credit: "© DONIC" },
    sources: [ppaDn, cat(24)],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    plyOrder: ["Limba", "Red Abachi", "Abachi", "Red Abachi", "Limba"],
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: null,
    weightG: { min: 85 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL, ALL+",
    madeIn: null,
  },
  {
    id: "donic-persson-powerplay",
    brandId: "donic",
    name: "Persson Powerplay",
    manufacturerRatings: [
      { label: "Control", value: "6+" },
      { label: "Speed", value: "8+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Swedish-made 7-layer offensive blade of abachi and koto with an anti-vibration damping film.",
    description: [
      "The Persson Powerplay is built from abachi in the core and middle, koto outer veneers and an anti-vibration film; DONIC counts seven layers in total.",
      "DONIC describes it as dynamic, hard and direct with good ball feedback, calls it moderately offensive by current standards and classes it OFF- to OFF. It is made in Sweden.",
      "DONIC's catalogue gives a weight of about 90 g. SENSO V1 and V2 versions are sold separately.",
    ],
    facts: [
      {
        text: "DONIC says Jörgen Persson won the men's singles world and European titles with the normal version of this blade.",
        source: pppDn.url,
      },
      { text: "DONIC says this was one of the first blades to use a special anti-vibration film.", source: pppDn.url },
    ],
    notes: [
      "DONIC's technology text lists abachi (core), abachi (2+4), anti-vibration film (3+5) and koto (1+7); this numbering does not give a clean seven-layer order, so no ply order is recorded.",
      "The anti-vibration film is counted in DONIC's seven layers; DONIC lists the blade as wooden veneers, so no fibre is recorded.",
      "Thickness is not published by DONIC; the 5.9 mm value is from Tabletennis11.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-persson-powerplay.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-PERSSON-POWERPLAY/100206010", credit: "© DONIC" },
    sources: [pppDn, cat(25), pppTt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Koto",
    thicknessMm: 5.9,
    weightG: { min: 90 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "OFF -, OFF",
    madeIn: "Sweden",
  },
  {
    id: "donic-defplay-classic-senso",
    brandId: "donic",
    name: "Defplay Classic Senso",
    manufacturerRatings: [
      { label: "Control", value: "10+" },
      { label: "Speed", value: "4+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A very light 7-ply defensive blade with a balsa core and fibreglass layers, about 70 g.",
    description: [
      "The Defplay Classic Senso has seven plies: a balsa core, fibreglass, limba and anegre outer veneers, with a larger blade face.",
      "DONIC describes it as extremely light, soft and controlled with a great feel, and recommends it for classic defensive players who value reliability, while keeping enough speed for occasional attacks. DONIC classes it DEF to ALL-.",
      "DONIC says it weighs just 70 g despite the larger blade face.",
    ],
    facts: [
      { text: "DONIC's catalogue lists its SENSO hollow-handle system as patented under German patent no. DE 4429843.", source: cat(26).url },
    ],
    notes: [
      "DONIC's catalogue gives \"approx. 70 g\"; the donic.com shop lists it in the under-80 g weight band.",
      "The shop lists the veneer structure as \"Wooden veneers\" although the technology text includes fibreglass layers.",
      SENSO_NOTE,
      "Thickness is not published by DONIC.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-defplay-classic-senso.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-DEFPLAY-CLASSIC-SENSO/100211010", credit: "© DONIC" },
    sources: [dcsDn, cat(26)],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    plyOrder: ["Anegre", "Limba", "Fibreglass", "Balsa", "Fibreglass", "Limba", "Anegre"],
    fibers: ["glass"],
    fiberName: "Fibreglass",
    fiberPosition: "inner",
    outerWood: "Anegre",
    thicknessMm: null,
    weightG: { min: 70 },
    handles: ["FL", "ST"],
    manufacturerClass: "DEF, ALL -",
    madeIn: null,
  },
  {
    id: "donic-zhang-jike-true-carbon",
    brandId: "donic",
    name: "Zhang Jike True Carbon",
    manufacturerRatings: [
      { label: "Control", value: 8 },
      { label: "Speed", value: "10-" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A German-made 5+2 inner-carbon offensive blade with limba outer plies, named after Zhang Jike.",
    description: [
      "The Zhang Jike True Carbon has seven plies: a kiri core wrapped by two carbon layers, then two limba plies on each side. DONIC names the carbon TeXtreme+ in its description and STC Carbon in the technology line.",
      "DONIC describes it as dynamic with a sensitive feel and excellent ball feedback, and recommends it for offensive players who want strong dynamics with good control. DONIC classes it OFF- to OFF.",
      "DONIC gives a weight of about 85 to 90 g. It is made in Germany.",
    ],
    facts: [
      { text: "DONIC says Zhang Jike took part in refining the blade during its development.", source: zjtcDn.url },
      { text: "The blade is marked NEW in DONIC's 2026/27 catalogue.", source: cat(5).url },
    ],
    notes: [
      "DONIC's text says \"Handle shapes: Straight, Flared\"; the shop offers straight and concave.",
      "Thickness is not published by DONIC.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-zhang-jike-true-carbon.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ZHANG-JIKE-TRUE-CARBON/110296010", credit: "© DONIC" },
    sources: [zjtcDn, cat(5)],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    plyOrder: ["Limba", "Limba", "STC Carbon", "Kiri", "STC Carbon", "Limba", "Limba"],
    fibers: ["carbon"],
    fiberName: "STC Carbon (TeXtreme+ carbon)",
    fiberPosition: "inner",
    outerWood: "Limba",
    thicknessMm: null,
    weightG: { min: 85, max: 90 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF -, OFF",
    madeIn: "Germany",
  },
  {
    id: "donic-anders-lind-exceptional",
    brandId: "donic",
    name: "Anders Lind Exceptional",
    manufacturerRatings: [
      { label: "Control", value: "8+" },
      { label: "Speed", value: "10-" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A German-made 5+2 inner-carbon offensive blade with Axontex carbon around a kiri core, named after Anders Lind.",
    description: [
      "The Anders Lind Exceptional has seven plies: a kiri core surrounded by two layers of what DONIC calls Axontex carbon, then limba plies and the outer veneers. DONIC's shop page names koto as the outer wood.",
      "DONIC describes it as having an extremely sensitive feel and good control while still offering power for attacking play, and recommends it for offensive players who want control alongside strong attacking capability. DONIC rates its elasticity as almost stiff and classes it OFF- to OFF.",
      "DONIC gives a weight of about 85 to 90 g. It is made in Germany and sold with straight and concave (flared) handles.",
    ],
    facts: [
      {
        text: "DONIC links the blade's touch to Anders Lind's trademark \"Strawberry\" return, a creative shot played with extreme sidespin.",
        source: aleDn.url,
      },
      { text: "The blade is marked NEW in DONIC's 2026/27 catalogue.", source: cat(5).url },
    ],
    notes: [
      "Outer wood: the donic.com English and French shop pages say Koto (outer); the 2026/27 catalogue (page 5) says Kiri (outer) and \"Limba and Kiri outer plies\". The shop-page value is recorded.",
      "DONIC's text gives \"Approx. 85–90 g\"; the specification field on the same shop page shows \"85-95g\".",
      "The catalogue's technology line spells the fibre \"Avontex Carbon\"; its description, the blade print and the shop page say Axontex.",
      "Thickness is not published by DONIC.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-anders-lind-exceptional.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ANDERS-LIND-EXCEPTIONAL/110262010", credit: "© DONIC" },
    sources: [aleDn, aleDnFr, cat(5)],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    plyOrder: ["Koto", "Limba", "Axontex Carbon", "Kiri", "Axontex Carbon", "Limba", "Koto"],
    fibers: ["carbon"],
    fiberName: "Axontex Carbon",
    fiberPosition: "inner",
    outerWood: "Koto",
    thicknessMm: null,
    weightG: { min: 85, max: 90 },
    handles: ["FL", "ST"],
    manufacturerClass: "OFF -, OFF",
    madeIn: "Germany",
  },
  {
    id: "donic-coton-relevant",
    brandId: "donic",
    name: "Coton Relevant",
    manufacturerRatings: [
      { label: "Control", value: 8 },
      { label: "Speed", value: "9+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 limba and ayous blade with Certran carbon fibre under the outer plies, named after Flavien Coton.",
    description: [
      "The Coton Relevant has seven plies: an ayous core, limba plies on each side, a Certran fibre layer and limba outer veneers. DONIC labels the fibre Certran Carbon and describes Certran as a synthetic fibre known from high-strength fishing lines.",
      "DONIC calls it a moderate offensive blade that combines a classic wood feel with the stability of the fibre, and says the Certran gives dynamic, low-vibration play and an enlarged sweet spot. It recommends the blade for offensive players and for allround players who like to attack, rates its elasticity as stiff and classes it ALL+ to OFF-.",
      "DONIC's catalogue gives a weight of about 85 to 90 g. It is sold with straight, concave (flared) and anatomic handles.",
    ],
    facts: [
      {
        text: "The blade is dedicated to French player Flavien Coton, whom DONIC describes as the 2025 U21 European Champion.",
        source: crDn.url,
      },
      { text: "DONIC says the Certran fibre in the blade is known from high-strength fishing lines.", source: crDn.url },
      { text: "The blade is marked NEW in DONIC's 2026/27 catalogue.", source: cat(4).url },
    ],
    notes: [
      "DONIC names the composite \"Certran Carbon\" (catalogue fibre list, page 3) and \"CERTRAN Carbon Fibre\" (blade print); its product text calls Certran a synthetic fibre and does not describe the carbon component further.",
      "Weight is from DONIC's 2026/27 catalogue; the donic.com shop page does not state it. Thickness is not published by DONIC.",
      RATING_NOTE_BLADE,
    ],
    photo: { src: "/equipment/photos/blades/donic-coton-relevant.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-COTON-RELEVANT/100270010", credit: "© DONIC" },
    sources: [crDn, cat(4), cat(3)],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    plyOrder: ["Limba", "Certran", "Limba", "Ayous", "Limba", "Certran", "Limba"],
    fibers: ["carbon", "other"],
    fiberName: "Certran Carbon",
    fiberPosition: "outer",
    outerWood: "Limba",
    thicknessMm: null,
    weightG: { min: 85, max: 90 },
    handles: ["FL", "ST", "AN"],
    manufacturerClass: "ALL+, OFF -",
    madeIn: null,
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const m1Dn = dn("DONIC-Bluefire-M1/000294220", "Bluefire M1");
const m1tDn = dn("DONIC-Bluefire-M1-Turbo/000297125", "Bluefire M1 Turbo");
const m2Dn = dn("DONIC-Bluefire-M2/000295118", "Bluefire M2");
const m3Dn = dn("DONIC-Bluefire-M3/000296118", "Bluefire M3");
const j1Dn = dn("DONIC-BLUEGRIP-J1/000231220", "BLUEGRIP J1");
const c2Dn = dn("DONIC-BLUEGRIP-C2/000241120", "BLUEGRIP C2");
const s1Dn = dn("DONIC-BlueGrip-S1/000230120", "BlueGrip S1");
const s2Dn = dn("DONIC-BLUEGRIP-S2/000272118", "BLUEGRIP S2");
const z1Dn = dn("DONIC-Bluestorm-Z1/000214225", "Bluestorm Z1");
const bspDn = dn("DONIC-BLUESTORM-PRO/000261120", "BLUESTORM PRO");
const as1Dn = dn("DONIC-ACUDA-S1/000207225", "ACUDA S1");
const as2Dn = dn("DONIC-ACUDA-S2/000208125", "ACUDA S2");
const barDn = dn("DONIC-BARACUDA/000284118", "BARACUDA");
const bsa1Dn = dn("DONIC-BLUESTAR-A1/000265220", "BLUESTAR A1");
const BLUESTAR_SERIES = dn("donic-rubber-series-bluestar", "BLUESTAR series technology page");

const BLUEFIRE_DESC =
  "DONIC pairs a large-pored, blue tension sponge with a topsheet of long, thin, widely spaced pimples, and says the combination gives a high, curved topspin arc and a strong catapult effect.";

export const rubbers: Rubber[] = [
  {
    id: "donic-bluefire-m1",
    brandId: "donic",
    name: "Bluefire M1",
    manufacturerRatings: [
      { label: "Control", value: 6 },
      { label: "Speed", value: "10++" },
      { label: "Spin", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The 47.5-degree version of DONIC's Bluefire M tension rubber, with a large-pored blue sponge.",
    description: [
      BLUEFIRE_DESC,
      "The M1 has a 47.5-degree sponge. DONIC describes it as fast and dynamic, slightly softer than the M1 Turbo, and recommends it for uncompromising attackers. DONIC classes it OFF to OFF+.",
    ],
    facts: [
      { text: "DONIC sells the Bluefire M sponge in four hardnesses: 50 degrees (M1 Turbo), 47.5 (M1), 45 (M2) and 40 (M3).", source: BLUEFIRE_SERIES.url },
    ],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluefire-m1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-Bluefire-M1/000294220", credit: "© DONIC" },
    sources: [m1Dn, cat(45), BLUEFIRE_SERIES, RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluefire-m1-turbo",
    brandId: "donic",
    name: "Bluefire M1 Turbo",
    manufacturerRatings: [
      { label: "Control", value: 6 },
      { label: "Speed", value: "10++" },
      { label: "Spin", value: "10+++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The hardest Bluefire, with a 50-degree blue sponge and slightly wider pimple heads than the other M versions.",
    description: [
      BLUEFIRE_DESC,
      "The M1 Turbo has the hardest sponge in the series at 50 degrees, and DONIC says its pimple heads are slightly wider than on the M1, M2 and M3, for a harder impact and a more pronounced arc. DONIC recommends it for top-class and well-trained players who prefer harder rubbers, and classes it OFF to OFF+.",
    ],
    facts: [
      {
        text: "DONIC says the M1 Turbo's slightly wider pimple heads give a harder ball impact and a more pronounced arc than the other Bluefire M versions.",
        source: BLUEFIRE_SERIES.url,
      },
    ],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluefire-m1-turbo.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-Bluefire-M1-Turbo/000297125", credit: "© DONIC" },
    sources: [m1tDn, cat(44), BLUEFIRE_SERIES, RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluefire-m2",
    brandId: "donic",
    name: "Bluefire M2",
    manufacturerRatings: [
      { label: "Control", value: 7 },
      { label: "Speed", value: "9++" },
      { label: "Spin", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The medium, 45-degree version of DONIC's Bluefire M tension rubber.",
    description: [
      BLUEFIRE_DESC,
      "The M2 has a 45-degree sponge. DONIC describes it as a balance of dynamics, catapult effect and ball feedback for players who value spin and speed with a good feel, and classes it ALL+ to OFF.",
    ],
    facts: [
      { text: "DONIC sells the Bluefire M sponge in four hardnesses: 50 degrees (M1 Turbo), 47.5 (M1), 45 (M2) and 40 (M3).", source: BLUEFIRE_SERIES.url },
    ],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluefire-m2.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-Bluefire-M2/000295118", credit: "© DONIC" },
    sources: [m2Dn, cat(45), BLUEFIRE_SERIES, RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45, scale: "unstated" },
    spongeThicknesses: ["1.8", "2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluefire-m3",
    brandId: "donic",
    name: "Bluefire M3",
    manufacturerRatings: [
      { label: "Control", value: "7++" },
      { label: "Speed", value: 9 },
      { label: "Spin", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The soft, 40-degree version of DONIC's Bluefire M tension rubber.",
    description: [
      BLUEFIRE_DESC,
      "The M3 has a soft 40-degree sponge. DONIC describes it as giving excellent ball feedback, a lot of spin and a satisfying sound, for players who want control without giving up speed, and classes it ALL to OFF-.",
    ],
    facts: [
      { text: "DONIC sells the Bluefire M sponge in four hardnesses: 50 degrees (M1 Turbo), 47.5 (M1), 45 (M2) and 40 (M3).", source: BLUEFIRE_SERIES.url },
    ],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluefire-m3.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-Bluefire-M3/000296118", credit: "© DONIC" },
    sources: [m3Dn, cat(45), BLUEFIRE_SERIES, RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 40, scale: "unstated" },
    spongeThicknesses: ["1.8", "2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluegrip-j1",
    brandId: "donic",
    name: "BlueGrip J1",
    manufacturerRatings: [
      { label: "Control", value: "6+" },
      { label: "Speed", value: "10+" },
      { label: "Spin", value: "11+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The hardest BlueGrip J, a German-made hybrid with a sticky topsheet on a 55-degree fine-pored blue sponge.",
    description: [
      "The BlueGrip J series was developed with Zhang Jike. DONIC says it uses the topsheet compound of the BlueStar A series with the sponge structure and pimple geometry of the BlueGrip C series, and a newly developed sticky surface it calls Chinese Special Stickiness.",
      "The J1 is the hardest version, with a 55-degree fine-pored sponge. DONIC says the sticky surface and hard pimple geometry damp the incoming ball, which it presents as an advantage for serve, return and short play, and recommends J1 for ambitious attackers. DONIC classes it OFF to OFF+.",
    ],
    facts: [
      { text: "DONIC says the J in BlueGrip J stands for Zhang Jike, who tested the prototypes during development.", source: j1Dn.url },
      {
        text: "DONIC says the BlueGrip J takes its sponge structure from the BlueGrip C2, its pimple geometry from the BlueGrip C1 and its pimple compound from the BlueStar A.",
        source: BLUEGRIP_SERIES.url,
      },
    ],
    notes: [
      "DONIC's product page and catalogue describe the surface as \"slightly sticky, extremely grippy\", while its BlueGrip J series page calls it sticky.",
      "Made in Germany according to the packaging pictured in DONIC's catalogue (page 36); the hardness is therefore recorded on the German (ESN) scale.",
      RATING_NOTE_RUBBER,
    ],
    photo: { src: "/equipment/photos/rubbers/donic-bluegrip-j1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BLUEGRIP-J1/000231220", credit: "© DONIC" },
    sources: [j1Dn, cat(36), BLUEGRIP_SERIES, RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: 55, scale: "esn" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  {
    id: "donic-bluegrip-c2",
    brandId: "donic",
    name: "BlueGrip C2",
    manufacturerRatings: [
      { label: "Control", value: "6-" },
      { label: "Speed", value: "10+" },
      { label: "Spin", value: "11++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Chinese-style tacky topsheet on a 55-degree fine-pored blue tension sponge.",
    description: [
      "The BlueGrip C2 combines a sticky, Chinese-style topsheet with DONIC's blue tension sponge, a concept DONIC calls C-Touch. Its fine-pored sponge is 55 degrees.",
      "DONIC describes it as very spinny with a strong catapult effect and a high topspin arc even from mid-distance, and recommends it for offensive players who rely on speed and spin. DONIC classes it OFF to OFF+.",
    ],
    facts: [],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluegrip-c2.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BLUEGRIP-C2/000241120", credit: "© DONIC" },
    sources: [c2Dn, cat(38), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 55, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluegrip-s1",
    brandId: "donic",
    name: "BlueGrip S1",
    manufacturerRatings: [
      { label: "Control", value: 6 },
      { label: "Speed", value: 10 },
      { label: "Spin", value: 11 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A sticky-topsheet hybrid on a 45-degree medium-pored sponge, between the BlueGrip S2 and C2 in hardness.",
    description: [
      "The BlueGrip S1 pairs a sticky topsheet with a dynamic, medium-pored 45-degree sponge. DONIC says the S1 and S2 sponges are based on those of its Acuda S1 and S2, combined with the topsheet characteristics of Chinese rubbers.",
      "DONIC places the S1 between the softer S2 and the harder C versions, describes it as very grippy and dynamic, and recommends it for offensive players balancing spin and speed. DONIC classes it OFF- to OFF.",
    ],
    facts: [
      { text: "DONIC says the BlueGrip S1 and S2 combine the sponges of its Acuda S1 and S2 with a Chinese-style sticky topsheet.", source: cat(39).url },
    ],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluegrip-s1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BlueGrip-S1/000230120", credit: "© DONIC" },
    sources: [s1Dn, cat(39), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 45, scale: "unstated" },
    spongeThicknesses: ["1.8", "2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluegrip-s2",
    brandId: "donic",
    name: "BlueGrip S2",
    manufacturerRatings: [
      { label: "Control", value: 7 },
      { label: "Speed", value: "9+" },
      { label: "Spin", value: 11 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The softest BlueGrip, a sticky topsheet on a 42.5-degree medium-pored sponge.",
    description: [
      "The BlueGrip S2 combines a sticky, Chinese-style topsheet with a medium-soft, medium-pored 42.5-degree sponge that DONIC says is based on the Acuda S2.",
      "DONIC describes it as very grippy and easy to control, with enough speed for accurate attacking strokes, and recommends it for controlled attackers, allrounders and defenders who want a spinny, varied game. DONIC classes it ALL+ to OFF.",
    ],
    facts: [
      { text: "DONIC says the BlueGrip S1 and S2 combine the sponges of its Acuda S1 and S2 with a Chinese-style sticky topsheet.", source: cat(39).url },
    ],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluegrip-s2.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BLUEGRIP-S2/000272118", credit: "© DONIC" },
    sources: [s2Dn, cat(39), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 42.5, scale: "unstated" },
    spongeThicknesses: ["1.8", "2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluestorm-z1",
    brandId: "donic",
    name: "Bluestorm Z1",
    manufacturerRatings: [
      { label: "Control", value: "6+" },
      { label: "Speed", value: "10+++" },
      { label: "Spin", value: "10+++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A spin-oriented tension rubber with a thin, high-tension topsheet and a 47.5-degree medium-pored blue sponge.",
    description: [
      "The Bluestorm series uses a thinner topsheet under higher tension, which DONIC says leaves room for a thicker sponge. The Z1 has a medium-pored 47.5-degree blue sponge and short, wide pimples.",
      "DONIC presents the Z1 and Z1 Turbo as the spin-focused versions of the series and recommends the Z1 for well-trained attackers. DONIC classes it OFF to OFF+.",
    ],
    facts: [
      {
        text: "In the thickest Bluestorm version DONIC thins the topsheet to 1.7 mm (instead of 1.8 mm) and thickens the sponge to 2.3 mm (instead of 2.2 mm).",
        source: BLUESTORM_SERIES.url,
      },
    ],
    notes: [
      "The donic.com shop sells 1.9 mm, 2.1 mm and max+; the 2026/27 catalogue lists 2.1 mm and max+.",
      "DONIC calls its thickest version max+ because the sponge is slightly thicker than on its traditional Max versions.",
      HARDNESS_SCALE_NOTE,
      RATING_NOTE_RUBBER,
    ],
    photo: { src: "/equipment/photos/rubbers/donic-bluestorm-z1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-Bluestorm-Z1/000214225", credit: "© DONIC" },
    sources: [z1Dn, cat(41), BLUESTORM_SERIES, RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "unstated" },
    spongeThicknesses: ["1.9", "2.1", "max+"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluestorm-pro",
    brandId: "donic",
    name: "Bluestorm Pro",
    manufacturerRatings: [
      { label: "Control", value: "5+" },
      { label: "Speed", value: "11+" },
      { label: "Spin", value: 11 },
    ],
    releaseYear: null,
    status: "current",
    summary: "DONIC's professional-class Bluestorm with a 50-degree catapult sponge and a grippy topsheet.",
    description: [
      "The Bluestorm Pro has a 50-degree sponge with what DONIC calls an extreme catapult effect, under a topsheet DONIC describes as having excellent grip.",
      "DONIC says it applies strict quality control on weight and sponge hardness to this version, and recommends it for attackers who want a professional-class rubber. A slightly softer Pro AM version is sold separately. DONIC classes it OFF to OFF+.",
    ],
    facts: [],
    notes: [HARDNESS_SCALE_NOTE, RATING_NOTE_RUBBER],
    photo: { src: "/equipment/photos/rubbers/donic-bluestorm-pro.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BLUESTORM-PRO/000261120", credit: "© DONIC" },
    sources: [bspDn, cat(42), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-acuda-s1",
    brandId: "donic",
    name: "Acuda S1",
    manufacturerRatings: [
      { label: "Control", value: "6-" },
      { label: "Speed", value: "10+" },
      { label: "Spin", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The medium-hard version of DONIC's spin-optimised Acuda S tension rubber, with wide, flat pimples.",
    description: [
      "The Acuda S series uses a medium-pored tension sponge and a topsheet with wide, flat pimples, which DONIC says give a firmer feel and allow more spin. The S1 is the medium-hard version.",
      "DONIC describes it as very quick and accurate with an excellent feel, and recommends it for aggressive attackers who play close to the table and hit hard. DONIC classes it OFF to OFF+.",
    ],
    facts: [],
    notes: [
      "DONIC describes the sponge hardness only in words (medium-hard) and does not publish a degree value.",
      RATING_NOTE_RUBBER,
    ],
    photo: { src: "/equipment/photos/rubbers/donic-acuda-s1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ACUDA-S1/000207225", credit: "© DONIC" },
    sources: [as1Dn, cat(47), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["2.0", "max"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-acuda-s2",
    brandId: "donic",
    name: "Acuda S2",
    manufacturerRatings: [
      { label: "Control", value: "7-" },
      { label: "Speed", value: "9+" },
      { label: "Spin", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The balanced, medium-soft version of DONIC's Acuda S tension rubber.",
    description: [
      "The Acuda S2 is a spin-oriented tension rubber with a medium-soft, medium-pored sponge and the wide, flat pimples of the Acuda S series.",
      "DONIC describes it as dynamic, accurate and very spinny with a loud sound, and recommends it for power allrounders through to offensive players, especially controlled spin players. DONIC classes it ALL+ to OFF.",
    ],
    facts: [],
    notes: [
      "DONIC describes the sponge hardness only in words (medium-soft) and does not publish a degree value.",
      RATING_NOTE_RUBBER,
    ],
    photo: { src: "/equipment/photos/rubbers/donic-acuda-s2.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-ACUDA-S2/000208125", credit: "© DONIC" },
    sources: [as2Dn, cat(47), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.8", "2.0", "max"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-baracuda",
    brandId: "donic",
    name: "Baracuda",
    manufacturerRatings: [
      { label: "Control", value: 6 },
      { label: "Speed", value: "10-" },
      { label: "Spin", value: "10++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A Formula DONIC tension rubber with a medium sponge, built for a higher, spinnier topspin arc.",
    description: [
      "The Baracuda is based on DONIC's Formula DONIC tension technology with a medium sponge and a spin-elastic topsheet.",
      "DONIC says the ball leaves the rubber in a considerably higher arc with more spin on topspin strokes, and recommends it for attacking players who use a lot of topspin. DONIC classes it OFF- to OFF+.",
    ],
    facts: [],
    notes: [
      "DONIC describes the sponge hardness only in words (medium) and does not publish a degree value.",
      "A softer Baracuda Big Slam is sold separately.",
      "Classed as a tension rubber because DONIC builds it on Formula DONIC (its packaging in the catalogue shows FD3, 3rd generation), which DONIC describes as permanently integrating the speed-glue effect; DONIC's glossary does not list it under a specific tension grade.",
      RATING_NOTE_RUBBER,
    ],
    photo: { src: "/equipment/photos/rubbers/donic-baracuda.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BARACUDA/000284118", credit: "© DONIC" },
    sources: [barDn, cat(50), RUBBER_GLOSSARY, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.8", "2.0", "max"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "donic-bluestar-a1",
    brandId: "donic",
    name: "Bluestar A1",
    manufacturerRatings: [
      { label: "Control", value: "5+" },
      { label: "Speed", value: "11++" },
      { label: "Spin", value: "11++" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The hardest Bluestar, a hybrid rubber pairing a slightly sticky topsheet with a fine-pored 52.5-degree blue OPTE sponge.",
    description: [
      "The Bluestar series combines what DONIC calls a slightly sticky Chinese-style topsheet with a tension-loaded, fine-pored sponge developed and made in Germany, a pairing DONIC calls Hybrid Touch. DONIC names the sponge technology Optimised Energy Sponge (OPTE) and says it plays relatively softly and dynamically for its hardness.",
      "The A1 has the hardest sponge in the series at 52.5 degrees; the A2 (50) and A3 (47.5) are softer. DONIC describes the A1 as having a strong catapult effect and recommends it for ambitious, uncompromising attackers with the technique and training to use it. DONIC classes it OFF to OFF+.",
    ],
    facts: [
      { text: "OPTE, DONIC's name for the Bluestar sponge technology, stands for Optimised Energy Sponge.", source: bsa1Dn.url },
      { text: "DONIC sells the Bluestar sponge in three hardnesses: A1 52.5 degrees, A2 50 and A3 47.5.", source: BLUESTAR_SERIES.url },
      { text: "The Bluestar A1 is on the ITTF list of authorised racket coverings under number 21-062.", source: LARC.url },
    ],
    notes: [
      "DONIC's series page says the sponge is made in Germany; it does not state where the finished rubber is made.",
      HARDNESS_SCALE_NOTE,
      RATING_NOTE_RUBBER,
    ],
    photo: { src: "/equipment/photos/rubbers/donic-bluestar-a1.webp", width: 800, height: 800, sourceUrl: "https://www.donic.com/en/DONIC-BLUESTAR-A1/000265220", credit: "© DONIC" },
    sources: [bsa1Dn, cat(34), BLUESTAR_SERIES, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: 52.5, scale: "unstated" },
    spongeThicknesses: ["2.0", "max"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
];
