# Nur noetig, wenn Port 80 von aussen nicht erreichbar ist und die
# ACME-DNS-01-Challenge ueber die IONOS-DNS-API laufen muss.
# Bauen auf dem Pi: docker compose build

FROM caddy:2-builder-alpine AS builder
RUN xcaddy build --with github.com/caddy-dns/ionos

FROM caddy:2-alpine
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
