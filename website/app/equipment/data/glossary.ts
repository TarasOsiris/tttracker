import type { GlossaryTerm } from "../models";
import { hardnessTerms } from "./guide-hardness";
import { bladeTerms } from "./guides-blades";
import { rubberTerms } from "./guides-rubbers";

export const glossary: GlossaryTerm[] = [...bladeTerms, ...rubberTerms, ...hardnessTerms];
