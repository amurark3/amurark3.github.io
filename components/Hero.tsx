"use client";
import { motion } from "framer-motion";
import { ChevronDown, Download, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";

export default function Hero() {
  const { basics } = resumeData;
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-br from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
            {basics.name}
          </h1>
          {/* Title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed"
          >
            {basics.title}
          </motion.p>
          {/* Summary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm sm:text-base text-muted-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {basics.summary}
          </motion.p>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-blue-400" />{basics.location}</span>
            <a href={`mailto:${basics.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Mail className="h-3.5 w-3.5 text-blue-400" />{basics.email}
            </a>
            <a href={`tel:${basics.phone}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="h-3.5 w-3.5 text-blue-400" />{basics.phone}
            </a>
            <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Linkedin className="h-3.5 w-3.5 text-blue-400" />LinkedIn
            </a>
          </motion.div>
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white border-0 px-8"
            >
              View Experience <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10"
            >
              <a href="/resume"><Download className="mr-2 h-4 w-4" />Download Resume</a>
            </Button>
          </motion.div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-blue-400/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
