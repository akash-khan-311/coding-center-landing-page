import Image from "next/image";

export default function PaymentHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
        <Image
          src="https://res.cloudinary.com/dtvnmf35l/image/upload/v1787682867/536650853_814597614472068_6428686006928258815_n_cl15ct.jpg"
          width={100}
          height={100}
          alt="Coding Center"
          className="h-full w-full object-cover"
        />
      </div>

      <h1 className="mt-4 text-xl font-bold text-white">
        Coding Center
      </h1>

      <p className="mt-1 text-sm text-slate-400">
        Secure Admission Payment
      </p>
    </div>
  );
}