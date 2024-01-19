import { JobApplication } from "@/types";
import { create } from "zustand";
export type InterviewDateChangeData = {
  ja: JobApplication;
  date: Date | undefined;
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
      date: undefined,
    },
    setData: (data: InterviewDateChangeData) => set({ data }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
