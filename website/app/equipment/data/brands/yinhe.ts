import type { Blade, Brand, Rubber, Source } from "../../models";

const ACCESSED = "2026-10-03";

/** Hebei Yinhe Sports Goods Co., Ltd. official site (Chinese and English product sections). */
const yh = (typeId: number, id: number, label: string): Source => ({
  url: `http://www.yinhe1986.cn/prod_view.aspx?TypeId=${typeId}&Id=${id}&FId=t3:${typeId}:3`,
  label: `Yinhe (official site): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

/** Yinhe USA LLC, which describes itself as the sole distributor of Yinhe products in North America. */
const usa = (handle: string, label: string): Source => ({
  url: `https://yinheusa.com/product/${handle}/`,
  label: `Yinhe USA (sole North American distributor): ${label}`,
  kind: "manufacturer",
  accessed: ACCESSED,
});

const tt11 = (handle: string, label: string): Source => ({
  url: `https://tabletennis11.com/en/${handle}`,
  label: `Tabletennis11: ${label}`,
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

const RUBBER_RATINGS_NOTE =
  "Yinhe prints Speed and Spin numbers without stating the top of its scale; they are shown as printed and aren't comparable with other brands' numbers.";

const BLADE_RATINGS_NOTE =
  "Yinhe prints Speed and Control numbers without stating the top of its scale; they are shown as printed and aren't comparable with other brands' numbers.";

export const brand: Brand = {
  id: "yinhe",
  name: "Yinhe",
  country: "China",
  website: "http://www.yinhe1986.cn/",
  ratingNote:
    "Yinhe gives rubbers Speed and Spin numbers and blades Speed and Control numbers, without stating the top of either scale.",
  hardnessScale: null,
  logo: { src: "/equipment/brands/yinhe.webp", width: 258, height: 48, sourceUrl: "http://www.yinhe1986.cn/", credit: "Logo © Yinhe" },
  sources: [
    {
      url: "http://www.yinhe1986.cn/news_view.aspx?TypeId=4&Id=385&Fid=t2:4:2",
      label: "Yinhe (official site): About us (Hebei Yinhe Sports Goods Co., Ltd., Milkyway, founded 1986)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
    {
      url: "https://yinheusa.com/about/",
      label: "Yinhe USA: About (sole distributor of Yinhe table tennis products in North America)",
      kind: "manufacturer",
      accessed: ACCESSED,
    },
  ],
};

// ---------------------------------------------------------------------------------------------------------------
// Blades
// ---------------------------------------------------------------------------------------------------------------

const pro01Cn = yh(667, 597, "专业一号 Pro-01 外置ALC (Pro-01, outer ALC)");
const pro01Usa = usa("pro-01-paddle", "PRO 01 (Yinhe's Legendary ALC Blade)");
const pro01Tt11 = tt11("yinhe-pro-01", "Yinhe Pro-01");

const pro05Cn = yh(737, 810, "专业五号 PRO-05 内置KLC黄芳碳 (Pro-05, inner KLC)");
const pro05Tt11 = tt11("yinhe-pro-05", "Yinhe Pro-05");

const v14Cn = yh(672, 697, "V-14 PRO (30周年纪念球拍系列 / 30th anniversary series)");
const v14Usa = usa("v14-pro", "V14 Pro ALC (Outer) OFF");

const x980Cn = yh(682, 734, "980XX (防守型削球底板 / defensive chopping blades)");
const x980Usa = usa("blade-980xx", "980XX All Wood DEF+");

const t2sCn = yh(677, 754, "T-2S (桧之魂T系列 / Soul of Hinoki T series)");
const t2sUsa = usa("t-2s", "T2S KLC (Outer)");
const t2sTt11 = tt11("yinhe-t-2s", "Yinhe T-2s");

export const blades: Blade[] = [
  {
    id: "yinhe-pro-01",
    brandId: "yinhe",
    name: "Pro-01",
    aliases: ["Pro 01", "Professional No. 1"],
    manufacturerRatings: [
      { label: "Speed", value: 10 },
      { label: "Control", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "Yinhe's 5+2 offensive blade with outer blue arylate-carbon plies, about 5.7 mm thick.",
    description: [
      "The Pro-01 is a 5 wood + 2 composite blade. Yinhe's own site lists its structure as outer ALC blue arylate carbon, and Yinhe USA describes it as a light blade built with high-strength ALC and carbon layers for attacking players who want good control.",
      "Yinhe USA rates it Speed 10 and Control 8 and lists a weight of 90 g ±3 and a thickness of 5.7 mm ±0.1, with flared, straight and Chinese penhold handles.",
    ],
    facts: [
      {
        text: "Yinhe's Chinese site lists the Pro-01 as a Zhu Yi signature model.",
        source: pro01Cn.url,
      },
    ],
    notes: [
      "Yinhe's Chinese site gives the thickness as 5.6-5.8 mm; Yinhe USA gives 5.7 mm ±0.1.",
      "The outer wood (koto) comes from Tabletennis11; Yinhe's own pages don't name it.",
      BLADE_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yinhe-pro-01.webp", width: 800, height: 800, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=667&Id=597&FId=t3:667:3", credit: "© Yinhe" },
    sources: [pro01Cn, pro01Usa, pro01Tt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5 + 2",
    fibers: ["arylate-carbon"],
    fiberName: "ALC (blue arylate carbon)",
    fiberPosition: "outer",
    outerWood: "Koto",
    thicknessMm: 5.7,
    weightG: { min: 90 },
    handles: ["FL", "ST", "CS"],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "yinhe-pro-05",
    brandId: "yinhe",
    name: "Pro-05",
    aliases: ["Pro 05", "Professional No. 5"],
    manufacturerRatings: [],
    releaseYear: null,
    status: "current",
    summary: "A Yinhe 5+2 blade with inner KLC plies next to the core, which Tabletennis11 describes as Kevlar-carbon.",
    description: [
      "The Pro-05 is a composite blade whose structure Yinhe lists as inner KLC (内置KLC黄芳碳), placing the fibre plies next to the core rather than under the outer veneer. Yinhe gives the thickness as 5.9 to 6.2 mm.",
      "Tabletennis11 lists it as a 5+2 blade of about 90 g with two inner Kevlar-Carbon (KLC) layers, and describes the inner-fibre layout as giving a softer, wood-like feel on passive strokes with more power when attacking.",
    ],
    facts: [],
    notes: [
      "Yinhe's site gives the thickness as a 5.9-6.2 mm range and Tabletennis11 lists 5.9 mm, so no single thickness is recorded.",
      "Ply count, layup and weight come from Tabletennis11; Yinhe's own page gives only the structure and thickness.",
      "Yinhe's page names the fibre KLC 黄芳碳 without spelling out KLC; the aramid-carbon (Kevlar-carbon) fibre type comes from Tabletennis11.",
      "Yinhe USA sells a separate Pro-05X Max, which is a different product.",
    ],
    photo: { src: "/equipment/photos/blades/yinhe-pro-05.webp", width: 800, height: 800, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=737&Id=810&FId=t3:737:3", credit: "© Yinhe" },
    sources: [pro05Cn, pro05Tt11],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["aramid-carbon"],
    fiberName: "KLC (黄芳碳)",
    fiberPosition: "inner",
    outerWood: null,
    thicknessMm: null,
    weightG: { min: 90 },
    handles: [],
    manufacturerClass: null,
    madeIn: null,
  },
  {
    id: "yinhe-v-14-pro",
    brandId: "yinhe",
    name: "V-14 Pro",
    aliases: ["V14 Pro"],
    manufacturerRatings: [
      { label: "Speed", value: 9 },
      { label: "Control", value: 9 },
    ],
    releaseYear: null,
    status: "current",
    summary: "An updated version of Yinhe's V-14, a 5 wood + 2 outer ALC offensive blade about 5.9 mm thick.",
    description: [
      "The V-14 Pro is Yinhe's update of its V-14 design. Yinhe lists it as 5 wood + 2 carbon, and Yinhe USA describes it as a classic ALC structure and sells it as \"V14 Pro ALC (Outer) OFF\".",
      "Yinhe USA says the combination of high-strength fibre and selected wood gives high elasticity with good control and defensive stability. It rates the blade Speed 9 and Control 9 and lists a thickness of 5.9 mm ±0.2.",
    ],
    facts: [
      {
        text: "Yinhe's Chinese site lists the V-14 Pro in its 30th anniversary racket series.",
        source: v14Cn.url,
      },
    ],
    notes: [
      "Yinhe USA lists the weight as 91 g ±3 for the flared handle and 83 g ±3 for the Chinese penhold; the flared weight is recorded.",
      "The outer fibre position and the OFF class come from Yinhe USA's product title; Yinhe's own page gives only \"5木2碳\" (5 wood, 2 carbon).",
      BLADE_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yinhe-v-14-pro.webp", width: 800, height: 800, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=672&Id=697&FId=t3:672:3", credit: "© Yinhe" },
    sources: [v14Cn, v14Usa],
    lastVerified: ACCESSED,
    plies: 7,
    layup: "5+2",
    fibers: ["arylate-carbon"],
    fiberName: "ALC",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 5.9,
    weightG: { min: 91 },
    handles: ["CS", "FL"],
    manufacturerClass: "OFF",
    madeIn: null,
  },
  {
    id: "yinhe-980xx",
    brandId: "yinhe",
    name: "980XX",
    manufacturerRatings: [
      { label: "Speed", value: 7 },
      { label: "Control", value: 9 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A five-ply all-wood defensive blade from Yinhe for modern choppers.",
    description: [
      "The 980XX is a five-ply all-wood blade from Yinhe's defensive chopping range. Yinhe USA sells it as a DEF+ blade designed for the new generation of defensive choppers.",
      "Yinhe rates it Speed 7 and Control 9 and gives a thickness of 6.0 mm ±0.2; Yinhe USA lists a weight of 80 g ±3 with flared and straight handles.",
    ],
    facts: [],
    notes: [BLADE_RATINGS_NOTE],
    photo: { src: "/equipment/photos/blades/yinhe-980xx.webp", width: 800, height: 800, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=682&Id=734&FId=t3:682:3", credit: "© Yinhe" },
    sources: [x980Cn, x980Usa],
    lastVerified: ACCESSED,
    plies: 5,
    layup: null,
    fibers: [],
    fiberName: null,
    fiberPosition: null,
    outerWood: null,
    thicknessMm: 6.0,
    weightG: { min: 80 },
    handles: ["FL", "ST"],
    manufacturerClass: "DEF+",
    madeIn: null,
  },
  {
    id: "yinhe-t-2s",
    brandId: "yinhe",
    name: "T-2S",
    aliases: ["T2S"],
    manufacturerRatings: [
      { label: "Speed", value: "9+" },
      { label: "Control", value: 8 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A 3+2 composite blade from Yinhe's T series, sold in North America as KLC (Outer), about 6.4 mm thick.",
    description: [
      "The T-2S belongs to the T series, which Yinhe calls \"Soul of Hinoki\". Yinhe lists it as a 3+2 blade for close-to-mid-distance power play, and Yinhe USA sells it as a KLC (outer) blade in its entry-level range.",
      "Yinhe rates it Speed 9+ and Control 8 and gives a thickness of 6.4 mm ±0.2. Yinhe does not publish the weight; Tabletennis11 lists about 85 g and describes the blade as having carbon layers.",
    ],
    facts: [],
    notes: [
      "Yinhe's page prints the thickness as \"6.4±+0.2mm\".",
      "The KLC outer-fibre construction comes from Yinhe USA's product title \"T2S KLC (Outer)\"; Yinhe's own page gives only the 3+2 ply count. In a 3+2 layup the two fibre plies sit directly under the outer veneers.",
      "No source read states what KLC is made of for this blade (Tabletennis11 says only \"carbon layers\"), so the fibre is recorded as carbon rather than aramid-carbon.",
      "Tabletennis11 lists the thickness as 6 mm and the weight as about 85 g; the thickness recorded is Yinhe's 6.4 mm.",
      BLADE_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/blades/yinhe-t-2s.webp", width: 800, height: 800, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=677&Id=754&FId=t3:677:3", credit: "© Yinhe" },
    sources: [t2sCn, t2sUsa, t2sTt11],
    lastVerified: ACCESSED,
    plies: 5,
    layup: "3+2",
    fibers: ["carbon"],
    fiberName: "KLC",
    fiberPosition: "outer",
    outerWood: null,
    thicknessMm: 6.4,
    weightG: { min: 85 },
    handles: [],
    manufacturerClass: null,
    madeIn: null,
  },
];

// ---------------------------------------------------------------------------------------------------------------
// Rubbers
// ---------------------------------------------------------------------------------------------------------------

const mercuryCn = yh(605, 372, "No.9021 水星2 (Mercury II)");
const mercuryEn = yh(188, 495, "No.9021 Mercury II (English)");
const mercuryUsa = usa("mercury-ll", "Mercury ll");
const mercuryTt11 = tt11("yinhe-mercury-ii", "Yinhe Mercury II");

const bd4Cn = yh(711, 636, "No.90354 北斗4 (Big Dipper IV, overseas version)");
const bd4En = yh(188, 488, "No.90354 Big Dipper IV (English)");
const bd4Usa = usa("big-dipper-4", "Big Dipper IV Tacky");

const moonCn = yh(612, 638, "No.9032 月球 (Moon)");
const moonEn = yh(188, 499, "No.9032 Moon (English)");
const moonUsa = usa("moon", "Moon");

const sunCn = yh(611, 637, "No.9031 太阳 (Sun)");
const sunEn = yh(188, 500, "No.9031 Sun (English)");

const r955Cn = yh(615, 620, "No.9040 经典955 长胶 (955 long pips)");
const r955En = yh(191, 245, "No.9040 955 Long (English)");

export const rubbers: Rubber[] = [
  {
    id: "yinhe-mercury-ii",
    brandId: "yinhe",
    name: "Mercury II",
    aliases: ["Mercury 2"],
    manufacturerRatings: [
      { label: "Speed", value: 10 },
      { label: "Spin", value: 7 },
    ],
    releaseYear: null,
    status: "current",
    summary: "Yinhe's low-priced, general-purpose inverted rubber, sold in soft, medium and hard sponges.",
    description: [
      "Mercury II is the successor to Yinhe's Mercury. Yinhe says it uses the company's MOXA rubber synthesis technology to give the sheet more support, for more elasticity, spin and power, and calls it a good-value rubber for players of all styles.",
      "Yinhe rates it Speed 10 and Spin 7 and lists it in soft, medium and hard sponges, red or black, in 2.2 mm (MAX on the Chinese page). The English page says it is good for speed gluing.",
    ],
    facts: [
      {
        text: "Yinhe's English page notes that Mercury II is good for speed gluing.",
        source: mercuryEn.url,
      },
    ],
    notes: [
      "Yinhe gives the hardness only as soft, medium or hard, with no degree numbers, so hardness is left blank.",
      "Yinhe's English page gives the thickness as 2.2 mm; the Chinese page lists \"MAX\".",
      "Classified as tacky from Tabletennis11's description of a \"slightly tacky surface\"; Yinhe does not describe the topsheet's tackiness, so the tackiness level is left blank.",
      "ITTF approval is recorded from Yinhe's English page, which says \"ITTF approved\". The 1 January 2026 LARC has no entry named Mercury II; it lists a Yinhe \"MoxaMercury\" (49-021), and Yinhe says Mercury II uses its MOXA rubber technology, but the list does not confirm they are the same sheet.",
      RUBBER_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yinhe-mercury-ii.webp", width: 490, height: 474, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=188&Id=495&FId=t3:188:3", credit: "© Yinhe" },
    sources: [mercuryEn, mercuryCn, mercuryUsa, mercuryTt11, LARC],
    lastVerified: ACCESSED,
    type: "tacky",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["2.2"],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "yinhe-big-dipper-iv",
    brandId: "yinhe",
    name: "Big Dipper IV",
    aliases: ["Big Dipper 4"],
    manufacturerRatings: [
      { label: "Speed", value: 10 },
      { label: "Spin", value: 12 },
    ],
    releaseYear: null,
    status: "current",
    summary: "The overseas version of Yinhe's Big Dipper, a Chinese-style tacky forehand rubber with a built-in tensor effect.",
    description: [
      "Big Dipper IV is the version of Big Dipper that Yinhe sells outside China. Yinhe describes it as a Chinese tacky rubber with a built-in tensor effect from its MAX TENSE technology, on a \"God Crossbow\" sponge developed for the plastic ball.",
      "Yinhe positions it as a forehand looping rubber that combines aggressive play with stability. It rates it Speed 10 and Spin 12, and Yinhe USA sells it in red or black with 37, 39 or 41 degree sponges.",
    ],
    facts: [
      {
        text: "Yinhe's Chinese site lists Big Dipper IV as the version sold only outside China.",
        source: bd4Cn.url,
      },
    ],
    notes: [
      "Hardness options sold by Yinhe USA: 37, 39 and 41 degrees.",
      "Yinhe's Chinese page states the Big Dipper IV hardness grades in Shore A (邵氏A): medium 34-36, hard 37-39, hard+ 40 and above. These are Yinhe's own printed degrees, recorded on the Chinese makers' scale; they aren't directly comparable with other brands' numbers.",
      "Classified as hybrid because Yinhe describes a Chinese tacky topsheet with a built-in tensor effect (MAX TENSE).",
      "The ITTF LARC lists Yinhe \"BigDipper\" (49-007); the IV version is not listed separately, so ITTF approval is left blank.",
      "Yinhe also sells Big Dipper, Big Dipper Pro and Big Dipper National as separate products.",
      RUBBER_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yinhe-big-dipper-iv.webp", width: 800, height: 804, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=711&Id=636&FId=t3:711:3", credit: "© Yinhe" },
    sources: [bd4Cn, bd4En, bd4Usa, LARC],
    lastVerified: ACCESSED,
    type: "hybrid",
    tackiness: "tacky",
    hardness: { min: 37, max: 41, scale: "chinese" },
    spongeThicknesses: [],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: null,
    madeIn: null,
  },
  {
    id: "yinhe-moon",
    brandId: "yinhe",
    name: "Moon",
    manufacturerRatings: [
      { label: "Speed", value: 11 },
      { label: "Spin", value: 9.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "A non-tacky Yinhe tensor rubber using its MAX TENSE technology and Arbalest Sponge.",
    description: [
      "Moon uses what Yinhe calls MAX TENSE, a treatment of a high-energy \"Arbalest Sponge\" combined with the topsheet that Yinhe presents as its built-in tension technology. The topsheet is a grippy, non-tacky type that Yinhe compares with German and Japanese rubbers.",
      "Yinhe says the soft sponge releases its stored energy quickly and suits both looping and hitting for spin-oriented players. It rates Moon Speed 11 and Spin 9.5 and sells it in soft and medium sponges, red or black.",
    ],
    facts: [],
    notes: [
      "Yinhe gives the hardness only as soft or medium, with no degree numbers, so hardness is left blank. Thickness is not stated.",
      "Classified as tensor because Yinhe describes MAX TENSE built-in tension with a grippy (涩性) non-tacky topsheet.",
      "Yinhe also sells Moon Pro, Moon Speed and Moon 12 as separate products.",
      RUBBER_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yinhe-moon.webp", width: 490, height: 494, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=612&Id=638&FId=t3:612:3", credit: "© Yinhe" },
    sources: [moonCn, moonEn, moonUsa, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: "non-tacky",
    hardness: null,
    spongeThicknesses: [],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "yinhe-sun",
    brandId: "yinhe",
    name: "Sun",
    manufacturerRatings: [
      { label: "Speed", value: 12 },
      { label: "Spin", value: 9.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "Yinhe's MAX TENSE attacking rubber with extra-thick 2.65 mm pimples and a non-tacky topsheet.",
    description: [
      "Sun is part of Yinhe's MAX TENSE range, which Yinhe classes as a strong-attack type (超强进攻型). Yinhe says it pairs pimples 2.65 mm in diameter with its elastic \"Arbalest Sponge\" to give power, spin and speed on attacking strokes.",
      "Yinhe lists the regular version with a grippy, non-tacky topsheet, rates it Speed 12 and Spin 9.5, and sells it in soft and medium sponges, red or black.",
    ],
    facts: [
      {
        text: "Yinhe says Sun's pimples are 2.65 mm in diameter, which it describes as extra thick.",
        source: sunCn.url,
      },
    ],
    notes: [
      "Yinhe gives the hardness only as soft or medium, with no degree numbers, so hardness is left blank. Thickness is not stated.",
      "Classified as tensor because Yinhe describes MAX TENSE built-in tension and its product menu lists the regular version as grippy (\"普通版 涩性\") rather than tacky.",
      "Yinhe also sells Sun Pro as a separate product.",
      RUBBER_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yinhe-sun.webp", width: 490, height: 492, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=611&Id=637&FId=t3:611:3", credit: "© Yinhe" },
    sources: [sunCn, sunEn, LARC],
    lastVerified: ACCESSED,
    type: "tensor",
    tackiness: "non-tacky",
    hardness: null,
    spongeThicknesses: [],
    spongeColor: null,
    topsheetColors: ["Red", "Black"],
    ittfApproved: true,
    madeIn: null,
  },
  {
    id: "yinhe-955",
    brandId: "yinhe",
    name: "955",
    aliases: ["955 Long"],
    manufacturerRatings: [
      { label: "Speed", value: 6.5 },
      { label: "Spin", value: 3.5 },
    ],
    releaseYear: null,
    status: "current",
    summary: "Yinhe's classic long-pips rubber for defensive and control players, sold with a 0.7 mm sponge or without sponge.",
    description: [
      "The 955 is Yinhe's classic long-pips rubber. Yinhe says it has pronounced spin-reversing properties, with tough but soft rubber and a precise pimple structure that make returns float and dip unpredictably.",
      "A balanced sponge is meant to hold the ball longer for steadier control and stronger defence. Yinhe recommends it for defensive control players and rates it Speed 6.5 and Spin 3.5; the English page lists a 0.7 mm sponge.",
    ],
    facts: [
      {
        text: "Yinhe says the 955 is especially suited to older players who twiddle the bat.",
        source: r955Cn.url,
      },
    ],
    notes: [
      "Yinhe's Chinese page title lists the 955 both with sponge (套胶) and as a topsheet only (单胶). Pimple dimensions are not published.",
      "The ITTF LARC lists a Yinhe \"Moxa955\" long-pips topsheet (49-015); because the name differs from the retail \"955\", ITTF approval is left blank.",
      "Yinhe also sells a 955 Euro version as a separate product.",
      RUBBER_RATINGS_NOTE,
    ],
    photo: { src: "/equipment/photos/rubbers/yinhe-955.webp", width: 800, height: 800, sourceUrl: "http://www.yinhe1986.cn/prod_view.aspx?TypeId=615&Id=620&FId=t3:615:3", credit: "© Yinhe" },
    sources: [r955Cn, r955En, LARC],
    lastVerified: ACCESSED,
    type: "long-pips",
    tackiness: null,
    hardness: null,
    spongeThicknesses: ["0.7", "OX"],
    spongeColor: null,
    ittfApproved: null,
    madeIn: null,
  },
];
