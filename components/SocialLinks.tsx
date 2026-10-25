import { Github, Linkedin, Mail } from "lucide-react";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";

const { email, links } = resume.basics;

const SOCIALS = [
  { label: "GitHub", href: links.github, Icon: Github },
  { label: "LinkedIn", href: links.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${email}`, Icon: Mail },
] as const;

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {SOCIALS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            className="block text-slate-lightest transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:text-mint"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </a>
        </li>
      ))}
    </ul>
  );
}
