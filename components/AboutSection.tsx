import { resume } from "@/data/resume";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";

const [currentJob, previousJob] = resume.experience;
const [masters] = resume.education;

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-mint transition-colors hover:text-slate-lightest"
    >
      {children}
    </a>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section">
      <FadeIn>
        <SectionHeader title="about me" />
        <div className="flex flex-col gap-10 md:flex-row md:gap-14">
          <div className="max-w-[600px] space-y-4 text-lg leading-snug text-slate md:text-[22px]">
            <p>
              I&apos;m a <b className="text-slate-lightest">{resume.basics.role.toLowerCase()}</b> with 5+ years of
              experience shipping production web applications. Most recently I was a {currentJob.role} at
              <InlineLink href={currentJob.url}> {currentJob.company}</InlineLink>, where I built the conversational UI
              for an enterprise RAG assistant, moved legacy AngularJS screens into a React micro-frontend
              architecture, and engineered real-time notifications with SSE and Kafka. Before that, I led a frontend
              team at <InlineLink href={previousJob.url}>{previousJob.tabLabel}</InlineLink>.
            </p>
            <p>
              I hold an M.S. in Software Engineering from <InlineLink href={masters.url}>{masters.school}</InlineLink>.
              Lately I&apos;ve been building AI-powered and real-time products, like an agentic Formula 1 race
              engineer and an iOS dating app with live chat.
            </p>
            <p>Here are some technologies I have been working with:</p>
            <ul className="arrow-list grid grid-cols-1 gap-x-6 gap-y-1 text-lg min-[480px]:grid-cols-2">
              {resume.aboutTech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <p>{resume.basics.openTo}</p>
          </div>

          <ul aria-label="Career highlights" className="grid grid-cols-2 gap-3 self-start md:w-[320px] md:shrink-0">
            {resume.highlights.map(({ metric, label }) => (
              <li
                key={label}
                className="rounded-2xl bg-navy-light p-5 transition-all duration-200 ease-smooth hover:-translate-y-1 hover:bg-navy-lightest"
              >
                <div className="text-[40px] font-bold leading-none text-mint">{metric}</div>
                <p className="mt-2 text-base leading-snug text-slate">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
