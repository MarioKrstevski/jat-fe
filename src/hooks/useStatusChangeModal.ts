import { JobApplication } from "@/types";
import { create } from "zustand";
export type StatusChangeData = {
  ja: JobApplication;
  status: string;
  nextStep: string;
  statusOptions: string;
};
interface useStatusChangeModalStore {
  data: StatusChangeData;
  setData: (data: StatusChangeData) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStatusChangeModal = create<useStatusChangeModalStore>(
  (set) => ({
    isOpen: false,
    data: {
      ja: {} as JobApplication,
      status: "",
      nextStep: "",
      statusOptions: "",
    },
    setData: (data: StatusChangeData) => set({ data }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
