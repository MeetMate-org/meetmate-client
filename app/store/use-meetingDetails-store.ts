import { create } from "zustand";

export interface MeetingDetailsModalStore {
  isModalOpen: boolean;
  toggleModal: () => void;
  setMeetId: (newMeetId: string) => void;
  meetId: string;
}

export const useMeetingDetailsModalStore = create<MeetingDetailsModalStore>(
  (set) => ({
    isModalOpen: false,
    meetId: "",
    setMeetId: (newMeetId: string) =>
      set(() => ({
        meetId: newMeetId,
      })),
    toggleModal: () =>
      set((state) => ({
        isModalOpen: !state.isModalOpen,
      })),
  })
);
