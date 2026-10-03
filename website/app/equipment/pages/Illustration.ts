// Resource route: /equipment/img/{blades|rubbers}/<id>.svg. Prerendered to static .svg files, used by cards, detail pages
// and the Product structured data.
import type { Route } from "./+types/Illustration";
import { bladeSvg, rubberSvg } from "../illustrations";
import { illustrationSubject } from "../store.server";

export function loader({ params }: Route.LoaderArgs) {
  const id = params.file.replace(/\.svg$/, "");
  const subject = params.kind === "blades" || params.kind === "rubbers" ? illustrationSubject(params.kind, id) : null;
  if (!subject) throw new Response("Not found", { status: 404 });
  const svg = subject.kind === "blades" ? bladeSvg(subject.item, subject.title) : rubberSvg(subject.item, subject.title);
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
