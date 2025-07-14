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
      // Generate image using modern-screenshot
      const dataUrl = await domToPng(scheduleRef.current, {
        quality: 1,
        backgroundColor: "#ffffff",
        scale: 2, // Higher resolution
        style: {
          // Any additional styles you want to apply
        },
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
      // You might want to show a toast notification here
    }
  };

  return (
    <div className="min-h-dvh flex flex-col justify-center items-center px-2 py-4 max-w-[60rem] mx-auto gap-3">
      <div className="w-full flex justify-center md:justify-between items-center">
        <h1 className="font-semibold text-4xl md:text-4xl">Weekly Schedule</h1>
        <div className="hidden md:flex gap-2">
          <Link href="/">
            <button className="flex gap-2 justify-center items-center bg-blue-400 rounded px-2 py-2 text-white text-sm">
              <span>Create New</span>
              <Plus className="size-4" />
            </button>
          </Link>
          <button
            onClick={handleSaveAsImage}
            className="flex gap-2 justify-center items-center bg-black rounded p-2 text-white text-sm hover:bg-gray-800 transition-colors"
          >
            <span>Save as Image</span>
            <Download className="size-4" />
          </button>
        </div>
      </div>

      {/* Wrap ScheduleTable with ref for capturing */}
      <div ref={scheduleRef} className="w-full">
        <ScheduleTable />
      </div>
      <div className="flex flex-col gap-2 w-full md:hidden">
        <button
          onClick={handleSaveAsImage}
          className="flex gap-2 justify-center items-center bg-black rounded p-2 text-white text-sm hover:bg-gray-800 transition-colors"
        >
          <span>Save as Image</span>
          <Download className="size-4" />
        </button>
        <button className="bg-blue-400 rounded text-white text-sm bg-full">
          <Link href="/" className="flex gap-2 justify-center items-center p-2">
            <span>Create New</span>
            <Plus className="size-4" />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Page;
