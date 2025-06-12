import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileSystemItem } from "../types";

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
        <div className="w-full">
            <div
                className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-700 rounded transition-colors duration-150 ${
                    item.type === "folder" ? "font-medium" : ""
                } ${item.type === "link" ? "text-blue-400" : ""}`}
                style={{ paddingLeft: `${depth * 20 + 8}px` }}
                onClick={handleClick}>
                <span className="mr-2 text-sm">{getIcon(item)}</span>
                <span className="text-sm text-gray-300">{item.name}</span>
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

export default FileSystemNode;
export type { FileSystemNodeProps };
