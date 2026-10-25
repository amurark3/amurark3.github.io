"use client";

import { useEffect, useState } from "react";

interface InViewOptions {
  /** Stop observing after the element first becomes visible. */
  once?: boolean;
  threshold?: number;
}

export function useInView(node: Element | null, { once = false, threshold = 0.1 }: InViewOptions = {}): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, threshold]);

  return inView;
}
