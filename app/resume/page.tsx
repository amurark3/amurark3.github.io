import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { resume } from "@/data/resume";

const { name, links } = resume.basics;
const fileName = links.resume.split("/").pop();

export const metadata: Metadata = {
  title: `Resume | ${name}`,
};

export default function ResumePage() {
  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto mb-5 flex max-w-4xl items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg text-mint transition-colors hover:text-slate-lightest"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          back to portfolio
        </Link>
        <a
          href={links.resume}
          download={fileName}
          className="flex items-center gap-2 rounded border border-mint px-5 py-2 text-base font-bold text-mint transition-colors hover:bg-mint-tint"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-navy-light shadow-2xl">
        <iframe
          src={links.resume}
          className="h-[calc(100vh-140px)] min-h-[600px] w-full border-0"
          title={`${name} resume`}
        />
      </div>
    </main>
  );
}
