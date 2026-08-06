#!/usr/bin/env bash
# Einmalig ausfuehren. Legt bei IONOS einen DynDNS-Eintrag an und gibt die
# updateUrl aus, die danach als IONOS_DYNDNS_URL in die .env gehoert.
set -euo pipefail

cd "$(dirname "$0")"
# shellcheck disable=SC1091
source .env

: "${IONOS_API_TOKEN:?IONOS_API_TOKEN fehlt in .env}"

response=$(curl -fsS -X POST "https://api.hosting.ionos.com/dns/v1/dyndns" \
	-H "X-API-Key: ${IONOS_API_TOKEN}" \
	-H "Content-Type: application/json" \
	-d '{"domains":["leminsky.net","www.leminsky.net"],"description":"leminsky.net Heimserver"}')

if command -v jq >/dev/null 2>&1; then
	echo "$response" | jq -r '.updateUrl'
else
	echo "$response"
	echo
	echo "Feld 'updateUrl' aus der Antwort oben als IONOS_DYNDNS_URL in .env eintragen."
fi
