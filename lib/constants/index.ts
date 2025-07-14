import { Upload, Sparkles, CalendarDays } from "lucide-react";

export const fixedPrompt: string = `Extract the course schedule data from this image. Return a empty array if the image is not related to a schedule or course. Provide the output as a JSON array of objects.
  Each object should strictly follow this schema:
  - 'id' (a unique string for each course generate this randomly dont base on the image)
  - 'name' (the course title)
  - 'course_code' (the course code)
  - 'instructor' (if available, otherwise 'N/A')
  - 'location' (the room)
  - 'days' (an array of full day names, e.g., ["Monday", "Wednesday", "Friday"])
  - 'start_time' (the 'From' time in "HH:MM" 24-hour format)
  - 'end_time' (the 'To' time in "HH:MM" 24-hour format)
  - 'schedule_id' (use the 'Class ID' as the schedule_id).
  - 'color' (a Tailwind CSS background color string ending in '-100'. Randomly select a color for each unique course block from the "Gentle Pastels" theme. **Ensure that colors are not reused for different course blocks within the schedule.**

    Gentle Pastels Theme Colors:
    ["bg-pink-100", "bg-purple-100", "bg-sky-100", "bg-teal-100", "bg-lime-100", "bg-amber-100", "bg-rose-100"]

  Ensure the values are extracted accurately from the table.`;

export const features = [
  {
    name: "Upload Schedule",
    description: "Easily import your COR or class schedule.",
    icon: Upload,
  },
  {
    name: "AI-Powered Extraction",
    description: "Intelligently parse and organize course details.",
    icon: Sparkles,
  },
  {
    name: "Organized Timetable",
    description: "View your classes in a clear, organized order.",
    icon: CalendarDays,
  },
];

export const days = [
  {
    id: "monday",
    label: "Monday",
  },
  {
    id: "tuesday",
    label: "Tuesday",
  },
  {
    id: "wednesday",
    label: "Wednesday",
  },
  {
    id: "thursday",
    label: "Thursday",
  },
  {
    id: "friday",
    label: "Friday",
  },
  {
    id: "saturday",
    label: "Saturday",
  },
  // {
  //   id: "sunday",
  //   label: "Sunday",
  // },
];
export const timePeriods = [
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const headerHeight = "52px";
export const tileHeight = "40px";
