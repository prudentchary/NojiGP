import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//           react(),
//           tailwindcss()
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })

// needed to add "proxy" to testrun the app Because i am having issue with the COR policy

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
  "/api": {
    target: "https://ca-tenant-backend-api-dev.whitebeach-41771a65.centralus.azurecontainerapps.io",
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
},
  },
});
