import { JobApplication, JobApplicationTag } from "@/types";
import { create } from "zustand";

interface useJobApplicationsStore {
  jobApplications: JobApplication[];
  tags: JobApplicationTag[];
  setJobApplications: (jobApplications: JobApplication[]) => void;
  setTags: (tags: JobApplicationTag[]) => void;
}

export const useJobApplicationsStore =
  create<useJobApplicationsStore>((set) => ({
    jobApplications: [],
    tags: [],
    setTags: (tags) => set({ tags }),
    setJobApplications: (jobApplications) => set({ jobApplications }),
  }));
