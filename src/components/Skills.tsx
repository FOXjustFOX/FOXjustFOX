"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const skillsData = [
    { category: "Programming", items: ["Python", "JS/TS", "Go"] },
    { category: "DevOps/CI/CD", items: ["Kubernetes", "Git", "Argo CD", "Helm"] },
    { category: "AI/ML", items: ["Gemini", "Ollama", "Hugging Face", "Whisper"] },
    { category: "Infra", items: ["Docker", "Coolify", "Terraform", "GCP", "AWS"] },
    { category: "Web", items: ["React Native", "REST APIs", "Auth"] },
];

export default function Skills() {
    const container = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useGSAP(() => {
        gsap.from(".skill-category", {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Technologies</h2>

            <div className="space-y-12">
                {skillsData.map((group, idx) => (
                    <div key={idx} className="skill-category">
                        <h3 className="text-xl text-white/50 mb-4 font-mono">{group.category}</h3>
                        <div className="flex flex-wrap gap-4">
                            {group.items.map((skill) => (
                                <div
                                    key={skill}
                                    className="group relative cursor-pointer"
                                >
                                    {/* Toggle Switch Appearance */}
                                    <div className={cn(
                                        "relative flex items-center px-4 py-2 bg-white/5 rounded-full border border-white/10 transition-all duration-300 overflow-hidden",
                                        "group-hover:border-primary/50 group-hover:shadow-[0_0_15px_-3px_rgba(124,58,237,0.3)]"
                                    )}>
                                        <div className="w-2 h-2 rounded-full bg-white/20 mr-3 transition-colors duration-300 group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                        <span className="text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                                            {skill}
                                        </span>

                                        {/* Hover Glow Background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
