import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Users, ChevronRight, Star, Paintbrush } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/Dialog";
import { workshopEvents } from "@/lib/data";
import type { WorkshopEvent } from "@/types";

const levelConfig: Record<
  WorkshopEvent["level"],
  { label: string; emoji: string; border: string; bg: string; text: string; badge: string }
> = {
  principiante: {
    label: "Principiante",
    emoji: "🌱",
    border: "border-lime",
    bg: "bg-lime-light",
    text: "text-lime",
    badge: "bg-lime text-white",
  },
  intermedio: {
    label: "Intermedio",
    emoji: "🎨",
    border: "border-ocean",
    bg: "bg-ocean-light",
    text: "text-ocean",
    badge: "bg-ocean text-white",
  },
  avanzado: {
    label: "Avanzado",
    emoji: "🔥",
    border: "border-grape",
    bg: "bg-grape-light",
    text: "text-grape",
    badge: "bg-grape text-white",
  },
};

const cardColors = [
  "border-candy-pink bg-candy-pink-light/30",
  "border-ocean bg-ocean-light/30",
  "border-sun bg-sun-light/30",
  "border-lime bg-lime-light/30",
];

export function Workshops() {
  const [selected, setSelected] = useState<WorkshopEvent | null>(null);

  return (
    <section
      id="talleres"
      className="relative overflow-hidden bg-gradient-to-b from-white via-berry-light/20 to-coral-light/30 py-24 sm:py-32"
    >
      {/* Decorative splatters */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute left-[15%] top-[10%] h-24 w-24 rounded-full bg-candy-pink/15 blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 0.8, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute right-[10%] bottom-[20%] h-36 w-36 rounded-full bg-ocean/15 blur-xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-sun-light px-4 py-1.5 text-sm font-extrabold text-sun">
            <Paintbrush size={16} /> Talleres Creativos
          </span>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Aprende, crea,{' '}
            <span className="bg-gradient-to-r from-coral via-candy-pink to-grape bg-clip-text text-transparent">
              ensúciate las manos
            </span>
          </h2>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
            Talleres presenciales donde{' '}
            <span className="text-coral">te diviertes</span> y te llevas tu
            propia alfombra a casa. ¡No necesitas experiencia!
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workshopEvents.map((workshop, index) => {
            const level = levelConfig[workshop.level];
            const spotsLeft = workshop.capacity - workshop.enrolled;
            return (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 30, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div
                  className={`group h-full rounded-3xl border-2 ${cardColors[index % 4] || cardColors[0]} p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl cursor-pointer`}
                  onClick={() => setSelected(workshop)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelected(workshop);
                  }}
                >
                  {/* Top: emoji + level */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl">{level.emoji}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${level.badge}`}
                    >
                      {level.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-neutral-900">
                    {workshop.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-neutral-500">
                    {workshop.description}
                  </p>

                  {/* Spots gauge */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-neutral-400">Plazas</span>
                      <span className={spotsLeft <= 2 ? "text-candy-pink" : "text-lime"}>
                        {spotsLeft} libres
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-neutral-200">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(workshop.enrolled / workshop.capacity) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${spotsLeft <= 2 ? "bg-candy-pink" : "bg-lime"}`}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-4 space-y-2 border-t border-neutral-200/50 pt-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-700">
                      <Calendar size={15} className="text-coral" />
                      {workshop.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-700">
                      <Clock size={15} className="text-ocean" />
                      {workshop.time} — {workshop.duration}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-1 rounded-2xl bg-white py-2.5 text-sm font-extrabold text-neutral-700 shadow-sm transition-colors group-hover:bg-candy-pink group-hover:text-white">
                    Ver más
                    <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                <button className="flex-1 rounded-2xl bg-candy-pink py-3.5 text-base font-extrabold text-white shadow-candy transition-all hover:scale-105">
                  ¡Reservar Plaza!
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-2xl border-2 border-neutral-200 bg-white px-6 py-3.5 text-base font-extrabold text-neutral-600 transition-all hover:bg-neutral-100"
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </Dialog>
      </div>
    </section>
  );
}
