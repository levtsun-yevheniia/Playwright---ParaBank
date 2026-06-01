import { defineConfig } from '@playwright/test';
require('./utils/env');
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [['html']],
});
