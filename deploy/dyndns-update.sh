#!/usr/bin/env bash
# Haelt den A-Record aktuell. Laeuft per systemd-Timer alle 5 Minuten.
# IONOS setzt den Record auf die IP des Aufrufers - der Aufruf muss also vom
# Heimnetz aus erfolgen. Rate-Limit: 2 Anfragen pro Minute, daher wird nur bei
# tatsaechlicher Aenderung aktualisiert.
set -euo pipefail

cd "$(dirname "$0")"
# shellcheck disable=SC1091
source .env

: "${IONOS_DYNDNS_URL:?IONOS_DYNDNS_URL fehlt in .env - erst dyndns-create.sh laufen lassen}"

state_file=/var/lib/leminsky-dyndns/last-ip
mkdir -p "$(dirname "$state_file")"

current=$(curl -4 -fsS --max-time 10 https://ipv4.icanhazip.com | tr -d '[:space:]')
[[ -n "$current" ]] || { echo "IP nicht ermittelbar" >&2; exit 1; }

if [[ -f "$state_file" && "$(cat "$state_file")" == "$current" ]]; then
	exit 0
fi

curl -4 -fsS --max-time 10 "$IONOS_DYNDNS_URL" >/dev/null
echo "$current" > "$state_file"
echo "DNS aktualisiert auf ${current}"
