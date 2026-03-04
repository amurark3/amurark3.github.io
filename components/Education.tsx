"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Education() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent mb-3">
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 to-transparent hidden sm:block" />
          <div className="space-y-6">
            {resumeData.education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative sm:pl-16"
              >
                <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 border-2 border-background hidden sm:block" />
                <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-emerald-500/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                      <GraduationCap className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{edu.school}</h3>
                      <p className="text-emerald-400 font-medium">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.field}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{edu.period}
                      </p>
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
