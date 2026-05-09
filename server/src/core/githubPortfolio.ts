export {
	createGitHubPortfolioSnapshot,
	createGitHubProjectPreviews,
	createGitHubStatsSnapshot,
	fetchGitHubRepos,
	formatGitHubProjectsContext,
	formatUpdatedAt,
	getDynamicGitHubProjectsContext,
	getRankedPortfolioRepos,
	GITHUB_API_BASE,
	GITHUB_USERNAME,
	isExcludedRepoName,
	MAX_PROJECT_PREVIEWS,
	sanitizeDescription,
} from "../../../shared/portfolio/githubPortfolio.js";
export type {
	GitHubProjectPreview,
	GitHubProjectSnapshot,
	GitHubRepo,
	GitHubStatsSnapshot,
} from "../../../shared/portfolio/githubPortfolio.js";
