"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const roles = [
        "Founder of PWr Now (400+ users, 200k TikTok views)",
        "Systems Engineering Student at WUST",
        "DevOps & AI Specialist from Wrocław",
    ];

    // Particle Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2,
                alpha: Math.random() * 0.5,
            });
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }
        animate();

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Text Morphing / Cycling
    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1 });
        roles.forEach((role) => {
            tl.to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    if (textRef.current) textRef.current.innerText = role;
                },
            })
                .to(textRef.current, { opacity: 1, y: 0, duration: 0.5 })
                .to({}, { duration: 2 }); // wait
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />

            <div className="z-10 text-center px-4 max-w-4xl">
                <h1 className="text-sm md:text-md uppercase tracking-[0.2em] text-accent mb-4 font-mono">
                    Igor Lis
                </h1>
                <h2 ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 min-h-[3em] flex items-center justify-center">
                    {roles[0]}
                </h2>

                <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
                    Kubernetes pipelines, local LLMs, audio AI processing, and student app scaling.
                </p>

                <div className="mt-10 flex gap-4 justify-center">
                    {/* Using null href for scroll behavior via standard anchor links later or just button for now */}
                    <Button size="lg" className="rounded-full px-8" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Projects
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Contact Me
                    </Button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll" />
                </div>
            </div>
        </section>
    );
}
