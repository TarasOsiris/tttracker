// Blade guides: composite fibres, inner vs outer construction, plies and woods, handles. English only.
// Every claim is backed by one of the guide's sources; feel and speed descriptions are attributed to whoever makes them.
import type { GlossaryTerm, Guide, Source } from "../models";

const ACCESSED = "2026-10-03";
const UPDATED = "2026-10-03";

const src = (url: string, label: string, kind: Source["kind"]): Source => ({ url, label, kind, accessed: ACCESSED });

// Shared sources.
const ITTF_STATUTES = src(
  "https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf",
  "ITTF Statutes 2026, Law 2.4 The Racket",
  "ittf",
);
const BF_SPECIAL_MATERIALS = src(
  "https://butterflyonline.com/butterfly-blades-special-materials/",
  "Butterfly: Blades special materials",
  "manufacturer",
);
const BF_DESIGNING = src(
  "https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/",
  "Butterfly: Designing blades with special materials",
  "manufacturer",
);
const BF_FIBER_FAQ = src(
  "https://www.butterfly-global.com/en/faq/detail/015701.html",
  "Butterfly FAQ: What are the characteristics of artificial fibers?",
  "manufacturer",
);
const BF_OUTER_INNER = src(
  "https://www.butterfly-global.com/en/products/blade/outer_inner_fiber.html",
  "Butterfly: Outerfiber and Innerfiber",
  "manufacturer",
);
const BF_REACTION_FAQ = src(
  "https://www.butterfly-global.com/en/faq/detail/015705.html",
  "Butterfly FAQ: What is the reaction property?",
  "manufacturer",
);
const BF_VIBRATION_FAQ = src(
  "https://www.butterfly-global.com/en/faq/detail/015706.html",
  "Butterfly FAQ: What is the vibration property?",
  "manufacturer",
);
const BF_SPECS = src(
  "https://butterflyonline.com/butterfly-blade-specifications/",
  "Butterfly North America: Blade specifications",
  "manufacturer",
);
const BF_MATRIX = src(
  "https://www.butterfly-global.com/en/products/blade/matrix.html",
  "Butterfly: Blade matrix",
  "manufacturer",
);
const BF_VISCARIA = src(
  "https://www.butterfly-global.com/en/products/detail/30041.html",
  "Butterfly: Viscaria",
  "manufacturer",
);
const BF_INNERFORCE_ALC = src(
  "https://shop.butterflyonline.com/innerforce-layer-alc",
  "Butterfly North America: Innerforce Layer ALC",
  "manufacturer",
);
const BF_TRUONG_TU = src(
  "https://butterflyonline.com/ask-the-experts-truong-tu-no-248/",
  "Butterfly: Ask the Experts, Truong Tu No. 248",
  "manufacturer",
);
const BF_WEIGHT_FAQ = src(
  "https://www.butterfly-global.com/en/faq/detail/015710.html",
  "Butterfly FAQ: Which is better, heavy or light blade?",
  "manufacturer",
);
const BF_HANDLE_FAQ = src(
  "https://www.butterfly-global.com/en/faq/detail/015702.html",
  "Butterfly FAQ: Handle shapes of shakehand blades",
  "manufacturer",
);
const BF_CYPRESS = src(
  "https://shop.butterflyonline.com/cypress-g-max-s-7364",
  "Butterfly North America: Cypress G-Max S",
  "manufacturer",
);
const STIGA_GUIDE = src(
  "https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket",
  "Stiga: How to find the right table tennis blade",
  "manufacturer",
);
const JOOLA_GUIDE = src(
  "https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades",
  "JOOLA USA: A guide to understanding table tennis blades",
  "manufacturer",
);
const ANDRO_BLADES = src("https://www.andro.de/en/blades", "andro: Blades", "manufacturer");
const DONIC_TCI = src(
  "https://tabletennis11.com/en/donic-original-true-carbon-inner",
  "TableTennis11: Donic Original True Carbon Inner",
  "retailer",
);
const TIBHAR_SAMSONOV = src("https://tibhar.info/en/samsonov-x-tibhar/", "Tibhar: Samsonov x TIBHAR", "manufacturer");
const SANWEI_FIBERS = src(
  "https://sanweisport.com/en/the-difference-between-the-various-carbon-fiber-in-table-tennis-blade/",
  "Sanwei: The difference between the various fibers in table tennis blades",
  "manufacturer",
);
const SOULSPIN_BASALT = src(
  "https://shop.soulspin.de/en/products/basalt-professional-table-tennis-blade",
  "SOULSPIN: BASALT blade",
  "manufacturer",
);
const MEGASPIN_GUIDE = src(
  "https://www.megaspin.net/store/extra/blade-guide.asp",
  "Megaspin: Guide to choosing a table tennis blade",
  "retailer",
);
const MEGASPIN_HINOKI = src(
  "https://www.megaspin.net/store/collection.asp?id=butterfly-hinoki-blades",
  "Megaspin: Butterfly Hinoki blades",
  "retailer",
);
const MEGASPIN_INNER_REVIEW = src(
  "https://www.megaspin.net/articles/586/butterfly-harimoto-alc-review",
  "Megaspin: Butterfly Innerforce ALC review (comparison with Viscaria)",
  "retailer",
);
const TT11_STIGA = src(
  "https://tabletennis11.com/en/blog/review-stiga-composite-blades",
  "TableTennis11: Review of Stiga composite blades",
  "retailer",
);
const PP_CARBONADO = src(
  "https://www.paddlepalace.com/products/stiga-carbonado-45-shakehand-blade",
  "Paddle Palace: Stiga Carbonado 45",
  "retailer",
);
const PP_GUIDE = src(
  "https://blog.paddlepalace.com/2011/03/table-tennis-blade-selection-guide/",
  "Paddle Palace: Table tennis blade selection guide",
  "retailer",
);
const TT11_HANDLES = src(
  "https://tabletennis11.com/en/blog/which-blade-handle",
  "TableTennis11: Which blade handle?",
  "retailer",
);
const WIKI_RACKET = src("https://en.wikipedia.org/wiki/Table_tennis_racket", "Wikipedia: Table tennis racket", "reference");
const WIKI_GRIPS = src(
  "https://en.wikipedia.org/wiki/Table_tennis_grips_and_playing_styles",
  "Wikipedia: Table tennis grips and playing styles",
  "reference",
);
const WIKI_ZYLON = src("https://en.wikipedia.org/wiki/Zylon", "Wikipedia: Zylon", "reference");
const WIKI_VECTRAN = src("https://en.wikipedia.org/wiki/Vectran", "Wikipedia: Vectran", "reference");
const WIKI_KEVLAR = src("https://en.wikipedia.org/wiki/Kevlar", "Wikipedia: Kevlar", "reference");
const WIKI_BASALT = src("https://en.wikipedia.org/wiki/Basalt_fiber", "Wikipedia: Basalt fiber", "reference");
const WIKI_HINOKI = src("https://en.wikipedia.org/wiki/Chamaecyparis_obtusa", "Wikipedia: Chamaecyparis obtusa (hinoki)", "reference");
const WIKI_LIMBA = src("https://en.wikipedia.org/wiki/Terminalia_superba", "Wikipedia: Terminalia superba (limba)", "reference");
const WIKI_AYOUS = src("https://en.wikipedia.org/wiki/Triplochiton_scleroxylon", "Wikipedia: Triplochiton scleroxylon (ayous)", "reference");
const KURARAY_VECTRAN = src(
  "https://www.kuraray.com/global-en/news/2008/0222_2/",
  "Kuraray: Dyed raw VECTRAN superfiber",
  "reference",
);
const TEXALIUM_REF = src(
  "https://carbonfibergear.com/blogs/carbonfiber/what-is-texalium",
  "Carbon Fiber Gear: What is Texalium?",
  "reference",
);
const TEXTREME_PRESS = src(
  "https://innovationintextiles.com/textreme-introduces-new-spread-tow-fabric-with-improved-damage-performance/",
  "Innovation in Textiles: TeXtreme introduces new spread tow fabric",
  "press",
);
const WOOD_LIMBA = src("https://www.wood-database.com/limba/", "The Wood Database: Limba", "reference");
const WOOD_KOTO = src("https://www.wood-database.com/koto/", "The Wood Database: Koto", "reference");
const WOOD_OBECHE = src("https://www.wood-database.com/obeche/", "The Wood Database: Obeche (ayous)", "reference");
const WOOD_PAULOWNIA = src("https://www.wood-database.com/paulownia/", "The Wood Database: Paulownia (kiri)", "reference");
const WOOD_BALSA = src("https://www.wood-database.com/balsa/", "The Wood Database: Balsa", "reference");
const WOOD_JANKA = src(
  "https://www.wood-database.com/wood-articles/janka-hardness/",
  "The Wood Database: Janka hardness",
  "reference",
);

