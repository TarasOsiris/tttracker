// Rubber guides: rubber types, pips, sponge thickness, speed glue and the ITTF rules, and a first-setup guide.
// Every claim is taken from the sources listed with each guide; feel is attributed to whoever describes it.
import type { GlossaryTerm, Guide, Source } from "../models";

const accessed = "2026-10-03";
const updated = "2026-10-03";
const src = (url: string, label: string, kind: Source["kind"]): Source => ({ url, label, kind, accessed });

// ITTF
const statutesUrl = "https://documents.ittf.sport/sites/default/files/public/2026-02/2026_Statutes_v1_consolidated_clean.pdf";
const statutes = src(statutesUrl, "ITTF Statutes 2026: Laws 2.4 (the racket), Regulations 3.2.1.3, 3.2.4 and 3.4.2.2", "ittf");
const t4Url = "https://pimage.sport-thieme.de/pdf/Produktinfo_Tischtennisschlaeger_Belaege_ITTF-Vorgaben_UK.pdf";
const t4 = src(t4Url, "ITTF Technical Leaflet T4: Racket Coverings (effective 1 January 2018; copy hosted by Sport-Thieme)", "ittf");
const t4OldUrl = "https://sr.bttv.de/fileadmin/bttv/media/SR/pdf/T4_Racket_Coverings_2007+.pdf";
const t4Old = src(t4OldUrl, "ITTF Technical Leaflet T4: Racket Coverings (last updated 19 December 2008; copy hosted by BTTV)", "ittf");
const larcUrl =
  "https://www.httv.de/media/000/Schiedsrichter/Material_SR-Einsatz/Zulassungslisten/LARC/ITTF/2026/Equipment_RacketCovering_1January2026_1118.pdf";
const larc = src(larcUrl, "ITTF LARC: List of Authorized Racket Coverings, 1 January 2026 (copy hosted by HTTV)", "ittf");

// Manufacturers
const bfSpecUrl = "https://www.butterfly-global.com/en/products/rubber/spec.html";
const bfSpec = src(bfSpecUrl, "Butterfly: rubber specifications (top sheet, sponge thickness and hardness)", "manufacturer");
const bfPerfUrl = "https://www.butterfly-global.com/en/products/rubber/performance.html";
const bfPerf = src(bfPerfUrl, "Butterfly: rubber performance index (speed, spin, arc)", "manufacturer");
const bfTenergyUrl = "https://www.butterfly-global.com/en/product/tenergy/";
const bfTenergy = src(bfTenergyUrl, "Butterfly: Tenergy special site (Spring Sponge and High Tension)", "manufacturer");
const bfT05Url = "https://www.butterfly-global.com/en/products/detail/05800.html";
const bfT05 = src(bfT05Url, "Butterfly: Tenergy 05 specifications", "manufacturer");
const bf09cUrl = "https://shop.butterflyonline.com/dignics-09C-dig09Cp";
const bf09c = src(bf09cUrl, "Butterfly North America: Dignics 09C", "manufacturer");
const bfGuideUrl = "https://butterflyonline.com/table-tennis-rubber-guide/";
const bfGuide = src(bfGuideUrl, "Butterfly North America: table tennis rubber guide", "manufacturer");
const bfBladesUrl = "https://butterflyonline.com/butterfly-blades-part-1-designing-blades-with-special-materials/";
const bfBlades = src(bfBladesUrl, "Butterfly North America: Butterfly Blades part 1, designing blades with special materials", "manufacturer");
const androUrl = "https://www.andro.de/en/rubbers";
const andro = src(androUrl, "andro: rubbers (Rasanter, Chintac, NUZN)", "manufacturer");
const donicJ3Url = "https://www.donic.com/en/DONIC-BLUEGRIP-J3/000233225";
const donicJ3 = src(donicJ3Url, "DONIC: Bluegrip J3", "manufacturer");
const esnHistoryUrl = "https://www.esn-tt.de/en/company/history";
const esnHistory = src(esnHistoryUrl, "ESN Deutsche Tischtennis Technologie: company history", "manufacturer");
const esnHomeUrl = "https://www.esn-tt.de/en";
const esnHome = src(esnHomeUrl, "ESN Deutsche Tischtennis Technologie: company profile", "manufacturer");

// Retailers' educational pages
const tibharK3Url = "https://www.megaspin.net/store/default.asp?pid=t-hybrid-k3";
const tibharK3 = src(tibharK3Url, "Megaspin: Tibhar Hybrid K3 (manufacturer description)", "retailer");
const tt11H3Url = "https://tabletennis11.com/en/blog/dhs-hurricane3-neo-3-50-provincial-review";
const tt11H3 = src(tt11H3Url, "TableTennis11: DHS Hurricane 3, Neo, 3-50 and Provincial review", "retailer");
const tt11BoostUrl = "https://tabletennis11.com/en/blog/to-boost-or-not-to-boost";
const tt11Boost = src(tt11BoostUrl, "TableTennis11: To boost or not to boost", "retailer");
const tthubH3Url =
  "https://www.tabletennishub.net/blogs/news/selecting-the-best-dhs-hurricane-3-table-tennis-rubber-blue-vs-orange-sponge-national-provincial";
const tthubH3 = src(tthubH3Url, "Table Tennis Hub: DHS Hurricane 3 National and Provincial versions", "retailer");
const megaspinPipsUrl = "https://www.megaspin.net/articles/view.asp?id=571";
const megaspinPips = src(megaspinPipsUrl, "Megaspin: How to choose between short, medium, long and anti rubbers", "retailer");
const megaspinBanUrl = "https://www.megaspin.net/articles/490/ittf-says-boosters-and-tuners-are-illegal";
const megaspinBan = src(megaspinBanUrl, "Megaspin: ITTF says boosters and tuners are illegal (August 2008)", "retailer");
const contraUrl = "https://www.contra.de/en/rubbers/long-pips/";
const contra = src(contraUrl, "Contra: long pips rubbers", "retailer");
const ppColoursUrl = "https://blog.paddlepalace.com/2021/10/new-rubber-color-rules-in-2021/";
const ppColours = src(ppColoursUrl, "Paddle Palace: new rubber color rules in 2021", "retailer");
const ppBladeUrl = "https://www.paddlepalace.com/pages/choosing-a-blade";
const ppBlade = src(ppBladeUrl, "Paddle Palace: choosing a blade", "retailer");
const ppRubberUrl = "https://www.paddlepalace.com/pages/choosing-rubber";
const ppRubber = src(ppRubberUrl, "Paddle Palace: choosing rubber", "retailer");

