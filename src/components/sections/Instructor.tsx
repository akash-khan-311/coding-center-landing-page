import Image from "next/image";
import React from "react";

import SplitText from "../SplitText";
import BlurText from "../BlurText";

interface InstructorProps {
  instructor: {
    name: string;
    designation: string;
    about: string;
    tags: string[];
    image?: string;
  };
}

const Instructor = ({ instructor }: InstructorProps) => {
  return (
    <section className="py-16 bg-slate-800">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid items-center gap-10 rounded-3xl bg-white/20 backdrop-blur-3xl p-8 shadow-lg md:grid-cols-[240px_1fr]">
          <div className="mx-auto flex h-65 w-56 items-center justify-center rounded-3xl bg-linear-to-br from-blue-100 to-indigo-100 text-6xl font-bold text-blue-700">
            <Image
              src={instructor.image || "/images/instructor.jpg"}
              width={200}
              height={200}
              alt={instructor?.name}
              className="w-full h-full overflow-hidden rounded-3xl"
            />
          </div>
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Instructor
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              <SplitText
                text={instructor?.name}
                delay={90}
                duration={2}
                ease="elastic.out(1, 0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </h2>

            <BlurText
              className="mt-2 text-lg font-medium text-slate-400"
              text={instructor?.designation}
              delay={70}
              animateBy="letters"
              direction="bottom"
            />

            <p className="mt-4 leading-7 text-slate-300">{instructor?.about}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {instructor?.tags.map((tag, i) => (
                <span
                  key={i}
                  className="rounded-full bg-slate-600 px-4 py-2 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
