"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import resumeData from "@/data/resume.json";

export function EducationSection() {
    const { education, certifications } = resumeData;

    return (
        <section id="education" className="py-24 px-6 relative z-10 bg-gradient-to-t from-[#030308] to-emerald-900/10">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Education */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center bg-emerald-500/10 text-emerald-400">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h2 className="text-4xl font-bold">Education</h2>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        {education.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/50 transition-colors"
                            >
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                                    {edu.degree}
                                </h3>
                                <p className="text-lg text-emerald-300 font-medium mb-4">{edu.institution}</p>
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>{edu.dates}</span>
                                    {edu.location && <span>{edu.location}</span>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-12 h-12 rounded-full glass flex items-center justify-center bg-amber-500/10 text-amber-400">
                            <Award className="w-6 h-6" />
                        </div>
                        <h2 className="text-4xl font-bold">Certifications</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {certifications.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "0px" }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card p-4 rounded-xl flex items-center gap-3 border border-amber-500/20 hover:border-amber-400/50"
                            >
                                <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                <span className="text-gray-300 font-medium">{cert}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
