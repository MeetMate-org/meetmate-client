import { create } from "zustand";

interface EditProfileModalState {
  isEditProfileModalOpen: boolean;
  openEditProfileModal: () => void;
  closeEditProfileModal: () => void;
}

export const useEditProfileModalStore = create<EditProfileModalState>((set) => ({
  isEditProfileModalOpen: false,
  openEditProfileModal: () => set({ isEditProfileModalOpen: true }),
  closeEditProfileModal: () => set({ isEditProfileModalOpen: false }),
}));