// Press, coaches and references
const ncttaUrl = "http://www.nctta.org/2008-09/ITTFGlueBan.htm";
const nctta = src(ncttaUrl, "NCTTA: ITTF glue ban details (2008)", "press");
const hodgesUrl = "http://www.tabletenniscoaching.com/node/540";
const hodges = src(hodgesUrl, "Larry Hodges, TableTennisCoaching.com: suggested equipment for beginning and intermediate players (2011)", "reference");
const ttcrunchUrl = "https://ttcrunch.com/articles/what-are-esn-rubbers/";
const ttcrunch = src(ttcrunchUrl, "TT Crunch: What are ESN rubbers?", "reference");
const wikiRubberUrl = "https://en.wikipedia.org/wiki/Table_tennis_rubber";
const wikiRubber = src(wikiRubberUrl, "Wikipedia: Table tennis rubber", "reference");
const wikiGlueUrl = "https://en.wikipedia.org/wiki/Speed_glue";
const wikiGlue = src(wikiGlueUrl, "Wikipedia: Speed glue", "reference");
const wikiGlossaryUrl = "https://en.wikipedia.org/wiki/Glossary_of_table_tennis";
const wikiGlossary = src(wikiGlossaryUrl, "Wikipedia: Glossary of table tennis", "reference");

const rubberTypes: Guide = {
  slug: "rubber-types",
  title: "Table Tennis Rubber Types: Tensor, Chinese Tacky and Hybrid",
  description:
    "How inverted table tennis rubbers are built and how tensor, Chinese tacky and hybrid rubbers differ, in the makers' own words and under the ITTF rules.",
  intro:
    "Almost every rubber on a modern racket is an inverted rubber: a pimpled topsheet glued, pimples inward, onto a layer of sponge. Makers and retailers commonly sort that family into three broad groups: tensor (European-style, springy), Chinese-style tacky, and hybrids that mix the two. This guide explains how each is built and how makers describe the way it plays.",
  sections: [
    {
      heading: "Topsheet plus sponge",
      blocks: [
        `The ITTF Laws define a **sandwich rubber** as a single layer of cellular rubber (sponge) covered by a single outer layer of pimpled rubber no more than 2.0 mm thick ([ITTF Statutes 2026, Law 2.4.3.2](${statutesUrl})). ITTF Technical Leaflet T4 calls that outer layer the **top sheet**, and does not allow more than one sponge layer, even if both layers are the same compound ([ITTF T4](${t4Url})).`,
        `Butterfly sums up the split: the top sheet is the surface the ball hits, so it has a big influence on the game, while the sponge's thickness and hardness change how the rubber performs ([Butterfly](${bfSpecUrl})). Those two sponge properties have their own guides: [Sponge Thickness](/equipment/guides/sponge-thickness) and [Sponge Hardness Scales](/equipment/guides/sponge-hardness-scales).`,
      ],
    },
    {
      heading: "Inverted (pips-in) rubber",
      blocks: [
        `On an inverted rubber the topsheet's pimples face inward, into the sponge, so the ball meets a smooth surface. Wikipedia calls inverted the most popular type of rubber ([Wikipedia](${wikiRubberUrl})). Butterfly says pimples-in rubber is the best type for putting spin on the ball because it has a broad contact surface with the ball ([Butterfly](${bfGuideUrl})).`,
        `On the ITTF's list of authorised coverings these rubbers are type **In** ([ITTF LARC](${larcUrl})). Pips-out rubbers, where the pimples face the ball, are a separate family covered in [Short, Medium and Long Pips and Anti-Spin Explained](/equipment/guides/pips-explained).`,
      ],
    },
    {
      heading: "Tensor and other high-tension rubbers",
      blocks: [
        `Tensor rubbers have tension built in at the factory instead of added by the player. The German maker ESN makes rubbers for other table tennis brands and works only business-to-business ([ESN](${esnHomeUrl})); its rubbers are sold under the names of several other brands ([TT Crunch](${ttcrunchUrl})). ESN dates its **TENSOR** technology to 1998 and calls the 2008 ban on speed glues a revolution for the sport ([ESN history](${esnHistoryUrl})). After the ban, makers developed rubbers with the speed-glue effect built in for the life of the rubber ([Wikipedia](${wikiGlueUrl})).`,
        `Butterfly uses its own names. It says its **High Tension** technology adds tension to the rubber molecule itself, and its **Spring Sponge** works "like a coil spring", absorbing the ball's incoming energy and giving it back as extra power ([Butterfly](${bfTenergyUrl})). For example, Butterfly lists Tenergy 05 as a "High Tension pimples-in" rubber using both technologies ([Butterfly](${bfT05Url})).`,
        `andro explains how these rubbers make spin: on non-tacky rubbers the ball sinks into a highly elastic sponge, and TENSOR technology adds to that effect. andro also warns that the strong rebound can make passive play hard to control ([andro](${androUrl})). Browse [tensor rubbers](/equipment/rubbers?type=tensor).`,
      ],
    },
    {
      heading: "Chinese tacky rubbers",
      blocks: [
        `Chinese-style rubbers pair a sticky (tacky) topsheet with a firm sponge. DHS's Hurricane 3 is the best-known example. TableTennis11 describes its topsheet as "super sticky" and its sponge as hard. It also notes that the rubber is fairly slow on its own, so the player has to supply the speed with their swing ([TableTennis11](${tt11H3Url})).`,
        `andro explains that tacky rubbers make spin through direct contact between topsheet and ball, gripping it for a moment. According to andro, they have traditionally given high spin at low speed but fallen short on sponge dynamics, and they have mainly been favoured by Asian players ([andro](${androUrl})). Paddle Palace says tacky rubbers slow the ball slightly and help neutralise incoming spin, which many players find useful in serve receive and short play ([Paddle Palace](${ppRubberUrl})).`,
        `DHS also sells Hurricane 3 in **Provincial** and **National** versions, which retailers describe as more specialised, higher-priced grades within the range, each with its own sponge options ([Table Tennis Hub](${tthubH3Url})).`,
        `Chinese rubbers are the ones most associated with boosting. TableTennis11 notes that their solid sponges suit oil-based boosters and that some tacky Chinese rubbers come pre-boosted from the factory ([TableTennis11](${tt11BoostUrl})). Boosting a rubber yourself breaks ITTF rules. See [Speed Glue, Boosting and the ITTF Approved List](/equipment/guides/speed-glue-and-boosting). Browse [tacky rubbers](/equipment/rubbers?type=tacky) or [all rubbers with a tacky topsheet](/equipment/rubbers?tack=tacky).`,
      ],
    },
    {
      heading: "Hybrids",
      blocks: [
        `"Hybrid" is a sales category, not an ITTF one. The authorised list sorts coverings only into In, Out, Long and Anti ([ITTF T4](${t4Url})). Makers use "hybrid" for rubbers that pair a tacky or semi-tacky topsheet with a livelier sponge. Some of their descriptions:`,
        {
          list: [
            `Tibhar describes Hybrid K3 as a very sticky topsheet on a highly boosted hard sponge, with a "highly dynamic and powerful catapult effect" (quoted by [Megaspin](${tibharK3Url})).`,
            `Butterfly says Dignics 09C gets both friction and a high level of bounce from the combination of its top sheet and a rather hard Spring Sponge X ([Butterfly](${bf09cUrl})).`,
            `andro calls its NUZN series "the best of both worlds": a slightly sticky top rubber combined with a balanced tensor sponge ([andro](${androUrl})).`,
          ],
        },
        `Browse [hybrid rubbers](/equipment/rubbers?type=hybrid).`,
      ],
    },
    {
      heading: "How makers link each type to a style",
      blocks: [
        {
          list: [
            `**Tensor:** spin comes from the ball sinking into an elastic sponge, which also gives strong rebound. andro cautions that this can make passive shots harder to control ([andro](${androUrl})).`,
            `**Chinese tacky:** grip from the topsheet gives high spin even at low swing speed, which suits the short game, but the player supplies more of the speed ([andro](${androUrl}), [TableTennis11](${tt11H3Url})).`,
            `**Hybrid:** sold as a middle ground. andro pitches its tacky Chintac as combining controlled spin in the short game with more spin and precision in fast topspin rallies ([andro](${androUrl})).`,
          ],
        },
        `These are how makers and retailers describe feel, not lab measurements. How a rubber actually plays also depends on the blade, the sponge's thickness and hardness, and the player. Topsheet colour isn't a factor: Butterfly says there is no difference in performance between its colours ([Butterfly](${bfSpecUrl})).`,
      ],
    },
  ],
  sources: [statutes, t4, larc, bfSpec, bfGuide, bfTenergy, bfT05, bf09c, andro, esnHome, esnHistory, ttcrunch, tibharK3, tt11H3, tt11Boost, tthubH3, ppRubber, wikiRubber, wikiGlue],
  updated,
};

