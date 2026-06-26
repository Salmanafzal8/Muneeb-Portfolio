import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Muneeb-Portfolio/",
  plugins: [react(), tailwindcss()],
  build: {
    target: "esnext",
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          motion: ["framer-motion"],
          lenis: ["lenis"],
        },
      },
    },
  },
});
