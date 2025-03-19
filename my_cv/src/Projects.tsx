import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <p>Loading repositories...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <motion.div
            className="page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ opacity: { duration: 0.4 } }}>
            <h1>My GitHub Projects</h1>
            <ul>
                {repos.map((repo, index) => (
                    <motion.li
                        key={repo.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            default: { duration: 0.5, delay: index * 0.1 },
                            scale: { duration: 0, delay: 0 },
                        }}>
                        <Link to={`/projects/${repo.name}`}>{repo.name}</Link>
                        <p>{repo.description || "No description available"}</p>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Projects;
