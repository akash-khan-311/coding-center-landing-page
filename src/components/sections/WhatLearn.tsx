import React from "react";
import SectionTitle from "../SectionTitle";

interface WhatLearnProps {
  whatLearnInfo: {
    title: string;
    topics: string[];
  };
}
const WhatLearn = ({ whatLearnInfo }: WhatLearnProps) => {
  return (
    <section className=" py-16">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle title={whatLearnInfo.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whatLearnInfo?.topics?.map((topic, index) => (
            <div
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="700"
              data-aos-delay={index * 300}
              key={topic}
              className="flex items-center gap-3 rounded-xl bg-slate-800 p-5 shadow-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-white">
                ✓
              </div>
              <span className="font-medium">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatLearn;
