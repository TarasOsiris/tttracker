import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

const CATALOGUE_URL = "https://www.tibhar.info/Katalog/webpdf/TIBHAR_Katalog_2026_web_EN.pdf";

/** A page of Tibhar's official 2026/2027 English catalogue (linked from tibhar.info/en/kataloge). */
const cat = (page: number, label: string): Source => ({
  url: `${CATALOGUE_URL}#page=${page}`,
  label: `TIBHAR Catalogue 2026/2027 (EN), p. ${page}: ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** A page of Tibhar's company history on tibhar.info. */
const history = (slug: string, label: string): Source => ({
  url: `https://tibhar.info/en/firmengeschichte/${slug}/`,
  label: `TIBHAR company history: ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** A product page on tibhar.info. */
const tibharPage = (slug: string, label: string): Source => ({
  url: `https://tibhar.info/en/${slug}/`,
  label: `TIBHAR: ${label} product page`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const paddlePalace = (handle: string, label: string): Source => ({
  url: `https://www.paddlepalace.com/products/${handle}`,
  label: `Paddle Palace: ${label}`,
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

const ABOUT: Source = {
  url: "https://tibhar.info/en/ueber-tibhar/",
  label: "TIBHAR: About TIBHAR (company history)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const CATALOGUES_PAGE: Source = {
  url: "https://tibhar.info/en/kataloge/",
  label: "TIBHAR: Catalogues (2026/2027 catalogue download)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

export const brand: Brand = {
  id: "tibhar",
  name: "Tibhar",
  country: "Germany",
  website: "https://tibhar.info",
  ratingNote:
    "Tibhar rates rubbers by Speed, Control and Spin with no stated maximum (its offensive inverted rubbers mostly score between 100 and 130), rates blades by Speed and Control with + and - modifiers (e.g. 9-, 7+), and gives every product a Strategy class such as OFF or ALL+; for Evolution and Infinity rubbers its hardness figure is the hardness of the whole rubber, not only the sponge.",
  hardnessScale: "unstated",
  logo: { src: "/equipment/brands/tibhar.webp", width: 364, height: 70, sourceUrl: "https://tibhar.info", credit: "Logo © Tibhar" },
  sources: [ABOUT, CATALOGUES_PAGE, cat(30, "Rubber overview"), cat(58, "Blade overview")],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const bladeOverview = cat(58, "Blade overview");
const STANDARD_WEIGHT = { min: 80, max: 90 };
const CPN_NOTE =
  "Tibhar's catalogue lists this blade with a \"CPN\" (penholder) handle without naming the penhold style; it is recorded here as a Chinese-style penhold, which is how Paddle Palace sells Tibhar's penhold blades (\"Penhold (2-Side)\").";
const WEIGHT_NOTE = "Tibhar lists the weight as 85 ±5 g, shown here as 80-90 g.";

const stratusCat = cat(51, "Stratus Powerwood, Stratus Powerdefense");
const stratusPwPp = paddlePalace("tibhar-stratus-power-wood-shakehand-blade", "Tibhar Stratus Power Wood");
const stratusPwMega: Source = {
  url: "https://www.megaspin.net/store/default.asp?pid=t-stratus-power-wood",
  label: "Megaspin: Tibhar Stratus Power Wood",
  kind: "retailer",
  accessed: ACCESSED,
};
const stratusPdPp = paddlePalace("tibhar-stratus-power-defense-shakehand-blade", "Tibhar Stratus Power Defense");

const ivCat = cat(46, "IV-L");
const ivHistory = history("1975-erste-tibhar-hoelzer-made-in-japan-im-verkauf", "1975, first TIBHAR blades \"Made in Japan\"");

const forceCat = cat(44, "Samsonov Force Pro, Force Pro Black Edition");
const forcePp = paddlePalace("tibhar-samsonov-force-pro-shakehand-blade", "Tibhar Samsonov Force Pro");
const forceBlackPp = paddlePalace(
  "tibhar-samsonov-force-pro-black-edition-shakehand-blade",
  "Tibhar Samsonov Force Pro Black Edition",
);

const alphaCat = cat(50, "Samsonov Alpha");
const alphaPp = paddlePalace("tibhar-samsonov-alpha-shakehand-blade", "Tibhar Samsonov Alpha");
const alphaHistory = history("1995-roland-berg-joins-tibhar-tibor-harangozo-gmbh", "1995, Roland Berg joins TIBHAR");

const felixCat = cat(33, "Felix Lebrun Hyper Carbon Inner");
const felixPage: Source = {
  url: "https://tibhar.info/en/felix-lebrun/",
  label: "TIBHAR: Félix Lebrun blades and rackets",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const felixPp = paddlePalace("tibhar-felix-lebrun-hyper-carbon-shakehand-blade", "Tibhar Felix Lebrun Hyper Carbon");
const felixPenPp = paddlePalace("tibhar-felix-lebrun-hyper-carbon-penhold-blade", "Tibhar Felix Lebrun Hyper Carbon Penhold");

const kryptoCat = cat(32, "Alexis Lebrun Krypto Carbon");
const kryptoPp = paddlePalace("tibhar-alexis-lebrun-krypto-carbon-shakehand-blade", "Tibhar Alexis Lebrun Krypto Carbon");
const kryptoTts: Source = {
  url: "https://www.tabletennisstore.us/products/tibhar-alexis-lebrun-krypto-carbon",
  label: "TableTennisStore.us: Tibhar Alexis Lebrun Krypto Carbon",
  kind: "retailer",
  accessed: ACCESSED,
};

const mkCat = cat(37, "MK Carbon, MK 7");
const mkPage: Source = {
  url: "https://tibhar.info/en/mk-series/",
  label: "TIBHAR: MK series (Kenta Matsudaira)",
  kind: "manufacturer",
  accessed: ACCESSED,
};
const mkCarbonPp = paddlePalace("tibhar-mk-carbon-shakehand-blade", "Tibhar MK Carbon");
const mkCarbonPenPp = paddlePalace("tibhar-mk-carbon-penhold-blade", "Tibhar MK Carbon Penhold");
const mk7Pp = paddlePalace("tibhar-mk-7-shakehand-blade", "Tibhar MK 7");

const jorgicCat = cat(34, "Darko Jorgic Infinity Carbon");

const fortinoCat = cat(41, "Fortino Pro DC Inside, Fortino Pro");
const fortinoPp = paddlePalace("tibhar-fortino-pro-shakehand-blade", "Tibhar Fortino Pro");

/** A page of the 2026 catalogue of TIBHAR JAPAN (TIBHAR JAPAN株式会社, Tibhar's Japanese company), linked from tibhar-japan.com/catalog. */
const jpCat = (page: number, label: string): Source => ({
  url: `https://tibhar-japan.com/wp-content/uploads/2026/04/2026CATALOG-260407.pdf#page=${page}`,
  label: `TIBHAR JAPAN Catalogue 2026 (JP), p. ${page}: ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

export const blades: Blade[] = [
  {
    id: "tibhar-stratus-power-wood",
    brandId: "tibhar",
    name: "Stratus Power Wood",
    aliases: ["Stratus Powerwood"],
    manufacturerRatings: [
      { label: "Speed", value: "9" },
      { label: "Control", value: "7+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply all-wood offensive blade from Tibhar's Stratus line, classed OFF- with a Speed rating of 9.",
    description: [
      "The Stratus Power Wood is a 5-ply all-wood blade. Tibhar classes it as OFF- and rates it 9 for speed and 7+ for control on its own blade scale.",
      "Tibhar describes it as flexible across the offensive repertoire, from hard flips to slower topspins with heavy rotation. It is sold with concave (flared), anatomic and straight handles.",
      "Tibhar does not publish the thickness; Paddle Palace and Megaspin both list it at 6.2 mm.",
    ],
    facts: [],
    notes: [WEIGHT_NOTE, "Thickness comes from retailers (Paddle Palace and Megaspin both list 6.2 mm); Tibhar's catalogue does not state it."],
    photo: { src: "/equipment/photos/blades/tibhar-stratus-power-wood.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/stratus-powerwood/", credit: "© Tibhar" },
    sources: [stratusCat, bladeOverview, stratusPwPp, stratusPwMega],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.2,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "OFF-",
    madeIn: null,
  },
  {
    id: "tibhar-stratus-power-defense",
    brandId: "tibhar",
    name: "Stratus Power Defense",
    aliases: ["Stratus Powerdefense"],
    manufacturerRatings: [
      { label: "Speed", value: "6+" },
      { label: "Control", value: "10" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply all-wood defensive blade with a slightly oversized head, which Tibhar rates 10 for control.",
    description: [
      "The Stratus Power Defense is a 5-ply all-wood blade that Tibhar describes as a relatively hard blade for the modern defensive game, with a head a little bigger than standard and a light weight.",
      "Tibhar rates it 6+ for speed and 10 for control and gives it the Strategy class ALL. It is sold with concave, anatomic and straight handles.",
    ],
    facts: [],
    notes: [
      "Tibhar lists the weight as 80 ±5 g, shown here as 75-85 g.",
      "Thickness (5.3 mm) comes from Paddle Palace; Tibhar's catalogue does not state it. Paddle Palace labels the class DEF+, while Tibhar's own catalogue says ALL.",
    ],
    photo: { src: "/equipment/photos/blades/tibhar-stratus-power-defense.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/stratus-powerdefense/", credit: "© Tibhar" },
    sources: [stratusCat, bladeOverview, stratusPdPp],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.3,
    weightG: { min: 75, max: 85 },
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "ALL",
    madeIn: null,
  },
  {
    id: "tibhar-iv-l",
    brandId: "tibhar",
    name: "IV-L",
    manufacturerRatings: [
      { label: "Speed", value: "7" },
      { label: "Control", value: "9-" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-running 4-ply all-wood allround blade from Tibhar, described by the maker as soft and fast.",
    description: [
      "The IV-L is a 4-ply all-wood blade. Tibhar says its unusual ply combination makes it soft and fast and sets it apart from conventional ALL/OFF blades, and pitches it at allround and attacking players who put control first.",
      "Tibhar rates it 7 for speed and 9- for control with the Strategy class ALL. It is sold with concave, anatomic, straight and conic handles.",
    ],
    facts: [
      {
        text: "Tibhar's company history says the IV-L and IV-S were born from a \"soft but fast\" blade series that Tibor Harangozo developed with former Romanian national coach Victor Vladone in the year after 1975.",
        source: ivHistory.url,
      },
    ],
    notes: [WEIGHT_NOTE, "Tibhar does not publish the thickness or ply woods, and no listed retailer page with these values was found."],
    photo: { src: "/equipment/photos/blades/tibhar-iv-l.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/iv-l/", credit: "© Tibhar" },
    sources: [ivCat, bladeOverview, ivHistory],
    lastVerified: ACCESSED,
    plies: 4,
    layup: "4",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: null,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST", "CON"],
    manufacturerClass: "ALL",
    madeIn: null,
  },
  {
    id: "tibhar-samsonov-force-pro",
    brandId: "tibhar",
    name: "Samsonov Force Pro",
    manufacturerRatings: [
      { label: "Speed", value: "9-" },
      { label: "Control", value: "7" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade with limba outer plies, named after Vladimir Samsonov.",
    description: [
      "The Samsonov Force Pro is a 7-ply all-wood blade bearing the name of Vladimir Samsonov. Tibhar says its limba outer plies supply the power, while the middle and central plies provide ball control.",
      "Tibhar rates it 9- for speed and 7 for control, with the Strategy class OFF. It is sold with concave, anatomic and straight handles.",
    ],
    facts: [
      {
        text: "Tibhar says it signed Vladimir Samsonov at age 15, after the dissolution of the Soviet Union in December 1991, and that he reached world number 1 in December 1997.",
        source: ABOUT.url,
      },
    ],
    notes: [WEIGHT_NOTE, "Thickness (6.4 mm) comes from Paddle Palace; Tibhar's catalogue does not state it."],
    photo: { src: "/equipment/photos/blades/tibhar-samsonov-force-pro.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/samsonov-force-pro/", credit: "© Tibhar" },
    sources: [forceCat, bladeOverview, forcePp, ABOUT],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: "Limba",
    thicknessMm: 6.4,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-samsonov-force-pro-black-edition",
    brandId: "tibhar",
    name: "Samsonov Force Pro Black Edition",
    aliases: ["Force Pro Black Edition"],
    manufacturerRatings: [
      { label: "Speed", value: "9-" },
      { label: "Control", value: "7+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade that Tibhar presents as the sibling of the Samsonov Force Pro, rated 7+ for control.",
    description: [
      "The Force Pro Black Edition is a 7-ply all-wood offensive blade that Tibhar calls the \"brother\" of the Samsonov Force Pro. Tibhar quotes Vladimir Samsonov, who tested the prototype, as saying you can feel each ball on the blade whether you hit hard or soft.",
      "It has the same Speed rating (9-) and Strategy class (OFF) as the Force Pro but a Control rating of 7+ instead of 7. Tibhar sells it with concave, anatomic and straight handles.",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Thickness (6.8 mm) comes from Paddle Palace; Tibhar's catalogue does not state it. Paddle Palace lists a weight of 90 g and only flared and straight handles, while Tibhar's catalogue lists 85 ±5 g and concave, anatomic and straight handles.",
      "Tibhar's catalogue names it \"Force Pro Black Edition\"; retailers sell it as \"Samsonov Force Pro Black Edition\".",
    ],
    photo: { src: "/equipment/photos/blades/tibhar-samsonov-force-pro-black-edition.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/samsonov-force-pro-black-edition/", credit: "© Tibhar" },
    sources: [forceCat, bladeOverview, forceBlackPp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.8,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-samsonov-alpha",
    brandId: "tibhar",
    name: "Samsonov Alpha",
    manufacturerRatings: [
      { label: "Speed", value: "8" },
      { label: "Control", value: "8-" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply all-wood blade with a strong middle ply, classed OFF- by Tibhar and in its range since the 1990s.",
    description: [
      "The Samsonov Alpha is a 5-ply all-wood blade. Tibhar says its combination of fine veneers with an extra-strong middle ply gives a livelier rebound with more control, and that it lets a player switch from passive to aggressive play, including aggressive blocks.",
      "Tibhar rates it 8 for speed and 8- for control, with the Strategy class OFF-. It is sold with concave, anatomic and straight handles.",
    ],
    facts: [
      {
        text: "Tibhar's company history names the Samsonov Alpha among the new products it brought to market around 1995, the year Roland Berg joined the company.",
        source: alphaHistory.url,
      },
    ],
    notes: [WEIGHT_NOTE, "Thickness (5.9 mm) comes from Paddle Palace; Tibhar's catalogue does not state it."],
    photo: { src: "/equipment/photos/blades/tibhar-samsonov-alpha.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/samsonov-alpha/", credit: "© Tibhar" },
    sources: [alphaCat, bladeOverview, alphaPp, alphaHistory],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "5",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.9,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "OFF-",
    madeIn: null,
  },
  {
    id: "tibhar-felix-lebrun-hyper-carbon",
    brandId: "tibhar",
    name: "Felix Lebrun Hyper Carbon",
    aliases: ["Felix Lebrun Hyper Carbon Inner", "Felix Lebrun Hyper Carbon Inside", "F. Lebrun Hyper Carbon"],
    manufacturerRatings: [
      { label: "Speed", value: "9-" },
      { label: "Control", value: "8-" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner-composite offensive blade developed for French penhold player Félix Lebrun, using a carbon and synthetic-fibre blend.",
    description: [
      "The Felix Lebrun Hyper Carbon combines five wood plies with two layers of what Tibhar calls Hyper Carbon, a blended fabric of carbon and synthetic fibres, placed directly around the core veneer. Tibhar says this inner position gives the stiffness a fast attacking blade needs with a longer, more sensitive ball contact than outer fibre layers.",
      "Tibhar developed it to the wishes of Félix Lebrun and sells it with concave and straight shakehand handles and a penhold handle. It is rated 9- for speed and 8- for control, Strategy class OFF.",
      "The 2026/2027 catalogue lists it as \"Hyper Carbon Inner\"; Tibhar's player page and retailers call it simply \"Felix Lebrun Hyper Carbon\".",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Tibhar's catalogue product page calls it \"Felix Lebrun Hyper Carbon Inner\" while its blade overview table says \"Felix Lebrun Hyper Carbon Inside\".",
      "Thickness (6.0 mm) comes from Paddle Palace (shakehand and penhold listings); Tibhar's catalogue does not state it.",
      CPN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/tibhar-felix-lebrun-hyper-carbon.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/felix-lebrun-hyper-carbon/", credit: "© Tibhar" },
    sources: [felixCat, bladeOverview, felixPage, felixPp, felixPenPp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Hyper Carbon (carbon blended with synthetic fibres)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 6.0,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-alexis-lebrun-krypto-carbon",
    brandId: "tibhar",
    name: "Alexis Lebrun Krypto Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "9" },
      { label: "Control", value: "7" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 carbon offensive blade built around Tibhar's Krypto Carbon fabric and developed for Alexis Lebrun.",
    description: [
      "The Alexis Lebrun Krypto Carbon pairs five wood plies with two layers of Krypto Carbon, which Tibhar describes as a carbon fabric of voluminous fibres with a special structure. Tibhar does not say where in the blade the carbon sits.",
      "Tibhar says the blade was tailored to Alexis Lebrun's game of constant changes of speed and spin and gives fine stroke feedback. It is rated 9 for speed and 7 for control, Strategy class OFF, and sold with concave, straight and penhold handles.",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Thickness (5.7 mm) comes from retailers (Paddle Palace and TableTennisStore.us both list 5.7 mm); Tibhar's catalogue does not state it.",
      CPN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/tibhar-alexis-lebrun-krypto-carbon.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/alexis-lebrun-krypto-carbon/", credit: "© Tibhar" },
    sources: [kryptoCat, bladeOverview, kryptoPp, kryptoTts],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Krypto Carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.7,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-mk-carbon",
    brandId: "tibhar",
    name: "MK Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "9" },
      { label: "Control", value: "7+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 carbon offensive blade from Tibhar's Kenta Matsudaira (MK) series, using two layers of crypto-carbon fabric.",
    description: [
      "The MK Carbon combines selected veneers with two layers of crypto-carbon fabric. Tibhar says the result is a longer ball contact that improves control without giving up the power of a carbon blade, and that Kenta Matsudaira was personally in charge of its development.",
      "Tibhar refers to \"Japanese craftsmanship\" in the blade but does not state where it is made. It is rated 9 for speed and 7+ for control, Strategy class OFF, and sold with concave, straight and penhold handles.",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Tibhar does not say whether the carbon layers sit under the outer veneer or next to the core.",
      "Thickness (5.8 mm) comes from Paddle Palace (shakehand and penhold listings); Tibhar's catalogue does not state it.",
      CPN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/tibhar-mk-carbon.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/mk-carbon/", credit: "© Tibhar" },
    sources: [mkCat, bladeOverview, mkPage, mkCarbonPp, mkCarbonPenPp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "crypto-carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 5.8,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-mk-7",
    brandId: "tibhar",
    name: "MK 7",
    manufacturerRatings: [
      { label: "Speed", value: "9-" },
      { label: "Control", value: "8" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade from Tibhar's Kenta Matsudaira (MK) series.",
    description: [
      "The MK 7 is a 7-ply all-wood blade in Tibhar's MK series. Tibhar pitches it at players who want a true offensive blade with speed, spin and good feedback, usable close to and away from the table.",
      "Tibhar rates it 9- for speed and 8 for control with the Strategy class OFF, and sells it with concave, anatomic, straight and penhold handles.",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Thickness (7.0 mm) comes from Paddle Palace; Tibhar's catalogue does not state it. Paddle Palace labels the class OFF-, while Tibhar's catalogue says OFF.",
      CPN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/tibhar-mk-7.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/mk-7/", credit: "© Tibhar" },
    sources: [mkCat, bladeOverview, mkPage, mk7Pp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 7.0,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST", "CS"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-darko-jorgic-infinity-carbon",
    brandId: "tibhar",
    name: "Darko Jorgic Infinity Carbon",
    manufacturerRatings: [
      { label: "Speed", value: "9" },
      { label: "Control", value: "7" },
    ],
    releaseYear: null,
    status: "current",
    summary: "An asymmetric 5+2 carbon blade with the carbon layer under the outer veneer on one side and next to the core on the other.",
    description: [
      "The Darko Jorgic Infinity Carbon has five wood plies and two carbon layers placed differently on each side: Tibhar says one side is \"outer\" carbon for more power in hard, aggressive play, and the other is \"inner\" carbon for more feel and control in serve-receive and placed attacks.",
      "Tibhar aims it at one-sided players who want power on their stronger wing and control on the weaker one, and links the design to Darko Jorgic's hard backhand and placement-oriented forehand. It is rated 9 for speed and 7 for control, Strategy class OFF, and sold with concave and straight handles.",
    ],
    facts: [],
    notes: [WEIGHT_NOTE, "Tibhar does not publish the thickness, and no listed retailer page with it was found."],
    photo: { src: "/equipment/photos/blades/tibhar-darko-jorgic-infinity-carbon.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/darko-jorgic-infinity-carbon/", credit: "© Tibhar" },
    sources: [jorgicCat, bladeOverview],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "carbon",
    fiberPosition: "other",
    outerWood: null,
    thicknessMm: null,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "ST"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "tibhar-fortino-pro",
    brandId: "tibhar",
    name: "Fortino Pro",
    manufacturerRatings: [
      { label: "Speed", value: "10" },
      { label: "Control", value: "7+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "The fastest blade in Tibhar's Fortino series, with a carbon and Dyneema fabric placed under the outer plies.",
    description: [
      "The Fortino Pro combines five wood plies with two plies of a fabric woven from carbon and Dyneema fibres. Tibhar places the fabric under the surface veneers and calls it the fastest blade of its Fortino \"Super Strong Series\".",
      "Tibhar says the fabric adds stability, reduces vibration and enlarges the sweet spot, and its description of the Fortino Pro DC Inside contrasts the two: there the same fibre sits next to the core for a softer touch. It is rated 10 for speed and 7+ for control, Strategy class OFF+, with concave, anatomic and straight handles.",
    ],
    facts: [],
    notes: [WEIGHT_NOTE, "Thickness (6.3 mm) comes from Paddle Palace; Tibhar's catalogue does not state it."],
    photo: { src: "/equipment/photos/blades/tibhar-fortino-pro.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/fortino-pro/", credit: "© Tibhar" },
    sources: [fortinoCat, bladeOverview, fortinoPp],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon", "other"],
    fiberName: "Dyneema® carbon",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 6.3,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "OFF+",
    madeIn: null,
  },
  {
    id: "tibhar-shang-kun-hybrid-ac",
    brandId: "tibhar",
    name: "Shang Kun Hybrid AC",
    aliases: ["Hybrid AC Inside"],
    manufacturerRatings: [
      { label: "Speed", value: "8" },
      { label: "Control", value: "8" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 composite blade with Tibhar's Hybrid AC fibre placed next to the core, classed OFF- and rated 8 for both speed and control.",
    description: [
      "The Shang Kun Hybrid AC combines five wood plies with two layers of Tibhar's Hybrid AC fibre, which Tibhar places directly on the inner veneer, next to the core. Tibhar says this gives the blade stability with a great deal of variability, and that its ball contact is more intensive and longer than that of the Shang Kun ZC.",
      "Tibhar pitches it at flexible attacking players. It is rated 8 for speed and 8 for control, Strategy class OFF-, and sold with concave, straight and penhold handles.",
      "Tibhar's English website still calls it \"Shang Kun Hybrid AC\", while its 2026/2027 catalogue and German website list it as \"Hybrid AC Inside\".",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Tibhar's 2026/2027 catalogue and German website name this blade \"Hybrid AC Inside\"; its English website product page names it \"Shang Kun Hybrid AC\" with the same description and ratings.",
      "Tibhar does not state what the Hybrid AC fabric is made of (its catalogue only calls it a blended mesh fabric); Paddle Palace and Megaspin list the plies as \"5w, 2a/c\" without expanding the abbreviation, so the fibre is recorded as \"other\" rather than guessed as arylate or aramid carbon.",
      "Thickness (5.9 mm, given as \"5.9±\") and country of manufacture (Japan) come from the 2026 catalogue of TIBHAR JAPAN, Tibhar's Japanese company; Tibhar's international catalogue states neither. Paddle Palace and Megaspin also list 5.9 mm.",
      CPN_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/tibhar-shang-kun-hybrid-ac.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/shang-kun-hybrid-ac/", credit: "© Tibhar" },
    sources: [
      cat(38, "Hybrid AC Inside"),
      jpCat(14, "Hybrid AC Inside"),
      jpCat(15, "blade specification table"),
      bladeOverview,
      cat(59, "Hybrid ZC, Hybrid ZAC (blade technologies)"),
      {
        url: "https://tibhar.info/en/shop/shang-kun-hybrid-ac/",
        label: "TIBHAR: Shang Kun Hybrid AC product page (English)",
        kind: "manufacturer",
        accessed: ACCESSED,
      },
      {
        url: "https://tibhar.info/shop/hybrid-ac-inside/",
        label: "TIBHAR: Hybrid AC Inside product page (German)",
        kind: "manufacturer",
        accessed: ACCESSED,
      },
      paddlePalace("tibhar-shang-kun-hybrid-ac-shakehand-blade", "Tibhar Shang Kun Hybrid AC"),
      {
        url: "https://www.megaspin.net/store/default.asp?pid=t-shang-kun-hybrid-ac",
        label: "Megaspin: Tibhar Shang Kun Hybrid AC",
        kind: "retailer",
        accessed: ACCESSED,
      },
    ],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["other"],
    fiberName: "Hybrid AC",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "ST", "CS"],
    manufacturerClass: "OFF-",
    madeIn: "Japan",
  },
  {
    id: "tibhar-miyuu-kihara-bingo",
    brandId: "tibhar",
    name: "Miyuu Kihara BINGO",
    manufacturerRatings: [
      { label: "Speed", value: "9-" },
      { label: "Control", value: "8" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5+2 inner Krypto Carbon blade made as Miyuu Kihara's signature model and sold by Tibhar Japan.",
    description: [
      "The Miyuu Kihara BINGO is a signature blade from TIBHAR JAPAN, Tibhar's Japanese company. It has five wood plies and two plies of Krypto Carbon placed on the inside, next to the core.",
      "Tibhar Japan describes the feel as soft but with a firm core, and says its moderate bounce suits a wide choice of rubbers. It rates the blade 9- for speed and 8 for control, gives a thickness of about 6 mm and a reference average weight of 84 g, and sells it with flared and straight handles.",
      "The blade appears in Tibhar Japan's range; Tibhar's international 2026/2027 catalogue does not list it.",
    ],
    facts: [
      {
        text: "Tibhar Japan says the BINGO is Tibhar's first blade to use Krypto Carbon in an inner position.",
        source: "https://tibhar-japan.com/rackets/",
      },
    ],
    notes: [
      "All values come from TIBHAR JAPAN (its rackets page and 2026 catalogue); Tibhar's international catalogue does not list this blade, so no Strategy class is given.",
      "Tibhar Japan gives the weight as a reference average of 84 g and says individual blades vary by about ±5 g; the thickness is given as \"6mm±\" with about ±1 mm variation.",
      "Tibhar Japan's product page and the catalogue's product page (p. 13) list the construction as 5 wood plies + 2 Krypto Carbon (inner); the catalogue's summary table (p. 15) instead lists \"5 wood + 2 hybrid carbon\". The product pages are followed here.",
    ],
    photo: { src: "/equipment/photos/blades/tibhar-miyuu-kihara-bingo.webp", width: 800, height: 508, sourceUrl: "https://tibhar-japan.com/rackets/", credit: "© Tibhar" },
    sources: [
      {
        url: "https://tibhar-japan.com/rackets/",
        label: "TIBHAR JAPAN: Rackets (Miyuu Kihara BINGO)",
        kind: "manufacturer",
        accessed: ACCESSED,
      },
      jpCat(13, "Miyuu Kihara BINGO"),
      jpCat(15, "blade specification table"),
    ],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["carbon"],
    fiberName: "Krypto Carbon",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 84 },
    handles: ["FL", "ST"],
    manufacturerClass: null,
    madeIn: "Korea",
  },
  {
    id: "tibhar-szocs-signature",
    brandId: "tibhar",
    name: "Szöcs Signature 1",
    aliases: ["Bernadette Szocs Signature 1"],
    manufacturerRatings: [
      { label: "Speed", value: "8-" },
      { label: "Control", value: "8+" },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply all-wood offensive blade with hard inner and softer outer veneers, made as Bernadette Szöcs's signature model.",
    description: [
      "The Szöcs Signature 1 is a 7-ply all-wood blade named after Romanian player Bernadette Szöcs. Tibhar says it combines hard inner veneers with more delicate outer veneers, and pitches it at an aggressive, powerful game at the table and at half distance.",
      "Tibhar rates it 8- for speed and 8+ for control, with the Strategy class OFF-, and sells it with concave, anatomic and straight handles.",
    ],
    facts: [],
    notes: [
      WEIGHT_NOTE,
      "Thickness (6.8 mm, given as \"6.8±\") and country of manufacture (China) come from the 2026 catalogue of TIBHAR JAPAN, Tibhar's Japanese company; Tibhar's international catalogue states neither. Paddle Palace and Megaspin list 6.6 mm.",
      "TIBHAR JAPAN's catalogue rates it 8+ for speed and 8- for control with an average weight of 87 g; Tibhar's international catalogue and website give 8- speed, 8+ control and 85 ±5 g, which are shown here.",
    ],
    photo: { src: "/equipment/photos/blades/tibhar-szocs-signature.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/szoecs-signature-1/", credit: "© Tibhar" },
    sources: [
      cat(53, "Szöcs Signature 1, Li Qian"),
      bladeOverview,
      {
        url: "https://tibhar.info/en/shop/szoecs-signature-1/",
        label: "TIBHAR: Szöcs Signature 1 product page",
        kind: "manufacturer",
        accessed: ACCESSED,
      },
      jpCat(14, "Szöcs Signature"),
      jpCat(15, "blade specification table"),
      paddlePalace("tibhar-bernadette-szocs-signature-1-shakehand-blade", "Tibhar Bernadette Szocs Signature 1"),
      {
        url: "https://www.megaspin.net/store/default.asp?pid=t-szocs-signature-1",
        label: "Megaspin: Tibhar Bernadette Szocs Signature 1",
        kind: "retailer",
        accessed: ACCESSED,
      },
    ],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "7",
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.8,
    weightG: STANDARD_WEIGHT,
    handles: ["FL", "AN", "ST"],
    manufacturerClass: "OFF-",
    madeIn: "China",
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const rubberOverview = cat(30, "Rubber overview");
const techPage = cat(31, "Rubber technologies");

const RUBBER_HARDNESS_NOTE =
  "Tibhar marks this figure with an asterisk: for Evolution and Infinity rubbers the hardness is that of the whole rubber (topsheet plus sponge), not of the sponge alone, so it isn't directly comparable with sponge-hardness figures.";
const SCALE_NOTE =
  "Tibhar prints the hardness in degrees without naming the scale or the country of manufacture, so no hardness band is derived from it.";
const EVOLUTION_ORIGIN_NOTE =
  "Retailers disagree on where Evolution rubbers are made (Megaspin says Germany, TableTennisStore.us says Japan) and Tibhar doesn't say, so the country of manufacture is left blank.";

const EVOLUTION_TENSION_NOTE =
  "Typed as tensor: Paddle Palace lists it with \"Rubber Tech: Tension\", and Tibhar's catalogue describes the Evolution sponge technology under its PRO TENSION heading.";
const webRatingsNote = (values: string) =>
  `Tibhar's website product page gives different figures from the 2026/2027 catalogue (${values}); the catalogue values are shown here.`;

const evoMxCat = cat(10, "Evolution MX-S, Evolution MX-P");
const evoDCat = cat(9, "Evolution MX-D, Evolution MX-P 50");
const evoElCat = cat(11, "Evolution EL-S, Evolution EL-P");
const evoFxCat = cat(12, "Evolution FX-P, Evolution FX-S");
const k3ProCat = cat(4, "Hybrid K3 Pro, Hybrid K3 FX");
const k3Cat = cat(5, "Hybrid K3");
const mkRubberCat = cat(7, "Hybrid MK, Hybrid MK Pro");
const infinityCat = cat(3, "Infinity MX-S, Infinity MX-P");
const qxpCat = cat(14, "Quantum X Pro");
const aurusCat = cat(16, "Aurus, Aurus Sound, Aurus Soft");
const speedyCat = cat(24, "Speedy Soft D.TecS, Speedy Soft");
const grassCat = cat(26, "Grass, Grass D.TecS");
const megaEvolution: Source = {
  url: "https://www.megaspin.net/store/collection.asp?id=tibhar-evolution",
  label: "Megaspin: Tibhar Evolution Series",
  kind: "retailer",
  accessed: ACCESSED,
};
const ttsMxp: Source = {
  url: "https://www.tabletennisstore.us/products/tibhar-evolution-mx-p-table-tennis-inverted-rubber",
  label: "TableTennisStore.us: Tibhar Evolution MX-P",
  kind: "retailer",
  accessed: ACCESSED,
};
const ppRubber = (handle: string, name: string) => paddlePalace(handle, `Tibhar ${name}`);
const ppMxp = ppRubber("tibhar-evolution-mx-p-rubber", "Evolution MX-P");
const ppMxp50 = ppRubber("tibhar-evolution-mx-p-50-rubber", "Evolution MX-P 50");
const ppMxs = ppRubber("tibhar-evolution-mx-s-rubber", "Evolution MX-S");
const ppMxd = ppRubber("tibhar-evolution-mx-d-rubber", "Evolution MX-D");
const ppElp = ppRubber("tibhar-evolution-el-p-rubber", "Evolution EL-P");
const ppFxp = ppRubber("tibhar-evolution-fx-p-rubber", "Evolution FX-P");
const ppQxp = ppRubber("tibhar-quantum-x-pro-rubber", "Quantum X Pro");
const ppAurus = ppRubber("tibhar-aurus-rubber", "Aurus");
const webMxp = tibharPage("evolution-mx-p", "Evolution MX-P");
const webMxs = tibharPage("evolution-mx-s", "Evolution MX-S");
const webMxd = tibharPage("evolution-mx-d", "Evolution MX-D");
const webElp = tibharPage("evolution-el-p", "Evolution EL-P");
const webFxp = tibharPage("evolution-fx-p", "Evolution FX-P");
const webK3Pro = tibharPage("hybrid-k3-pro", "Hybrid K3 Pro");
const webInfinityMxp = tibharPage("infinity-mx-p", "Infinity MX-P");
const webQxp = tibharPage("quantum-x-pro", "Quantum X Pro");
const speedGlueHistory = history("2008-new-table-tennis-regulations", "2008, new table tennis regulations");

const evoRatings = (speed: number, control: number, spin: number, strategy: string) => [
  { label: "Speed", value: speed },
  { label: "Control", value: control },
  { label: "Spin", value: spin },
  { label: "Strategy", value: strategy },
];

export const rubbers: Rubber[] = [
  {
    id: "tibhar-evolution-mx-p",
    brandId: "tibhar",
    name: "Evolution MX-P",
    manufacturerRatings: evoRatings(125, 80, 122, "OFF- to OFF+"),
    releaseYear: null,
    status: "current",
    summary: "The hard, power-oriented member of Tibhar's Evolution family of tensioned rubbers, on the bright red Red Power Sponge.",
    description: [
      "Evolution MX-P is the hard \"P\" (power) version of Tibhar's Evolution series. Tibhar says its tuned pimple geometry puts more energy into attacking strokes and gives a longer ball contact than usual for a hard-sponge rubber, aimed at topspin players at the table and from half distance.",
      "Tibhar says its bright red, open-pored Red Power Sponge is the basis of the Evolution rubbers. Tibhar lists a rubber hardness of 45.7-47.7 and ratings of 125 speed, 80 control and 122 spin.",
    ],
    facts: [],
    notes: [
      RUBBER_HARDNESS_NOTE,
      SCALE_NOTE,
      EVOLUTION_ORIGIN_NOTE,
      EVOLUTION_TENSION_NOTE,
      "The product page lists 1.7-1.8, 1.9-2.0 and 2.1-2.2 mm; the rubber overview table in the same catalogue also lists 1.5 mm.",
      "Tibhar's MX-P 50 text refers to the standard MX-P as 47.5°, while the MX-P product page gives a rubber hardness of 45.7-47.7.",
      webRatingsNote("Speed 125, Control 80, Spin 120, Strategy OFF+, and 1.5-1.6 mm among the thicknesses"),
      "TableTennisStore.us also describes it as a high-tension rubber.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-evolution-mx-p.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/evolution-mx-p/", credit: "© Tibhar" },
    sources: [evoMxCat, rubberOverview, techPage, LARC, megaEvolution, ttsMxp, ppMxp, webMxp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 45.7, max: 47.7, scale: "unstated" },
    spongeThicknesses: ["1.7-1.8", "1.9-2.0", "2.1-2.2"],
    spongeColor: "Red",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-evolution-mx-p-50",
    brandId: "tibhar",
    name: "Evolution MX-P 50",
    aliases: ["Evolution MX-P 50°"],
    manufacturerRatings: evoRatings(128, 75, 120, "OFF to OFF+"),
    releaseYear: null,
    status: "current",
    summary: "A harder-sponge version of Evolution MX-P with the same topsheet, sold only in 2.1-2.2 mm.",
    description: [
      "Evolution MX-P 50 uses the same topsheet as the standard Evolution MX-P on a harder sponge. Tibhar says the harder sponge suits the plastic ball and plays noticeably differently from the standard MX-P, with a more forward, direct trajectory.",
      "It is sold only in 2.1-2.2 mm, with a listed rubber hardness of 48.8-50.8, and Tibhar rates it 128 for speed, 75 for control and 120 for spin.",
    ],
    facts: [
      {
        text: "Tibhar says the MX-P 50's topsheet is identical to that of the standard MX-P, which it describes as a 47.5° rubber.",
        source: evoDCat.url,
      },
    ],
    notes: [
      RUBBER_HARDNESS_NOTE,
      SCALE_NOTE,
      EVOLUTION_ORIGIN_NOTE,
      EVOLUTION_TENSION_NOTE,
      "The ITTF list names \"Evolution MX-P\" but not \"MX-P 50\". Tibhar says the topsheet is identical, but because the variant isn't listed by name, ITTF approval is left unconfirmed here.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-evolution-mx-p-50.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/evolution-mx-p50/", credit: "© Tibhar" },
    sources: [evoDCat, rubberOverview, LARC, ppMxp50],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 48.8, max: 50.8, scale: "unstated" },
    spongeThicknesses: ["2.1-2.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "tibhar-evolution-mx-s",
    brandId: "tibhar",
    name: "Evolution MX-S",
    manufacturerRatings: evoRatings(125, 80, 124, "ALL+ to OFF"),
    releaseYear: null,
    status: "current",
    summary: "The hard, spin-oriented version of Tibhar's Evolution rubber, with a pimple geometry tuned for longer ball contact.",
    description: [
      "Evolution MX-S is the spin (\"S\") counterpart of MX-P. Tibhar says its pimple geometry noticeably extends ball contact, and that players get the most from it with a little more physical effort in arm and wrist acceleration.",
      "Tibhar lists ratings of 125 speed, 80 control and 124 spin and a rubber hardness of 46.3-48.3. It notes that in 1.5-1.6 mm it is a modern classic for allround players.",
    ],
    facts: [],
    notes: [
      RUBBER_HARDNESS_NOTE,
      SCALE_NOTE,
      EVOLUTION_ORIGIN_NOTE,
      EVOLUTION_TENSION_NOTE,
      "The product page lists 1.7-1.8, 1.9-2.0 and 2.1-2.2 mm, but its text mentions a 1.5-1.6 mm version and the overview table lists 1.5 mm too.",
      "Tibhar's website MX-S product page repeats the MX-P figures (Speed 125, Control 80, Spin 120, hardness 45.7-47.7°, Strategy OFF+); the catalogue values are shown here.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-evolution-mx-s.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/evolution-mx-s/", credit: "© Tibhar" },
    sources: [evoMxCat, rubberOverview, techPage, LARC, megaEvolution, ppMxs, webMxs],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 46.3, max: 48.3, scale: "unstated" },
    spongeThicknesses: ["1.7-1.8", "1.9-2.0", "2.1-2.2"],
    spongeColor: "Red",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-evolution-mx-d",
    brandId: "tibhar",
    name: "Evolution MX-D",
    manufacturerRatings: evoRatings(130, 75, 122, "OFF to OFF+"),
    releaseYear: null,
    status: "current",
    summary: "The hardest and fastest-rated Evolution rubber, pairing the Evolution topsheet with Tibhar's Red Energy Sponge.",
    description: [
      "Evolution MX-D puts the Evolution topsheet on Tibhar's Red Energy Sponge. Tibhar presents it as a combination of MX-P's power and MX-S's spin, and says the sponge gives higher dynamics with a softer feel, especially in topspin.",
      "With a Speed rating of 130 and a rubber hardness of 50.3-52.3, it is the fastest-rated and hardest Evolution in Tibhar's catalogue. It is sold in 1.9-2.0 and 2.1-2.2 mm.",
    ],
    facts: [],
    notes: [
      RUBBER_HARDNESS_NOTE,
      SCALE_NOTE,
      EVOLUTION_ORIGIN_NOTE,
      EVOLUTION_TENSION_NOTE,
      "Tibhar's website product page gives the Strategy class as OFF+, while the catalogue says OFF to OFF+.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-evolution-mx-d.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/evolution-mx-d/", credit: "© Tibhar" },
    sources: [evoDCat, rubberOverview, techPage, LARC, ppMxd, webMxd],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50.3, max: 52.3, scale: "unstated" },
    spongeThicknesses: ["1.9-2.0", "2.1-2.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-evolution-el-p",
    brandId: "tibhar",
    name: "Evolution EL-P",
    manufacturerRatings: evoRatings(121, 83, 117, "ALL+ to OFF+"),
    releaseYear: null,
    status: "current",
    summary: "The medium-hard, elastic Evolution rubber that Tibhar places between the hard MX and soft FX versions.",
    description: [
      "Evolution EL-P uses a medium sponge and sits between the harder MX-P and MX-S and the softer FX-P. Tibhar describes it as the most elastic Evolution rubber and aims it at topspin players who find MX too hard and FX too soft.",
      "Tibhar says a slightly straighter rebound also makes it popular with blockers, especially in 1.5-1.6 mm. It lists ratings of 121 speed, 83 control and 117 spin and a rubber hardness of 42.4-44.4.",
    ],
    facts: [],
    notes: [
      RUBBER_HARDNESS_NOTE,
      SCALE_NOTE,
      EVOLUTION_ORIGIN_NOTE,
      EVOLUTION_TENSION_NOTE,
      "The product page lists 1.7-1.8, 1.9-2.0 and 2.1-2.2 mm, but its text mentions a 1.5-1.6 mm version and the overview table lists 1.5 mm too.",
      webRatingsNote("Speed 120, Control 85, Spin 120, Strategy OFF+"),
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-evolution-el-p.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/evolution-el-p/", credit: "© Tibhar" },
    sources: [evoElCat, rubberOverview, techPage, LARC, megaEvolution, ppElp, webElp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 42.4, max: 44.4, scale: "unstated" },
    spongeThicknesses: ["1.7-1.8", "1.9-2.0", "2.1-2.2"],
    spongeColor: "Red",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-evolution-fx-p",
    brandId: "tibhar",
    name: "Evolution FX-P",
    manufacturerRatings: evoRatings(120, 90, 115, "ALL to OFF"),
    releaseYear: null,
    status: "current",
    summary: "The softest Evolution rubber, with a soft sponge that Tibhar describes as having a strong catapult effect.",
    description: [
      "Evolution FX-P is the softest and most flexible member of the Evolution family. Tibhar says its soft sponge has a strong catapult effect and gives plenty of feel and control, aimed at players who attack close to the table.",
      "Tibhar lists ratings of 120 speed, 90 control and 115 spin, with a rubber hardness of 39.1-41.1.",
    ],
    facts: [],
    notes: [
      RUBBER_HARDNESS_NOTE,
      SCALE_NOTE,
      EVOLUTION_ORIGIN_NOTE,
      EVOLUTION_TENSION_NOTE,
      webRatingsNote("Speed 115, Control 90, Spin 120, Strategy OFF"),
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-evolution-fx-p.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/evolution-fx-p/", credit: "© Tibhar" },
    sources: [evoFxCat, rubberOverview, techPage, LARC, megaEvolution, ppFxp, webFxp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 39.1, max: 41.1, scale: "unstated" },
    spongeThicknesses: ["1.7-1.8", "1.9-2.0", "2.1-2.2"],
    spongeColor: "Red",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-hybrid-k3",
    brandId: "tibhar",
    name: "Hybrid K3",
    manufacturerRatings: evoRatings(118, 100, 130, "OFF+"),
    releaseYear: null,
    status: "current",
    summary: "A hybrid rubber that pairs a very tacky topsheet with a hard 53° sponge, which Tibhar says still gives a strong catapult effect.",
    description: [
      "Hybrid K3 combines a very tacky topsheet with a hard sponge. Tibhar says that despite the tackiness it has a high dynamic and a strong catapult effect, with the hard sponge as the basis for its speed.",
      "Tibhar lists a sponge hardness of 53°, ratings of 118 speed, 100 control and 130 spin, and sells it in 2.0 mm and MAX.",
    ],
    facts: [],
    notes: [SCALE_NOTE],
    photo: { src: "/equipment/photos/rubbers/tibhar-hybrid-k3.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/hybrid-k3/", credit: "© Tibhar" },
    sources: [k3Cat, rubberOverview, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 53, scale: "unstated" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-hybrid-k3-pro",
    brandId: "tibhar",
    name: "Hybrid K3 Pro",
    manufacturerRatings: evoRatings(125, 95, 130, "OFF+"),
    releaseYear: null,
    status: "current",
    summary: "A harder (55°) version of Hybrid K3 aimed at uncompromising attackers.",
    description: [
      "Hybrid K3 Pro raises the sponge hardness of the Hybrid K3 to 55°. Tibhar says the extra hardness adds power for the opening and for countering attacks, with a high arc that helps from half distance.",
      "Tibhar describes the surface as adhering and says it helps generate more spin on serve and return. It lists ratings of 125 speed, 95 control and 130 spin, sold in 2.0 mm and MAX.",
    ],
    facts: [],
    notes: [
      SCALE_NOTE,
      "The ITTF list names \"Hybrid K3\" but not \"Hybrid K3 Pro\", so ITTF approval is left unconfirmed here.",
      webRatingsNote("Control 90 instead of 95"),
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-hybrid-k3-pro.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/hybrid-k3-pro/", credit: "© Tibhar" },
    sources: [k3ProCat, rubberOverview, LARC, webK3Pro],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: null,
    hardness: { min: 55, scale: "unstated" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "tibhar-hybrid-mk",
    brandId: "tibhar",
    name: "Hybrid MK",
    manufacturerRatings: evoRatings(124, 96, 120, "OFF"),
    releaseYear: null,
    status: "current",
    summary: "A 48° hybrid rubber from Tibhar's Kenta Matsudaira series, derived from the Hybrid K3 development.",
    description: [
      "Hybrid MK is the hybrid rubber of Tibhar's Kenta Matsudaira (MK) series. Tibhar says it focuses on touch, spin potential and long ball contact, with enough speed in reserve to put pressure on an opponent.",
      "It uses a 48° sponge, softer than the K3's 53°, and is sold in 2.0 mm and MAX. Tibhar lists ratings of 124 speed, 96 control and 120 spin, and offers it in red, black and blue.",
    ],
    facts: [
      {
        text: "Tibhar says Hybrid MK grew out of what it learned developing Hybrid K3 with Darko Jorgic, Vladimir Samsonov and Shang Kun, combined with Kenta Matsudaira's own requirements.",
        source: mkRubberCat.url,
      },
    ],
    notes: [
      SCALE_NOTE,
      "Tibhar's catalogue lists red, black and blue; the ITTF list also includes pink for Hybrid MK.",
      "Tibhar's MK series web page gives Speed 125, Control 110, Spin 125, while the 2026/2027 catalogue (product page and overview table) gives Speed 124, Control 96, Spin 120; the catalogue values are shown here.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-hybrid-mk.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/hybrid-mk/", credit: "© Tibhar" },
    sources: [mkRubberCat, rubberOverview, mkPage, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: null,
    hardness: { min: 48, scale: "unstated" },
    spongeThicknesses: ["2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-infinity-mx-p",
    brandId: "tibhar",
    name: "Infinity MX-P",
    aliases: ["I N F I N I T Y MX-P"],
    manufacturerRatings: evoRatings(127, 90, 125, "OFF+"),
    releaseYear: null,
    status: "current",
    summary: "A high-end offensive rubber from Tibhar's Infinity line, combining its Pro Traction topsheet with the Red Energy Sponge.",
    description: [
      "Infinity MX-P pairs Tibhar's newer Pro Traction topsheet with the Red Energy Sponge also used in the Evolution D models, which Tibhar describes as very similar to the Red Power Sponge of the original Evolution rubbers. Tibhar says Pro Traction focuses on grip and longer ball contact rather than maximum tension, and that MX-P's grip level was tuned for spin and high dynamics.",
      "Tibhar states that it is not meant as a direct successor to Evolution MX-P. It is sold in two thicknesses, MAX PRO (2.05 mm) and MAX PRO+ (2.15 mm), with a hardness of 50.35-50.95° on the European scale (38.71-39.21° Japanese, per Tibhar's website) and ratings of 127 speed, 90 control and 125 spin.",
    ],
    facts: [],
    notes: [
      RUBBER_HARDNESS_NOTE,
      "Tibhar's website gives the hardness as \"~EUR 50.35 - 50.95°\" and \"~JPN 38.71 - 39.21°\"; the European figure, which matches the catalogue, is shown. The catalogue product page labels it sponge hardness, while its overview table marks it as whole-rubber hardness.",
      "Typed as tensor: it is a non-tacky offensive inverted rubber built on Tibhar's Red Energy Sponge, the same sponge technology as the Evolution D models, and no source describes it as a classic rubber. Tibhar says the focus of its Pro Traction topsheet is \"not in maximum tension\" but in traction and grip.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-infinity-mx-p.webp", width: 800, height: 836, sourceUrl: "https://tibhar.info/en/infinity-mx-p/", credit: "© Tibhar" },
    sources: [infinityCat, rubberOverview, techPage, LARC, webInfinityMxp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 50.35, max: 50.95, scale: "esn" },
    spongeThicknesses: ["MAX PRO (2.05)", "MAX PRO+ (2.15)"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-quantum-x-pro",
    brandId: "tibhar",
    name: "Quantum X Pro",
    manufacturerRatings: evoRatings(115, 95, 115, "OFF"),
    releaseYear: null,
    status: "current",
    summary: "A 47.5° offensive rubber built on Tibhar's POP (Performance on Point) concept, sold in red, black and four extra colours.",
    description: [
      "Quantum X Pro uses what Tibhar calls POP (Performance on Point) technology, aimed at combining power and rotation. Tibhar describes the surface as dynamic and adhering and says improved speed and spin-to-trajectory ratio make the arc easier to control.",
      "It has a 47.5° sponge and is sold in 1.8 mm, 2.0 mm and MAX. Besides red and black, Tibhar sells green, blue, violet and pink versions with the same specifications.",
    ],
    facts: [],
    notes: [
      SCALE_NOTE,
      "Tibhar gives two different sets of ratings: the catalogue product page says Speed 115, Control 95, Spin 115, while the rubber overview table in the same catalogue and Tibhar's website product page say Speed 125, Control 80, Spin 120. The catalogue product-page values are shown.",
      "The ITTF list shows Quantum X Pro in black, blue, green and red; violet and pink are not listed under that name.",
      "Typed as tensor because Paddle Palace lists it with \"Rubber Tech: Tension\"; Tibhar itself describes a dynamic, adhering surface on a harder sponge without naming tension.",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-quantum-x-pro.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/quantum-x-pro/", credit: "© Tibhar" },
    sources: [qxpCat, rubberOverview, LARC, ppQxp, webQxp],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "unstated" },
    spongeThicknesses: ["1.8", "2.0", "MAX"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue", "Violet", "Pink"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-aurus",
    brandId: "tibhar",
    name: "Aurus",
    manufacturerRatings: evoRatings(109, 90, 110, "OFF+"),
    releaseYear: null,
    status: "current",
    summary: "A topspin-oriented offensive rubber with a soft, transparent topsheet and Tibhar's SPI built-in speed-glue effect.",
    description: [
      "Aurus pairs what Tibhar calls an ultra-soft, transparent topsheet with its SPI (\"Speedglue-Effect-Inside\") technology, which Tibhar says gives a strong catapult so the ball can be loaded with spin and speed with little effort.",
      "It has a 47.5° sponge and is sold in 1.7, 1.9 and 2.1 mm. Tibhar lists ratings of 109 speed, 90 control and 110 spin. Softer (Aurus Soft, Aurus Sound) and other variants are separate products.",
    ],
    facts: [
      {
        text: "Tibhar says it designed its SPI technology in response to the ITTF's speed-glue ban of 1 September 2008, introducing it in its then-new Nimbus and Sinus rubbers.",
        source: speedGlueHistory.url,
      },
    ],
    notes: [
      SCALE_NOTE,
      "Typed as tensor because Tibhar's history page says its SPI sponges are glued to the topsheet \"under a strong tension\", and Paddle Palace lists Aurus with \"Rubber Tech: Tension\".",
    ],
    photo: { src: "/equipment/photos/rubbers/tibhar-aurus.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/aurus/", credit: "© Tibhar" },
    sources: [aurusCat, rubberOverview, techPage, LARC, speedGlueHistory, ppAurus],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: null,
    hardness: { min: 47.5, scale: "unstated" },
    spongeThicknesses: ["1.7", "1.9", "2.1"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-grass-d-tecs",
    brandId: "tibhar",
    name: "Grass D.TecS",
    aliases: ["Grass DTecS"],
    manufacturerRatings: evoRatings(45, 75, 95, "DEF"),
    releaseYear: null,
    status: "current",
    summary: "Tibhar's long-pimple Grass rubber with D.TecS built-in tension, rated DEF and aimed at chop and chop-block play.",
    description: [
      "Grass D.TecS combines Tibhar's classic Grass long pimples with its D.TecS technology. Tibhar says the built-in tension in the topsheet and sponge makes the pimples more elastic, producing heavy backspin in chops and chop-blocks while keeping enough speed to counter.",
      "It is sold without sponge (OX) and with 0.5, 0.9, 1.2 and 1.6 mm sponge, which has a hardness of 47.5°. A green version (Grass D.TecS Acid Green) and a version with a gluing sheet (Grass D.TecS GS) are sold separately.",
    ],
    facts: [
      {
        text: "Tibhar compares the way Grass's long Japanese pimples bend on contact with the ball to grass waving in the wind.",
        source: grassCat.url,
      },
    ],
    notes: [SCALE_NOTE, "Tibhar does not publish pimple dimensions."],
    photo: { src: "/equipment/photos/rubbers/tibhar-grass-d-tecs.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/grass-d-tecs/", credit: "© Tibhar" },
    sources: [grassCat, rubberOverview, techPage, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 47.5, scale: "unstated" },
    spongeThicknesses: ["OX", "0.5", "0.9", "1.2", "1.6"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-speedy-soft",
    brandId: "tibhar",
    name: "Speedy Soft",
    manufacturerRatings: evoRatings(100, 94, 55, "ALL+"),
    releaseYear: null,
    status: "current",
    summary: "A short-pimple rubber on a soft sponge, aimed at fast, active play close to the table.",
    description: [
      "Speedy Soft is a short-pimple rubber that Tibhar aims at players who want an active, fast game at the table. Tibhar says its relatively short pimples give strong acceleration, while the soft sponge improves control without removing the pimple effect.",
      "Tibhar lists a sponge hardness of 45° and ratings of 100 speed, 94 control and 55 spin, with sponge thicknesses of 1.0, 1.5 and 2.0 mm. A D.TecS version with built-in tension is sold separately.",
    ],
    facts: [],
    notes: [SCALE_NOTE, "Tibhar does not publish pimple dimensions."],
    photo: { src: "/equipment/photos/rubbers/tibhar-speedy-soft.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/speedy-soft/", credit: "© Tibhar" },
    sources: [speedyCat, rubberOverview, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 45, scale: "unstated" },
    spongeThicknesses: ["1.0", "1.5", "2.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "tibhar-speedy-soft-d-tecs",
    brandId: "tibhar",
    name: "Speedy Soft D.TecS",
    manufacturerRatings: evoRatings(103, 93, 45, "OFF-"),
    releaseYear: null,
    status: "current",
    summary: "The D.TecS version of Tibhar's Speedy Soft short-pimple rubber, rated faster than the standard version and on a softer 35° sponge.",
    description: [
      "Speedy Soft D.TecS combines the short pimples of Speedy Soft with Tibhar's D.TecS technology, which Tibhar describes as a gluing technique plus selected polymers in the topsheet and sponge that give playing characteristics similar to speed-glued rubbers. Tibhar says the result keeps the pimples fast in open play while adding a stronger disturbing effect for the opponent, especially when countering and blocking.",
      "Tibhar rates it 103 for speed, 93 for control and 45 for spin, with the Strategy class OFF-, against 100, 94 and 55 (ALL+) for the standard Speedy Soft. It has a 35° sponge and is sold in 1.5 and 2.0 mm, in red and black.",
    ],
    facts: [],
    notes: [SCALE_NOTE, "Tibhar does not publish pimple dimensions."],
    photo: { src: "/equipment/photos/rubbers/tibhar-speedy-soft-d-tecs.webp", width: 800, height: 800, sourceUrl: "https://tibhar.info/en/shop/speedy-soft-d-tecs/", credit: "© Tibhar" },
    sources: [
      speedyCat,
      rubberOverview,
      techPage,
      {
        url: "https://tibhar.info/en/shop/speedy-soft-d-tecs/",
        label: "TIBHAR: Speedy Soft D.TecS product page",
        kind: "manufacturer",
        accessed: ACCESSED,
      },
      LARC,
    ],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: { min: 35, scale: "unstated" },
    spongeThicknesses: ["1.5", "2.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
];
