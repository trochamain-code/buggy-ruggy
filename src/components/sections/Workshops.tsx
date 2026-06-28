import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, Users, ChevronRight, Paintbrush, Star } from "lucide-react";
import { SplitText } from "@/components/ui/SplitText";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { workshopEvents, galleryImages } from "@/lib/data";
import type { WorkshopEvent } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const levelConfig: Record<
  WorkshopEvent["level"],
  { label: string; emoji: string; badge: string }
> = {
  principiante: {
    label: "Principiante",
    emoji: "🌱",
    badge: "bg-lime/80 text-white backdrop-blur-md",
  },
  intermedio: {
    label: "Intermedio",
    emoji: "🎨",
    badge: "bg-ocean/80 text-white backdrop-blur-md",
  },
  avanzado: {
    label: "Avanzado",
    emoji: "🔥",
    badge: "bg-grape/80 text-white backdrop-blur-md",
  },
};

export function Workshops() {
  const [selected, setSelected] = useState<WorkshopEvent | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const workshopImages = galleryImages.slice(0, workshopEvents.length);

  useLayoutEffect(() => {
    function initGSAP() {
      if (window.innerWidth < 640) return;

      const ctx = gsap.context(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const header = headerRef.current;
        if (!section || !track || !header) return;

        const scrollWidth = track.scrollWidth;
        const viewportWidth = section.offsetWidth;
        const maxScroll = Math.max(0, scrollWidth - viewportWidth);

        if (maxScroll === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${maxScroll + section.offsetHeight}`,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        tl.to(header, { opacity: 0, y: -30, ease: "none" }, 0).to(
          track,
          { x: -maxScroll, ease: "none" },
          0.15,
        );
      });

      return ctx;
    }

    let ctx = initGSAP();

    function onResize() {
      if (ctx) ctx.revert();
      ctx = initGSAP();
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="talleres"
      ref={sectionRef}
      className="relative overflow-x-hidden bg-gradient-to-b from-white via-berry-light/20 to-coral-light/30"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[10%] h-24 w-24 animate-float rounded-full bg-candy-pink/15 blur-xl" />
        <div className="absolute right-[10%] bottom-[20%] h-36 w-36 animate-float rounded-full bg-ocean/15 blur-xl" />
      </div>

      <div className="flex min-h-screen flex-col pt-24 lg:pt-32">
        <div ref={headerRef} className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <SplitText className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Aprende, imagína, crea
            </SplitText>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
              Talleres presenciales donde{" "}
              <span className="text-coral">te diviertes</span> y te llevas tu
              propia alfombra a casa. ¡No necesitas experiencia!
            </p>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-4 sm:px-8 lg:px-16 pb-8"
        >
          {workshopEvents.map((workshop, index) => {
            const level = levelConfig[workshop.level];
            const spotsLeft = workshop.capacity - workshop.enrolled;
            const image = workshopImages[index];
            return (
              <div
                key={workshop.id}
                className="group relative w-full sm:w-auto sm:min-w-[340px] sm:flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer md:min-w-[400px]"
                onClick={() => setSelected(workshop)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelected(workshop);
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img
                    src={image!.src}
                    alt={image!.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

                {/* Content */}
                <div className="relative flex h-[360px] flex-col justify-end p-5 sm:h-[500px] sm:p-6">
                  {/* Level badge */}
                  <div className="absolute left-6 top-6">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold ${level.badge}`}
                    >
                      <span className="text-sm">{level.emoji}</span>
                      {level.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold text-white">
                    {workshop.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm font-semibold leading-relaxed text-white/70">
                    {workshop.description}
                  </p>

                  {/* Date & Time */}
                  <div className="mt-4 flex items-center gap-4 text-sm font-bold text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {workshop.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {workshop.time}
                    </span>
                  </div>

                  {/* Spots gauge */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-white/50">Plazas</span>
                      <span
                        className={
                          spotsLeft <= 2 ? "text-candy-pink" : "text-lime"
                        }
                      >
                        {spotsLeft} libres
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/20">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${spotsLeft <= 2 ? "bg-candy-pink" : "bg-lime"}`}
                        style={{
                          width: `${(workshop.enrolled / workshop.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center justify-center gap-1.5 rounded-xl bg-white/10 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-candy-pink group-hover:shadow-lg group-hover:shadow-candy-pink/30">
                    Ver más
                    <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 text-3xl">
                {levelConfig[selected.level].emoji}
              </div>
              <DialogTitle className="mt-2 text-2xl font-extrabold">
                {selected.title}
              </DialogTitle>
              <DialogDescription className="text-base font-semibold">
                {selected.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 rounded-3xl bg-neutral-50 p-5">
              <div className="flex items-center gap-3 text-sm font-bold text-neutral-700">
                <Calendar size={18} className="text-coral" />
                <span>{selected.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-neutral-700">
                <Clock size={18} className="text-ocean" />
                <span>
                  {selected.time} — Duración: {selected.duration}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-neutral-700">
                <Users size={18} className="text-grape" />
                <span>
                  {selected.capacity - selected.enrolled} plazas libres de{" "}
                  {selected.capacity}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-candy-pink">
                <Star size={16} className="fill-candy-pink text-candy-pink" />
                Materiales incluidos
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/buggy.ruggy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-2xl bg-candy-pink py-3.5 text-center text-base font-extrabold text-white shadow-candy transition-all hover:scale-105 block"
              >
                ¡Reservar Plaza!
              </a>
            </div>
          </>
        )}
      </Dialog>
    </section>
  );
}
