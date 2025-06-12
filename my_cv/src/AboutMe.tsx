import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- Data imported from your JSON file ---
// In a real application, you would fetch this data or import it.
const resumeData = {
    basics: {
        name: "Igor Lis",
        headline: "Junior Software Developer",
        email: "igor@lis.rocks",
        location: "Wrocław, Poland",
        picture: "https://avatars.githubusercontent.com/u/87518349?v=4",
    },
    summary: {
        content:
            "A passionate, self-taught programmer, coding since the age of 13. Proficient in frontend and backend software development, with hands-on experience in server management, Docker, and creating impactful software. A fast learner and strong team player with a creative approach to problem-solving, dedicated to creating applications that help others.",
    },
    profiles: [
        {
            network: "GitHub",
            username: "FOXjustFOX",
            url: "https://github.com/FOXjustFOX",
        },
        {
            network: "LinkedIn",
            username: "Igor Lis",
            url: "https://www.linkedin.com/in/igor-lis-4b3923254/",
        },
    ],
    experience: [
        {
            company: "Faculty council of the student government",
            position: "Member",
            date: "March 2025 - April 2025",
            summary: [
                "Coordinating the IT section of an IT conference co-hosted by several universities.",
                "Coordinated a 5-person section to establish partnerships for an event with over 220 participants.",
                "Created multiple applications for the council, used by over 100 people.",
            ],
        },
    ],
    projects: [
        {
            name: "PWR Now - for students by students",
            summary:
                "Creation and development of an application aggregating events at Wroclaw University of Technology, which gained ~300 active users.",
            keywords: ["TypeScript", "Django", "React"],
            url: "https://pwrnow.pl",
        },
        {
            name: "Personal portfolio",
            summary:
                "Designed and implemented a personal portfolio using Next.js and TypeScript, hosted on a private server using Docker.",
            keywords: ["Next.js", "TypeScript", "Docker"],
            url: "https://igor.lis.rocks",
        },
        {
            name: "Private server and automatic deployment system",
            summary:
                "Built and maintained a self-hosted server (Docker) for most projects and APIs, along with a script for automatic deployment from GitHub.",
            keywords: ["Git", "Docker", "Coolify", "Linux"],
            url: "",
        },
    ],
    skills: [
        {
            name: "Frontend (Next.js/React)",
            keywords: [
                "React",
                "TypeScript",
                "Responsive UI",
                "Next.js",
                "TailwindCSS",
            ],
        },
        {
            name: "Backend",
            keywords: ["Django", "TypeScript", "API Development", "Big Data"],
        },
        {
            name: "DevOps",
            keywords: ["Git", "Docker", "Linux", "AWS", "Google Cloud"],
        },
    ],
    softSkills: [
        "Strong teamwork and communication skills",
        "A fast learner who adapts quickly",
        "Creative and problem-solving oriented",
        "Dedicated to creating applications that help others",
    ],
    education: [
        {
            institution: "Wroclaw University of Science and Technology (WUST)",
            area: "Systems Engineering",
            date: "September 2024 - Present",
        },
        {
            institution: "III Liceum Ogólnokształcące im. Stefana Batorego",
            area: "Mathematics and IT Profile",
            date: "2020 - 2024",
        },
    ],
};
// --- End of data ---

