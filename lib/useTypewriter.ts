"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface TypewriterOptions {
  speedMs?: number;
  startDelayMs?: number;
}

/** Reveals `text` one character at a time; shows it all at once for reduced-motion users. */
export function useTypewriter(text: string, { speedMs = 110, startDelayMs = 300 }: TypewriterOptions = {}): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let typed = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= text.length) clearInterval(interval);
      }, speedMs);
    }, startDelayMs);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speedMs, startDelayMs]);

  return text.slice(0, count);
}
