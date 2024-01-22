import { JobApplication } from "@/types";
import { create } from "zustand";
export type InterviewDateChangeData = {
  ja: JobApplication;
  nextInterviewDate: Date | undefined | null;
};
interface useInterviewDateChangeModalStore {
  data: InterviewDateChangeData;
  setData: (data: InterviewDateChangeData) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useInterviewDateChangeModal =
  create<useInterviewDateChangeModalStore>((set) => ({
    isOpen: false,
    data: {
      ja: {} as JobApplication,
      nextInterviewDate: undefined,
    },
    setData: (data: InterviewDateChangeData) => set({ data }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
