import { headers } from "next/headers";

import CourseInfo from "@/components/sections/CourseInfo";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/heroSection";
import Instructor from "@/components/sections/Instructor";
import PaymentCTA from "@/components/sections/PaymentCTA";
import Testimonials from "@/components/sections/Testimonials";
import WhatLearn from "@/components/sections/WhatLearn";
import WhyChooseUs from "@/components/sections/whyChooseUs";
import { getCourseFromHostname } from "@/lib/get-course";
import Link from "next/link";


export default async function HomePage() {
  const headersList = await headers();

  const hostname = headersList.get("host") || "";

  const course = getCourseFromHostname(hostname);

  if (!course) {
    return <div>Course not found</div>;
  }

  console.log(typeof course.startBatchDate)

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Hero Section */}
      <HeroSection heroSection={course.heroSection} />
      {/* Why Choose Us */}
      <WhyChooseUs />
      {/* What You Will Learn */}
      <WhatLearn whatLearnInfo={course.whatLearnInfo} />
      {/* Instructor */}
      <Instructor instructor={course.instructor} />
      {/* Course Info */}
      <CourseInfo courseInfo={course.courseInfo} />
      {/* Testimonials */}
      <Testimonials testimonials={course.testimonialData} />
      {/* Admission Form */}
      {/* <Admission /> */}
      {/* Payment CTA */}
      <PaymentCTA admissionFee={course.admissionFee} />
      {/* Final CTA */}

      <FinalCTA startDate={course.startBatchDate.date} />
      {/* Footer */}
      <Footer footer={course.footer} contactInfo={course.contactInfo} />
      {/* Mobile Sticky Button */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-2xl md:hidden">
        <Link
          href="#admission"
          className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-bold text-white"
        >
          🚀 এখনই ভর্তি হোন
        </Link>
      </div>
    </main>
  );
}
