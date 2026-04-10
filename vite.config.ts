import { defineConfig } from "vite";
import path from "path";
import { pathToFileURL } from "url";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const reactPluginPath = path.resolve(__dirname, "./node_modules/@vitejs/plugin-react-swc/index.js");
  const react = (await import(pathToFileURL(reactPluginPath).href)).default;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
