/* eslint-disable @typescript-eslint/no-explicit-any */

const Footer = ({ footer, contactInfo }: any) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
        <p>
          © {currentYear} . {footer.title} All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href={`tel:${contactInfo?.phone}`} className="hover:text-blue-600">
            📞 {contactInfo?.phone}
          </a>
          <a
            href={`mailto:${contactInfo?.email}`}
            target="_blank"
            className="hover:text-blue-600"
          >
            ✉️ {contactInfo?.email}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
