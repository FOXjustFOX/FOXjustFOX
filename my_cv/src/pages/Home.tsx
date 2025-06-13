import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/fox.css";

const Home: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const foxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMousePosition = (event: MouseEvent) => {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    // Calculate eye position based on mouse position
    const calculateEyePosition = () => {
        if (!foxRef.current) return { x: 0, y: 0 };

        const foxRect = foxRef.current.getBoundingClientRect();
        const foxCenterX = foxRect.left + foxRect.width / 2;
        const foxCenterY = foxRect.top + foxRect.height / 2;

        const deltaX = mousePosition.x - foxCenterX;
        const deltaY = mousePosition.y - foxCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxOffset = 4; // Increased offset for more eye movement

        const offsetX =
            Math.min(
                Math.max((deltaX / distance) * maxOffset, -maxOffset),
                maxOffset
            ) || 0;
        const offsetY =
            Math.min(
                Math.max((deltaY / distance) * maxOffset, -maxOffset),
                maxOffset
            ) || 0;

        return { x: offsetX, y: offsetY };
    };

    const eyeOffset = calculateEyePosition();

    return (
        <motion.div
            className="fox-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="fox-wrapper">
                <div ref={foxRef} className="fox-head">
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        className="fox-svg">
                        {/* Fox head shape */}
                        <ellipse
                            cx="100"
                            cy="120"
                            rx="45"
                            ry="40"
                            fill="#FF7B2D"
                        />

                        {/* Fox ears */}
                        <ellipse
                            cx="75"
                            cy="85"
                            rx="15"
                            ry="25"
                            fill="#FF7B2D"
                            transform="rotate(-30 75 85)"
                        />
                        <ellipse
                            cx="125"
                            cy="85"
                            rx="15"
                            ry="25"
                            fill="#FF7B2D"
                            transform="rotate(30 125 85)"
                        />

                        {/* Inner ears */}
                        <ellipse
                            cx="75"
                            cy="85"
                            rx="8"
                            ry="15"
                            fill="#FFB366"
                            transform="rotate(-30 75 85)"
                        />
                        <ellipse
                            cx="125"
                            cy="85"
                            rx="8"
                            ry="15"
                            fill="#FFB366"
                            transform="rotate(30 125 85)"
                        />

                        {/* Fox snout - centered */}
                        <ellipse
                            cx="100"
                            cy="135"
                            rx="30"
                            ry="20"
                            fill="#FFB366"
                        />

                        {/* Eyes */}
                        <circle cx="85" cy="110" r="8" fill="white" />
                        <circle cx="115" cy="110" r="8" fill="white" />

                        {/* Eye pupils that follow mouse */}
                        <motion.circle
                            cx={85 + eyeOffset.x}
                            cy={110 + eyeOffset.y}
                            r="4"
                            fill="black"
                            animate={{
                                cx: 85 + eyeOffset.x,
                                cy: 110 + eyeOffset.y,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        />
                        <motion.circle
                            cx={115 + eyeOffset.x}
                            cy={110 + eyeOffset.y}
                            r="4"
                            fill="black"
                            animate={{
                                cx: 115 + eyeOffset.x,
                                cy: 110 + eyeOffset.y,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        />

                        {/* Nose - centered */}
                        <ellipse cx="100" cy="130" rx="3" ry="2" fill="black" />

                        {/* Mouth */}
                        <path
                            d="M 90 145 Q 100 150 110 145"
                            stroke="black"
                            strokeWidth="2"
                            fill="none"
                        />

                        {/* Whiskers */}
                        <line
                            x1="60"
                            y1="125"
                            x2="75"
                            y2="120"
                            stroke="black"
                            strokeWidth="1"
                        />
                        <line
                            x1="60"
                            y1="135"
                            x2="75"
                            y2="135"
                            stroke="black"
                            strokeWidth="1"
                        />
                        <line
                            x1="125"
                            y1="120"
                            x2="140"
                            y2="125"
                            stroke="black"
                            strokeWidth="1"
                        />
                        <line
                            x1="125"
                            y1="135"
                            x2="140"
                            y2="135"
                            stroke="black"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                
            </div>
        </motion.div>
    );
};

export default Home;
