import { Instagram, Mail, MapPin, Phone, Heart } from "lucide-react";
import { motion } from "motion/react";
import { Wordmark } from "@/components/ui/Wordmark";
import { SevillaClock } from "@/components/ui/SevillaClock";
import { SplitText } from "@/components/ui/SplitText";
import { MorphingYarn } from "@/components/ui/MorphingYarn";

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
    {
      label: "Instagram",
      href: "https://www.instagram.com/buggy.ruggy",
      icon: Instagram,
      color: "hover:text-candy-pink",
      shadow: "hover:shadow-[0_0_18px_rgba(255,46,122,0.6)]",
    },
    {
      label: "Email",
      href: "mailto:hola@buggyruggy.com",
      icon: Mail,
      color: "hover:text-ocean",
      shadow: "hover:shadow-[0_0_18px_rgba(0,180,216,0.6)]",
    },
  ],
};

export function Footer() {
  return (
    <footer className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950 text-neutral-300">
      <div className="h-1.5 w-full bg-gradient-to-r from-candy-pink via-coral via-sun via-lime via-ocean to-grape" />

      <span className="bg-grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
      <span className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-candy-pink/20 blur-3xl" />
      <span className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-ocean/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* CTA section */}
        <div className="mb-10 text-center">
          <SplitText
            as="h2"
            type="words"
            stagger={0.06}
            duration={0.6}
            from={{ opacity: 0, y: 40, rotateX: 0 }}
            className="font-climate mt-8 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            ¿List@ para tejer la tuya?
          </SplitText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 text-lg font-semibold text-neutral-400"
          >
            Reserva tu taller o pide tu diseño personalizado.{" "}
            <span className="text-candy-pink">Sin compromiso</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* Wordmark — DrawSVG on scroll */}
        <div className="mb-8">
          <Wordmark />
        </div>

        {/* Grid */}
        <div className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
              <MorphingYarn />
              <SevillaClock />
            </div>
          </div>

          <div>
            <h4 className="font-street mb-4 text-xl uppercase tracking-[0.15em] text-grape">
              Síguenos
            </h4>
            <div className="space-y-4">
              {footerLinks.social.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 6, scale: 1.05 }}
                  className={`flex items-center gap-2 font-street text-xl uppercase tracking-[0.1em] text-neutral-400 transition-all ${s.color} ${s.shadow}`}
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                  <span>{s.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
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