const pipsExplained: Guide = {
  slug: "pips-explained",
  title: "Short, Medium and Long Pips and Anti-Spin Explained",
  description:
    "How pips-out and anti-spin rubbers work: ITTF pimple geometry and friction rules, the 2008 frictionless ban, OX vs sponge, and how each type plays.",
  intro:
    "Pips-out rubbers turn the topsheet around so the ball hits the pimples themselves. Depending on how tall, thin and grippy those pimples are, the result can be anything from a fast hitting surface to one that sends the opponent's spin back at them. The ITTF regulates pimple shape and friction closely, so pips are the most rule-bound rubbers in the sport.",
  sections: [
    {
      heading: "How pips-out rubbers are built",
      blocks: [
        `Law 2.4.3 allows two kinds of covering on a hitting side. The first is **ordinary pimpled rubber**: pimples out, no sponge, and a total thickness including adhesive of less than 2.05 mm. The second is **sandwich rubber**, with the pimples facing either in or out, at less than 4.05 mm. Ordinary pimpled rubber is a single layer of non-cellular rubber with 10 to 30 pimples per cm² ([ITTF Statutes 2026](${statutesUrl})).`,
        `ITTF Technical Leaflet T4 adds shape rules. Pimples must all be equal and circular, stand perpendicular to the base, and never be wider higher up than lower down, which allows cylinders and cones but not inverted cones. They must be evenly spaced along three sets of lines at 60° and must not be hollow. Unlike pimples-in rubbers, pimples-out rubbers get no allowance for irregular pimples ([ITTF T4](${t4Url})).`,
      ],
    },
    {
      heading: "The ITTF geometry limits",
      blocks: [
        `The edition of T4 that took effect on 1 January 2018 sets these measurements for authorising pimples-out rubbers ([ITTF T4](${t4Url})):`,
        {
          list: [
            "Pimple diameter at the top: 1.0 to 2.2 mm.",
            "Distance between pimple tops: 1.0 to 2.0 mm.",
            "Pimple height: at least 1.0 mm.",
            "Aspect ratio (pimple height divided by top diameter): no more than 1.10.",
            "A rubber is listed as **Long** when its aspect ratio is above 0.89, and as **Out** otherwise.",
            "Topsheet thickness: at most 2.00 mm.",
          ],
        },
        `So the ITTF only recognises two pips-out classes, Out and Long, and that is how they appear on the authorised list ([ITTF LARC](${larcUrl})). There is no official "medium pips" class. The term is used by makers and retailers.`,
      ],
    },
    {
      heading: "Friction and the ban on frictionless long pips",
      blocks: [
        `T4 requires the coefficient of kinetic friction between a pimples-out rubber and a ball to be at least 0.50, measured in the lab with a normal force of 50 mN. It also says rubber surfaces must be uniform and uncoated ([ITTF T4](${t4Url})).`,
        `Those rules ended the era of frictionless long pips. By December 2008, T4 already set a minimum friction level for pimples-out rubbers and required an uncoated surface ([ITTF T4, 2008](${t4OldUrl})). The retailer Contra says smooth pips have been banned by the ITTF since 2008, and that today's long pips, with rough pip heads, can still make their own spin with the right technique ([Contra](${contraUrl})).`,
        `Treating pips to cut their friction is also illegal. A covering must be used as the ITTF authorised it, without any physical, chemical or other treatment that changes its friction or playing properties ([ITTF Statutes 2026, Regulation 3.4.2.2](${statutesUrl})).`,
      ],
    },
    {
      heading: "Short pips",
      blocks: [
        `Butterfly says short pips are not easily affected by the opponent's spin because of their narrow contact surface with the ball, and that they "knock" the ball away ([Butterfly](${bfGuideUrl})). Megaspin calls them the easiest pips to switch to from inverted rubber. It says they make a good amount of spin compared with other pips and neutralise spin with a hitting or punching action ([Megaspin](${megaspinPipsUrl})). Paddle Palace describes them as a choice for players who do not play with much spin ([Paddle Palace](${ppRubberUrl})).`,
        `Browse [short pips](/equipment/rubbers?type=short-pips).`,
      ],
    },
    {
      heading: "Medium pips",
      blocks: [
        `Medium pips sit between short and long. According to Megaspin, they neutralise spin and give a more "dead", knuckleball effect that sends many returns into the net. Megaspin adds that the player has to hit through the sponge and take the ball at its peak, and that both attackers and blockers use them ([Megaspin](${megaspinPipsUrl})). Since the ITTF list only has Out and Long, a rubber sold as medium pips is classed as one or the other depending on its aspect ratio ([ITTF T4](${t4Url})).`,
        `Browse [medium pips](/equipment/rubbers?type=medium-pips).`,
      ],
    },
    {
      heading: "Long pips",
      blocks: [
        `Megaspin says long pips can reverse the spin they receive, neutralise it into a knuckleball, or slow the ball and break the opponent's tempo ([Megaspin](${megaspinPipsUrl})). The reversal happens because the surface barely reacts to spin: the ball keeps rotating the same way, so a topspin can come back as backspin and the reverse ([Wikipedia glossary](${wikiGlossaryUrl})).`,
        `Butterfly says long pips with sponge produce unexpected spin because the pimples move in different ways on contact ([Butterfly](${bfGuideUrl})). Browse [long pips](/equipment/rubbers?type=long-pips).`,
      ],
    },
    {
      heading: "OX or sponge?",
      blocks: [
        `**OX** means a rubber with no sponge at all ([Wikipedia](${wikiRubberUrl})). Butterfly describes long pips without sponge as light and easy to handle, with little elasticity, so they can shut down powerful topspin ([Butterfly](${bfGuideUrl})).`,
        {
          list: [
            `Megaspin suggests OX or 0.6 mm sponge for players who mostly chop or block, and about 1.0 mm for attackers ([Megaspin](${megaspinPipsUrl})).`,
            `Contra says OX and thin standard sponges are more disruptive than a dampening sponge because the ball bounces lower ([Contra](${contraUrl})).`,
            `Paddle Palace puts defensive players in a range from OX to 1.6 mm ([Paddle Palace](${ppRubberUrl})).`,
          ],
        },
        `See [Sponge Thickness](/equipment/guides/sponge-thickness) for how thickness works on inverted rubbers.`,
      ],
    },
    {
      heading: "Anti-spin",
      blocks: [
        `Butterfly describes anti-spin as a kind of inverted rubber with little friction, so it is not easily affected by the opponent's spin ([Butterfly](${bfGuideUrl})). In ITTF terms it is pimples-in, and T4 says the "Anti" label is applied when the supplier asks for it. The authorised list carries Anti as its own type ([ITTF T4](${t4Url}), [ITTF LARC](${larcUrl})).`,
        `Megaspin says anti-spin kills spin as soon as it touches the ball and gives the purest knuckleball effect. It adds that blockers use it most, because chopping with anti is less effective than with long pips ([Megaspin](${megaspinPipsUrl})). Wikipedia's glossary notes that it is rare in top-level play but popular with amateur and veteran players ([Wikipedia glossary](${wikiGlossaryUrl})). Browse [anti-spin rubbers](/equipment/rubbers?type=anti).`,
      ],
    },
  ],
  sources: [statutes, t4, t4Old, larc, bfGuide, megaspinPips, contra, ppRubber, wikiRubber, wikiGlossary],
  updated,
};

