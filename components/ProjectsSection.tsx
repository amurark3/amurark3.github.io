import { ExternalLink, FolderOpen, Github } from "lucide-react";
import { resume, type Project } from "@/data/resume";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";

const iconLink = "text-slate-lightest transition-colors duration-200 hover:text-mint";

function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.live ?? project.github;

  return (
    <article className="flex h-full flex-col rounded-2xl bg-navy-light px-7 py-8 transition-all duration-200 ease-smooth hover:-translate-y-[7px] hover:bg-navy-lightest">
      <header className="mb-5 flex items-center justify-between">
        <FolderOpen className="h-9 w-9 text-mint" strokeWidth={1.5} aria-hidden="true" />
        <div className="flex items-center gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className={iconLink}>
              <Github className="h-5 w-5" strokeWidth={1.75} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className={iconLink}>
              <ExternalLink className="h-5 w-5" strokeWidth={1.75} />
            </a>
          )}
        </div>
      </header>

      <h3 className="text-2xl font-bold leading-tight text-slate-lightest">
        {primaryLink ? (
          <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-mint">
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mb-3 text-base text-mint">{project.subtitle}</p>
      <p className="mb-2 text-sm uppercase tracking-wider text-slate">
        {project.organization} · <span className="whitespace-nowrap">{project.period}</span>
      </p>
      <p className="pb-8 text-lg leading-snug text-slate">{project.description}</p>

      <ul aria-label="Tech stack" className="mt-auto flex flex-wrap gap-x-3 gap-y-1 text-base text-slate-light">
        {project.tech.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <FadeIn>
        <SectionHeader title="projects" action={{ href: resume.basics.links.github, label: "View all on GitHub" }} />
      </FadeIn>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {resume.projects.map((project, index) => (
          <FadeIn key={project.title} as="li" delayMs={(index + 1) * 100}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
