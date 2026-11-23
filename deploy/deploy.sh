#!/usr/bin/env bash
# Déploiement de Netlink Solutions sur le VPS - à lancer en root : /opt/netlink-solutions/deploy.sh
#
# Principe : une release datée par déploiement, un lien `current`, retour arrière automatique si le
# contrôle de santé échoue. Le build tourne dans un cgroup plafonné (RAM/CPU) : le serveur n'a pas de
# swap et héberge d'autres projets, un build ne doit jamais pouvoir déclencher l'OOM-killer sur eux.
set -euo pipefail

APP=netlink-solutions
BASE=/opt/$APP
REPO=${REPO:-https://github.com/maha22i/netlink-site-vitrine.git}
BRANCH=${BRANCH:-main}
RUN_USER=netlink
SERVICE=$APP.service
PORT=3080
KEEP=3

log() { printf '\033[1;34m[deploy]\033[0m %s\n' "$*"; }
as_app() { runuser -u "$RUN_USER" -- env HOME="$BASE" "$@"; }

[ "$(id -u)" -eq 0 ] || { echo "À lancer en root." >&2; exit 1; }
[ -f "$BASE/shared/.env.production.local" ] || { echo "Fichier $BASE/shared/.env.production.local manquant." >&2; exit 1; }

# Garde-fou : on ne construit pas si le serveur est déjà à court de mémoire.
avail_mb=$(awk '/MemAvailable/ {print int($2/1024)}' /proc/meminfo)
if [ "$avail_mb" -lt 2500 ]; then
  echo "Mémoire disponible insuffisante (${avail_mb} Mo < 2500 Mo). Déploiement annulé." >&2
  exit 1
fi

release="$BASE/releases/$(date +%Y%m%d-%H%M%S)"
previous=$(readlink -f "$BASE/current" 2>/dev/null || true)

log "Récupération de $BRANCH -> $release"
as_app git clone --quiet --depth 1 --branch "$BRANCH" "$REPO" "$release"
as_app ln -s "$BASE/shared/.env.production.local" "$release/.env.production.local"
commit=$(as_app git -C "$release" rev-parse --short HEAD)

log "Installation et build (plafond 3 Go de RAM, 2 cœurs)"
systemd-run --scope --quiet \
  -p MemoryMax=3G -p MemorySwapMax=0 -p CPUQuota=200% -p IOWeight=50 \
  runuser -u "$RUN_USER" -- env HOME="$BASE" NODE_OPTIONS=--max-old-space-size=2048 \
  bash -c "cd '$release' && nice -n 10 npm ci --no-audit --no-fund --loglevel=error && nice -n 10 npm run build"

log "Bascule vers la release $commit"
ln -sfn "$release" "$BASE/current"
systemctl restart "$SERVICE"

log "Contrôle de santé"
ok=0
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://127.0.0.1:$PORT/" && curl -fsS -o /dev/null "http://127.0.0.1:$PORT/robots.txt"; then
    ok=1
    break
  fi
  sleep 1
done

if [ "$ok" -ne 1 ]; then
  echo "Contrôle de santé échoué." >&2
  if [ -n "$previous" ] && [ -d "$previous" ]; then
    echo "Retour arrière vers $previous" >&2
    ln -sfn "$previous" "$BASE/current"
    systemctl restart "$SERVICE"
  else
    systemctl stop "$SERVICE" || true
  fi
  journalctl -u "$SERVICE" -n 30 --no-pager >&2 || true
  exit 1
fi

log "Nettoyage : conservation des $KEEP dernières releases"
current=$(readlink -f "$BASE/current")
ls -1dt "$BASE"/releases/*/ | tail -n +$((KEEP + 1)) | while read -r old; do
  old=${old%/}
  [ "$old" = "$current" ] || [ "$old" = "$previous" ] || rm -rf "$old"
done

log "Terminé : $commit en ligne sur 127.0.0.1:$PORT"
