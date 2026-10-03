// The hardness guide explains the bands in hardness.ts; change both together.
import type { GlossaryTerm, Guide, Source } from "../models";

const accessed = "2026-10-03";
const src = (url: string, label: string, kind: Source["kind"]): Source => ({ url, label, kind, accessed });

const butterflySpec = src("https://www.butterfly-global.com/en/products/rubber/spec.html", "Butterfly: how to read rubber specifications", "manufacturer");
const tenergy05 = src("https://www.butterfly-global.com/en/products/detail/05800.html", "Butterfly: Tenergy 05 specifications", "manufacturer");
const dignics05 = src("https://www.butterfly-global.com/en/products/detail/06040.html", "Butterfly: Dignics 05 specifications", "manufacturer");
const nittakuG1 = src("https://www.nittaku.com/products/rubbers/post-3", "Nittaku: Fastarc G-1 (Japanese and German hardness)", "manufacturer");
const nittakuEuG1 = src("https://nittaku.tt/en/products/nittaku-fastarc-g-1-rubber", "Nittaku Deutschland (official German dealer): Fastarc G-1", "retailer");
const victasV15 = src("https://www.victas.com/products/detail.html?id=781", "Victas: V>15 Extra specifications", "manufacturer");
const yasakaRakza7 = src("https://www.yasakajp.com/items/rakza_7/", "Yasaka Japan: Rakza 7", "manufacturer");
const tibharMxp = src("https://tibhar.info/en/shop/evolution-mx-p50/", "Tibhar: Evolution MX-P 50", "manufacturer");
const androR47 = src("https://www.andro.de/en/node/46", "andro: Rasanter R47", "manufacturer");
const tt11Dhs = src(
  "https://tabletennis11.com/en/blog/dhs-hurricane3-neo-3-50-provincial-review",
  "TableTennis11: DHS Hurricane 3, Neo, 3-50 and Provincial review",
  "retailer",
);
const tt11GoldArc = src("https://tabletennis11.com/en/blog/dhs-goldarc-5-and-8-review", "TableTennis11: DHS Gold Arc 5 and 8 review", "retailer");
const soulspin = src("https://soulspin.de/en/tips/tischtennis-belag-haertegrad/", "Soulspin: rubber hardness explained", "retailer");
const ooak = src("https://oneofakindtrading.com.au/sponge_hardness_table1.htm", "OOAK Table Tennis: measured sponge hardness table", "retailer");
const ttKingdom = src("https://world-tt.com/blog/news/archives/130022", "Table Tennis Kingdom (卓球王国): interview on sponge hardness", "press");

