import { JobApplication } from "@/types";
import { create } from "zustand";

interface useJobApplicationsStore {
  jobApplications: JobApplication[];
  setData: (data: JobApplication[]) => void;
}

export const useJobApplicationsStore =
  create<useJobApplicationsStore>((set) => ({
    jobApplications: [],
    setData: (data) => set({ jobApplications: data }),
  }));
