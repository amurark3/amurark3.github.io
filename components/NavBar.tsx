"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, Briefcase, FolderGit2, Trophy, Code2, GraduationCap } from "lucide-react";

const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "projects", icon: FolderGit2, label: "Projects" },
    { id: "achievements", icon: Trophy, label: "Achievements" },
    { id: "skills", icon: Code2, label: "Skills" },
    { id: "education", icon: GraduationCap, label: "Education" },
];

export function NavBar() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        navItems.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-950/80 backdrop-blur-2xl rounded-full p-2 border border-white/20 flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`relative p-3 rounded-full flex items-center justify-center transition-colors group ${isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                            }`}
                        aria-label={item.label}
                        title={item.label}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <Icon className="w-5 h-5 relative z-10" />

                        {/* Tooltip on desktop */}
                        <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-xs py-1 px-2 rounded hidden md:block border border-white/10">
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </motion.nav>
    );
}
