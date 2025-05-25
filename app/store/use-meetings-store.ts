import { create } from "zustand";

export interface Meeting {
  id: string;
  _id: string;
  createdAt: string;
  description: string;
  endTime: string;
  organizer: string;
  organizerName: string;
  participants: string[];
  startTime: string;
  duration: number;
  times: {
    value: string;
    votes: number;
  }[];
  title: string;
  link: string;
  color?: string;
  teamName?: string;
  deadline?: string;
  newStartTime?: string;
  votingOptions?: { option: string; votes: number }[];
}

interface MeetingsState {
  meetings: Meeting[];
  setMeetings: (meetings: Meeting[]) => void;
  selectedMeetingId: string | null;
  editingMeetingId: string | null;
  addMeeting: (meeting: Meeting) => void;
  setSelectedMeetingId: (id: string | null) => void;
  voted: boolean;
  setVoted: (voted: boolean) => void;
}

const initialState = {
  meetings: [],
  selectedMeetingId: null,
  editingMeetingId: null,
};

export const useMeetingsStore = create<MeetingsState>((set) => ({
  ...initialState,
  setMeetings: (meetings: Meeting[]) => set({ meetings }),
  addMeeting: (meeting) =>
    set((state) => ({ meetings: [...state.meetings, meeting] })),
  deleteMeeting: (id: string) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    })),
  editMeeting: (meeting: Meeting) =>
    set((state) => ({
      meetings: state.meetings.map((m) => (m.id === meeting.id ? meeting : m)),
    })),
  setSelectedMeetingId: (id) => set({ selectedMeetingId: id }),
  setEditingMeeting: (id: string) => set(() => ({ editingMeetingId: id })),
  voted: false,
  setVoted: (voted) => set({ voted }),
}));
