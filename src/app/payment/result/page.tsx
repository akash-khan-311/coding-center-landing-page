import Link from "next/link";

type Props = {
  searchParams: Promise<{
    status?: string;
    admissionId?: string;
  }>;
};

export default async function PaymentResult({ searchParams }: Props) {
  const params = await searchParams;

  const status = params.status || "pending";

  const result = {
    paid: {
      title: "পেমেন্ট সফল হয়েছে! 🎉",
      description:
        "আপনার ভর্তি ফি সফলভাবে গ্রহণ করা হয়েছে। আপনার আবেদন সম্পন্ন হয়েছে।",
      icon: "✓",
      badge: "Payment Successful",
      color: "emerald",
    },

    cancelled: {
      title: "পেমেন্ট বাতিল হয়েছে",
      description:
        "আপনি পেমেন্ট বাতিল করেছেন। চাইলে আবার পেমেন্ট করে আপনার ভর্তি সম্পন্ন করতে পারেন।",
      icon: "×",
      badge: "Payment Cancelled",
      color: "rose",
    },

    failed: {
      title: "পেমেন্ট ব্যর্থ হয়েছে",
      description:
        "কোনো কারণে আপনার পেমেন্ট সম্পন্ন হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
      icon: "!",
      badge: "Payment Failed",
      color: "amber",
    },

    pending: {
      title: "পেমেন্ট যাচাই হচ্ছে",
      description:
        "আপনার payment information সফলভাবে জমা হয়েছে। Admin আপনার Transaction ID যাচাই করার পর payment confirm করবেন।",
      icon: "⏳",
      badge: "Payment Pending",
      color: "blue",
    },
  };

  const current = result[status as keyof typeof result] || result.pending;

  const isPaid = status === "paid";
  const isCancelled = status === "cancelled";
  const isFailed = status === "failed";
  const isPending = status === "pending";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-12">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-1/2 -top-45 h-105 w-105 -translate-x-1/2 rounded-full blur-3xl ${
            isPaid
              ? "bg-emerald-500/20"
              : isCancelled
                ? "bg-rose-500/20"
                : isFailed
                  ? "bg-amber-500/20"
                  : "bg-blue-500/20"
          }`}
        />

        <div className="absolute -bottom-45 -left-25 h-87.5 w-87.5 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute -right-25 top-[20%] h-75 w-75 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Brand */}
        <div className="mb-6 text-center">
          <p className="text-sm font-medium tracking-[0.25em] text-slate-400 uppercase">
            Coding Center
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/30 backdrop-blur-2xl">
          {/* Top Status Area */}
          <div className="px-7 pb-8 pt-10 text-center sm:px-10">
            {/* Status Icon */}
            <div
              className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border ${
                isPaid
                  ? "border-emerald-400/30 bg-emerald-400/10 shadow-lg shadow-emerald-500/20"
                  : isCancelled
                    ? "border-rose-400/30 bg-rose-400/10 shadow-lg shadow-rose-500/20"
                    : isFailed
                      ? "border-amber-400/30 bg-amber-400/10 shadow-lg shadow-amber-500/20"
                      : "border-blue-400/30 bg-blue-400/10 shadow-lg shadow-blue-500/20"
              }`}
            >
              <span
                className={`text-4xl font-bold ${
                  isPaid
                    ? "text-emerald-400"
                    : isCancelled
                      ? "text-rose-400"
                      : isFailed
                        ? "text-amber-400"
                        : "text-blue-400"
                }`}
              >
                {current.icon}
              </span>
            </div>

            {/* Status Badge */}
            <div className="mt-6">
              <span
                className={`inline-flex rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
                  isPaid
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                    : isCancelled
                      ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
                      : isFailed
                        ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                        : "border-blue-400/20 bg-blue-400/10 text-blue-300"
                }`}
              >
                {current.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {current.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              {current.description}
            </p>
          </div>

          {/* Application Information */}
          {params.admissionId && (
            <div className="border-y border-white/10 bg-black/10 px-7 py-6 sm:px-10">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Application ID
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-white">
                      {params.admissionId}
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isPaid
                        ? "bg-emerald-400/10 text-emerald-400"
                        : isCancelled
                          ? "bg-rose-400/10 text-rose-400"
                          : isFailed
                            ? "bg-amber-400/10 text-amber-400"
                            : "bg-blue-400/10 text-blue-400"
                    }`}
                  >
                    {isPaid ? "✓" : isCancelled ? "×" : isFailed ? "!" : "⌛"}
                  </div>
                </div>
              </div>

              {/* Pending Notice */}
              {isPending && (
                <div className="mt-4 rounded-2xl border border-blue-400/10 bg-blue-400/5 p-4">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-blue-400">ℹ</span>

                    <p className="text-xs leading-6 text-slate-300">
                      Transaction ID যাচাই করার পর Admin আপনার payment status
                      <span className="font-semibold text-blue-300">
                        {" "}
                        PAID
                      </span>{" "}
                      করে দেবেন।
                    </p>
                  </div>
                </div>
              )}

              {/* Paid Notice */}
              {isPaid && (
                <div className="mt-4 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-emerald-400">✓</span>

                    <p className="text-xs leading-6 text-slate-300">
                      আপনার payment successfully verified হয়েছে। এখন আপনি আপনার
                      course-এর ক্লাস ও অন্যান্য তথ্যের জন্য Coding Center-এর
                      সাথে যোগাযোগ করতে পারেন।
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 px-7 py-7 sm:px-10">
            {/* Home */}
            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-6 py-4 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              🏠 হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Coding Center · Secure Payment
        </p>
      </div>
    </main>
  );
}
