type Props = {
  title: string;
  subTitle?: string;
};

const SectionTitle = ({ title, subTitle }: Props) => {
  return (
    <div className="text-center">
      <h2 data-aos="fade-down" className="text-3xl font-bold md:text-4xl">
        {title}
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="1000"
        className="mt-3 text-slate-400"
      >
        {subTitle}
      </p>
    </div>
  );
};

export default SectionTitle;
