import Features from "@/components/Features";
import FileInput from "@/components/FileInput";

const page = () => {
  return (
    <div>
      <div className="min-h-dvh pt-24 flex flex-col items-center p-2 gap-4 max-w-[40rem] mx-auto">
        <h1 className="text-3xl font-bold">AI College Schedule Maker</h1>
        <FileInput />
        <Features />
      </div>
    </div>
  );
};

export default page;
