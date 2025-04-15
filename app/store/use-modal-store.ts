import { create } from "zustand";

export interface ModalState {
  isModalOpen: boolean;
  isConfirmed?: boolean;

  toggleModal: () => void;
  setConfirmed: (confirmed: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  isConfirmed: false,

  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  setConfirmed: (confirmed: boolean) => set({ isConfirmed: confirmed }),
}));
