import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:5174",
  },
  webServer: [
    {
      command: "node tests/mock-api.js",
      url: "http://localhost:3001/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev -- --port 5174",
      url: "http://localhost:5174",
      reuseExistingServer: false,
      env: { API_URL: "http://localhost:3001" },
    },
  ],
});