const spongeThickness: Guide = {
  slug: "sponge-thickness",
  title: "Sponge Thickness: 1.5 mm to Max",
  description:
    "What the thickness on a table tennis rubber measures, why MAX differs from brand to brand, the ITTF 4 mm limit, and the trade-offs makers describe.",
  intro:
    "Most inverted rubbers come in several sponge thicknesses, from about 1.5 mm up to a thickest option often labelled MAX. The number on the packet refers to the sponge, not the whole rubber. How thick the thickest option can be depends on the ITTF's limit on total covering thickness.",
  sections: [
    {
      heading: "What the number measures",
      blocks: [
        `A rubber is a top sheet plus a sponge, and the thickness choice is the sponge's ([Butterfly](${bfSpecUrl})). Labels are nominal. Butterfly publishes the actual range behind each of its sizes:`,
        {
          list: ["2.1: 1.9 to 2.2 mm", "1.9: 1.7 to 1.9 mm", "1.7: 1.5 to 1.7 mm", "1.5: 1.3 to 1.5 mm", "1.3: 1.1 to 1.3 mm", "1.1: 0.8 to 1.1 mm", "0.5: 0.4 to 0.7 mm"],
        },
        `Butterfly's lineup goes up to a nominal 2.7. Each rubber is sold in only some of these sizes: Tenergy 05, for example, comes in 2.1, 1.9 and 1.7 ([Butterfly](${bfSpecUrl}), [Tenergy 05](${bfT05Url})).`,
      ],
    },
    {
      heading: "The ITTF limit",
      blocks: [
        `The 2026 Laws require a sandwich rubber (topsheet plus sponge), including adhesive, to be less than 4.05 mm thick. Pimpled rubber without sponge must be less than 2.05 mm, and the topsheet itself no more than 2.0 mm ([ITTF Statutes 2026, Law 2.4.3](${statutesUrl})).`,
        `ITTF Technical Leaflet T4 refers to these as the 4.0 mm and 2.0 mm limits and treats them as absolute: no part of the playing surface may exceed them. The figure includes any reinforcement in the rubber and the adhesive. T4 also warns that a thick glue layer can push a covering over 4.0 mm ([ITTF T4](${t4Url})). At events with racket control, rackets are tested for covering thickness among other things ([ITTF Statutes 2026, Regulation 3.2.4.2.1](${statutesUrl})).`,
      ],
    },
    {
      heading: "What MAX means",
      blocks: [
        `MAX is not a standard measurement. It means the thickest sponge that still keeps that rubber within the 4.0 mm limit ([Wikipedia](${wikiRubberUrl})), so it depends on how thick that rubber's topsheet is. Brands label the top size differently:`,
        {
          list: [
            `**Butterfly** doesn't use MAX. It prints a number with a published range, such as 2.1 (1.9 to 2.2 mm) ([Butterfly](${bfSpecUrl})).`,
            `**andro** calls a 2.3 mm sponge "ultramax" and pairs it with a topsheet only 1.7 mm thick. andro says it is the thickest modern TENSOR sponge made in Germany so far ([andro](${androUrl})).`,
            `**DONIC** sells Bluegrip J3 in "2.0 mm / max" without giving a figure for max ([DONIC](${donicJ3Url})).`,
          ],
        },
        `When you compare two "MAX" rubbers, check what each maker says about its sponge rather than assuming they are the same.`,
      ],
    },
    {
      heading: "Thicker vs thinner, in makers' words",
      blocks: [
        {
          list: [
            `Butterfly: thinner sponges are lighter, bounce lower and suit defensive play; thicker sponges are heavier, bounce higher and suit offensive play ([Butterfly](${bfSpecUrl})).`,
            `Butterfly North America: thinner sponge has a harder feel with less spin and speed; thicker is faster with more spin. Its advice if you are unsure: 1.9 mm "is always a safe bet" ([Butterfly](${bfGuideUrl})).`,
            `Paddle Palace: thicker sponge gives more speed and somewhat more spin, while thinner gives more control. Thicker sponge also adds weight and feels more cushioned; thinner feels lighter and "woodier" ([Paddle Palace](${ppRubberUrl})).`,
          ],
        },
      ],
    },
    {
      heading: "Typical ranges by style",
      blocks: [
        `These are retailers' and coaches' rules of thumb, not rules:`,
        {
          list: [
            `Paddle Palace: 1.8 to 2.5 mm for offensive players, 1.5 to 2.0 mm for all-round players, and OX to 1.6 mm for defensive players ([Paddle Palace](${ppRubberUrl})).`,
            `Paddle Palace also says developing players, or anyone who needs more control, should pick the thinner end of the range for their style ([Paddle Palace](${ppRubberUrl})).`,
            `Coach Larry Hodges suggested beginners start in the 1.5 to 1.9 mm range ([Hodges](${hodgesUrl})).`,
          ],
        },
      ],
    },
    {
      heading: "Pips and anti",
      blocks: [
        `Pips-out rubbers usually come with thinner sponges, or none at all (OX). Without sponge, a pips-out covering must be less than 2.05 mm thick in total ([ITTF Statutes 2026](${statutesUrl})). For long pips, Megaspin suggests OX or 0.6 mm for choppers and blockers and about 1.0 mm for attackers ([Megaspin](${megaspinPipsUrl})). More in [Short, Medium and Long Pips and Anti-Spin Explained](/equipment/guides/pips-explained).`,
      ],
    },
    {
      heading: "Thickness and weight",
      blocks: [
        `More sponge means more weight. Butterfly and Paddle Palace both list weight as a trade-off of thicker sponge ([Butterfly](${bfSpecUrl}), [Paddle Palace](${ppRubberUrl})). Butterfly measures the average weights it publishes on the thickest sponge in each rubber's lineup, so a thinner version will be lighter than the listed figure ([Butterfly](${bfPerfUrl})). To compare rubbers side by side, use the [compare page](/equipment/compare).`,
      ],
    },
  ],
  sources: [statutes, t4, bfSpec, bfPerf, bfGuide, bfT05, andro, donicJ3, ppRubber, hodges, megaspinPips, wikiRubber],
  updated,
};

