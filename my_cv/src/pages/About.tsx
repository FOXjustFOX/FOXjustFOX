import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import profilePhoto from "../assets/profile-photo.jpg";

const About: React.FC = () => {
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // References for scroll animations
    const introRef = useRef(null);
    const journeyRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const educationRef = useRef(null);
    const experienceRef = useRef(null);
    const languagesRef = useRef(null);
    const goalsRef = useRef(null);

    // Check if elements are in view
    const isIntroInView = useInView(introRef, { once: true, amount: 0.2 });
    const isJourneyInView = useInView(journeyRef, { once: true, amount: 0.2 });
    const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
    const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
    const isEducationInView = useInView(educationRef, { once: true, amount: 0.2 });
    const isExperienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
    const isLanguagesInView = useInView(languagesRef, { once: true, amount: 0.2 });
    const isGoalsInView = useInView(goalsRef, { once: true, amount: 0.2 });

    // Stagger children animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="page about-page-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="about-container-modern">
                {/* Header section with photo and basic info */}
                <motion.div
                    className="about-header-modern"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}>
                    <motion.div
                        className="about-profile-wrapper"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="about-profile-glow"></div>
                        <img
                            src={profilePhoto}
                            alt="Igor Lis - Junior Software Developer"
                            className="about-profile-photo-modern"
                        />
                    </motion.div>
                    <motion.div
                        className="about-header-text-modern"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}>
                            Igor Lis
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}>
                            Junior Software Developer
                        </motion.h2>
                        <motion.div
                            className="contact-info-modern"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 }}>
                                📧 <a className="link" href="mailto:igor@lis.rocks">igor@lis.rocks</a>
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.0 }}>
                                📍 Wrocław, Poland
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 1.1 }}>
                                📞 +48 690 535 212
                            </motion.p>
                        </motion.div>
                        <motion.div
                            className="social-links-modern"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible">
                            {['GitHub', 'LinkedIn', 'Portfolio'].map((name, index) => (
                                <motion.a
                                    key={name}
                                    href={
                                        name === 'GitHub' ? 'https://github.com/FOXjustFOX' :
                                        name === 'LinkedIn' ? 'https://www.linkedin.com/in/igor-lis-4b3923254/' :
                                        'https://igor.lis.rocks/about'
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    {...(isTouchDevice ? {} : { whileHover: { scale: 1.1, rotate: 3 } })}
                                    whileTap={{ scale: 0.95 }}
                                    className="social-link-modern">
                                    {name}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Main content */}
                <div className="about-content-modern">
                    {/* Introduction with floating animation */}
                    <motion.section
                        className="about-section-modern intro-section"
                        ref={introRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}>
                        <motion.div
                            className="section-icon"
                            animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                            👋
                        </motion.div>
                        <h3>Who I Am</h3>
                        <motion.div
                            className="intro-content"
                            initial={{ opacity: 0 }}
                            animate={isIntroInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}>
                            <p>
                                A passionate, self-taught programmer, coding since the age of 13. 
                                Proficient in frontend and backend software development, with hands-on 
                                experience in server management, Docker, and creating impactful software. 
                                A fast learner and strong team player with a creative approach to 
                                problem-solving, dedicated to creating applications that help others.
                            </p>
                        </motion.div>
                    </motion.section>

                    {/* Journey with timeline animation */}
                    <motion.section
                        className="about-section-modern journey-section"
                        ref={journeyRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isJourneyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}>
                        <motion.div
                            className="section-icon"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                            🚀
                        </motion.div>
                        <h3>My Journey</h3>
                        <motion.div
                            className="journey-timeline-modern"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isJourneyInView ? "visible" : "hidden"}>
                            {[
                                { title: "Age 13 - First Lines of Code", desc: "Started my programming journey with curiosity and determination." },
                                { title: "2020-2024 - High School Excellence", desc: "Studied Math and IT at III Liceum Ogólnokształcące im. Stefana Batorego in Chorzów, building a strong foundation in technology and problem-solving." },
                                { title: "2024-Present - University & Growth", desc: "Pursuing Systems Engineering at Wrocław University of Science and Technology while actively contributing to student organizations and real-world projects." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="timeline-item-modern"
                                    variants={itemVariants}
                                    {...(isTouchDevice ? {} : { whileHover: { x: 10 } })}>
                                    <motion.div
                                        className="timeline-marker-modern"
                                        initial={{ scale: 0 }}
                                        animate={isJourneyInView ? { scale: 1 } : { scale: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    />
                                    <div className="timeline-content-modern">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* Skills with progress bar animation */}
                    <motion.section
                        className="about-section-modern skills-section"
                        ref={skillsRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}>
                        <motion.div
                            className="section-icon"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                            ⚡
                        </motion.div>
                        <h3>Technical Expertise</h3>
                        <motion.div
                            className="skills-grid-modern"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isSkillsInView ? "visible" : "hidden"}>
                            {[
                                { title: "Frontend Development", level: 80, tags: ["React", "TypeScript", "Next.js", "Responsive UI"] },
                                { title: "Backend Development", level: 85, tags: ["Django", "API Design", "Big Data", "TypeScript"] },
                                { title: "DevOps & Infrastructure", level: 85, tags: ["Docker", "Git", "Linux", "AWS", "Google Cloud"] }
                            ].map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="skill-category-modern"
                                    variants={itemVariants}
                                    {...(isTouchDevice ? {} : { whileHover: { y: -5 } })}>
                                    <h4>{skill.title}</h4>
                                    <div className="skill-tags-modern">
                                        {skill.tags.map((tag, idx) => (
                                            <motion.span
                                                key={idx}
                                                className="skill-tag-modern"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={isSkillsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 + idx * 0.05 }}>
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                    <div className="skill-level-modern">
                                        <div className="skill-bar-modern">
                                            <motion.div
                                                className="skill-fill-modern"
                                                initial={{ width: 0 }}
                                                animate={isSkillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                                                transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* Projects with card animations */}
                    <motion.section
                        className="about-section-modern projects-section"
                        ref={projectsRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}>
                        <motion.div
                            className="section-icon"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                            💼
                        </motion.div>
                        <h3>Featured Projects</h3>
                        <motion.div
                            className="projects-grid-modern"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isProjectsInView ? "visible" : "hidden"}>
                            {[
                                { title: "PWR Now - for students by students", desc: "Creation and development of an application aggregating events at Wrocław University of Technology, which gained ~300 active users.", tech: ["TypeScript", "Django"], stat: "👥 ~300 Active Users", link: "https://pwrnow.pl" },
                                { title: "Personal Portfolio", desc: "Designed and implemented a personal portfolio using Next.js and TypeScript, hosted on a private server using Docker.", tech: ["React", "TypeScript"], stat: "🚀 Self-Hosted", link: "https://igor.lis.rocks" },
                                { title: "Private Server & Auto-Deploy System", desc: "Built and maintained a self-hosted server (Docker) for most projects and APIs, along with a script for automatic deployment from GitHub.", tech: ["Git", "Docker", "Coolify"], stat: "⚡ Auto-Deploy", link: null },
                                { title: "Event Automation Tools", desc: "Developed a QR code generation tool for a group of 120 students and an application to automate the filling out of nametags for major events.", tech: ["Web Development", "Automation"], stat: "👥 120+ Students", link: null }
                            ].map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="project-card-modern"
                                    variants={itemVariants}
                                    {...(isTouchDevice ? {} : { whileHover: { scale: 1.03, y: -5 } })}
                                    transition={{ duration: 0.3 }}>
                                    {project.link ? (
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-title-link-modern"
                                            {...(isTouchDevice ? {} : { whileHover: { x: 5 } })}>
                                            <h4>{project.title}</h4>
                                        </motion.a>
                                    ) : (
                                        <h4>{project.title}</h4>
                                    )}
                                    <p className="project-description-modern">{project.desc}</p>
                                    <div className="project-tech-modern">
                                        {project.tech.map((tag, idx) => (
                                            <span key={idx} className="tech-tag-modern">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="project-stats-modern">
                                        <span className="stat-modern">{project.stat}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>

                    {/* Education, Experience, Languages sections... */}
                    {/* Keeping these concise for brevity */}
                    
                    {/* Goals & Vision with fade-in */}
                    <motion.section
                        className="about-section-modern goals-section"
                        ref={goalsRef}
                        initial={{ opacity: 0, y: 50 }}
                        animate={isGoalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}>
                        <motion.div
                            className="section-icon"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                            🎯
                        </motion.div>
                        <h3>Goals & Vision</h3>
                        <motion.div
                            className="goals-content-modern"
                            initial={{ opacity: 0 }}
                            animate={isGoalsInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}>
                            <p>
                                My passion lies in creating technology that makes a meaningful difference 
                                in people's lives. I'm particularly drawn to projects that solve real-world 
                                problems and have the potential for significant impact.
                            </p>
                            <p>
                                Currently, I'm working on PWR Now, an application that aggregates events 
                                at Wrocław University of Technology, which has already gained ~300 active 
                                users. This project exemplifies my commitment to building solutions that 
                                directly benefit my community.
                            </p>
                            <p>
                                Looking forward, I aspire to contribute to innovative companies that are 
                                shaping the future of technology and creating positive change on a global scale.
                            </p>
                        </motion.div>
                    </motion.section>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
