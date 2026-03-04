"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Code2, Brain, Layout, Server, Wrench, TestTube } from "lucide-react";

const skillGroups = [
  { key: "languages" as const, label: "Languages", icon: Code2, color: "blue" },
  { key: "aiml" as const, label: "AI / ML", icon: Brain, color: "violet" },
  { key: "frontend" as const, label: "Frontend", icon: Layout, color: "cyan" },
  { key: "backend" as const, label: "Backend", icon: Server, color: "emerald" },
  { key: "tools" as const, label: "Tools & Infrastructure", icon: Wrench, color: "orange" },
  { key: "testing" as const, label: "Testing & Analytics", icon: TestTube, color: "rose" },
];

const colorMap: Record<string, string> = {
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  orange: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  rose: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const iconColorMap: Record<string, string> = {
  blue: "text-blue-400",
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
  orange: "text-orange-400",
  rose: "text-rose-400",
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-cyan-600 dark:from-white dark:to-cyan-400 bg-clip-text text-transparent mb-3">
            Skills
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => {
            const Icon = group.icon;
            const items = resumeData.skills[group.key];
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm p-5 hover:border-border transition-all"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at top left, rgba(59,130,246,0.06), transparent 70%)` }}
                />
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={`h-4 w-4 ${iconColorMap[group.color]}`} />
                  <span className="text-sm font-semibold text-foreground">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorMap[group.color]}`}
                    >
                      {skill}
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
