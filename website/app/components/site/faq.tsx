import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-3xl border bg-card px-6">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`q${i}`}>
          <AccordionTrigger className="py-5 font-display text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent forceMount className="pb-5 text-[15px] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
