import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Phone, MapPin, Heart } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { asset } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "¡Dinos tu nombre! (mín. 2 letras)"),
  email: z.string().email("¡Ups! ¿Un email de verdad?"),
  phone: z.string().optional(),
  interest: z.enum(["diseno", "taller", "otro"], {
    errorMap: () => ({ message: "¡Elige una opción!" }),
  }),
  message: z.string().min(10, "¡Cuéntanos más! (mín. 10 caracteres)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      interest: "diseno",
    },
  });

  const interest = watch("interest");

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset();
    alert("¡Gracias! Te contactaremos en 24-48 horas. 🎉");
  };

  const interestOptions = [
    { value: "diseno", label: "🎨 Diseño a Medida", emoji: "🎨" },
    { value: "taller", label: "🧶 Quiero un Taller", emoji: "🧶" },
    { value: "otro", label: "💬 Otra Cosa", emoji: "💬" },
  ];

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-br from-coral-light/30 via-white to-ocean-light/30 py-24 sm:py-32"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ff2e7a 2px, transparent 2px), radial-gradient(circle, #00b4d8 2px, transparent 2px)",
            backgroundSize: "50px 50px, 70px 70px",
            backgroundPosition: "0 0, 25px 25px",
          }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -right-20 top-[20%] h-64 w-64 rounded-full bg-candy-pink/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-20 bottom-[10%] h-56 w-56 rounded-full bg-ocean/15 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-coral-light px-4 py-1.5 text-sm font-extrabold text-coral">
              <Heart size={16} /> Contacto
            </span>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              ¿Hablamos de{' '}
              <span className="bg-gradient-to-r from-candy-pink via-coral to-sun bg-clip-text text-transparent">
                tu proyecto
              </span>
              ?
            </h2>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-neutral-500">
              Sin compromiso, solo{' '}
              <span className="text-candy-pink">ideas chulas</span>. Cuéntanos
              qué tienes en mente y le damos forma juntos.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: Mail,
                  text: "hola@tapizalfombras.com",
                  label: "Email",
                  color: "bg-candy-pink text-white",
                },
                {
                  icon: Phone,
                  text: "+34 612 345 678",
                  label: "Teléfono",
                  color: "bg-ocean text-white",
                },
                {
                  icon: MapPin,
                  text: "Calle del Arte, 42, Madrid",
                  label: "Taller",
                  color: "bg-grape text-white",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color} shadow-lg`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                      {item.label}
                    </p>
                    <p className="text-base font-bold text-neutral-700">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border-4 border-white shadow-xl">
              <img
                src={asset("/images/2519560.jpg")}
                alt="Detalle de taller artesanal"
                className="h-56 w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border-2 border-neutral-200 bg-white p-8 shadow-xl"
              noValidate
            >
              <h3 className="mb-6 text-2xl font-extrabold text-neutral-900">
                ✏️ Escríbenos
              </h3>

              {/* Interest selector */}
              <div className="mb-5 flex flex-wrap gap-2">
                {interestOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-full px-4 py-2.5 text-sm font-extrabold transition-all duration-200 ${
                      interest === option.value
                        ? "bg-candy-pink text-white shadow-candy scale-105"
                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:scale-105"
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register("interest")}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.interest && (
                <p className="mb-3 rounded-xl bg-candy-pink-light px-3 py-1.5 text-xs font-bold text-candy-pink">
                  {errors.interest.message}
                </p>
              )}

              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="👋 Tu nombre"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs font-bold text-candy-pink">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="📧 Email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-bold text-candy-pink">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="📱 Teléfono (opcional)"
                    {...register("phone")}
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="💭 Cuéntanos tu idea: colores, tamaños, locuras..."
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs font-bold text-candy-pink">
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-candy-pink to-coral py-4 text-lg font-extrabold text-white shadow-candy transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Enviando... ✨"
                ) : (
                  <>
                    Enviar Mensaje
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
