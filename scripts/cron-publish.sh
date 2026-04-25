#!/bin/bash
# Daily article publisher for socialelitemarketinggroup.com.
# Pulls latest main, generates one article, commits, pushes.
# Logs to scripts/cron-publish.log.

set -u

PROJECT_DIR="/Users/openclaw-boris/.openclaw/workspace/social-elite-site"
ENV_FILE="/Users/openclaw-boris/.openclaw/.env"
LOG="$PROJECT_DIR/scripts/cron-publish.log"

mkdir -p "$(dirname "$LOG")"
exec >> "$LOG" 2>&1

echo "===== $(date -u '+%Y-%m-%dT%H:%M:%SZ') START ====="

cd "$PROJECT_DIR" || { echo "cd failed"; exit 1; }

# Load env (GEMINI_API_KEY at minimum)
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "FATAL: GEMINI_API_KEY not set"
  exit 1
fi

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

# Pull latest so we don't conflict with Lovable pushes
git pull --rebase origin main || {
  echo "git pull failed — aborting publish"
  git rebase --abort 2>/dev/null
  exit 1
}

node scripts/generate-article.mjs
status=$?

echo "===== $(date -u '+%Y-%m-%dT%H:%M:%SZ') END status=$status ====="
exit $status
