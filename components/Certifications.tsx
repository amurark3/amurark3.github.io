"use client";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent mb-3">
            Certifications
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {resumeData.certifications.map((cert) => (
            <motion.div
              key={cert}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group flex items-center gap-2 px-5 py-3 rounded-full border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all cursor-default"
            >
              <Award className="h-4 w-4 text-orange-400 shrink-0" />
              <span className="text-sm font-medium text-foreground">{cert}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
