import { create } from "zustand";

interface useCreateNewDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateNewDrawer = create<useCreateNewDrawerStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
