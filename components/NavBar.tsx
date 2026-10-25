"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { resume } from "@/data/resume";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/SocialLinks";

const NAV_ITEMS = [
  { id: "intro", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("intro");

  useEffect(() => {
    // A thin band across the middle of the viewport decides which section is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

interface NavLinksProps {
  active: SectionId;
  onNavigate?: () => void;
  className?: string;
}

function NavLinks({ active, onNavigate, className }: NavLinksProps) {
  return (
    <ul className={className}>
      {NAV_ITEMS.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={onNavigate}
            aria-current={active === id ? "location" : undefined}
            className={cn(
              "block text-base font-bold transition-colors duration-200 hover:text-mint",
              active === id ? "text-mint" : "text-slate-lightest",
            )}
          >
            <span className="text-mint">/</span>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href={resume.basics.links.resume}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded border border-mint px-4 py-1.5 text-base font-bold text-mint transition-colors duration-200 hover:bg-mint-tint",
        className,
      )}
    >
      resume
    </a>
  );
}

export function NavBar() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy-lightest bg-navy/85 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        <a href="#intro" className="text-xl font-bold text-slate-lightest transition-colors hover:text-mint">
          {resume.basics.name}
        </a>

        <NavLinks active={active} className="hidden items-center gap-6 lg:flex xl:gap-8" />

        <div className="hidden items-center gap-5 lg:flex">
          <SocialLinks />
          <ResumeButton />
        </div>

        <button
          type="button"
          className="text-slate-lightest transition-colors hover:text-mint lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-navy-lightest px-6 pb-6 pt-2 lg:hidden">
          <NavLinks
            active={active}
            onNavigate={() => setMenuOpen(false)}
            className="flex flex-col gap-1 [&_a]:py-2"
          />
          <div className="mt-4 flex items-center justify-between">
            <SocialLinks />
            <ResumeButton />
          </div>
        </div>
      )}
    </header>
  );
}
