export interface CarpetImage {
  src: string;
  alt: string;
  category: string;
}

export interface WorkshopEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  capacity: number;
  enrolled: number;
  description: string;
  level: "principiante" | "intermedio" | "avanzado";
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  interest: "diseno" | "taller" | "otro";
}
