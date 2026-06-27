import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Sparkles, Palette, Hand, Shapes } from "lucide-react";
import { galleryImages } from "@/lib/data";
import { useUIStore } from "@/store/ui";
import { asset } from "@/lib/utils";

const categories = [
  { id: "todas", label: "Todas", icon: Sparkles, color: "bg-candy-pink text-white shadow-candy" },
  { id: "moderna", label: "Modernas", icon: Palette, color: "bg-ocean text-white shadow-ocean" },
  { id: "geométrica", label: "Geométricas", icon: Shapes, color: "bg-grape text-white shadow-grape" },
  { id: "artesanal", label: "Artesanales", icon: Hand, color: "bg-coral text-white shadow-coral" },
];

const catColorMap: Record<string, string> = {
  moderna: "bg-ocean-light border-ocean text-ocean",
  geométrica: "bg-grape-light border-grape text-grape",
  artesanal: "bg-coral-light border-coral text-coral",
};

export function Gallery() {
  const { activeGalleryFilter, setActiveGalleryFilter } = useUIStore();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeGalleryFilter === "todas"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeGalleryFilter);

  const navigateLightbox = (dir: number) => {
    if (lightbox === null) return;
    const newIndex = lightbox + dir;
    if (newIndex >= 0 && newIndex < filtered.length) {
      setLightbox(newIndex);
    }
  };

  return (
    <section id="galeria" className="relative bg-white py-24 sm:py-32">
      {/* Fun background dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ff2e7a 2px, transparent 2px), radial-gradient(circle, #00b4d8 2px, transparent 2px), radial-gradient(circle, #ffd60a 2px, transparent 2px)",
          backgroundSize: "60px 60px, 80px 80px, 100px 100px",
          backgroundPosition: "0 0, 30px 30px, 15px 15px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-lime-light px-4 py-1.5 text-sm font-extrabold text-lime">
            <Shapes size={16} /> Galería
          </span>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Piezas que{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent">
                enamoran
              </span>
            </span>
          </h2>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
            Cada alfombra es un{' '}
            <span className="text-candy-pink">universo de color</span>. Mira,
            toca, enamórate.
          </p>
        </motion.div>

        {/* Colorful filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((cat) => {
            const active = activeGalleryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveGalleryFilter(cat.id)}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition-all duration-300 ${
                  active
                    ? cat.color
                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
                } ${active ? "scale-105" : "hover:scale-105"}`}
              >
                <cat.icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Masonry grid */}
        <motion.div layout className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-5 break-inside-avoid"
              >
                <button
                  onClick={() => setLightbox(index)}
                  className="group relative block w-full overflow-hidden rounded-3xl border-2 border-neutral-100 transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-candy-pink/40"
                >
                  <img
                    src={asset(image.src)}
                    alt={image.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-xs font-extrabold ${catColorMap[image.category] || "bg-white/90 text-neutral-900"}`}
                    >
                      {image.category}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && filtered[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/95 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 z-20 rounded-2xl bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-4 z-20 rounded-2xl bg-white/10 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110 disabled:opacity-20"
                disabled={lightbox === 0}
                aria-label="Anterior"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-2xl bg-white/10 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110 disabled:opacity-20"
                disabled={lightbox === filtered.length - 1}
                aria-label="Siguiente"
              >
                <ChevronRight size={28} />
              </button>

              <motion.img
                key={filtered[lightbox].src}
                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={asset(filtered[lightbox].src)}
                alt={filtered[lightbox].alt}
                className="max-h-[85vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
