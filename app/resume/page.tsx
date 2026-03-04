"use client";
import { useRef } from "react";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import { Mail, Phone, Linkedin, MapPin, Download } from "lucide-react";

export default function ResumePage() {
  const { basics, experience, education, skills, certifications, languages, topSkills } = resumeData;
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const element = resumeRef.current;
    if (!element) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: [0.4, 0.5, 0.4, 0.5],
        filename: "Aditya_Murarka_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 px-4 print:p-0">
      {/* Action buttons */}
      <div className="max-w-3xl mx-auto mb-4 flex justify-between items-center print:hidden">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 underline">← Back to Portfolio</Link>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>

      <div ref={resumeRef} className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 sm:p-12 print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{basics.name}</h1>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{basics.title}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{basics.location}</span>
            <a href={`mailto:${basics.email}`} className="flex items-center gap-1"><Mail className="h-3 w-3" />{basics.email}</a>
            <a href={`mailto:${basics.email2}`} className="flex items-center gap-1"><Mail className="h-3 w-3" />{basics.email2}</a>
            <a href={`tel:${basics.phone}`} className="flex items-center gap-1"><Phone className="h-3 w-3" />{basics.phone}</a>
            <a href={basics.linkedin} className="flex items-center gap-1"><Linkedin className="h-3 w-3" />LinkedIn</a>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{basics.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.company}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                    <p className="text-sm text-blue-700">{exp.title}</p>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    <div>{exp.period}</div>
                    <div>{exp.location}</div>
                  </div>
                </div>
                <ul className="mt-2 space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="text-xs text-gray-700 flex gap-2 leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-gray-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.school} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.degree} · {edu.field}</p>
                </div>
                <p className="text-xs text-gray-500">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Skills</h2>
          <div className="space-y-1.5 text-xs text-gray-700">
            <p><span className="font-medium">Languages:</span> {skills.languages.join(", ")}</p>
            <p><span className="font-medium">AI/ML:</span> {skills.aiml.join(", ")}</p>
            <p><span className="font-medium">Frontend:</span> {skills.frontend.join(", ")}</p>
            <p><span className="font-medium">Backend:</span> {skills.backend.join(", ")}</p>
            <p><span className="font-medium">Tools & Infrastructure:</span> {skills.tools.join(", ")}</p>
            <p><span className="font-medium">Testing & Analytics:</span> {skills.testing.join(", ")}</p>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Certifications</h2>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <span key={cert} className="text-xs border border-gray-200 rounded-full px-3 py-0.5 text-gray-700">{cert}</span>
            ))}
          </div>
        </section>

        {/* Languages & Top Skills */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Languages</h2>
            {languages.map((l) => (
              <p key={l.language} className="text-xs text-gray-700">{l.language} — {l.proficiency}</p>
            ))}
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Top Skills</h2>
            {topSkills.map((s) => (
              <p key={s} className="text-xs text-gray-700">· {s}</p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
