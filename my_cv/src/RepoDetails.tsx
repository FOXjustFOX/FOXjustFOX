import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import FileExplorer from "./FileExplorer";
import { LoadingAnimation } from "./components";
import { Repo, FileSystemItem } from "./types";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

const RepoDetails: React.FC = () => {
    const { repoName } = useParams<{ repoName: string }>();
    const navigate = useNavigate();
    const [repo, setRepo] = useState<Repo | null>(null);
    const [readme, setReadme] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(
        null
    );
    const [fileContent, setFileContent] = useState<string | null>(null);
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
                    // console.log(repoResponse.data);

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

    // Function to determine language from file extension
    const getLanguageFromPath = (path: string) => {
        const extension = path.split(".").pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
            py: "python",
            js: "javascript",
            jsx: "javascript",
            ts: "typescript",
            tsx: "typescript",
            html: "html",
            css: "css",
            json: "json",
            md: "markdown",
            txt: "plaintext",
        };
        return languageMap[extension || ""] || "plaintext";
    };

    // Function to fetch file content
    const fetchFileContent = async (filepath: string) => {
        try {
            const username = "FOXjustFOX";
            const response = await axios.get(
                `https://api.github.com/repos/${username}/${repoName}/contents/${filepath}`,
                {
                    headers: {
                        Accept: "application/vnd.github.v3.raw",
                    },
                }
            );
            setFileContent(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching file content:", error);
            setFileContent(null);
            return null;
        }
    };

    // Handle file selection
    const handleFileSelect = async (file: FileSystemItem) => {
        if (file.type === "file" && file.path) {
            setSelectedFile(file);
            const content = await fetchFileContent(file.path);
            if (content) {
                setFileContent(content);
            }
        }
    };

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
            className="page min-h-screen pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-6 gap-6">
                {/* Sidebar */}
                <div className="lg:w-1/3 space-y-6">
                    <div className="card">
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <Link
                                to="/projects"
                                className="btn-secondary flex items-center justify-center">
                                ⬅ Back to Projects
                            </Link>
                            <a
                                href={repo?.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex items-center justify-center">
                                View on GitHub
                            </a>
                        </div>

                        <h1 className="text-2xl font-bold text-primary mb-3">
                            {repo?.name}
                        </h1>
                        <p className="text-gray-300 mb-4">
                            {repo?.description || "No description available"}
                        </p>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Language:</span>
                                <span className="text-white">
                                    {repo?.language || "Unknown"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Stars:</span>
                                <span className="text-white">
                                    ⭐ {repo?.stargazers_count}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Forks:</span>
                                <span className="text-white">
                                    🍴 {repo?.forks_count}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            📁 Repository Files
                        </h2>
                        <div className="bg-gray-900 rounded-lg p-4">
                            <FileExplorer onFileSelect={handleFileSelect} />
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:w-2/3" ref={contentRef}>
                    {selectedFile ? (
                        <div className="card">
                            <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                                📄 {selectedFile.name}
                            </h2>
                            {fileContent ? (
                                selectedFile.name.toLowerCase() ===
                                "readme.md" ? (
                                    <div className="prose prose-invert max-w-none">
                                        <ReactMarkdown>
                                            {readme || "No README available."}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                                        <pre className="hljs p-4 text-sm overflow-x-auto">
                                            <code
                                                className={`language-${getLanguageFromPath(
                                                    selectedFile.path || ""
                                                )}`}
                                                dangerouslySetInnerHTML={{
                                                    __html: hljs.highlight(
                                                        fileContent || "",
                                                        {
                                                            language:
                                                                getLanguageFromPath(
                                                                    selectedFile.path ||
                                                                        ""
                                                                ),
                                                        }
                                                    ).value,
                                                }}
                                            />
                                        </pre>
                                    </div>
                                )
                            ) : (
                                <div className="flex items-center justify-center py-8">
                                    <LoadingAnimation />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="card">
                            <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
                                📖 README
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>
                                    {readme || "No README available."}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default RepoDetails;
