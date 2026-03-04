"use client";
import { motion } from "framer-motion";
import { Languages, Star } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function AdditionalInfo() {
  return (
    <section id="additional" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-pink-600 dark:from-white dark:to-pink-400 bg-clip-text text-transparent mb-3">
            Additional Info
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Languages className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-foreground">Languages Spoken</h3>
            </div>
            <div className="space-y-2">
              {resumeData.languages.map((lang) => (
                <div key={lang.language} className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{lang.language}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-violet-400" />
              <h3 className="font-semibold text-foreground">Top Skills</h3>
            </div>
            <div className="space-y-2">
              {resumeData.topSkills.map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span className="text-sm text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
