import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 1234,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:1234",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, "/api"),
  //     },
  //   },
  // },
});
