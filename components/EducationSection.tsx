import { resume } from "@/data/resume";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";

export function EducationSection() {
  return (
    <section id="education" className="section">
      <FadeIn>
        <SectionHeader title="education" />
      </FadeIn>

      <ul className="space-y-10">
        {resume.education.map((entry) => (
          <FadeIn key={entry.school} as="li">
            <h3 className="text-[22px] font-bold leading-tight text-slate-lightest md:text-[28px]">{entry.degree}</h3>
            <a
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-mint transition-colors hover:text-slate-lightest"
            >
              {entry.school}
            </a>
            <p className="mt-1 text-lg text-slate">
              {entry.period} · {entry.location}
              {entry.gpa && ` · GPA ${entry.gpa}`}
            </p>
            {entry.coursework && (
              <>
                <p className="mt-4 text-lg text-slate">Relevant coursework:</p>
                <ul className="arrow-list mt-2 grid max-w-[650px] grid-cols-1 gap-x-6 gap-y-1 text-lg text-slate min-[480px]:grid-cols-2">
                  {entry.coursework.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </>
            )}
          </FadeIn>
        ))}
      </ul>

      <FadeIn className="mt-14">
        <h3 className="mb-4 text-[22px] font-bold text-slate-lightest md:text-[28px]">Honors &amp; awards</h3>
        <ul className="arrow-list max-w-[750px] space-y-3 text-lg leading-snug text-slate">
          {resume.awards.map((award) => (
            <li key={award.title}>
              <span className="font-bold text-slate-lightest">{award.title}</span>
              <span className="text-mint">
                {" "}
                · {award.organization}
                {award.date && `, ${award.date}`}
              </span>
              <br />
              {award.detail}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
