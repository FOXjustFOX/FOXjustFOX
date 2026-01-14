"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Card } from "./ui/Card";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(".about-text", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
        });

    }, { scope: container });

    return (
        <section ref={container} id="about" className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative cursor-default">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="about-text text-sm font-mono text-accent uppercase tracking-wider">About Me</h2>
                    <h3 className="about-text text-3xl md:text-4xl font-bold leading-tight">
                        Systems Engineering student at <span className="text-primary">WUST</span>, leading developer in WMS Dev.
                    </h3>
                    <p className="about-text text-white/70 leading-relaxed">
                        Founded <span className="text-white font-medium">PWr Now</span>: student event app with Gemini AI features for smarter discovery—grew to <span className="text-secondary">400 users</span> via targeted TikTok marketing (200k views).
                    </p>
                    <p className="about-text text-white/70 leading-relaxed">
                        DevOps focus: GitOps workflows, Kubernetes YAML for CI/CD transitions, container orchestration. Hands-on with Hugging Face for audio, Ollama fine-tuning.
                    </p>
                </div>

                <div className="relative about-text">
                    {/* Abstract Visual Representation of 'About' since no photo was provided in assets, using a stylish card layout */}
                    <Card className="relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <code className="block font-mono text-sm text-white/80">
                                <span className="text-primary">class</span> <span className="text-yellow-300">IgorLis</span> <span className="text-primary">extends</span> <span className="text-yellow-300">Engineer</span> {"{"}<br />
                                &nbsp;&nbsp;role: <span className="text-green-400">"Founder & DevOps Lead"</span>;<br />
                                &nbsp;&nbsp;education: <span className="text-green-400">"WUST Systems Engineering"</span>;<br />
                                &nbsp;&nbsp;stack: [<span className="text-green-400">"K8s"</span>, <span className="text-green-400">"Go"</span>, <span className="text-green-400">"Next.js"</span>];<br />
                                {"}"}
                            </code>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