const speedGlue: Guide = {
  slug: "speed-glue-and-boosting",
  title: "Speed Glue, Boosting and the ITTF Approved List",
  description:
    "Speed glue and its 2008 ban, factory tension vs boosting, what ITTF rules say about treating rubbers, the LARC list, ITTF codes and colour rules.",
  intro:
    "For about three decades, top players re-glued their rubbers before matches to make them faster and spinnier. The ITTF banned that in 2008, and makers now build the effect in at the factory. This guide covers that history, why boosting a rubber yourself breaks the rules, and how to check that a rubber is legal for competition.",
  sections: [
    {
      heading: "What speed glue did",
      blocks: [
        `Speed glue was a solvent-based glue applied shortly before play. Its solvent vapours made the sponge's cells expand, which stretched the topsheet and gave a trampoline-like rebound. The effect lasted only hours, so players re-glued before matches. Speed glue was discovered by accident in the 1970s, when a player fixed his racket with bicycle puncture glue, and Yugoslavia's Dragutin Šurbek is credited with popularising it between 1979 and 1983 ([Wikipedia](${wikiGlueUrl})).`,
      ],
    },
    {
      heading: "The 2008 ban",
      blocks: [
        `In 2004 the ITTF decided to ban glues containing volatile organic compounds (VOCs) on health grounds. The ban was set for 1 September 2007 and then moved to 1 September 2008 ([Wikipedia](${wikiGlueUrl})). The rule that took effect that September required coverings to be used as authorised, without any treatment that changes their playing properties. College table tennis body NCTTA said at the time that this effectively banned speed gluing and boosters ([NCTTA](${ncttaUrl})). Megaspin reported that the ITTF had said boosters and "tuners" were illegal too ([Megaspin](${megaspinBanUrl})).`,
        `Today each player is responsible for gluing with adhesives that contain no harmful volatile solvents. At ITTF world title, Olympic and Paralympic events, racket control centres test rackets for flatness, covering thickness, even thickness, continuity of layers, and harmful or volatile substances. A player with four racket-test failures within four years is suspended for 12 months ([ITTF Statutes 2026, Regulation 3.2.4](${statutesUrl})). T4 advises players to air a new rubber, for up to 72 hours, to let leftover solvents escape ([ITTF T4](${t4Url})). Butterfly, for example, tells buyers to mount its rubbers with water-based glue ([Butterfly](${bfT05Url})).`,
      ],
    },
    {
      heading: "Tension built in at the factory",
      blocks: [
        `Instead of tension added by the player, makers now build it into the rubber. ESN dates its TENSOR technology to 1998 and describes the 2008 ban as a revolution for the sport ([ESN history](${esnHistoryUrl})). Butterfly says its High Tension technology adds tension to the rubber molecule itself ([Butterfly](${bfTenergyUrl})). These rubbers carry the effect for their whole life ([Wikipedia](${wikiGlueUrl})). More in [Table Tennis Rubber Types](/equipment/guides/rubber-types).`,
        `Some rubbers are also treated in the factory. TableTennis11 notes that many European-style rubbers come pre-boosted, recognisable by a sweet, limonene-like smell, and so do some tacky Chinese rubbers ([TableTennis11](${tt11BoostUrl})). It describes DHS's Hurricane 3 Neo as having had some kind of chemical or booster treatment at the factory ([TableTennis11](${tt11H3Url})).`,
      ],
    },
    {
      heading: "Boosting is against the rules",
      blocks: [
        `Boosters are oils, usually paraffin or mineral-oil based or limonene based, that soak into the sponge, expand it and tighten the topsheet. TableTennis11 estimated the effect as modest and lasting from about two weeks to two months ([TableTennis11](${tt11BoostUrl})).`,
        `The Laws say: "The racket covering shall be used without any physical, chemical or other treatment" (Law 2.4.7). Regulation 3.4.2.2 adds that coverings must be used as authorised by the ITTF, without treatment that changes "playing properties, friction, outlook, colour, structure, surface, etc." and that "in particular, no additives shall be used" ([ITTF Statutes 2026](${statutesUrl})). T4 says post-factory treatments are not permitted and can push a covering beyond the thickness, friction or pimple-density limits ([ITTF T4](${t4Url})).`,
        `Enforcement is another matter. TableTennis11 noted in 2020 that no approved test could detect a non-VOC booster ([TableTennis11](${tt11BoostUrl})). That makes boosting hard to catch, but it is still against the rules.`,
      ],
    },
    {
      heading: "LARC: the list of authorised rubbers",
      blocks: [
        `Any rubber used in ITTF competition must be currently authorised by the ITTF, which keeps lists of approved equipment on its website ([ITTF Statutes 2026, Regulation 3.2.1.3](${statutesUrl})). The list for rubbers is the **LARC** (List of Authorized Racket Coverings). The 1 January 2026 edition lists each covering's brand, product name, approval code, pimple type (In, Out, Long or Anti), authorised top sheet colours and, for some entries, an expiry date. The list is valid until 31 December of the year it was issued ([ITTF LARC](${larcUrl})).`,
        `Authorisation covers the top sheet and the top sheet plus sponge combination. Red and black versions of the same rubber must have the same geometry and properties ([ITTF T4](${t4Url})). A rubber marketed as "ITTF approved" is one that appears on the LARC. Check the current edition if you play in sanctioned events.`,
      ],
    },
    {
      heading: "The ITTF logo and code on the rubber",
      blocks: [
        `Rubbers must be glued on so that the ITTF logo, the ITTF number (when present), and the supplier and brand names are clearly visible nearest the handle ([ITTF Statutes 2026, Regulation 3.2.1.3](${statutesUrl})). T4 sets the details for new rubbers:`,
        {
          list: [
            "The ITTF logo is moulded into the rubber, at least 10 mm high and the same colour as the rubber.",
            'The ITTF number has 5 or 6 digits: a 2- or 3-digit supplier number, a dash, then a 3-digit brand number (for example "12-345").',
            "The logo and number sit together in a single frame, inside a branding area no more than 25 mm high.",
            "A rubber may have two branding areas at 90° to each other, but only the one nearest the handle counts once it is mounted.",
            "A withdrawn ITTF number cannot be reused for 10 years.",
          ],
        },
        `T4 also requires the packaging to state the country of origin ([ITTF T4](${t4Url})).`,
      ],
    },
    {
      heading: "Colour rules",
      blocks: [
        `Law 2.4.6 says the surfaces must be matt, "black on one side, and of a bright colour clearly distinguishable from black and from the colour of the ball on the other" ([ITTF Statutes 2026](${statutesUrl})). For decades that meant red and black, the rule since 1986. From 1 October 2021, blue, green, pink and violet were added as alternatives to red. One side must still be black ([Paddle Palace](${ppColoursUrl})).`,
        `Not every rubber is authorised in every colour. The LARC lists each one's approved colours (red, black, green, blue, pink, violet) separately ([ITTF LARC](${larcUrl})). T4 also makes the player responsible for colour: a red covering, for example, may look too dark once it is glued over a dark sponge or blade ([ITTF T4](${t4Url})). Colour doesn't change performance; Butterfly says its colours play the same ([Butterfly](${bfSpecUrl})).`,
      ],
    },
  ],
  sources: [statutes, t4, larc, wikiGlue, nctta, megaspinBan, esnHistory, bfTenergy, bfT05, bfSpec, tt11Boost, tt11H3, ppColours],
  updated,
};

