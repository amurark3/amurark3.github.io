"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/useInView";

interface FadeInProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
  as?: "div" | "li";
}

export function FadeIn({ children, delayMs = 0, className, as: Tag = "div" }: FadeInProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const visible = useInView(node, { once: true });

  return (
    <Tag
      ref={setNode}
      className={cn("fade-in-section", visible && "is-visible", className)}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
