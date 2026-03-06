"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Database, Cloud } from "lucide-react";
import resumeData from "@/data/resume.json";

const categoryIcons: Record<string, typeof Code2> = {
    Languages: Code2,
    "AI/ML": Terminal, // using terminal as fallback since brain icon not in lucide
    Frontend: Code2,
    Backend: Database,
    "Tools & Infrastructures": Cloud,
    "Testing & Analytics": Terminal,
    "Spoken Languages": Terminal,
};

export function SkillsSection() {
    const { skills } = resumeData;

    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center bg-cyan-500/10 text-cyan-400">
                        <Code2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-bold">Technical Skills</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skillGroup, idx) => {
                        const Icon = categoryIcons[skillGroup.category] || Code2;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                    <Icon className="w-5 h-5 text-cyan-400" />
                                    <h3 className="text-lg font-bold text-white">{skillGroup.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((item, iIdx) => (
                                        <span
                                            key={iIdx}
                                            className="px-3 py-1.5 text-sm font-medium rounded-md bg-white/5 text-gray-300 border border-white/10 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/30 transition-all cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
