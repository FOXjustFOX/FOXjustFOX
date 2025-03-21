import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

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

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const cacheKey = "github_repos";
        const cacheExpiration = 60 * 60 * 1000; // 1 hour in milliseconds
        const cachedData = sessionStorage.getItem(cacheKey);
        const cachedTime = sessionStorage.getItem(`${cacheKey}_time`);

        if (
            cachedData &&
            cachedTime &&
            Date.now() - parseInt(cachedTime) < cacheExpiration
        ) {
            setRepos(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/users/FOXjustFOX/repos"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch repositories");
                }

                const data: Repo[] = await response.json();
                setRepos(data);

                // Store all repos in sessionStorage
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                sessionStorage.setItem(
                    `${cacheKey}_time`,
                    Date.now().toString()
                );

                // Store each repo separately for easy retrieval in RepoDetails
                data.forEach((repo) => {
                    sessionStorage.setItem(
                        `repo_${repo.name}`,
                        JSON.stringify(repo)
                    );
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading)
        return (
            <div className="page">
                <p>Loading repositories...</p>
            </div>
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
