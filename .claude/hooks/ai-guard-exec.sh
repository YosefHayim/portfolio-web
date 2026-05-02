#!/usr/bin/env bash
# Runs a hook script from universal-agent-toolkit (project devDependency or global npm).
# Usage: ai-guard-exec.sh <stem>  e.g. pretooluse → hooks/pretooluse.sh
# See: https://docs.anthropic.com/en/docs/claude-code/hooks
set -euo pipefail
stem="${1:?stem}"
ROOT="${CLAUDE_PROJECT_DIR:?CLAUDE_PROJECT_DIR}"
for _base in "$ROOT/node_modules/universal-agent-toolkit" "$(npm root -g 2>/dev/null)/universal-agent-toolkit"; do
	_SH="$_base/hooks/${stem}.sh"
	if [ -f "$_SH" ]; then
		exec bash "$_SH"
	fi
done
printf '%s\n' "[universal-agent-toolkit] missing hooks/${stem}.sh (npm i universal-agent-toolkit or npm i -g universal-agent-toolkit)" >&2
exit 0
