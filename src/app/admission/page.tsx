import { headers } from "next/headers";

import { getCourseFromHostname } from "@/lib/get-course";
import AdmissionForm from "./_compoents/AdmissionForm";

export default async function AdmissionPage() {
  const headersList = await headers();

  const hostname = headersList.get("host") || "";

  const course = getCourseFromHostname(hostname);

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">কোর্স পাওয়া যায়নি</h1>

          <p className="mt-2 text-slate-500">
            এই ডোমেইনের জন্য কোনো কোর্স কনফিগার করা হয়নি।
          </p>
        </div>
      </main>
    );
  }

  return <AdmissionForm course={course} />;
}
