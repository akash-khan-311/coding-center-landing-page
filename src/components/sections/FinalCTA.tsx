import Link from "next/link";
import React from "react";


interface FinalCTAProps {
  startDate: string;
}

const FinalCTA = ({ startDate }: FinalCTAProps) => {
  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold md:text-5xl">ভর্তি চলছে</h2>
        <p className="mt-4 text-xl text-slate-300">
          পরবর্তী ব্যাচ শুরু:{' '}
          <span className="font-semibold text-yellow-300">
            {startDate}
          </span>
        </p>
        <p className="mt-3 text-slate-400">
          সীমিত সংখ্যক সিট • আগে ভর্তি হলে ব্যাচ নিশ্চিত
        </p>
        <Link
          href="/admission"
          className="mt-8 inline-flex items-center justify-center rounded-xl  bg-purple-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-purple-800"
        >
          এখনই ভর্তি হোন
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
