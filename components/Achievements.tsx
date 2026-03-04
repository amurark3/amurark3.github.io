"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { resumeData } from "@/data/resume";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-violet-600 dark:from-white dark:to-violet-400 bg-clip-text text-transparent mb-3">
            Key Achievements
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumeData.achievements.map((ach, i) => (
            <motion.div
              key={ach.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-violet-500/40 transition-all cursor-default"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <Trophy className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-br from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    <Counter target={ach.value} suffix={ach.suffix} />
                  </div>
                  <div className="text-sm font-medium text-foreground mt-0.5">{ach.label}</div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{ach.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
