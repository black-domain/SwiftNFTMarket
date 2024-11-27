/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import progress from "vite-plugin-progress";
import colors from "picocolors";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_ENV": process.env.VITE_API,
  },
  resolve: {
    alias: {
      "@mui": "@mui",
    },
  },
  esbuild: {
    // drop: ["console", "debugger"],
    // pure: ["console.log", "console.error", "console.warn", "console.debug", "console.trace"],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@web3uikit")) {
              return "@web3uikit";
            } else if (id.includes("zustand")) {
              return "zustand";
            } else if (id.includes("graphql")) {
              return "graphql";
            } else if (id.includes("@mui")) {
              return;
            }
            return "vendor";
          }
        },
      },
    },
  },
});
