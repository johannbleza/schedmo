import { headerHeight, tileHeight } from "@/lib/constants";
import { timeToMeridiem, timeToMinutes } from "@/lib/utils/time";
import { Course } from "@/types";

interface CourseBlockProps {
  course: Course;
}

const CourseBlock = ({ course }: CourseBlockProps) => {
  const { start_time, end_time, course_code, location } = course;
  const startTime = timeToMinutes(start_time) / 60;
  const endTime = timeToMinutes(end_time) / 60;
  const totalTime = endTime - startTime;
  return (
    <div
      className={`absolute border border-slate-100 bg-blue-200 text-xs flex flex-col justify-center items-center w-full overflow-hidden text-center ${course.color}`}
      style={{
        top: `calc(${headerHeight} + (${parseInt(tileHeight) / 2 + (startTime - 7) * parseInt(tileHeight)}px)`,
        height: `${parseInt(tileHeight) * totalTime}px`,
      }}
    >
      <p
        className={
          totalTime != 1
            ? "text-[6px] font-bold md:text-[8px]"
            : "text-[6px] font-bold"
        }
      >
        {course_code}
      </p>

      <div
        className={totalTime != 1 ? "text-[6px] md:text-[8px]" : "text-[6px]  "}
      >
        <p>{location}</p>
        <p>{timeToMeridiem(start_time)} to</p>
        <p>{timeToMeridiem(end_time)}</p>
      </div>
    </div>
  );
};

export default CourseBlock;
