/* eslint-disable @next/next/no-location-assign-relative-destination */
"use client";

import { banglaToEnglishNumber } from "@/lib/stringToNumber";
import { useState } from "react";

interface AdmissionFormProps {
  course: {
    slug: string;
    name: string;
    batch: string;
    admissionFee: string;
    courseFee: string;
  };
}

export default function AdmissionForm({ course }: AdmissionFormProps) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    whatsapp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const admissionId = `AD-${Date.now()}`;

      const amount = banglaToEnglishNumber(course.admissionFee);

      const data = {
        admissionId,
        name: form.name,
        address: form.address,
        phone: form.phone,
        whatsapp: form.whatsapp,
        amount,
        course: course.slug,
        paymentStatus: "PENDING",
        createdAt: new Date().toISOString(),
      };

      console.log("Admission Data:", data);

      const response = await fetch("/api/admission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "আবেদন সংরক্ষণ করা যায়নি");
      }

      window.location.href = `/payment?admissionId=${admissionId}`;
    } catch (error) {
      console.error(error);

      alert("আপনার আবেদন সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-16 sm:px-6 lg:py-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-112.5 w-112.5 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-112.5 w-112.5 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
            ভর্তি চলছে
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            ভর্তি আবেদন করুন
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
            আপনার তথ্যগুলো পূরণ করুন এবং পরবর্তী ধাপে ভর্তি ফি পেমেন্ট সম্পন্ন
            করুন।
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Course Header */}
          <div className="relative overflow-hidden border-b border-white/10 bg-linear-to-br from-blue-600/90 via-indigo-600/90 to-violet-700/90 px-6 py-7 sm:px-8">
            {/* Decorative */}
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-white/5" />

            <div className="relative">
              <p className="text-sm font-medium text-blue-100">
                আপনি যে কোর্সে ভর্তি হচ্ছেন
              </p>

              <div className="mt-2 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                    {course.name}
                  </h2>

                  <p className="mt-2 text-sm text-blue-100">{course.batch}</p>
                </div>

                {/* Desktop Fee */}
                <div className="hidden shrink-0 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-center backdrop-blur-md sm:block">
                  <p className="text-xs text-blue-100">ভর্তি ফি</p>

                  <p className="mt-1 text-2xl font-extrabold text-white">
                    ৳{course.admissionFee}
                  </p>
                </div>
              </div>

              {/* Mobile Fee */}
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md sm:hidden">
                <span className="text-sm text-blue-100">ভর্তি ফি</span>

                <span className="text-xl font-extrabold text-white">
                  ৳{course.admissionFee}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {/* Form Heading */}
            <div className="mb-7">
              <h3 className="text-xl font-bold text-white">আপনার তথ্য দিন</h3>

              <p className="mt-1 text-sm text-slate-400">
                সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  পূর্ণ নাম
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21a8 8 0 0 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>

                  <input
                    id="name"
                    type="text"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    className="w-full rounded-2xl border border-white/10 bg-white/6 py-3.5 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 hover:bg-white/8 focus:border-blue-500/60 focus:bg-white/8 focus:ring-4 focus:ring-blue-500/10"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  ঠিকানা
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-4 text-slate-500">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>

                  <textarea
                    id="address"
                    placeholder="আপনার বর্তমান ঠিকানা লিখুন"
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-white/10  py-3.5 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 bg-white/8 focus:border-blue-500/60 focus:bg-white/8 focus:ring-4 focus:ring-blue-500/10"
                    required
                    value={form.address}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Phone + WhatsApp */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    ফোন নাম্বার
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </div>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-2xl border border-white/10 py-3.5 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 bg-white/8 focus:border-blue-500/60 focus:bg-white/8 focus:ring-4 focus:ring-blue-500/10"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* WhatsApp */}
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    WhatsApp নাম্বার
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-.9L3 20l.9-5.3a8.4 8.4 0 1 1 17.1-3.2Z" />
                      </svg>
                    </div>

                    <input
                      id="whatsapp"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className="w-full rounded-2xl border border-white/10 bg-white/6 py-3.5 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-blue-500/60 focus:bg-white/8 focus:ring-4 focus:ring-blue-500/10"
                      required
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          whatsapp: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="rounded-2xl border border-blue-500/10 bg-blue-500/6 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 shrink-0 text-blue-400">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-200">
                      আপনার তথ্য নিরাপদ থাকবে
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      তথ্য জমা দেওয়ার পর আপনাকে পরবর্তী ধাপে নিয়ে যাওয়া হবে,
                      যেখানে ভর্তি ফি পেমেন্টের নির্দেশনা পাবেন।
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group cursor-pointer relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 py-4 font-bold text-white shadow-lg shadow-blue-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/40 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      আবেদন সংরক্ষণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      পেমেন্টের জন্য এগিয়ে যান
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </>
                  )}
                </span>

                {/* Shine */}
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              {/* Bottom Fee */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <span>ভর্তি ফি</span>

                <span className="font-bold text-slate-300">
                  ৳{course.admissionFee}
                </span>

                <span>•</span>

                <span>পরবর্তী ধাপে পেমেন্ট</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
