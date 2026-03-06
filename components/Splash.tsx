"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Splash({ onComplete }: { onComplete: () => void }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(onComplete, 800); // Wait for exit animation
        }, 1800); // 1.8s duration

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030308]"
            initial={{ opacity: 1 }}
            animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative flex flex-col items-center">
                {/* Monogram */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8"
                >
                    Unlocking greatness
                </motion.div>

                {/* Loading Bar Container */}
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
