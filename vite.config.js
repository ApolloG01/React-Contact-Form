import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Choose a base URL that's convenient for local dev and for GitHub Pages.
// - During development (NODE_ENV=development) we serve from `/` so localhost works at `/`.
// - For production builds we default to the repo subpath `/React-Contact-Form/` required by GitHub Pages.
// - You can override both by setting the `VITE_BASE` env var (e.g. `VITE_BASE=/ my build`).
const defaultRepoBase = "/React-Contact-Form/";
const baseForEnv =
  process.env.VITE_BASE ||
  (process.env.NODE_ENV === "development" ? "/" : defaultRepoBase);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  base: baseForEnv,
});
