"use client";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Contact() {
  const { basics } = resumeData;
  return (
    <section id="contact" className="py-20 px-4">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-8"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <a href={`mailto:${basics.email}`} className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Primary Email</div>
                <div className="text-sm text-foreground group-hover:text-blue-400 transition-colors">{basics.email}</div>
              </div>
            </a>
            <a href={`mailto:${basics.email2}`} className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">ASU Email</div>
                <div className="text-sm text-foreground group-hover:text-blue-400 transition-colors">{basics.email2}</div>
              </div>
            </a>
            <a href={`tel:${basics.phone}`} className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover:bg-violet-500/20 transition-colors">
                <Phone className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Phone</div>
                <div className="text-sm text-foreground group-hover:text-violet-400 transition-colors">{basics.phone}</div>
              </div>
            </a>
            <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Linkedin className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                <div className="text-sm text-foreground group-hover:text-blue-400 transition-colors">adityamurarka14</div>
              </div>
            </a>
            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <MapPin className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Location</div>
                <div className="text-sm text-foreground">{basics.location}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} Aditya Murarka · Built with Next.js
        </div>
      </div>
    </section>
  );
}
