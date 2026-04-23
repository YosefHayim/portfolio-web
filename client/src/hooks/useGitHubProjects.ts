import { useCallback, useEffect, useMemo, useState } from "react";
import { projects as fallbackProjects } from "@/data/projects";
import { localDb } from "@/db/localDb";
import type { GitHubProjectPreview } from "@/db/types";

const GITHUB_API_BASE = "https://api.github.com";
const MAX_PROJECTS = 8;
const EXCLUDED_REPO_NAMES = new Set(["yosefhayim", "template", "portfolio"]);

type GitHubRepo = {
 id: number;
 name: string;
 full_name: string;
 html_url: string;
 homepage: string | null;
 description: string | null;
 language: string | null;
 topics: string[];
 stargazers_count: number;
 archived: boolean;
 fork: boolean;
 pushed_at: string;
};

type UseGitHubProjectsResult = {
 projects: GitHubProjectPreview[];
 isLoading: boolean;
 error: string | null;
 refetch: () => Promise<void>;
};

const fallbackProjectPreviews: GitHubProjectPreview[] = fallbackProjects
 .slice(0, MAX_PROJECTS)
 .map((project) => ({
 id: project.id,
 name: project.name,
 description: project.description,
 techStack: project.techStack.slice(0, 5),
 repoUrl: project.repoUrl,
 deployedUrl: project.deployedUrl,
 status: project.status ?? "completed",
 stars: 0,
 updatedAt: new Date().toISOString(),
 }));

const mapRepoToProject = (repo: GitHubRepo): GitHubProjectPreview => {
 const techStack = [repo.language, ...repo.topics]
 .filter((value): value is string => Boolean(value))
 .slice(0, 6);

 return {
 id: repo.name.toLowerCase(),
 name: repo.name,
 description: repo.description ?? "No repository description provided.",
 techStack: techStack.length > 0 ? techStack : ["Software Engineering"],
 repoUrl: repo.html_url,
 deployedUrl: repo.homepage?.trim() || repo.html_url,
 status: repo.homepage?.trim() ? "live" : "completed",
 stars: repo.stargazers_count,
 updatedAt: repo.pushed_at,
 };
};

const isExcludedRepoName = (repoName: string): boolean =>
 EXCLUDED_REPO_NAMES.has(repoName.trim().toLowerCase());

const fetchGitHubProjects = async (
 username: string,
): Promise<GitHubProjectPreview[]> => {
 const response = await fetch(
 `${GITHUB_API_BASE}/users/${username}/repos?type=owner&sort=updated&per_page=100`,
 {
 headers: {
 Accept: "application/vnd.github+json",
 },
 },
 );

 if (!response.ok) {
 throw new Error("Failed to fetch GitHub projects");
 }

 const repos = (await response.json()) as GitHubRepo[];

 return repos
 .filter(
 (repo) => !repo.fork && !repo.archived && !isExcludedRepoName(repo.name),
 )
 .map(mapRepoToProject)
 .sort((a, b) => {
 if (b.stars !== a.stars) {
 return b.stars - a.stars;
 }
 return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
 })
 .slice(0, MAX_PROJECTS);
};

export const useGitHubProjects = (
 username: string,
): UseGitHubProjectsResult => {
 const [projects, setProjects] = useState<GitHubProjectPreview[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const normalizedUsername = useMemo(() => username.trim(), [username]);

 const fetchProjects = useCallback(async () => {
 setIsLoading(true);
 setError(null);

 const cachedProjects = localDb.gitHubProjects.get();
 if (cachedProjects && cachedProjects.length > 0) {
 const filteredCachedProjects = cachedProjects.filter(
 (project) => !isExcludedRepoName(project.name),
 );
 setProjects(filteredCachedProjects);
 setIsLoading(false);
 return;
 }

 try {
 const freshProjects = await fetchGitHubProjects(normalizedUsername);
 if (freshProjects.length === 0) {
 setProjects(fallbackProjectPreviews);
 return;
 }
 setProjects(freshProjects);
 localDb.gitHubProjects.set(freshProjects);
 } catch (err) {
 setProjects(fallbackProjectPreviews);
 setError(
 err instanceof Error ? err.message : "Failed to fetch GitHub projects",
 );
 localDb.gitHubProjects.set(fallbackProjectPreviews);
 } finally {
 setIsLoading(false);
 }
 }, [normalizedUsername]);

 useEffect(() => {
 if (!normalizedUsername) {
 setProjects(fallbackProjectPreviews);
 setIsLoading(false);
 return;
 }

 fetchProjects();
 }, [fetchProjects, normalizedUsername]);

 return {
 projects,
 isLoading,
 error,
 refetch: fetchProjects,
 };
};
