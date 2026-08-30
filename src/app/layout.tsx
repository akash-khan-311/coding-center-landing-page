import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AOSProvider from "@/provider/AOSProvider";
import { courseMetadata } from "@/data/courseMetaData";
import { getCourseFromHostname } from "@/lib/get-course";
import { headers } from "next/headers";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();

  const hostname = headersList.get("host") || "";

  const course = getCourseFromHostname(hostname);

  if (!course) {
    return {
      title: "Coding Center",
      description: "Coding Center",
    };
  }

  const meta = courseMetadata[course.slug as keyof typeof courseMetadata];

  if (!meta) {
    return {
      title: "Coding Center",
    };
  }

  return {
    title: meta.title,

    description: meta.description,

    keywords: [...meta.keywords],
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },

    authors: [
      {
        name: meta.author,
      },
    ],

    creator: meta.author,

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: meta.title,

      description: meta.description,

      url: `https://${hostname}`,

      siteName: "Coding Center",

      images: [
        {
          url: `https://${hostname}${meta.ogImage}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],

      locale: "bn_BD",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`https://${hostname}${meta.ogImage}`],
    },
  };
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
