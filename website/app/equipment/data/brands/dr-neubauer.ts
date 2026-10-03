import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** Dr. Neubauer's own shop page for one product (English version of drneubauer.com). */
const dn = (cat: number, catS: number, prod: number, label: string): Source => ({
  url: `https://www.drneubauer.com/shop.php?cat=${cat}&cat_s=${catS}&lang=us&prod=${prod}`,
  label: `Dr. Neubauer: ${label}`,
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

const company: Source = {
  url: "https://www.drneubauer.com/index.php?p=2&lang=us",
  label: "Dr. Neubauer: The company",
  kind: "manufacturer",
  accessed: ACCESSED,
};

const contact: Source = {
  url: "https://www.drneubauer.com/contact.php?lang=us&id=",
  label: "Dr. Neubauer: Contact (Dr Neubauer LTD, distribution in Wendelstein, Germany)",
  kind: "manufacturer",
  accessed: ACCESSED,
};

export const brand: Brand = {
  id: "dr-neubauer",
  name: "Dr. Neubauer",
  country: "Germany",
  website: "https://www.drneubauer.com",
  ratingNote:
    "Dr. Neubauer rates rubbers with numbers for Speed and Control plus Spin, Effect or Disruptive effect, and blades with Speed, Control and Rigidity; no scale maximum is stated and some values exceed 100.",
  hardnessScale: null,
  logo: { src: "/equipment/brands/dr-neubauer.webp", width: 262, height: 112, sourceUrl: "https://www.drneubauer.com", credit: "Logo © Dr. Neubauer" },
  sources: [company, contact],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const matador = dn(2, 0, 87, "Matador");
const matadorSpinfactory: Source = {
  url: "https://www.spinfactory.de/tischtennis-hoelzer/tischtennis-holz-dr-neubauer-matador.html?___store=en",
  label: "Spinfactory: Dr. Neubauer Matador",
  kind: "retailer",
  accessed: ACCESSED,
};
const matadorTt11: Source = {
  url: "https://tabletennis11.com/en/dr-neubauer-matador?Country=US",
  label: "Tabletennis11: Dr. Neubauer Matador",
  kind: "retailer",
  accessed: ACCESSED,
};
const matadorTexa = dn(2, 0, 108, "Matador Texa");
const matadorTexaTts: Source = {
  url: "https://tabletennisstore.us/products/dr-neubauer-matador-texa",
  label: "Table Tennis Store US: Dr. Neubauer Matador Texa",
  kind: "retailer",
  accessed: ACCESSED,
};
const bloodhound = dn(2, 0, 121, "Bloodhound");
const bloodhoundTts: Source = {
  url: "https://tabletennisstore.us/products/dr-neubauer-bloodhound",
  label: "Table Tennis Store US: Dr. Neubauer Bloodhound",
  kind: "retailer",
  accessed: ACCESSED,
};

export const blades: Blade[] = [
  {
    id: "dr-neubauer-matador",
    brandId: "dr-neubauer",
    name: "Matador",
    manufacturerRatings: [
      { label: "Speed", value: 93 },
      { label: "Control", value: 90 },
      { label: "Rigidity", value: 88 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 7-ply OFF- blade that Dr. Neubauer designed for players using pimples-out or anti-spin rubbers.",
    description: [
      "The Matador is a 7-ply blade classed OFF- by Dr. Neubauer and aimed at players who combine an inverted rubber with pimples-out or anti-spin rubber on the other side.",
      "Dr. Neubauer describes it as relatively rigid, fast enough for topspin attacks, and as producing a low bounce when blocking or chop-blocking with long pimples. The maker states a weight of about 79 g and sells it with straight, flared and anatomic handles.",
    ],
    facts: [],
    notes: [
      "Dr. Neubauer states only \"Plies: 7\"; that all seven plies are wood comes from Spinfactory (\"seven wood veneers\").",
      "Weight: Dr. Neubauer states approx. 79 g; Tabletennis11 lists 88 g and Spinfactory approx. 82 g / 80 g. The maker's figure is shown.",
      "Thickness is not stated by Dr. Neubauer; retailers disagree (Spinfactory 5.7 mm and 5.8 mm, Tabletennis11 6 mm), so it is left blank.",
    ],
    sources: [matador, matadorSpinfactory, matadorTt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: null,
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: null,
    weightG: { min: 79 },
    handles: ["ST", "FL", "AN"],
    manufacturerClass: "OFF-",
    madeIn: null,
  },
  {
    id: "dr-neubauer-matador-texa",
    brandId: "dr-neubauer",
    name: "Matador Texa",
    manufacturerRatings: [
      { label: "Speed", value: 95 },
      { label: "Control", value: 90 },
      { label: "Rigidity", value: 89 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 9-ply composite version of the Matador, classed OFF- and aimed at pimples-out and anti-spin players.",
    description: [
      "Dr. Neubauer says the Matador Texa uses a plywood composition similar to the Matador, with added fibre material that brings it to nine plies in total. The maker lists it as OFF-, 6 mm thick and about 89 g.",
      "Dr. Neubauer describes it as slightly faster than the Matador while still giving a low bounce when blocking or chop-blocking with long pimples, and as allowing short blocks with frictionless anti-spin rubbers.",
    ],
    facts: [],
    notes: [
      "Dr. Neubauer only calls the composite \"selected fiber material\" without naming it, so the type is recorded as \"other\". Table Tennis Store US lists the plies as \"7w, 2f\".",
      "The maker's specification list mentions straight, flared, anatomic and penhold handles; the order form offers anatomic, flared and straight, which are the handles shown here.",
    ],
    sources: [matadorTexa, matadorTexaTts],
    lastVerified: ACCESSED,
    plies: 9,
    layup: null,
    fibers: ["other"],
    fiberName: "selected fiber material",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6,
    weightG: { min: 89 },
    handles: ["ST", "FL", "AN"],
    manufacturerClass: "OFF-",
    madeIn: null,
  },
  {
    id: "dr-neubauer-bloodhound",
    brandId: "dr-neubauer",
    name: "Bloodhound",
    manufacturerRatings: [
      { label: "Speed", value: 78 },
      { label: "Control", value: 93 },
      { label: "Rigidity", value: 85 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 5-ply blade of spruce, ayous and carbon that Dr. Neubauer pitches as a relatively slow blade for long-pimple and anti-spin players.",
    description: [
      "The Bloodhound is a 5-ply blade that Dr. Neubauer says combines spruce, ayous and carbon layers without using balsa. The maker lists it at about 77 g and 6 mm thick.",
      "Dr. Neubauer pitches it at long-pimple and anti-spin players who want a relatively slow blade, saying it lowers ball speed for blocking while still allowing attacking strokes with an inverted or pimples-out rubber on the other side.",
    ],
    facts: [],
    notes: [
      "Dr. Neubauer's specification list gives the class as \"ALL\", while its description calls it \"an ALL- blade\"; the specification value is shown.",
      "Dr. Neubauer does not publish the ply order. Table Tennis Store US lists the plies as \"3w, 2c\".",
      "The maker's specification list mentions straight, flared, anatomic and penhold handles; the order form offers anatomic, flared and straight, which are the handles shown here.",
    ],
    sources: [bloodhound, bloodhoundTts],
    lastVerified: ACCESSED,
    plies: 5,
    layup: null,
    fibers: ["carbon"],
    fiberName: "carbon",
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6,
    weightG: { min: 77 },
    handles: ["ST", "FL", "AN"],
    manufacturerClass: "ALL",
    madeIn: null,
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const desperado = dn(1, 4, 76, "Desperado");
const desperado2 = dn(1, 4, 118, "Desperado 2");
const desperadoReloaded = dn(1, 4, 168, "Desperado Reloaded");
const monsterClassic = dn(1, 4, 53, "Monster Classic");
const killer = dn(1, 5, 81, "Killer");
const killerPro = dn(1, 5, 93, "Killer Pro");
const killerProEvo = dn(1, 5, 137, "Killer Pro Evo");
const diamant = dn(1, 7, 40, "Diamant");
const gorilla = dn(1, 8, 51, "Gorilla");
const grizzly = dn(1, 8, 52, "Grizzly");
const abs3 = dn(1, 8, 161, "A-B-S 3");

export const rubbers: Rubber[] = [
  {
    id: "dr-neubauer-desperado",
    brandId: "dr-neubauer",
    name: "Desperado",
    manufacturerRatings: [
      { label: "Speed", value: 55 },
      { label: "Control", value: 83 },
      { label: "Spin", value: 81 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber with friction, sold without sponge (OX) or with 0.6 or 1.0 mm sponge.",
    description: [
      "Desperado is a long-pimple rubber that Dr. Neubauer describes as ITTF-approved and \"with friction\", offering only little spin reversal but a disruptive effect that it attributes to a new rubber composition.",
      "Dr. Neubauer recommends the OX version for chop-blocking close to the table and the 0.6 and 1.0 mm sponge versions for more active play such as service returns, aggressive pushes and lifts. It is sold in red and black.",
    ],
    facts: [],
    sources: [desperado, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.6", "1.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-desperado-2",
    brandId: "dr-neubauer",
    name: "Desperado 2",
    manufacturerRatings: [
      { label: "Speed", value: 51 },
      { label: "Spin", value: 83 },
      { label: "Control", value: 87 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber for blocking close to the table, sold OX or with 0.6, 1.0 or 1.3 mm sponge.",
    description: [
      "Desperado 2 is a long-pimple rubber that Dr. Neubauer developed for a disruptive blocking game close to the table with the plastic ball, which the maker says carries less spin.",
      "Dr. Neubauer says it keeps blocks low, makes chop-blocks \"dive\", and also suits aggressive pushing, slow counter-attacks and flicks. It is sold in red and black, without sponge or with 0.6, 1.0 or 1.3 mm sponge.",
    ],
    facts: [],
    sources: [desperado2, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "0.6", "1.0", "1.3"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-desperado-reloaded",
    brandId: "dr-neubauer",
    name: "Desperado Reloaded",
    manufacturerRatings: [
      { label: "Speed", value: 56 },
      { label: "Spin", value: 88 },
      { label: "Control", value: 90 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber that Dr. Neubauer says was developed for the latest plastic balls, sold OX or with 0.6, 1.0 or 1.3 mm sponge in four topsheet colours.",
    description: [
      "Desperado Reloaded is a long-pimple rubber that Dr. Neubauer says was developed specifically for the latest plastic balls. The maker describes a very low bounce on passive blocks and chop-blocks against topspin.",
      "Dr. Neubauer also pitches it for attacking strokes (aggressive pushes, lifts, counter-attacks and hitting) and for classical defence. It lists a sponge hardness of 36° without naming the scale, and sells it in red, black, green and blue.",
      "A separate \"slow version with dampening sponge\" is sold as its own product.",
    ],
    facts: [],
    sources: [desperadoReloaded, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: { min: 36, scale: "unstated" },
    spongeThicknesses: ["OX", "0.6", "1.0", "1.3"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-monster-classic",
    brandId: "dr-neubauer",
    name: "Monster Classic",
    manufacturerRatings: [
      { label: "Speed", value: 75 },
      { label: "Control", value: 85 },
      { label: "Effect", value: 65 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A long-pimple rubber with friction that Dr. Neubauer designed for aggressive blocking and counter-attacking close to the table.",
    description: [
      "Monster Classic is a long-pimple rubber with friction. Dr. Neubauer says its pimple geometry, rubber formula and sponge are designed for aggressive blocking and counter-attacking close to the table rather than for spin reversal.",
      "The maker writes that the disruptive effect no longer comes from the spin reversal of the now-banned frictionless long pimples but from a fast, wobbling block that stays low after the bounce.",
    ],
    facts: [],
    notes: [
      "The product description lists 1.0, 1.6 and 2.0 mm sponge; the order form also offers an OX version, so all four are shown.",
    ],
    sources: [monsterClassic, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["OX", "1.0", "1.6", "2.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-killer",
    brandId: "dr-neubauer",
    name: "Killer",
    manufacturerRatings: [
      { label: "Speed", value: 94 },
      { label: "Effect", value: 80 },
      { label: "Control", value: 94 },
    ],
    releaseYear: null,
    status: "current",
    summary: "An offensive pimples-out rubber that Dr. Neubauer describes as a cross between short and medium pimples.",
    description: [
      "Killer is an offensive pimples-out rubber that Dr. Neubauer files under short pimples and describes as combining short- and medium-pimple characteristics.",
      "The maker pitches it for fast counter-attacks and hitting close to the table, with a low-bouncing ball and low sensitivity to incoming spin; with the thin 1.5 mm sponge it says drop shots and chop-blocks are also possible.",
    ],
    facts: [
      {
        text: "Dr. Neubauer's Killer Pro page calls Killer a worldwide best-seller and says Killer Pro uses the same topsheet on a new, slightly harder sponge.",
        source: killerPro.url,
      },
    ],
    notes: [
      "The product description lists the colours as red and black; the order form offers red, black, green and blue. The ITTF list (LARC 2026) lists Killer in black, blue, green, pink and red.",
      "Dr. Neubauer calls the thickest sponge \"MAX (appr. 2.2mm)\"; its sponge list and order form give it as 2.2 mm.",
    ],
    sources: [killer, killerPro, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.5", "1.8", "2.0", "2.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black", "Green", "Blue"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-killer-pro",
    brandId: "dr-neubauer",
    name: "Killer Pro",
    manufacturerRatings: [
      { label: "Speed", value: 98 },
      { label: "Effect", value: 80 },
      { label: "Control", value: 88 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The Killer short-pimple topsheet on a slightly harder sponge, which Dr. Neubauer says raises speed for an attacking pimples-out game.",
    description: [
      "Killer Pro uses the same topsheet as Killer, laminated on what Dr. Neubauer calls a new, slightly harder sponge. The maker says this raises speed while keeping the disruptive effect when blocking, counter-attacking and hitting.",
      "Dr. Neubauer describes the ball as fast and low, \"skidding\" over the table on counter-attacks. It is sold in red and black, from 1.3 mm up to MAX (about 2.2 mm).",
    ],
    facts: [],
    notes: [
      "\"Killer Pro\" is not listed by that name on the ITTF LARC of 1 January 2026 (Killer, Killer Pro Evo, Killer Soft and Killer Extreme are), so ITTF approval is left unconfirmed here.",
      "Dr. Neubauer calls the thickest sponge \"MAX (appr. 2.2mm)\"; its sponge list and order form give it as 2.2 mm.",
    ],
    sources: [killerPro, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.3", "1.5", "1.8", "2.0", "2.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "dr-neubauer-killer-pro-evo",
    brandId: "dr-neubauer",
    name: "Killer Pro Evo",
    manufacturerRatings: [
      { label: "Speed", value: 100 },
      { label: "Spin", value: 80 },
      { label: "Control", value: 90 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A short-pimple rubber based on Killer Pro with a blue sponge, which Dr. Neubauer describes as an even faster version.",
    description: [
      "Killer Pro Evo is based on Killer Pro but uses a new blue sponge, which Dr. Neubauer says makes it an even faster version aimed at an aggressive game with the ABS (plastic) balls.",
      "The maker describes a wobbling, low-bouncing ball on counter-attacks and hits. It is sold in red and black from 1.3 to 2.2 mm.",
    ],
    facts: [],
    sources: [killerProEvo, LARC],
    lastVerified: ACCESSED,
    type: "short-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.3", "1.5", "1.8", "2.0", "2.2"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-diamant",
    brandId: "dr-neubauer",
    name: "Diamant",
    manufacturerRatings: [
      { label: "Speed", value: 90 },
      { label: "Control", value: 96 },
      { label: "Effect", value: 78 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A half-long (medium) pimple rubber with very soft pimples, for an all-round game with a disruptive block and hit.",
    description: [
      "Diamant is a half-long pimple rubber with what Dr. Neubauer calls very soft pimples and a sponge developed specifically for it. The maker positions it as an all-round rubber with good control for service returns, blocking, attacking and defending.",
      "Dr. Neubauer says it hits the ball flat so that blocks and hits stay low, and that the 1.5 to 2.1 mm sponges suit an attacking game while the 1.2 mm sponge gives more disruption close to the table.",
    ],
    facts: [
      {
        text: "Dr. Neubauer states that Diamant was not affected by the ITTF ban on frictionless long pimples and remained approved for the period starting 1 July 2008.",
        source: diamant.url,
      },
    ],
    notes: [
      "Dr. Neubauer files Diamant under half-long pimples. The ITTF list (LARC 2026) records its pimple type as \"Out\"; the list has no separate medium-pimple category.",
    ],
    sources: [diamant, LARC],
    lastVerified: ACCESSED,
    type: "medium-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.2", "1.5", "1.8", "2.1"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-gorilla",
    brandId: "dr-neubauer",
    name: "Gorilla",
    manufacturerRatings: [
      { label: "Speed", value: 75 },
      { label: "Control", value: 80 },
      { label: "Disruptive effect", value: 100 },
    ],
    releaseYear: null,
    status: "current",
    summary: "An anti-topspin rubber that Dr. Neubauer launched as a replacement for its frictionless long pimples.",
    description: [
      "Gorilla is an anti-topspin rubber. Dr. Neubauer presents it as its answer to the ban on frictionless long pimples, aimed at players who had used its Super Block, Inferno or Scalpel rubbers.",
      "The maker describes it as a blocking rubber that keeps the ball low against strong topspin, with good control on service returns and the option of aggressive pushes and lifts. Dr. Neubauer says the strongest disruptive effect comes with the 0.6 mm sponge.",
    ],
    facts: [
      {
        text: "Dr. Neubauer says it had become the world leader in frictionless long pimples with seven such rubbers, and launched new anti-spin rubbers after the general ban of that rubber type in July 2008.",
        source: company.url,
      },
    ],
    notes: [
      "The product description lists 0.6, 1.0 and 1.3 mm sponge; the order form also offers 1.8 mm, so all four are shown.",
      "A separate \"new version with A-B-S dampening sponge\" of Gorilla is sold as its own product.",
    ],
    sources: [gorilla, company, LARC],
    lastVerified: ACCESSED,
    type: "anti",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["0.6", "1.0", "1.3", "1.8"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-grizzly",
    brandId: "dr-neubauer",
    name: "Grizzly",
    manufacturerRatings: [
      { label: "Speed", value: 77 },
      { label: "Control", value: 85 },
      { label: "Disruptive effect", value: 95 },
    ],
    releaseYear: null,
    status: "current",
    summary: "An all-round anti-spin rubber that Dr. Neubauer launched as its second replacement for frictionless long pimples.",
    description: [
      "Grizzly is an anti-spin rubber that Dr. Neubauer calls its second answer to the ban on frictionless long pimples, aimed at former users of its Boomerang, Monster and Roulette long-pimple rubbers.",
      "The maker pitches it for an all-round game: disruptive blocking close to the table, classical defence with backspin variation, and counter-attacking or dynamic pushing. Dr. Neubauer recommends the 1.0 mm sponge as the best balance.",
    ],
    facts: [],
    notes: ["A separate \"new version with A-B-S sponge\" of Grizzly is sold as its own product."],
    sources: [grizzly, LARC],
    lastVerified: ACCESSED,
    type: "anti",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["1.0", "1.6", "2.0"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "dr-neubauer-a-b-s-3",
    brandId: "dr-neubauer",
    name: "A-B-S 3",
    manufacturerRatings: [
      { label: "Speed", value: 46 },
      { label: "Disruptive effect", value: 110 },
      { label: "Control", value: 100 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A frictionless anti-spin rubber on a blue dampening sponge, which Dr. Neubauer describes as the slowest version of its A-B-S series.",
    description: [
      "A-B-S 3 is a frictionless anti-spin rubber, co-developed with SpinAssociated of Italy according to Dr. Neubauer, and described by the maker as the slowest and most controlled version of its A-B-S series.",
      "Dr. Neubauer attributes the slowness to a blue dampening sponge and says it keeps the series' high spin reversal while allowing very short blocks against powerful topspin. It lists a sponge hardness of 42° without naming the scale, and sells it in red and black with 1.5 or 2.0 mm sponge.",
    ],
    facts: [
      {
        text: "Dr. Neubauer says A-B-S 3 was the second rubber it co-developed with SpinAssociated from Italy.",
        source: abs3.url,
      },
    ],
    sources: [abs3, LARC],
    lastVerified: ACCESSED,
    type: "anti",
    tackiness: null,
    hardness: { min: 42, scale: "unstated" },
    spongeThicknesses: ["1.5", "2.0"],
    spongeColor: "Blue",
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
];
