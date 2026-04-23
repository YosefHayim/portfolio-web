export function createHealthResponse(extra: Record<string, unknown> = {}) {
	return {
		status: "ok",
		timestamp: new Date().toISOString(),
		...extra,
	};
}