export const bladeGuides: Guide[] = [
  {
    slug: "carbon-fibers-explained",
    title: "Carbon and Fibres in Table Tennis Blades: ALC, ZLC, Texalium and More",
    description:
      "The composite layers in table tennis blades explained: carbon, Arylate-Carbon (ALC), Zylon-Carbon (ZLC), Texalium, aramid, glass and basalt.",
    intro:
      "Most modern attacking blades are mostly wood with two thin layers of man-made fibre glued inside. This guide explains what those fibres are, how the big makers describe them, and which parts of those descriptions are measurements rather than marketing.",
    sections: [
      {
        heading: "What a composite layer is",
        figure: { type: "photo", image: { src: "/equipment/guides/carbon-weave.webp", width: 1200, height: 900, sourceUrl: "https://commons.wikimedia.org/wiki/File:Woven_carbon_fiber_fabric.jpg", credit: "Acheolg, CC BY-SA 4.0", alt: "Close-up of black woven carbon fibre fabric showing the interlaced fibre bundles" }, caption: "Woven carbon fibre fabric. Blade makers bond thin layers of fibre cloth like this between wood plies; each uses its own fibres and weaves." },
        blocks: [
          "The ITTF Laws require that **at least 85% of the blade by thickness is natural wood**. An adhesive layer inside the blade may be reinforced with fibrous material \"such as carbon fibre, glass fibre or compressed paper\", but each such layer may not be thicker than **7.5% of the total thickness or 0.35 mm, whichever is smaller** ([ITTF Statutes, Law 2.4.2](https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf)). So a \"carbon blade\" is a wooden blade with thin fibre-reinforced glue layers, not a carbon paddle.",
          "Makers usually write the build as wood plies plus fibre layers, for example **5W+2AC** for five wood plies and two Arylate-Carbon layers ([Butterfly](https://www.butterfly-global.com/en/products/detail/30041.html)). Where the two layers sit, under the outer veneer or next to the core, is covered in [Inner vs Outer Carbon Blades](/equipment/guides/inner-vs-outer-carbon).",
          "Retailer guides note that a blade's speed depends on the wood or composite used, the number of plies and the thickness together ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)), so the fibre is one input among several.",
        ],
      },
      {
        heading: "Carbon",
        blocks: [
          "Butterfly released its **TAMCA 5000** carbon in 1978, describing it as light, strong and giving blades a high rebound, and its T5000 blades as usually fast, direct and precise with a harder feel ([Butterfly](https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/)). In its fibre comparison Butterfly sums up T5000 as \"High reaction and vibration property\" ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015701.html)).",
          "Not all carbon fabric is the same. Stiga's Carbonado blades use **TeXtreme spread-tow carbon** in three densities, 64, 100 and 200 g/m², and lay it at 45° in some models and 90° in others; Stiga says the 45° layout gives more torsional flex and a higher throw, the 90° layout a stiffer feel and more speed ([TableTennis11](https://tabletennis11.com/en/blog/review-stiga-composite-blades), [Paddle Palace](https://www.paddlepalace.com/products/stiga-carbonado-45-shakehand-blade)). TeXtreme's maker, Oxeon, markets the material for its ultra-thin plies across aerospace, industrial and sports products ([Innovation in Textiles](https://innovationintextiles.com/textreme-introduces-new-spread-tow-fabric-with-improved-damage-performance/)).",
          "Browse plain-carbon blades: [carbon](/equipment/blades?fiber=carbon).",
        ],
      },
      {
        heading: "Arylate and Arylate-Carbon (ALC)",
        blocks: [
          "Butterfly introduced **Arylate** fibre in 1991, describing it as absorbing shock and vibration and weighing only 75% as much as carbon. It then combined it with carbon as **Arylate-Carbon (ALC)**, first in the Viscaria in 1993, to pair \"the soft feel of Arylate and the sheer bounce of Carbon\" ([Butterfly](https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/)). Butterfly's one-line summary: \"Excellent balance between bounce and lightness\" ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015701.html)).",
          "**Super ALC** weaves in more fibre than conventional Arylate-Carbon to raise bounce, with the Arylate-to-carbon ratio adjusted to keep the blade supple, according to Butterfly ([Butterfly](https://butterflyonline.com/butterfly-blades-special-materials/)).",
          "Butterfly's pages we read don't say who supplies its Arylate. For background: Kuraray, maker of the polyarylate fibre **Vectran** (a liquid-crystal polymer with high strength, low creep and low moisture absorption, per [Wikipedia](https://en.wikipedia.org/wiki/Vectran)), says its red Vectran fibre is used mainly as base fabric for table-tennis paddles, \"taking advantage of VECTRAN's vibration damping property\" ([Kuraray](https://www.kuraray.com/global-en/news/2008/0222_2/)).",
          "Browse: [Arylate-Carbon blades](/equipment/blades?fiber=arylate-carbon).",
        ],
      },
      {
        heading: "Zylon: ZL Fiber, ZLC and Super ZLC",
        blocks: [
          "**Zylon** is Toyobo's trade name for PBO, poly(p-phenylene-2,6-benzobisoxazole). Wikipedia gives its tensile strength as 5.8 GPa, about 1.6 times that of Kevlar, and its Young's modulus as 270 GPa. It also notes that Zylon in body armour was found to degrade over time and that the fibre is vulnerable to UV light, seawater and chafing ([Wikipedia](https://en.wikipedia.org/wiki/Zylon)). We found no maker data on how that affects a fibre sealed inside a blade.",
          {
            list: [
              "**ZL Fiber (ZLF)**: Butterfly says its density is about 10% lower than carbon fibre ([Butterfly](https://butterflyonline.com/butterfly-blades-special-materials/)) and summarises it as \"Elasticity and lightness. Lower vibration property\" ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015701.html)).",
              "**ZL-Carbon (ZLC)**: ZL fibre combined with carbon (Butterfly names TAMCA ULC). Butterfly describes it as \"High reaction by carbon, elasticity and lightness provided by ZL-fiber\" ([Butterfly](https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/), [Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015701.html)).",
              "**Super ZLC**: has 1.8 times the mass of densely woven carbon and ZL fibres of standard ZLC, which Butterfly says gives higher bounce and a wider reaction area ([Butterfly](https://butterflyonline.com/butterfly-blades-special-materials/)).",
            ],
          },
          "Other brands use PBO under their own names; JOOLA, for example, calls its version **PBO-c** and describes it as rigid carbon with significant elasticity ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)). Browse: [Zylon-Carbon](/equipment/blades?fiber=zylon-carbon), [Super ZLC](/equipment/blades?fiber=super-zlc), [Zylon](/equipment/blades?fiber=zylon).",
        ],
      },
      {
        heading: "Texalium",
        blocks: [
          "**Texalium** is a Hexcel fabric: woven glass fibre with a proprietary finish and a thin coat of aluminium, about 200 ångströms thick and 99.99% pure ([Carbon Fiber Gear](https://carbonfibergear.com/blogs/carbonfiber/what-is-texalium)). The aluminium gives it a silver look; the reinforcing fibre underneath is glass.",
          "We didn't find a blade maker's technical explanation of what Texalium changes in play, so we don't repeat feel claims here. Browse: [Texalium blades](/equipment/blades?fiber=texalium).",
        ],
      },
      {
        heading: "Aramid (Kevlar) and aramid-carbon",
        blocks: [
          "**Kevlar** is DuPont's para-aramid fibre, developed in 1965, with a fibre tensile strength of about 3,000 MPa and a relative density of 1.44 ([Wikipedia](https://en.wikipedia.org/wiki/Kevlar)).",
          "In blades aramid usually appears woven with carbon. Donic's Original True Carbon Inner uses a \"hybrid aramid carbon\" layer ([TableTennis11](https://tabletennis11.com/en/donic-original-true-carbon-inner)), and Tibhar describes its Samsonov Stratus Carbon as combining wood with \"a new generation of Kevlar carbon\" ([Tibhar](https://tibhar.info/en/samsonov-x-tibhar/)). Blade maker Sanwei describes aramid as very flexible with a soft hitting sensation, and an aramid-carbon hybrid as keeping that softness while adding carbon's firmness and speed ([Sanwei](https://sanweisport.com/en/the-difference-between-the-various-carbon-fiber-in-table-tennis-blade/)).",
          "Browse: [aramid-carbon](/equipment/blades?fiber=aramid-carbon), [aramid](/equipment/blades?fiber=aramid).",
        ],
      },
      {
        heading: "Glass, basalt and other fibres",
        figure: { type: "products", items: [{ kind: "blade", id: "butterfly-viscaria", note: "Arylate-Carbon" }, { kind: "blade", id: "butterfly-timo-boll-zlc", note: "ZL-Carbon" }, { kind: "blade", id: "xiom-stradivarius", note: "Aramid-carbon" }, { kind: "blade", id: "stiga-inspira-ccf", note: "Carbon" }], caption: "One blade from the catalogue for each of the most common composites. Open any of them for its full specs and sources." },
        blocks: [
          "**Glass fibre** is one of the materials the ITTF Laws name explicitly ([ITTF](https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf)). Sanwei describes high-strength fibreglass as soft and flexible, giving a soft feel when paired with hardwood, and carbon-plus-glass composites as blending carbon's crisp feedback with glass fibre's smoother contact ([Sanwei](https://sanweisport.com/en/the-difference-between-the-various-carbon-fiber-in-table-tennis-blade/)).",
          "**Basalt fibre** is made by melting basalt rock at about 1,500 °C and drawing it into filaments. Wikipedia lists its tensile strength as 2.9 to 3.1 GPa and modulus as 85 to 87 GPa, against 2.5 GPa and 76 GPa for E-glass ([Wikipedia](https://en.wikipedia.org/wiki/Basalt_fiber)). SOULSPIN says its basalt layer is flexible and \"doesn't make the blade as stiff\" as carbon ([SOULSPIN](https://shop.soulspin.de/en/products/basalt-professional-table-tennis-blade)), and andro sells a TP_LIGNA Basalt Inner blade ([andro](https://www.andro.de/en/blades)).",
          {
            list: [
              "Butterfly **CNF** (cellulose nanofibre, from plant fibres loosened to nanometre size), which Butterfly says gives low vibration despite high reaction ([Butterfly](https://butterflyonline.com/butterfly-blades-special-materials/)).",
              "Butterfly **CA-Fiber (CAF)**, which Butterfly describes as \"Good at passive control due to long dwell time\" ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015701.html)).",
              "andro's **ZYREEMA** and **VOLTEMA** synthetic fibres in the Synteliac line, which andro says reduce vibration and improve ball feedback ([andro](https://www.andro.de/en/blades)).",
            ],
          },
          "Browse: [glass](/equipment/blades?fiber=glass), [basalt](/equipment/blades?fiber=basalt).",
        ],
      },
      {
        heading: "What makers claim vs what is measured",
        blocks: [
          {
            list: [
              "**Fibre data** such as tensile strength and modulus are lab measurements of the raw fibre. They describe the material, not a finished blade, where the fibre is a thin glued layer limited by ITTF Law 2.4.2.",
              "**Butterfly's Reaction and Vibration figures** are values its R&D department measures and publishes for each blade ([Butterfly](https://www.butterfly-global.com/en/products/blade/matrix.html)). They are on Butterfly's own scale and aren't comparable with another brand's speed rating.",
              "**Feel words** (\"soft\", \"crisp\", \"holding the ball\") are the maker's description. Players often disagree about them, and blade weights also vary with humidity and temperature ([Butterfly](https://butterflyonline.com/butterfly-blade-specifications/)).",
            ],
          },
          "To compare blades on the numbers makers publish, use [Compare](/equipment/compare). To see how fibre placement changes things, read [Inner vs Outer Carbon Blades](/equipment/guides/inner-vs-outer-carbon).",
        ],
      },
    ],
    sources: [
      ITTF_STATUTES,
      BF_DESIGNING,
      BF_SPECIAL_MATERIALS,
      BF_FIBER_FAQ,
      BF_VISCARIA,
      BF_MATRIX,
      BF_SPECS,
      MEGASPIN_GUIDE,
      TT11_STIGA,
      PP_CARBONADO,
      TEXTREME_PRESS,
      WIKI_VECTRAN,
      KURARAY_VECTRAN,
      WIKI_ZYLON,
      JOOLA_GUIDE,
      TEXALIUM_REF,
      WIKI_KEVLAR,
      DONIC_TCI,
      TIBHAR_SAMSONOV,
      SANWEI_FIBERS,
      WIKI_BASALT,
      SOULSPIN_BASALT,
      ANDRO_BLADES,
    ],
    updated: UPDATED,
  },
  {
    slug: "inner-vs-outer-carbon",
    title: "Inner vs Outer Carbon Blades",
    description:
      "Inner vs outer carbon table tennis blades: where the fibre layer sits in a 5+2 layup, how Butterfly, andro, Stiga and Donic describe each, and how they compare.",
    intro:
      "Two blades can use the same fibre and the same number of plies and still play differently, because the fibre can sit just under the outer veneer or right next to the core. This guide shows both layups, uses Butterfly's Viscaria and Innerforce Layer ALC as the standard example, and lays out how makers describe the difference.",
    sections: [
      {
        heading: "Where the layer sits",
        figure: { type: "diagram", diagram: "layup-outer-inner", caption: "The two 5+2 layups described above, read from one face to the other. Schematic, not to scale: makers don't publish individual ply thicknesses." },
        blocks: [
          "Butterfly's diagram labels a blade from the outside in: **A** surface wood, **B** second layer, **C** wooden core. In an **Outerfiber** blade the fibre sits just beneath the surface veneer; in an **Innerfiber** blade it sits next to the core ([Butterfly](https://www.butterfly-global.com/en/products/blade/outer_inner_fiber.html)). Read from one face to the other, a five-wood, two-fibre (5+2) blade looks like this:",
          {
            list: [
              "**Outer fibre:** outer ply, fibre, inner ply, core, inner ply, fibre, outer ply.",
              "**Inner fibre:** outer ply, inner ply, fibre, core, fibre, inner ply, outer ply.",
            ],
          },
          "Donic's Original True Carbon Inner is listed in exactly that inner order: koto outer plies, ayous second plies, hybrid aramid-carbon third plies and a kiri core ([TableTennis11](https://tabletennis11.com/en/donic-original-true-carbon-inner)).",
          "Brands name the two builds differently. andro uses **CO/CI** (Carbon Outer/Inner) and **FO/FI** (Fiber Outer/Inner) ([andro](https://www.andro.de/en/blades)); Stiga calls its inner build **Close Core Fiber (CCF)** ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)). Browse: [outer-composite](/equipment/blades?build=outer-composite), [inner-composite](/equipment/blades?build=inner-composite).",
        ],
      },
      {
        heading: "The standard example: Viscaria vs Innerforce Layer ALC",
        figure: { type: "products", items: [{ kind: "blade", id: "butterfly-viscaria", note: "5 wood + 2 Arylate-Carbon" }, { kind: "blade", id: "butterfly-innerforce-layer-alc", note: "5 wood + 2 Arylate-Carbon, Innerfiber" }], caption: "The two Butterfly blades this guide compares. Butterfly labels only the Innerforce model's fibre position on its spec pages." },
        blocks: [
          "Both are Butterfly 5W+2AC blades (five wood plies, two Arylate-Carbon). The Viscaria has outer ALC; the Innerforce Layer ALC places the Arylate-Carbon \"closer to the core\" ([Megaspin](https://www.megaspin.net/articles/586/butterfly-harimoto-alc-review), [Butterfly](https://shop.butterflyonline.com/innerforce-layer-alc)). Butterfly's own measurements, both on Butterfly's scale:",
          {
            list: [
              "**Viscaria** (outer ALC): Reaction 11.8, Vibration 10.3 ([Butterfly](https://www.butterfly-global.com/en/products/detail/30041.html)).",
              "**Innerforce Layer ALC** (inner ALC): Reaction 10.7, Vibration 9.4 ([Butterfly](https://shop.butterflyonline.com/innerforce-layer-alc)).",
            ],
          },
          "Butterfly defines a lower Reaction value as a lower ball speed after contact and a lower Vibration value as a softer touch ([Butterfly](https://www.butterfly-global.com/en/faq/detail/015705.html), [Butterfly](https://www.butterfly-global.com/en/faq/detail/015706.html)). On Butterfly's own numbers, then, the inner version is the slower and softer of the two. These figures can be compared within Butterfly's range only.",
        ],
      },
      {
        heading: "How makers describe the difference",
        blocks: [
          {
            list: [
              "**Butterfly:** Outerfiber \"enhance[s] the feel of artificial fibers, enabling faster shots\"; Innerfiber \"provides a touch of longer dwell time, while preserving the unique characteristics of the fiber\" ([Butterfly](https://www.butterfly-global.com/en/products/blade/outer_inner_fiber.html)). Butterfly also says inner placement gives \"more power, without losing the feel of an all-wood blade\" ([Butterfly](https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/)).",
              "**andro:** carbon outer gives \"powerful play with hard stop\"; carbon inner \"a softer touch while maintaining high stiffness\"; fibre inner enlarges the sweet spot ([andro](https://www.andro.de/en/blades)).",
              "**Stiga:** outer fibre \"provides the blade with additional power\"; Close Core Fiber preserves \"the original characteristics\" of the wood ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)).",
              "**Donic (via retailer):** the inner version of the True Carbon gives \"a softer touch and enhanced control with only a slight reduction in speed\" ([TableTennis11](https://tabletennis11.com/en/donic-original-true-carbon-inner)).",
            ],
          },
          "The makers broadly agree: outer is described as faster and more direct, inner as softer, woodier and with longer dwell. How large the difference feels depends on the player, and these are descriptions, not measurements.",
        ],
      },
      {
        heading: "Who each tends to suit",
        blocks: [
          "Retailer guides describe the choice as **reaction speed versus rally control**: outer carbon for maximum rebound and stability, inner carbon to keep a wood feel with more control in longer rallies ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)). In a review comparing an inner-ALC Innerforce model with the outer-ALC Viscaria, Megaspin describes the Viscaria as suiting players who want crisper contact and the inner model as a little slower and softer, with more dwell in topspin play ([Megaspin](https://www.megaspin.net/articles/586/butterfly-harimoto-alc-review)).",
          "Butterfly's own guidance is simply that each structure has its own character and players should choose by the performance and feel they want ([Butterfly](https://www.butterfly-global.com/en/products/blade/outer_inner_fiber.html)).",
          "Rubber matters too. Asked about pairings, Butterfly coach Truong Tu agreed that softer blades generally pair better with harder rubbers and vice versa ([Butterfly](https://butterflyonline.com/ask-the-experts-truong-tu-no-248/)). See [Sponge Hardness Scales](/equipment/guides/sponge-hardness-scales).",
        ],
      },
      {
        heading: "Dwell time, briefly",
        blocks: [
          "\"Dwell time\" is how long the ball stays on the racket. Truong Tu describes the trade-off: with a hard blade and hard rubber \"there is too little dwell time... least feeling and least spin\", while with a soft blade and soft rubber \"there is no power due to the ball staying too long\" ([Butterfly](https://butterflyonline.com/ask-the-experts-truong-tu-no-248/)).",
          "Makers use the term to describe blades (Butterfly says its CA-Fiber is \"good at passive control due to long dwell time\" ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015701.html))), but none of the makers we read publishes a dwell-time measurement for its blades.",
        ],
      },
      {
        heading: "Compared with all-wood blades",
        blocks: [
          "All-wood blades have no fibre layer. Composite blades are commonly described as having a larger sweet spot and more speed but less vibration feedback than all-wood ([Wikipedia](https://en.wikipedia.org/wiki/Table_tennis_racket)), and inner-fibre blades are pitched as a middle ground that keeps more of the wood feel ([Butterfly](https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/)).",
          "Both kinds follow the same ITTF rule: at least 85% of the thickness must be natural wood ([ITTF](https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf)). Browse [all-wood blades](/equipment/blades?build=all-wood), or read [Blade Plies and Woods](/equipment/guides/plies-and-woods) and [Carbon and Fibres](/equipment/guides/carbon-fibers-explained).",
        ],
      },
    ],
    sources: [
      BF_OUTER_INNER,
      BF_DESIGNING,
      BF_VISCARIA,
      BF_INNERFORCE_ALC,
      BF_REACTION_FAQ,
      BF_VIBRATION_FAQ,
      BF_FIBER_FAQ,
      BF_TRUONG_TU,
      ANDRO_BLADES,
      STIGA_GUIDE,
      DONIC_TCI,
      MEGASPIN_GUIDE,
      MEGASPIN_INNER_REVIEW,
      WIKI_RACKET,
      ITTF_STATUTES,
    ],
    updated: UPDATED,
  },
  {
    slug: "plies-and-woods",
    title: "Blade Plies and Woods: Limba, Koto, Hinoki, Ayous and Kiso",
    description:
      "Table tennis blade plies and woods: 5-ply vs 7-ply, single-ply hinoki, limba, koto, ayous and kiri, thickness, weight, speed classes and the ITTF wood rule.",
    intro:
      "A table tennis blade is built from thin wood plies glued together, sometimes with fibre layers in between. This guide covers how many plies blades use, the woods makers choose for the outside and the core, and what the ITTF requires.",
    sections: [
      {
        heading: "What the rules require",
        figure: { type: "photo", image: { src: "/equipment/guides/blade-plies.webp", width: 1200, height: 802, sourceUrl: "https://commons.wikimedia.org/wiki/File:MANTRA_ARTTE.jpg", credit: "Corsa46, CC BY-SA 4.0", alt: "A bare shakehand table tennis blade without rubbers, its layered edge visible along the bottom of the head" }, caption: "A bare blade without rubbers. The layered plies show along the edge of the head." },
        blocks: [
          "The racket may be any size, shape or weight, but the blade must be flat and rigid (ITTF Law 2.4.1). **At least 85% of the blade by thickness must be natural wood**; an adhesive layer may be reinforced with fibrous material, up to 7.5% of the total thickness or 0.35 mm, whichever is smaller (Law 2.4.2). The blade and every layer within it must be continuous and of even thickness (Law 2.4.4) ([ITTF Statutes](https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf)).",
        ],
      },
      {
        heading: "5-ply vs 7-ply all-wood",
        figure: { type: "diagram", diagram: "plies-5-7", caption: "How a 5-ply and a 7-ply all-wood blade are layered around the core. Schematic, not to scale." },
        blocks: [
          {
            list: [
              "**5-ply:** a thicker core and one inner ply on each side under the outer ply. JOOLA associates 5-ply with control and spin and calls it more flexible with a lighter feel ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)). Stiga points all-round players to 5-ply for control ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)).",
              "**7-ply:** thinner veneers and more glue, which JOOLA says gives more stiffness, power and precision, and is \"often deemed to be faster on average than 5-ply\" ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)).",
            ],
          },
          "Retailer guides make the same general point, that more plies make a blade stiffer ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)). These are tendencies: wood choice and thickness change speed as well. Browse [5-ply](/equipment/blades?plies=5) and [7-ply](/equipment/blades?plies=7) blades, or [all-wood](/equipment/blades?build=all-wood).",
        ],
      },
      {
        heading: "Single-ply hinoki for Japanese penhold",
        blocks: [
          "Traditional Japanese penhold rackets are made from a very thick single ply of cypress (hinoki), painted black on the back ([Wikipedia](https://en.wikipedia.org/wiki/Table_tennis_grips_and_playing_styles)). Butterfly lists 1-ply hinoki as its own category in its blade matrix ([Butterfly](https://www.butterfly-global.com/en/products/blade/matrix.html)).",
          "Butterfly's Cypress G-Max S, for example, is 1 ply, **10.0 mm** thick, about 93 g, made from \"the finest grade of Kiso Cypress\" ([Butterfly](https://shop.butterflyonline.com/cypress-g-max-s-7364)). Megaspin describes Butterfly's 1-ply Kiso hinoki blades as giving \"a soft and very pleasant touch\" with \"a lot of speed\" ([Megaspin](https://www.megaspin.net/store/collection.asp?id=butterfly-hinoki-blades)). See [Blade Handles](/equipment/guides/blade-handles) for the Japanese penhold handle.",
        ],
      },
      {
        heading: "Common woods",
        blocks: [
          "Density and Janka hardness below come from The Wood Database. Janka is the force needed to press an 11.28 mm steel ball halfway into the wood ([The Wood Database](https://www.wood-database.com/wood-articles/janka-hardness/)). These figures are for solid lumber, not thin blade veneers, so treat them as a rough guide to the wood, not to the blade.",
          {
            list: [
              "**Limba** (*Terminalia superba*, tropical West Africa): 555 kg/m³, Janka 670 lbf ([Wood Database](https://www.wood-database.com/limba/), [Wikipedia](https://en.wikipedia.org/wiki/Terminalia_superba)). A common outer ply. Described as softer with more dwell and a higher arc ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)), and by Stiga as \"soft yet sturdy\" for control and touch ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)).",
              "**Koto** (*Pterygota macrocarpa*): 595 kg/m³, Janka 940 lbf ([Wood Database](https://www.wood-database.com/koto/)). An outer ply described as harder and more direct, with a faster, flatter ball ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)); JOOLA says it adds stiffness, precision and power ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)).",
              "**Hinoki** (*Chamaecyparis obtusa*, Japanese cypress, central Japan): straight-grained, and listed by Wikipedia among woods used for table tennis blades ([Wikipedia](https://en.wikipedia.org/wiki/Chamaecyparis_obtusa)). Used as the single ply of Japanese penhold blades or as an outer ply in multi-ply blades; Megaspin says it \"strikes a balance between stiffness and softness\" ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)).",
              "**Ayous** (*Triplochiton scleroxylon*, also obeche, abachi, wawa): 380 kg/m³, Janka 440 lbf ([Wood Database](https://www.wood-database.com/obeche/), [Wikipedia](https://en.wikipedia.org/wiki/Triplochiton_scleroxylon)). JOOLA calls it light and elastic and best near the core ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)); Megaspin calls it soft and slow, common in all-round blades ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)).",
              "**Kiri** (*Paulownia*): 280 kg/m³, Janka 300 lbf ([Wood Database](https://www.wood-database.com/paulownia/)). A core wood; JOOLA says its tight structure controls vibration and calls it the most popular core layer ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)), and Megaspin notes it is used mainly by Butterfly ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)).",
              "**Balsa** (*Ochroma pyramidale*): 150 kg/m³, Janka 67 lbf ([Wood Database](https://www.wood-database.com/balsa/)). A very light core; Megaspin notes balsa blades need a thicker build ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)).",
            ],
          },
        ],
      },
      {
        heading: "Kiso hinoki",
        figure: { type: "products", items: [{ kind: "blade", id: "nittaku-septear", note: "7 plies of Kiso hinoki" }], caption: "Nittaku's Septear, a blade made entirely from Kiso hinoki plies." },
        blocks: [
          "\"Kiso\" refers to hinoki from Japan's Kiso area. Wikipedia notes that hinoki grown in Kiso and used for building Ise Shrine is called go-shin-boku, \"divine trees\" ([Wikipedia](https://en.wikipedia.org/wiki/Chamaecyparis_obtusa)). Butterfly sells its top single-ply penhold blades as Kiso Cypress ([Butterfly](https://shop.butterflyonline.com/cypress-g-max-s-7364)).",
        ],
      },
      {
        heading: "Outer ply and core",
        blocks: [
          "The **outer ply** is the veneer under the rubber; the **core** is the centre ply. Makers often pair a harder or softer outer wood with a light core: Megaspin lists kiri (mainly Butterfly), ayous (Stiga, Xiom) and balsa as typical cores ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)), and JOOLA puts limba and koto on the outside ([JOOLA](https://joola.com/blogs/blog/a-guide-to-understanding-table-tennis-blades)).",
          "Hinoki also appears on multi-ply shakehand blades as well as single-ply penholds ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)).",
        ],
      },
      {
        heading: "Speed classes (OFF, ALL, DEF)",
        figure: { type: "diagram", diagram: "speed-classes", caption: "The class labels in order from fastest to slowest, as Paddle Palace lists them. Each brand uses its own subset and its own idea of where a blade belongs." },
        blocks: [
          "Makers sort blades into speed classes. Paddle Palace lists them from \"OFF+ to the slowest rating of DEF-\", where a faster rating means the ball bounces farther off the blade for the same force ([Paddle Palace](https://blog.paddlepalace.com/2011/03/table-tennis-blade-selection-guide/)). Megaspin describes all-round blades as quicker than defensive ones but short of power from mid-distance, and defensive blades as made for choppers and blockers ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)).",
          "Each brand assigns its own classes, so an OFF from one maker isn't necessarily as fast as an OFF from another. We show each maker's class as printed and don't compare them across brands.",
        ],
      },
      {
        heading: "Thickness and weight",
        figure: { type: "diagram", diagram: "blade-thickness-weight", caption: "Every blade in our catalogue whose maker publishes both thickness and weight (a weight range is plotted at its midpoint). Hover a dot to see the blade, click to open it." },
        blocks: [
          "Megaspin's guide puts blades under about 6 mm on the control-and-spin side and 6 mm and up on the power side, and notes that composites can stiffen a thinner blade ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)). Single-ply hinoki penholds are much thicker, around 10 mm ([Butterfly](https://shop.butterflyonline.com/cypress-g-max-s-7364)).",
          "Stiga sorts its blades into weight bands: low 75 to 85 g, mid 80 to 90 g, high 85 to 95 g ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)). Butterfly's advice is to \"choose a racket as heavy as you can swing comfortably and with full control\": heavier gives more power at the same swing speed, lighter is quicker between forehand and backhand ([Butterfly](https://www.butterfly-global.com/en/faq/detail/015710.html)). Butterfly also notes that a blade's weight varies with humidity and temperature ([Butterfly](https://butterflyonline.com/butterfly-blade-specifications/)), so a listed weight is nominal.",
        ],
      },
    ],
    sources: [
      ITTF_STATUTES,
      JOOLA_GUIDE,
      STIGA_GUIDE,
      MEGASPIN_GUIDE,
      MEGASPIN_HINOKI,
      WIKI_GRIPS,
      WIKI_HINOKI,
      WIKI_LIMBA,
      WIKI_AYOUS,
      BF_MATRIX,
      BF_CYPRESS,
      BF_WEIGHT_FAQ,
      BF_SPECS,
      WOOD_JANKA,
      WOOD_LIMBA,
      WOOD_KOTO,
      WOOD_OBECHE,
      WOOD_PAULOWNIA,
      WOOD_BALSA,
      PP_GUIDE,
    ],
    updated: UPDATED,
  },
  {
    slug: "blade-handles",
    title: "Table Tennis Blade Handles: FL, ST, AN, CS and Japanese Penhold",
    description:
      "Table tennis blade handles explained: flared (FL), straight (ST), anatomic (AN), conic, Chinese penhold (CS) and Japanese penhold, and why sizes vary.",
    intro:
      "The handle shape doesn't change what the blade face does, but it changes how the racket sits in your hand. This guide covers the common shakehand handles, the two penhold styles, and why one brand's FL isn't another's.",
    sections: [
      {
        heading: "What the rules say",
        figure: { type: "diagram", diagram: "handles", caption: "The handle shapes this guide covers, drawn on the same blade head. Exact sizes vary by brand and model." },
        blocks: [
          "The ITTF Laws let a racket be any size, shape or weight as long as the blade is flat and rigid, and allow \"material suitable to shape a handle\" to be added on ([ITTF Statutes, Laws 2.4.1 and 2.4.4](https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf)). That is why makers can offer so many shapes.",
        ],
      },
      {
        heading: "Flared (FL)",
        blocks: [
          "Butterfly describes FL as a handle with a wide end that fits in the palm and brings the centre of gravity closer to the handle, and as the shape many players around the world choose ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015702.html)). TableTennis11 notes FL is narrowest in the middle and says it encourages a looser grip with more wrist freedom for loops and flicks ([TableTennis11](https://tabletennis11.com/en/blog/which-blade-handle)). Stiga calls its flared handle **Master** (\"concave\") ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)) and has offered it in large and small sizes ([Paddle Palace](https://blog.paddlepalace.com/2011/03/table-tennis-blade-selection-guide/)).",
          "Browse: [FL blades](/equipment/blades?handle=FL).",
        ],
      },
      {
        heading: "Straight (ST)",
        blocks: [
          "A straight handle keeps the same thickness from top to end. Butterfly says it makes changing grip easier and quicker and that most choppers choose it ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015702.html)); retailers add that it is easier for twiddling (turning the racket over) ([Megaspin](https://www.megaspin.net/store/extra/blade-guide.asp)). TableTennis11 says it gives more stability on drives and blocks but slightly less wrist movement than FL ([TableTennis11](https://tabletennis11.com/en/blog/which-blade-handle)). Stiga's version is called **Classic** ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)).",
          "Butterfly also makes **SI (Straight Incline)**: uniform width, but thicker towards the end ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015702.html)). Browse: [ST blades](/equipment/blades?handle=ST).",
        ],
      },
      {
        heading: "Anatomic (AN) and conic",
        blocks: [
          "Anatomic handles bulge in the middle. Butterfly calls AN a wavy shape that fits the whole palm and a comfortable shape for beginners ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015702.html)); TableTennis11 says it encourages a deep grip ([TableTennis11](https://tabletennis11.com/en/blog/which-blade-handle)).",
          "A **conic** handle is narrowest at the top and widens toward the end, which TableTennis11 describes as a hybrid of ST and FL ([TableTennis11](https://tabletennis11.com/en/blog/which-blade-handle)).",
          "Browse: [AN blades](/equipment/blades?handle=AN).",
        ],
      },
      {
        heading: "Chinese penhold (CS)",
        blocks: [
          "Chinese-style penhold blades have a rounded head like a shakehand blade, often a little smaller, with a short handle ([Paddle Palace](https://blog.paddlepalace.com/2011/03/table-tennis-blade-selection-guide/)). Butterfly lists its CS handle at 82 × 24 × 32 mm, against 100 mm long for its shakehand handles ([Butterfly](https://butterflyonline.com/butterfly-blade-specifications/)). Stiga describes its penhold handle as conical, short and wide, letting the wrist move freely ([Stiga](https://www.stigasports.com/en/explore-stiga-sports/choosing-the-right-blade-for-your-table-tennis-racket)).",
          "Modern Chinese penholders also play with the back side of the blade, the reverse penhold backhand, so CS blades take rubber on both sides ([Wikipedia](https://en.wikipedia.org/wiki/Table_tennis_grips_and_playing_styles)). Browse: [CS blades](/equipment/blades?handle=CS).",
        ],
      },
      {
        heading: "Japanese penhold (JP)",
        blocks: [
          "Japanese penhold rackets are usually square-headed, with a large piece of cork protruding from the handle that the index finger hooks around ([Wikipedia](https://en.wikipedia.org/wiki/Table_tennis_grips_and_playing_styles), [Paddle Palace](https://blog.paddlepalace.com/2011/03/table-tennis-blade-selection-guide/)). Traditionally they are a thick single ply of hinoki with rubber on one side only and the back painted black ([Wikipedia](https://en.wikipedia.org/wiki/Table_tennis_grips_and_playing_styles)).",
          "Butterfly's Cypress G-Max S is an example: a 163 × 135 mm head, a 92 × 20 mm handle, and cork on the back ([Butterfly](https://shop.butterflyonline.com/cypress-g-max-s-7364)). Browse: [JP blades](/equipment/blades?handle=JP), and see [Blade Plies and Woods](/equipment/guides/plies-and-woods) for single-ply hinoki.",
        ],
      },
      {
        heading: "Sizes vary by brand",
        blocks: [
          "TableTennis11 notes that \"there are no standardized dimensions\" for a handle type, \"even from the same manufacturer\" ([TableTennis11](https://tabletennis11.com/en/blog/which-blade-handle)). Even one brand's listings can differ: Butterfly's global site gives the Viscaria's FL as 100 × 25 × 34 mm and its ST as 100 × 23 × 28 mm ([Butterfly](https://www.butterfly-global.com/en/products/detail/30041.html)), while Butterfly North America's general chart lists ST at 100 × 25 × 28 mm ([Butterfly](https://butterflyonline.com/butterfly-blade-specifications/)).",
          "Butterfly's own view is that handle choice is about grip and comfort ([Butterfly FAQ](https://www.butterfly-global.com/en/faq/detail/015702.html)). If you can, hold the handle before you buy, and compare handle options with [Compare](/equipment/compare).",
        ],
      },
    ],
    sources: [
      ITTF_STATUTES,
      BF_HANDLE_FAQ,
      BF_SPECS,
      BF_VISCARIA,
      BF_CYPRESS,
      STIGA_GUIDE,
      TT11_HANDLES,
      MEGASPIN_GUIDE,
      PP_GUIDE,
      WIKI_GRIPS,
    ],
    updated: UPDATED,
  },
];

