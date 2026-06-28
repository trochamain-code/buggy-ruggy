import { Instagram, Mail, MapPin, Phone, Heart } from "lucide-react";
import { BuggyRuggyLogo } from "@/components/ui/BuggyRuggyLogo";

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
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-neutral-300">
      {/* Top colorful neon bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-candy-pink via-coral via-sun via-lime via-ocean to-grape" />

      {/* Grain + glow */}
      <span className="bg-grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      <span className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-candy-pink/20 blur-3xl" />
      <span className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-ocean/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <a href="#" className="flex items-center" aria-label="buggy ruggy — inicio">
              <BuggyRuggyLogo imgClassName="h-14" />
            </a>
            <p className="mt-5 max-w-xs text-sm font-semibold leading-relaxed text-neutral-400">
              Alfombras que <span className="text-candy-pink">pintan sonrisas</span>.
              Tufting a mano, color sin límites y mucha actitud callejera.
            </p>
          </div>

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
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/buggy.ruggy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-candy-pink transition-all hover:scale-110 hover:border-candy-pink hover:bg-candy-pink hover:text-white hover:shadow-[0_0_18px_rgba(255,46,122,0.6)]"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:hola@buggyruggy.com"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ocean transition-all hover:scale-110 hover:border-ocean hover:bg-ocean hover:text-white hover:shadow-[0_0_18px_rgba(0,180,216,0.6)]"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

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
