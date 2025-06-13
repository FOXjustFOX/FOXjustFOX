import React, { useRef } from "react";
import { motion } from "framer-motion";
import { LoadingAnimation } from "../components/ui";
import { ProjectCard } from "../components";
import { useGitHubRepos } from "../hooks";

const Projects: React.FC = () => {
    const { repos, loading, error } = useGitHubRepos();
    const titleRef = useRef(null);

    if (loading)
        return (
            <motion.div
                className="page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <LoadingAnimation />
            </motion.div>
        );
    if (error)
        return (
            <div className="page">
                <p>Error: {error}</p>
            </div>
        );

    return (
        <motion.div
            className="page projects-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="projects-container">
                <motion.h1
                    ref={titleRef}
                    className="projects-title"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    My GitHub Projects
                </motion.h1>
                <ul className="projects-grid">
                    {repos.map((repo, index) => (
                        <ProjectCard key={repo.id} repo={repo} index={index} />
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default Projects;
