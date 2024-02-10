import { Note } from "@/types";
import { create } from "zustand";

interface useNotesStore {}

export const useNotesStore = create<useNotesStore>((set) => ({}));