export const bladeTerms: GlossaryTerm[] = [
  {
    id: "alc",
    term: "ALC (Arylate-Carbon)",
    aliases: ["Arylate Carbon", "AC"],
    definition:
      "Butterfly's composite of Arylate and carbon fibres, first used in the Viscaria in 1993. Butterfly describes it as an \"excellent balance between bounce and lightness\".",
    guide: "carbon-fibers-explained",
  },
  {
    id: "super-alc",
    term: "Super ALC",
    definition: "A Butterfly Arylate-Carbon weave with more fibre than standard ALC, which Butterfly says gives a higher bounce.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "arylate",
    term: "Arylate",
    definition:
      "A polyarylate fibre Butterfly introduced in 1991, described as absorbing shock and vibration and weighing 75% as much as carbon.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "zlc",
    term: "ZLC (ZL-Carbon)",
    aliases: ["Zylon Carbon", "ZL Carbon"],
    definition:
      "Butterfly's composite of ZL fibre (Zylon/PBO) and carbon, described by Butterfly as \"high reaction by carbon, elasticity and lightness provided by ZL-fiber\".",
    guide: "carbon-fibers-explained",
  },
  {
    id: "zlf",
    term: "ZLF (ZL Fiber)",
    aliases: ["ZL Fiber", "Zylon"],
    definition:
      "Butterfly's Zylon-based fibre used without carbon. Butterfly says it is about 10% less dense than carbon fibre and gives \"elasticity and lightness\" with a lower vibration property.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "super-zlc",
    term: "Super ZLC",
    definition:
      "A denser Butterfly ZL-Carbon with 1.8 times the fibre mass of standard ZLC, which Butterfly says gives higher bounce and a wider reaction area.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "pbo",
    term: "PBO (Zylon)",
    aliases: ["PBO-c", "Zylon"],
    definition:
      "Poly(p-phenylene-2,6-benzobisoxazole), a high-strength fibre made by Toyobo under the name Zylon. Butterfly uses it in ZLC; other brands use names like PBO-c.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "texalium",
    term: "Texalium",
    definition: "A Hexcel fabric of woven glass fibre with a very thin aluminium coating, which gives it a silver look.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "aramid",
    term: "Aramid (Kevlar)",
    aliases: ["Kevlar", "aramid fibre"],
    definition:
      "A family of synthetic fibres; Kevlar is DuPont's para-aramid. In blades it usually appears woven with carbon as aramid-carbon.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "aramid-carbon",
    term: "Aramid-carbon",
    aliases: ["Kevlar carbon", "hybrid aramid carbon"],
    definition:
      "A woven mix of aramid and carbon fibres used by brands such as Donic and Tibhar. Makers describe it as softer than plain carbon.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "spread-tow-carbon",
    term: "Spread-tow carbon (TeXtreme)",
    aliases: ["TeXtreme"],
    definition:
      "Oxeon's ultra-thin TeXtreme carbon fabric, used by Stiga in densities of 64, 100 and 200 g/m² and laid at 45° or 90° depending on the model.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "basalt-fiber",
    term: "Basalt fibre",
    definition:
      "Fibre drawn from melted basalt rock, stronger and stiffer than E-glass. Some blade makers use it as a less stiff alternative to carbon.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "koto",
    term: "Koto",
    definition:
      "A West African wood (*Pterygota macrocarpa*) used as an outer ply. It is harder than limba and is usually described as more direct.",
    guide: "plies-and-woods",
  },
  {
    id: "limba",
    term: "Limba",
    definition:
      "A West African wood (*Terminalia superba*) and a common outer ply, usually described as softer, with more dwell and a higher arc.",
    guide: "plies-and-woods",
  },
  {
    id: "hinoki",
    term: "Hinoki",
    aliases: ["Japanese cypress", "cypress"],
    definition:
      "Japanese cypress (*Chamaecyparis obtusa*). It is the traditional single-ply wood of Japanese penhold blades and also appears as an outer ply on shakehand blades.",
    guide: "plies-and-woods",
  },
  {
    id: "kiso-hinoki",
    term: "Kiso hinoki",
    aliases: ["Kiso cypress"],
    definition:
      "Hinoki from Japan's Kiso area, which Butterfly uses for its top single-ply penhold blades.",
    guide: "plies-and-woods",
  },
  {
    id: "kiri",
    term: "Kiri",
    aliases: ["Paulownia"],
    definition: "Paulownia, a very light wood used as a blade core, especially by Butterfly.",
    guide: "plies-and-woods",
  },
  {
    id: "ayous",
    term: "Ayous",
    aliases: ["Obeche", "Abachi", "Wawa"],
    definition:
      "A light, soft African wood (*Triplochiton scleroxylon*) used for cores and inner plies, often in all-round blades.",
    guide: "plies-and-woods",
  },
  {
    id: "balsa",
    term: "Balsa",
    definition: "The lightest commercial wood, used as a blade core; balsa blades need a thicker build.",
    guide: "plies-and-woods",
  },
  {
    id: "core",
    term: "Core",
    aliases: ["core ply", "core veneer"],
    definition: "The centre ply of a blade, usually a light wood such as kiri, ayous or balsa.",
    guide: "plies-and-woods",
  },
  {
    id: "outer-ply",
    term: "Outer ply",
    aliases: ["surface veneer", "outer veneer"],
    definition: "The veneer directly under the rubber, often limba, koto or hinoki.",
    guide: "plies-and-woods",
  },
  {
    id: "plies",
    term: "Plies",
    aliases: ["ply", "5-ply", "7-ply"],
    definition:
      "The layers of a blade. All-wood blades are usually 5 or 7 plies; Japanese penhold blades can be a single ply.",
    guide: "plies-and-woods",
  },
  {
    id: "layup-notation",
    term: "5W+2C (layup notation)",
    aliases: ["5+2", "5W+2AC"],
    definition:
      "How makers write a blade's build: wood plies plus fibre layers. For example, 5W+2AC means five wood plies and two Arylate-Carbon layers.",
    guide: "carbon-fibers-explained",
  },
  {
    id: "all-wood",
    term: "All-wood blade",
    definition: "A blade made only of wood plies, with no fibre layer.",
    guide: "plies-and-woods",
  },
  {
    id: "inner-carbon",
    term: "Inner carbon",
    aliases: ["Innerfiber", "Innerforce", "CI", "FI", "Close Core Fiber", "CCF"],
    definition:
      "A build with the fibre layers next to the core rather than under the outer ply. Makers describe it as softer, woodier and with longer dwell than outer carbon.",
    guide: "inner-vs-outer-carbon",
  },
  {
    id: "outer-carbon",
    term: "Outer carbon",
    aliases: ["Outerfiber", "Outerforce", "CO", "FO"],
    definition:
      "A build with the fibre layers just under the outer ply. Makers describe it as faster and more direct than inner carbon.",
    guide: "inner-vs-outer-carbon",
  },
  {
    id: "dwell-time",
    term: "Dwell time",
    definition:
      "How long the ball stays on the racket at contact. Makers use it to describe feel, but none of the makers we read publishes a dwell-time measurement.",
    guide: "inner-vs-outer-carbon",
  },
  {
    id: "reaction-property",
    term: "Reaction (Butterfly)",
    aliases: ["reaction property"],
    definition:
      "Butterfly's measured value for a blade's base speed: higher means a faster ball after contact. It is on Butterfly's own scale.",
    guide: "inner-vs-outer-carbon",
  },
  {
    id: "vibration-property",
    term: "Vibration (Butterfly)",
    aliases: ["vibration property"],
    definition:
      "Butterfly's measured value for how fast a blade vibrates on impact: lower means a softer touch, higher a harder one. It is on Butterfly's own scale.",
    guide: "inner-vs-outer-carbon",
  },
  {
    id: "blade-class",
    term: "Blade class (OFF, ALL, DEF)",
    aliases: ["OFF", "OFF+", "ALL", "ALL+", "DEF"],
    definition:
      "A maker's speed category, from defensive (DEF) through all-round (ALL) to offensive (OFF+). Each brand sets its own, so classes aren't comparable across brands.",
    guide: "plies-and-woods",
  },
  {
    id: "fl-handle",
    term: "FL (flared handle)",
    aliases: ["flared", "Master"],
    definition: "A handle that is wide at the end and fits the palm; Butterfly says it is the shape many players choose.",
    guide: "blade-handles",
  },
  {
    id: "st-handle",
    term: "ST (straight handle)",
    aliases: ["straight", "Classic"],
    definition: "A handle that is the same thickness from top to end, which makes changing grip easier. Butterfly says most choppers choose it.",
    guide: "blade-handles",
  },
  {
    id: "an-handle",
    term: "AN (anatomic handle)",
    aliases: ["anatomic", "anatomical"],
    definition: "A handle that bulges in the middle to fit the whole palm.",
    guide: "blade-handles",
  },
  {
    id: "cs-handle",
    term: "CS (Chinese penhold)",
    aliases: ["Chinese penhold", "C-pen"],
    definition: "A short handle on a rounded head for the Chinese penhold grip, usually with rubber on both sides.",
    guide: "blade-handles",
  },
  {
    id: "jpen",
    term: "Japanese penhold (JP)",
    aliases: ["JPen", "J-pen", "JP"],
    definition:
      "A usually square-headed penhold blade with a cork block for the index finger, traditionally a thick single ply of hinoki with rubber on one side.",
    guide: "blade-handles",
  },
];
