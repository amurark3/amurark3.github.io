"use client";
import Link from "next/link";
import { Download } from "lucide-react";

const RESUME_PDF = "/Aditya_Murarka_Resume.pdf";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 px-4 print:p-0">
      {/* Action buttons */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-between items-center print:hidden">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 underline">← Back to Portfolio</Link>
        <a
          href={RESUME_PDF}
          download="Aditya_Murarka_Resume.pdf"
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <iframe
          src={RESUME_PDF}
          className="w-full border-0"
          style={{ height: "calc(100vh - 140px)", minHeight: "600px" }}
          title="Aditya Murarka Resume"
        />
      </div>

      <p className="max-w-4xl mx-auto mt-4 text-center text-xs text-gray-400 print:hidden">
        To update this resume, replace the file at <code className="bg-gray-100 px-1 rounded">public/Aditya_Murarka_Resume.pdf</code> in the repository.
      </p>
    </main>
  );
}
