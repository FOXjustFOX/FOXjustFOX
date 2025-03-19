import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

const RepoDetails: React.FC = () => {
    const { repoName } = useParams<{ repoName: string }>();
    const [repo, setRepo] = useState<Repo | null>(null);
    const [readme, setReadme] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cacheKey = `repo_${repoName}`;
        const cachedRepo = sessionStorage.getItem(cacheKey);

        if (cachedRepo) {
            setRepo(JSON.parse(cachedRepo));
            setLoading(false);
        } else {
            setError("Repository data not found. Redirecting...");
            setTimeout(() => {
                window.location.href = "/projects"; // Redirect after 3 seconds
            }, 3000);
        }

        const fetchReadme = async () => {
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/FOXjustFOX/${repoName}/main/README.md`
                );
                if (!response.ok) {
                    throw new Error("README not found");
                }
                const text = await response.text();
                setReadme(text);
            } catch {
                setReadme("README file not available.");
            }
        };
        fetchReadme();
        setLoading(false);
    }, [repoName]);

    if (loading) return <p>Loading repository details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <motion.div
            className="page"
            initial={{ opacity: 0, y: 20 }} // Start animation
            animate={{ opacity: 1, y: 0 }} // Animate when entering
            exit={{ opacity: 0, y: -20 }} // Animate when leaving
            transition={{ duration: 0.5 }} // Smooth transition
        >
            <h1>{repo?.name}</h1>
            <p>{repo?.description || "No description available"}</p>
            <p><strong>Language:</strong> {repo?.language || "Unknown"}</p>
            <p><strong>Stars:</strong> {repo?.stargazers_count}</p>
            <p><strong>Forks:</strong> {repo?.forks_count}</p>
            <a href={repo?.html_url} target="_blank" rel="noopener noreferrer">
                View on GitHub
            </a>
            <br />

            {/* Display README if available */}
            <div className="readme">
                {readme ? (
                    <div>
                        <h2>📖 README</h2>
                        <ReactMarkdown>{readme}</ReactMarkdown>
                    </div>
                ) : (
                    <p>No README available.</p>
                )}
            </div>

            <Link to="/projects">⬅ Back to Projects</Link>
        </motion.div>
    );
};

export default RepoDetails;