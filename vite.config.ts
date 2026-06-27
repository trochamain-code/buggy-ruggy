import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  // Vercel (and any root-domain host) serve from "/". GitHub Pages serves from
  // a sub-path, so set GITHUB_PAGES=true when building for it.
  base: process.env.GITHUB_PAGES === "true" ? "/buggy-ruggy/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
