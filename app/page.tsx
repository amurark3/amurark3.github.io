"use client";

import { useState } from "react";
import { Splash } from "@/components/Splash";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { EducationSection } from "@/components/EducationSection";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="relative min-h-screen selection:bg-blue-500/30">
      {showSplash ? (
        <Splash onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <AnimatedBackground />
          <NavBar />

          <div id="hero">
            <HeroSection />
          </div>

          <div id="experience">
            <ExperienceSection />
          </div>

          <div id="projects">
            <ProjectsSection />
          </div>

          <div id="achievements">
            <AchievementsSection />
          </div>

          <div id="skills">
            <SkillsSection />
          </div>

          <div id="education">
            <EducationSection />
          </div>

          <footer className="py-12 text-center text-gray-500 text-sm border-t border-white/5 relative z-10 glass-card">
            <p>© {new Date().getFullYear()} Aditya Murarka. All rights reserved.</p>
          </footer>
        </>
      )}
    </main>
  );
}
