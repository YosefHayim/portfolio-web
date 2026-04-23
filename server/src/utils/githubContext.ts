type GitHubRepo = {
	name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	fork: boolean;
	archived: boolean;
	pushed_at: string;
};

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = "YosefHayim";
const MAX_PROJECTS_IN_CONTEXT = 6;
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes
const EXCLUDED_REPO_NAMES = new Set(["yosefhayim", "template", "portfolio"]);

type GitHubProjectsContextCache = {
	value: string;
	expiresAt: number;
};

let contextCache: GitHubProjectsContextCache | null = null;

const isExcludedRepoName = (repoName: string): boolean =>
	EXCLUDED_REPO_NAMES.has(repoName.trim().toLowerCase());

const formatUpdatedAt = (value: string): string => {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return "Unknown";
	}

	return new Intl.DateTimeFormat("en", {
		month: "short",
		year: "numeric",
	}).format(date);
};

const sanitizeDescription = (description: string | null): string => {
	if (!description) {
		return "No description provided.";
	}

	const compact = description.replace(/\s+/g, " ").trim();
	return compact.length > 140 ? `${compact.slice(0, 137)}...` : compact;
};

const fetchRepos = async (): Promise<GitHubRepo[]> => {
	const response = await fetch(
		`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`,
		{
			headers: {
				Accept: "application/vnd.github+json",
			},
		},
	);

	if (!response.ok) {
		throw new Error(`GitHub API request failed with status ${response.status}`);
	}

	return (await response.json()) as GitHubRepo[];
};

export const getDynamicGitHubProjectsContext = async (): Promise<string> => {
	const now = Date.now();
	if (contextCache && contextCache.expiresAt > now) {
		return contextCache.value;
	}

	try {
		const repos = await fetchRepos();
		const filtered = repos.filter(
			(repo) =>
				!repo.fork && !repo.archived && !isExcludedRepoName(repo.name),
		);

		const topProjects = filtered
			.sort((a, b) => {
				if (b.stargazers_count !== a.stargazers_count) {
					return b.stargazers_count - a.stargazers_count;
				}
				return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
			})
			.slice(0, MAX_PROJECTS_IN_CONTEXT);

		const totalStars = filtered.reduce(
			(sum, repo) => sum + repo.stargazers_count,
			0,
		);

		const projectsList =
			topProjects.length > 0
				? topProjects
						.map(
							(repo) =>
								`- ${repo.name} (${repo.stargazers_count} stars, updated ${formatUpdatedAt(repo.pushed_at)}): ${sanitizeDescription(repo.description)} (${repo.html_url})`,
						)
						.join("\n")
				: "- No repositories found.";

		const context = `## Live GitHub Projects Snapshot
Source: GitHub API for ${GITHUB_USERNAME}, auto-fetched by server.
Public repositories: ${filtered.length}
Total stars: ${totalStars}

Top active projects:
${projectsList}

When users ask about recent repos/projects, prioritize this live snapshot over generic examples.`;

		contextCache = {
			value: context,
			expiresAt: now + CACHE_TTL_MS,
		};

		return context;
	} catch (_error) {
		const fallbackContext = `## Live GitHub Projects Snapshot
GitHub live snapshot is temporarily unavailable. If asked for recent repos/projects, direct the user to https://github.com/${GITHUB_USERNAME} and avoid inventing specifics.`;

		contextCache = {
			value: fallbackContext,
			expiresAt: now + CACHE_TTL_MS,
		};

		return fallbackContext;
	}
};
