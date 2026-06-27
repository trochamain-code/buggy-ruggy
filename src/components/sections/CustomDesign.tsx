import { motion } from "motion/react";
import { Palette, Ruler, Sparkles, Heart, ArrowRight } from "lucide-react";
import { asset } from "@/lib/utils";

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
  return (
    <section
      id="diseno"
      className="relative overflow-hidden bg-gradient-to-b from-lime-light/40 via-yellow-50/60 to-white py-24 sm:py-32"
    >
      {/* Floating decor */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-candy-pink/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[30%] h-40 w-40 rounded-full bg-ocean/20 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[30%] h-28 w-28 rounded-full bg-sun/30 blur-2xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-berry-light px-4 py-1.5 text-sm font-extrabold text-berry">
              <Palette size={16} /> Diseño a Medida
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Tu alfombra,{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-candy-pink via-berry to-grape bg-clip-text text-transparent">
                  tu personalidad
                </span>
              </span>
            </h2>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
              Aburrirse está prohibido. Diseñamos alfombras que{' '}
              <span className="text-coral">gritan color</span> y cuentan{' '}
              <span className="text-ocean">tu historia</span>.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feat, index) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`group rounded-3xl ${feat.bg} p-5 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${feat.iconBg} text-white`}>
                    <feat.icon size={18} />
                  </div>
                  <h3 className="text-sm font-extrabold text-neutral-900">
                    {feat.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-neutral-600">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            {/* Stack of images effect */}
            <div className="relative mx-auto max-w-sm">
              {/* Back card for depth */}
              <div className="absolute -right-4 -top-4 h-full w-full rotate-6 rounded-3xl bg-coral/30 blur-sm" />
              <div className="absolute -left-4 -top-2 h-full w-full -rotate-3 rounded-3xl bg-ocean/30 blur-sm" />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 overflow-hidden rounded-2xl border-4 border-white shadow-xl"
              >
                <img
                  src={asset("/images/2660355.jpg")}
                  alt="Detalle de alfombra"
                  className="aspect-square w-36 object-cover sm:w-44"
                />
              </motion.div>

              {/* Emoji badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sun text-2xl shadow-lg"
              >
                🎨
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
