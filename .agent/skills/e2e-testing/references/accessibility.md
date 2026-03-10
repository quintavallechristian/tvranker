# Accessibility (A11y) Testing

Integrate accessibility testing into E2E tests with Playwright and axe-core.

## Table of Contents

1. [Setup](#setup)
2. [Basic A11y Testing](#basic-a11y-testing)
3. [Custom Rules](#custom-rules)
4. [Testing Patterns](#testing-patterns)
5. [CI Integration](#ci-integration)

## Setup

### Install axe-core

```bash
npm install -D @axe-core/playwright
```

### Create A11y Fixture

```typescript
// tests/e2e/fixtures/a11y.fixture.ts
import { test as base, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

type A11yFixtures = {
  makeAxeBuilder: () => AxeBuilder
}

export const test = base.extend<A11yFixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () => new AxeBuilder({ page })
    await use(makeAxeBuilder)
  },
})

export { expect }
```

## Basic A11y Testing

### Full Page Scan

```typescript
import { test, expect } from '../fixtures/a11y.fixture'

test.describe('Accessibility', () => {
  test('home page has no violations', async ({ page, makeAxeBuilder }) => {
    await page.goto('/')

    const accessibilityScanResults = await makeAxeBuilder().analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
```

### Scan Specific Element

```typescript
test('navigation is accessible', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  const results = await makeAxeBuilder().include('nav').analyze()

  expect(results.violations).toEqual([])
})
```

### Exclude Elements

```typescript
test('page accessible except known issues', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  const results = await makeAxeBuilder()
    .exclude('.third-party-widget') // Exclude third-party content
    .analyze()

  expect(results.violations).toEqual([])
})
```

## Custom Rules

### WCAG Compliance Level

```typescript
// Test for WCAG 2.1 AA compliance
test('meets WCAG 2.1 AA', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  const results = await makeAxeBuilder()
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
```

### Disable Specific Rules

```typescript
test('page accessible with exceptions', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  const results = await makeAxeBuilder()
    .disableRules(['color-contrast']) // Known issue, tracked separately
    .analyze()

  expect(results.violations).toEqual([])
})
```

### Custom Impact Threshold

```typescript
test('no critical or serious violations', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  const results = await makeAxeBuilder().analyze()

  const criticalViolations = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious',
  )

  expect(criticalViolations).toEqual([])
})
```

## Testing Patterns

### Test All Pages

```typescript
const pages = ['/', '/about', '/contact', '/products', '/blog']

for (const pagePath of pages) {
  test(`${pagePath} is accessible`, async ({ page, makeAxeBuilder }) => {
    await page.goto(pagePath)
    await page.waitForLoadState('networkidle')

    const results = await makeAxeBuilder().analyze()
    expect(results.violations).toEqual([])
  })
}
```

### Test Interactive States

```typescript
test('modal is accessible when open', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  // Open modal
  await page.getByRole('button', { name: 'Open Settings' }).click()
  await page.waitForSelector('[role="dialog"]')

  const results = await makeAxeBuilder().include('[role="dialog"]').analyze()

  expect(results.violations).toEqual([])
})

test('dropdown menu is accessible', async ({ page, makeAxeBuilder }) => {
  await page.goto('/')

  // Open dropdown
  await page.getByRole('button', { name: 'Menu' }).click()

  const results = await makeAxeBuilder().include('[role="menu"]').analyze()

  expect(results.violations).toEqual([])
})
```

### Keyboard Navigation

```typescript
test('can navigate by keyboard', async ({ page }) => {
  await page.goto('/')

  // Tab through interactive elements
  await page.keyboard.press('Tab')
  const firstFocused = await page.evaluate(() => document.activeElement?.tagName)
  expect(['A', 'BUTTON', 'INPUT']).toContain(firstFocused)

  // Check skip link
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  // Verify focus moved to main content
  const mainFocused = await page.evaluate(() => document.activeElement?.closest('main') !== null)
  expect(mainFocused).toBe(true)
})
```

### Focus Visibility

```typescript
test('focus is visible on interactive elements', async ({ page }) => {
  await page.goto('/')

  // Tab to first button
  await page.keyboard.press('Tab')

  const button = page.locator('button:focus')
  const outline = await button.evaluate((el) => window.getComputedStyle(el).outline)

  expect(outline).not.toBe('none')
})
```

## CI Integration

### A11y Test Reporter

```typescript
// tests/e2e/utils/a11y-reporter.ts
import { AxeResults } from 'axe-core'

export function formatViolations(results: AxeResults): string {
  return results.violations
    .map((v) => {
      const nodes = v.nodes.map((n) => n.html).join('\n')
      return `
        Rule: ${v.id}
        Impact: ${v.impact}
        Description: ${v.description}
        Help: ${v.helpUrl}
        Elements:
        ${nodes}
      `
    })
    .join('\n---\n')
}
```

### GitHub Actions with A11y Report

```yaml
# .github/workflows/a11y.yml
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build

      - name: Run A11y Tests
        run: npx playwright test --grep @a11y

      - name: Upload A11y Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: a11y-report
          path: playwright-report/
```

## Best Practices

1. **Test all pages** - Run scans on every unique page/route
2. **Test interactive states** - Modals, dropdowns, expanded content
3. **Test responsive views** - A11y should work on mobile too
4. **Use WCAG tags** - Specify compliance level explicitly
5. **Track known issues** - Disable rules with documented tracking tickets
6. **Test keyboard nav** - Ensure full keyboard accessibility
7. **Test focus** - Verify visible focus indicators
