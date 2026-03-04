"use client";
import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import ScrollSpy from "@/components/ScrollSpy";
import Hero from "@/components/Hero";
import TopImpact from "@/components/TopImpact";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import AdditionalInfo from "@/components/AdditionalInfo";
import Contact from "@/components/Contact";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <AnimatedBackground />
      <div className="relative z-10">
        <ScrollSpy />
        <Navbar />
        <main>
          <Hero />
          <TopImpact />
          <Experience />
          <Projects />
          <Achievements />
          <Skills />
          <Education />
          <Certifications />
          <AdditionalInfo />
          <Contact />
        </main>
      </div>
    </>
  );
}
