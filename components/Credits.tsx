import { resume } from "@/data/resume";
import { SocialLinks } from "@/components/SocialLinks";

const DESIGN_INSPIRATION = "https://www.gazijarin.com/";

export function Credits() {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 pb-10 pt-16 text-center text-base text-slate">
      <SocialLinks />
      <div>
        <p>Built and designed by {resume.basics.name}.</p>
        <p>
          Design inspired by{" "}
          <a href={DESIGN_INSPIRATION} target="_blank" rel="noopener noreferrer" className="text-mint hover:text-slate-lightest">
            Gazi Jarin
          </a>
          . All rights reserved. © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
