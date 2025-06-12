// Shared types for components

export interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

export interface FileSystemItem {
    name: string;
    type: "file" | "folder" | "link";
    path: string; // Required for files and folders
    url?: string;
    children?: FileSystemItem[];
}

export interface GitHubContentItem {
    name: string;
    type: "dir" | "file";
    path: string; // Required by GitHub API
    html_url: string;
}
