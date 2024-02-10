import { Company, SavedCompany } from "@/types";
import { create } from "zustand";

interface useCompaniesStore {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  savedCompanies: SavedCompany[];
  setSavedCompanies: (savedCompanies: SavedCompany[]) => void;
}

export const useCompaniesStore = create<useCompaniesStore>((set) => ({
  companies: [],
  savedCompanies: [],
  setCompanies: (companies) => set({ companies }),
  setSavedCompanies: (savedCompanies) => set({ savedCompanies }),
}));
