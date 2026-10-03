// In-depth equipment guides. Inline links use [label](url) and **bold**, like the blog and legal pages.
import type { Guide } from "../models";
import { hardnessGuide } from "./guide-hardness";
import { bladeGuides } from "./guides-blades";
import { rubberGuides } from "./guides-rubbers";

const [rubberTypes, ...otherRubberGuides] = rubberGuides;

// Reading order: blade construction, then rubbers, hardness, then putting a setup together.
export const guides: Guide[] = [...bladeGuides, rubberTypes, hardnessGuide, ...otherRubberGuides];
