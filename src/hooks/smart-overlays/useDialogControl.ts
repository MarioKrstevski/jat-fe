import { create } from "zustand";
const validModalNames = new Set([
  "createJA",
  "editJA",
  "editStatus",
  "editInterviewDate",
]);
type ModalName =
  | "createJA"
  | "editJA"
  | "editStatus"
  | "editInterviewDate";

type ModalData = {
  value?: any;
};

interface useDialogControlStore {
  modals: Partial<{
    [key in ModalName]: {
      isOpen: boolean;
      data: ModalData;
    };
  }>;
  openModal: (modalName: ModalName, data?: ModalData) => void;
  closeModal: (modalName: ModalName) => void;
}

export const useDialogControl = create<useDialogControlStore>(
  (set) => ({
    modals: {},
    openModal: (modalName: ModalName, data = {}) => {
      if (!validModalNames.has(modalName)) {
        console.warn(`Invalid modal name: ${modalName}`);
        return;
      }
      set((state) => ({
        modals: {
          ...state.modals,
          [modalName]: {
            isOpen: true,
            data,
          },
        },
      }));
    },
    closeModal: (modalName: ModalName) => {
      if (!validModalNames.has(modalName)) {
        console.warn(`Invalid modal name: ${modalName}`);
        return;
      }
      set((state) => ({
        modals: {
          ...state.modals,
          [modalName]: {
            ...state.modals[modalName],
            isOpen: false,
          },
        },
      }));
    },
  })
);
