import { create } from "zustand";
import {
  JobApplication,
  JobApplicationTag,
  Interview,
  Note,
  Contact,
  SavedCompany,
  Company,
} from "@/types";
import { useJobApplicationsStore } from "./useJobApplicationsStore";
import { useInterviewsStore } from "./useInterviewsStore";
import { useCompaniesStore } from "./useCompaniesStore";
import { useContactsStore } from "./useContactsStore";

interface useGlobalStore {
  jobApplications: JobApplication[];
  tags: JobApplicationTag[];
  interviews: Interview[];
  contacts: Contact[];
  companies: Company[];
  savedCompanies: SavedCompany[];

  setData: (data: JobApplication[]) => void;
  setTags: (tags: JobApplicationTag[]) => void;
  setInterviews: (interviews: Interview[]) => void;
  setContacts: (contacts: Contact[]) => void;
  setCompanies: (companies: Company[]) => void;
  setSavedCompanies: (savedCompanies: SavedCompany[]) => void;
}

export const useGlobalStore = create<useGlobalStore>((set) => ({
  jobApplications: useJobApplicationsStore.getState().jobApplications,
  tags: useJobApplicationsStore.getState().tags,
  interviews: useInterviewsStore.getState().interviews,
  contacts: useContactsStore.getState().contacts,
  companies: useCompaniesStore.getState().companies,
  savedCompanies: useCompaniesStore.getState().savedCompanies,

  setData: (data) => set({ jobApplications: data }),
  setTags: (tags) => set({ tags }),
  setInterviews: (interviews) => set({ interviews }),
  setContacts: (contacts) => set({ contacts }),
  setCompanies: (companies) => set({ companies }),
  setSavedCompanies: (savedCompanies) => set({ savedCompanies }),
}));
