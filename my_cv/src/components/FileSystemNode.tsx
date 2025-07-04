import React, { useState } from "react";
import { motion } from "framer-motion";
import { FILE_ICON_MAP } from "../constants";

interface FileSystemItem {
    name: string;
    type: "file" | "folder" | "link";
    path: string;
    url?: string;
    children?: FileSystemItem[];
}

interface FileSystemNodeProps {
    item: FileSystemItem;
    depth: number;
    onFileClick: (item: FileSystemItem) => void;
}

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
            return FILE_ICON_MAP[extension || ""] || "📄";
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

export default FileSystemNode;
