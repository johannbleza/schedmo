import { headerHeight, tileHeight, timePeriods } from "@/lib/constants";
import { Course } from "@/types";
import CourseBlock from "./CourseBlock";

interface ScheduleColumnProps {
  day: string;
  courses: Course[];
}

const ScheduleColumn = ({ day, courses }: ScheduleColumnProps) => {
  const filteredCourses = courses.filter((course) => course.days.includes(day));

  return (
    <div className="flex flex-col relative">
      <div
        className="flex justify-center items-center border-l-1 border-slate-100 "
        style={{ height: headerHeight }}
      >
        {day.slice(0, 3)}
      </div>
      {timePeriods.map((period) => (
        <div
          key={period}
          className="border-l-1 border-slate-100 flex justify-center items-center text-sm"
          style={{ height: tileHeight }}
        ></div>
      ))}
      {/* Course Blocks */}
      {filteredCourses.map((course) => (
        <CourseBlock key={course.id} course={course} />
      ))}
    </div>
  );
};

export default ScheduleColumn;
