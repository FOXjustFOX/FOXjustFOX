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

export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

export interface FileExplorerProps {
    onFileSelect: (file: FileSystemItem) => void;
}

export interface FileSystemNodeProps {
    item: FileSystemItem;
    depth: number;
    onFileClick: (item: FileSystemItem) => void;
}
