import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import axios from "axios";

// Loading component with animation
const LoadingAnimation = () => {
    return (
        <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            <motion.div
                className="loading-circle"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    borderRadius: ["20%", "50%", "20%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.p
                animate={{
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}>
                Loading repository details...
            </motion.p>
        </motion.div>
    );
};

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
    const navigate = useNavigate();
    const [repo, setRepo] = useState<Repo | null>(null);
    const [readme, setReadme] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                // Check if we have it in session storage
                const storedRepoData = sessionStorage.getItem(
                    `repo_${repoName}`
                );
                let shouldFetchRepo = true;
                let shouldFetchReadme = true;

                if (storedRepoData) {
                    const { data: storedRepo, timestamp } =
                        JSON.parse(storedRepoData);
                    const currentTime = new Date().getTime();
                    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

                    // Check if the stored data is less than one hour old
                    if (currentTime - timestamp < oneHour) {
                        setRepo(storedRepo);
                        shouldFetchRepo = false;

                        // Also get readme from session storage if available and not expired
                        const storedReadmeData = sessionStorage.getItem(
                            `readme_${repoName}`
                        );
                        if (storedReadmeData) {
                            const {
                                data: storedReadme,
                                timestamp: readmeTimestamp,
                            } = JSON.parse(storedReadmeData);
                            if (currentTime - readmeTimestamp < oneHour) {
                                setReadme(storedReadme);
                                shouldFetchReadme = false;
                                if (!shouldFetchRepo) {
                                    setLoading(false);
                                    return;
                                }
                            }
                        }
                    } else {
                        console.log(
                            "Repository data is older than 1 hour, refreshing..."
                        );
                    }
                }

                const username = "FOXjustFOX"; // Your GitHub username

                // Fetch repo details if needed or expired
                if (shouldFetchRepo) {
                    const repoResponse = await axios.get(
                        `https://api.github.com/repos/${username}/${repoName}`
                    );
                    setRepo(repoResponse.data);

                    // Store with timestamp
                    sessionStorage.setItem(
                        `repo_${repoName}`,
                        JSON.stringify({
                            data: repoResponse.data,
                            timestamp: new Date().getTime(),
                        })
                    );
                }

                // Fetch the readme if needed or expired
                if (shouldFetchReadme) {
                    try {
                        const readmeResponse = await axios.get(
                            `https://api.github.com/repos/${username}/${repoName}/readme`,
                            {
                                headers: {
                                    Accept: "application/vnd.github.v3.raw",
                                },
                            }
                        );
                        setReadme(readmeResponse.data);

                        // Store with timestamp
                        sessionStorage.setItem(
                            `readme_${repoName}`,
                            JSON.stringify({
                                data: readmeResponse.data,
                                timestamp: new Date().getTime(),
                            })
                        );
                    } catch (readmeError) {
                        console.error("No README found:", readmeError);
                        setReadme("No README available for this repository.");

                        // Store error message with timestamp
                        sessionStorage.setItem(
                            `readme_${repoName}`,
                            JSON.stringify({
                                data: "No README available for this repository.",
                                timestamp: new Date().getTime(),
                            })
                        );
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching repository data:", error);
                navigate("/projects");
            }
        };

        fetchRepoData();
    }, [repoName, navigate]);

    // Scroll to top when component mounts or when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [repoName]);

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
