import { Contact } from "@/types";
import { create } from "zustand";

interface useContactsStore {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

export const useContactsStore = create<useContactsStore>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
}));
