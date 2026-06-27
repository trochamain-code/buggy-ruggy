import { create } from "zustand";

interface UIState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeGalleryFilter: string;
  setActiveGalleryFilter: (filter: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  activeGalleryFilter: "todas",
  setActiveGalleryFilter: (filter) => set({ activeGalleryFilter: filter }),
}));
