import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

// Define the structure of our file/folder items
interface FileSystemItem {
    name: string;
    type: "file" | "folder" | "link";
    path: string; // Required for files and folders
    url?: string;
    children?: FileSystemItem[];
}

interface FileExplorerProps {
    onFileSelect: (file: FileSystemItem) => void;
}

interface GitHubContentItem {
    name: string;
    type: "dir" | "file";
    path: string; // Required by GitHub API
    html_url: string;
}

interface FileSystemNodeProps {
    item: FileSystemItem;
    depth: number;
    onFileClick: (item: FileSystemItem) => void;
}

// Component for a file/folder item in the explorer
const FileSystemNode: React.FC<FileSystemNodeProps> = ({
    item,
    depth,
    onFileClick,
}) => {
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
            const iconMap: Record<string, string> = {
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
                    {item.children.map(
                        (child: FileSystemItem, index: number) => (
                            <FileSystemNode
                                key={index}
                                item={child}
                                depth={depth + 1}
                                onFileClick={onFileClick}
                            />
                        )
                    )}
                </motion.div>
            )}
        </div>
    );
};

// Function to process GitHub API items into FileSystemItems
const processItems = (items: GitHubContentItem[]): FileSystemItem[] => {
    return items.map((item) => {
        if (!item.path) {
            throw new Error(`Path is required for item: ${item.name}`);
        }
        return {
            name: item.name,
            type: item.type === "dir" ? "folder" : "file",
            path: item.path,
            url: item.html_url,
            children: item.type === "dir" ? [] : undefined,
        };
    });
};

// Function to fetch folder contents
const fetchFolderContents = async (
    username: string,
    repoName: string,
    path: string
): Promise<FileSystemItem[]> => {
    try {
        const response = await axios.get<GitHubContentItem[]>(
            `https://api.github.com/repos/${username}/${repoName}/contents/${path}`
        );
        return processItems(response.data);
    } catch (err) {
        console.error(`Could not load folder contents for ${path}:`, err);
        return [];
    }
};

// Main FileExplorer component
const FileExplorer: React.FC<FileExplorerProps> = ({ onFileSelect }) => {
    const [fileStructure, setFileStructure] = useState<FileSystemItem[]>([]);
    const [loadingStructure, setLoadingStructure] = useState<boolean>(true);
    const { repoName } = useParams<{ repoName: string }>();

    useEffect(() => {
        const loadFileStructure = async () => {
            try {
                setLoadingStructure(true);
                const username = "FOXjustFOX";
                if (!repoName) {
                    throw new Error("Repository name is required");
                }
                const response = await axios.get<GitHubContentItem[]>(
                    `https://api.github.com/repos/${username}/${repoName}/contents`
                );

                // Process initial items and load folder contents
                const initialItems = processItems(response.data);
                const itemsWithContents = await Promise.all(
                    initialItems.map(async (item) => {
                        if (item.type === "folder" && item.path) {
                            const children = await fetchFolderContents(
                                username,
                                repoName,
                                item.path
                            );
                            return { ...item, children };
                        }
                        return item;
                    })
                );

                setFileStructure(itemsWithContents);
            } catch (err) {
                console.error("Could not load file structure:", err);
            } finally {
                setLoadingStructure(false);
            }
        };

        loadFileStructure();
    }, [repoName]);

    const handleFileClick = async (item: FileSystemItem) => {
        if (item.type === "file") {
            onFileSelect(item);
        } else if (item.type === "folder") {
            try {
                const username = "FOXjustFOX";
                if (!repoName) {
                    throw new Error("Repository name is required");
                }
                if (!item.path) {
                    throw new Error(
                        `Path is required for folder: ${item.name}`
                    );
                }
                const children = await fetchFolderContents(
                    username,
                    repoName,
                    item.path
                );

                // Update the file structure with the new children
                setFileStructure((prevStructure) => {
                    const updateStructure = (
                        items: FileSystemItem[]
                    ): FileSystemItem[] => {
                        return items.map((node) => {
                            if (node.path === item.path) {
                                return { ...node, children };
                            }
                            if (node.children) {
                                return {
                                    ...node,
                                    children: updateStructure(node.children),
                                };
                            }
                            return node;
                        });
                    };
                    return updateStructure(prevStructure);
                });
            } catch (err) {
                console.error("Could not load folder contents:", err);
            }
        }
    };

    if (loadingStructure) {
        return <div className="file-loading">Loading file structure...</div>;
    }

    return (
        <div className="file-explorer">
            <div className="file-system">
                {fileStructure.map((item, index) => (
                    <FileSystemNode
                        key={index}
                        item={item}
                        depth={0}
                        onFileClick={handleFileClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default FileExplorer;
