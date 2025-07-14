import Features from "@/components/Features";
import FileInput from "@/components/FileInput";
import { SparklesIcon } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center px-2 py-6 md:py-16 gap-4 max-w-[50rem] mx-auto">
        <div className="text-2xl md:text-3xl font-bold flex gap-2 items-center">
          AI College Schedule Maker
          <SparklesIcon />
        </div>
        <FileInput />
        <Features />
      </div>
    </div>
  );
};

export default page;
