import type { CarpetImage, WorkshopEvent } from "@/types";

const allImageFiles = [
  "1115261", "1129595", "1153743", "1297324", "1373729", "1396109", "1501174",
  "1556400", "1562321", "167723", "2041", "2110886", "2118359", "2330413",
  "2441344", "2519560", "2660355", "2694533", "2841209", "2859791", "2877087",
  "3119871", "3407840", "3551359", "3578692", "3589099", "3637227", "3663435",
  "3682238", "3752459", "3842114", "4098535", "4506875", "4592476", "4692421",
  "4764302", "4788627", "4895444", "4960254", "4994252", "499857", "5035711",
  "5052886", "5069105", "509185", "5384180", "5459640", "5492502", "553066",
  "5683638", "5949008", "6025313", "6050080", "6202621", "6293943", "6469166",
  "6539144", "6622473", "6806909", "6817235", "6976610", "7047780", "7099430",
  "7120535", "7177899", "718574", "7187663", "7391434", "744504", "7504313",
  "7544478", "772423", "79780", "8017573", "8376092", "8671779", "8750856",
  "8874904", "911180", "9203645", "9276939", "9284890", "929728", "9301480",
  "9344154", "9414992", "9475470", "9703315", "9844175", "9873013", "9876669",
  "9892127", "9986486",
];

const categories: CarpetImage["category"][] = [
  "moderna", "geométrica", "artesanal",
];

export const galleryImages: CarpetImage[] = allImageFiles.map((file, i) => ({
  src: `/images/${file}.jpg`,
  alt: `Alfombra diseño ${i + 1}`,
  category: categories[i % 3]!,
}));

export const galleryCategories = [
  { id: "todas", label: "Todas" },
  { id: "moderna", label: "Modernas" },
  { id: "geométrica", label: "Geométricas" },
  { id: "artesanal", label: "Artesanales" },
];

export const workshopEvents: WorkshopEvent[] = [
  {
    id: "w1",
    title: "Iniciación al Tufting",
    date: "2 Julio 2026",
    time: "10:00",
    duration: "4 horas",
    capacity: 8,
    enrolled: 4,
    description:
      "Aprende las bases del tufting: manejo de la pistola, tipos de hilo y técnicas de acabado. Te llevas tu alfombra terminada.",
    level: "principiante",
  },
  {
    id: "w2",
    title: "Diseño Geométrico",
    date: "9 Julio 2026",
    time: "10:00",
    duration: "4 horas",
    capacity: 6,
    enrolled: 2,
    description:
      "Explora patrones geométricos y combinaciones cromáticas para crear alfombras con identidad propia.",
    level: "intermedio",
  },
  {
    id: "w3",
    title: "Tufting Express",
    date: "11 Julio 2026",
    time: "16:00",
    duration: "3 horas",
    capacity: 8,
    enrolled: 5,
    description:
      "Taller intensivo de tarde. Ideal para venir con amigos y llevarte una pieza pequeña terminada.",
    level: "principiante",
  },
  {
    id: "w4",
    title: "Texturas y Relieves",
    date: "16 Julio 2026",
    time: "10:00",
    duration: "5 horas",
    capacity: 6,
    enrolled: 3,
    description:
      "Domina técnicas de alto relieve, mezcla de alturas de hilo y creación de texturas tridimensionales.",
    level: "avanzado",
  },
  {
    id: "w5",
    title: "Alfombra XXL",
    date: "18 Julio 2026",
    time: "10:00",
    duration: "6 horas",
    capacity: 4,
    enrolled: 1,
    description:
      "Atrévete con un proyecto grande. Diseña y crea una alfombra de gran formato con acompañamiento personalizado.",
    level: "avanzado",
  },
  {
    id: "w6",
    title: "Tufting para Principiantes",
    date: "30 Julio 2026",
    time: "16:00",
    duration: "4 horas",
    capacity: 8,
    enrolled: 6,
    description:
      "Taller intensivo para iniciarte en el arte del tufting. Materiales incluidos. ¡Casi lleno!",
    level: "principiante",
  },
];