const firstSetup: Guide = {
  slug: "choosing-your-first-setup",
  title: "Choosing Your First Custom Table Tennis Setup",
  description:
    "A neutral guide to a first custom table tennis racket: all-wood vs composite, softer and thinner sponge, total weight, and what coaches advise.",
  intro:
    "A custom racket means choosing a blade and two rubbers separately. Coaches and makers give consistent advice for a first one: pick control over speed, and move up once your technique can handle more. This guide sets out that advice so you can apply it to any brand.",
  sections: [
    {
      heading: "Start slower than you think",
      blocks: [
        `Paddle Palace calls choosing too much speed too early the most common mistake. It notes that professionals use fast blades because their technique can control them ([Paddle Palace](${ppBladeUrl})). It also says players often improve most with a rubber that forgives small errors instead of magnifying them ([Paddle Palace](${ppRubberUrl})).`,
        `Coach Larry Hodges recommends a medium-speed blade for beginners and medium to fast blades for more advanced players. He suggests players keep to not-so-fast blades until at least intermediate level ([Hodges](${hodgesUrl})).`,
      ],
    },
    {
      heading: "Blade: all-wood or composite",
      blocks: [
        `Butterfly says that blades with special materials such as carbon traditionally had more bounce, while all-wood blades felt easier to control in rallies ([Butterfly](${bfBladesUrl})). Paddle Palace says composite blades add stability and speed, and that only experimenting shows what suits your game. It suggests all-round players look at blades rated from OFF- to ALL- ([Paddle Palace](${ppBladeUrl})). Those classes are each maker's own and don't compare exactly across brands.`,
        {
          list: [
            `Browse [all-wood blades](/equipment/blades?build=all-wood) and [5-ply blades](/equipment/blades?plies=5).`,
            `To understand composites before buying one, read [Inner vs Outer Carbon](/equipment/guides/inner-vs-outer-carbon) and [Plies and Woods](/equipment/guides/plies-and-woods).`,
            `Handle shape is personal. See [Blade Handles](/equipment/guides/blade-handles).`,
          ],
        },
      ],
    },
    {
      heading: "Rubber: softer sponge for a start",
      blocks: [
        `Butterfly's chart puts soft sponges at the beginner, slow-swing end and hard sponges at the advanced, fast-swing end. Softer sponges absorb more of the ball ([Butterfly](${bfSpecUrl})). Paddle Palace says softer sponges absorb impact and make spin easier, while harder sponges reward strong technique and full swings but demand precision ([Paddle Palace](${ppRubberUrl})).`,
        `Hardness numbers don't mean the same thing at every brand. See [Sponge Hardness Scales](/equipment/guides/sponge-hardness-scales), then browse [soft](/equipment/rubbers?hardness=soft) or [medium](/equipment/rubbers?hardness=medium) rubbers.`,
      ],
    },
    {
      heading: "Rubber: thinner sponge for control",
      blocks: [
        `Paddle Palace says thicker sponge gives more speed and thinner sponge more control, and that developing players should pick the thinner end of the range for their style ([Paddle Palace](${ppRubberUrl})). Hodges suggests starting in the 1.5 to 1.9 mm range ([Hodges](${hodgesUrl})). Butterfly calls 1.9 mm "a safe bet" if you are unsure ([Butterfly](${bfGuideUrl})). See [Sponge Thickness](/equipment/guides/sponge-thickness).`,
      ],
    },
    {
      heading: "Rubber type",
      blocks: [
        `In 2011 Hodges advised against rubbers with built-in speed-glue effects for beginners. He recommended something modern and relatively fast, leaving the bouncier rubbers, mostly made for looping, until later ([Hodges](${hodgesUrl})). Paddle Palace says grippy rubbers suit looping and controlled topspin, while tacky rubbers slow the ball slightly and help in serve receive and short play ([Paddle Palace](${ppRubberUrl})).`,
        `[Table Tennis Rubber Types](/equipment/guides/rubber-types) explains tensor, tacky and hybrid rubbers. Pips and anti-spin play very differently from inverted rubber. See [Short, Medium and Long Pips and Anti-Spin Explained](/equipment/guides/pips-explained).`,
      ],
    },
    {
      heading: "Watch the total weight",
      blocks: [
        `Paddle Palace notes that most blades weigh 70 to 100 g before rubber is added, and that the best blade weight is whatever feels best to you ([Paddle Palace](${ppBladeUrl})). Rubbers add to that, and thicker and harder sponges weigh more ([Butterfly](${bfSpecUrl}), [Paddle Palace](${ppRubberUrl})). Add up the blade and both rubbers when you compare setups, for example on the [compare page](/equipment/compare).`,
      ],
    },
    {
      heading: "Make it legal and plan the next step",
      blocks: [
        `If you will play in sanctioned events, both rubbers must be ITTF authorised, with black on one side and red, blue, green, pink or violet on the other. See [Speed Glue, Boosting and the ITTF Approved List](/equipment/guides/speed-glue-and-boosting).`,
        `Paddle Palace says players who choose blades that match their level tend to improve faster and hit fewer plateaus ([Paddle Palace](${ppBladeUrl})). You can see what top players use on the [pros page](/equipment/pros), but keep in mind Paddle Palace's point that professionals use fast equipment because their technique can control it ([Paddle Palace](${ppBladeUrl})).`,
      ],
    },
  ],
  sources: [ppBlade, ppRubber, hodges, bfBlades, bfSpec, bfGuide],
  updated,
};

