import Link from "next/link";
import FoldText from "../FoldText";
import ShinyText from "../ShinyText";

interface HeroProps {
  heroSection: {
    admission: string;
    heading: string;
    description: string;
  };
}

const HeroSection = ({ heroSection }: HeroProps) => {
  return (
    <section className="banner text-white">
      <div className="mx-auto max-w-6xl space-y-3 px-6 py-20 text-center h-[95vh] flex flex-col justify-center items-center">

        <div className=" rounded-full backdrop-blur-3xl bg-white/20 px-4 py-1 flex items-center justify-center">
          <ShinyText text={`ভর্তি চলছে • ${heroSection.admission}`} className=" inline-block text-sm md:text-lg font-medium" />

        </div>
        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl max-w-247.5 mx-auto">
          <FoldText
            text={heroSection.heading}
            hinge="top"
            trigger="mount"
            splitBy="word"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            creaseShading={0.55}
            className=""
          />
        </h1>
        <p className="mx-auto  max-w-3xl text-lg text-blue-100 md:text-xl">
          {heroSection.description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#admission"
            className="rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-purple-800"
          >
            এখনই ভর্তি হোন
          </Link>
          <Link
            href="https://wa.me/8801765094092"
            target="_blank"
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur transition hover:bg-white/20"
          >
            ফ্রি কাউন্সেলিং
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
          <span className="backdrop-blur-3xl bg-white/20 p-1 rounded-full">✓ লাইভ ক্লাস</span> <span className="backdrop-blur-3xl bg-white/20 p-1 rounded-full">✓ রেকর্ডেড ভিডিও</span>
          <span className="backdrop-blur-3xl bg-white/20 p-1 rounded-full">✓ সার্টিফিকেট</span> <span className="backdrop-blur-3xl bg-white/20 p-1 rounded-full">✓ জব গাইডলাইন</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
