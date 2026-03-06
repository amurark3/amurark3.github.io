"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, ChevronDown, Calendar, MapPin, Zap } from "lucide-react";
import resumeData from "@/data/resume.json";

export function ExperienceSection() {
    const [expandedId, setExpandedId] = useState<number | null>(0); // first open by default

    const toggleExpand = (id: number) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    // Find most measurable bullets for impact highlights (any bullet with '%' or '$' or numbers)
    const impactHighlights = resumeData.experience
        .flatMap((exp) => exp.bullets)
        .filter((bullet) => bullet.includes("%") || bullet.includes("+"))
        .slice(0, 3); // top 3

    return (
        <section id="experience" className="py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center bg-blue-500/10 text-blue-400">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-bold">Experience</h2>
                </motion.div>

                {/* Impact Highlights Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-semibold">Top Impact Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {impactHighlights.map((highlight, idx) => (
                            <div key={idx} className="glass-card p-5 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-colors">
                                <Zap className="w-5 h-5 text-blue-400 mb-3" />
                                <p className="text-sm text-gray-300 leading-relaxed">{highlight}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Experience Timeline / Cards */}
                <div className="flex flex-col gap-6">
                    {resumeData.experience.map((exp, idx) => {
                        const isExpanded = expandedId === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px" }}
                                transition={{ delay: idx * 0.1 }}
                                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${isExpanded ? "border-blue-500/40 bg-white/[0.04]" : "border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleExpand(idx)}
                                    className="w-full text-left p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                >
                                    <div className="flex-1 text-left">
                                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <p className="text-lg text-blue-300 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col md:items-end gap-2 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{exp.dates}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                        <div className={`hidden md:flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full glass transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 border-t border-white/10 mt-2">
                                                <ul className="space-y-4">
                                                    {exp.bullets.map((bullet, blIdx) => {
                                                        // Extract metrics (numbers, %, $) to highlight them as chips
                                                        const words = bullet.split(" ");
                                                        return (
                                                            <li key={blIdx} className="flex gap-4 group">
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform flex-shrink-0" />
                                                                <p className="text-gray-300 leading-relaxed text-base">
                                                                    {words.map((word, wIdx) => {
                                                                        const isMetric = /[0-9]+%|[0-9]+\+|[0-9]+[kM]|decrease|boost|improvement/i.test(word);
                                                                        if (isMetric) {
                                                                            return (
                                                                                <span key={wIdx} className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-blue-500/20 text-blue-300 font-medium">
                                                                                    {word}{" "}
                                                                                </span>
                                                                            );
                                                                        }
                                                                        return <span key={wIdx}>{word} </span>;
                                                                    })}
                                                                </p>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
