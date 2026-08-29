"use client";

import { useEffect, useRef, useState } from "react";

export default function SuccessPage() {
  const [saved, setSaved] = useState(false);
  const hasSaved = useRef(false);

  useEffect(() => {
    const saveData = async () => {
      // prevent double execution
      if (hasSaved.current) return;
      hasSaved.current = true;

      try {
        const data = localStorage.getItem("admissionData");

        if (!data) return;

        const response = await fetch("/api/save-admission", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
          localStorage.removeItem("admissionData");
          setSaved(true);
        }
      } catch (error) {
        console.error("Save failed:", error);
      }
    };

    saveData();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
        <div className="text-5xl">🎉</div>

        <h1 className="mt-4 text-3xl font-bold text-green-600">
          ভর্তি সফল হয়েছে
        </h1>

        <p className="mt-3 text-slate-600">
          {saved
            ? "আপনার তথ্য সফলভাবে Google Sheet-এ সংরক্ষণ করা হয়েছে।"
            : "আপনার তথ্য সংরক্ষণ করা হচ্ছে..."}
        </p>
      </div>
    </main>
  );
}
