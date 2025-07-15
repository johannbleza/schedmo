import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SchedMo - AI College Schedule Maker",
  description: "AI College Schedule Maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Navbar />
        {children}
        <div className="max-w-[40rem] mx-auto flex justify-end">
          <p className="text-sm text-slate-300 p-2">Created by Johann</p>
        </div>
      </body>
    </html>
  );
}
