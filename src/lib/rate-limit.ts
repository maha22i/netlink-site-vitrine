import "server-only";

/**
 * Limiteur en mémoire (fenêtre glissante), par clé. Suffisant pour une seule instance Node.
 * Chaque message du chatbot consomme des crédits : on plafonne par visiteur en plus de la limite Nginx.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  // Nettoyage opportuniste pour que la table ne grossisse pas indéfiniment.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return true;
}
