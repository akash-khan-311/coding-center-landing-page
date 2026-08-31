"use client";


import Image from "next/image";
import Link from "next/link";

const WhatsAppButton = () => {
  const phoneNumber = "8801765094092";

  const message = encodeURIComponent(
    "আসসালামু আলাইকুম, Coding Center-এর কোর্স সম্পর্কে জানতে চাই।",
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp এ যোগাযোগ করুন"
      className="fixed md:bottom-5 bottom-25 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-green-600 sm:bottom-6 sm:right-6"
    >
      <Image
        src="/images/whatsapp.png"
        alt="WhatsApp"
        width={64}
        height={64}
        className="h-16 w-16 object-contain drop-shadow-lg"
      />
    </Link>
  );
};

export default WhatsAppButton;