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
            className="card hover:shadow-xl transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.3,
                delay: 0.02 * index,
            }}
            whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
            }}>
            <Link
                to={`/projects/${repo.name}`}
                className="block text-white no-underline h-full">
                <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-primary-hover transition-colors">
                    {repo.name}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                    {repo.description || "No description available"}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    {repo.language && (
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                            {repo.language}
                        </span>
                    )}
                </div>
            </Link>
        </motion.li>
    );
};

export default ProjectCard;
