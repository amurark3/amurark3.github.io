"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollSpy() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress(totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}
