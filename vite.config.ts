import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // define: {
  //   "import.meta.env.VITE_CLERK_PUBLISHABLE_KEY": JSON.stringify(
  //     process.env.VITE_CLERK_PUBLISHABLE_KEY
  //   ),
  // },
});
