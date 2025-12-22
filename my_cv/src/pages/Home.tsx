import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SnakeGame from "../components/SnakeGame";
import cvData from "../data/cv-data.json";
import "../styles/fox.css";

const Home: React.FC = () => {
    const { basics, sections } = cvData;

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            {/* Hero Section */}
            <section className="hero-section">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}>
                    <motion.div
                        className="hero-image-container"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
                        <img
                            src={basics.picture.url}
                            alt={basics.name}
                            className="hero-profile-image"
                        />
                        <motion.div
                            className="hero-image-glow"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}>
                        Hi, I'm{" "}
                        <motion.span
                            className="hero-name"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}>
                            {basics.name}
                        </motion.span>
                    </motion.h1>

                    <motion.h2
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}>
                        {basics.headline}
                    </motion.h2>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        dangerouslySetInnerHTML={{
                            __html: sections.summary.content,
                        }}
                    />

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}>
                        <Link to="/about" className="cta-button primary">
                            Learn More About Me
                        </Link>
                        <Link to="/projects" className="cta-button secondary">
                            View My Projects
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero-social"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.4 }}>
                        {sections.profiles.items.map((profile, index) => (
                            <motion.a
                                key={profile.id}
                                href={profile.url.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}>
                                {profile.network}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Animated Background Elements */}
                <motion.div
                    className="hero-bg-circle circle-1"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="hero-bg-circle circle-2"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="hero-bg-circle circle-3"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -180, -360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </section>

            {/* Snake Game Section */}
            <motion.section
                className="game-section-modern"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}>
                <motion.div
                    className="game-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}>
                    <h2 className="game-title-modern">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 2 }}>
                            Take a Break
                        </motion.span>
                        <motion.span
                            className="game-emoji"
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}>
                            🎮
                        </motion.span>
                    </h2>
                    <motion.p
                        className="game-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 2.2 }}>
                        Challenge yourself with a classic Snake game!
                    </motion.p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 2.4 }}>
                    <SnakeGame />
                </motion.div>
            </motion.section>
        </motion.div>
    );
};

export default Home;
