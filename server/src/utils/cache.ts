import { responseCache } from "../core/responseCache.js";

export { ResponseCache, responseCache } from "../core/responseCache.js";

setInterval(
	() => {
		responseCache.cleanup();
	},
	1000 * 60 * 10,
);
