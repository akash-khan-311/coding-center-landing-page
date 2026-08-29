import React from "react";
import SectionTitle from "../SectionTitle";

const Admission = () => {
  return (
    <section id="admission" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <SectionTitle
            title="অনলাইন ভর্তি ফর্ম"
            subTitle="নিচের তথ্যগুলো পূরণ করে ভর্তি আবেদন করুন"
          />
          <form className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  পূর্ণ নাম
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  মোবাইল নাম্বার
                </label>
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                ঠিকানা
              </label>
              <textarea
                rows={4}
                placeholder="আপনার ঠিকানা লিখুন"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                কোর্স নির্বাচন
              </label>
              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option>Frontend Development</option>
                <option>MERN Stack Development</option>
                <option>Graphics Design</option>
                <option>Digital Marketing</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-blue-700"
            >
              ভর্তি আবেদন সাবমিট করুন
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Admission;
