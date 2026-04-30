#!/bin/bash
# Daily article publisher for socialelitemarketinggroup.com.
# Pulls latest main, generates one article, commits, pushes.
# Logs to ~/.openclaw/logs/social-elite-cron.log (out-of-repo so it doesn't dirty the worktree).

set -u

PROJECT_DIR="/Users/openclaw-boris/.openclaw/workspace/social-elite-site"
ENV_FILE="/Users/openclaw-boris/.openclaw/.env"
LOG="/Users/openclaw-boris/.openclaw/logs/social-elite-cron.log"

mkdir -p "$(dirname "$LOG")"
exec >> "$LOG" 2>&1

echo "===== $(date -u '+%Y-%m-%dT%H:%M:%SZ') START ====="

cd "$PROJECT_DIR" || { echo "cd failed"; exit 1; }

# Load env (ANTHROPIC_API_KEY required; GEMINI_API_KEY kept as fallback)
if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

# Anthropic key isn't in ~/.openclaw/.env — extract from auth-profiles.json
if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  AUTH_FILE="/Users/openclaw-boris/.openclaw/agents/main/agent/auth-profiles.json"
  if [ -f "$AUTH_FILE" ]; then
    ANTHROPIC_API_KEY=$(grep -oE '"key"[[:space:]]*:[[:space:]]*"sk-ant-api03-[^"]*"' "$AUTH_FILE" | head -1 | sed 's/.*"\(sk-ant-api03-[^"]*\)"/\1/')
    export ANTHROPIC_API_KEY
  fi
fi

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "FATAL: ANTHROPIC_API_KEY not set and not extractable from auth-profiles.json"
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
