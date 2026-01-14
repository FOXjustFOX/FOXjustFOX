import { useEffect, useState } from "react";
import { GITHUB_USERNAME, CACHE_EXPIRATION } from "../constants";

interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
}

export const useGitHubRepos = () => {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cacheKey = "github_repos";
        const cachedData = sessionStorage.getItem(cacheKey);
        const cachedTime = sessionStorage.getItem(`${cacheKey}_time`);

        if (
            cachedData &&
            cachedTime &&
            Date.now() - parseInt(cachedTime) < CACHE_EXPIRATION
        ) {
            setRepos(JSON.parse(cachedData));
            setLoading(false);
            return;
        }

        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch repositories");
                }

                const data: Repository[] = await response.json();
                setRepos(data);

                // Store all repos in sessionStorage
                sessionStorage.setItem(cacheKey, JSON.stringify(data));
                sessionStorage.setItem(
                    `${cacheKey}_time`,
                    Date.now().toString()
                );

                // Store each repo separately for easy retrieval in RepoDetails
                data.forEach((repo) => {
                    sessionStorage.setItem(
                        `repo_${repo.name}`,
                        JSON.stringify(repo)
                    );
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return { repos, loading, error };
};
