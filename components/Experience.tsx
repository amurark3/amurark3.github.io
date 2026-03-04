"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Building2, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { resumeData } from "@/data/resume";

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent mb-3">
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {resumeData.experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 border-2 border-background hidden sm:block" />

                <div
                  className={`rounded-2xl border bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-300 cursor-pointer ${
                    expanded === i ? "border-blue-500/40 shadow-lg shadow-blue-500/10" : "border-border/50 hover:border-border"
                  }`}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-blue-400 shrink-0" />
                          <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
                        </div>
                        <p className="text-blue-400 font-medium mb-2">{exp.title}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{exp.period}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{exp.location}</span>
                        </div>
                      </div>
                      {/* Metric chips */}
                      <div className="flex flex-wrap gap-2">
                        {exp.metrics.map((m) => (
                          <Badge key={m} variant="secondary" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {m}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-2">
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${expanded === i ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Accordion body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${expanded === i ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-6 pb-6 border-t border-border/30 pt-4">
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ opacity: 0, x: -10 }}
                            animate={expanded === i ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: bi * 0.06 }}
                            className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
