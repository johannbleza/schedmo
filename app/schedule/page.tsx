"use client";
import ScheduleTable from "@/components/ScheduleTable";
import { Download, Plus } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { domToPng } from "modern-screenshot";

const Page = () => {
  const scheduleRef = useRef(null);

  const handleSaveAsImage = async () => {
    if (!scheduleRef.current) return;

    try {
      const dataUrl = await domToPng(scheduleRef.current, {
        quality: 1,
        backgroundColor: "#ffffff",
        scale: 2, // Higher resolution
        style: {},
      });

      // Create download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `schedule-${new Date().toISOString().split("T")[0]}.png`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-2 py-10  max-w-[40rem] mx-auto gap-3">
      <div className="w-full flex justify-center md:justify-between items-end">
        <h1 className="font-semibold text-4xl md:text-4xl">Weekly Schedule</h1>
        <div className="hidden md:flex gap-2">
          <button
            onClick={handleSaveAsImage}
            className="flex gap-2 justify-center items-center rounded p-2 text-sm  bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer hover:opacity-75"
          >
            <span>Save as Image</span>
            <Download className="size-4" />
          </button>
          <Link href="/">
            <button className="flex gap-2 bg-blue-500 border border-blue-600 text-white justify-center items-center p-2 text-sm rounded cursor-pointer hover:opacity-75">
              <span>Create New</span>
              <Plus className="size-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Wrap ScheduleTable with ref for capturing */}
      <div ref={scheduleRef} className="w-full">
        <ScheduleTable />
      </div>
      <div className="flex flex-col gap-2 w-full md:hidden">
        <button
          onClick={handleSaveAsImage}
          className="flex gap-2 justify-center items-center rounded-full p-2 hover:bg-gray-800 transition-colors bg-slate-100 border border-slate-200 text-slate-800 "
        >
          <span>Save as Image</span>
          <Download className="size-4" />
        </button>
        <button className="rounded  bg-full">
          <Link
            href="/"
            className="flex gap-2 bg-blue-500 border border-blue-600 text-white justify-center items-center p-2 rounded-full"
          >
            <span>Create New</span>
            <Plus className="size-4" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
