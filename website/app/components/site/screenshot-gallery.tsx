import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { screenshots } from "~/content/site";

const images = import.meta.glob<string>("../../assets/screenshots/*.webp", {
  eager: true,
  import: "default",
});
const src = (file: string) => images[`../../assets/screenshots/${file}.webp`];

export function ScreenshotGallery() {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="no-print mx-auto flex max-w-6xl justify-end gap-2 px-4 sm:px-6">
        <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => scroll(-1)} aria-label="Previous screenshots">
          <ChevronLeft className="size-5" />
        </Button>
        <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => scroll(1)} aria-label="Next screenshots">
          <ChevronRight className="size-5" />
        </Button>
      </div>
      <div
        ref={track}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6 xl:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] xl:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {screenshots.map((s) => (
          <figure key={s.file} className="w-[220px] shrink-0 snap-start sm:w-[250px]">
            <img
              src={src(s.file)}
              alt={s.alt}
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
              className="aspect-[9/16] w-full rounded-3xl border bg-brand-navy object-cover shadow-sm"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
