import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Ruler, Sparkles, Heart, ArrowRight } from "lucide-react";
import { asset } from "@/lib/utils";
import { SplitText } from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Palette,
    title: "Tú imaginas, nosotros creamos",
    description: "Cuéntanos tu idea más loca. Colores, formas, texturas. No hay límites.",
    bg: "bg-candy-pink-light",
    iconBg: "bg-candy-pink",
    text: "text-candy-pink",
  },
  {
    icon: Ruler,
    title: "Del tamaño que quieras",
    description: "Desde un pequeño tapete hasta una alfombra XXL. Hacemos cualquier medida.",
    bg: "bg-ocean-light",
    iconBg: "bg-ocean",
    text: "text-ocean",
  },
  {
    icon: Sparkles,
    title: "Materiales que molan",
    description: "Lanas suaves, algodón orgánico, fibras recicladas. Bueno para ti y para el planeta.",
    bg: "bg-lime-light",
    iconBg: "bg-lime",
    text: "text-lime",
  },
  {
    icon: Heart,
    title: "Hecho a mano con amor",
    description: "Cada pieza es única, tejida una a una en nuestro taller. La imperfección es arte.",
    bg: "bg-grape-light",
    iconBg: "bg-grape",
    text: "text-grape",
  },
];

export function CustomDesign() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Feature cards — each enters from a different direction with scrub
      const cards = section.querySelectorAll(".feature-card");
      const directions = [
        { x: -60, rotation: -6 },
        { x: 60, rotation: 6 },
        { y: 60, rotation: -6 },
        { y: -60, rotation: 6 },
      ];

      cards.forEach((card, i) => {
        const dir = directions[i % directions.length];
        gsap.fromTo(
          card,
          { opacity: 0, ...dir },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
      });

      // Image stack parallax — different speeds for depth
      const mainImg = section.querySelector(".img-main");
      const miniImg = section.querySelector(".img-mini");
      const badge = section.querySelector(".img-badge");

      if (mainImg) {
        gsap.to(mainImg, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (miniImg) {
        gsap.to(miniImg, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (badge) {
        gsap.to(badge, {
          y: -20,
          rotation: -15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Decorative blobs — scroll-driven drift
      const blobs = section.querySelectorAll(".deco-blob");
      blobs.forEach((blob, i) => {
        const drift = i % 2 === 0 ? -60 : 60;
        gsap.to(blob, {
          y: drift,
          x: -drift * 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // CTA button — entrance
      const cta = section.querySelector(".cta-btn");
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="diseno"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-lime-light/40 via-yellow-50/60 to-white py-24 sm:py-32"
    >
      {/* Floating decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="deco-blob absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-candy-pink/20 blur-2xl" />
        <div className="deco-blob absolute right-[8%] top-[30%] h-40 w-40 rounded-full bg-ocean/20 blur-2xl" />
        <div className="deco-blob absolute bottom-[10%] left-[30%] h-28 w-28 rounded-full bg-sun/30 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-berry-light px-4 py-1.5 text-sm font-extrabold text-berry">
              <Palette size={16} /> Diseño a Medida
            </span>
            <SplitText className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Tu alfombra,{" "}
              <span className="bg-gradient-to-r from-candy-pink via-berry to-grape bg-clip-text text-transparent">
                tu personalidad
              </span>
            </SplitText>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
              Aburrirse está prohibido. Diseñamos alfombras que{" "}
              <span className="text-coral">gritan color</span> y cuentan{" "}
              <span className="text-ocean">tu historia</span>.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feat) => (
                <div
                  key={feat.title}
                  className={`feature-card rounded-3xl ${feat.bg} p-5 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${feat.iconBg} text-white`}
                  >
                    <feat.icon size={18} />
                  </div>
                  <h3 className="text-sm font-extrabold text-neutral-900">
                    {feat.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-neutral-600">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="cta-btn mt-8">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-candy-pink to-berry px-8 py-4 text-lg font-extrabold text-white shadow-candy transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                ¡Quiero la mía!
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* Back card for depth */}
              <div className="absolute -right-4 -top-4 h-full w-full rotate-6 rounded-3xl bg-coral/30 blur-sm" />
              <div className="absolute -left-4 -top-2 h-full w-full -rotate-3 rounded-3xl bg-ocean/30 blur-sm" />

              {/* Main image */}
              <div className="img-main relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                <img
                  src={asset("/images/3551359.jpg")}
                  alt="Diseño personalizado de alfombra"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-candy-pink/30 to-transparent p-6">
                  <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-extrabold text-candy-pink backdrop-blur-sm">
                    Diseño personalizado
                  </span>
                </div>
              </div>

              {/* Floating mini card */}
              <div className="img-mini absolute -bottom-6 -left-6 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <img
                  src={asset("/images/2660355.jpg")}
                  alt="Detalle de alfombra"
                  className="aspect-square w-36 object-cover sm:w-44"
                />
              </div>

              {/* Emoji badge */}
              <div className="img-badge absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sun text-2xl shadow-lg">
                🎨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
