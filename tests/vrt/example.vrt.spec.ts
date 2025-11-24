/**
 * Example Visual Regression Test (VRT) using Playwright.
 *
 * Run VRT locally with:
 *   - npm test
 *   - or: npx playwright test
 *
 * Update snapshots locally with:
 *   - npx playwright test --update-snapshots
 *
 * NOTE: The generated snapshot directory for this spec (for example:
 *   tests/vrt/example.vrt.spec.ts-snapshots/homepage.png
 * ) must be committed to the repo so CI can compare against it.
 */

import { test, expect } from './vrt.fixture';

test.describe('Example.com homepage VRT', () => {
  test('matches the expected full-page screenshot', async ({ page }) => {
    // Open the target page.
    // If your app exposes a local /health page, you can change this URL to that endpoint.
    await page.goto('https://example.com', { waitUntil: 'networkidle' });

    // Give the page a brief moment to settle for any late layout changes.
    await page.waitForTimeout(1000);

    // Take a deterministic full-page screenshot and compare with the stored baseline.
    // On first run, this will create:
    //   tests/vrt/example.vrt.spec.ts-snapshots/homepage.png
    // On subsequent runs, Playwright will compare against that snapshot and fail on large diffs.
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      // Small, explicit diff tolerance; adjust if needed for your UI.
      maxDiffPixelRatio: 0.01,
    });
  });
});


