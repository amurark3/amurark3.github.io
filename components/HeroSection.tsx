"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import resumeData from "@/data/resume.json";

export function HeroSection() {
    const { name, title, summary } = resumeData.basics;

    const scrollToExperience = () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    };

    const downloadResume = () => {
        // To enable downloading your actual resume PDF:
        // Place a file named "resume.pdf" inside the "public" folder of this project.
        window.open("/Aditya_Murarka_Resume.pdf", "_blank");
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col items-center text-center z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-block mb-4 px-3 py-1 rounded-full glass text-sm font-medium text-blue-300 border border-blue-500/30"
                >
                    Available for new opportunities
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                >
                    Hi, I&apos;m{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
                        {name.split(" ")[0]}
                    </span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl font-light"
                >
                    {title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl leading-relaxed"
                >
                    {summary.split("\n")[0]} {/* using the first line for high-impact summary */}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <button
                        onClick={scrollToExperience}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                            View Experience
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button
                        onClick={downloadResume}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white glass rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-white/30"
                    >
                        <span className="relative flex items-center gap-2">
                            Download Resume
                            <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* Decorative gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </section>
    );
}
