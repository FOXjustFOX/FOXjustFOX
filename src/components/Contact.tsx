"use client";
import React from "react";
import { Button } from "./ui/Button";
import { Copy, Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    const handleCopy = () => {
        navigator.clipboard.writeText("contact@pwrnow.pl"); // Placeholder email or logical one
        // In a real app we'd show a toast
    };

    return (
        <section id="contact" className="py-24 px-4 md:px-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's Connect</h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
                Building the future of student apps and AI pipelines. <br />
                <span className="text-accent">Available for Internships: DevOps, full‑stack, AI. Wrocław/remote.</span>
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-full px-8 hover:bg-white/10 transition-colors">
                    <Mail size={20} className="text-primary" />
                    <span>igor.lis@student.pwr.edu.pl</span> {/* Hypothetical email or just generic */}
                </div>

                <div className="flex gap-4">
                    <Link href="https://github.com" target="_blank">
                        <Button variant="outline" size="md" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                            <Github size={20} />
                        </Button>
                    </Link>
                    <Link href="https://linkedin.com" target="_blank">
                        <Button variant="outline" size="md" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
                            <Linkedin size={20} />
                        </Button>
                    </Link>
                    <Link href="https://pwrnow.pl" target="_blank">
                        <Button variant="primary" className="rounded-full">
                            Visit PWr Now
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-12">
                <Button variant="ghost" className="text-white/40 hover:text-white">
                    Download CV (PDF)
                </Button>
            </div>
        </section>
    );
}