export const rubberGuides: Guide[] = [rubberTypes, pipsExplained, spongeThickness, speedGlue, firstSetup];

export const rubberTerms: GlossaryTerm[] = [
  {
    id: "topsheet",
    term: "Topsheet",
    aliases: ["top sheet"],
    definition:
      "The outer layer of pimpled rubber that the ball touches. On a sandwich rubber it sits on the sponge and may be at most 2.0 mm thick under ITTF rules.",
    guide: "rubber-types",
  },
  {
    id: "sponge",
    term: "Sponge",
    aliases: ["cellular rubber"],
    definition:
      "The foam (cellular rubber) layer under the topsheet. The ITTF allows only one sponge layer per rubber, and its thickness and hardness strongly shape how the rubber plays.",
    guide: "rubber-types",
  },
  {
    id: "sandwich-rubber",
    term: "Sandwich rubber",
    definition:
      "The ITTF's term for a single sponge layer covered by a single pimpled topsheet, with the pimples facing in or out. Total thickness, including glue, must stay under the 4 mm limit.",
    guide: "rubber-types",
  },
  {
    id: "inverted-rubber",
    term: "Inverted rubber",
    aliases: ["pips-in", "pimples-in", "smooth rubber"],
    definition:
      "A rubber whose pimples face inward into the sponge, so the ball meets a smooth surface. It is the most common type and the best at making spin. The ITTF lists it as type In.",
    guide: "rubber-types",
  },
  {
    id: "tensor-rubber",
    term: "Tensor rubber",
    aliases: ["high tension rubber", "tensioned rubber"],
    definition:
      "A rubber with tension built in at the factory to give a speed-glue-like rebound. TENSOR is ESN's name for its technology; Butterfly calls its version High Tension.",
    guide: "rubber-types",
  },
  {
    id: "tacky-rubber",
    term: "Tacky rubber",
    aliases: ["sticky rubber", "Chinese rubber"],
    definition:
      "A rubber with a sticky topsheet that grips the ball, usually on a firm sponge, in the style of DHS's Hurricane. Makers describe it as giving high spin at low swing speeds.",
    guide: "rubber-types",
  },
  {
    id: "hybrid-rubber",
    term: "Hybrid rubber",
    definition:
      "A sales category, not an ITTF one, for rubbers that pair a tacky or semi-tacky topsheet with a livelier tensor-style or high-tension sponge.",
    guide: "rubber-types",
  },
  {
    id: "esn-rubber",
    term: "ESN rubber",
    aliases: ["ESN"],
    definition:
      "A rubber made by ESN Deutsche Tischtennis Technologie, a German company founded in 1991 that makes rubbers for other brands and does not sell under its own name.",
    guide: "rubber-types",
  },
  {
    id: "spring-sponge",
    term: "Spring Sponge",
    definition:
      "Butterfly's name for the sponge in Tenergy and related rubbers. Butterfly says it works like a coil spring, absorbing the ball's energy and returning it as power.",
    guide: "rubber-types",
  },
  {
    id: "national-provincial-rubber",
    term: "National and Provincial rubbers",
    aliases: ["Chinese national rubber", "provincial rubber"],
    definition:
      "Higher-grade versions of DHS rubbers such as Hurricane 3, sold alongside the standard retail version with their own sponge options.",
    guide: "rubber-types",
  },
  {
    id: "catapult-effect",
    term: "Catapult effect",
    aliases: ["catapult"],
    definition:
      "Makers' word for how strongly a rubber springs the ball back off the racket on its own. Tensor and boosted sponges are sold on a strong catapult; harder, unboosted rubbers have less.",
    guide: "rubber-types",
  },
  {
    id: "throw-angle",
    term: "Throw angle",
    aliases: ["arc"],
    definition:
      "How high a rubber sends the ball for the same stroke. Butterfly publishes it as an Arc value: the higher the value, the more the ball follows the direction of a topspin swing.",
    guide: "rubber-types",
  },
  {
    id: "pips-out",
    term: "Pips-out rubber",
    aliases: ["pimples-out", "pips"],
    definition:
      "A rubber whose pimples face outward so they touch the ball. The ITTF classes these as Out or Long depending on pimple shape.",
    guide: "pips-explained",
  },
  {
    id: "short-pips",
    term: "Short pips",
    definition:
      "Pips-out rubber with short pimples, listed as Out by the ITTF. Butterfly says they are not easily affected by the opponent's spin, and they are mostly used for hitting and blocking.",
    guide: "pips-explained",
  },
  {
    id: "medium-pips",
    term: "Medium pips",
    definition:
      "A retail term for pips between short and long, sold for a dead, knuckle-ball effect. The ITTF has no medium class; such rubbers are listed as Out or Long.",
    guide: "pips-explained",
  },
  {
    id: "long-pips",
    term: "Long pips",
    definition:
      "Pips-out rubber with tall, thin pimples that bend on contact and can send the opponent's spin back. The ITTF lists a rubber as Long when the pimple height-to-diameter ratio is above 0.89.",
    guide: "pips-explained",
  },
  {
    id: "pimple-aspect-ratio",
    term: "Pimple aspect ratio",
    definition:
      "Pimple height divided by the pimple's top diameter. ITTF Technical Leaflet T4 caps it at 1.10 and uses 0.89 as the line between Out and Long.",
    guide: "pips-explained",
  },
  {
    id: "frictionless-long-pips",
    term: "Frictionless long pips",
    aliases: ["smooth pips"],
    definition:
      "Long pips with almost no grip on the pimple tops. They were outlawed around 2008, when the ITTF set a minimum friction for pimples-out rubbers and banned coated surfaces.",
    guide: "pips-explained",
  },
  {
    id: "spin-reversal",
    term: "Spin reversal",
    definition:
      "The effect of long pips or anti-spin: the surface barely grips the ball, which keeps rotating the same way, so a topspin can come back as backspin and the reverse.",
    guide: "pips-explained",
  },
  {
    id: "spin-sensitivity",
    term: "Spin sensitivity",
    definition:
      "How strongly a rubber reacts to the spin on an incoming ball. Makers describe short pips, long pips and anti-spin as much less affected by incoming spin than grippy inverted rubbers.",
    guide: "pips-explained",
  },
  {
    id: "ox",
    term: "OX",
    aliases: ["no sponge"],
    definition:
      "A rubber sold without sponge, used mostly for pips. Without sponge, a pips-out covering must be under 2.05 mm thick including glue.",
    guide: "pips-explained",
  },
  {
    id: "anti-spin",
    term: "Anti-spin",
    aliases: ["anti", "anti-topspin"],
    definition:
      "A smooth, pimples-in rubber with very little friction, so it is barely affected by the opponent's spin and returns little of its own. The ITTF lists it as Anti at the supplier's request.",
    guide: "pips-explained",
  },
  {
    id: "max-thickness",
    term: "MAX sponge thickness",
    aliases: ["MAX", "max thickness", "ultramax"],
    definition:
      "The thickest sponge a maker offers for a rubber while keeping it within the ITTF's 4.0 mm limit. Its actual thickness varies by brand and by how thick the topsheet is.",
    guide: "sponge-thickness",
  },
  {
    id: "speed-glue",
    term: "Speed glue",
    definition:
      "Solvent-based glue applied before play whose vapours expanded the sponge to add speed and spin for a few hours. Glues containing volatile organic compounds have been banned by the ITTF since 1 September 2008.",
    guide: "speed-glue-and-boosting",
  },
  {
    id: "voc",
    term: "VOC",
    aliases: ["volatile organic compounds", "volatile solvents"],
    definition:
      "Volatile organic compounds, the solvents behind speed glue. Players must glue with adhesives free of harmful volatile solvents, and ITTF racket control tests for them.",
    guide: "speed-glue-and-boosting",
  },
  {
    id: "boosting",
    term: "Boosting",
    aliases: ["booster", "tuning", "tuner"],
    definition:
      "Applying an oil (usually mineral-oil or limonene based) to a sponge to expand it and tension the topsheet. It breaks the ITTF rule that coverings be used without chemical or other treatment.",
    guide: "speed-glue-and-boosting",
  },
  {
    id: "factory-tuned",
    term: "Factory tuned",
    aliases: ["factory boosted", "pre-boosted"],
    definition:
      "A rubber treated by its maker before sale, for example some tensor rubbers and DHS's Hurricane Neo. That is allowed; treating a rubber after it leaves the factory is not.",
    guide: "speed-glue-and-boosting",
  },
  {
    id: "larc",
    term: "LARC",
    aliases: ["List of Authorized Racket Coverings"],
    definition:
      "The ITTF's List of Authorized Racket Coverings: every rubber legal in ITTF competition, with its approval code, pimple type and authorised colours. Each edition is valid until 31 December.",
    guide: "speed-glue-and-boosting",
  },
  {
    id: "ittf-approved",
    term: "ITTF approved",
    aliases: ["ITTF authorised", "ITTF authorized"],
    definition:
      "A rubber on the ITTF's current LARC. It must be glued so that the ITTF logo, the ITTF number and the brand names are visible nearest the handle.",
    guide: "speed-glue-and-boosting",
  },
  {
    id: "ittf-number",
    term: "ITTF number",
    aliases: ["ITTF code"],
    definition:
      'The code moulded next to the ITTF logo on newer rubbers: a 2- or 3-digit supplier number, a dash and a 3-digit brand number, such as "12-345".',
    guide: "speed-glue-and-boosting",
  },
  {
    id: "racket-control",
    term: "Racket control",
    definition:
      "ITTF testing of rackets at major events for flatness, covering thickness, even thickness, layer continuity, and harmful or volatile substances.",
    guide: "speed-glue-and-boosting",
  },
];
