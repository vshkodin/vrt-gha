/**
 * Visual Regression Testing (VRT) shared Playwright fixture.
 *
 * Run VRT locally with:
 *   - npm test
 *   - or: npx playwright test
 *
 * Update snapshots locally with:
 *   - npx playwright test --update-snapshots
 *
 * NOTE: The generated snapshot directories (for example:
 *   tests/vrt/example.vrt.spec.ts-snapshots/
 * ) must be committed to the repo so CI can compare against them.
 */

import { test as base, expect } from '@playwright/test';

/**
 * Extended test fixture for VRT:
 * - Disables CSS animations and transitions by injecting a <style> tag.
 * - Uses a fixed viewport for consistent screenshots.
 * - Uses a fixed locale, timezone and color scheme for deterministic renders.
 */
const test = base.extend({
  page: async ({ page }, use) => {
    // Fixed viewport for consistent screenshots.
    await page.setViewportSize({ width: 1280, height: 720 });

    // Disable all CSS transitions and animations to reduce flakiness.
    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          transition: none !important;
          animation: none !important;
        }
      `,
    });

    await use(page);
  },
});

// Global default options for this VRT test object.
test.use({
  locale: 'en-US',
  timezoneId: 'UTC',
  colorScheme: 'light',
});

export { test, expect };


