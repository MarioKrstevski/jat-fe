import { Company } from "@/types";
import { create } from "zustand";

interface useCompaniesStore {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
}

export const useCompaniesStore = create<useCompaniesStore>((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
}));
