import { Fragment, type ReactNode } from "react";
import { Link } from "react-router";
import type { LegalBlock, LegalDocument } from "~/content/legal";

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

/** `[label](url)` becomes a link (internal paths stay in the router), `**text**` becomes bold. */
function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const [whole, label, url, bold] = match;
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    if (bold) {
      nodes.push(
        <strong key={index} className="font-semibold text-foreground">
          {bold}
        </strong>,
      );
    } else if (url.startsWith("/")) {
      nodes.push(
        <Link key={index} to={url} className="font-medium text-primary underline-offset-2 hover:underline">
          {label}
        </Link>,
      );
    } else {
      const external = url.startsWith("http");
      nodes.push(
        <a
          key={index}
          href={url}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          {label}
        </a>,
      );
    }
    last = index + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{inline(block)}</p>;
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-primary">
      {block.list.map((item, i) => (
        <li key={i}>{inline(item)}</li>
      ))}
    </ul>
  );
}

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <article lang="en" className="px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <header className="border-b pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{document.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Last updated {document.updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{document.intro}</p>
        </header>
        {document.sections.map((section) => (
          <Fragment key={section.heading}>
            <section className="mt-10">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          </Fragment>
        ))}
      </div>
    </article>
  );
}
