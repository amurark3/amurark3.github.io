"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];

        // Resize handler
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            alpha: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.radius = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(180, 200, 255, ${this.alpha})`;
                ctx!.fill();
            }
        }

        const initParticles = () => {
            particles.length = 0;
            // Adjust particle count based on screen size to save mobile performance
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 30 : 70;
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx!.beginPath();
                        ctx!.strokeStyle = `rgba(180, 200, 255, ${0.1 * (1 - distance / 150)})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.moveTo(particles[i].x, particles[i].y);
                        ctx!.lineTo(particles[j].x, particles[j].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            // The background mesh gradient itself will be handled via CSS so we just clear.

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            drawLines();

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initial setup
        handleResize();
        window.addEventListener("resize", handleResize);
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [shouldReduceMotion]);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050510] bg-[radial-gradient(circle_at_50%_0%,rgba(20,30,60,1),rgba(5,5,16,1)_70%)] transition-colors duration-1000">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
            />
        </div>
    );
}
