import type { Blade, Brand, Handle, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** STIGA Sports' own web shop (Stiga Sports AB, Eskilstuna, Sweden). Specs come from each page's Specifications tab. */
const stiga = (slug: string, label: string): Source => ({
  url: `https://www.stigasports.com/en/product/${slug}`,
  label: `STIGA Sports (official site): ${label}`,
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

/**
 * STIGA sells blades with three handles: "Master/Concave" (flared), "Classic/Straight" and "Pen/Penhold", which STIGA
 * describes as "compact and conical" (a Chinese-style penhold handle).
 */
const MASTER: Handle = "FL";
const CLASSIC: Handle = "ST";
const PEN: Handle = "CS";

export const brand: Brand = {
  id: "stiga",
  name: "STIGA",
  country: "Sweden",
  website: "https://www.stigasports.com",
  ratingNote:
    "STIGA lists blades with a Speed and a Control value plus a Player Level, and rubbers with Speed, Spin and Control values; its pages do not state the top of either scale, and blade and rubber numbers use different ranges.",
  hardnessScale: null,
  sources: [stiga("carbonado-45", "Carbonado 45 (blade specifications and \"Handcrafted in Eskilstuna, Sweden\")"), stiga("dna-platinum-h", "DNA Platinum H (rubber specifications)")],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const WEIGHT_BAND_NOTE = (band: string, text: string) =>
  `STIGA's product text gives the weight as ${text}, while the Specifications table on the same page shows "Weight Grams: ${band}"; the product-text figure is recorded.`;

const clipperWood = stiga("clipper-wood", "Clipper Wood");
const clipperCr = stiga("clipper-cr", "Clipper CR");
const allroundClassic = stiga("allround-classic", "Allround Classic");
const allroundEvolution = stiga("allround-evolution", "Allround Evolution");
const offensiveClassic = stiga("offensive-classic", "Offensive Classic");
const carbonado45 = stiga("carbonado-45", "Carbonado 45");
const cyberCarbon = stiga("cybershape-carbon", "Cybershape Carbon");
const cyberCarbonCwt = stiga("cybershape-carbon-cwt", "Cybershape Carbon CWT");
const cyberWood = stiga("cybershape-wood", "Cybershape Wood");
const dynasty = stiga("dynasty-carbon", "Dynasty Carbon");
const infinity = stiga("infinity-vps-v", "Infinity VPS V");
const inspiraHc = stiga("inspira-hybrid-carbon", "Inspira Hybrid Carbon");
const inspiraCcf = stiga("inspira-ccf", "Inspira CCF");
const destiny = stiga("destiny-carbon", "Destiny Carbon");
const aura = stiga("blade-aura-hybrid-carbon", "Aura Hybrid Carbon");
const i1 = stiga("i1-hybrid-carbon", "I1 Hybrid Carbon");
const defensive2 = stiga("defensive-classic-ii", "Defensive Classic II");
const pure = stiga("pure", "Pure");
const wavy = stiga("wavy-ultra-fibre", "Wavy Ultra Fibre");

const bladeBase = { brandId: "stiga", status: "current" as const, lastVerified: ACCESSED, thicknessMm: null };

export const blades: Blade[] = [
  {
    ...bladeBase,
    id: "stiga-clipper-wood",
    name: "Clipper Wood",
    manufacturerRatings: [
      { label: "Speed", value: 8.2 },
      { label: "Control", value: 4.9 },
      { label: "Player Level", value: "Mid Level" },
    ],
    releaseYear: 1981,
    summary: "STIGA's long-running 7-ply all-wood offensive blade with limba outer plies, made in Sweden.",
    description: [
      "The Clipper Wood is a seven-ply, all-wood blade with limba outer veneers. STIGA classes it as Offensive and lists it at Mid Level, with a Speed value of 8.2 and a Control value of 4.9 on its own scale.",
      "STIGA describes it as a blade for players who want extra power behind their strokes and says it is known for its speed. It is sold with Master (flared) and Classic (straight) handles and a stated weight of 90 g ±5 g.",
    ],
    facts: [
      { text: "STIGA says the Clipper Wood was first released in 1981 and that well over a million have been sold since.", source: clipperWood.url },
    ],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "90 g ±5 g")],
    sources: [clipperWood],
    plies: 7,
    layup: "7-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 85, max: 95 },
    handles: [MASTER, CLASSIC],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-clipper-cr",
    name: "Clipper CR",
    manufacturerRatings: [
      { label: "Speed", value: 8.3 },
      { label: "Control", value: 4.8 },
      { label: "Player Level", value: "Mid Level" },
    ],
    releaseYear: null,
    summary: "A 7-ply all-wood Clipper version built with STIGA's CR system, which STIGA says makes it faster than the Clipper Wood.",
    description: [
      "The Clipper CR keeps the seven-ply, limba-faced construction of the Clipper but adds what STIGA calls the CR system. STIGA states that this gives increased speed compared with the regular Clipper Wood while keeping the \"STIGA touch\".",
      "STIGA classes it as Offensive at Mid Level, with Speed 8.3 and Control 4.8 on its own scale. It is sold with Master, Classic and Penhold handles; the only weight STIGA lists is its 80 to 95 g weight band.",
    ],
    facts: [],
    sources: [clipperCr],
    plies: 7,
    layup: "7-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 80, max: 95 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-allround-classic",
    name: "Allround Classic",
    manufacturerRatings: [
      { label: "Speed", value: 4.1 },
      { label: "Control", value: 8.8 },
      { label: "Player Level", value: "Beginner" },
    ],
    releaseYear: 1967,
    summary: "A light 5-ply all-wood allround blade from STIGA, aimed at control and suitable for beginners.",
    description: [
      "The Allround Classic is a five-ply, all-wood blade with limba outer veneers. STIGA rates it Speed 4.1 and Control 8.8, classes it as Allround and lists it at Beginner level.",
      "STIGA describes it as a lightweight blade with good feel and control, suitable for beginners as well as experienced players. It is sold with Master, Classic and Penhold handles and a stated weight of 80 g ±5 g.",
    ],
    facts: [
      { text: "STIGA says the Allround Classic was first released in 1967 and that well over a million have been sold since.", source: allroundClassic.url },
    ],
    notes: [WEIGHT_BAND_NOTE("75 - 90", "80 g ±5 g")],
    sources: [allroundClassic],
    plies: 5,
    layup: "5-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 75, max: 85 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Allround",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-allround-evolution",
    name: "Allround Evolution",
    manufacturerRatings: [
      { label: "Speed", value: 6.3 },
      { label: "Control", value: 6.8 },
      { label: "Player Level", value: "Intermediate" },
    ],
    releaseYear: null,
    summary: "A light 5-ply all-wood allround blade based on the Allround Classic but, according to STIGA, slightly faster.",
    description: [
      "The Allround Evolution is a five-ply, limba-faced all-wood blade. STIGA says it is based on the Allround Classic but modified for faster attacking players, and rates it Speed 6.3 and Control 6.8 at Intermediate level.",
      "STIGA aims it at modern allround players who vary speed and spin. It is sold with Master, Classic and Penhold handles and a stated weight of 80 g ±5 g.",
    ],
    facts: [],
    notes: [WEIGHT_BAND_NOTE("75 - 90", "80 g ±5 g")],
    sources: [allroundEvolution],
    plies: 5,
    layup: "5-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 75, max: 85 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Allround",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-offensive-classic",
    name: "Offensive Classic",
    manufacturerRatings: [
      { label: "Speed", value: 7.1 },
      { label: "Control", value: 6.0 },
      { label: "Player Level", value: "Mid Level" },
    ],
    releaseYear: 1976,
    summary: "STIGA's classic 5-ply all-wood offensive blade with limba outer plies.",
    description: [
      "The Offensive Classic is a five-ply, all-wood blade with limba outer veneers. STIGA classes it as Offensive at Mid Level, with Speed 7.1 and Control 6.0 on its own scale.",
      "STIGA presents it as suitable for both beginners and experienced players. Its official web shop currently lists it with the Master (flared) handle, and the only weight STIGA gives is its 75 to 90 g weight band.",
    ],
    facts: [
      { text: "STIGA says the Offensive Classic was first released in 1976 and that well over a million have been sold since.", source: offensiveClassic.url },
    ],
    sources: [offensiveClassic],
    plies: 5,
    layup: "5-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 75, max: 90 },
    handles: [MASTER],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-carbonado-45",
    name: "Carbonado 45",
    manufacturerRatings: [
      { label: "Speed", value: 8.1 },
      { label: "Control", value: 4.6 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "A 5+2 blade with two outer plies of Swedish-made TeXtreme spread-tow carbon laid at a 45-degree angle.",
    description: [
      "The Carbonado 45 combines five wood plies with two layers of TeXtreme Spread Tow Carbon, a carbon material made in Sweden. STIGA lists the layup as 5+2 with outer fibre and limba outer veneers, and uses a thinner 64 g/m² carbon on this model.",
      "STIGA says the carbon is laid at a 45-degree angle to give torsional flexibility while adding stiffness, and describes the blade as having a high trajectory with good speed, stability and control. It rates it Speed 8.1 and Control 4.6 at Top Level.",
      "It is sold with Master, Classic and Penhold handles and a stated weight of 90 g ±5 g.",
    ],
    facts: [
      { text: "The \"45\" refers to the angle of the carbon layers; STIGA says this gives the blade torsional bendability alongside increased stiffness.", source: carbonado45.url },
      { text: "STIGA says the Carbonado's TeXtreme Spread Tow Carbon is made in Sweden and was the first of its kind used in table tennis.", source: carbonado45.url },
    ],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "90 g ±5 g")],
    sources: [carbonado45],
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "TeXtreme® Spread Tow Carbon",
    fiberPosition: "outer",
    outerWood: "Limba",
    weightG: { min: 85, max: 95 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-cybershape-carbon",
    name: "Cybershape Carbon",
    aliases: ["CYBERSHAPE Carbon"],
    manufacturerRatings: [
      { label: "Speed", value: 9.0 },
      { label: "Control", value: 4.4 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "A six-sided 5+2 inner-carbon blade built on STIGA's Cybershape design with black koto outer plies.",
    description: [
      "The Cybershape Carbon uses STIGA's six-sided Cybershape head instead of a round one. It is a 5+2 blade with CCF (Close Core Fibre) construction, meaning the carbon layer sits directly on the wood core, under black koto outer veneers. STIGA says the carbon composite is German-made.",
      "STIGA states that the shape gives an 11% larger hitting area for shakehand grips and 9% larger for penhold compared with a traditional blade, and that tests with KTH Royal Institute of Technology found a larger sweet spot placed higher on the blade. It rates the blade Speed 9.0 and Control 4.4, class Offensive +.",
      "It is sold with Master, Classic and Penhold handles and a stated weight of 85 g ±5 g. A version with Custom Weight Technology is sold separately as the Cybershape Carbon CWT.",
    ],
    facts: [
      { text: "STIGA says Cybershape's hitting area is 11% larger for the shakehand grip and 9% larger for the penhold grip than a traditional blade, with the bottom part reduced by 2% to keep the weight down.", source: cyberCarbon.url },
      { text: "STIGA tested the vibration properties of the Cybershape design together with KTH Royal Institute of Technology in Stockholm.", source: cyberCarbon.url },
    ],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "85 g ±5 g")],
    sources: [cyberCarbon],
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Carbon fibre",
    fiberPosition: "inner",
    outerWood: "Black Koto",
    weightG: { min: 80, max: 90 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive +",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-cybershape-carbon-cwt",
    name: "Cybershape Carbon CWT",
    aliases: ["CYBERSHAPE Carbon CWT"],
    manufacturerRatings: [
      { label: "Speed", value: 9.0 },
      { label: "Control", value: 4.4 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "The Cybershape Carbon with STIGA Custom Weight Technology: magnetic 3, 6 and 9 g handle weights for tuning weight and balance.",
    description: [
      "The Cybershape Carbon CWT has the same 5+2 inner-carbon (CCF) construction, black koto outer veneers and six-sided Cybershape head as the Cybershape Carbon, with the same Speed 9.0 and Control 4.4 ratings from STIGA.",
      "The difference is STIGA Custom Weight Technology: a magnet inside the blade holds one of three supplied weights of 3, 6 or 9 g at the bottom of the handle, so the player can adjust weight and balance. STIGA states a weight of 85-92 g without the extra weights.",
    ],
    facts: [
      { text: "The CWT weights attach to the bottom of the handle with a magnet built into the blade; three weights of 3, 6 and 9 g are included.", source: cyberCarbonCwt.url },
    ],
    notes: [
      "STIGA's product text gives the weight as 85-92 g without the extra weights, while the Specifications table shows \"Weight Grams: 80 - 95\"; the product-text figure is recorded.",
    ],
    sources: [cyberCarbonCwt],
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Carbon fibre",
    fiberPosition: "inner",
    outerWood: "Black Koto",
    weightG: { min: 85, max: 92 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive +",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-cybershape-wood",
    name: "Cybershape Wood",
    aliases: ["CYBERSHAPE Wood"],
    manufacturerRatings: [
      { label: "Speed", value: 8.1 },
      { label: "Control", value: 5.4 },
      { label: "Player Level", value: "Advanced" },
    ],
    releaseYear: null,
    summary: "A factory-lacquered 5-ply all-wood offensive blade with STIGA's six-sided Cybershape head.",
    description: [
      "The Cybershape Wood is a five-ply, all-wood offensive blade with limba outer veneers, a factory-lacquered surface and STIGA's six-sided Cybershape head. STIGA rates it Speed 8.1 and Control 5.4 at Advanced level.",
      "STIGA says the six edges make it easier for players and coaches to see the blade angle in strokes and receives, and presents it as a blade to start with that can be used up to elite level. It is sold with Master, Classic and Penhold handles at a stated 80-85 g.",
    ],
    facts: [
      { text: "STIGA describes the Cybershape Wood as the second blade in the Cybershape family.", source: cyberWood.url },
    ],
    notes: [
      "STIGA's product text gives the weight as 80-85 g, while the Specifications table shows \"Weight Grams: 80 - 95\"; the product-text figure is recorded.",
    ],
    sources: [cyberWood],
    plies: 5,
    layup: "5-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 80, max: 85 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-dynasty-carbon",
    name: "Dynasty Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 9.3 },
      { label: "Control", value: 3.5 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "A very offensive 5+2 outer-carbon blade with grey koto outer plies and STIGA's TeXtreme+ carbon.",
    description: [
      "The Dynasty Carbon is a 5+2 blade with outer carbon layers made from what STIGA calls TeXtreme+ carbon, under grey koto outer veneers. STIGA says the carbon technology increases the sweet spot and stability.",
      "STIGA describes it as very offensive and rates it Speed 9.3 and Control 3.5, class Offensive +. It is sold with Master, Classic and Penhold handles and a stated weight of 90 g ±5 g.",
    ],
    facts: [
      { text: "STIGA says the Dynasty Carbon was developed together with world and Olympic champion Xu Xin.", source: dynasty.url },
    ],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "90 g ±5 g")],
    sources: [dynasty],
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "TeXtreme+ carbon",
    fiberPosition: "outer",
    outerWood: "Grey Koto",
    weightG: { min: 85, max: 95 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive +",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-infinity-vps-v",
    name: "Infinity VPS V",
    manufacturerRatings: [
      { label: "Speed", value: 7.5 },
      { label: "Control", value: 5.6 },
      { label: "Player Level", value: "Advanced" },
    ],
    releaseYear: null,
    summary: "A light 5-ply all-wood offensive blade whose middle veneers are heat-treated using STIGA's VPS process.",
    description: [
      "The Infinity VPS V is a five-ply, all-wood offensive blade with limba outer veneers. STIGA says its two middle veneers go through a heating and cooling treatment (VPS) for stability, and that its Diamond Touch Technology gives the outer veneer extra hardness and a smooth finish.",
      "STIGA rates it Speed 7.5 and Control 5.6 at Advanced level and aims it at aggressive receives followed by topspin attacks. It is sold with Master, Classic and Penhold handles and a stated weight of 85 g ±5 g.",
    ],
    facts: [
      { text: "STIGA says the Infinity VPS V's two middle veneers are hand-selected and treated with a heating and cooling process using precisely measured time and temperature.", source: infinity.url },
    ],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "85 g ±5 g")],
    sources: [infinity],
    plies: 5,
    layup: "5-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 80, max: 90 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-inspira-hybrid-carbon",
    name: "Inspira Hybrid Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 9.5 },
      { label: "Control", value: 3.3 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "An offensive koto-faced blade with an outer layer of STIGA's Hybrid Carbon, a mix of carbon and a vibration-reducing fibre.",
    description: [
      "The Inspira Hybrid Carbon uses what STIGA calls Hybrid Carbon, a combination of carbon fibre and a vibration-reducing fibre, placed directly beneath the koto outer veneer. STIGA does not publish the ply count on its product page.",
      "STIGA says the hybrid material increases dwell time and gives a cleaner ball impact and a higher trajectory, and rates the blade Speed 9.5 and Control 3.3, class Offensive +. It is sold with Master, Classic and Penhold handles and a stated weight of 90 g ±5 g; STIGA lists South Korea as the country of origin.",
    ],
    facts: [],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "90 g ±5 g")],
    sources: [inspiraHc],
    plies: null,
    layup: null,
    fibers: ["carbon", "other"],
    fiberName: "Hybrid Carbon",
    fiberPosition: "outer",
    outerWood: "Koto",
    weightG: { min: 85, max: 95 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive +",
    madeIn: "South Korea",
  },
  {
    ...bladeBase,
    id: "stiga-inspira-ccf",
    name: "Inspira CCF",
    manufacturerRatings: [
      { label: "Speed", value: 8.9 },
      { label: "Control", value: 5.2 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "A 5+2 offensive blade with the carbon next to the core (Close Core Fibre) and koto outer plies.",
    description: [
      "The Inspira CCF is a 5+2 blade: five wood plies and two carbon plies placed directly on the wood core, which STIGA calls CCF (Close Core Fibre). STIGA says the carbon is made in Germany and that the koto outer veneer has a surface treatment intended to increase dwell time.",
      "STIGA rates it Speed 8.9 and Control 5.2, class Offensive, and describes it as combining carbon speed and stability with the control of wood. It is sold with Master, Classic and Penhold handles and a stated weight of 90 g ±5 g.",
    ],
    facts: [],
    notes: [WEIGHT_BAND_NOTE("80 - 95", "90 g ±5 g")],
    sources: [inspiraCcf],
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Carbon fibre",
    fiberPosition: "inner",
    outerWood: "Koto",
    weightG: { min: 85, max: 95 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-destiny-carbon",
    name: "Destiny Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 8.6 },
      { label: "Control", value: 4.5 },
      { label: "Player Level", value: "Advanced" },
    ],
    releaseYear: null,
    summary: "A 5+2 outer-carbon blade with ultra-thin TeXtreme carbon, positioned by STIGA as a step from all-wood to carbon.",
    description: [
      "The Destiny Carbon is a 5+2 blade with outer carbon layers under limba veneers. STIGA uses an ultra-thin TeXtreme Spread Tow Carbon (64 g/m²) with 90-degree angles on this model.",
      "STIGA presents it as one of its carbon blades with the best control and as a blade for players moving from all-wood to carbon. It rates it Speed 8.6 and Control 4.5 at Advanced level. It is sold with Master, Classic and Penhold handles, with an average weight of 88 g according to STIGA.",
    ],
    facts: [],
    sources: [destiny],
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "TeXtreme® Spread Tow Carbon",
    fiberPosition: "outer",
    outerWood: "Limba",
    weightG: { min: 88 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-aura-hybrid-carbon",
    name: "Aura Hybrid Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 9.0 },
      { label: "Control", value: 6.2 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "An offensive blade with an inner layer of carbon plus a green vibration-reducing fibre placed next to the core.",
    description: [
      "The Aura Hybrid Carbon combines carbon fibre with a green-coloured, vibration-reducing fibre. STIGA says it uses CCF (Close Core Fibre) construction, so the hybrid layer sits directly on the wood core. STIGA does not publish the ply count or outer wood on its product page.",
      "STIGA rates it Speed 9.0 and Control 6.2 at Top Level and says it has a tough surface treatment for durability. It is sold with Master, Classic and Penhold handles, with an average weight of 88 g according to STIGA, and STIGA lists South Korea as the country of origin.",
    ],
    facts: [],
    sources: [aura],
    plies: null,
    layup: null,
    fibers: ["carbon", "other"],
    fiberName: "Hybrid Carbon",
    fiberPosition: "inner",
    outerWood: null,
    weightG: { min: 88 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: null,
    madeIn: "South Korea",
  },
  {
    ...bladeBase,
    id: "stiga-i1-hybrid-carbon",
    name: "I1 Hybrid Carbon",
    manufacturerRatings: [
      { label: "Speed", value: 8.8 },
      { label: "Control", value: 4.7 },
      { label: "Player Level", value: "Advanced" },
    ],
    releaseYear: null,
    summary: "An offensive limba blade with a thin hybrid layer of Innegra and carbon fibre directly under the outer veneer.",
    description: [
      "The I1 Hybrid Carbon uses a thin hybrid layer of Innegra and carbon fibre placed directly beneath the limba outer veneer. STIGA says the Innegra dampens unwanted vibrations while the carbon adds stability, and describes the blade as faster than all-wood blades but softer and more forgiving than pure carbon ones.",
      "STIGA rates it Speed 8.8 and Control 4.7, class Offensive, at Advanced level. It is sold with Classic, Master and Penhold handles and a stated weight of 85 g. STIGA does not publish the ply count on its product page.",
    ],
    facts: [],
    sources: [i1],
    plies: null,
    layup: null,
    fibers: ["carbon", "other"],
    fiberName: "Hybrid Carbon (Innegra™ and carbon fibre)",
    fiberPosition: "outer",
    outerWood: "Limba",
    weightG: { min: 85 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-defensive-classic-ii",
    name: "Defensive Classic II",
    manufacturerRatings: [
      { label: "Speed", value: 5.7 },
      { label: "Control", value: 9.7 },
      { label: "Player Level", value: "Intermediate" },
    ],
    releaseYear: null,
    summary: "A 5-ply all-wood defensive blade with a larger head and a soft outer veneer, updating STIGA's Defensive Classic.",
    description: [
      "The Defensive Classic II is a five-ply, all-wood defensive blade with limba outer veneers. STIGA describes it as an update of the Defensive Classic with a larger blade and a soft outer veneer for control of spin and placement.",
      "STIGA rates it Speed 5.7 and Control 9.7, class Defensive, at Intermediate level. It is sold with Classic and Master handles and a stated weight of 90 g ±5 g.",
    ],
    facts: [
      { text: "STIGA says the Defensive Classic II was developed in collaboration with defensive player Masato Shiono.", source: defensive2.url },
    ],
    sources: [defensive2],
    plies: 5,
    layup: "5-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 85, max: 95 },
    handles: [MASTER, CLASSIC],
    manufacturerClass: "Defensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-pure",
    name: "Pure",
    manufacturerRatings: [
      { label: "Speed", value: 7.9 },
      { label: "Control", value: 5.5 },
      { label: "Player Level", value: "Advanced" },
    ],
    releaseYear: null,
    summary: "A 7-ply all-wood offensive blade with an unprinted, undyed Scandinavian design, made in Eskilstuna.",
    description: [
      "The Pure is a seven-ply, all-wood offensive blade with limba outer veneers. STIGA rates it Speed 7.9 and Control 5.5 at Advanced level and describes it as an offensive blade for players who value control.",
      "Its design leaves out printing and dyed materials, which STIGA says makes it a little easier on the environment. It is sold with Classic, Master and Penhold handles; the only weight STIGA gives is its 80 to 95 g weight band. A version with Custom Weight Technology is sold separately as Pure CWT.",
    ],
    facts: [
      { text: "STIGA says all Pure blades are made at its facility in Eskilstuna, Sweden.", source: pure.url },
    ],
    sources: [pure],
    plies: 7,
    layup: "7-ply",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    weightG: { min: 80, max: 95 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive",
    madeIn: "Sweden",
  },
  {
    ...bladeBase,
    id: "stiga-wavy-ultra-fibre",
    name: "Wavy Ultra Fibre",
    aliases: ["Wavy"],
    manufacturerRatings: [
      { label: "Speed", value: 9.6 },
      { label: "Control", value: 3.3 },
      { label: "Player Level", value: "Top Level" },
    ],
    releaseYear: null,
    summary: "A 5+2 koto-faced blade with an outer layer of white \"ultra fibre\", which STIGA lists among its fastest blades.",
    description: [
      "The Wavy Ultra Fibre is a 5+2 blade with a white composite STIGA calls ultra fibre, placed just under the koto outer veneer. STIGA says the material reduces unwanted vibration and gives a clear sound on impact.",
      "STIGA describes it as one of its fastest blades and rates it Speed 9.6 and Control 3.3, class Offensive +. It is sold with Master, Classic and Penhold handles, with an average weight of 88 g according to STIGA, and STIGA lists China as the country of origin.",
    ],
    facts: [],
    sources: [wavy],
    plies: 7,
    layup: "5+2",
    fibers: ["other"],
    fiberName: "Ultra Fibre",
    fiberPosition: "outer",
    outerWood: "Koto",
    weightG: { min: 88 },
    handles: [MASTER, CLASSIC, PEN],
    manufacturerClass: "Offensive +",
    madeIn: "China",
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const ESN_NOTE =
  "STIGA states this rubber is made in Germany; its hardness is recorded on the European (ESN) scale on that basis. STIGA prints the degrees without naming a scale.";
const SHOP_THICKNESS_NOTE = "Sponge thicknesses are those offered on STIGA's European web shop.";
const DRAGON_TYPE_NOTE =
  "Listed as hybrid because STIGA gives the surface as \"Sticky\" and pairs it with its C-Touch Tensor technology (\"C-Touch Surface Tensor Technology\" on DNA Dragon Power).";

const rubberBase = {
  brandId: "stiga",
  status: "current" as const,
  lastVerified: ACCESSED,
  releaseYear: null,
  spongeColor: null,
  topsheetColors: ["Red", "Black"],
};

const ratings = (speed: number, spin: number, control: number, style?: string, level?: string) => [
  { label: "Speed", value: speed },
  { label: "Spin", value: spin },
  { label: "Control", value: control },
  ...(style ? [{ label: "Style", value: style }] : []),
  ...(level ? [{ label: "Player Level", value: level }] : []),
];

const dragonGrip = stiga("dna-dragon-grip-55", "DNA Dragon Grip 55");

const dragonPower = (code: string, hard: number, speed: number, control: number): Rubber => {
  const src = stiga(`dna-dragon-power-${code}`, `DNA Dragon Power ${hard}`);
  return {
    ...rubberBase,
    id: `stiga-dna-dragon-power-${code}`,
    name: `DNA Dragon Power ${hard}`,
    manufacturerRatings: ratings(speed, 146, control, "Offensive +", "Top Level"),
    summary: `A German-made STIGA rubber with a sticky topsheet on a ${hard}-degree Power Sponge Cell sponge, one of three DNA Dragon Power hardnesses.`,
    description: [
      `DNA Dragon Power pairs a sticky topsheet with STIGA's Power Sponge Cell (PSC) sponge and what STIGA calls C-Touch Surface Tensor Technology. This version has a ${hard}-degree sponge; the line is also sold at ${[52.5, 55, 57.5].filter((h) => h !== hard).join(" and ")} degrees.`,
      `STIGA says the PSC sponge gives a strong catapult effect and the surface gives grip for spin and high arcs. It rates this version Speed ${speed}, Spin 146 and Control ${control}, Style Offensive +, at Top Level. STIGA says it was developed with input from the Chinese national team and is made in Germany.`,
    ],
    facts: [],
    notes: [ESN_NOTE, SHOP_THICKNESS_NOTE, DRAGON_TYPE_NOTE],
    sources: [src, LARC],
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: hard, scale: "esn" },
    spongeThicknesses: ["2.15"],
    ittfApproved: true,
    madeIn: "Germany",
  };
};

const platinum = (code: string, label: string, hard: number, speed: number, control: number, thick: string[]): Rubber => {
  const src = stiga(`dna-platinum-${code}`, `DNA Platinum ${label}`);
  return {
    ...rubberBase,
    id: `stiga-dna-platinum-${code}`,
    name: `DNA Platinum ${label}`,
    manufacturerRatings: ratings(speed, 140, control, "Offensive +"),
    summary: `A German-made offensive rubber from STIGA's DNA series with Power Sponge Cell technology and a ${hard}-degree sponge.`,
    description: [
      `DNA Platinum is an offensive rubber from STIGA's DNA series, made in Germany. STIGA says its thin topsheet with short pimples leaves room for a thicker sponge, and that its Power Sponge Cell (PSC) technology adds catapult effect and a crisp sound. The ${label} version has a ${hard}-degree sponge.`,
      `STIGA rates it Speed ${speed}, Spin 140 and Control ${control}, Style Offensive +. The series is sold in S, M, H and XH hardnesses, and STIGA says it was developed in collaboration with the Chinese national team.`,
    ],
    facts: [
      { text: "STIGA says DNA Platinum's thin topsheet and short pimples allow a sponge of up to 2.3 mm.", source: src.url },
    ],
    notes: [
      ESN_NOTE,
      SHOP_THICKNESS_NOTE,
      "Listed as tensor because STIGA gives the surface as \"Standard\" (its other surfaces are \"Sticky\" and \"Semi-Sticky\") and says the Power Sponge Cells give increased catapult effect.",
    ],
    sources: [src, LARC],
    type: "tensor",
    tackiness: null,
    hardness: { min: hard, scale: "esn" },
    spongeThicknesses: thick,
    ittfApproved: true,
    madeIn: "Germany",
  };
};

const hybrid = (code: string, label: string, hard: number, speed: number, control: number, larcName: string | null): Rubber => {
  const src = stiga(`dna-hybrid-${code}`, `DNA Hybrid ${label}`);
  return {
    ...rubberBase,
    id: `stiga-dna-hybrid-${code}`,
    name: `DNA Hybrid ${label}`,
    manufacturerRatings: ratings(speed, 144, control, "Offensive"),
    summary: `A German-made STIGA hybrid rubber with a semi-sticky topsheet on a ${hard}-degree Power Sponge Cell sponge.`,
    description: [
      `DNA Hybrid combines a semi-sticky topsheet with STIGA's Power Sponge Cell (PSC) sponge and what STIGA calls H-Touch Tensor technology. The ${label} version has a ${hard}-degree sponge and is made in Germany and designed in Sweden.`,
      `STIGA says the semi-sticky surface helps generate rotation and a longer trajectory, and rates this version Speed ${speed}, Spin 144 and Control ${control}, Style Offensive. The series is sold in M, H, XH and 55 hardnesses.`,
    ],
    facts: [],
    notes: [
      ESN_NOTE,
      SHOP_THICKNESS_NOTE,
      "Listed as hybrid because STIGA gives the surface as \"Semi-Sticky\" and pairs it with its H-Touch Tensor and Power Sponge Cell technologies.",
      ...(larcName ? [] : ["The 1 January 2026 ITTF LARC lists a \"DNA Hybrid Sponge 55\" (68-082) rather than \"DNA Hybrid 55\"; approval is recorded from STIGA's product page, which states it is approved by ITTF."]),
    ],
    sources: larcName ? [src, LARC] : [src],
    type: "hybrid",
    tackiness: "slightly-tacky",
    hardness: { min: hard, scale: "esn" },
    spongeThicknesses: ["2.2"],
    ittfApproved: true,
    madeIn: "Germany",
  };
};

const mantraPro = (code: string, label: string, hard: number, speed: number, control: number, style: string | undefined, extraNotes: string[]): Rubber => {
  const src = stiga(`mantra-pro-${code}`, `Mantra Pro ${label}`);
  return {
    ...rubberBase,
    id: `stiga-mantra-pro-${code}`,
    name: `Mantra Pro ${label}`,
    manufacturerRatings: ratings(speed, 135, control, style),
    summary: `A Japanese-made offensive STIGA rubber with Oxygen Capsule System sponge pores, ${label === "M" ? "medium" : label === "H" ? "hard" : "extra hard"} version.`,
    description: [
      `Mantra Pro is an offensive rubber that STIGA says is made in Japan and designed in Sweden. It uses what STIGA calls the Oxygen Capsule System (OCS), enlarged sponge pores that STIGA says give a higher arc, more catapult effect and a crisp sound. The ${label} version has a ${hard}-degree sponge according to STIGA's specifications.`,
      `STIGA rates it Speed ${speed}, Spin 135 and Control ${control}, and says a mix of natural and synthetic rubber makes it more durable than earlier generations. The series is sold in M, H and XH hardnesses.`,
    ],
    facts: [],
    notes: [
      "STIGA prints the hardness in degrees without naming a scale and the rubber is made in Japan, so the scale is recorded as unstated.",
      `The 1 January 2026 ITTF LARC also authorises ${label === "XH" ? "Blue and Pink" : "Blue, Pink and Violet"} topsheets for Mantra Pro ${label}; STIGA's web shop lists Red and Black.`,
      "Listed as tensor because STIGA says the Oxygen Capsule System's enlarged sponge pores give more catapult effect; the topsheet surface is given as \"Standard\".",
      SHOP_THICKNESS_NOTE,
      ...extraNotes,
    ],
    sources: [src, LARC],
    type: "tensor",
    tackiness: null,
    hardness: { min: hard, scale: "unstated" },
    spongeThicknesses: ["2.1"],
    ittfApproved: true,
    madeIn: "Japan",
  };
};

const helix = (code: string, label: string, hard: number, speed: number, control: number): Rubber => {
  const src = stiga(`helix-platinum-${code}`, `Helix Platinum ${label}`);
  return {
    ...rubberBase,
    id: `stiga-helix-platinum-${code}`,
    name: `Helix Platinum ${label}`,
    manufacturerRatings: ratings(speed, 142, control, "Offensive +"),
    summary: `A German-made offensive STIGA rubber built on its Optimized Energy Sponge, ${hard}-degree version.`,
    description: [
      `Helix Platinum is an offensive rubber that STIGA says is developed in Sweden and made in Germany. It uses what STIGA calls an Optimized Energy Sponge with small pores; STIGA claims up to 11% more energy return per shot. The ${label} version has a ${hard}-degree sponge.`,
      `STIGA rates it Speed ${speed}, Spin 142 and Control ${control}, Style Offensive +, and sells it in a 2.2 mm sponge. The series comes in M, H, XH and 55 hardnesses.`,
    ],
    facts: [],
    notes: [
      ESN_NOTE,
      "Listed as tensor because STIGA describes the Optimized Energy Sponge as returning up to 11% more energy per shot; the topsheet surface is given as \"Standard\".",
    ],
    sources: [src, LARC],
    type: "tensor",
    tackiness: null,
    hardness: { min: hard, scale: "esn" },
    spongeThicknesses: ["2.2"],
    ittfApproved: true,
    madeIn: "Germany",
  };
};

export const rubbers: Rubber[] = [
  {
    ...rubberBase,
    id: "stiga-dna-dragon-grip-55",
    name: "DNA Dragon Grip 55",
    aliases: ["DNA Dragon Grip"],
    manufacturerRatings: ratings(132, 146, 80, "Offensive"),
    summary: "A German-made STIGA rubber with a sticky topsheet on a hard 55-degree C-Touch Tensor sponge.",
    description: [
      "DNA Dragon Grip 55 puts a sticky topsheet on a 55-degree sponge built with what STIGA calls C-Touch Tensor technology. STIGA says the surface gives grip for spin and long, high arcs, and that the rubber has a \"newly glued\" feel unlike other sticky rubbers.",
      "STIGA rates it Speed 132, Spin 146 and Control 80, Style Offensive. It is made in Germany.",
    ],
    facts: [
      { text: "STIGA says the C-Touch Tensor sponge in DNA Dragon Grip was developed with the help of AI-based data analysis together with feedback from top players.", source: dragonGrip.url },
    ],
    notes: [ESN_NOTE, SHOP_THICKNESS_NOTE, DRAGON_TYPE_NOTE],
    sources: [dragonGrip, LARC],
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 55, scale: "esn" },
    spongeThicknesses: ["2.3"],
    ittfApproved: true,
    madeIn: "Germany",
  },
  dragonPower("525", 52.5, 158, 77),
  dragonPower("55", 55, 162, 75),
  dragonPower("575", 57.5, 166, 73),
  platinum("s", "S", 42.5, 156, 78, ["2.1", "2.3"]),
  platinum("m", "M", 47.5, 160, 76, ["2.1", "2.3"]),
  platinum("h", "H", 50, 164, 74, ["2.1", "2.3"]),
  platinum("xh", "XH", 52.5, 168, 72, ["2.3"]),
  hybrid("m", "M", 47.5, 156, 78, "DNAHybridM"),
  hybrid("h", "H", 50, 160, 76, "DNAHybridH"),
  hybrid("xh", "XH", 52.5, 164, 74, "DNAHybridXH"),
  hybrid("55", "55", 55, 168, 72, null),
  mantraPro("m", "M", 47.5, 148, 82, undefined, [
    "STIGA's Specifications table gives the hardness as 47.5 while the product text on the same page says \"47-degree\"; the table value is recorded.",
    "STIGA's Specifications table shows \"Approved by ITTF: No\" for Mantra Pro M, but it is listed on the 1 January 2026 ITTF LARC (code 68-057), so it is recorded as approved.",
  ]),
  mantraPro("h", "H", 50, 152, 80, "Offensive", []),
  mantraPro("xh", "XH", 53, 156, 78, "Offensive", []),
  helix("m", "M", 47.5, 166, 75),
  helix("h", "H", 50, 170, 73),
  helix("xh", "XH", 52.5, 174, 71),
  helix("55", "55", 55, 178, 69),
];
