"use client";

import { useEffect } from "react";

export default function CancelPage() {
  useEffect(() => {
    const phone = localStorage.getItem("admissionPhone");

    if (phone) {
      fetch("/api/save-admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          paymentStatus: "CANCELLED",
        }),
      });
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
        <div className="text-5xl">❌</div>
        <h1 className="mt-4 text-3xl font-bold text-red-600">
          পেমেন্ট বাতিল হয়েছে
        </h1>
        <p className="mt-3 text-slate-600">
          আপনি চাইলে আবার ভর্তি প্রক্রিয়া সম্পন্ন করতে পারবেন।
        </p>
      </div>
    </main>
  );
}
