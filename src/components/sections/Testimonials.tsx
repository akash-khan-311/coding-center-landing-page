import { Marquee } from "../nurui/marquee";
import TestimonialCard from "../nurui/testimonial-card";
import SectionTitle from "../SectionTitle";

interface TestimonialsProps {
  testimonials: {
    name: string;
    position: string;
    testimonial: string;
    rating: number;
  }[];
}
const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section className="py-16 ">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          title="শিক্ষার্থীদের মতামত"
          subTitle="আমাদের শিক্ষার্থীরা কোর্স সম্পর্কে যা বলছে"
        />

        {/* Horizontal Marquee - Desktop + Mobile */}
        <div className="mt-12 overflow-hidden">
          <Marquee
            pauseOnHover
            vertical={false}
            repeat={4}
            className="w-full [--duration:28s]"
          >
            {testimonials?.map((tes, i) => (
              <div key={i} className="w-[320px]  shrink-0">
                <TestimonialCard
                  position={tes.position}
                  name={tes.name}
                  review={tes.testimonial}
                  rating={tes.rating}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
