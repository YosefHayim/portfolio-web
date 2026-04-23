#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="${1:-"$ROOT_DIR/server/.env"}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

PROFILE="${AWS_PROFILE:-default}"
REGION="${AWS_REGION:-eu-central-1}"

aws configure set region "$REGION" --profile "$PROFILE"
aws configure set output json --profile "$PROFILE"

echo "Configured profile '$PROFILE' with region '$REGION' and output 'json'."
echo "If credentials are not set yet, run: aws configure --profile $PROFILE"
