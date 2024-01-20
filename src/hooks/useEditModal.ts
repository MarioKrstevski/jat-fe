import { JobApplication } from "@/types";
import { create } from "zustand";

interface useEditModalStore {
  data: {
    ja: JobApplication | null;
  };
  isOpen: boolean;
  setData: (ja: JobApplication) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useEditModal = create<useEditModalStore>((set) => ({
  isOpen: false,
  data: {
    ja: null,
  },
  setData: (ja: JobApplication) => set({ data: { ja } }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
