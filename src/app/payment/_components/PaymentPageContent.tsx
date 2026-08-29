"use client";

import { courseConfig } from "@/data/courseConfig";
import { getCourseFromHostname } from "@/lib/get-course";
import { banglaToEnglishNumber } from "@/lib/stringToNumber";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { paymentMethods, type PaymentMethod } from "@/data/paymentMethods";
import Image from "next/image";
import PaymentHeader from "./PaymentHeader";
import CourseSummary from "./CourseSummary";
export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const admissionId = searchParams.get("admissionId");

  const [hostname] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hostname,
  );
  const [transactionId, setTransactionId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("BKASH");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  /*
   * =========================
   * COURSE
   * =========================
   */

  const currentCourse = getCourseFromHostname(hostname)?.slug;

  const courseInfo = courseConfig[currentCourse as keyof typeof courseConfig];

  const course = courseInfo?.name ?? "";

  const amount = courseInfo
    ? banglaToEnglishNumber(courseInfo.admissionFee)
    : "";

  /*
   * =========================
   * CURRENT PAYMENT METHOD
   * =========================
   */

  const currentPayment = paymentMethods[paymentMethod];
  const currentNumber = currentPayment?.number ?? "";

  /*
   * =========================
   * COPY NUMBER
   * =========================
   */

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentNumber);

      setCopied(paymentMethod);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * =========================
   * SUBMIT PAYMENT
   * =========================
   */

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!admissionId) {
    alert("Admission ID পাওয়া যায়নি।");
    return;
  }

  if (!courseInfo) {
    alert("এই কোর্সের তথ্য পাওয়া যায়নি।");
    return;
  }

  const trimmedTransactionId = transactionId.trim();

  if (!trimmedTransactionId) {
    alert("Transaction ID দিন।");
    return;
  }

  if (!currentNumber) {
    alert(`${currentPayment.name} payment number পাওয়া যায়নি।`);
    return;
  }

  setLoading(true);

  try {
    const payload = {
      admissionId,
      paymentStatus: "PENDING",
      transactionId: trimmedTransactionId,
      paymentMethod,
      course: currentCourse,
      amount: String(amount),
    };

    console.log("Payment payload:", payload);

    const response = await fetch("/api/payment/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    let result: {
      success?: boolean;
      message?: string;
      error?: string;
    };

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error(
        `Server থেকে invalid response এসেছে (${response.status})`,
      );
    }

    console.log("Payment API response:", result);

    if (!response.ok) {
      throw new Error(
        result.message ||
          result.error ||
          `Payment API error (${response.status})`,
      );
    }

    if (!result.success) {
      throw new Error(
        result.message ||
          result.error ||
          "Payment information submit করা যায়নি",
      );
    }

    router.push(
      `/payment/result?status=pending&admissionId=${encodeURIComponent(
        admissionId,
      )}`,
    );
  } catch (error) {
    console.error("Payment Submit Error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Payment information submit করা যায়নি।";

    alert(message);
  } finally {
    setLoading(false);
  }
};

  if (!hostname) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:py-14">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

          <p className="mt-4 text-sm text-slate-400">Loading payment...</p>
        </div>
      </main>
    );
  }

  if (!courseInfo) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:py-14">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
            ⚠️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            কোর্স পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            এই সাবডোমেইনের জন্য কোনো কোর্স কনফিগার করা হয়নি।
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:py-14">
      {/* Background decoration */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl">
        {/* =========================
            BRAND
        ========================= */}

       <PaymentHeader/>

        {/* =========================
            MAIN CARD
        ========================= */}

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/30 backdrop-blur-2xl">
          {/* =========================
              COURSE SUMMARY
          ========================= */}

         <CourseSummary course={course} admissionFee={courseInfo.admissionFee} admissionId={admissionId}/>

          {/* =========================
              PAYMENT STEPS
          ========================= */}

          <div className="p-6 sm:p-8">
            <div className="mb-7">
              <h3 className="text-lg font-bold text-white">
                পেমেন্ট সম্পন্ন করুন
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                নিচের যেকোনো একটি মাধ্যমে ৳{courseInfo.admissionFee} পাঠান।
              </p>
            </div>

            {/* Payment Method */}

            <div className="grid grid-cols-3 gap-3">
              {Object.entries(paymentMethods).map(
                ([key, method]) => {
                  const isActive = paymentMethod === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setPaymentMethod(key as PaymentMethod)
                      }
                      className={`group rounded-2xl border p-4 text-left transition-all duration-300 ${isActive
                        ? key === "BKASH"
                          ? "border-pink-400/50 bg-pink-500/10 shadow-lg shadow-pink-500/10"
                          : key === "NAGAD"
                            ? "border-orange-400/50 bg-orange-500/10 shadow-lg shadow-orange-500/10"
                            : "border-purple-400/50 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                    >
                      <div className="flex items-center justify-between">

                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white">
                          <Image
                            src={method.logo}
                            alt={method.name}
                            width={100}
                            height={100}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        {isActive && (
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${key === "BKASH"
                              ? "bg-pink-500"
                              : key === "NAGAD"
                                ? "bg-orange-500"
                                : "bg-purple-500"
                              }`}
                          >
                            ✓
                          </div>
                        )}
                      </div>

                      <p className="mt-3 font-bold text-white">
                        {method.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Send Money
                      </p>
                    </button>
                  );
                },
              )}
            </div>

            {/* =========================
                PAYMENT NUMBER
            ========================= */}

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs text-slate-500">
                    {currentPayment.instruction}
                  </p>

                  <p className="mt-2 text-2xl font-black tracking-wider text-white sm:text-3xl">
                    {currentNumber}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {copied === paymentMethod
                    ? "✓ Copied"
                    : "Copy"}
                </button>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-blue-500/10 p-3">
                <span className="mt-0.5">
                  💡
                </span>

                <p className="text-xs leading-5 text-slate-300">
                  ঠিক{" "}
                  <span className="font-bold text-white">
                    ৳{courseInfo.admissionFee}
                  </span>{" "}
                  টাকা পাঠানোর পর আপনার Transaction ID নিচের ঘরে লিখুন।
                </p>
              </div>
            </div>

            {/* =========================
                TRANSACTION FORM
            ========================= */}

            <form onSubmit={handleSubmit} className="mt-7">

              <label className="mb-2 block text-sm font-semibold text-white">
                Transaction ID
              </label>

              <input
                type="text"
                placeholder="যেমন: 8ABC123XYZ"
                value={transactionId}
                onChange={(e) =>
                  setTransactionId(e.target.value)
                }
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-mono text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="mt-2 text-xs text-slate-500">
                টাকা পাঠানোর পর যে Transaction ID পেয়েছেন সেটিই এখানে দিন।
              </p>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    তথ্য জমা হচ্ছে...
                  </>
                ) : (
                  <>
                    পেমেন্টের তথ্য জমা দিন

                    <span className="text-lg">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* =========================
                VERIFICATION NOTICE
            ========================= */}

            <div className="mt-6 rounded-2xl border border-amber-400/10 bg-amber-500/5 p-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                  🔐
                </div>

                <div>
                  <p className="text-sm font-semibold text-amber-300">
                    Manual Verification
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    আপনার Transaction ID জমা দেওয়ার পর একজন admin payment যাচাই
                    করবেন। যাচাই সম্পন্ন হলে আপনার payment status update করা
                    হবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Coding Center • Secure Admission System
          </p>
        </div>
      </div>
    </main>
  );
}