export const hardnessGuide: Guide = {
  slug: "sponge-hardness-scales",
  title: "Sponge Hardness Scales: Why 40° Isn't Always 40°",
  description:
    "Table tennis sponge hardness explained: the European (ESN), Japanese and Chinese scales, why their numbers don't convert exactly, and how our hardness bands work.",
  intro:
    "Sponge hardness is printed in degrees, but there is no international standard for measuring it. Butterfly, the German factory ESN and Chinese makers like DHS each print numbers from their own measuring practice, so the same number means a different sponge depending on who printed it.",
  sections: [
    {
      heading: "Three scales, no shared standard",
      blocks: [
        "Butterfly says plainly that its sponge hardness \"is measured by Butterfly's own standard\" and doesn't name the instrument. No other maker we checked publishes its measuring method either, and the German retailer Soulspin notes that \"there is currently no standardized international solution\".",
        {
          list: [
            "**European (ESN) scale:** the numbers printed for sponges made by the German factory ESN and similar European makers, used by brands such as Tibhar, andro, Donic, Xiom and Joola. Typical offensive rubbers sit around 45–50°: Tibhar's Evolution MX-P is 47.5° and andro's Rasanter R47 is 47°.",
            "**Japanese scale:** Butterfly's own numbers and Nittaku's Japanese figures. They run about ten points lower than ESN for a similar sponge: Butterfly's Tenergy 05 is 36 and Dignics 05 is 40.",
            "**Chinese scale:** the degrees DHS and other Chinese makers print, usually on hard sponges under tacky topsheets. DHS Hurricane 3 is sold in several hardness options in the high 30s to low 40s.",
          ],
        },
      ],
    },
    {
      heading: "The scale follows the factory, not the brand",
      blocks: [
        "One brand can print numbers on different scales, because many brands buy sponges from several factories:",
        {
          list: [
            "Nittaku's Japanese site lists Fastarc G-1, made in Germany, as **37.5** with a German-standard figure of **47.5**, while Nittaku's official German dealer lists the same rubber simply as 47.5°.",
            "Victas prints German-standard figures with a ±3° tolerance, for example 47.5 ± 3 for V>15 Extra.",
            "Yasaka Japan gives Rakza 7, made in Germany, as a 45–50° range.",
            "DHS's German-made Gold Arc rubbers are sold with ESN-style figures (47.5 and 50), unlike its Chinese Hurricane line.",
          ],
        },
        "That's why every rubber page here shows the number exactly as its maker prints it, together with the scale, and why a rubber whose maker doesn't make the scale clear is marked \"scale not stated\" and left out of the hardness bands.",
      ],
    },
    {
      heading: "How the scales roughly line up",
      blocks: [
        "The only conversion we found published by a manufacturer is Nittaku's dual labelling, which puts its Japanese figure ten points below the German one (37.5 and 47.5). Retailers' estimates for Chinese sponges are less consistent: TableTennis11 puts DHS 36, 39 and 40 at roughly 45, 51 and 53 on the ESN scale, so the gap grows as sponges get harder. Other retailers give figures two or three degrees apart from that.",
        "So treat any conversion as approximate. A 40° Chinese sponge is far harder than a 40° European one, but no table can tell you its exact European equivalent.",
      ],
    },
    {
      heading: "Our hardness bands",
      blocks: [
        "To let you filter across brands without pretending the numbers convert exactly, we group sponges into five broad bands, defined separately for each scale:",
        {
          list: [
            "**Soft:** ESN under 42 · Japanese under 32 · Chinese under 35",
            "**Medium:** ESN 42–45.5 · Japanese 32–35.5 · Chinese 35–36.5",
            "**Medium-hard:** ESN 46–48.5 · Japanese 36–38.5 · Chinese 37–38.5",
            "**Hard:** ESN 49–52.5 · Japanese 39–42.5 · Chinese 39–40.5",
            "**Very hard:** ESN 53 and up · Japanese 43 and up · Chinese 41 and up",
          ],
        },
        "These bands are our own synthesis of the published figures above, not an industry standard. Treat a sponge near a boundary as possibly one band either way. A rubber sold in a range of hardnesses (such as 38–40) is listed in every band it touches, so filtering never hides it. Browse by band in the [rubber explorer](/equipment/rubbers?hardness=medium-hard).",
      ],
    },
    {
      heading: "What the number doesn't tell you",
      blocks: [
        {
          list: [
            "**It's the sponge only.** Makers quote sponge hardness, but the topsheet changes how hard a rubber feels. An ESN representative told the Japanese magazine Table Tennis Kingdom that sponge hardness alone can't tell you how hard the whole rubber is. Thick, tacky Chinese topsheets add to the felt hardness.",
            "**Batches vary.** Victas publishes a ±3° tolerance and Yasaka publishes 5° ranges. A retailer that measured rubbers with a foam durometer found readings for one product varying by about five points between samples, and warns that thin rubber sheets only give relative values.",
            "**Thickness and blade matter too.** The same sponge feels different at 1.8 mm and at max thickness, and on a stiff carbon blade versus a soft all-wood one. See [sponge thickness](/equipment/guides/sponge-thickness).",
          ],
        },
      ],
    },
    {
      heading: "Reading a spec sheet",
      blocks: [
        "Compare hardness numbers only within one brand, or better, within one scale. When comparing across brands, use the band, then read reviews and try the rubber if you can. Our [compare page](/equipment/compare) shows each rubber's number with its own scale for exactly this reason.",
      ],
    },
  ],
  sources: [butterflySpec, tenergy05, dignics05, nittakuG1, nittakuEuG1, victasV15, yasakaRakza7, tibharMxp, androR47, tt11Dhs, tt11GoldArc, soulspin, ooak, ttKingdom],
  updated: "2026-10-03",
};

export const hardnessTerms: GlossaryTerm[] = [
  {
    id: "sponge-hardness",
    term: "Sponge hardness",
    aliases: ["degrees", "sponge degree"],
    definition: "How firm a rubber's sponge is, printed in degrees. Each maker measures on its own scale, so numbers only compare within one scale.",
    guide: "sponge-hardness-scales",
  },
  {
    id: "esn-scale",
    term: "ESN scale",
    aliases: ["European scale", "German scale"],
    definition: "The hardness numbers printed for sponges from the German factory ESN and similar European makers. Higher than Japanese or Chinese numbers for a similar sponge.",
    guide: "sponge-hardness-scales",
  },
  {
    id: "japanese-hardness-scale",
    term: "Japanese hardness scale",
    aliases: ["Butterfly scale"],
    definition: "Butterfly's own hardness standard and Nittaku's Japanese figures, roughly ten points below the ESN scale (Nittaku labels 37.5 Japanese as 47.5 German).",
    guide: "sponge-hardness-scales",
  },
  {
    id: "chinese-hardness-scale",
    term: "Chinese hardness scale",
    definition: "The degrees printed by DHS and other Chinese makers. A Chinese 40° sponge is much harder than a 40° European one.",
    guide: "sponge-hardness-scales",
  },
];
