import ScheduleTable from "@/components/ScheduleTable";
import { Download, Plus, SparkleIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center p-2 max-w-[60rem] mx-auto gap-2">
      <div className="w-full flex justify-between items-center">
        {/* <h1 className="text-2xl font-semibold">Weekly Schedule</h1> */}
        <div className="flex gap-2">
          <Link href="/">
            <button className="flex gap-2 justify-center items-center bg-blue-500 rounded px-2 py-2 text-white text-sm">
              <span>New Schedule</span>
              <Plus className="size-4" />
            </button>
          </Link>
          <button className="flex gap-2 justify-center items-center bg-black rounded px-2 py-1 text-white text-sm">
            <span>Save</span>
            <Download className="size-4" />
          </button>
        </div>
      </div>
      <ScheduleTable />
    </div>
  );
};

export default page;
