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

if ! command -v sudo >/dev/null 2>&1; then
  echo "This script must run on the EC2 host with sudo available."
  exit 1
fi

APP_DIR="${APP_DIR:-/opt/portfolio}"
REPO_URL="${REPO_URL:-https://github.com/YosefHayim/portfolio.git}"

if command -v dnf >/dev/null 2>&1; then
  sudo dnf update -y
  sudo dnf install -y nginx git nodejs
elif command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y nginx git curl ca-certificates
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "Unsupported Linux package manager. Install git/nginx/nodejs manually."
  exit 1
fi

if [[ ! -d "$APP_DIR/.git" ]]; then
  sudo mkdir -p "$APP_DIR"
  sudo chown -R "$USER":"$USER" "$APP_DIR"
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
git fetch --all --prune
git pull --ff-only

CLIENT_API_URL="${VITE_API_URL:-https://${API_SUBDOMAIN:-api.yosefhayimsabag.com}}"

cd "$APP_DIR/client"
npm ci
VITE_API_URL="$CLIENT_API_URL" npm run build

cd "$APP_DIR/server"
npm ci
npm run build

sudo mkdir -p /etc/portfolio

cat <<ENV >/tmp/portfolio-server.env
OPENAI_API_KEY=${OPENAI_API_KEY:-}
PORT=3000
NODE_ENV=${NODE_ENV:-production}
FRONTEND_URL=${FRONTEND_URL:-https://yosefhayimsabag.com}
EMAIL_USER=${EMAIL_USER:-}
EMAIL_PASS=${EMAIL_PASS:-}
ENV
sudo mv /tmp/portfolio-server.env /etc/portfolio/server.env
sudo chmod 600 /etc/portfolio/server.env

cat <<SERVICE | sudo tee /etc/systemd/system/portfolio-api.service >/dev/null
[Unit]
Description=Portfolio Backend API
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR/server
EnvironmentFile=/etc/portfolio/server.env
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
SERVICE

cat <<SERVICE | sudo tee /etc/systemd/system/portfolio-web.service >/dev/null
[Unit]
Description=Portfolio Frontend Web Server
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR/client
Environment=PORT=8080
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
SERVICE

sudo cp "$ROOT_DIR/infra/aws/nginx.portfolio.conf" /etc/nginx/conf.d/portfolio.conf
sudo sed -i "s/__DOMAIN_ROOT__/${DOMAIN_ROOT:-yosefhayimsabag.com}/g" /etc/nginx/conf.d/portfolio.conf
sudo sed -i "s/__API_SUBDOMAIN__/${API_SUBDOMAIN:-api.yosefhayimsabag.com}/g" /etc/nginx/conf.d/portfolio.conf

if [[ -f /etc/nginx/conf.d/default.conf ]]; then
  sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
fi

sudo nginx -t
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-api portfolio-web nginx
sudo systemctl restart portfolio-api portfolio-web nginx

cat <<OUT

Bootstrap complete.
Health checks:
  curl -I http://127.0.0.1:8080
  curl -s http://127.0.0.1:3000/health

Next recommended:
  sudo dnf install -y certbot python3-certbot-nginx  # Amazon Linux
  or
  sudo apt-get install -y certbot python3-certbot-nginx  # Ubuntu

Then:
  sudo certbot --nginx -d ${DOMAIN_ROOT:-yosefhayimsabag.com} -d www.${DOMAIN_ROOT:-yosefhayimsabag.com} -d ${API_SUBDOMAIN:-api.yosefhayimsabag.com}
OUT
