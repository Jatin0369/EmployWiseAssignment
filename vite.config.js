import { defineConfig } from "vite"; 
import react from "@vitejs/plugin-react"; 
import tailwindcss from "tailwindcss";

// Vite configuration with proxy to handle API requests
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
