"use client";

import { FileText, Mail } from "lucide-react";
import { resume } from "@/data/resume";
import { useTypewriter } from "@/lib/useTypewriter";
import { AsciiCanvas } from "@/components/AsciiCanvas";
import { FadeIn } from "@/components/FadeIn";

const { firstName, intro, email, links, heroImage } = resume.basics;

const buttonBase =
  "inline-flex items-center gap-2 rounded border px-6 py-2.5 text-base font-bold transition-all duration-200 ease-smooth hover:-translate-y-[3px] md:px-8 md:py-3";

export function IntroSection() {
  const typedName = useTypewriter(firstName);

  return (
    <section
      id="intro"
      className="flex min-h-[80vh] flex-col items-center justify-center gap-5 px-6 pt-24 md:min-h-[85vh] md:flex-row md:gap-[4vw] md:px-[5vw] md:pt-[100px]"
    >
      <div className="flex shrink-0 justify-center">
        <AsciiCanvas imageSrc={heroImage} />
      </div>

      <div className="flex max-w-[550px] flex-col items-center text-center md:items-start md:text-left">
        <h1 className="text-[40px] leading-tight text-slate-lightest sm:text-[56px] lg:text-[80px]">
          <span className="sr-only">hi, {firstName} here.</span>
          <span aria-hidden="true">
            hi, <span className="font-bold text-mint">{typedName}</span> here.
            <span className="ml-1 inline-block animate-blink font-light text-mint motion-reduce:animate-none">|</span>
          </span>
        </h1>

        <FadeIn>
          <p className="pb-6 pt-1 text-base leading-snug text-slate sm:text-lg md:pb-10 md:pt-2 md:text-xl md:leading-normal">
            {intro}
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <a href={`mailto:${email}`} className={`${buttonBase} border-mint text-mint hover:bg-mint-tint`}>
              <Mail className="h-4 w-4" /> Say hi!
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonBase} border-navy-lightest text-slate-lightest hover:border-mint hover:text-mint`}
            >
              <FileText className="h-4 w-4" /> Resume
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
