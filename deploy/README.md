# Deployment: Raspberry Pi im Heimnetz

Ausgeliefert wird ausschliesslich das statische `dist/`. Auf dem Pi laeuft nur
Caddy in Docker — kein Bun-Prozess, kein Build. Gebaut wird auf dem
Entwicklungsrechner, uebertragen wird per `rsync` (siehe SPEC.MD §10).

## Was liegt wo

| Ort | Inhalt |
| --- | --- |
| `/opt/leminsky` | Klon dieses Repos — nur wegen der Dateien in `deploy/` |
| `/opt/leminsky/deploy/.env` | API-Token und DynDNS-URL, **nicht** im Repo |
| `/srv/www` | Das ausgelieferte `dist/`, kommt per rsync |
| `/var/log/caddy` | Access-Log mit gekuerzten IPs |

Das Repo auf dem Pi liefert die Website **nicht** aus. Es steht dort nur, damit
Caddyfile und Compose-Datei per `git pull` aktualisierbar sind. `dist/` ist
gitignored und kommt deshalb ohnehin nie ueber git auf den Server.

## Schritt 0 — CGNAT pruefen (zuhause, vor allem anderen)

```bash
curl -4 https://ipv4.icanhazip.com
```

Ergebnis mit der WAN-IP in der Router-Oberflaeche vergleichen. Weichen beide ab,
oder beginnt die WAN-IP mit `100.64.` bis `100.127.`, steckst du hinter CGNAT und
bist von aussen ueber IPv4 nicht erreichbar. Dann zuerst beim Provider eine echte
IPv4 anfragen; erst danach weitermachen.

## Schritt 1 — Pi vorbereiten

- Raspberry Pi OS Lite (64-bit)
- **Von USB-SSD booten, nicht von SD-Karte.** Ein Dauerbetrieb mit Logs zerlegt
  SD-Karten binnen Monaten. Falls doch SD: `journald` auf `Storage=volatile`.
- Feste lokale IP als DHCP-Reservierung **im Router** vergeben
- SSH nur per Key, `PasswordAuthentication no`
- `ufw allow 22,80,443/tcp`, sonst `deny incoming`
- `unattended-upgrades` aktivieren
- Docker installieren: `curl -fsSL https://get.docker.com | sh`

```bash
sudo git clone <repo-url> /opt/leminsky
sudo mkdir -p /srv/www /var/log/caddy
sudo chown -R "$USER" /opt/leminsky /srv/www
cp /opt/leminsky/deploy/.env.example /opt/leminsky/deploy/.env
chmod +x /opt/leminsky/deploy/*.sh
```

## Schritt 2 — IONOS: API-Key und DynDNS

1. API-Key im IONOS Developer Portal erzeugen (Public Prefix und Secret mit
   einem `.` verbinden) und als `IONOS_API_TOKEN` in die `.env` eintragen.
2. `./deploy/dyndns-create.sh` einmal ausfuehren, die ausgegebene `updateUrl`
   als `IONOS_DYNDNS_URL` in die `.env` eintragen.
3. Timer aktivieren:

```bash
sudo cp /opt/leminsky/deploy/systemd/leminsky-dyndns.* /etc/systemd/system/
sudo systemctl enable --now leminsky-dyndns.timer
sudo systemctl start leminsky-dyndns.service   # erster Lauf sofort
```

Kann deine FritzBox benutzerdefiniertes DynDNS, kannst du die `updateUrl`
stattdessen dort eintragen und Timer und Service weglassen.

## Schritt 3 — Portfreigabe und Erreichbarkeitstest

80 und 443 im Router auf die Pi-IP weiterleiten. Danach **von aussen** testen
(Mobilfunk, WLAN aus) — manche Kabelanschluesse blocken Port 80:

```bash
curl -sv http://<deine-oeffentliche-ip> 2>&1 | head
```

## Schritt 4 — Testdomain zuerst

Bei IONOS einen A-Record `test` auf die oeffentliche IP setzen, TTL 300. Im
`Caddyfile` voruebergehend `test.leminsky.net` statt `leminsky.net` eintragen.
Erst wenn HTTPS steht und alle Seiten laufen, auf die Hauptdomain umstellen —
Fehler bei der Zertifikatsausstellung kosten sonst Let's-Encrypt-Kontingent.

## Schritt 5 — Caddy starten

```bash
cd /opt/leminsky/deploy
docker compose up -d
docker compose logs -f caddy
```

Ist Port 80 blockiert, muss die ACME-DNS-01-Challenge her:

1. In `docker-compose.yml` `image:` auskommentieren und `build:` aktivieren
2. Im `Caddyfile` in den Site-Block aufnehmen:
   `tls { dns ionos {env.IONOS_API_TOKEN} }`
3. `docker compose up -d --build`

## Schritt 6 — Deploy

Auf dem Entwicklungsrechner:

```bash
bun run deploy
```

Zielhost ueberschreibbar per `DEPLOY_TARGET=pi@192.168.1.50 bun run deploy`.

## Content-Security-Policy — Stolperfalle

Die CSP im `Caddyfile` erlaubt kein `unsafe-inline`. Der Bun-Build erzeugt
aktuell nur externe `.js`- und `.css`-Dateien, das passt. Zwei Dinge wuerden das
brechen:

- **Inline-`style`-Attribute in JSX** (`style={{ … }}`) — `style-src 'self'`
  blockt auch Style-Attribute. Tailwind-Klassen sind davon nicht betroffen.
- Eingebettete `<script>`-Bloecke ohne Hash oder Nonce.

Nach groesseren Frontend-Aenderungen die Browser-Konsole auf CSP-Verstoesse
pruefen, bevor deployt wird.

## Datenschutz

Caddy kuerzt die Client-IP im Access-Log (`ip_mask 16 32`). Die
Informationspflicht aus Art. 13 DSGVO entfaellt dadurch nicht — die Logs
entstehen weiterhin, nur datensparsamer. Die Datenschutzerklaerung bleibt
Must-have (SPEC.MD §5).
