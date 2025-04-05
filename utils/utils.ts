export const colorPurple = "#5E00FF";
export const colorDarkBlue = "#071C37";
export const colorGray = "#D9D9D9";
export const colorPrimary = "#21334C";

interface Event {
  id: number;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
}

export const DAYS = [
  { label: "Mon", date: "May 4" },
  { label: "Tue", date: "May 5" },
  { label: "Wed", date: "May 6" },
  { label: "Thu", date: "May 7" },
  { label: "Fri", date: "May 8" },
  { label: "Sat", date: "May 9" },
  { label: "Sun", date: "May 10" },
];

export const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export const SAMPLE_EVENTS: Event[] = [
  {
    id: 1,
    title: "Meeting Name",
    day: "Mon",
    startTime: "08:00",
    endTime: "08:30",
  },
  {
    id: 2,
    title: "Meeting Name",
    day: "Tue",
    startTime: "09:00",
    endTime: "10:00",
  },
  {
    id: 3,
    title: "Meeting Name",
    day: "Wed",
    startTime: "11:00",
    endTime: "12:00",
  },
  {
    id: 4,
    title: "Meeting Name",
    day: "Thu",
    startTime: "12:00",
    endTime: "13:00",
  },
];
