import { Interview } from "@/types";
import { create } from "zustand";

interface useInterviewsStore {
  interviews: Interview[];
  setInterviews: (interviews: Interview[]) => void;
}

export const useInterviewsStore = create<useInterviewsStore>(
  (set) => ({
    interviews: [],
    setInterviews: (interviews) => set({ interviews }),
  })
);
