import type { CarpetImage, WorkshopEvent } from "@/types";

export const galleryImages: CarpetImage[] = [
  { src: "/images/1115261.jpg", alt: "Alfombra abstracta moderna", category: "moderna" },
  { src: "/images/1129595.jpg", alt: "Diseño geométrico colorido", category: "geométrica" },
  { src: "/images/1153743.jpg", alt: "Alfombra artesanal con textura", category: "artesanal" },
  { src: "/images/1297324.jpg", alt: "Composición de colores vivos", category: "moderna" },
  { src: "/images/1373729.jpg", alt: "Patrón orgánico fluido", category: "artesanal" },
  { src: "/images/1396109.jpg", alt: "Diseño contemporáneo vibrante", category: "moderna" },
  { src: "/images/1501174.jpg", alt: "Textura artesanal detallada", category: "artesanal" },
  { src: "/images/1556400.jpg", alt: "Alfombra de patrón repetitivo", category: "geométrica" },
  { src: "/images/1562321.jpg", alt: "Diseño abstracto colorido", category: "moderna" },
  { src: "/images/167723.jpg", alt: "Alfombra tejida a mano", category: "artesanal" },
  { src: "/images/2041.jpg", alt: "Estilo contemporáneo único", category: "moderna" },
  { src: "/images/2110886.jpg", alt: "Patrón geométrico audaz", category: "geométrica" },
  { src: "/images/2118359.jpg", alt: "Composición de formas y color", category: "moderna" },
  { src: "/images/2330413.jpg", alt: "Textura y profundidad de color", category: "artesanal" },
  { src: "/images/2441344.jpg", alt: "Alfombra moderna minimalista", category: "moderna" },
  { src: "/images/2519560.jpg", alt: "Diseño geométrico intrincado", category: "geométrica" },
  { src: "/images/2660355.jpg", alt: "Patrón colorido único", category: "moderna" },
  { src: "/images/2694533.jpg", alt: "Alfombra artesanal exclusiva", category: "artesanal" },
  { src: "/images/2841209.jpg", alt: "Diseño abstracto expresivo", category: "moderna" },
  { src: "/images/2859791.jpg", alt: "Composición cromática vibrante", category: "moderna" },
  { src: "/images/2877087.jpg", alt: "Alfombra de líneas fluidas", category: "geométrica" },
  { src: "/images/3119871.jpg", alt: "Textura y patrón orgánico", category: "artesanal" },
  { src: "/images/3407840.jpg", alt: "Diseño personalizado único", category: "moderna" },
  { src: "/images/3551359.jpg", alt: "Alfombra contemporánea colorida", category: "moderna" },
];

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
    date: "15 Julio 2026",
    time: "10:00",
    duration: "4 horas",
    capacity: 8,
    enrolled: 5,
    description:
      "Aprende las bases del tufting: manejo de la pistola, tipos de hilo, técnicas de acabado. Te llevas tu alfombra terminada.",
    level: "principiante",
  },
  {
    id: "w2",
    title: "Diseño Geométrico Avanzado",
    date: "22 Julio 2026",
    time: "10:00",
    duration: "6 horas",
    capacity: 6,
    enrolled: 4,
    description:
      "Explora patrones geométricos complejos y técnicas de combinación cromática para crear alfombras con identidad propia.",
    level: "intermedio",
  },
  {
    id: "w3",
    title: "Texturas y Relieves",
    date: "5 Agosto 2026",
    time: "10:00",
    duration: "6 horas",
    capacity: 6,
    enrolled: 2,
    description:
      "Domina las técnicas de alto relieve, mezcla de alturas de hilo y creación de texturas tridimensionales.",
    level: "avanzado",
  },
  {
    id: "w4",
    title: "Tufting para Principiantes",
    date: "19 Agosto 2026",
    time: "16:00",
    duration: "4 horas",
    capacity: 8,
    enrolled: 6,
    description:
      "Taller intensivo vespertino para quienes quieren iniciarse en el arte del tufting. Materiales incluidos.",
    level: "principiante",
  },
];
