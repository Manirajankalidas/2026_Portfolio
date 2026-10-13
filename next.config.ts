import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain-HTML site to ./out that any
// static host can serve (Vercel, Netlify, Cloudflare Pages, GitHub Pages, nginx).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // images are pre-optimised by `npm run images`
};

export default nextConfig;
