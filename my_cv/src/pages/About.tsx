import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import profilePhoto from "../assets/profile-photo.jpg";

const About: React.FC = () => {
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

    return (
        <motion.div
            className="page about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="about-container">
                {/* Header section with photo and basic info */}
                <motion.div
                    className="about-header"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className="about-header-content">
                        <img
                            src={profilePhoto}
                            alt="Igor Lis - Junior Software Developer"
                            className="about-profile-photo"
                        />
                        <div className="about-header-text">
                            <h1>Igor Lis</h1>
                            <h2>Junior Software Developer</h2>
                            <div className="contact-info">
                                <p>📧 <a className="link" href="mailto:igor@lis.rocks" >igor@lis.rocks</a></p>
                                <p>📍 Wrocław, Poland</p>
                                <p>📞 +48 690 535 212</p>
                                <div className="social-links">
                                    <motion.a
                                        href="https://github.com/FOXjustFOX"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        className="social-link">
                                        GitHub
                                    </motion.a>
                                    <motion.a
                                        href="https://www.linkedin.com/in/igor-lis-4b3923254/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        className="social-link">
                                        LinkedIn
                                    </motion.a>
                                    <motion.a
                                        href="https://igor.lis.rocks/about"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        className="social-link">
                                        Portfolio
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main content */}
                <div className="about-content">
                    {/* Introduction */}
                    <motion.section
                        className="about-section"
                        ref={introRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isIntroInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, ease: "easeOut" }}>
                        <h3>Who I Am</h3>
                        <div className="intro-content">
                            <p>
                                A passionate, self-taught programmer, coding since the age of 13. 
                                Proficient in frontend and backend software development, with hands-on 
                                experience in server management, Docker, and creating impactful software. 
                                A fast learner and strong team player with a creative approach to 
                                problem-solving, dedicated to creating applications that help others.
                            </p>
                        </div>
                    </motion.section>

                    {/* Journey */}
                    <motion.section
                        className="about-section"
                        ref={journeyRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isJourneyInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}>
                        <h3>My Journey</h3>
                        <div className="journey-timeline">
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>Age 13 - First Lines of Code</h4>
                                    <p>Started my programming journey with curiosity and determination.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>2020-2024 - High School Excellence</h4>
                                    <p>Studied Math and IT at III Liceum Ogólnokształcące im. Stefana Batorego in Chorzów, building a strong foundation in technology and problem-solving.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>2024-Present - University & Growth</h4>
                                    <p>Pursuing Systems Engineering at Wrocław University of Science and Technology while actively contributing to student organizations and real-world projects.</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Skills */}
                    <motion.section
                        className="about-section"
                        ref={skillsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isSkillsInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}>
                        <h3>Technical Expertise</h3>
                        <div className="skills-grid">
                            <div className="skill-category">
                                <h4>Frontend Development</h4>
                                <div className="skill-tags">
                                    <span className="skill-tag">React</span>
                                    <span className="skill-tag">TypeScript</span>
                                    <span className="skill-tag">Next.js</span>
                                    <span className="skill-tag">Responsive UI</span>
                                </div>
                                <div className="skill-level">
                                    <div className="skill-bar">
                                        <div className="skill-fill" style={{width: "60%"}}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="skill-category">
                                <h4>Backend Development</h4>
                                <div className="skill-tags">
                                    <span className="skill-tag">Django</span>
                                    <span className="skill-tag">API Design</span>
                                    <span className="skill-tag">Big Data</span>
                                    <span className="skill-tag">TypeScript</span>
                                </div>
                                <div className="skill-level">
                                    <div className="skill-bar">
                                        <div className="skill-fill" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="skill-category">
                                <h4>DevOps & Infrastructure</h4>
                                <div className="skill-tags">
                                    <span className="skill-tag">Docker</span>
                                    <span className="skill-tag">Git</span>
                                    <span className="skill-tag">Linux</span>
                                    <span className="skill-tag">AWS</span>
                                    <span className="skill-tag">Google Cloud</span>
                                </div>
                                <div className="skill-level">
                                    <div className="skill-bar">
                                        <div className="skill-fill" style={{width: "80%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Projects */}
                    <motion.section
                        className="about-section"
                        ref={projectsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isProjectsInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}>
                        <h3>Featured Projects</h3>
                        <div className="projects-grid">
                            <motion.div 
                                className="project-card"
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}>
                                <div className="project-header">
                                    <motion.a
                                        href="https://pwrnow.pl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-title-link"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}>
                                        <h4>PWR Now - for students by students</h4>
                                    </motion.a>
                                </div>
                                <p className="project-description">
                                    Creation and development of an application aggregating events at Wrocław University of Technology, which gained ~300 active users.
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">TypeScript</span>
                                    <span className="tech-tag">Django</span>
                                </div>
                                <div className="project-stats">
                                    <span className="stat">👥 ~300 Active Users</span>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="project-card"
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}>
                                <div className="project-header">
                                    <motion.a
                                        href="https://igor.lis.rocks"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-title-link"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}>
                                        <h4>Personal Portfolio</h4>
                                    </motion.a>
                                </div>
                                <p className="project-description">
                                    Designed and implemented a personal portfolio using Next.js and TypeScript, hosted on a private server using Docker.
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">React</span>
                                    <span className="tech-tag">TypeScript</span>
                                </div>
                                <div className="project-stats">
                                    <span className="stat">🚀 Self-Hosted</span>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="project-card"
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}>
                                <div className="project-header">
                                    <h4>Private Server & Auto-Deploy System</h4>
                                </div>
                                <p className="project-description">
                                    Built and maintained a self-hosted server (Docker) for most projects and APIs, along with a script for automatic deployment from GitHub.
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">Git</span>
                                    <span className="tech-tag">Docker</span>
                                    <span className="tech-tag">Coolify</span>
                                </div>
                                <div className="project-stats">
                                    <span className="stat">⚡ Auto-Deploy</span>
                                    <span className="stat">🐳 Docker</span>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="project-card"
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ duration: 0.3 }}>
                                <div className="project-header">
                                    <h4>Event Automation Tools</h4>
                                </div>
                                <p className="project-description">
                                    Developed a QR code generation tool for a group of 120 students and an application to automate the filling out of nametags for major events.
                                </p>
                                <div className="project-tech">
                                    <span className="tech-tag">Web Development</span>
                                    <span className="tech-tag">Automation</span>
                                </div>
                                <div className="project-stats">
                                    <span className="stat">👥 120+ Students</span>
                                    <span className="stat">🎫 Event Tools</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>

                    {/* Education */}
                    <motion.section
                        className="about-section"
                        ref={educationRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isEducationInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
                        <h3>Education</h3>
                        <div className="education-items">
                            <div className="education-item">
                                <div className="education-header">
                                    <h4>Wrocław University of Science and Technology (WUST)</h4>
                                    <span className="education-period">September 2024 - Present</span>
                                </div>
                                <p className="education-degree">Bachelor's in Systems Engineering</p>
                                <p className="education-description">
                                    Pursuing comprehensive knowledge in systems design, engineering principles, 
                                    and advanced technology solutions.
                                </p>
                            </div>

                            <div className="education-item">
                                <div className="education-header">
                                    <h4>III Liceum Ogólnokształcące im. Stefana Batorego</h4>
                                    <span className="education-period">2020 - 2024</span>
                                </div>
                                <p className="education-degree">High School - Math and IT Specialization</p>
                                <p className="education-description">
                                    Specialized in mathematics and information technology, building a strong 
                                    foundation for my programming career.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Experience */}
                    <motion.section
                        className="about-section"
                        ref={experienceRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isExperienceInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                        <h3>Experience & Leadership</h3>
                        <div className="experience-items">
                            <div className="experience-item">
                                <div className="experience-header">
                                    <h4>Faculty Council of the Student Government</h4>
                                    <span className="experience-period">March 2025 - April 2025</span>
                                </div>
                                <p className="experience-role">Member - IT Section Coordinator</p>
                                <ul className="experience-achievements">
                                    <li>Coordinated the IT section of an IT conference co-hosted by several universities</li>
                                    <li>Led a 5-person team to establish partnerships for an event with over 220 participants</li>
                                    <li>Created multiple applications for the council, used by over 100 people</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Languages */}
                    <motion.section
                        className="about-section"
                        ref={languagesRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isLanguagesInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}>
                        <h3>Languages</h3>
                        <div className="languages-grid">
                            <div className="language-item">
                                <span className="language-name">English</span>
                                <div className="language-level">
                                    <div className="language-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="dot filled"></div>
                                        ))}
                                    </div>
                                    <span className="level-label">Fluent</span>
                                </div>
                            </div>
                            <div className="language-item">
                                <span className="language-name">Polish</span>
                                <div className="language-level">
                                    <div className="language-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="dot filled"></div>
                                        ))}
                                    </div>
                                    <span className="level-label">Native</span>
                                </div>
                            </div>
                            <div className="language-item">
                                <span className="language-name">Italian</span>
                                <div className="language-level">
                                    <div className="language-dots">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`dot ${i < 1 ? 'filled' : ''}`}></div>
                                        ))}
                                    </div>
                                    <span className="level-label">Beginner</span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Goals & Vision */}
                    <motion.section
                        className="about-section"
                        ref={goalsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                            isGoalsInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 30 }
                        }
                        transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
                        <h3>Goals & Vision</h3>
                        <div className="goals-content">
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
                        </div>
                    </motion.section>
                </div>
            </div>
        </motion.div>
    );
};

export default About;
