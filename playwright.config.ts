import { defineConfig, devices } from '@playwright/test';
require('./utils/env');
export default defineConfig({
  testDir: './tests',
  timeout: 300000,
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
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
