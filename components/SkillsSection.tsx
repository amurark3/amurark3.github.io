import { resume } from "@/data/resume";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";

export function SkillsSection() {
  return (
    <section id="skills" className="section">
      <FadeIn>
        <SectionHeader title="skills" />
      </FadeIn>
      <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {resume.skills.map(({ category, items }, index) => (
          <FadeIn key={category} as="li" delayMs={(index % 3) * 100}>
            <h3 className="mb-3 text-[22px] font-bold text-slate-lightest">
              <span className="text-mint">▹ </span>
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-navy-lightest px-2.5 py-0.5 text-base text-slate-light transition-colors duration-200 hover:border-mint hover:text-mint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
