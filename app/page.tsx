import Features from "@/components/Features";
import FileInput from "@/components/FileInput";
import { SparklesIcon } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center px-2 py-12 gap-5 max-w-[40rem] mx-auto ">
        <div className="text-2xl md:text-4xl font-bold flex gap-2 items-center text-center">
          AI College Schedule Maker
          <SparklesIcon className="md:size-8" />
        </div>
        <FileInput />
        <Features />
      </div>
    </div>
  );
};

export default page;
