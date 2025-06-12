import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Repo } from "../types";

const ProjectCard = ({ repo, index }: { repo: Repo; index: number }) => {
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
                delay: 0.02 * index, // Sequential delay based on index
                // ease: "easeOut",
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
