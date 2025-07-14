"use client";

import { days, headerHeight, tileHeight, timePeriods } from "@/lib/constants";
import { timeToMeridiem } from "@/lib/utils/time";
import ScheduleColumn from "./ScheduleColumn";
import { useEffect, useState } from "react";
import { Course } from "@/types";

const ScheduleTable = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("apiResponse") ?? "[]";
    setCourses(JSON.parse(stored));
  }, []);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg">
      <div className="overflow-x-scroll">
        <div>
          <div className="grid grid-cols-7">
            <div className="flex flex-col">
              <div
                className="flex justify-center items-center"
                style={{ height: headerHeight }}
              >
                Time
              </div>
              {timePeriods.map((period) => (
                <div
                  key={period}
                  className="flex  justify-center items-center text-[8px] md:text-[10px]"
                  style={{ height: tileHeight }}
                >
                  {timeToMeridiem(period)}
                </div>
              ))}
            </div>
            {days.map((day) => (
              <ScheduleColumn key={day.id} day={day.label} courses={courses} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
