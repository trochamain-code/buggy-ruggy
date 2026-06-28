import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
  ContainerStagger,
  ContainerAnimated,
} from "@/components/ui/animated-gallery";
import { galleryImages } from "@/lib/data";

const column1 = galleryImages.filter((_, i) => i % 3 === 0);
const column2 = galleryImages.filter((_, i) => i % 3 === 1);
const column3 = galleryImages.filter((_, i) => i % 3 === 2);

export function AnimatedGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="relative bg-white"
    >
      <ContainerStagger className="relative z-20 mx-auto max-w-4xl px-6 pb-8 pt-24 text-center">
        <ContainerAnimated>
          <span className="inline-flex items-center gap-2 rounded-full bg-lime-light px-4 py-1.5 text-sm font-extrabold text-lime">
            🖼️ Galería
          </span>
        </ContainerAnimated>
        <ContainerAnimated>
          <SplitText className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Desliza para ver la{" "}
            <span className="bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent">
              magia
            </span>
          </SplitText>
        </ContainerAnimated>
        <ContainerAnimated>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
            Cada alfombra es un <span className="text-candy-pink">universo de color</span>. 
            Hechas a mano, con materiales premium y mucha actitud.
          </p>
        </ContainerAnimated>
      </ContainerStagger>

      <div
        className="pointer-events-none absolute inset-0 z-10 h-[70vh] w-full"
        style={{
          background:
            "linear-gradient(to right, #ff2e7a, #ff6b35, #ffd60a, #00b4d8, #a855f7)",
          filter: "blur(84px)",
          mixBlendMode: "screen",
          opacity: 0.12,
        }}
      />

      <ContainerScroll className="relative h-[180vh]">
        <ContainerSticky className="h-svh">
          <GalleryContainer>
            <GalleryCol yRange={["-6%", "0%"]} className="-mt-2">
              {column1.map((image) => (
                <div
                  key={image.src}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    className="block h-auto w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-extrabold text-neutral-700 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.category}
                  </span>
                </div>
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%]" yRange={["8%", "0%"]}>
              {column2.map((image) => (
                <div
                  key={image.src}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    className="block h-auto w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-extrabold text-neutral-700 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.category}
                  </span>
                </div>
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-6%", "0%"]} className="-mt-2">
              {column3.map((image) => (
                <div
                  key={image.src}
                  className="group relative overflow-hidden rounded-xl shadow-lg"
                >
                  <img
                    className="block h-auto w-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-extrabold text-neutral-700 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.category}
                  </span>
                </div>
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
}
