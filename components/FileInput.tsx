"use client";
import { Course } from "@/types";
import { ImageIcon, SparklesIcon, Upload, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const FileInput = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File | undefined) => {
    if (file && file.type.startsWith("image/")) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(""); // Clear any previous errors when a new file is selected
      setApiResponse(""); // Clear previous API response
    } else {
      setFile(null);
      setImagePreviewUrl(null);
      setError("Please select a valid image file (e.g., JPEG, PNG, GIF).");
      setApiResponse(""); // Clear previous API response
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files?.[0]);
  };

  const handleAreaClick = () => {
    fileInputRef.current!.click();
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreviewUrl(null);
    setApiResponse("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image file first.");
      return;
    }

    setIsLoading(true);
    setApiResponse("");
    setError("");

    try {
      const base64ImageData: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve((reader.result as string).split(",")[1]);
        };
        reader.onerror = (error) => reject("Failed to read file: " + error);
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/analyze-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: base64ImageData,
          mimeType: file.type,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze schedule");
      }

      const parsedCourses: Course[] = result.courses;
      setApiResponse(JSON.stringify(parsedCourses, null, 2));
    } catch (err: unknown) {
      console.error("Error analyzing schedule:", err);
      if (err instanceof Error) {
        setError(
          err.message || "An unexpected error occurred during API call.",
        );
      } else {
        setError("An unexpected error occurred during API call.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (apiResponse) {
      const response = JSON.parse(apiResponse);
      if (response.length == 0) {
        setError("No courses found in the image.");
      } else {
        localStorage.setItem("apiResponse", apiResponse);
        router.push("/schedule");
      }
    }
  }, [router, apiResponse]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const pastedFile = item.getAsFile();
          if (pastedFile) {
            processFile(pastedFile);
            break;
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  return (
    <div className="px-2 py-4 flex flex-col justify-center items-center text-center border-1 border-slate-200 rounded-lg w-full gap-2 bg-white">
      <div className="font-bold text-lg flex gap-2 justify-center items-center">
        <Upload />
        <h1>Upload Your Schedule</h1>
      </div>
      <p className="text-xs text-slate-400">
        Take a photo or upload your schedule from your COR
      </p>
      {/* Upload Area */}
      {imagePreviewUrl != null ? (
        <div className="w-full relative flex flex-col gap-2">
          <Image
            height={200}
            width={200}
            src={imagePreviewUrl}
            alt="Image Preview"
            className="w-full h-60 rounded-lg shadow object-cover"
          />

          <button
            className="absolute top-1 right-1 bg-black text-white rounded-full p-1 hover:opacity-75 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <XIcon className="size-3" />
          </button>
          <button
            onClick={handleSubmit}
            className={`w-full flex justify-center p-3  rounded-full shadow-lg text-white
              ${isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"}
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <div className="flex gap-2">
                <SparklesIcon />
                <span>Generate Schedule</span>
              </div>
            )}
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col gap-1 justify-center items-center px-2 py-6 w-full border-2 border-dashed border-slate-200 rounded-lg mt-4 hover:border-slate-400 cursor-pointer"
          onClick={handleAreaClick}
        >
          <input
            type="file"
            // accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <div className="p-3 bg-slate-100 rounded-full text-slate-400">
            <ImageIcon className="size-8" />
          </div>
          <h1>Select an image or paste from clipboard</h1>
          <h2 className="text-sm text-slate-400">
            Supports PNG, JPG, JPEG files (Ctrl+V / Cmd+V to paste)
          </h2>
        </div>
      )}
      {error && (
        <div className="w-full border-red-500 bg-red-200 rounded text-red-800 p-3 text-xs">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileInput;
