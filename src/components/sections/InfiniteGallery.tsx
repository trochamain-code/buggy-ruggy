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
  return (
    <section id="galeria" className="relative bg-[#0a1a2a] py-20 overflow-hidden">
      {/* Header */}
      <div className="mb-10 text-center px-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-lime/20 px-4 py-1.5 text-sm font-extrabold text-lime">
          🖼️ Galería
        </span>
        <h2 className="mt-4 font-climate text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {galleryImages.length} alfombras{' '}
          <span className="bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent">
            únicas
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
                  className="group relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-2xl shadow-2xl sm:h-[260px] sm:w-[260px]"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
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
    </section>
  );
}
