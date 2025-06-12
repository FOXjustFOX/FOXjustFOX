import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LoadingAnimation, ProjectCard } from "./components";
import { Repo } from "./types";

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
                <p className="text-red-400 text-lg">Error: {error}</p>
            </div>
        );

    return (
        <motion.div
            className="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="w-full max-w-6xl mx-auto px-6">
                <motion.h1
                    ref={titleRef}
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    My GitHub Projects
                </motion.h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                    {repos.map((repo, index) => (
                        <ProjectCard key={repo.id} repo={repo} index={index} />
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default Projects;
