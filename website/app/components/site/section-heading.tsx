import { cn } from "~/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.1]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
