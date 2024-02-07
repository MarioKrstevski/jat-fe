import { Company } from "@/types";
import { create } from "zustand";

interface useCompaniesStore {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  savedCompanies: any[];
  setSavedCompanies: (savedCompanies: any[]) => void;
}

export const useCompaniesStore = create<useCompaniesStore>((set) => ({
  companies: [],
  savedCompanies: [],
  setCompanies: (companies) => set({ companies }),
  setSavedCompanies: (savedCompanies) => set({ savedCompanies }),
}));
