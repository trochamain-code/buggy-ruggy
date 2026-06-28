import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import { galleryImages } from "@/lib/data";

const ROWS = 6;
const cols = galleryImages
  .map((_, i) => i)
  .reduce<number[][]>((acc, _, i) => {
    const row = i % ROWS;
    if (!acc[row]) acc[row] = [];
    acc[row]!.push(i);
    return acc;
  }, []);

export function InfiniteGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const openLightbox = useCallback((imgIndex: number) => {
    setLightbox(imgIndex);
  }, []);

  useEffect(() => {
    if (lightbox === null || !overlayRef.current || !imgRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      tl.fromTo(
        imgRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" },
        "-=0.2",
      );
    });
    return () => ctx.revert();
  }, [lightbox]);

  const closeLightbox = useCallback(() => {
    if (!overlayRef.current || !imgRef.current) {
      setLightbox(null);
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLightbox(null),
      });
      tl.to(imgRef.current, { scale: 0.9, opacity: 0, duration: 0.25, ease: "power2.in" });
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.15");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox !== null) closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const lightboxSrc = lightbox !== null ? galleryImages[lightbox] : null;

  return (
    <section id="galeria" className="relative bg-[#0a1a2a] py-20 overflow-hidden">
      <div className="mb-10 text-center px-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-lime/20 px-4 py-1.5 text-sm font-extrabold text-lime">
          🖼️ Galería
        </span>
        <h2 className="mt-4 font-climate text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          100+{' '}
          <span className="font-horizon tracking-[0.05em]">alfombras</span>{' '}
          <span className="bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent tracking-[0.15em]">
            ÚNICAS
          </span>
        </h2>
      </div>

      <div className="space-y-3">
        {cols.map((rowIndices, rowI) => (
          <InfiniteSlider
            key={rowI}
            gap={16}
            duration={20 + rowI * 5}
            durationOnHover={40 + rowI * 8}
            reverse={rowI % 2 === 1}
          >
            {rowIndices.map((imgIndex) => {
              const img = galleryImages[imgIndex]!;
              return (
                <div
                  key={img.src}
                  onClick={() => openLightbox(imgIndex)}
                  className="group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-2xl sm:h-[260px] sm:w-[260px]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") openLightbox(imgIndex);
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-3 left-3 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-neutral-800 backdrop-blur-sm">
                      {img.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </InfiniteSlider>
        ))}
      </div>

      {/* Portal: renders at document.body, outside #smooth-content, so fixed works */}
      {lightbox !== null &&
        lightboxSrc &&
        createPortal(
          <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-neutral-950/70"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute right-4 top-4 z-20 rounded-xl bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
            <img
              ref={imgRef}
              src={lightboxSrc.src}
              alt={lightboxSrc.alt}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>,
          document.body,
        )}
    </section>
  );
}
