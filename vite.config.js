// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  // The frontend is served at the site root, so no custom base is needed (default "/")
  plugins: [react()],

  cacheDir: "./node_modules/.vite_cache", // custom cache dir for quicker rebuilds

  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true, // show error overlay in the browser
    },
  },
});