const AboutMe: React.FC = () => {
    // References for scroll-triggered animations
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const skillsRef = useRef(null);
    const softSkillsRef = useRef(null);
    const educationRef = useRef(null);

    // Hooks to check if elements are in the viewport
    const useInViewOptions = { once: true, amount: 0.2 };
    const isAboutInView = useInView(aboutRef, useInViewOptions);
    const isExperienceInView = useInView(experienceRef, useInViewOptions);
    const isProjectsInView = useInView(projectsRef, useInViewOptions);
    const isSkillsInView = useInView(skillsRef, useInViewOptions);
    const isSoftSkillsInView = useInView(softSkillsRef, useInViewOptions);
    const isEducationInView = useInView(educationRef, useInViewOptions);

    // Animation variants for the content sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            className="min-h-screen w-full text-white font-sans bg-gray-1000"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-10">
                {/* Left Column: Personal Info (Sticky on large screens) */}
                <motion.div
                    className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start "
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}>
                    <div className="flex flex-col items-center lg:items-start">
                        <img
                            src={resumeData.basics.picture}
                            alt="Profile Photo"
                            className="w-48 h-48 rounded-full mx-auto lg:mx-0 mb-6 border-4 border-indigo-500 shadow-lg"
                        />
                        <div className="text-center lg:text-left w-full">
                            <h1 className="text-4xl font-bold mb-4">
                                {resumeData.basics.name}
                            </h1>
                            <h2 className="text-xl text-gray-400 mb-6">
                                {resumeData.basics.headline}
                            </h2>
                            <div className="space-y-3">
                                <InfoLine label="Email:">
                                    <motion.a
                                        href={`mailto:${resumeData.basics.email}`}
                                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                        whileHover={{ scale: 1.05 }}>
                                        {resumeData.basics.email}
                                    </motion.a>
                                </InfoLine>
                                <InfoLine label="Location:">
                                    <span className="text-gray-300">
                                        {resumeData.basics.location}
                                    </span>
                                </InfoLine>
                                {resumeData.profiles.map((profile) => (
                                    <InfoLine
                                        label={`${profile.network}:`}
                                        key={profile.network}>
                                        <motion.a
                                            href={profile.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-400 hover:text-indigo-300 transition-colors"
                                            whileHover={{ scale: 1.05 }}>
                                            {profile.username}
                                        </motion.a>
                                    </InfoLine>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Main Content */}
                <div className="lg:w-2/3 space-y-8">
                    {/* About Me Section */}
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={aboutRef}
                        initial="hidden"
                        animate={isAboutInView ? "visible" : "hidden"}
                        variants={sectionVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                            About Me
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {resumeData.summary.content}
                        </p>
                    </motion.div>

                    {/* Experience Section */}
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={experienceRef}
                        initial="hidden"
                        animate={isExperienceInView ? "visible" : "hidden"}
                        variants={sectionVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                            Experience
                        </h2>
                        <ul className="space-y-4 list-none p-0">
                            {resumeData.experience.map((exp, index) => (
                                <li
                                    key={index}
                                    className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
                                    <h3 className="font-bold text-lg text-white">
                                        {exp.position}
                                    </h3>
                                    <p className="text-indigo-400 font-semibold">
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-400 text-sm mb-2">
                                        {exp.date}
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                                        {exp.summary.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Projects Section */}
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={projectsRef}
                        initial="hidden"
                        animate={isProjectsInView ? "visible" : "hidden"}
                        variants={sectionVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                            Key Projects
                        </h2>
                        <div className="space-y-4">
                            {resumeData.projects.map((project, index) => (
                                <ProjectCard key={index} project={project} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={skillsRef}
                        initial="hidden"
                        animate={isSkillsInView ? "visible" : "hidden"}
                        variants={sectionVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                            Skills & Expertise
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {resumeData.skills.map((skill, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-200">
                                        {skill.name}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.keywords.map((keyword, i) => (
                                            <span
                                                key={i}
                                                className="bg-gray-700 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills Section */}
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={softSkillsRef}
                        initial="hidden"
                        animate={isSoftSkillsInView ? "visible" : "hidden"}
                        variants={sectionVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                            Soft Skills
                        </h2>
                        <ul className="space-y-2 list-disc list-inside p-0 text-gray-300">
                            {resumeData.softSkills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        ref={educationRef}
                        initial="hidden"
                        animate={isEducationInView ? "visible" : "hidden"}
                        variants={sectionVariants}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400">
                            Education
                        </h2>
                        <ul className="space-y-3 list-none p-0">
                            {resumeData.education.map((edu, index) => (
                                <li key={index} className="text-gray-300">
                                    <p className="font-bold text-white">
                                        {edu.institution}
                                    </p>
                                    <p className="text-gray-400">{edu.area}</p>
                                    <p className="text-gray-500 text-sm">
                                        {edu.date}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

// Helper component for personal info lines to reduce repetition
const InfoLine: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <p className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-start">
        <span className="font-semibold text-gray-400 mr-2">{label}</span>
        {children}
    </p>
);

// Helper component for project cards
const ProjectCard: React.FC<{ project: (typeof resumeData.projects)[0] }> = ({
    project,
}) => (
    <motion.div
        className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 transition-shadow duration-300 hover:shadow-indigo-500/20 hover:shadow-lg"
        whileHover={{ y: -5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}>
        <a
            href={project.url || "#"}
            target={project.url ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="block text-gray-300 no-underline hover:text-white">
            <strong className="text-indigo-400 text-lg">{project.name}</strong>
            <p className="my-2 text-sm leading-relaxed">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {project.keywords.map((keyword, i) => (
                    <span
                        key={i}
                        className="bg-gray-600 text-indigo-200 text-xs font-medium px-2 py-1 rounded-full">
                        {keyword}
                    </span>
                ))}
            </div>
        </a>
    </motion.div>
);

export default AboutMe;
