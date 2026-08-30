import React from "react";
import {
  BadgeCheck,
  FolderKanban,
  Headphones,
  BriefcaseBusiness,
} from "lucide-react";
import SectionTitle from "../SectionTitle";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Industry Standard",
      desc: "বর্তমান মার্কেট অনুযায়ী আপডেটেড সিলেবাস",
      icon: BadgeCheck,
    },
    {
      title: "Real Project",
      desc: "প্রতিটি মডিউলের পর হাতে-কলমে প্রজেক্ট",
      icon: FolderKanban,
    },
    {
      title: "Live Support",
      desc: "ক্লাসের বাইরে প্রশ্ন করার সুবিধা",
      icon: Headphones,
    },
    {
      title: "Career Guidance",
      desc: "CV, Portfolio ও Interview প্রস্তুতি",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          title="কেন এই কোর্স?"
          subTitle="নতুনদের জন্য সহজভাবে সাজানো বাস্তবমুখী কারিকুলাম"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                data-aos="fade-up"
                key={item.title}
                className="rounded-2xl border border-slate-600 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-900 text-purple-200">
                  <Icon size={24} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;