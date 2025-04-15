import { create } from 'zustand';

interface ScheduleModalState {
  isScheduleModalOpen: boolean;
  toggleScheduleModal: () => void;
}

export const useScheduleModalStore = create<ScheduleModalState>((set) => ({
  isScheduleModalOpen: false,
  toggleScheduleModal: () => set((state) => ({ isScheduleModalOpen: !state.isScheduleModalOpen }))
})); 