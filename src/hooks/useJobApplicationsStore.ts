import { JobApplication, JobApplicationTag } from "@/types";
import { create } from "zustand";

interface useJobApplicationsStore {
  jobApplications: JobApplication[];
  setJobApplications: (jobApplications: JobApplication[]) => void;
}

export const useJobApplicationsStore =
  create<useJobApplicationsStore>((set) => ({
    jobApplications: [],
    setJobApplications: (jobApplications) => set({ jobApplications }),
  }));
