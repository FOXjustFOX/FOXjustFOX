import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import profilePhoto from "./assets/profile-photo.jpg";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    // References for scroll animations
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const softSkillsRef = useRef(null);
    const careerRef = useRef(null);
    const educationRef = useRef(null);

    // Check if elements are in view
    const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
    const isProjectsInView = useInView(projectsRef, {
        once: true,
        amount: 0.2,
    });
    const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
    const isSoftSkillsInView = useInView(softSkillsRef, {
        once: true,
        amount: 0.2,
    });
    const isCareerInView = useInView(careerRef, { once: true, amount: 0.2 });
    const isEducationInView = useInView(educationRef, {
        once: true,
        amount: 0.2,
    });

    return (
        <motion.div
            className="min-h-screen w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-8 gap-8">
                {/* Left column - Photo and personal info */}
                <motion.div
                    className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}>
                    <img
                        src={profilePhoto}
                        alt="Profile Photo"
                        className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-primary shadow-lg"
                    />
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold mb-6">Igor Lis</h1>
                        <div className="space-y-3">
                            <p className="flex flex-col lg:flex-row items-center lg:items-start">
                                <span className="font-semibold text-gray-300 mr-2">
                                    Email:
                                </span>
                                <motion.a
                                    href="mailto:igor@lis.rocks"
                                    className="text-primary hover:text-primary-hover transition-colors"
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    transition={{ duration: 0.2 }}>
                                    igor@lis.rocks
                                </motion.a>
                            </p>
                            <p className="flex flex-col lg:flex-row items-center lg:items-start">
                                <span className="font-semibold text-gray-300 mr-2">
                                    Location:
                                </span>
                                <span className="text-gray-400">
                                    Wrocław, Poland
                                </span>
                            </p>
                            <p className="flex flex-col lg:flex-row items-center lg:items-start">
                                <span className="font-semibold text-gray-300 mr-2">
                                    GitHub:
                                </span>
                                <motion.a
                                    href="https://github.com/FOXjustFOX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-hover transition-colors"
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    transition={{ duration: 0.2 }}>
                                    FOXjustFOX
                                </motion.a>
                            </p>
                            <p className="flex flex-col lg:flex-row items-center lg:items-start">
                                <span className="font-semibold text-gray-300 mr-2">
                                    LinkedIn:
                                </span>
                                <motion.a
                                    href="https://www.linkedin.com/in/igor-lis-4b3923254/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-hover transition-colors"
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    transition={{ duration: 0.2 }}>
                                    Igor Lis
                                </motion.a>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Right column - CV content */}
                <div className="lg:w-2/3 space-y-8">
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={aboutRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isAboutInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            About Me
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            I'm a self-taught programmer who started coding at
                            age 13. My journey began with Python and C++, but
                            over the years, I expanded my expertise to React,
                            TypeScript, JavaScript, and Python, and I'm
                            currently learning Rust. I'm proficient in frontend
                            and backend development, experienced with Docker and
                            server management, and passionate about building
                            impactful software.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={projectsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isProjectsInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            ease: "easeOut",
                        }}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            Key Projects
                        </h2>
                        <ul className="space-y-4 list-none p-0">
                            <motion.li
                                className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor:
                                        "rgba(100, 108, 255, 0.08)",
                                }}
                                transition={{ duration: 0.2 }}>
                                <Link
                                    to="/projects/Dont-Get-Expelled"
                                    className="block text-gray-300 no-underline hover:text-white">
                                    <strong className="text-primary">
                                        DontGetExpelled
                                    </strong>{" "}
                                    – A Python/Pygame-based game about my high
                                    school, where I led a team and handled most
                                    of the programming.
                                </Link>
                            </motion.li>
                            <motion.li
                                className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor:
                                        "rgba(100, 108, 255, 0.08)",
                                }}
                                transition={{ duration: 0.2 }}>
                                <Link
                                    to="/projects/girl_project"
                                    className="block text-gray-300 no-underline hover:text-white">
                                    <strong className="text-primary">
                                        The Girl Project
                                    </strong>{" "}
                                    – A special website for International
                                    Women's Day, designed for the most important
                                    women in my life. The website was accessed
                                    via an NFC tag hidden in an origami card and
                                    received highly positive reactions.
                                </Link>
                            </motion.li>
                            <motion.li
                                className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor:
                                        "rgba(100, 108, 255, 0.08)",
                                }}
                                transition={{ duration: 0.2 }}>
                                <Link
                                    to="/projects/qrcode_gen_web"
                                    className="block text-gray-300 no-underline hover:text-white">
                                    <strong className="text-primary">
                                        QR Code Generator for WRSS W4 at PWr
                                    </strong>{" "}
                                    – A web tool widely used by the entire
                                    Informatics and Telecommunications
                                    department at Politechnika Wrocławska.
                                </Link>
                            </motion.li>
                            <motion.li
                                className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor:
                                        "rgba(100, 108, 255, 0.08)",
                                }}
                                transition={{ duration: 0.2 }}>
                                <span className="block text-gray-300">
                                    <strong className="text-primary">
                                        Personal Server & Auto-Deploy System
                                    </strong>{" "}
                                    – I host my website and multiple APIs on a
                                    Docker-managed home server, featuring
                                    auto-deployment from GitHub with a script
                                    that updates the server's public IP.
                                </span>
                            </motion.li>
                            <motion.li
                                className="p-4 rounded-lg bg-gray-700 border border-gray-600"
                                whileHover={{
                                    scale: 1.02,
                                    backgroundColor:
                                        "rgba(100, 108, 255, 0.08)",
                                }}
                                transition={{ duration: 0.2 }}>
                                <span className="block text-gray-300">
                                    <strong className="text-primary">
                                        [Current Project]
                                    </strong>{" "}
                                    – I'm developing an app in Django and React
                                    that aims to improve students' lives in
                                    Wrocław (details confidential for now).
                                </span>
                            </motion.li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={skillsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isSkillsInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeOut",
                        }}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            Skills & Expertise
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-200">
                                    Languages & Frameworks
                                </h3>
                                <ul className="space-y-2 list-none p-0">
                                    <li className="text-gray-300">React</li>
                                    <li className="text-gray-300">
                                        TypeScript
                                    </li>
                                    <li className="text-gray-300">
                                        JavaScript
                                    </li>
                                    <li className="text-gray-300">Python</li>
                                    <li className="text-gray-300">Django</li>
                                    <li className="text-gray-300">
                                        Rust (learning)
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-200">
                                    Other Skills
                                </h3>
                                <ul className="space-y-2 list-none p-0">
                                    <li className="text-gray-300">Docker</li>
                                    <li className="text-gray-300">
                                        Server Management
                                    </li>
                                    <li className="text-gray-300">
                                        API Development
                                    </li>
                                    <li className="text-gray-300">
                                        Responsive UI Design
                                    </li>
                                    <li className="text-gray-300">CSS</li>
                                    <li className="text-gray-300">
                                        Web Performance Optimization
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={softSkillsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isSoftSkillsInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: "easeOut",
                        }}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            Soft Skills
                        </h2>
                        <ul className="space-y-2 list-none p-0">
                            <li className="text-gray-300">
                                Strong teamwork and communication skills
                            </li>
                            <li className="text-gray-300">
                                A fast learner who adapts quickly
                            </li>
                            <li className="text-gray-300">
                                Creative and problem-solving oriented
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={careerRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isCareerInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.4,
                            ease: "easeOut",
                        }}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            Career Goals
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            I aim to contribute to IT solutions that make a
                            positive impact on the world. I admire companies
                            like Google for their innovation and large-scale
                            impact.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={educationRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isEducationInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{
                            duration: 0.5,
                            delay: 0.5,
                            ease: "easeOut",
                        }}>
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            Education
                        </h2>
                        <ul className="space-y-2 list-none p-0">
                            <li className="text-gray-300">
                                3rd High School of Stefan Batory, Chorzów
                            </li>
                            <li className="text-gray-300">
                                Currently studying Systems Engineering at
                                Politechnika Wrocławska
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
