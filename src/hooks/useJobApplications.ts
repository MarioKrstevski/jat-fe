import { JobApplication } from "@/types";
import { create } from "zustand";

interface useJobApplicationsStore {
  ja: JobApplication[];
  setData: (data: JobApplication[]) => void;
}

export const useJobApplications = create<useJobApplicationsStore>(
  (set) => ({
    ja: [],
    setData: (data) => set({ ja: data }),
  })
);
