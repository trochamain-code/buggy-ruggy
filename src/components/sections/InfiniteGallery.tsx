import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { X } from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import { galleryImages } from "@/lib/data";

gsap.registerPlugin(Flip);

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
  const [exiting, setExiting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const thumbRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const openLightbox = useCallback(
    (imgIndex: number) => {
      const thumb = thumbRefs.current.get(imgIndex);
      if (!thumb) return;
      setExiting(false);
      const state = Flip.getState(thumb.querySelector("img")!);
      setLightbox(imgIndex);
      requestAnimationFrame(() => {
        if (!imgRef.current || !overlayRef.current) return;
        Flip.from(state, {
          targets: imgRef.current,
          duration: 0.5,
          ease: "power3.inOut",
          absolute: true,
        });
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        );
      });
    },
    [],
  );

  const closeLightbox = useCallback(() => {
    const thumb = thumbRefs.current.get(lightbox ?? -1);
    setExiting(true);
    if (!thumb || !imgRef.current || !overlayRef.current) {
      setLightbox(null);
      return;
    }
    const state = Flip.getState(thumb.querySelector("img")!);
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
    });
    Flip.from(state, {
      targets: imgRef.current,
      duration: 0.5,
      ease: "power3.inOut",
      absolute: true,
      onComplete: () => setLightbox(null),
    });
  }, [lightbox]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox !== null && !exiting) closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox, exiting, closeLightbox]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="galeria" className="relative bg-[#0a1a2a] py-20 overflow-hidden">
      {/* Header */}
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

      {/* Infinite rows */}
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
                  ref={(el) => {
                    if (el) thumbRefs.current.set(imgIndex, el);
                  }}
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

      {/* Lightbox */}
      {lightbox !== null && (
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
            className="absolute right-4 top-4 z-10 rounded-xl bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
          <img
            ref={imgRef}
            src={galleryImages[lightbox]!.src}
            alt={galleryImages[lightbox]!.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
      )}
    </section>
  );
}
