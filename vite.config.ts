import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // json-server rewrites db.json on every write; without this, Vite sees the
    // change and full-reloads the page after a booking/cancellation.
    watch: {
      ignored: ["**/db.json"],
    },
  },
});
