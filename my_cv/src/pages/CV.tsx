import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import cvData from "../data/cv-data.json";

const CV: React.FC = () => {
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    const headerRef = useRef(null);
    const summaryRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const educationRef = useRef(null);

    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });
    const isSummaryInView = useInView(summaryRef, { once: true, amount: 0.2 });
    const isExperienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
    const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
    const isSkillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
    const isEducationInView = useInView(educationRef, { once: true, amount: 0.2 });

    const { basics, sections } = cvData;

    // Helper function to parse HTML content
    const parseHTML = (html: string) => {
        return { __html: html };
    };

    // Download CV as JSON
    const downloadCV = () => {
        const dataStr = JSON.stringify(cvData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'Igor_Lis_CV.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <motion.div
            className="page cv-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="cv-container">
                {/* Header with profile picture and contact info */}
                <motion.header
                    className="cv-header"
                    ref={headerRef}
                    initial={{ opacity: 0, y: -30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                    transition={{ duration: 0.6 }}>
                    <div className="cv-header-content">
                        <img
                            src={basics.picture.url}
                            alt={basics.name}
                            className="cv-profile-image"
                        />
                        <div className="cv-header-info">
                            <h1 className="cv-name">{basics.name}</h1>
                            <h2 className="cv-headline">{basics.headline}</h2>
                            <div className="cv-contact">
                                <a href={`mailto:${basics.email}`} className="cv-contact-item">
                                    📧 {basics.email}
                                </a>
                                <span className="cv-contact-item">📞 {basics.phone}</span>
                                <span className="cv-contact-item">📍 {basics.location}</span>
                            </div>
                            <div className="cv-profiles">
                                {sections.profiles.items.map((profile) => (
                                    <motion.a
                                        key={profile.id}
                                        href={profile.url.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cv-profile-link"
                                        {...(isTouchDevice ? {} : { whileHover: { scale: 1.05 } })}
                                        transition={{ duration: 0.2 }}>
                                        {profile.network}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <motion.button
                        onClick={downloadCV}
                        className="download-cv-button"
                        {...(isTouchDevice ? {} : { whileHover: { scale: 1.05 } })}
                        whileTap={{ scale: 0.95 }}>
                        📥 Download CV
                    </motion.button>
                </motion.header>

                {/* Summary Section */}
                {sections.summary.visible && (
                    <motion.section
                        className="cv-section"
                        ref={summaryRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isSummaryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: 0.1 }}>
                        <h3 className="cv-section-title">{sections.summary.name}</h3>
                        <div 
                            className="cv-summary-content"
                            dangerouslySetInnerHTML={parseHTML(sections.summary.content)}
                        />
                    </motion.section>
                )}

                {/* Experience Section */}
                {sections.experience.visible && sections.experience.items.length > 0 && (
                    <motion.section
                        className="cv-section"
                        ref={experienceRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isExperienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: 0.2 }}>
                        <h3 className="cv-section-title">{sections.experience.name}</h3>
                        <div className="cv-timeline">
                            {sections.experience.items.map((exp) => (
                                <div key={exp.id} className="cv-timeline-item">
                                    <div className="cv-timeline-marker"></div>
                                    <div className="cv-timeline-content">
                                        <div className="cv-item-header">
                                            <h4 className="cv-item-title">{exp.position}</h4>
                                            <span className="cv-item-date">{exp.date}</span>
                                        </div>
                                        <p className="cv-item-company">{exp.company}</p>
                                        {exp.location && <p className="cv-item-location">{exp.location}</p>}
                                        <div 
                                            className="cv-item-description"
                                            dangerouslySetInnerHTML={parseHTML(exp.summary)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Projects Section */}
                {sections.projects.visible && sections.projects.items.length > 0 && (
                    <motion.section
                        className="cv-section"
                        ref={projectsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isProjectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: 0.3 }}>
                        <h3 className="cv-section-title">{sections.projects.name}</h3>
                        <div className="cv-projects-grid">
                            {sections.projects.items.map((project) => (
                                <motion.div
                                    key={project.id}
                                    className="cv-project-card"
                                    {...(isTouchDevice ? {} : { whileHover: { y: -5 } })}
                                    transition={{ duration: 0.3 }}>
                                    {project.url.href ? (
                                        <a 
                                            href={project.url.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cv-project-title-link">
                                            <h4>{project.name}</h4>
                                        </a>
                                    ) : (
                                        <h4>{project.name}</h4>
                                    )}
                                    <div 
                                        className="cv-project-description"
                                        dangerouslySetInnerHTML={parseHTML(project.summary)}
                                    />
                                    {project.keywords.length > 0 && (
                                        <div className="cv-project-keywords">
                                            {project.keywords.map((keyword, idx) => (
                                                <span key={idx} className="cv-keyword-tag">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Skills Section */}
                {sections.skills.visible && sections.skills.items.length > 0 && (
                    <motion.section
                        className="cv-section"
                        ref={skillsRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: 0.4 }}>
                        <h3 className="cv-section-title">{sections.skills.name}</h3>
                        <div className="cv-skills-grid">
                            {sections.skills.items.map((skill) => (
                                <div key={skill.id} className="cv-skill-card">
                                    <h4 className="cv-skill-name">{skill.name}</h4>
                                    <p className="cv-skill-description">{skill.description}</p>
                                    <div className="cv-skill-level">
                                        <div className="cv-skill-bar">
                                            <div 
                                                className="cv-skill-fill"
                                                style={{ width: `${(skill.level / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    {skill.keywords.length > 0 && (
                                        <div className="cv-skill-keywords">
                                            {skill.keywords.map((keyword, idx) => (
                                                <span key={idx} className="cv-keyword-tag">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Education Section */}
                {sections.education.visible && sections.education.items.length > 0 && (
                    <motion.section
                        className="cv-section"
                        ref={educationRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isEducationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.5, delay: 0.5 }}>
                        <h3 className="cv-section-title">{sections.education.name}</h3>
                        <div className="cv-education-grid">
                            {sections.education.items.map((edu) => (
                                <div key={edu.id} className="cv-education-card">
                                    <div className="cv-education-header">
                                        {edu.url.href ? (
                                            <a 
                                                href={edu.url.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="cv-education-title-link">
                                                <h4>{edu.institution}</h4>
                                            </a>
                                        ) : (
                                            <h4>{edu.institution}</h4>
                                        )}
                                        <span className="cv-education-date">{edu.date}</span>
                                    </div>
                                    <p className="cv-education-degree">
                                        {edu.studyType} - {edu.area}
                                    </p>
                                    {edu.score && <p className="cv-education-score">Score: {edu.score}</p>}
                                    {edu.summary && <p className="cv-education-summary">{edu.summary}</p>}
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Languages Section */}
                {sections.languages.visible && sections.languages.items.length > 0 && (
                    <motion.section
                        className="cv-section"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}>
                        <h3 className="cv-section-title">{sections.languages.name}</h3>
                        <div className="cv-languages-grid">
                            {sections.languages.items.map((lang) => (
                                <div key={lang.id} className="cv-language-item">
                                    <span className="cv-language-name">{lang.name}</span>
                                    <div className="cv-language-level">
                                        <div className="cv-language-dots">
                                            {[...Array(5)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`cv-dot ${i < lang.level ? 'filled' : ''}`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </motion.div>
    );
};

export default CV;
