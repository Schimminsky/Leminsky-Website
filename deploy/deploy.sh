#!/usr/bin/env bash
# Laeuft auf dem Entwicklungsrechner, nicht auf dem Pi.
# Baut dist/ und schiebt es auf den Server. Der Pi baut nichts selbst.
set -euo pipefail

TARGET="${DEPLOY_TARGET:-pi@leminsky.net}"
REMOTE_DIR="${DEPLOY_DIR:-/srv/www}"

cd "$(dirname "$0")/.."

bun run typecheck
bun run lint
bun run build

# --delete raeumt geloeschte Seiten weg, Source Maps bleiben hier
rsync -avz --delete \
	--exclude '*.map' \
	dist/ "${TARGET}:${REMOTE_DIR}/"

echo "Deployed nach ${TARGET}:${REMOTE_DIR}"
