import { courseConfig } from "@/data/courseConfig";

import { webDevelopment } from "@/data/courses/web-development";
import { digitalMarketing } from "@/data/courses/digital-marketing";

const courseContents = {
  "web-development": webDevelopment,
  "digital-marketing": digitalMarketing,
} as const;

type CourseSlug = keyof typeof courseContents;

const DEFAULT_COURSE: CourseSlug = "web-development";

export function getCourseFromHostname(hostname: string) {
  const cleanHostname = hostname
    .replace(/^https?:\/\//, "")
    .split(":")[0]
    .toLowerCase();

  let subdomain: CourseSlug = DEFAULT_COURSE;

  if (cleanHostname === "web-development.codingcenter.net") {
    subdomain = "web-development";
  } else if (cleanHostname === "digital-marketing.codingcenter.net") {
    subdomain = "digital-marketing";
  }

  const config = courseConfig[subdomain];
  const content = courseContents[subdomain];

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
