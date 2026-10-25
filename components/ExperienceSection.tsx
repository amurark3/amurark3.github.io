"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";

const jobs = resume.experience;
const tabId = (index: number): string => `experience-tab-${index}`;
const panelId = (index: number): string => `experience-panel-${index}`;

const NEXT_KEYS = new Set(["ArrowDown", "ArrowRight"]);
const PREV_KEYS = new Set(["ArrowUp", "ArrowLeft"]);

export function ExperienceSection() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const wrapped = (index + jobs.length) % jobs.length;
    setSelected(wrapped);
    tabRefs.current[wrapped]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (NEXT_KEYS.has(event.key)) focusTab(selected + 1);
    else if (PREV_KEYS.has(event.key)) focusTab(selected - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(jobs.length - 1);
    else return;
    event.preventDefault();
  };

  const job = jobs[selected];

  return (
    <section id="experience" className="section">
      <FadeIn>
        <SectionHeader title="experience" />
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <div
            role="tablist"
            aria-label="Companies"
            onKeyDown={onKeyDown}
            className="flex overflow-x-auto md:w-max md:shrink-0 md:flex-col md:overflow-visible"
          >
            {jobs.map((entry, index) => (
              <button
                key={entry.tabLabel}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={tabId(index)}
                type="button"
                role="tab"
                aria-selected={selected === index}
                aria-controls={panelId(index)}
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                className={cn(
                  "whitespace-nowrap border-b-2 px-5 py-3 text-left text-lg transition-colors duration-200 hover:bg-mint-tint hover:text-mint md:border-b-0 md:border-l-2",
                  selected === index ? "border-mint text-mint" : "border-navy-lightest text-slate-lightest",
                )}
              >
                {entry.tabLabel}
              </button>
            ))}
          </div>

          <div
            key={selected}
            id={panelId(selected)}
            role="tabpanel"
            aria-labelledby={tabId(selected)}
            tabIndex={0}
            className="min-h-[420px] focus:outline-none"
          >
            <h3 className="text-[22px] font-bold leading-tight md:text-[28px]">
              <span className="text-slate-lightest">{job.role} </span>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mint transition-colors hover:text-slate-lightest"
              >
                @ {job.company}
              </a>
            </h3>
            <p className="mt-1 text-lg text-slate">
              {job.period} · {job.location}
            </p>
            <ul className="arrow-list mt-6 max-w-[650px] space-y-4 text-lg leading-snug text-slate">
              {job.bullets.map((bullet, index) => (
                <FadeIn key={bullet} as="li" delayMs={(index + 1) * 80}>
                  {bullet}
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
