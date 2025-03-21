import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Home: React.FC = () => {
    // References for scroll animations
    const sidebarRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const softSkillsRef = useRef(null);
    const careerRef = useRef(null);
    const educationRef = useRef(null);

    // Check if elements are in view
    const isSidebarInView = useInView(sidebarRef, { once: true, amount: 0.2 });
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
            className="page home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="home-container">
                {/* Left column - Photo and personal info */}
                <motion.div
                    className="home-sidebar"
                    ref={sidebarRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                        isSidebarInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -50 }
                    }
                    transition={{ duration: 0.5, ease: "easeOut" }}>
                    <img
                        src="src/assets/profile-photo.jpg"
                        alt="Profile Photo"
                        className="profile-photo"
                    />
                    <div className="personal-info">
                        <h2>Contact Info</h2>
                        <p>Email: your.email@example.com</p>
                        <p>Location: Wrocław, Poland</p>
                        <p>GitHub: github.com/FOXjustFOX</p>
                        <p>LinkedIn: linkedin.com/in/yourprofile</p>
                    </div>
                </motion.div>

                {/* Right column - CV content */}
                <div className="home-content">
                    <motion.div
                        className="cv-section"
                        ref={aboutRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isAboutInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        <h2>About Me</h2>
                        <p>
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
                        className="cv-section"
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
                        <h2>Key Projects</h2>
                        <ul>
                            <li>
                                <strong>DontGetExpelled</strong> – A
                                Python/Pygame-based game about my high school,
                                where I led a team and handled most of the
                                programming.
                            </li>
                            <li>
                                <strong>The Girl Project</strong> – A special
                                website for International Women's Day, designed
                                for the most important women in my life. The
                                website was accessed via an NFC tag hidden in an
                                origami card and received highly positive
                                reactions.
                            </li>
                            <li>
                                <strong>
                                    QR Code Generator for WRSS W4 at PWr
                                </strong>{" "}
                                – A web tool widely used by the entire
                                Informatics and Telecommunications department at
                                Politechnika Wrocławska.
                            </li>
                            <li>
                                <strong>
                                    Personal Server & Auto-Deploy System
                                </strong>{" "}
                                – I host my website and multiple APIs on a
                                Docker-managed home server, featuring
                                auto-deployment from GitHub with a script that
                                updates the server's public IP.
                            </li>
                            <li>
                                <strong>[Current Project]</strong> – I'm
                                developing an app in Django and React that aims
                                to improve students' lives in Wrocław (details
                                confidential for now).
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="cv-section"
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
                        <h2>Skills & Expertise</h2>
                        <div className="skills-grid">
                            <div>
                                <h3>Languages & Frameworks</h3>
                                <ul>
                                    <li>React</li>
                                    <li>TypeScript</li>
                                    <li>JavaScript</li>
                                    <li>Python</li>
                                    <li>Django</li>
                                    <li>Rust (learning)</li>
                                </ul>
                            </div>
                            <div>
                                <h3>Other Skills</h3>
                                <ul>
                                    <li>Docker</li>
                                    <li>Server Management</li>
                                    <li>API Development</li>
                                    <li>Responsive UI Design</li>
                                    <li>CSS</li>
                                    <li>Web Performance Optimization</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="cv-section"
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
                        <h2>Soft Skills</h2>
                        <ul>
                            <li>Strong teamwork and communication skills</li>
                            <li>A fast learner who adapts quickly</li>
                            <li>Creative and problem-solving oriented</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="cv-section"
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
                        <h2>Career Goals</h2>
                        <p>
                            I aim to contribute to IT solutions that make a
                            positive impact on the world. I admire companies
                            like Google for their innovation and large-scale
                            impact.
                        </p>
                    </motion.div>

                    <motion.div
                        className="cv-section"
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
                        <h2>Education</h2>
                        <ul>
                            <li>3rd High School of Stefan Batory, Chorzów</li>
                            <li>
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
