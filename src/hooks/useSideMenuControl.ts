import { create } from "zustand";

type SideMenuState = "hidden" | "open";

interface SideMenuControl {
  state: SideMenuState;
  open: () => void;
  hide: () => void;
  makeSideMenu: (newState: SideMenuState) => void;
}

export const useSideMenuControl = create<SideMenuControl>((set) => ({
  state: "open",
  open: () => set({ state: "open" }),
  hide: () => set({ state: "hidden" }),
  makeSideMenu: (newState: SideMenuState) => set({ state: newState }),
}));
