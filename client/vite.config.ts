import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    tailwindcss(), 
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // To expose the server outside the container
    port: 5173,
    watch: {
      usePolling: true, // To ensures file changes are detected on all OS (WSL/macOS)
    },
  },
})
