type Props = {
  course: string;
  admissionFee: string | number;
  admissionId: string | null;
};

export default function CourseSummary({
  course,
  admissionFee,
  admissionId,
}: Props) {
  return (
    <div className="border-b border-white/10 p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Admission
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {course}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            আপনার ভর্তি আবেদন সম্পন্ন করতে নিচের ধাপগুলো অনুসরণ করুন।
          </p>
        </div>

        <div className="shrink-0 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-right">
          <p className="text-xs text-blue-300">
            Admission Fee
          </p>

          <p className="mt-1 text-2xl font-black text-white">
            ৳{admissionFee}
          </p>
        </div>
      </div>

      {admissionId && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-500">
              Application ID
            </p>

            <p className="mt-1 font-mono text-sm text-slate-300">
              {admissionId}
            </p>
          </div>

          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            Pending
          </span>
        </div>
      )}
    </div>
  );
}