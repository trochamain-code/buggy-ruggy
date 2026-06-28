import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Mail, MapPin, Phone, Heart } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { SevillaClock } from "@/components/ui/SevillaClock";
import { YarnToy } from "@/components/ui/YarnToy";

gsap.registerPlugin(SplitText, ScrollTrigger);

const footerLinks = {
  servicios: [
    { label: "Diseño Personalizado", href: "#diseno" },
    { label: "Talleres Creativos", href: "#talleres" },
    { label: "Galería", href: "#galeria" },
    { label: "Pedidos Especiales", href: "#contacto" },
  ],
  contacto: [
    { icon: Phone, text: "+34 612 345 678" },
    { icon: Mail, text: "hola@buggyruggy.com" },
    { icon: MapPin, text: "Calle del Arte, 42, Sevilla" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/buggy.ruggy", icon: Instagram },
    { label: "Email", href: "mailto:hola@buggyruggy.com", icon: Mail },
  ],
};

function SocialLink({ label, href, icon: Icon }: (typeof footerLinks.social)[number]) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.context(() => {
      const split = new SplitText(el, { type: "chars", charsClass: "split-char inline-block" });
      gsap.fromTo(
        split.chars,
        { y: 0, color: "currentColor" },
        {
          y: -4,
          color: "#ff2e7a",
          duration: 0.3,
          stagger: { each: 0.03, from: "random" },
          ease: "power2.out",
          onComplete: () => split.revert(),
        },
      );
    }, ref);
  };

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2 font-street text-xl uppercase tracking-[0.1em] text-neutral-400 transition-colors hover:text-white"
      onMouseEnter={handleMouseEnter}
      aria-label={label}
    >
      <Icon size={18} />
      <span>{label}</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-neutral-300">
      {/* Top colorful neon bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-candy-pink via-coral via-sun via-lime via-ocean to-grape" />

      {/* Grain + glow */}
      <span className="bg-grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      <span className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-candy-pink/20 blur-3xl" />
      <span className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-ocean/20 blur-3xl" />

      {/* Yarn toy (desktop only) */}
      <YarnToy />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* CTA section */}
        <div className="mb-16 text-center">
          <h2 className="font-climate text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            ¿List@ para tejer la tuya?
          </h2>
          <p className="mt-4 text-lg font-semibold text-neutral-400">
            Reserva tu taller o pide tu diseño personalizado.{" "}
            <span className="text-candy-pink">Sin compromiso</span>.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="#talleres"
              className="font-street inline-flex items-center gap-2 rounded-2xl bg-candy-pink px-6 py-3 text-lg uppercase tracking-[0.1em] text-white shadow-[0_0_20px_rgba(255,46,122,0.6)] transition-all hover:scale-105"
            >
              Reservar Taller
            </a>
            <a
              href="#contacto"
              className="font-street inline-flex items-center gap-2 rounded-2xl border-2 border-white/80 px-6 py-3 text-lg uppercase tracking-[0.1em] text-white transition-all hover:bg-white hover:text-neutral-950"
            >
              Pedir Presupuesto
            </a>
          </div>
        </div>

        {/* Wordmark — DrawSVG */}
        <div className="mb-12">
          <Wordmark />
        </div>

        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10 pt-12">
          <div>
            <h4 className="font-street mb-4 text-xl uppercase tracking-[0.15em] text-coral">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-neutral-400 transition-colors hover:text-candy-pink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-street mb-4 text-xl uppercase tracking-[0.15em] text-ocean">
              Contacto
            </h4>
            <ul className="space-y-3">
              {footerLinks.contacto.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-3 text-sm font-semibold text-neutral-400"
                >
                  <item.icon size={16} className="shrink-0 text-coral" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
            {/* Sevilla live clock */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold">
              <SevillaClock />
            </div>
          </div>

          <div>
            <h4 className="font-street mb-4 text-xl uppercase tracking-[0.15em] text-grape">
              Síguenos
            </h4>
            <div className="space-y-4">
              {footerLinks.social.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs font-semibold text-neutral-500">
            &copy; {new Date().getFullYear()} buggy ruggy. Hecho con{" "}
            <Heart size={12} className="inline fill-candy-pink text-candy-pink" />{" "}
            en Sevilla.
          </p>
          <p className="font-street text-sm uppercase tracking-[0.15em] text-neutral-500">
            Cada alfombra cuenta una historia
          </p>
        </div>
      </div>
    </footer>
  );
}
