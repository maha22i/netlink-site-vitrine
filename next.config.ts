import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 produit une version 100 % statique (dossier `out/`),
 * utile pour un aperçu ou un hébergement sans serveur Node.
 * Dans ce mode, les routes /api ne sont pas incluses (voir scripts/build-static.mjs).
 */
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  cacheComponents: !isExport,
  partialPrefetching: !isExport,
  poweredByHeader: false,
  images: isExport ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
