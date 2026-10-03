// Product illustrations drawn from each item's own specs, so they can't show something the product isn't:
// blades get their sold handle shape and outer-veneer wood; rubbers get the topsheet colours the maker lists, the pip
// orientation of their type and the stated sponge colour. Returned as SVG strings so the same drawing is inlined on the
// page and written to /equipment/img/ at build time for structured data. Never a photo, and captioned as such.
import type { Blade, Handle, Rubber } from "./models";

const woodTones: [RegExp, string, string][] = [
  [/walnut/i, "#8a5a33", "#6d4426"],
  [/wenge|ebony/i, "#5b3a26", "#432a1b"],
  [/koto/i, "#e8cf86", "#c9ad62"],
  [/hinoki/i, "#efdcae", "#d3bd88"],
  [/limba/i, "#d9b47a", "#b9935a"],
  [/ayous|abachi|samba/i, "#e9d6a4", "#cbb582"],
  [/kiri|balsa/i, "#f1e3c0", "#d8c79f"],
  [/spruce|white ash|ash/i, "#ead9a8", "#cbb985"],
  [/cypress/i, "#e6cf98", "#c6ae72"],
];

function wood(name: string | null): [string, string] {
  const hit = name ? woodTones.find(([re]) => re.test(name)) : undefined;
  return hit ? [hit[1], hit[2]] : ["#dfc08a", "#bf9f68"];
}

const HEAD = "M100 12 C 152 12 178 48 178 92 C 178 136 150 168 112 176 L 112 186 L 88 186 L 88 176 C 50 168 22 136 22 92 C 22 48 48 12 100 12 Z";

