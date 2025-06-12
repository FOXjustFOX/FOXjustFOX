import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FileSystemNode } from "./components";
import { FileSystemItem, GitHubContentItem } from "./types";

interface FileExplorerProps {
    onFileSelect: (file: FileSystemItem) => void;
}

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
        return (
            <div className="flex items-center justify-center text-gray-300">
                Loading file structure...
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
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
