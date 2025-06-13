import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

interface ProjectCardProps {
    repo: Repository;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.li
            ref={ref}
            key={repo.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.2,
                delay: 0.02 * index,
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}>
            <Link to={`/projects/${repo.name}`} className="project-link">
                <h3 className="repo-name">{repo.name}</h3>
                <p>{repo.description || "No description available"}</p>
            </Link>
        </motion.li>
    );
};

export default ProjectCard;
