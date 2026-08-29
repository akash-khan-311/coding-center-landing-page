import React from "react";
import SectionTitle from "../SectionTitle";

interface CourseInfoProps {
  courseInfo: {
    info: {
      label: string;
      value: string;
    }[];
  };
}
const CourseInfo = ({ courseInfo }: CourseInfoProps) => {
  console.log("courseInfo", courseInfo);
  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle title="কোর্স তথ্য" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {courseInfo?.info?.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
            >
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-yellow-300">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseInfo;
