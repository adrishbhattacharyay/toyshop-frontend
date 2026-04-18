import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'demo',
      testMatch: '**/demo-video.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        video: 'on',
        viewport: { width: 1280, height: 800 },
        slowMo: 400,
      },
    },
  ],
})
