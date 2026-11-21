// "Blade vs blade" articles, one file per pair (how to write one: BRIEF.md). Each page is prerendered at
// /equipment/compare/<slug> and listed in the sitemap.
import type { BladeComparison } from "../../models";
import { comparison as acousticCarbonVsViscaria } from "./acoustic-carbon-vs-viscaria";
import { comparison as acousticVsAcousticCarbon } from "./acoustic-vs-acoustic-carbon";
import { comparison as allroundClassicVsSwedenExtra } from "./allround-classic-vs-sweden-extra";
import { comparison as carbonado45VsCybershapeCarbon } from "./carbonado-45-vs-cybershape-carbon";
import { comparison as clipperWoodVsClipperCr } from "./clipper-wood-vs-clipper-cr";
import { comparison as clipperWoodVsInfinityVpsV } from "./clipper-wood-vs-infinity-vps-v";
import { comparison as cybershapeCarbonVsCybershapeWood } from "./cybershape-carbon-vs-cybershape-wood";
import { comparison as fanZhendongAlcVsFanZhendongSuperAlc } from "./fan-zhendong-alc-vs-fan-zhendong-super-alc";
import { comparison as fanZhendongAlcVsHurricaneLong5 } from "./fan-zhendong-alc-vs-hurricane-long-5";
import { comparison as harimotoInnerforceAlcVsHarimotoInnerforceSuperAlc } from "./harimoto-innerforce-alc-vs-harimoto-innerforce-super-alc";
import { comparison as hayabusaZlxVsTimoBollZlc } from "./hayabusa-zlx-vs-timo-boll-zlc";
import { comparison as hurricaneKingVsHurricaneLong5 } from "./hurricane-king-vs-hurricane-long-5";
import { comparison as hurricaneLong5VsHurricane301 } from "./hurricane-long-5-vs-hurricane-301";
import { comparison as hurricaneLong5VsW968HurricaneLong5 } from "./hurricane-long-5-vs-w968-hurricane-long-5";
import { comparison as innerforceLayerAlcVsHarimotoInnerforceAlc } from "./innerforce-layer-alc-vs-harimoto-innerforce-alc";
import { comparison as innerforceLayerAlcVsInnerforceLayerZlc } from "./innerforce-layer-alc-vs-innerforce-layer-zlc";
import { comparison as mythExtraOffensiveVsSwedenExtra } from "./myth-extra-offensive-vs-sweden-extra";
import { comparison as primoracCarbonVsViscaria } from "./primorac-carbon-vs-viscaria";
import { comparison as stratusPowerWoodVsKorbelSk7 } from "./stratus-power-wood-vs-korbel-sk7";
import { comparison as timoBollAlcVsFanZhendongAlc } from "./timo-boll-alc-vs-fan-zhendong-alc";
import { comparison as timoBollAlcVsTimoBollZlc } from "./timo-boll-alc-vs-timo-boll-zlc";
import { comparison as trueCarbonVsViscaria } from "./true-carbon-vs-viscaria";
import { comparison as viscariaSuperAlcVsFanZhendongSuperAlc } from "./viscaria-super-alc-vs-fan-zhendong-super-alc";
import { comparison as viscariaVsCybershapeCarbon } from "./viscaria-vs-cybershape-carbon";
import { comparison as viscariaVsFanZhendongAlc } from "./viscaria-vs-fan-zhendong-alc";
import { comparison as viscariaVsHurricaneLong5 } from "./viscaria-vs-hurricane-long-5";
import { comparison as viscariaVsInnerforceLayerAlc } from "./viscaria-vs-innerforce-layer-alc";
import { comparison as viscariaVsTimoBollAlc } from "./viscaria-vs-timo-boll-alc";
import { comparison as viscariaVsViscariaSuperAlc } from "./viscaria-vs-viscaria-super-alc";
import { comparison as yinhePro01VsViscaria } from "./yinhe-pro-01-vs-viscaria";

export const comparisons: BladeComparison[] = [
  acousticCarbonVsViscaria,
  acousticVsAcousticCarbon,
  allroundClassicVsSwedenExtra,
  carbonado45VsCybershapeCarbon,
  clipperWoodVsClipperCr,
  clipperWoodVsInfinityVpsV,
  cybershapeCarbonVsCybershapeWood,
  fanZhendongAlcVsFanZhendongSuperAlc,
  fanZhendongAlcVsHurricaneLong5,
  harimotoInnerforceAlcVsHarimotoInnerforceSuperAlc,
  hayabusaZlxVsTimoBollZlc,
  hurricaneKingVsHurricaneLong5,
  hurricaneLong5VsHurricane301,
  hurricaneLong5VsW968HurricaneLong5,
  innerforceLayerAlcVsHarimotoInnerforceAlc,
  innerforceLayerAlcVsInnerforceLayerZlc,
  mythExtraOffensiveVsSwedenExtra,
  primoracCarbonVsViscaria,
  stratusPowerWoodVsKorbelSk7,
  timoBollAlcVsFanZhendongAlc,
  timoBollAlcVsTimoBollZlc,
  trueCarbonVsViscaria,
  viscariaSuperAlcVsFanZhendongSuperAlc,
  viscariaVsCybershapeCarbon,
  viscariaVsFanZhendongAlc,
  viscariaVsHurricaneLong5,
  viscariaVsInnerforceLayerAlc,
  viscariaVsTimoBollAlc,
  viscariaVsViscariaSuperAlc,
  yinhePro01VsViscaria,
];
