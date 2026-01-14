"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Card } from "./ui/Card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "PWr Now",
        role: "Founder & Lead DevOps",
        desc: "iOS/Android app connecting PWr students to events—Gemini AI for personalized recommendations, summaries, event insights.",
        stats: "400 users, 200k TikTok views",
        tech: ["Kubernetes", "GitOps", "Gemini", "React Native"],
        link: "https://pwrnow.pl"
    },
    {
        title: "Personal AI Clone",
        role: "AI/ML Engineer",
        desc: "Fine-tuned Ollama model on Facebook/WhatsApp data to create local 'me' chatbot—privacy‑focused, runs offline.",
        stats: "Full Pipeline: Export -> Train -> Inference",
        tech: ["Ollama", "Python", "Local LLMs"],
        link: "#"
    },
    {
        title: "Audio Pipeline",
        role: "Backend Engineer",
        desc: "Advanced speech‑to‑text with OpenAI Whisper + Hugging Face libs (Transformers, datasets, pipelines).",
        stats: "Custom Workflows",
        tech: ["Whisper", "Hugging Face", "PyTorch"],
        link: "#"
    },
    {
        title: "WMS Dev",
        role: "Contributor",
        desc: "Team web app builds in student org—collaborative coding, infra automation.",
        stats: "Collaborative Coding",
        tech: ["Automation", "Web", "Infra"],
        link: "#"
    }
];

export default function Projects() {
    const container = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!slider.current || !container.current) return;

        // Horizontal scroll calculation
        // The logic: Pin the container, animate the slider to the left by (totalWidth - viewportWidth)
        const totalWidth = slider.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const x = -(totalWidth - viewportWidth + 100); // 100px buffer or padding

        gsap.to(slider.current, {
            x: () => - (slider.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                scrub: 1,
                // Adjust end to control speed/distance. 
                // end: () => "+=" + slider.current!.scrollWidth,
                end: "+=3000",
                invalidateOnRefresh: true,
            }
        });

    }, { scope: container });

    return (
        <section id="projects" ref={container} className="h-screen w-full overflow-hidden flex flex-col justify-center py-24 bg-dark relative">
            <div className="absolute top-12 left-12 md:left-20 z-10">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Selected Projects</h2>
                <p className="text-white/50 mt-2">Scroll to explore</p>
            </div>

            <div ref={slider} className="flex gap-8 px-12 md:px-20 w-max items-center h-[60vh] mt-20">
                {projects.map((project, i) => (
                    <Card key={i} className="w-[85vw] md:w-[600px] h-full flex flex-col justify-between group border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-500">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-mono text-primary border border-primary/20 px-2 py-1 rounded">{project.role}</span>
                                <Link href={project.link} className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white transition-colors">
                                    <ArrowUpRight size={20} />
                                </Link>
                            </div>
                            <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                            <p className="text-white/70 text-lg leading-relaxed mb-6">{project.desc}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map(t => (
                                    <span key={t} className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <p className="text-secondary font-mono text-sm">{project.stats}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