function handlePath(h: Handle | undefined): string {
  switch (h) {
    case "ST":
      return "M87 180 L113 180 L113 284 Q113 292 105 292 L95 292 Q87 292 87 284 Z";
    case "AN":
      return "M88 180 L112 180 C 118 215 118 245 112 284 Q111 292 104 292 L96 292 Q89 292 88 284 C 82 245 82 215 88 180 Z";
    case "CON":
      return "M87 180 L113 180 C 110 220 112 255 116 284 Q116 292 108 292 L92 292 Q84 292 84 284 C 88 255 90 220 87 180 Z";
    case "CS":
      return "M88 180 L112 180 L112 226 Q112 238 100 238 Q88 238 88 226 Z";
    case "JP":
      return "M86 180 L114 180 L114 236 Q114 244 106 244 L94 244 Q86 244 86 236 Z";
    case "FL":
    default:
      return "M88 180 L112 180 C 110 225 112 258 119 282 Q121 292 110 292 L90 292 Q79 292 81 282 C 88 258 90 225 88 180 Z";
  }
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function bladeSvg(blade: Pick<Blade, "id" | "name" | "outerWood" | "handles">, title: string): string {
  const [face, grain] = wood(blade.outerWood);
  const handle = blade.handles[0];
  const id = `b-${blade.id}`;
  const grainLines = Array.from({ length: 7 }, (_, i) => {
    const x = 40 + i * 20;
    return `<path d="M${x} 20 C ${x + 8} 70 ${x - 8} 120 ${x + 4} 176" fill="none" stroke="${grain}" stroke-opacity="0.35" stroke-width="1.2"/>`;
  }).join("");
  const cork = handle === "JP" ? `<path d="M80 128 L120 128 Q124 128 124 132 L124 182 L76 182 L76 132 Q76 128 80 128 Z" fill="#b98a57" stroke="#8f6739" stroke-width="1.5"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" role="img" aria-labelledby="${id}-t"><title id="${id}-t">${esc(title)}</title><defs><clipPath id="${id}-c"><path d="${HEAD}"/></clipPath><linearGradient id="${id}-h" x1="0" x2="1"><stop offset="0" stop-color="${grain}"/><stop offset="0.5" stop-color="${face}"/><stop offset="1" stop-color="${grain}"/></linearGradient></defs><path d="${HEAD}" fill="${face}" stroke="${grain}" stroke-width="2"/><g clip-path="url(#${id}-c)">${grainLines}</g>${cork}<path d="${handlePath(handle)}" fill="url(#${id}-h)" stroke="${grain}" stroke-width="2"/></svg>`;
}

const colourHex: [RegExp, string][] = [
  [/black/i, "#1c1c1e"],
  [/red/i, "#c8102e"],
  [/pink|magenta/i, "#e0457b"],
  [/purple|violet/i, "#6b3fa0"],
  [/light blue|sky/i, "#4aa3df"],
  [/blue/i, "#1f5fbf"],
  [/green/i, "#2e8b57"],
  [/orange/i, "#f08a24"],
  [/yellow/i, "#f2c94c"],
  [/white|cream|natural|beige/i, "#f1eadb"],
  [/grey|gray/i, "#9ca3af"],
];

function hex(name: string): string | null {
  return colourHex.find(([re]) => re.test(name))?.[1] ?? null;
}

const SHEET = "M80 14 C 122 14 142 42 142 78 C 142 116 116 140 80 140 C 44 140 18 116 18 78 C 18 42 38 14 80 14 Z";

function pipPattern(id: string, type: Rubber["type"], fill: string): string {
  const spec = {
    "short-pips": { gap: 9, r: 3.1 },
    "medium-pips": { gap: 9, r: 2.6 },
    "long-pips": { gap: 8, r: 1.9 },
  }[type as "short-pips"];
  if (!spec) return "";
  return `<pattern id="${id}" width="${spec.gap}" height="${spec.gap}" patternUnits="userSpaceOnUse"><rect width="${spec.gap}" height="${spec.gap}" fill="${fill}"/><circle cx="${spec.gap / 2}" cy="${spec.gap / 2}" r="${spec.r}" fill="#000" fill-opacity="0.28"/><circle cx="${spec.gap / 2 - 0.6}" cy="${spec.gap / 2 - 0.6}" r="${spec.r * 0.75}" fill="#fff" fill-opacity="0.18"/></pattern>`;
}

export function rubberSvg(
  rubber: Pick<Rubber, "id" | "type" | "tackiness" | "topsheetColors" | "spongeColor" | "spongeThicknesses">,
  title: string,
): string {
  const id = `r-${rubber.id}`;
  const known = (rubber.topsheetColors ?? []).map(hex).filter((c): c is string => !!c);
  // No colour listed: a neutral grey sheet rather than a colour the rubber might not come in.
  const colours = known.length ? [...new Set(known)].slice(0, 2) : ["#6b7280"];
  const pipsOut = rubber.type.includes("pips");
  const glossy = !pipsOut && rubber.type !== "anti";
  const defs: string[] = [];
  const sheets = colours
    .map((c, i) => {
      const dx = colours.length > 1 ? (i === 0 ? 0 : 80) : 40;
      const dy = colours.length > 1 ? (i === 0 ? 0 : 22) : 10;
      const pat = pipPattern(`${id}-p${i}`, rubber.type, c);
      if (pat) defs.push(pat);
      const fill = pat ? `url(#${id}-p${i})` : c;
      const gloss = glossy
        ? `<path d="${SHEET}" fill="url(#${id}-g)" opacity="${rubber.tackiness === "tacky" ? 0.55 : 0.35}"/>`
        : "";
      return `<g transform="translate(${dx} ${dy})"><path d="${SHEET}" fill="${fill}" stroke="#000" stroke-opacity="0.25" stroke-width="1.5"/>${gloss}</g>`;
    })
    .join("");
  defs.push(
    `<linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.7"/><stop offset="0.45" stop-color="#fff" stop-opacity="0"/></linearGradient>`,
  );

  // Edge view: topsheet with pips up (pips-out) or down into the sponge (inverted), on the stated sponge colour.
  const top = colours[colours.length > 1 ? 1 : 0];
  const onlyOx = rubber.spongeThicknesses.length > 0 && rubber.spongeThicknesses.every((t) => /^ox$/i.test(t.trim()));
  // Unknown sponge colour is drawn neutral grey, matching the caption that says it isn't listed.
  const sponge = onlyOx ? null : (rubber.spongeColor && hex(rubber.spongeColor)) || "#d4d4d8";
  const y = 200;
  const pips = Array.from({ length: 13 }, (_, i) => {
    const x = 34 + i * 14;
    const h = rubber.type === "long-pips" ? 12 : rubber.type === "medium-pips" ? 8 : 6;
    return pipsOut ? `<rect x="${x}" y="${y - h}" width="6" height="${h}" fill="${top}"/>` : `<rect x="${x}" y="${y + 4}" width="6" height="5" fill="${top}"/>`;
  }).join("");
  const spongeLayer = sponge
    ? `<rect x="30" y="${y + 4}" width="182" height="16" fill="${sponge}" stroke="#000" stroke-opacity="0.15"/>${pipsOut ? "" : pips}`
    : "";
  const edge = `<rect x="30" y="${y}" width="182" height="4" fill="${top}"/>${pipsOut ? pips : ""}${spongeLayer}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 230" role="img" aria-labelledby="${id}-t"><title id="${id}-t">${esc(title)}</title><defs>${defs.join("")}</defs>${sheets}${edge}</svg>`;
}
