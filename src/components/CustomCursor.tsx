"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        // Initial positioning
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

        // Slower follower
        const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
        const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xToFollower(e.clientX);
            yToFollower(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Add hover states for interactive elements
        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 0, duration: 0.3 });
            gsap.to(follower, { scale: 3, backgroundColor: "rgba(124, 58, 237, 0.2)", borderColor: "transparent", duration: 0.3 });
        };
        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, backgroundColor: "transparent", borderColor: "rgba(124, 58, 237, 0.5)", duration: 0.3 });
        };

        // We need to attach listeners to elements dynamically or delegate
        // Delegation is better for performance and dynamic content
        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, .interactive')) {
                handleMouseEnter();
            }
        };
        const handleMouseOut = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('a, button, .interactive')) {
                handleMouseLeave();
            }
        };

        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference" />
            <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[99] transition-colors duration-300" />
        </>
    );
}
