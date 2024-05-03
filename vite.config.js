import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    electron({
      main: {
        entry: "src/main.ts",
      },
      preload: {
        input: "src/preload.ts",
      },
    }),
    vanillaExtractPlugin({
      identifiers: command === "build" ? "short" : "debug",
    }),
  ],
}));
