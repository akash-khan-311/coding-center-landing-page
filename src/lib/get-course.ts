import { courseConfig } from "@/data/courseConfig";

import { webDevelopment } from "@/data/courses/web-development";
import { digitalMarketing } from "@/data/courses/digital-marketing";

const courseContents = {
  "web-development": webDevelopment,
  "digital-marketing": digitalMarketing,
} as const;

export function getCourseFromHostname(hostname: string) {
  const cleanHostname = hostname.split(":")[0];

  let subdomain = cleanHostname.split(".")[0];

  // Localhost হলে এখানে যেটা চাইবে সেটাই default
  if (cleanHostname === "localhost" || cleanHostname === "127.0.0.1" || cleanHostname === 'https://coding-center-landing-page.vercel.app') {
    subdomain = "digital-marketing";
  }

  const config = courseConfig[subdomain as keyof typeof courseConfig];

  const content = courseContents[subdomain as keyof typeof courseContents];

  if (!config || !content) {
    return null;
  }

  return {
    ...content,

    slug: subdomain,
    name: config.name,
    batch: config.batch,
    admissionFee: config.admissionFee,
    courseFee: config.courseFee,
  };
}
