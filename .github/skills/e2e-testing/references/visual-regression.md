# Visual Regression Testing

Implement screenshot comparison testing with Playwright.

## Table of Contents

1. [Setup](#setup)
2. [Basic Screenshot Testing](#basic-screenshot-testing)
3. [Advanced Techniques](#advanced-techniques)
4. [Managing Snapshots](#managing-snapshots)
5. [CI Configuration](#ci-configuration)

## Setup

Playwright includes built-in visual comparison. Configure in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  // Snapshot options
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100, // Allow small differences
      threshold: 0.2, // Percentage threshold
    },
  },

  // Snapshot directory
  snapshotDir: './tests/e2e/__snapshots__',

  // Update snapshots in CI
  updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true' ? 'all' : 'missing',
})
```

## Basic Screenshot Testing

### Full Page Screenshot

```typescript
import { test, expect } from '@playwright/test'

test('home page visual', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveScreenshot('home-page.png')
})
```

### Element Screenshot

```typescript
test('header component visual', async ({ page }) => {
  await page.goto('/')

  const header = page.getByRole('banner')
  await expect(header).toHaveScreenshot('header.png')
})
```

### With Custom Options

```typescript
test('dashboard visual with options', async ({ page }) => {
  await page.goto('/dashboard')

  await expect(page).toHaveScreenshot('dashboard.png', {
    fullPage: true, // Capture full scrollable page
    animations: 'disabled', // Freeze animations
    mask: [page.locator('.dynamic-content')], // Mask dynamic areas
    maxDiffPixels: 50,
  })
})
```

## Advanced Techniques

### Masking Dynamic Content

```typescript
test('page with dynamic content', async ({ page }) => {
  await page.goto('/profile')

  await expect(page).toHaveScreenshot('profile.png', {
    mask: [
      page.locator('[data-testid="timestamp"]'),
      page.locator('.user-avatar'),
      page.locator('.random-ad'),
    ],
  })
})
```

### Clip to Region

```typescript
test('specific section visual', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveScreenshot('hero-section.png', {
    clip: { x: 0, y: 0, width: 1200, height: 600 },
  })
})
```

### Responsive Snapshots

```typescript
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
]

for (const viewport of viewports) {
  test(`home page - ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    })
    await page.goto('/')

    await expect(page).toHaveScreenshot(`home-${viewport.name}.png`)
  })
}
```

### Theme Testing

```typescript
test.describe('Theme Visual Testing', () => {
  test('light theme', async ({ page }) => {
    await page.goto('/')
    await page.emulateMedia({ colorScheme: 'light' })

    await expect(page).toHaveScreenshot('home-light.png')
  })

  test('dark theme', async ({ page }) => {
    await page.goto('/')
    await page.emulateMedia({ colorScheme: 'dark' })

    await expect(page).toHaveScreenshot('home-dark.png')
  })
})
```

### Wait for Fonts and Images

```typescript
test('page with custom fonts', async ({ page }) => {
  await page.goto('/')

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready)

  // Wait for all images
  await page.waitForFunction(() => {
    const images = Array.from(document.images)
    return images.every((img) => img.complete)
  })

  await expect(page).toHaveScreenshot('page-loaded.png')
})
```

### Freeze Animations

```typescript
test('page with animations', async ({ page }) => {
  await page.goto('/')

  // Disable CSS animations
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  })

  await expect(page).toHaveScreenshot('no-animations.png')
})
```

## Managing Snapshots

### Update Snapshots

```bash
# Update all snapshots
npx playwright test --update-snapshots

# Update specific test snapshots
npx playwright test home.visual.spec.ts --update-snapshots
```

### Snapshot Directory Structure

```
tests/e2e/
├── __snapshots__/
│   ├── home.visual.spec.ts-snapshots/
│   │   ├── home-page-chromium-darwin.png
│   │   ├── home-page-firefox-darwin.png
│   │   └── home-page-webkit-darwin.png
│   └── dashboard.visual.spec.ts-snapshots/
│       └── dashboard-chromium-darwin.png
└── specs/
    ├── home.visual.spec.ts
    └── dashboard.visual.spec.ts
```

### Cross-Platform Snapshots

Handle different OS renderings:

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // Use per-platform snapshots
      maxDiffPixelRatio: 0.05,
    },
  },
  // Or create platform-agnostic snapshots in CI
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFileName}/{arg}{ext}',
})
```

## CI Configuration

### GitHub Actions for Visual Testing

```yaml
# .github/workflows/visual.yml
name: Visual Regression

on:
  pull_request:
    branches: [main]

jobs:
  visual:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.40.0-jammy

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build

      - name: Run Visual Tests
        run: npx playwright test --grep @visual

      - name: Upload Diff Screenshots
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diffs
          path: |
            test-results/**/*-diff.png
            test-results/**/*-actual.png
          retention-days: 7

      - name: Upload Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Auto-Update Snapshots on Main

```yaml
# .github/workflows/update-snapshots.yml
name: Update Visual Snapshots

on:
  push:
    branches: [main]

jobs:
  update:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.40.0-jammy

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build

      - name: Update Snapshots
        run: npx playwright test --update-snapshots
        continue-on-error: true

      - name: Commit Updated Snapshots
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add tests/e2e/__snapshots__
          git diff --staged --quiet || git commit -m 'chore: update visual snapshots [skip ci]'
          git push
```

## Best Practices

1. **Use consistent environments** - Run in Docker/CI for consistent rendering
2. **Mask dynamic content** - Dates, avatars, user data
3. **Disable animations** - Prevent flaky tests from timing
4. **Test key breakpoints** - Mobile, tablet, desktop
5. **Control fonts** - Wait for fonts to load before capture
6. **Version snapshots** - Commit to git for review
7. **Review diffs in PRs** - Visual changes should be intentional
8. **Set thresholds** - Allow small anti-aliasing differences
