import axios from "axios";
import { GITHUB_USERNAME } from "../constants";

export interface FileSystemItem {
    name: string;
    type: "file" | "folder" | "link";
    path: string;
    url?: string;
    children?: FileSystemItem[];
}

export interface GitHubContentItem {
    name: string;
    type: "dir" | "file";
    path: string;
    html_url: string;
}

// Function to process GitHub API items into FileSystemItems
export const processItems = (items: GitHubContentItem[]): FileSystemItem[] => {
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
export const fetchFolderContents = async (
    username: string,
    repoName: string,
    folderPath: string
): Promise<FileSystemItem[]> => {
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${username}/${repoName}/contents/${folderPath}`
        );
        return processItems(response.data);
    } catch (error) {
        console.error("Error fetching folder contents:", error);
        throw error;
    }
};

// Function to load file structure for a repository
export const loadFileStructure = async (
    repoName?: string
): Promise<FileSystemItem[]> => {
    if (!repoName) {
        // Return local file structure
        try {
            const response = await fetch("/file-structure.json");
            const data = await response.json();
            return data.children || [];
        } catch (error) {
            console.error("Error loading local file structure:", error);
            return [];
        }
    } else {
        // Fetch GitHub repository structure
        try {
            return await fetchFolderContents(GITHUB_USERNAME, repoName, "");
        } catch (error) {
            console.error("Error loading GitHub file structure:", error);
            return [];
        }
    }
};
