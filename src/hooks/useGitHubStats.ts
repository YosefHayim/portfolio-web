import { useState, useEffect, useCallback } from 'react';
import { localDb } from '@/db/localDb';
import type { GitHubStats } from '@/db/types';

const GITHUB_USERNAME = 'YosefHayim';
const GITHUB_API_BASE = 'https://api.github.com';
const LAST_PAGE_REGEX = /page=(\d+)>; rel="last"/;

type UseGitHubStatsResult = {
  stats: GitHubStats | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const fetchGitHubStats = async (): Promise<GitHubStats> => {
  const reposResponse = await fetch(
    `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`
  );

  if (!reposResponse.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }

  const repos = await reposResponse.json();

  let totalCommits = 0;
  let totalStars = 0;

  for (const repo of repos) {
    totalStars += repo.stargazers_count || 0;

    try {
      const commitsResponse = await fetch(
        `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`,
        { method: 'HEAD' }
      );

      const linkHeader = commitsResponse.headers.get('Link');
      if (linkHeader) {
        const match = linkHeader.match(LAST_PAGE_REGEX);
        if (match) {
          totalCommits += Number.parseInt(match[1], 10);
        }
      } else {
        const commitsData = await fetch(
          `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=100`
        );
        if (commitsData.ok) {
          const commits = await commitsData.json();
          totalCommits += commits.length;
        }
      }
    } catch {
      // empty catch - intentionally skipping failed repo fetches
    }
  }

  return {
    totalCommits,
    totalRepos: repos.length,
    totalStars,
    lastUpdated: new Date().toISOString(),
  };
};

export const useGitHubStats = (): UseGitHubStatsResult => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const cachedStats = localDb.gitHubStats.get();
    if (cachedStats) {
      setStats(cachedStats);
      setIsLoading(false);
      return;
    }

    try {
      const newStats = await fetchGitHubStats();
      localDb.gitHubStats.set(newStats);
      setStats(newStats);
    } catch (err) {
      const fallbackStats: GitHubStats = {
        totalCommits: 2500,
        totalRepos: 30,
        totalStars: 15,
        lastUpdated: new Date().toISOString(),
      };
      setStats(fallbackStats);
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
};
