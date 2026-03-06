"use client";

import { motion } from "framer-motion";
import { FolderGit2, Calendar, MapPin, ExternalLink } from "lucide-react";
import resumeDataRaw from "@/data/resume.json";

interface Project {
    title: string;
    location?: string;
    dates: string;
    url?: string;
    bullets: string[];
}

const resumeData = resumeDataRaw as { projects: Project[] };

export function ProjectsSection() {
    const { projects } = resumeData;

    if (!projects || projects.length === 0) return null;

    return (
        <section id="projects" className="py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    className="flex items-center gap-4 mb-12"
                >
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center bg-rose-500/10 text-rose-400">
                        <FolderGit2 className="w-6 h-6" />
                    </div>
                    <h2 className="text-4xl font-bold">Software Projects</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => {
                        const isLink = !!project.url;
                        const CardComponent = isLink ? motion.a : motion.div;
                        const linkProps = isLink ? { href: project.url, target: "_blank", rel: "noopener noreferrer" } : {};

                        return (
                            <CardComponent
                                {...linkProps}
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px" }}
                                transition={{ delay: idx * 0.1 }}
                                className={`glass-card flex flex-col p-8 rounded-2xl border transition-all group ${isLink
                                    ? "border-rose-500/20 hover:border-rose-400/50 cursor-pointer"
                                    : "border-white/10"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className={`text-2xl font-bold text-white mb-2 transition-colors ${isLink ? "group-hover:text-rose-400" : ""}`}>
                                            {project.title}
                                        </h3>
                                        <div className="flex flex-col gap-1 text-sm text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{project.dates}</span>
                                            </div>
                                            {project.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{project.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isLink && (
                                        <div className="p-2 rounded-full glass bg-rose-500/10 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-4 flex-grow">
                                    {project.bullets.map((bullet, blIdx) => (
                                        <li key={blIdx} className="flex gap-4">
                                            <div className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isLink ? "bg-rose-500" : "bg-gray-500"}`} />
                                            <p className="text-gray-300 leading-relaxed text-base">{bullet}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardComponent>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
