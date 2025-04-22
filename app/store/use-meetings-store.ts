import { create } from "zustand";

interface VotingOption {
  option: string;
  votes: number;
}

export interface Meeting {
  id: string;
  name: string;
  nameSurname: string;
  duration: string;
  dateTime: string;
  participants: string[];
  teamName: string;
  stripeColor: string;
  deadline: string;
  votingOptions: VotingOption[];
  timeSlots: string[];
}

interface MeetingsState {
  meetings: Meeting[];
  selectedMeetingId: string | null;
  editingMeetingId: string | null;
  addMeeting: (meeting: Meeting) => void;
  deleteMeeting: (id: string) => void;
  editMeeting: (meeting: Meeting) => void;
  setSelectedMeetingId: (id: string | null) => void;
  setEditingMeeting: (id: string | null) => void;
  resetSelectedMeetingId: () => void;
  voted: boolean;
  setVoted: (voted: boolean) => void;
  updateMeeting: (meeting: Meeting) => void;
}

const initialState = {
  meetings: [
    {
      id: "1",
      name: "Weekly Sprint Planning",
      nameSurname: "John Smith",
      duration: "1 hour",
      dateTime: "21:30-22:30, Thursday, May 4, 2025",
      participants: ["user1@example.com", "user2@example.com"],
      teamName: "Development Team",
      stripeColor: "#FF5733",
      deadline: "May 3, 2025",
      timeSlots: ["14:00-16:30", "17:00-18:30"],
      votingOptions: [
        { option: "May 4, 12:00 - 12:30", votes: 7 },
        { option: "May 4, 14:00 - 14:30", votes: 14 },
        { option: "May 4, 13:00 - 13:30", votes: 1 },
      ],
    },
    {
      id: "2",
      name: "Product Review",
      nameSurname: "Alice Johnson",
      duration: "30 minutes",
      dateTime: "21:30-22:30, Thursday, May 4, 2025",
      participants: ["user3@example.com", "user4@example.com"],
      teamName: "Design Team",
      stripeColor: "#33FF57",
      deadline: "May 3, 2025",
      timeSlots: ["13:00-15:30", "17:00-18:30"],

      votingOptions: [
        { option: "May 4, 12:00 - 12:30", votes: 7 },
        { option: "May 4, 14:00 - 14:30", votes: 14 },
        { option: "May 4, 13:00 - 13:30", votes: 1 },
      ],
    },
    {
      id: "3",
      name: "Client Meeting",
      nameSurname: "Emma Davis",
      duration: "30 minutes",
      dateTime: "21:30-22:30, Thursday, May 4, 2025",
      participants: ["user5@example.com", "user6@example.com"],
      teamName: "Sales Team",
      stripeColor: "#3357FF",
      deadline: "May 3, 2025",
      timeSlots: ["14:00-16:30", "18:00-19:30"],

      votingOptions: [
        { option: "May 4, 12:00 - 12:30", votes: 7 },
        { option: "May 4, 14:00 - 14:30", votes: 14 },
        { option: "May 4, 13:00 - 13:30", votes: 1 },
      ],
    },
  ],
  selectedMeetingId: null,
  editingMeetingId: null,
};

export const useMeetingsStore = create<MeetingsState>((set) => ({
  ...initialState,
  addMeeting: (meeting) =>
    set((state) => ({ meetings: [...state.meetings, meeting] })),
  deleteMeeting: (id) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    })),
  editMeeting: (meeting) =>
    set((state) => ({
      meetings: state.meetings.map((m) => (m.id === meeting.id ? meeting : m)),
    })),
  setSelectedMeetingId: (id) => set({ selectedMeetingId: id }),
  setEditingMeeting: (id) => set(() => ({ editingMeetingId: id })),
  resetSelectedMeetingId: () => set({ selectedMeetingId: null }),
  voted: false,
  setVoted: (voted) => set({ voted }),
  updateMeeting: (meeting) =>
    set((state) => ({
      meetings: state.meetings.map((m) => (m.id === meeting.id ? meeting : m)),
    })),
}));
