import React, { useEffect, useState, useRef } from "react";
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
    const contentRef = useRef<HTMLDivElement>(null);

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

    // Scroll to top when component mounts or when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [repoName]);

    if (loading)
        return (
            <div className="page">
                <p>Loading repository details...</p>
            </div>
        );
    if (error)
        return (
            <div className="page">
                <p>{error}</p>
            </div>
        );

    return (
        <motion.div
            className="page repo-details-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="repo-details-container">
                <div className="repo-details-sidebar">
                    <div className="repo-navigation">
                        <Link to="/projects" className="back-button">
                            ⬅ Back to Projects
                        </Link>
                        <a
                            href={repo?.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-button">
                            View on GitHub
                        </a>
                    </div>

                    <h1 className="repo-title">{repo?.name}</h1>
                    <p className="repo-description">
                        {repo?.description || "No description available"}
                    </p>

                    <div className="repo-stats">
                        <p>
                            <strong>Language:</strong>{" "}
                            {repo?.language || "Unknown"}
                        </p>
                        <p>
                            <strong>Stars:</strong> {repo?.stargazers_count}
                        </p>
                        <p>
                            <strong>Forks:</strong> {repo?.forks_count}
                        </p>
                    </div>
                </div>

                <div className="repo-details-content" ref={contentRef}>
                    {readme ? (
                        <div className="readme">
                            <h2>📖 README</h2>
                            <ReactMarkdown>{readme}</ReactMarkdown>
                        </div>
                    ) : (
                        <div className="readme">
                            <p>No README available.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default RepoDetails;
