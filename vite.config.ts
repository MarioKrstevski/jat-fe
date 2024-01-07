import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "import.meta.env.VITE_CLERK_PUBLISHABLE_KEY": JSON.stringify(
  //     process.env.VITE_CLERK_PUBLISHABLE_KEY
  //   ),
  // },
});
