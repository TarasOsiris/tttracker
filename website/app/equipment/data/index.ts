// One module per brand under brands/, each exporting `brand`, `blades` and `rubbers`. Adding a brand here adds its
// pages to the prerender list and sitemap.xml automatically.
import type { Blade, Brand, Rubber } from "../models";
import * as friendship729 from "./brands/729";
import * as andro from "./brands/andro";
import * as butterfly from "./brands/butterfly";
import * as derMaterialspezialist from "./brands/der-materialspezialist";
import * as dhs from "./brands/dhs";
import * as donic from "./brands/donic";
import * as drNeubauer from "./brands/dr-neubauer";
import * as joola from "./brands/joola";
import * as nittaku from "./brands/nittaku";
import * as sauerTroger from "./brands/sauer-troger";
import * as stiga from "./brands/stiga";
import * as tibhar from "./brands/tibhar";
import * as victas from "./brands/victas";
import * as xiom from "./brands/xiom";
import * as yasaka from "./brands/yasaka";
import * as yinhe from "./brands/yinhe";
import { glossary } from "./glossary";
import { guides } from "./guides";
import { players } from "./players";

type BrandModule = { brand: Brand; blades: Blade[]; rubbers: Rubber[] };

const modules: BrandModule[] = [friendship729, andro, butterfly, derMaterialspezialist, dhs, donic, drNeubauer, joola, nittaku, sauerTroger, stiga, tibhar, victas, xiom, yasaka, yinhe];

const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name, "en");

export const brands: Brand[] = modules.map((m) => m.brand).sort(byName);
export const blades: Blade[] = modules.flatMap((m) => m.blades);
export const rubbers: Rubber[] = modules.flatMap((m) => m.rubbers);
export { glossary, guides, players };
