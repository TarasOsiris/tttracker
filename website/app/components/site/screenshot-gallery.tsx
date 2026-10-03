import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "~/components/ui/dialog";
import { screenshotFiles } from "~/content/site";
import { format } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";

const images = import.meta.glob<string>("../../assets/screenshots/*.webp", {
  eager: true,
  import: "default",
});
const src = (file: string) => images[`../../assets/screenshots/${file}.webp`];

export function ScreenshotGallery() {
  const { t } = useI18n();
  const screenshots = screenshotFiles.map((file, i) => ({ file, alt: t.screenshots.alts[i] }));
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  // Index outlives `open` so the image stays visible during the close animation.
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const updateEdges = useCallback(() => {
    const el = track.current;
    if (!el) return;
    // scrollLeft runs from 0 towards negative values in right-to-left pages.
    const offset = Math.abs(el.scrollLeft);
    const start = offset < 8;
    const end = offset + el.clientWidth >= el.scrollWidth - 8;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: (rtl ? -dir : dir) * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + screenshots.length) % screenshots.length);

  const current = screenshots[index];

  return (
    <div className="relative">
      <div className="no-print mx-auto flex max-w-6xl justify-end gap-2 px-4 sm:px-6">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          onClick={() => scroll(-1)}
          disabled={edges.start}
          aria-label={t.screenshots.previous}
        >
          <ChevronLeft className="size-5 rtl:rotate-180" />
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          onClick={() => scroll(1)}
          disabled={edges.end}
          aria-label={t.screenshots.next}
        >
          <ChevronRight className="size-5 rtl:rotate-180" />
        </Button>
      </div>
      <div
        ref={track}
        onScroll={updateEdges}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6 xl:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] xl:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {screenshots.map((s, i) => (
          <button
            key={s.file}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="w-[220px] shrink-0 cursor-zoom-in snap-start rounded-3xl transition-transform hover:-translate-y-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none sm:w-[250px]"
            aria-label={format(t.screenshots.enlarge, { alt: s.alt })}
          >
            <img
              src={src(s.file)}
              alt={s.alt}
              width={720}
              height={1280}
              loading="lazy"
              decoding="async"
              className="aspect-[9/16] w-full rounded-3xl border bg-brand-navy object-cover shadow-sm"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-auto max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 shadow-none sm:max-w-none"
          onKeyDown={(e) => {
            const forward = getComputedStyle(e.currentTarget).direction === "rtl" ? "ArrowLeft" : "ArrowRight";
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") step(e.key === forward ? 1 : -1);
          }}
        >
          <DialogTitle className="sr-only">Screenshot {index + 1}</DialogTitle>
          <DialogDescription className="sr-only">{current.alt}</DialogDescription>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon-lg" className="hidden rounded-full sm:inline-flex" onClick={() => step(-1)} aria-label={t.screenshots.previousOne}>
              <ChevronLeft className="size-5 rtl:rotate-180" />
            </Button>
            <img
              src={src(current.file)}
              alt={current.alt}
              width={720}
              height={1280}
              onClick={() => step(1)}
              className="max-h-[85vh] w-auto cursor-pointer rounded-3xl shadow-2xl"
            />
            <Button variant="secondary" size="icon-lg" className="hidden rounded-full sm:inline-flex" onClick={() => step(1)} aria-label={t.screenshots.nextOne}>
              <ChevronRight className="size-5 rtl:rotate-180" />
            </Button>
          </div>
          <p className="text-center text-sm text-white/80 tabular-nums">
            {index + 1} / {screenshots.length}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
