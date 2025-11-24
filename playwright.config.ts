import { defineConfig } from '@playwright/test';

// Playwright configuration tuned for Visual Regression Testing (VRT).
// Run tests with:
//   - npm test
//   - or: npx playwright test
//
// Update snapshots locally with:
//   - npx playwright test --update-snapshots
export default defineConfig({
  testDir: './tests',
  // Keep things simple and deterministic for VRT.
  fullyParallel: false,

  // Generate an HTML report that CI will upload as an artifact.
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    // Ensure a fixed viewport and bitmap characteristics across environments.
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    screenshot: 'on',
    colorScheme: 'light',
    locale: 'en-US',
  },

  projects: [
    {
      name: 'chromium-vrt',
      use: {
        browserName: 'chromium',
      },
    },
  ],
});


