"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/data/resume";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent mb-3">
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {resumeData.projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.07), transparent 70%)" }}
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-violet-400" />
                    {project.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-violet-400" />
                    {project.year}
                  </span>
                </div>
                <ul className="mb-4 space-y-2">
                  {project.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
