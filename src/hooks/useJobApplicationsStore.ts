import { JobApplication, JobApplicationTag } from "@/types";
import { create } from "zustand";

interface useJobApplicationsStore {
  jobApplications: JobApplication[];
  tags: JobApplicationTag[];
  setData: (data: JobApplication[]) => void;
  setTags: (tags: JobApplicationTag[]) => void;
}

export const useJobApplicationsStore =
  create<useJobApplicationsStore>((set) => ({
    jobApplications: [],
    tags: [],
    setTags: (tags) => set({ tags }),
    setData: (data) => set({ jobApplications: data }),
  }));
