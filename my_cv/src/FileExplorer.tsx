import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

// Define the structure of our file/folder items
interface FileSystemItem {
    name: string;
    type: "file" | "folder" | "link";
    path?: string;
    url?: string;
    children?: FileSystemItem[];
}

interface FileViewerProps {
    filepath: string;
}

// Component to display file contents with syntax highlighting
const FileViewer: React.FC<FileViewerProps> = ({ filepath }) => {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Determine language from file extension
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

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                setLoading(true);
                // Fetch the file content from your server
                const response = await axios.get(`/files/${filepath}`);
                setContent(response.data);
                setError(null);
            } catch {
                setError("Failed to load file content");
                setContent("");
            } finally {
                setLoading(false);
            }
        };

        fetchFileContent();
    }, [filepath]);

    useEffect(() => {
        // Highlight all code blocks when content changes
        if (content) {
            hljs.highlightAll();
        }
    }, [content]);

    if (loading)
        return <div className="file-loading">Loading file content...</div>;
    if (error) return <div className="file-error">{error}</div>;

    const language = getLanguageFromPath(filepath);
    const highlightedCode = hljs.highlight(content, { language }).value;

    return (
        <div className="file-viewer">
            <h3 className="file-path">{filepath}</h3>
            <pre
                className="hljs"
                style={{
                    borderRadius: "8px",
                    padding: "15px",
                    marginTop: "10px",
                    position: "relative",
                }}>
                <code
                    className={`language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
            </pre>
        </div>
    );
};

// Component for a file/folder item in the explorer
const FileSystemNode: React.FC<{
    item: FileSystemItem;
    depth: number;
    onFileClick: (item: FileSystemItem) => void;
}> = ({ item, depth, onFileClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        if (item.type === "folder") {
            setIsOpen(!isOpen);
        } else {
            onFileClick(item);
        }
    };

    // Determine appropriate icon based on type and file extension
    const getIcon = (item: FileSystemItem) => {
        if (item.type === "folder") {
            return isOpen ? "📂" : "📁";
        } else if (item.type === "link") {
            return "🔗";
        } else {
            // File type icons based on extension
            const extension = item.name.split(".").pop()?.toLowerCase();
            const iconMap: { [key: string]: string } = {
                py: "🐍",
                js: "📝",
                jsx: "⚛️",
                ts: "📘",
                tsx: "📘",
                html: "🌐",
                css: "🎨",
                json: "📊",
                md: "📑",
                pdf: "📕",
            };

            return iconMap[extension || ""] || "📄";
        }
    };

    return (
        <div className="file-system-node">
            <div
                className={`file-system-item ${item.type}`}
                style={{ paddingLeft: `${depth * 20}px` }}
                onClick={handleClick}>
                <span className="file-icon">{getIcon(item)}</span>
                <span className="file-name">{item.name}</span>
            </div>

            {item.type === "folder" && isOpen && item.children && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}>
                    {item.children.map((child, index) => (
                        <FileSystemNode
                            key={index}
                            item={child}
                            depth={depth + 1}
                            onFileClick={onFileClick}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

// Main FileExplorer component
const FileExplorer: React.FC = () => {
    const [fileStructure, setFileStructure] = useState<FileSystemItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(
        null
    );
    const [loadingStructure, setLoadingStructure] = useState<boolean>(true);

    useEffect(() => {
        // Load the default file structure
        const loadFileStructure = async () => {
            try {
                setLoadingStructure(true);
                // Try to fetch structure from server or use a default
                const response = await axios.get("/file-structure.json");
                setFileStructure(response.data);
            } catch (err) {
                console.error("Could not load file structure:", err);

                // Set a sample structure as fallback
                setFileStructure([
                    {
                        name: "files",
                        type: "folder",
                        children: [
                            {
                                name: "statystyka",
                                type: "folder",
                                children: [
                                    {
                                        name: "lista_1.py",
                                        type: "file",
                                        path: "statystyka/lista_1.py",
                                    },
                                    {
                                        name: "lista_2.py",
                                        type: "file",
                                        path: "statystyka/lista_2.py",
                                    },
                                ],
                            },
                            {
                                name: "programowanie",
                                type: "folder",
                                children: [
                                    {
                                        name: "projekty",
                                        type: "folder",
                                        children: [
                                            {
                                                name: "projekt_1.py",
                                                type: "file",
                                                path: "programowanie/projekty/projekt_1.py",
                                            },
                                        ],
                                    },
                                    {
                                        name: "GitHub",
                                        type: "link",
                                        url: "https://github.com/FOXjustFOX",
                                    },
                                ],
                            },
                            {
                                name: "CV.pdf",
                                type: "link",
                                url: "/files/CV.pdf",
                            },
                        ],
                    },
                ]);
            } finally {
                setLoadingStructure(false);
            }
        };

        loadFileStructure();
    }, []);

    const handleFileClick = (item: FileSystemItem) => {
        if (item.type === "link" && item.url) {
            window.open(item.url, "_blank");
        } else if (item.type === "file" && item.path) {
            setSelectedFile(item);
        }
    };

    return (
        <motion.div
            className="page file-explorer-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="file-explorer-container">
                <h1 className="file-explorer-title">File Explorer</h1>

                <div className="file-explorer-layout">
                    <div className="file-tree-panel">
                        <h2>Files & Folders</h2>
                        {loadingStructure ? (
                            <div className="file-tree-loading">
                                Loading file structure...
                            </div>
                        ) : (
                            <div className="file-tree">
                                {fileStructure.map((item, index) => (
                                    <FileSystemNode
                                        key={index}
                                        item={item}
                                        depth={0}
                                        onFileClick={handleFileClick}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="file-content-panel">
                        {selectedFile ? (
                            <FileViewer filepath={selectedFile.path || ""} />
                        ) : (
                            <div className="no-file-selected">
                                <p>Select a file to view its contents</p>
                                <p className="file-hint">
                                    Files with 🔗 icon are links and will open
                                    in a new tab
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FileExplorer;
