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
 *
 * This spec deliberately targets a small HTML file stored in the repo
 * (example-page.html) so that the bitmap is stable and fully controlled
 * by the project, instead of relying on external websites.
 */

import * as path from 'path';
import { test, expect } from './vrt.fixture';

test.describe('Local VRT sample page', () => {
  test('matches the expected full-page screenshot', async ({ page }) => {
    // Open a deterministic local HTML page from the repo instead of an external site.
    const filePath = path.resolve(__dirname, 'example-page.html');
    await page.goto('file://' + filePath);

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


