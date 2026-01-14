import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileSystemNode } from "../components";
import {
    FileSystemItem,
    loadFileStructure,
    fetchFolderContents,
} from "../utils";

interface FileExplorerProps {
    onFileSelect: (file: FileSystemItem) => void;
}

// Main FileExplorer component
const FileExplorer: React.FC<FileExplorerProps> = ({ onFileSelect }) => {
    const [fileStructure, setFileStructure] = useState<FileSystemItem[]>([]);
    const [loadingStructure, setLoadingStructure] = useState<boolean>(true);
    const { repoName } = useParams<{ repoName: string }>();

    useEffect(() => {
        const loadStructure = async () => {
            try {
                setLoadingStructure(true);
                const structure = await loadFileStructure(repoName);
                setFileStructure(structure);
            } catch (err) {
                console.error("Could not load file structure:", err);
            } finally {
                setLoadingStructure(false);
            }
        };

        loadStructure();
    }, [repoName]);

    const handleFileClick = async (item: FileSystemItem) => {
        if (item.type === "file") {
            onFileSelect(item);
        } else if (item.type === "folder") {
            try {
                if (!repoName) {
                    throw new Error("Repository name is required");
                }
                if (!item.path) {
                    throw new Error(
                        `Path is required for folder: ${item.name}`
                    );
                }
                const children = await fetchFolderContents(
                    "FOXjustFOX",
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
