"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete();
      return;
    }
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      setProgress(Math.min(100, Math.round((current / steps) * 100)));
      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0f1e]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* AM Monogram */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="relative mb-12"
          >
            <div className="w-28 h-28 rounded-full border-2 border-blue-500/30 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-xl" />
              <motion.span
                className="text-5xl font-bold bg-gradient-to-br from-blue-400 to-violet-500 bg-clip-text text-transparent select-none"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AM
              </motion.span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-500/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-64"
          >
            <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-3 text-center text-xs text-white/30 tracking-widest uppercase">
              Loading Portfolio
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
