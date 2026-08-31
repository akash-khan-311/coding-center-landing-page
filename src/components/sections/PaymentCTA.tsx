import Link from "next/link";

const PaymentCTA = ({ admissionFee }: { admissionFee: string }) => {
  console.log("admissionFee:", admissionFee);
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 p-8 text-center text-white md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            ভর্তি ফি প্রদান করুন
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            বিকাশ / নগদ / রকেট Send Money এর মাধ্যমে সহজেই ভর্তি ফি পরিশোধ
            করতে পারবেন।
          </p>
          <div
            id="admission"
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/admission"
              className="rounded-xl font-serif bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 transition hover:bg-yellow-300"
            >
              Apply Now
            </Link>
            <Link
              href="https://wa.me/8801765094092"
              target="_blank"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur transition hover:bg-white/20"
            >
              WhatsApp Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentCTA;
